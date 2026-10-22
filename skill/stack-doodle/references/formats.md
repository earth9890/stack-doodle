# Formats: pick one per topic

Numbers come from `~/videos/stack-doodle/research/fireship/` (channel.md = 803 long videos + 48 Shorts; watch-*.md = 10
deep-watched videos). Our series names are our own; never use "in 100 Seconds", "100+ … you need to know" or "Code Report".

| Topic the owner throws | Format | Length (at ~195 wpm) | Why (measured) |
|---|---|---|---|
| Happened in the last ~10 days: a launch, release, acquisition, outage, lawsuit, leak | **Patch Notes** (news) | 5–7 min, 950–1,350 words | news = 74 % of their last-12-month uploads, 77 % of views, median 917 K; 6–8 min median 1.57 M vs 933 K at 4–6 min |
| A disaster, hack, bug, rise-and-fall, a weird history | **Postmortem** (story) | 5–8 min, 1,000–1,450 words | history median 1.30 M (n 12), 9 of them in 2026 |
| A tool, language, protocol or concept that people search for | **Doodled** (explainer) | 2:20–2:50, 450–540 words | evergreen search traffic; the old 100-s format fell to ~0.5 M median, so keep it for search, not as the main show |
| "Everything about X" | **Cheat Sheet** (list with a counter) | 8–12 min, 1,600–2,300 words (start at 25–40 items) | 100+ lists median 3.11 M (n 5): the highest-yield recurring format |
| We try N things / build the same thing N ways | **Lab** (experiment) | 6–9 min, 1,200–1,700 words | i-built median 0.99 M, 1.57 M in the last 12 months (n 3); **deliver a real verdict** |
| One idea, a "why does…?" question | **Short** (9:16) | 40–55 s, 130–170 words | Shorts median 1.33 M; all 4 Why/How titles in their top 10 |

New format → first a ~1-min trial (150–190 words, lint without `--long`).

## Patch Notes (news) — built from one story
Measured on 3 videos (5:40–7:27): 202–204 wpm, no silences, a visual change every 2.0–3.4 s, 2.1–3.2 jokes/min.
| % of runtime | Beat | Rule |
|---|---|---|
| 0–3 % (0–12 s) | **Cold open** | One past-tense sentence that already contains the surprising fact or the title claim. Our device: Dev (our cast) reacts to it in a doodle; one exaggeration gag on screen. No date, no brand. |
| 3–10 % | **Fast naming** | Who, what it is called, the one number that matters. Every claim lands with an evidence card (`sd-source`, the exact line highlighted) — the card is the citation, the voice does not say "according to the blog post" every time. |
| 8–16 % | **The promise** | One sentence: the 2–3 things this video will find out (test the claim / how it works / what it means for you). Then the series badge pops ("PATCH NOTES" + date) while the voice keeps going. Nothing before the promise except the claim and one joke. |
| 16–45 % | **Backstory only as far as the decision needs** | Year stamps + one number each. Skip entirely for a pure launch. |
| 25–60 % | **What it actually is / how it works** | Shown, not told: a 3–4 step doodle diagram, one element per sentence; then our real code or a real terminal run (≤ 45 s). |
| 45–80 % | **Claims vs reality** | Vendor numbers labelled `VENDOR NUMBERS` (pink chip) and shown in full; then the independent number, our own run (`WE RAN IT`, lime chip), or the other side's own admission. Dull explanation before the fun theory, the fun one labelled as fun. |
| 80–88 % | **The turn** | "But" — the thing that doesn't add up, or what it means for the viewer. The title question gets answered by evidence, not by a yes/no. |
| 88–100 % | **Landing** | What to do / watch for next (one line), callback to the cold-open doodle, our sign-off (`script.md`). No recap, no "smash like". (A sponsor slot, when we have one, goes here: after the payoff, 45–55 s, segue built from the story's last doubt.) |

## Postmortem (story)
| % | Beat | Rule |
|---|---|---|
| 0–20 % | Cold open | What people think they know → "it's not quite true" → a 3-claim teaser of the strange parts → series badge. (Their story hit spent 22 % before the title card.) |
| 20–30 % | The rules of the world | Explain the setup once, with numbers (how many servers, users, dollars). Every later beat is a consequence of these rules. |
| 30–80 % | Escalation ladder | One rung per 25–30 s; each rung named after something human (a heist, a post office, a cult) — the comedy is the metaphor; one evidence card per rung. |
| 80–95 % | Second-order twist | A fact that recasts the earlier beats. |
| 95–100 % | Flat kicker + sign-off | The last story sentence is short and dry. |
Story card + BUT/THEREFORE chain are required (`S/references/story-engine.md`; lint checks them).

## Doodled (explainer, ~2:30)
Measured on 3 true 100-s shorts (Rust, C#, DuckDB): 480–503 words, ~204 wpm, a visual change every ~2.8 s (15.9/min), concept + code = 52–67 % of runtime, 1–2 spoken jokes/min + 2–3 visual gags/min (C# hides extra jokes in its code strings: do that — a funny but valid variable name or string, ~4 jokes/min total).
| s | Beat | Rule |
|---|---|---|
| 0–3 | First word = the definition | No hook line, no "hey". The answer starts immediately. A 1-s channel sting under the voice. |
| 3–9 | Definition | ONE sentence, ~16 words: "X is a [adjective] [category] that [benefit]." |
| 8–16 | Used for | Three nouns, each with its logo or doodle within 0.5 s of the word. |
| 10–25 | History | 6–13 s: a year, a person/org, a popularity number; end on one funny true fact. |
| 15–45 | Contrast with the old way | Define it against something the viewer already trusts (Rust vs C++/GC; DuckDB vs SQLite). This contrast comes back as the callback. |
| 30–75 | How it works (~29 %) | 3–5 sub-ideas max; each = spoken term + chip + one concrete object. **One running doodle analogy** for the hardest idea, kept the whole section (the channel's signature). |
| 75–125 | Code (23–47 %) | Install, first run, one core operation, one twist that shows the real strength. 3–9 lines on screen, revealed line by line as explained. |
| ~72 % | The turn (optional; only the 2025 sample has one) | "Neat — but the real reason people use it is…" + the real use case. Without a turn, end the code on a run/compile payoff instead. |
| last 10–15 s | Recap + sign-off | One sentence: the single differentiator; callback to the contrast; sign-off. |

## Cheat Sheet (list)
- A visible counter on every item (`sd-counter`, same corner every time); one item every ~6–7 s; ~26 words per item.
- Order items as a dependency chain (each needs the previous), so the voice says "which brings us to…" and never re-explains.
- Sections of 30–60 s; announce the halfway point; alternate "the machine" screens (terminal, code) with "the idea" screens (doodles) so neither tires.
- Hook in ≤ 40 s: a flipping stat + stakes + the size of the promise (show all item names filling a doodle brain).
- Dangerous commands get a red warning card before they appear. Pay off with a callback to the hook.

## Lab (experiment)
- Same micro-task for every item (e.g. "hello world + one HTTP request"), so the viewer has a baseline; real terminal output.
- Item template (~45–60 s): counter + name + year stamp, the one defining feature, the run, a joke, a limit, a bridge.
- Promise a verdict in the hook and **deliver it** (a ranked table at the end). Running callbacks across items.
- Paid tools: test 1–2 only (owner rule), and say what was free.

## Short (9:16, 40–55 s)
- Title is a question (why / how) or a sharp claim; one idea only.
- Always exactly one big thing on screen: a 1–3 word chip, a logo, a diagram, a console line, or a cast gag; a gag every 8–10 s.
- Alternate a technical visual with a joke visual. End on a punch visual. Cut from a long episode's best idea or write fresh.
