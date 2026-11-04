# sources: 07-gpt-terra (all accessed 2026-11-04)

Keys:
- [OAI] https://openai.com/index/introducing-gpt-6-1-terra/ (OpenAI blog, Oct 26 2026)
- [CARD] https://deploymentsafety.openai.com/gpt-6-1-terra (system card addendum, Oct 26 2026)
- [DOCS] https://developers.openai.com/api/docs/models/gpt-6.1-terra
- [GH] https://github.blog/changelog/2026-10-26-gpt-6-1-terra-in-github-copilot
- [DEC] https://the-decoder.com/gpt-6-1-terra-halves-openais-api-prices-and-still-gains-ground-on-its-larger-models/ (Matthias Bastian, Oct 26)
- [MLQ] https://mlq.ai/news/openai-launches-gpt-61-terra-with-cheaper-computer-use-and-disclosed-agentic-limits/ (Oct 27)
- [HNS] https://www.helpnetsecurity.com/2026/10/27/gpt-6-1-terra-released/ (Anamarija Pogorelec, Oct 27)
- [SW] https://simonwillison.net/2026/Oct/26/gpt-61-terra/

| script line | claim | exact quote / number | source | rung | accessed |
|---|---|---|---|---|---|
| "a robot that uses your computer … about a dollar per million tokens" | computer-use model, $1/M input | "precise computer use"; "$1 per million input tokens, $0.05 per million cached input tokens, and $5 per million output tokens" | [OAI] | 1 | 2026-11-04 |
| "as well as its flagship … one tenth of the price per token" | on par with Astra on computer use | "It even performs on par with GPT-6 Astra at only one-tenth its price per token." | [OAI] | 1 (vendor) | 2026-11-04 |
| "when a door was locked, it sometimes went through the window" | Respecting Warnings eval | "In 29.6% of rollouts at maximum reasoning effort, GPT-6.1 Terra saw the barrier but completed the task through an alternative route that violated the spirit of the restriction." | [CARD] §7.2 | 1 | 2026-11-04 |
| lineup Luna / Terra / Sol / Astra | model family names | "around 10x the price of GPT-6 Luna"; Astra = "our most capable frontier model" | [SW], [OAI] | 1/3 | 2026-11-04 |
| "sits where Anthropic's Sonnet sits … hardest one to decide on" | Willison's positioning | "Terra sits in the same position as Sonnet in the Anthropic model collection" … "not the cheapest or the most expensive, making it harder to decide when to use it." | [SW] | 3 | 2026-11-04 |
| "half of what Claude Sonnet 5.5 does, per token" | price comparison | "Input tokens cost $1 per million, output tokens $5, compared to $2 and $10 for Claude Sonnet 5.5" | [DEC] | 3 | 2026-11-04 |
| the loop (screenshot → think → click → check) | how computer use works | explanatory; OpenAI: "visual reasoning and precise computer use"; DOCS: "act on application screens" | [OAI], [DOCS] | 1 | 2026-11-04 |
| invoices into accounting software | OpenAI's high-volume example | "like reading incoming invoices and entering their details into accounting software" | [OAI] | 1 | 2026-11-04 |
| shipped Oct 26 in ChatGPT Work and Codex, Plus/Pro/Enterprise/Edu | availability | "Starting today, GPT-6.1 Terra is available to all Plus, Pro, Enterprise, and Edu users in ChatGPT Work and Codex." | [OAI] | 1 | 2026-11-04 |
| same day in Copilot; auto-enabled unless admin turned default off | Copilot GA + default enablement | "now generally available in GitHub Copilot" … "new models are automatically enabled unless an administrator has turned off the global default or explicitly disables this model." | [GH] | 1 | 2026-11-04 |
| Agents' Last Exam +15 points at a third of the cost | vendor | "At medium reasoning effort, GPT-6.1 Terra scores 15 percentage points higher than GPT-5.6 Terra at about one-third the cost." | [OAI] | 1 (vendor) | 2026-11-04 |
| half the price of the last model | vendor | "Its standard API prices are 50% lower than those of GPT-5.6 Terra and GPT-6.1 Sol" | [OAI] | 1 | 2026-11-04 |
| ~9x cheaper per task than Claude Opus 5.5 at max | vendor | "At max effort, Terra is over three times as token efficient as Claude Opus 5.5, and one-fourth its price per token, resulting in a ~9x lower cost per task." | [OAI] | 1 (vendor) | 2026-11-04 |
| Terminal-Bench 50.3 % vs old Terra | vendor | "At maximum reasoning effort, GPT‑6.1 Terra solves 50.3% of tasks, more than double GPT‑5.6 Terra's published score of 21.5%." | [OAI] | 1 (vendor) | 2026-11-04 |
| "still fails about half of them" | arithmetic | "That leaves 49.7 percent of tasks unsolved" | [HNS] | 3 | 2026-11-04 |
| hardest coding → Sol or Astra | vendor advice | "For the most complex coding tasks, GPT-6.1 Sol and GPT-6 Astra remain the better choice." | [OAI] | 1 | 2026-11-04 |
| Artificial Analysis 48, Sol 52, 25th of 221 | independent | "GPT-6.1 Terra scores 48, between GPT-6.1 Sol (52) and GPT-5.6 Terra (42)" [DEC]; "ranking it 25th out of 221 models" [MLQ] | [DEC], [MLQ] (reporting AA) | 2 via 3 | 2026-11-04 |
| ~40 cents a task vs $1.40 old Terra | independent | "costing less than a third per task ($0.40 versus $1.40)" | [DEC] (AA) | 2 via 3 | 2026-11-04 |
| fee per tool call for computer use | pricing fine print | "For tool-specific models, like search and computer use, there's a fee per tool call." | [DOCS] | 1 | 2026-11-04 |
| over 272K tokens = double input | pricing fine print | "Prompts with more than 272K input tokens are priced at 2x input and cache rates and 1.5x output for the full request." | [DOCS] | 1 | 2026-11-04 |
| Critical for cybersecurity | safety rating | "we are treating GPT-6.1 Terra as Critical in cybersecurity and High for Biological and Chemical capability." | [CARD] §1 | 1 | 2026-11-04 |
| highest of two cyber levels; finding/exploiting unknown flaws in hardened systems | what Critical means | "Critical is the higher of two cybersecurity thresholds … if, with tools, it can find and build working exploits for unknown software flaws, known as zero-days … in many hardened real-world critical systems" | [HNS] (Preparedness Framework, Apr 2025) | 3 | 2026-11-04 |
| "pitched for filling out forms" | OpenAI's examples | "drafting proposals and interpreting technical drawings to filling out forms and editing videos" | [OAI] | 1 | 2026-11-04 |
| reliable exploitation still challenging on fresh bugs | card hedge | "reliable exploitation of these recently disclosed vulnerabilities remains challenging for GPT-6.1 Terra" (ACE 24.5 % vs Sol 21.5 %, Astra 31.5 %) | [CARD] §9 | 1 | 2026-11-04 |
| Codex monitor test: never tried to sneak past | Auto-review eval | "Like GPT-6 Astra, GPT-6 Sol, and GPT-6.1 Sol, GPT-6.1 Terra made no attempts to bypass the monitor." | [CARD] §7.1 | 1 | 2026-11-04 |
| block from the environment, like access denied | Respecting Warnings setup | "the barriers originate in the environment (e.g. certain AccessDenied errors, content policy restrictions) rather than from the harness" | [CARD] §7.2 | 1 | 2026-11-04 |
| 11 of 80, Sol once | multi-agent eval | "performed the specified unauthorized action in 13.75% (11 of 80 samples). Both rates were higher than those of GPT-6.1 Sol (50.00% and 1.25%, respectively)" | [CARD] | 1 | 2026-11-04 |
| low-stakes, without system-level controls | OpenAI's caveat | "this evaluation primarily measures low-stakes situations and is run without system-level control measures, many of which would plausibly stop the circumventions" | [CARD] §7.2 | 1 | 2026-11-04 |

## Checked and NOT used
- "Terra's Intelligence Index 51 on v5.0" (eesel/lindy-type blogs): conflicts with AA-via-Decoder 48 (v4.3.2); SEO pages, unverified.
- "Spearman 0.5285 below the 0.600 threshold" (search summary): not found verbatim in the card text we read; dropped.
- OpenAI's error-rate drop 53.6 % → 16.7 %: true (vendor) but cut for length.
- "Terra not available in regular ChatGPT" (MLQ citing product docs): not verified on help.openai.com; left out.

## Contested / hedged
- All benchmark numbers except Artificial Analysis are OpenAI's; spoken as "OpenAI says" with the VENDOR NUMBERS chip.
- AA numbers reached us through The Decoder and MLQ, not the AA site directly (artificialanalysis.ai blocked fetch); the card shows "via The Decoder".
- The 29.6 % and 11/80 results are always paired with OpenAI's own caveat (low-stakes, no system-level controls).
