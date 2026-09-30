#!/usr/bin/env python3
"""
Generate SEO imagery from the society emblem:
  public/og.jpg        1200x630 Open Graph / social card
  public/icon-192.png  small app icon
  public/icon-512.png  large app icon / maskable
Run from the repo root: python3 scripts/build-seo-images.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

logo = Image.open(PUBLIC / "logo.jpeg").convert("RGB")

# ---- icons: square, logo on paper -----------------------------------------
for size, name in ((192, "icon-192.png"), (512, "icon-512.png")):
    icon = Image.new("RGB", (size, size), "#fbfaf7")
    inner = logo.copy()
    pad = size // 12
    inner = inner.resize((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    icon.paste(inner, (pad, pad))
    icon.save(PUBLIC / name, "PNG")

# ---- Open Graph card -------------------------------------------------------
W, H = 1200, 630
card = Image.new("RGB", (W, H), "#16181a")
draw = ImageDraw.Draw(card)

serif_bold = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 66)
serif = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 27)
sans = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 25)
sans_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 21)

# right-side photo panel
panel_w = 400
photo = Image.open(PUBLIC / "gallery" / "pg-023-600.jpg").convert("RGB")
scale = H / photo.height
photo = photo.resize((int(photo.width * scale), H), Image.LANCZOS)
card.paste(photo.crop((0, 0, panel_w, H)), (W - panel_w, 0))

# emblem on the ink field
emblem = logo.copy().resize((150, 150), Image.LANCZOS)
card.paste(emblem, (84, 70))

ink = "#fbfaf7"
muted = "#b9b7b0"
green = "#7fc79a"
LEFT = 84
TEXT_LIMIT = W - panel_w - 60  # keep clear of the photo

def fit(text: str, font, max_w: int) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

draw.text((LEFT, 262), "Shaheen Welfare Society", font=serif_bold, fill=ink)

y = 356
for line in fit("Registered voluntary social welfare agency serving District Sargodha, Punjab", serif, TEXT_LIMIT - LEFT):
    draw.text((LEFT, y), line, font=serif, fill=muted)
    y += 40

y += 8
for line in fit("Education · Healthcare · Disability support · Governance · Women's empowerment", sans, TEXT_LIMIT - LEFT):
    draw.text((LEFT, y), line, font=sans, fill=green)
    y += 36

draw.text((LEFT, 544), "Serving the community since 2001", font=sans_small, fill=muted)

card.save(PUBLIC / "og.jpg", "JPEG", quality=88, optimize=True)
print("Wrote public/og.jpg, public/icon-192.png, public/icon-512.png")
