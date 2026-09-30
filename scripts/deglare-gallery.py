#!/usr/bin/env python3
"""
Remove camera-flash reflections from the scanned photographs, then rerun
the enhancement pipeline. Prints scans of printed photos often carry a
bright specular hotspot; this detects near-white specular blobs (brighter
than their surroundings, low saturation) and inpaints them with OpenCV's
Telea method before the tone/contrast enhancement is applied.

Input is always the ORIGINAL unenhanced scans, so the enhance step is not
applied twice.

Usage:
  python3 scripts/deglare-gallery.py /tmp/shaheen-select public/gallery
Env:
  DEGLARE_SAMPLE=pg-007-002,pg-008-035  -> write side-by-side previews
  DEGLARE_DRY=1                         -> only write previews, no gallery
"""
import os
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

BRIGHTNESS = 0.92
CONTRAST = 1.18
SATURATION = 1.22
CUTOFF = 1
TRIM_PCT = 4
BORDER_TOL = 14

# specular detection
V_MIN = 242          # value floor for a specular pixel
S_MAX = 40           # low saturation: grey/white core of the hotspot
MIN_AREA = 40        # ignore specks
MAX_RATIO = 0.30     # never treat more than 30% of the image as glare
DILATE = 7           # cover the coloured fringe around the white core


def trim_border(im):
    w, h = im.size
    rgb = im.convert("RGB")
    left = right = top = bottom = 0

    def strip_uniform(pixels):
        stat = cv2.meanStdDev(np.asarray(pixels))
        return all(s < BORDER_TOL for s in stat[1].flatten())

    while left < w * TRIM_PCT / 100 and strip_uniform(rgb.crop((left, 0, left + 1, h))):
        left += 1
    while right < w * TRIM_PCT / 100 and strip_uniform(rgb.crop((w - right - 1, 0, w - right, h))):
        right += 1
    while top < h * TRIM_PCT / 100 and strip_uniform(rgb.crop((0, top, w, top + 1))):
        top += 1
    while bottom < h * TRIM_PCT / 100 and strip_uniform(rgb.crop((0, h - bottom - 1, w, h - bottom))):
        bottom += 1
    if left or right or top or bottom:
        return im.crop((left, top, w - right, h - bottom))
    return im


def specular_mask(bgr):
    """Pixels that are both near-white and brighter than their neighbourhood."""
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    v = hsv[:, :, 2]
    s = hsv[:, :, 1]
    candidate = ((v >= V_MIN) & (s <= S_MAX)).astype(np.uint8)

    # bright relative to a blurred reference: kills flat white paper/shirts
    blur = cv2.GaussianBlur(v, (0, 0), 9)
    rel = (v.astype(np.int16) - blur.astype(np.int16)) > 18

    mask = (candidate & rel.astype(np.uint8)).astype(np.uint8) * 255

    # keep reasonably sized blobs only
    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    keep = np.zeros_like(mask)
    img_area = mask.shape[0] * mask.shape[1]
    for i in range(1, n):
        area = stats[i, cv2.CC_STAT_AREA]
        if MIN_AREA <= area <= img_area * MAX_RATIO:
            keep[labels == i] = 255

    if DILATE > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (DILATE, DILATE))
        keep = cv2.dilate(keep, kernel)
    return keep


def large_flat_mask(bgr):
    """Big flat blown-out regions: near-white, featureless cores of a flash
    flare. The relative-brightness test misses these because the core is as
    bright as its own blur, so detect flat near-white patches instead."""
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    v = hsv[:, :, 2].astype(np.float32)
    s = hsv[:, :, 1]
    core = ((v >= 249) & (s <= 32)).astype(np.uint8)

    # local standard deviation: glare cores are featureless
    m = cv2.boxFilter(v, -1, (21, 21))
    m2 = cv2.boxFilter(v * v, -1, (21, 21))
    std = np.sqrt(np.maximum(m2 - m * m, 0))
    mask = (core & (std < 6).astype(np.uint8)) * 255

    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    keep = np.zeros_like(mask)
    img_area = mask.shape[0] * mask.shape[1]
    for i in range(1, n):
        area = stats[i, cv2.CC_STAT_AREA]
        if 900 <= area <= img_area * MAX_RATIO:
            keep[labels == i] = 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    return cv2.dilate(keep, kernel)


def deglare(pil_img):
    bgr = cv2.cvtColor(np.asarray(pil_img.convert("RGB")), cv2.COLOR_RGB2BGR)
    mask = cv2.bitwise_or(specular_mask(bgr), large_flat_mask(bgr))
    coverage = float((mask > 0).mean())
    if coverage < 0.0005:
        return pil_img, 0.0
    if coverage > MAX_RATIO:
        return pil_img, coverage  # something is off; leave the image alone
    out = cv2.inpaint(bgr, mask, 5, cv2.INPAINT_TELEA)
    return Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB)), coverage


def enhance(im):
    im = trim_border(im)
    im = ImageOps.autocontrast(im.convert("RGB"), cutoff=CUTOFF, preserve_tone=True)
    im = ImageEnhance.Brightness(im).enhance(BRIGHTNESS)
    im = ImageEnhance.Contrast(im).enhance(CONTRAST)
    im = ImageEnhance.Color(im).enhance(SATURATION)
    im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=3))
    return im


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/shaheen-select")
    dest = Path(sys.argv[2] if len(sys.argv) > 2 else "public/gallery")
    dest.mkdir(parents=True, exist_ok=True)
    sample_dir = Path("/tmp/deglare-preview")
    sample_dir.mkdir(exist_ok=True)
    samples = set(filter(None, os.environ.get("DEGLARE_SAMPLE", "").split(",")))
    dry = os.environ.get("DEGLARE_DRY") == "1"

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg"})
    treated = 0
    for p in files:
        original = Image.open(p).convert("RGB")
        deglared, coverage = deglare(original)
        want_sample = p.stem in samples
        if want_sample:
            w = 640
            a = original.copy(); a.thumbnail((w, w))
            b = deglared.copy(); b.thumbnail((w, w))
            canvas = Image.new("RGB", (a.width + b.width + 12, max(a.height, b.height)), (255, 255, 255))
            canvas.paste(a, (0, 0)); canvas.paste(b, (a.width + 12, 0))
            canvas.save(sample_dir / f"{p.stem}-cmp.png")
        if coverage >= 0.0005:
            treated += 1
            print(f"{p.stem}: glare {coverage * 100:.1f}%")
        if dry:
            continue
        out = enhance(deglared)
        out.save(dest / (p.stem + ".jpg"), "JPEG", quality=86, optimize=True, progressive=True)
    print(f"done: {treated}/{len(files)} images had glare removed" + (" (DRY RUN)" if dry else ""))


if __name__ == "__main__":
    main()
