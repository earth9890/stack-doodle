# title.md: 01-php2shell (Patch Notes trial, ~1 min). Rules: package.md (entity first, 45-60 chars, one question, no ellipsis, claim the video can pay off)

## Titles (character counts checked)
| # | title | chars | note |
|---|---|---|---|
| 1 | PHP just patched two critical flaws that AI helped find | 55 | **Recommended.** Entity first, plain claim, fully paid off (patched 21 Oct; Calif/Wiz/OpenAI used AI). |
| 2 | OpenAI helped find PHP2Shell, and UK sites went offline | 55 | Frontier-lab name (package.md: 29 % of hits). "Went offline" is precise: mostly precaution, not a hack. |
| 3 | Did OpenAI's model find a PHP bug that spooked governments? | 59 | The one question form. Paid off by the NCSC / CISA / "go offline" beat. Calif used OpenAI's GPT-5.6 Sol. |
| 4 | PHP2Shell explained: two critical flaws and the exact fix | 57 | Search wording first (what people type); the "exact fix" is the four version numbers. |
| 5 | PHP runs 70% of the web, and now it needs patching today | 56 | Number hook; "about 70 %" is W3Techs 69.3 %. Does not say 70 % is exploitable. |
No ellipsis. No "in 100 Seconds", "100+", "Code Report", "first look". No "hacked" claim (nobody confirmed a break-in as of 22 Oct).
Test & Compare pair for upload: 1 vs 2 (plain fix claim vs UK/OpenAI angle). Re-check the exact title wording on upload day if PHP ships a follow-up release or a confirmed compromise appears.

## Thumbnail (1280x720, graphite #15171c + faint grid, badge PATCH NOTES bottom-left, PHP logo top-left via logos.py name "php")
Shared: logo chip `php` (simple-icons, unedited, only because the video names PHP). OpenAI / Calif / Wiz as text chips only if used. Cast face from `sd-dev` (hoodie, headphones, coffee). No real person, no photo, no UK government logo or crest (use a plain flag-less "GOV.UK-style" text chip only if needed; safer: leave it off).
Headline sits on the left two-thirds; Dev crops off the right third.

### Thumb A: the claim
- Words: **FIND. FIX.** (2 words) or **AI FOUND IT** (3). Pick the first for readability at 168x94; white with lime accent on "FIX" (lime = new/wow). It adds the claim the title does not say: the same AI that finds can attack.
- Dev: eyes wide, coffee mid-spill, one eyebrow up, looking at a small door being carried by the Bot (door gag from the script).
- Small pink strip under the words: `STRANGER, NO PASSWORD` is too long, so skip; rely on the two words.
- Top-left: PHP logo chip. Bottom-left: PATCH NOTES badge.

### Thumb B: the object (logo / doodle hero)
- Words: **NO PASSWORD** (2 words), pink accent on "NO" (pink = broken/danger).
- Hero: the big PHP elephant logo (simple-icons mark, unedited) on the right third behind a drawn open door with a stranger silhouette in the doorway; Dev peeking from the bottom-right corner, small, coffee in hand.
- Top-left chip: `70%` as a plain text chip (W3Techs), pink.
- Bottom-left: PATCH NOTES badge.

Checks before build: `build.py E --thumb thumbnails/thumb-a.js thumbnails/a.png`, then `thumb_check.py` and look at the 168x94 feed grid. Not built in this step (owner gate: script OK first).
