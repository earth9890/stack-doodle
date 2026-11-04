#!/usr/bin/env python3
"""Placeholder timing before the voice exists: script.md -> script.json (voice.py's own parser) + assets/clipt.json
estimated at WPM (default 200, the narrator's measured pace). Marked "estimate": true. voice-ep.sh later overwrites
clipt.json with the real timings and build.py regenerates words.json, so scenes written with W(clip, word) just retime.
usage: est_timing.py EPISODE_DIR [--wpm 200]"""
import ast, json, pathlib, re, sys
E = pathlib.Path(sys.argv[1]).resolve(); WPM = float(sys.argv[sys.argv.index('--wpm') + 1]) if '--wpm' in sys.argv else 200
src = (pathlib.Path.home() / '.claude/skills/whiteboard-video-studio/scripts/voice.py').read_text()
ns = {'re': re}; tree = ast.parse(src)
for n in tree.body:  # pull GAP/LONG_GAP + parse_md out of voice.py without importing numpy/soundfile or voicing
    if (isinstance(n, ast.Assign) and any(getattr(t, 'id', '') == 'GAP' for t in getattr(n.targets[0], 'elts', []))) or (isinstance(n, ast.FunctionDef) and n.name == 'parse_md'):
        exec(ast.get_source_segment(src, n), ns)
script = ns['parse_md'](str(E / 'script.md'))
json.dump(script, open(E / 'script.json', 'w'), indent=0)
LEAD, TAIL, cur, C = 0.4, 1.5, 0.4, []
for it in script:
    d = len(it[0].split()) * 60 / WPM / it[2] + 0.15
    C.append([round(cur, 3), round(cur + d, 3)]); cur += d + it[1]
cur += TAIL
(E / 'assets').mkdir(exist_ok=True)
json.dump({'clips': C, 'total': round(cur, 2), 'estimate': True}, open(E / 'assets/clipt.json', 'w'))
print(f'{E.name}: {len(script)} clips, ~{cur:.1f} s at {WPM:.0f} wpm (estimate)')
