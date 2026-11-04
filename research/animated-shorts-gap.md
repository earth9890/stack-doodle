# Gap report: what the cartoon-3D-shorts skill does that Stack Doodle doesn't (2026-11-04)

Study material: `~/videos/.ref/claude-animated-shorts/`. That includes SKILL.md, STYLE_BIBLE, reports/motion, grade,
outlines and characters, templates/bridge/story.ts, templates/audio/* and templates/scripts/*. We take the **method** only.
None of its story, characters, shots or score is used, and its reference frames stay private.

The one-line verdict: our scripts and research are already stronger than theirs, but **our videos are silent apart from
the voice**. Ep01 and ep02 shipped voice-only (`finish.sh … none`, ep02 −15.3 LUFS, no SFX and no music). Their whole
sound pass, and the "picture drives the sound" discipline behind it, is the biggest win. It is now implemented (§4).

| Area | They do | We did (before) | Adopt | Status |
|---|---|---|---|---|
| Script beats | hook paradox → setting → 3–6 escalation beats, each a little bigger → snap → deadpan double line ("Luckily… / Unluckily…") → one analogy → consequence → callback twist; never describe what's on screen | formats.md skeletons, Joke Law, story card, BUT/THEREFORE, turn at 72–88 %, callback landing | the **deadpan double line**, the **"each beat a little bigger"** escalation rule, and **"don't narrate the picture"** | script.md |
| Word-timed picture | everything timed to words.json; **every reaction lands 0–3 f before its word** | entrances at `W(clip, word)` = the word onset. A 0.3 s pop is only half visible ~3 f after the word, so it lands **late** | `WL(c, i)` = W − 2 f for every entrance and reaction | engine motion v2 (`W`, `S.punch`, `S.kick`) |
| Expression swaps | on ones (an instant swap), acting beats only, no idle loops, a blink on every swap | Dev's new face **pops in** as a new element (scale 0.6 → 1) | swap on ones: pre-place the new face, then hide/show on the same frame (+ a small pop SFX) | visuals.md recipe |
| Camera grammar | symmetric smootherstep glides of 18–40 f, centred on the key word (the whoosh peaks there); every hold creeps; real cuts only for big jumps | slow push 1 → 1.03 per scene + 0.6 s crossfades; `S.zoom` is rarely used | `L.sdPunch(S, x, y, t)`: a 0.6 s power2.inOut glide **centred on the punch word**, 1–2 per scene at most. **Not** their 0.15–0.35 %/f creep: on a flat 16:9 doodle that is a 20 % zoom in 5 s and reads as seasick | engine motion v2 (`W`, `S.punch`, `S.kick`) |
| Impact kicks | `KICKS`: on the impact frame the image jolts, flips sign every frame and decays over 7 f (±3 px at 720p), with ±0.23° roll | none | `L.sdKick(t, a)`: the same shape on `#board` (4.5 px × a at 1080p). **Real impacts only**, ≤ 1 per ~10 s: the owner's no-flicker rule wins | engine motion v2 (`W`, `S.punch`, `S.kick`) |
| Merges / crossfades | `XFADE` of 6–8 f at a place/time change; 4-frame white flash only after the hook | 0.6 s (18 f) crossfades, no flashes (owner rule) | keep ours, which are already softer. Give each crossfade a soft swell SFX peaking mid-fade | done in engine (`--extra scene`) |
| Characters / outline | measured spec: bean head h/w .93, 3.5 head-heights, plum variable-width ink that is thicker on the shadow side, ink-dot hands, no blush or highlights, blinks every 0.5–2.3 s (4 f: half/shut/shut/half) | Dev / Suit / Bug / Stacky stickers with a cream rim, faces from L.FACES; **no blinks**, uniform-width ink | **later**: blinks for Dev and Stacky (needs a face "closed"/"half" swap per blink, so a cast job in sd-kit); a heavier bottom stroke on Stacky's slabs. Not done in this pass | open |
| SFX | an event table mirrored from the picture (timeline.py): every footfall, whoosh, snap and splash synthesized; level = naive LU vs voice − 6 dB; placed so a swell peaks on the move's centre | **none** | `tools/sd_audio.py`: Chrome walks the GSAP timeline, so every pop, slide, fade, move, camera glide and crossfade gets a synthesized sound with seeded variation (pop / logo bloop / seal stamp / swish / whoosh / tick / keyboard typing / hit), plus explicit `L.sdCue` cues | **done**, now engine `sound.py` (no crossfade/glide sounds yet: requested) |
| Music | an original synthesized score, section levels relative to the voice, ducked −3 dB keyed from words.json (not the audio), rides under quiet sentence ends, a DEAD STOP on the snap | finish.sh's mix.py: a looped MusicGen bed ducked from voice RMS. Not used on SD, and its venv `~/.venvs/musicgen` no longer exists | an original 96 bpm lo-fi loop (EP stabs, bass, kick/clap/hats, an arpeggio in the B half), −12 LU under the voice, −5 dB duck from words.json, `L.sdCue(t, "stop", {d})` dead stop | **done** |
| Loudness | −15 LUFS, own 4× oversampled look-ahead limiter ≤ −1 dBTP, stems + cues.md with voice-over-bed margins per section | voice-only loudnorm −15 | −14 LUFS (YouTube reference, also the brief), ≤ −1 dBTP, stems, cues.md with the speech margin (median ≥ 8 LU, p10 ≥ 2) | **done** |
| QA | short_qa.py: every frame checked for black, white, frozen ≥ 12 f and pop (> 3× local median), loudness, per-shot colour, 2 s contact sheets with frame numbers; sbs sheets; Opus verifier scores | blank_scan.py (blank frames only), scene_lint, snapshots | `tools/sd_qa.py`: loudness/TP gate, blank, **pops = flicker detector** (the owner's #1 complaint, now measurable), entrance jumps, dead holds ≥ 3 s, entrance density from the event table, contact sheets | **done**, now engine `frame_qa.py` (entrance jumps requested) |
| Look-match loop | numbers-not-adjectives reports per topic → sandboxes with one owner per file → merge → fresh verifier scoring /10 | — | useful when the owner asks "make it look like X". Not needed now | note only |
| Grade / DOF / lighting | 3D post chain | n/a (flat vector) | no | — |

## Implementation decision (2026-11-04)
I built `tools/sd_audio.py` (SFX derived by walking the GSAP timeline, plus a bed, −14 LUFS) and `tools/sd_qa.py` first.
Then up-bhl shipped the same ideas in the shared engine: `// motion: v2` (0.15 s word lead, hold creep, blinks, S.kick,
S.punch, S.sfx, an event table), `scripts/sound.py`, `scripts/frame_qa.py`, `scripts/sbs_sheet.py` and `finish.sh EP sound|keep`.
Team lead's rule is "one tool", so Stack Doodle now uses the engine's, and my two scripts and the sd-kit motion block are
in the Trash. What sound.py still lacks (crossfade/glide whooshes with a centred peak, a music dead stop, asset-aware
logo/stamp/typing sounds, the speech-margin line, frame_qa entrance jumps and a loudness PASS/FAIL) went to up-bhl as
an exact list. Those rows above marked "done" are now done by the engine.

## What the trial showed (ep02 cold open, 0–29.5 s, `research/animated-shorts-trial/`)
- `before.mp4`: ep02 as shipped. Voice only, −12.5 LUFS in this clip, 0 SFX, no music.
- `after.mp4` (project `episodes/_trial-02-sfx/`): motion v2, a stamp kick, punch-ins on "Four." and "master stamp", and an
  on-ones Dev expression swap with a boing. sound.py: 120 SFX over the episode, a synth bed 14 LU under the voice ducked
  −4 dB on words, master −14.0 LUFS / −1.2 dBTP (the 29.5 s clip measures −14.3).
- frame_qa: after = no unplanned pops, no frozen holds. Before = 8 spike frames, mostly the big FOUR/seal/cert entrances.
  That number is only indicative, because the planned windows came from the after build, whose timing is 0.15 s earlier.
- `before-after.jpg`: frames at 4.6 / 5.2 / 7.2 / 24.8 s. At 4.6 s the stamp has already landed on "number", and at 7.2 s the punch-in on FOUR is visible.

## Open questions for the owner
1. Music under Stack Doodle: yes or no? Fireship-style beds are light. Ours is 14 LU under the voice; `SOUND_ARGS="--music none"` turns it off.
2. SFX on every entrance (current) or only on chips/logos? `--sfx-db -4` makes them all quieter.
3. Kicks: OK on true impacts, or none at all (no-flicker rule)?
4. Should ep01/ep02 (already public) get the new sound? Re-uploading loses views, so probably new episodes only.

## Update (2026-11-04, later): the gaps are closed in the engine
up-bhl shipped all 6 requests: `--extra scene,glide,move` (crossfade/glide/move whooshes, peak-aligned), `S.stop(t, d)`,
asset-aware bloop/stamp/type, the speech margin in cues.md, and frame_qa JUMPS/LOUDNESS/ENTRANCES. On the trial
(`episodes/_trial-02-sfx`, with an `S.stop` on "Four."): 155 SFX (84 pop, 37 whoosh, 15 swish, 11 stamp, 6 bloop, 1 thud,
1 boing), 1 music stop, speech margin median 19.2 LU / p10 13.6 → PASS, −14.0 LUFS / −1.2 dBTP. `after.mp4` was rendered
before these changes, so its audio is the first sound.py version. The new frame_qa crashed on the new 4-field events
(reported to up-bhl).
Fixed frame_qa on `after.mp4`: LOUDNESS −14.3 LUFS / −1.1 dBTP PASS, no unplanned pops, no frozen holds, no blank frames.
It flags 30 WARN JUMPS frames: the big chips (FOUR, the promise rows), the r300 seal and the cert slides. These are the
"big elements slide, don't pop" rule in visuals.md: fix them in the next episode's scenes, not in the engine.
