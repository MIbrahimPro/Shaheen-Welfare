#!/usr/bin/env python3
"""
Enhance the scanned gallery photographs (source: printed organization
profile PDF) before they are published.

The scans come out flat, over-bright and slightly soft from print, so for
each image we:
  1. trim near-uniform scanner/paper borders,
  2. stretch levels with a small auto-contrast cutoff on both tails,
  3. lower exposure a touch (Brightness x0.92),
  4. raise contrast (x1.18) and colour saturation (x1.22),
  5. recover print softness with a mild unsharp mask,
  6. re-encode at quality 86 with progressive + optimize.

Usage:
  python3 scripts/enhance-gallery.py /tmp/shaheen-select public/gallery
"""
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageStat

BRIGHTNESS = 0.92   # exposure down
CONTRAST = 1.18     # contrast up
SATURATION = 1.22   # colour up
CUTOFF = 1          # % of pixels auto-contrast trims from each end
TRIM_PCT = 4        # max % of an edge we are willing to crop as scanner border
BORDER_TOL = 14     # how close to a flat colour an edge must be to count as border


def trim_border(im: Image.Image) -> Image.Image:
    """Crop scanner/paper margins: strips that are near-uniform in colour."""
    w, h = im.size
    rgb = im.convert("RGB")
    left = right = top = bottom = 0

    def strip_uniform(pixels) -> bool:
        stat = ImageStat.Stat(pixels)
        return all(s < BORDER_TOL for s in stat.stddev)

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


def enhance(im: Image.Image) -> Image.Image:
    im = trim_border(im)

    # Levels: pull in blown highlights and lifted blacks from the print scan.
    im = ImageOps.autocontrast(im.convert("RGB"), cutoff=CUTOFF, preserve_tone=True)

    im = ImageEnhance.Brightness(im).enhance(BRIGHTNESS)
    im = ImageEnhance.Contrast(im).enhance(CONTRAST)
    im = ImageEnhance.Color(im).enhance(SATURATION)

    # Mild unsharp mask to recover print softness (no halos).
    im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=3))
    return im


def main() -> None:
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/shaheen-select")
    dest = Path(sys.argv[2] if len(sys.argv) > 2 else "public/gallery")
    dest.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg"})
    for p in files:
        im = Image.open(p)
        im = enhance(im)
        out = dest / (p.stem + ".jpg")
        im.save(out, "JPEG", quality=86, optimize=True, progressive=True)
        print(f"{p.name} -> {out.name} {im.size[0]}x{im.size[1]}")
    print(f"Enhanced {len(files)} images into {dest}")


if __name__ == "__main__":
    main()
