# topic: Google's Gemini 4 Carbon, its strongest model, goes first to vetted cyber defenders only (Fairwind Program)
# date checked: 2026-11-04   event date: 2026-10-28 (blog.google post, 17:00 UTC)   format: Patch Notes
# the one-sentence story: Google launched its best model and locked it behind a guest list, because the same skills that find and patch bugs also exploit them.
# open questions (resolved below): pricing conflict ($2 vs $4/$20) · Argon date · who is inside Fairwind · any independent check

## What launched (primary: blog.google, Koray Kavukcuoglu, Oct 28 2026)
- "our strongest model with state-of-the-art cybersecurity and long horizon capabilities".
- #1 on Artificial Analysis Intelligence Index v5.0 at 59 (AA confirms: Carbon 59, Claude Opus 5.5 58, GPT-6 Astra 57, per Tom's Hardware / The Verge).
- Google's security numbers, "evaluated without guardrails": SEC-bench Pro 88.2 % (find), ExploitGym 54.8 % (exploit), CWE-bench 71.0 % (patch, Collinear's benchmark).
- Internal: >2x secure-code success rate vs Argon; Chrome team: "more than 10X better than another lab's large frontier model when generating high quality patches"; "run for days".
- Safety claims: Terminal-Bench 4.0 cheating 0.0 %, ~2x fewer unsupported claims than Argon, overreach −26 %, Gray Swan IPI attack success 0.0 % (Argon 0.7 %).
- Rollout: "Starting this week, we will make Carbon available to a subset of cyber defenders and will gradually phase access to additional trusted partners through our Fairwind Program." No date for developers/consumers ("as soon as possible").
- Argon: "Building on Gemini 4 Argon, which was launched two weeks ago". CSA research note: Argon announced Sep 30 via Fairwind; Mashable: Carbon came "two weeks after Gemini 4 Argon reached the Gemini app". Script says only "two weeks after Argon" as Google puts it.

## Pricing conflict: RESOLVED
Google's own post has both: introductory $2 / $10 per M (input/output, cached input 95 % off, same as Argon), then "After the introductory period expires, the price of $4 per 1M input tokens and $20 per 1M output tokens will apply." gHacks headline ("from $2") = intro; Unite.ai ($4/$20) = standard. Both right.

## Fairwind (primary: deepmind.google/fairwind-program, blog.google Sep 2 2026)
- Launched Sep 2, 2026 with Gemini 3.8 Flash Cyber + CodeMender; "more than 650 participating partners globally".
- Priority: governments and national cyber authorities; critical infrastructure (healthcare, telecom, energy, financial); core technology platforms.
- Terms: background checks on security history and ethics; user-level auth, phishing-resistant MFA; access only for internal cybersecurity / IR / pentest teams; track employee use; no share/redistribute/sell; permitted dual-use tasks = threat simulation, reverse engineering, malware analysis; "creating malware are not permitted".
- Not eligible: "you can still protect your code using CodeMender with publicly available models".
- Program page still describes Argon, not Carbon (Forbes, superintelligence news).

## Independent / critical
- Artificial Analysis (via Tom's Hardware): AA-Omniscience 54 (highest); accuracy 58 % vs Argon 48 %, "at the cost of a higher hallucination rate (11% vs 4%)". Different test from Google's "unsupported claims" metric: script says so.
- Forbes (Janakiram MSV, Oct 30): "a second frontier lab has decided that its strongest cyber model is too risky to ship to everyone"; WorkOS analysis: vetting is point-in-time, no stated re-review after breach/acquisition, private participant list; "moves the bottleneck to triage"; Anthropic Glasswing / Claude Mythos Preview precedent.
- TechRepublic: "Google has not disclosed how many can use Carbon."

## Story card draft
engine: velvet rope / locked display case · want: Dev wants to try the best model · obstacle: guest list for defenders · stakes: find/exploit/patch at scale, whoever has it first · question: why launch your best model and lock it, and does the lock hold? · change: Dev sees the guest list is the product on day one and patches his own backlog.
Promise: 1) what it can do 2) who gets in 3) is the lock real.
VENDOR vs REALITY: Google "2x fewer unsupported claims" vs AA hallucination rate 11 % vs 4 %.
Analogy: a set of lock picks: a locksmith needs one, you'd still like to know who else is buying.
Jokes (from facts): one-point lead = number one for about two weeks (Argon was two weeks earlier) · "fails half the time / succeeds half the time" · "politest way to not name a competitor" · "a rule you only write down when the model can do both" · "you already have the bugs".
