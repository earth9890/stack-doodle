#!/usr/bin/env python3
"""Scene-end snapshot times for a still-look scenes.js (motion v2): reads `const CUES = [...]` / sceneWindows(CUES, lead)
and assets/words.json, prints comma-separated times = scene end - 0.75 s (past the build, before the 0.6 s crossfade).
usage: sd_snap.py EPISODE_DIR   ->  npx hyperframes snapshot E --at $(sd_snap.py E) --no-end -o E/snapshots"""
import json, pathlib, re, sys
E = pathlib.Path(sys.argv[1]); js = (E / 'scenes.js').read_text(); T = json.load(open(E / 'assets/words.json'))
LEAD = 0.15 if re.search(r'^// motion: v2', js, re.M) else 0
cues = [tuple(map(int, m)) for m in re.findall(r'\[(\d+),\s*(\d+)\]', re.search(r'const CUES = (\[.*?\]);', js, re.S)[1])]
lead = float((re.search(r'sceneWindows\(CUES,\s*([\d.]+)\)', js) or [0, 0.4])[1])
Wd = {(c, i): s for c, i, _, s, e in T['words']}
st = [0] + [Wd[q] - LEAD - lead for q in cues[1:]]
ends = st[1:] + [T['total']]
print(','.join(f'{max(a + 0.3, b - 0.75):.2f}' for a, b in zip(st, ends)))
