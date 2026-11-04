# Script: the Stack Doodle voice

Base rules still apply: `S/references/script-writer.md` (Joke Law: every joke is built from the fact; markup §7) and
`S/references/story-engine.md` (story card, BUT/THEREFORE). This file is what's different for tech.

## Voice profile
- Narrator: dry, fast, deadpan developer who has read the docs so you don't have to. Skeptical of hype, generous to
  builders, never cynical about learning. One idea per sentence, no throat-clearing.
- Viewer: working and student developers, tech-curious people. Assumes they can read code; explains every new term once,
  in one plain sentence, the first time it appears.
- Our cast (on screen, mostly not voiced): **Dev** (hoodie, headphones, coffee: the viewer stand-in; tired, curious, broke
  from the cloud bill), **the Bot** (overconfident AI agent), **the Suit** (a generic exec who announces things — never a
  real person's likeness), **the Bug** (recurring villain). Their lines are speech bubbles on screen; the narrator is the
  only voice by default.
- American spelling (tech docs are US English). Product names exactly as their owners write them.
- Never: "insane", "crazy", "mind-blowing", "game-changer", "revolutionary", "you won't believe", "in this video",
  "welcome back", "smash", "let's dive in", "without further ado", "basically", "actually", exclamation energy.
- Never mention AI voice/TTS tools in public text.

## Pace and length
- Measured reference: 200–204 wpm, no silent beats, sentences ~20–25 words in news, shorter in explainers.
- Ours: write for ~195 wpm (confirm with the owner's chosen voice after the first take and update this line). Few `/` beats:
  a beat only before a punch word or at a section change; no `//` except one before the turn.
- Lengths: see `formats.md`. Over the budget → cut backstory first, never the "how it works" or the turn.

## Structure rules (all formats)
1. First sentence carries the fact (news: the claim; explainer: the definition). No greeting, no date first, no channel name first.
2. The promise (2–3 items) by 15 % of the runtime. Then deliver them **in the order promised**.
3. Explain any new thing in 3–4 sequential pictures, one sentence each (write `# pic:` comments so the scene board follows).
4. Every number is attributed in the sentence or on an evidence card: whose number, measured how.
5. **Skepticism devices (ours):** quote the marketing line → `VENDOR NUMBERS` → the independent number or `WE RAN IT`;
   dull cause before the fun theory (and call the fun one fun); hold the strongest counter-evidence for the turn.
6. A turn at 72–88 %: "But…" / "Here's the part the launch post skips…". Answer the title with evidence.
7. Landing: one practical line for the viewer ("if you're on X, do Y by Z"), callback to the opening doodle, sign-off.

## Beat moves borrowed from the cartoon-shorts method (method only)
- **Escalation, each beat a little bigger:** 3–4 consequence beats, each topping the last (one key → eight keys → "four").
- **Deadpan double line** right after the snap: "Luckily, … / Unluckily, …" or "The good news … / The bad news …".
- **Don't narrate the picture:** the voice never says what the doodle already shows; it adds the fact or the joke.
- **One everyday analogy** for the mechanism, then the consequence (the rule/patch it created), then the callback twist.
- Mark the punch words with `# punch: <word>`: the animator puts `S.punch` / a reaction / a sound on them (motion v2 leads every word by 0.15 s).

## Jokes
- Density: news 2–3 per minute spoken (+ visual gags on screen); explainers 1–2 spoken, 2–3 visual. Tag `[J]`.
- Types that work (measured): deadpan understatement, industry roast (of a decision/company, punching up), self-deprecation
  (Dev's code, Dev's bill), the "yes, but" flip, absurd but exact analogy, callback, a pun used as a segue.
- Every joke comes from the fact of this story (Joke Law delete test: remove the fact, the joke must die too).
- No jokes about anyone's body, identity, nationality, mental health; no stereotypes; no drug jokes; no crude humour.
- Visual gags go in `# gag:` comments (Dev's face, the Bug, a doodle exaggeration) — the animator builds them.

## Signature lines (ours; keep them fixed so the channel is recognisable)
- Badge line after the promise (spoken only in news): "This is Patch Notes for <weekday>, <month> <day>." — 1 sentence.
- Sign-off (last line, every long video): "That's the stack, doodled. See you in the next commit."
- Shorts end on the punch visual, no sign-off.

## Markup for VoiceStudio (same engine as Black Hole Life)
- One line = one or a few sentences; clips split at `/` and `//`; **no clip under 6 words** (VoiceStudio garbles short clips).
- **Numbers and symbols as words**: "version two point oh", "Node twenty-two", "forty-six thousand stars", "three dollars a
  month", "G P T six", "C plus plus", "dot J S", "N P M", "S Q L" (or "sequel" if the community says it). The screen shows
  the digits; the voice reads the words.
- Code is never read aloud character by character: say what it does ("one line serves the file").
- `(fast)` for a run-on jargon list joke; never `(slow)` in this channel.

## script.md header
```
# format: Patch Notes | Postmortem | Doodled | Cheat Sheet | Lab | Short
# topic: … (date checked …)
# engine: … # want: … # obstacle: … # stakes: … # question: … # change: …
# beat: BUT … / THEREFORE … (8+ for long, 5+ for trials)
# promise: 1) … 2) … 3) …
# chapter: <title>   (before each section's first line; long videos only)
```

## Before showing the owner
1. `script_lint.py script.md --long --wpm 195` PASS (trial/Short: without `--long`).
2. Every factual line has a `sources.md` row; every number is in words; every new term has its one-sentence explanation.
3. Read it as the narrator: cut any sentence that doesn't add a fact, a picture or a joke.
4. Self-score (script-writer §9) ≥ 8 on hook, clarity, jokes-from-facts, skepticism, payoff; rewrite the lowest row.
Show the owner the script text (+ title options) and wait for the OK before voicing.

## Voice (first episode only)
The owner picks the Stack Doodle narrator: render the same ~25-word line with 3 VoiceStudio candidates (young-to-middle-aged
male, quick, dry, American; e.g. archetypes or `default --instruct "male, 30s, quick, dry, American, tech presenter"`),
send the 3 mp3s, write the chosen profile id here and in `SKILL.md` Commands.
Chosen profile: **`9288cfee`** ("American · Male · Young Adult · Moderate"; owner said "use the best Fireship-like base voice", 2026-10-22). Natural pace in the audition: 226 wpm at 16 steps. Pass `--voice 9288cfee` (voice-ep.sh) and no `--cast` unless a character is voiced.
