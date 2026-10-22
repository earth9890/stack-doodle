#!/usr/bin/env python3
"""Brand v2 QA images (Pillow only).
usage: ~/.local/bin/uv run --offline --with pillow python brand/v2/qa.py logos    -> logo-N-strip.png, check/logo-N-safe.png, logos-sheet.png
       ... qa.py banners                                                         -> check/banner-X-safe.png, check/banner-X-devices.png
Strip = the logo circle-cropped at 160 / 96 / 48 px on YouTube dark (#0f0f0f) and light (#ffffff)."""
import pathlib, sys
from PIL import Image, ImageDraw, ImageFont

D = pathlib.Path(__file__).resolve().parent
CK = D / 'check'; CK.mkdir(exist_ok=True)
SIZES = (160, 96, 48)

def circle(im, px):
    big = im.resize((px * 4, px * 4), Image.LANCZOS)
    m = Image.new('L', big.size, 0); ImageDraw.Draw(m).ellipse((0, 0, big.size[0] - 1, big.size[1] - 1), fill=255)
    out = Image.new('RGBA', big.size, (0, 0, 0, 0)); out.paste(big.convert('RGBA'), (0, 0), m)
    return out.resize((px, px), Image.LANCZOS)

def strip(im):
    w, pad = sum(SIZES) + 5 * 24, 24
    out = Image.new('RGB', (w, 2 * (160 + 2 * pad)))
    for r, bg in enumerate(('#0f0f0f', '#ffffff')):
        ImageDraw.Draw(out).rectangle((0, r * (160 + 2 * pad), w, (r + 1) * (160 + 2 * pad)), fill=bg)
        x = pad
        for px in SIZES:
            c = circle(im, px); out.paste(c, (x, r * (160 + 2 * pad) + pad + (160 - px) // 2), c); x += px + pad
    return out

def logos():
    names = sorted(p.stem for p in D.glob('logo-?.png'))
    tiles = []
    for n in names:
        im = Image.open(D / f'{n}.png').convert('RGB')
        strip(im).save(D / f'{n}-strip.png')
        o = im.copy(); d = ImageDraw.Draw(o, 'RGBA')
        d.ellipse((20, 20, 780, 780), outline=(255, 0, 255, 255), width=4)
        o.save(CK / f'{n}-safe.png')
        s = strip(im); t = Image.new('RGB', (440, 440 + s.size[1] + 40), '#1a1a1a')
        t.paste(circle(im, 400).convert('RGB'), (20, 20), circle(im, 400))
        ImageDraw.Draw(t).text((20, 428), n, fill='#ffffff', font=ImageFont.load_default(size=22))
        t.paste(s.resize((440, int(s.size[1] * 440 / s.size[0]))), (0, 470)); tiles.append(t)
    H = max(t.size[1] for t in tiles)
    sheet = Image.new('RGB', (440 * len(tiles), H), '#1a1a1a')
    for i, t in enumerate(tiles): sheet.paste(t, (i * 440, 0))
    sheet.save(D / 'logos-sheet.png'); print(sheet.size)

def banners():
    for p in sorted(D.glob('banner-?.png')):
        im = Image.open(p).convert('RGB'); n = p.stem
        o = im.copy(); d = ImageDraw.Draw(o, 'RGBA')
        d.rectangle((507, 508, 2053, 931), outline=(255, 0, 255, 255), width=5)
        o.save(CK / f'{n}-safe.png')
        # devices: TV (all), desktop strip (full width x 508-931), tablet (1855 wide), phone (safe box)
        crops = [('TV', im.resize((1280, 720))), ('desktop 2560x423', im.crop((0, 508, 2560, 931))), ('tablet 1855x423', im.crop((352, 508, 2207, 931))), ('phone 1546x423', im.crop((507, 508, 2053, 931)))]
        W = 1280; H = sum(int(c.size[1] * W / c.size[0]) + 30 for _, c in crops)
        out = Image.new('RGB', (W, H), '#202020'); y = 0
        for lab, c in crops:
            h = int(c.size[1] * W / c.size[0]); ImageDraw.Draw(out).text((8, y + 6), lab, fill='#ffffff', font=ImageFont.load_default(size=18))
            out.paste(c.resize((W, h)), (0, y + 30)); y += h + 30
        out.save(CK / f'{n}-devices.png')

{'logos': logos, 'banners': banners}[sys.argv[1]]()
