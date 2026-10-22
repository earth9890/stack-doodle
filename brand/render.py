#!/usr/bin/env python3
"""Render a brand source (.js, the still look + tools/sd-kit.js) to PNG at its own size.

usage: python3 brand/render.py logo-1   (subfolders work: v2/logo-1)      -> logo-1.png   800x800 (a 1:1 crop of the 1920x1080 frame, centre = frame centre)
       python3 brand/render.py banner-1    -> banner-1.png 2560x1440 (frame rendered at 4/3 device scale)
       python3 brand/render.py thumbnails/thumb-template -> thumbnails/thumb-template.png 1280x720 (+ _glance.png)
Needs build.py's thumbnail pass (writes fonts to brand/assets/fonts and a temporary .html next to the PNG)."""
import pathlib, subprocess, sys, tempfile
B = pathlib.Path(__file__).resolve().parent
BUILD = pathlib.Path.home() / '.claude/skills/whiteboard-video-studio/scripts/build.py'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
name = sys.argv[1]
src, out = B / f'{name}.js', B / f'{name}.png'
if name.startswith('thumbnails/'):
    subprocess.run([sys.executable, str(BUILD), str(B), '--thumb', str(src), str(out)], check=True)
    out.with_suffix('.html').unlink(missing_ok=True)
    sys.exit()
tmp = pathlib.Path(tempfile.mkdtemp(prefix='sdbrand-'))
subprocess.run([sys.executable, str(BUILD), str(B), '--thumb', str(src), str(tmp / 'x.png')], check=True, capture_output=True)
html = tmp / 'x.html'
base = pathlib.Path(name).name  # v2/logo-1 -> logo-1
dsf = 4 / 3 if base.startswith('banner') else 1
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', f'--force-device-scale-factor={dsf}', '--window-size=1920,1080',
                '--virtual-time-budget=4000', f'--screenshot={out}', f'file://{html}'], check=True, capture_output=True)
if base.startswith('logo'):
    subprocess.run(['magick', str(out), '-crop', '800x800+560+140', '+repage', str(out)], check=True)
print(out)
