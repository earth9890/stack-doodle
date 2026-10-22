# Stack Doodle brand v2 (2026-10-22): the owner said v1 (logo-2 `</>` + pencil, banner-1) is "not good at all"; wants more creativity

Goal: a channel identity people remember after one glance at a 48 px circle in their feed. v1 failed because it is
generic: a `</>` + pencil is what every coding channel uses, and the banner is a row of chips. v2 needs a **character** and a
**joke**, in our doodle-on-dark-grid style (palette in `~/.claude/skills/stack-doodle/references/visuals.md`: graphite
`#15171c` + grid, cream paper, lime `#b6f24a`, pink `#ff4d8d`, cyan `#4cc9f0`, yellow `#ffd23f`). Never Fireship's flame,
cream+red or charcoal look; no brands/logos; no real people.

## Logos: 5 concepts (800×800, circle crop safe r = 380)
1. **Stacky (mascot)**: three thick rounded slabs stacked (lime top, pink middle, cyan bottom), hand-inked wobbly outline, the
   top slab has two big doodle eyes and a cheeky grin; a yellow pencil tucked behind it like behind an ear; 2–3 tiny doodle
   spark marks. A character we can reuse in videos and thumbnails.
2. **Brace face `{•‿•}`**: giant hand-drawn curly braces as the face outline (lime), two white dot eyes, pink smile, a
   pencil-scribble underline. Code as a face.
3. **Terminal buddy**: a rounded terminal window as a head; title-bar dots like hair clips; the screen shows `>_` as a face
   (`>` a winking eye, `_` the mouth) plus one normal eye; little doodle arms holding a pencil.
4. **Sticker monogram**: a die-cut sticker (cream rim, one corner peeling up, soft shadow): an "S" built from 3 stacked layers
   and a "D" shaped like a speech bubble with a tiny `</>` inside.
5. **Doodle in progress**: a pencil mid-stroke, still drawing a stack of three layers; the last layer is half drawn (dashed
   construction line, a few graphite smudges): "tech, being doodled".
For each: the 800×800 PNG + a preview strip showing it circle-cropped at 160, 96 and 48 px on YouTube dark (`#0f0f0f`) and
light (`#ffffff`) backgrounds. One contact sheet `brand/v2/logos-sheet.png` with all 5 concepts + strips. At 48 px each must
still read as ONE clear shape (silhouette test): simplify until it does.

## Banners: 2 concepts (2560×1440; name + tagline inside the all-devices box x 507–2053, y 508–931)
A. **Sticker-bombed laptop lid**: the whole banner is a graphite laptop lid covered in our OWN dev-joke stickers (no brands):
   "works on my machine", "it's not a bug", "LGTM", "404", "git push --force (please don't)", a coffee cup, the Bug, the series
   chips PATCH NOTES / POSTMORTEM / DOODLED / CHEAT SHEET, stickers slightly rotated, overlapping, cream die-cut rims, a few
   peeling corners. Centre (safe box): one big clean sticker with **STACK DOODLE** + "tech news, doodled" + the Stacky mascot.
B. **Being drawn**: Stacky holding a giant pencil, mid-way through hand-lettering **STACK DOODLE** on the grid (marker
   strokes, construction lines, a few doodled code snippets and arrows drifting out to the edges).
Lettering: make the name feel hand-drawn (per-letter tilt/baseline wobble, thick marker outline, a scribble underline) using
the fonts build.py ships (Mono heavy, Mali, Patrick Hand, Caveat) or hand-built letter paths; never a flat default font.
Check each with the safe-box overlay (`brand/check/`) and as it appears on desktop / TV / phone crops.

## Deliver
`brand/v2/`: `logo-1..5.js/.png`, `logos-sheet.png`, `banner-A.js/.png`, `banner-B.js/.png`, overlays, and if you add
reusable pieces (Stacky), put them in `~/videos/stack-doodle/tools/sd-kit.js` as `sd-stacky` (options: face, pose: stand|wave|
pencil, s) and update its header comment. Render with `python3 ~/videos/stack-doodle/brand/render.py v2/<name>` (adapt if
render.py needs a path tweak; don't break v1). READ every PNG, iterate until each concept looks like a polished, funny,
distinct brand — not clip-art.
