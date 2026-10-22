# Visuals: doodles on a dark grid, real code, real logos

Engine = the still look (`S/references/engine-api.md`, `style-guide.md`), with `// captions: off` (on-screen chips carry
the keywords, as in the reference channel, which has no captions). Assets: `lib.py groups dev` (82 tech assets: code,
terminal, browser, chat, repo/PR/commit, errors, architecture, hardware/AI, news cards), the whole library, our channel kit
`R/tools/sd-kit.js`, and per-episode logos (`R/tools/logos.py`).

## Look (our identity — never Fireship's flat charcoal + cream/red)
| Token | Value | Use |
|---|---|---|
| ground | graphite `#15171c` with a faint grid (`#1f2229`, 60 px) | every scene: `L.put(S, "sd-bg", 0, 0, {})` |
| paper | cream `#f4f1e8` | evidence cards, doodle panels, speech bubbles |
| lime | `#b6f24a` | the channel accent: highlighter on the quoted line, "new/good", `WE RAN IT`, counter |
| pink | `#ff4d8d` | "hype/wrong/bad": `VENDOR NUMBERS`, warnings, the Bug |
| cyan | `#4cc9f0` | info, links, arrows |
| yellow | `#ffd23f` | pointing hand, "look here" |
| text | white `#ffffff` on graphite; ink `#1d1b1f` on paper | |
Code panes keep their own dark theme (`dev-code`), terminals `dev-terminal`.

## The kit (`R/tools/sd-kit.js`, `// @include ../../tools/sd-kit.js`)
`sd-bg` (graphite + grid; `o.glow` optional soft spot) · `sd-chip` (ALL-CAPS label in **Mono**, 1–3 words, colour block
lime|pink|cyan|white|yellow, `rot` −6…6°) · `sd-source` (evidence card: site name, headline, 2–4 body lines, `hl` index =
lime highlight on the exact quoted line, optional `logo`) · `sd-year` (big Mono year stamp) · `sd-badge` (series badge:
PATCH NOTES / POSTMORTEM / DOODLED / CHEAT SHEET / LAB + date) · `sd-counter` (#07/40, bottom-left) · `sd-vs` (two things,
a doodled VS between) · `sd-hand` (pointing hand) · `sd-arrow` (hand-drawn curved arrow, lime/white) · `sd-sting` (1-s channel
mark under the first words) · `sd-bubble` (cast speech bubble). Check calls with `lib.py show sd-…` after a catalog build if
registered there, else read the header comment of `sd-kit.js`.

## Pace without flicker (owner rule, measured target)
- Reference: a visual change every 2.0–3.4 s (news) / ~2.5 s (explainers); 14–23 changes per minute; no presenter face.
- Ours: **scenes 3–7 s** (crossfade 0.6 s, still look), and **inside each scene a new element on nearly every spoken noun**
  (`t: W(clip, word)`), entering with `pop: true` (chips, logos, icons, stickers) or `slide: "up"|"left"|"right"` (cards,
  code panes, terminals). Target 14–20 entrances per minute. Camera: slow `push` on most scenes; `none` on code scenes.
- Never: hard cuts every second, flashes, glitch/strobe transitions, shots under 1 s, more than 3 new things in 1 s.
- One big thing at a time: ~80 % of frames = 1–3 elements on the grid. Busy collages only for "jargon dump" jokes.

## Scene recipes
| Beat | Build |
|---|---|
| Cold open | Dev doodle (big, expressive face) + the exaggeration gag + one chip with the claim |
| Fast naming | `sd-source` card slides up, highlight on the line; logo pops top-left; one number as a big chip |
| Promise | 3 chips pop in a column (1, 2, 3), then `sd-badge` |
| Year beat | `sd-year` + one doodle/prop + one number chip |
| How it works | a 3–4 step diagram from dev assets (client → server → db …) built one element per sentence, arrows `sd-arrow`; keep the same diagram across the section and grow it |
| Running analogy | one library doodle (dog + leash, a post office, a vending machine) that stays for the whole concept |
| Code | `dev-code` (3–9 lines, `lines: n` to reveal line by line, `hl` on the explained line) + `sd-hand` on the token + a chip naming it; terminal output from `lab/log.txt` |
| Vendor vs reality | `dev-benchmark-bars` with the vendor's numbers + pink `VENDOR NUMBERS` chip → second bars with independent/our numbers + lime `WE RAN IT` |
| The turn | Dev's face changes (the "wait…" look) + the counter-evidence card |
| Landing | callback to the cold-open doodle, changed; sign-off with `sd-sting` |
| Short (9:16) | one big thing per beat, centred in the upper two-thirds; chip under it |

## QA before render (in addition to the still-look checklist)
- `scene_lint.py`, `lib.py check scenes.js`, build, snapshots at scene end −0.75 s: every code pane readable at 1080p
  (≥ 24 px glyphs), no text on text, logos never distorted, chips inside the frame, nothing under the 940 px line on 16:9.
- Every code snippet on screen is the tested one from `lab/` or the cited doc snippet.
- Count entrances per minute (`grep -c "t: W(" scenes.js` ÷ minutes) ≈ 14–20; no 1-s window with > 3 entrances.
- `blank_scan.py` (finish.sh) clean.
