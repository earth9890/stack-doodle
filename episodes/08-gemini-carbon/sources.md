# sources: 08-gemini-carbon (accessed 2026-11-04)
Rungs: 1 primary (Google blog) · 2 independent measurement (Artificial Analysis) · 3 reputable press with named reporter.
G = "Introducing Gemini 4 Carbon", Koray Kavukcuoglu, blog.google, Oct 28 2026: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/
GR = Google "AI news: October 2026 updates", Nov 2 2026: https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-october-2026/
F = Forbes, Janakiram MSV, "Google Limits Gemini 4 Carbon To Vetted Cyber Defenders", Oct 30 2026: https://www.forbes.com/sites/janakirammsv/2026/10/30/google-limits-gemini-4-carbon-to-vetted-cyber-defenders/
TH = Tom's Hardware, Jon Martindale, Nov 3 2026 (quotes Artificial Analysis posts dated Oct 28): https://www.tomshardware.com/tech-industry/artificial-intelligence/google-reveals-new-gemini-4-carbon-ai-model-narrowly-beating-claude-opus-5-5-frontier-ai-model-is-also-the-least-likely-to-hallucinate-benchmarks-claim
VB = VentureBeat, Carl Franzen, Oct 28 2026: https://venturebeat.com/technology/google-unveils-gemini-4-carbon-retaking-the-worlds-no-1-spot-on-updated-harder-benchmarks-but-access-is-limited
GH = gHacks, Arthur Kay, Oct 31 2026: https://www.ghacks.net/2026/10/31/google-launches-gemini-4-carbon-for-cyber-defenders-first-with-api-pricing-from-2-per-million-tokens/

| script line | claim | exact quote / number | source | rung | accessed |
|---|---|---|---|---|---|
| "strongest model it has ever built" / "strongest model … long-horizon" | positioning (Google's words) | G: "our strongest model with state-of-the-art cybersecurity and long horizon capabilities." | G | 1 | 2026-11-04 |
| "On October twenty-eighth" | date | G dated "Oct 28, 2026" | G | 1 | 2026-11-04 |
| "finds security holes… proves… writes the patch" | lifecycle | G: "state-of-the-art performance across the cybersecurity defense lifecycle — vulnerability detection, validation, and remediation." | G | 1 | 2026-11-04 |
| "only goes to a hand-picked group of cyber defenders" | access | G: "Starting this week, we will make Carbon available to a subset of cyber defenders and will gradually phase access to additional trusted partners through our Fairwind Program." | G | 1 | 2026-11-04 |
| "two weeks after Gemini 4 Argon … rolled out to everyone" | Argon | G: "Building on Gemini 4 Argon, which was launched two weeks ago"; GR: "Gemini 4 Argon rolled out globally … across Google AI Studio, the Gemini API, Google Cloud, Search, and the Gemini app" | G; GR | 1 | 2026-11-04 |
| "argon comes from the Greek word for lazy" | etymology | Britannica: "named it after the Greek word argos, meaning 'lazy,' because of its chemical inertness." | https://www.britannica.com/science/argon-chemical-element | 3 | 2026-11-04 |
| "carbon forms more compounds than every other element combined" | chemistry | Britannica: "forms more compounds than all other elements combined." | https://www.britannica.com/science/carbon-chemical-element | 3 | 2026-11-04 |
| "ran for days … root-causing and patching subtle bugs across large codebases" | long horizon | G: "our teams have seen Carbon run for days to persist through dead ends to tackle complex, multi-step engineering tasks like root-causing and patching subtle bugs across large codebases and low-level systems." | G | 1 | 2026-11-04 |
| "eighty-eight point two percent on SEC-bench Pro" | vendor number | G: "SEC-bench Pro (88.2%) for finding vulnerabilities" | G | 1 (vendor) | 2026-11-04 |
| "ExploitGym … fifty-four point eight percent" | vendor number | G: "ExploitGym (54.8%) for exploitation" | G | 1 (vendor) | 2026-11-04 |
| "CWE-bench … seventy-one percent" | vendor number | G: "CWE-bench (71.0%) for patching"; GH: "CWE-bench, which measures turning validated flaws into working code patches" | G; GH | 1 (vendor) | 2026-11-04 |
| "Chrome team … more than ten times better … another lab's large frontier model" | vendor anecdote | G: "the Chrome team has reported that Carbon performed more than 10X better than another lab's large frontier model when generating high quality patches." | G | 1 (vendor) | 2026-11-04 |
| "Artificial Analysis … first at fifty-nine, one point ahead of Claude Opus five point five, two ahead of G P T six Astra" | independent ranking | TH: "Gemini 4 Carbon (high) scores a 59 … a single point ahead of Claude Opus 5.5 (max with fallback), and two points ahead of OpenAI's GPT-6 Astra (max)."; G: "Carbon ranks #1 on the recently updated v5.0 of Artificial Analysis Intelligence Index at 59." | TH; G | 2 | 2026-11-04 |
| "U S government's voluntary pre-release testing" | rollout | G: "We're taking a deliberate approach to rollout and are actively engaged in the U.S. government's voluntary process for pre-release model testing." | G | 1 | 2026-11-04 |
| "more than six hundred fifty partners; governments, critical infrastructure, core tech platforms first" | Fairwind | F: "Fairwind, a program Google says works with more than 650 partners. Governments, critical infrastructure operators and core technology platforms get priority" | F | 3 | 2026-11-04 |
| "background checks, phishing-resistant multi-factor login … not for building malware" | Fairwind rules | F: "Google runs background checks"; "Partners must use phishing-resistant multifactor authentication"; "Permitted work includes threat simulation, reverse engineering and malware analysis, while building malware is prohibited." | F | 3 | 2026-11-04 |
| "outside cyber benchmarks without guardrails" | method caveat | GH: "Google notes that the external cybersecurity benchmarks were evaluated without guardrails."; F: "so the numbers describe the model with refusals off." | GH; F | 3 (reporting G footnote) | 2026-11-04 |
| "nearly all the cyber numbers come from Google's own testing … no independent reproduction" | caveat | F: "Nearly all the performance claims come from Google's own testing, and Google has not cited an independent reproduction." | F | 3 | 2026-11-04 |
| "cuts unsupported claims by about half compared to Argon" | vendor claim | 9to5Google quoting G: "Carbon cuts unsupported claims by approximately 2x over Argon." | https://9to5google.com/2026/10/28/gemini-4-carbon-announcement/ | 1 (vendor, quoted) | 2026-11-04 |
| "fifty-eight percent versus forty-eight … hallucination rate from four to eleven" | independent | TH quoting AA (Oct 28): "It answers more questions correctly than Gemini 4 Argon (58% vs 48% accuracy), at the cost of a higher hallucination rate (11% vs 4%)." | TH | 2 | 2026-11-04 |
| "tops that whole test with a score of fifty-four" | independent | TH quoting AA: "Gemini 4 Carbon scores 54 on AA-Omniscience, the highest of any model" | TH | 2 | 2026-11-04 |
| "still behind Claude Opus five point five at programming" | independent | TH: "Artificial Analysis also highlights that Gemini 4 Carbon isn't as good as Claude Code with Claude Opus 5.5 at programming" | TH | 2/3 | 2026-11-04 |
| "two dollars … ten … same as Argon … four and twenty after an introductory period" | price | G: "the same introductory price as Argon at $2 per million input tokens and $10 per million output tokens"; "After the introductory period expires, the price of $4 per 1M input tokens and $20 per 1M output tokens will apply." | G | 1 | 2026-11-04 |
| "no announced end date" | intro period | VB: "Google hasn't specified in its release blog post when Carbon's introductory period will end." | VB | 3 | 2026-11-04 |
| "Anthropic took the same route with Mythos Preview … Glasswing" | precedent | F: "Anthropic took the same route in April with Glasswing, which gives 12 launch partners … access to Claude Mythos Preview." | F | 3 | 2026-11-04 |
| "moves the bottleneck to triage" | consequence | F: "A model that finds bugs faster than a team can review them also moves the bottleneck to triage rather than removing it." | F | 3 | 2026-11-04 |
| "WorkOS … one-time check; access to companies, misuse from individuals; private list" | critique | F: "Vetting is a point-in-time check … Access is granted to an organization, but misuse risk rests with individual employees. And because the participant list is private, one partner cannot judge who else shares the trust boundary." | F | 3 (citing WorkOS) | 2026-11-04 |
| "the interest form is open" | how to apply | F: "Organizations fill out an interest form and Google runs background checks" | F | 3 | 2026-11-04 |
| "Argon … already in A I Studio, the Gemini A P I and Google Cloud" | availability | GR (above) | GR | 1 | 2026-11-04 |

## Checked and NOT used
- gHacks headline "API pricing from $2 per million tokens" vs "$4/$20": not a conflict. $2/$10 is the introductory price, $4/$20 applies after (G footnote). Script says both.
- WebDev Arena: blog/gHacks say 1768, 9to5Google says 1769. Not used.
- Wiz web-pentest claim (G): vague, no number. Not used.
- Gray Swan prompt-injection 0.0 % and "overreach −26 %": vendor-only, not needed.
- Forbes says Anthropic's Glasswing was "in April"; Tom's says "2025". Dates conflict, so the script gives no date.
- "Who is in Fairwind": not public (F). Script says the list is private.

## Contested / hedged in the script
- All cyber scores are Google's (pink VENDOR NUMBERS chip) and were run without guardrails. Said aloud.
- "Hallucination rate up" is AA's metric, which differs from Google's "unsupported claims" metric. The script lays the two side by side and attributes each, with no claim that one disproves the other.
