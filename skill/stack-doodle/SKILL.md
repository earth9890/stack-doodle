---
name: stack-doodle
description: End-to-end workflow for the "Stack Doodle" YouTube channel: fast, funny, sourced tech-news and dev-explainer videos (the owner throws a new tech thing — a launch, a release, a hack, an acquisition, a tool, a concept — and we research it online, write the script, voice it, build doodle-on-dark visuals with real code and product logos, render, package and upload). Formula measured from a Fireship study (804 videos, 10 deep-watched), never copied. Use whenever the user mentions Stack Doodle, a tech/dev/AI/programming news video, a "Fireship-style" video, or gives a tech topic for the tech channel.
---

# Stack Doodle

Repo `~/videos/stack-doodle` (R). Engine: the still look from `~/.claude/skills/whiteboard-video-studio` (S): `build.py`,
`engine2.js`, `kit.js`, the asset library (`lib.py`), `voice.py`, `finish.sh`. Channel: YouTube `UCJSjSUoVEvLZFoZSlZPbGzw`
(was still named "harish sugandhi" on 2026-10-22; renaming/branding needs the owner's OK).
Evidence: `R/research/fireship/` — `channel.md` (all 804 videos: formats, lengths, titles, thumbnails), `watch-news.md`,
`watch-100s.md`, `watch-other.md` (10 videos deep-watched: beat maps, cut rates, wpm). **We learn the formula, never copy
the content**: no Fireship script, joke, catchphrase, sign-off, "in 100 Seconds"/"100+"/"Code Report" naming, ellipsis-title
house style, cream+red palette, flame, thumbnail grid or stick-figure-comic Shorts look.

**Pipeline:** Topic → Format → Research (`research.md`, `sources.md`) → Script (owner OK) → Voice (owner OK on the first
episodes) → Scenes → **Sound + Render** (`finish.sh … sound`, after the picture timing is locked) → QA (`QA=1`) → Package →
Upload (owner OK).
**Owner gates (standing rules):** a new format starts as a ~1-min trial; owner approves the script text, then the voice,
before visuals. Publishing needs an explicit OK in chat every time.

## Reference map
| Step | Read |
|---|---|
| Which format for this topic, the second-by-second skeleton and word budget of each format | `references/formats.md` |
| **Researching a new tech thing** (source ladder, freshness, hype filter, hands-on check, `sources.md`, safety for hacks/leaks/allegations) | `references/research.md` |
| **Writing the script** (voice, pace, jokes, skepticism devices, markup for VoiceStudio, numbers as words, lint) | `references/script.md` |
| **Visuals** (look, palette, grid background, cast, chips, code panes, logos, evidence cards, pace without flicker, scene recipes) | `references/visuals.md` |
| **Sound** (SFX on every visual beat, music bed ducked under the voice, −14 LUFS) and the QA gate | `references/visuals.md` §Motion and sound |
| Title, thumbnail, description, tags, chapters, upload settings, cadence | `references/package.md` + `S/references/thumbnail-pro.md` |
| Titles must be dramatic but true (owner 2026-10-22: "PHP patched two critical flaws" → "AI just found a hole in 70% of the internet") | `references/package.md` |
| Upload mechanics in Studio (dialog, thumbnail, checks, pinned comment) | `S/references/youtube-upload.md` + the BHL notes in memory |

## Hard rules
1. **True, sourced, dated.** Every claim in the script has an exact quote + URL in `sources.md`. Vendor numbers are said as
   the vendor's. Never invent a benchmark, a price, a quote or a version. If unsure, say less.
2. **Formula, not content.** Never paste or paraphrase another channel's script; our jokes come from the fact (Joke Law,
   `S/references/script-writer.md`).
3. **Logos only when named** (`R/tools/logos.py`, simple-icons): a product's mark appears when the video talks about that
   product; never edited, mocked into a new mark, or used in our branding. Brands simple-icons dropped (OpenAI, Microsoft,
   AWS …) appear as a text chip.
4. **Real people = names only.** No photos, cut-outs, caricatures or look-alikes. Roast decisions and companies, never a
   person's looks or private life. Allegations are attributed ("according to the lawsuit").
5. **Fast, no flicker** (owner, 2026-10-22): something new on screen every ~1.5–2.5 s via pops, slides and camera moves
   inside a scene; scenes 3–7 s; no hard-cut strobing, no flashes, no shot under 1 s.
6. **Security topics:** explain the class of bug and the impact; never working exploit steps, payloads or how to attack a
   live target. Leaked code is described, not shown.
7. **Never mention AI/TTS/voice tools in YouTube text** (owner rule for all channels). Studio's AI-use box: Yes.
8. Heavy commands one at a time on the 16 GB Mac (`lockf -t 3000 ~/videos/black-hole-life/.heavy.lock …`). YouTube
   fetches: one serialised queue, never parallel crawls, never cookies or alternate clients to get past a bot check.
9. `trash`, never `rm`. Never stage/commit/push without approval; no Claude co-author trailer.

## Episode folder (`R/episodes/NN-slug/`)
`research.md` · `sources.md` · `script.md` (+ `# format:` header) · `title.md` · `assets/logos.js` · `assets/voice.wav` ·
`script.json` · `scenes.js` · `thumbnails/thumb-a.js`, `thumb-b.js` · `package.md` · `renders/NN-slug-1080p.mp4`.
Scaffold: copy `hyperframes.json`, `meta.json`, `package.json` from a BHL episode (e.g. `~/videos/black-hole-life/episodes/45-see-thoughts/`).

## Commands
```
S=~/.claude/skills/whiteboard-video-studio; R=~/videos/stack-doodle; E=$R/episodes/NN-slug
python3 $S/scripts/script_lint.py $E/script.md --long --wpm 195     # trial / Shorts: drop --long (140-200 words)
python3 $R/tools/logos.py $E/assets/logos.js bun node.js deno        # MISSING → show the name as a chip
~/videos/black-hole-life/voice-ep.sh $E --voice 9288cfee   # Stack Doodle narrator (script.md §Voice)
python3 $S/scripts/lib.py find <words>   /   lib.py show <name>      # dev assets: lib.py groups dev
python3 $S/scripts/scene_lint.py $E/scenes.js && python3 $S/scripts/lib.py check $E/scenes.js && python3 $S/scripts/build.py $E
python3 $S/scripts/thumb_hires.py $E thumbnails/thumb-a.js thumbnails/a.png   # after the pro pass (S/references/thumbnail-pro.md)
# sound + render in one step, AFTER the picture is final (re-run on any timing change): engine sound.py = SFX from the
# motion-v2 event table + synth bed ducked under the words, -14 LUFS, stems, assets/cues.md; QA=1 = frame_qa.py every-frame check
RES=1080 QA=1 SOUND_ARGS="--extra scene,glide,move" lockf -t 3000 ~/videos/black-hole-life/.heavy.lock $S/scripts/finish.sh $E sound $E/renders/NN-slug-1080p.mp4
# SD default extras = crossfade/glide/move whooshes; add "--music none" | "--sfx-db -4" | "--music-lu 16"; trial clip: build, sound.py, build, then hyperframes render --start/--end
```
`scenes.js` header for this channel: `// look: still` · `// motion: v2` · `// captions: off` · `// @library auto` · `// @include ../../tools/sd-kit.js` · `// @include assets/logos.js`.
