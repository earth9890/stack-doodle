# Watch B: "news" bucket (Code Report style), deep-watch of 3 videos

Measured 2026-10-22 from YouTube subtitles plus 640x360 downloads. Private material (transcripts, frames, mp4s) is under
`private/`. Everything below is paraphrased. Quotes are under 15 words and marked.

## How the 3 videos were picked
- Source: the newest 120 entries in `data/flat-videos.tsv`; view counts came back for 108 of them (`private/views120.txt`).
- Window: last 12 months (uploaded on or after 2025-10-22).
- Pick 1: `wajoP_5Cpw8`, the most-viewed in the window (6.48M). It is a dev-tools story with an AI angle.
- Pick 2: `FluKUJyeYD8`, the AI-model launch. It was the 2nd most-viewed in the window (4.24M) and the highest-viewed pure launch video.
- Pick 3: `l3L_lETiSzc`. The lead swapped this in as the newest non-AI dev story, so the three cover different story types.
- The title of `l3L_lETiSzc` differs between the channel listing and the current metadata. The listing said "Another JS runtime just got acquired... but this one is getting killed". It is now "The runtime wars are over... and Node won". The title was swapped after launch, which suggests title A/B testing; write several title options per story.

## Summary table (all numbers measured)
| | A. Adobe/REA | B. GPT-6 Astra | C. Deno/Cloudflare |
|---|---|---|---|
| id | wajoP_5Cpw8 | FluKUJyeYD8 | l3L_lETiSzc |
| title | Every app on Earth is now open source... whether it likes it or not | Did OpenAI actually build AGI? GPT-6 Astra first look | The runtime wars are over... and Node won |
| uploaded | 2026-10-12 | 2026-09-04 | 2026-10-15 |
| views / likes / comments | 6.48M / 94.7k / 5.9k | 4.24M / 46.3k / 2.8k | 1.16M / 13.2k / 714 |
| likes per view, comments per 1k views | 1.46%, 0.91 | 1.09%, 0.66 | 1.14%, 0.62 |
| length | 5:56 (356 s) | 7:27 (447 s) | 5:40 (340 s) |
| chapters | none | none | none |
| story type | tool + viral repo + AI | model launch (3 vendors in one week) | company acquisition + history |
| words (caption text) | 1212 | 1505 | 1155 |
| words/min over full length | 204 | 202 | 204 |
| mean / median sentence (words) | 22.9 / 22 | 24.7 / 22 | 21.8 / 19 |
| cuts at scene>0.3 | 49 (8.3/min) | 110 (14.8/min) | 72 (12.7/min) |
| cuts/min in 0-15 s / middle / last 30 s | 12.0 / 8.7 / 2.0 | 12.0 / 16.0 / 0.0 | 12.0 / 13.8 / 2.0 |
| shot length median / p10 / p90 (s) | 4.3 / 1.1 / 11.7 | 2.6 / 0.5 / 8.4 | 3.7 / 0.1 / 8.4 |
| longest shot | 54.3 s (the sped-up agent screen recording, 3:27-4:22) | 47.1 s (sponsor demo + end card, 6:40-7:27) | 34.2 s (sponsor demo, 4:57-5:32) |
| visual-change events, scene>0.12 merged 0.5 s | 86 (14.5/min) | 173 (23.2/min) | 96 (16.9/min) |
| median gap between visual-change events (s) | 3.4 | 2.0 | 2.9 |
| sponsor | Apify (MCP server), 4:57 to 5:50 (53 s, 15% of runtime) | CodeRabbit Security, 6:35 to 7:21 (46 s, 10%) | JetBrains Junie Lite, 4:43 to 5:35 (52 s, 15%) |
| sponsor starts at % of runtime | 83% | 88% | 83% |
| joke count (my count, +/-3) | ~17 (2.9/min) | ~24 (3.2/min) | ~12 (2.1/min) |
| intro before "It is <date>... The Code Report" line | 1:10 | 0:50 | 0:39 |
| sign-off | 3 sentences, 4 to 5 s | same | same |

How I measured:
- Words and sentences come from the YouTube auto-subtitles (`en.vtt`, de-duplicated). Sentence length depends on the captions' punctuation, so treat it as approximate.
- Cuts are ffmpeg `select='gt(scene,0.3)'`. The 0.12 pass catches overlays popping in and images swapping, which are not hard cuts.
- Audio is RMS per 0.1 s from a 16 kHz mono decode.
- The meme/stock/reaction clip count (below) was done by eye from the contact sheets, +/-5. Joke counts were done by reading the transcripts.

### Audio, inferred from levels only
- Loudness is nearly flat. Per-10 s mean RMS stays inside a 3 to 4 dB band for the whole video, apart from the last 10 s.
- There are zero quiet runs of 0.4 s or longer (quiet means more than 12 dB under the median). Only 4 to 5% of 0.1 s windows are 12 dB or more below median.
- The 5th percentile sits only about 11 dB under the median (-36 to -39 dBFS vs -25 to -27), nowhere near digital silence.
- So narration is continuous: there are no silence beats, and the gaps between words are filled by a bed (music or sfx).
- I cannot separate music from sfx by level alone.
- The last 10 s drops about 5 dB, and the closing line rides over the sponsor's end card.

### On-screen grammar common to all three (from the sheets)
- Background: near-black. Everything is layered on it as "cards": screenshots with a slight tilt and shadow, white article cards, dark terminal cards. There is no presenter face in any of the three videos.
- Title and day cards: cream rounded pill with chunky rounded display type, e.g. "LAST WEEK...", "TUESDAY (SEP 1ST)", "IN TODAY'S VIDEO...". The first one types in word by word.
- Emphasis: red or pink all-caps tilted stickers ("TRUST ME BRO", "REACHABILITY", "FREE") and a green "$25 FREE" or "10 FREE SCANS" badge.
- Pointing aids: orange highlighter over the quoted line in every screenshot, hand-drawn white or red curved arrows, and a yellow pointing-hand emoji.
- Dates: large pixel-font year stamps (2009, 2018, 2021, 2022, 2026) on the history video.
- Name lower-thirds: white caps in a coloured strip (GREG BROCKMAN, KENTON VARDA, RYAN DAHL, BERT BELDER).
- Transitions: mostly hard cuts and overlays popping in. A few styled ones: pixel/mosaic dissolve into the next card, a swirl/vortex warp, page-curl, and a glitch frame. They mark a topic change.
- Meme, stock-footage or movie-clip cutaways: about 20 in A, 35 in B, 22 in C (1 per 11 to 18 s).
- Code editor: dark VS Code or terminal, recorded at full screen and sped up. Text is unreadable at 360p, so the audience reads the topic, not the code. No typing animation.

---

## Video A: wajoP_5Cpw8 (Adobe clones + reverse-engineer tool)

Structure by seconds:
- 0-70 s: hook and promise.
- 70-153 s: test claim 1 (the open-source clones). Verdict: nearly unusable.
- 153-253 s: the mechanism (REA, the decompile tool) and a demo on Premiere.
- 253-297 s: escalation to a second target (a Supabase clone).
- 297-350 s: sponsor.
- 350-356 s: sign-off.

### Beat map
| time | said (paraphrase) | on screen | device |
|---|---|---|---|
| 0:00-0:12 | Last week a dev, fed up with Adobe pricing, rebuilt seven Creative Cloud apps in Rust and gave them away | "LAST WEEK..." typed on black, then stock clip of a man smashing a PC with an Adobe logo, Adobe app grid, logos turn to skulls, Rust cog, "FREE" sticker | cold open as a story ("Last week..."); stock exaggeration |
| 0:12-0:30 | Name of project, name of dev, he reverse-engineered a 30-year code base with Claude, runs on Linux | GitHub README with star count (46.7k), avatar, businessman yelling about a cancellation fee with red arrow, Ars Technica headline card with the model name highlighted, Linux/Windows/Mac beach meme | sourced by screenshot, not by voice |
| 0:30-0:59 | You can do this too: a viral tool that decompiles any binary; long run-on list of file formats | tweets, spec pages whirling, circuit board, binary digits, container diagram, grave meme with the Adobe/Autodesk/Microsoft logos and "REA" | jargon dump as a joke, visually illustrated one-for-one |
| 0:59-1:10 | Layman's version: virtually every app is now open source, whether it likes it or not | big tweet, "IN TODAY'S VIDEO...", then date card and Code Report logo | title restated as a thesis at ~1 min; date + show name only after the promise |
| 1:10-1:29 | Is it true that one person plus Claude killed Adobe overnight? On the surface yes | Adobe site, download page | rhetorical question, then "yes, but" |
| 1:29-2:33 | Catch: the apps are nearly unusable; narrator pays Adobe $69/mo; tries the video-editor clone in place of Premiere, lag, bad transitions, hopes the project improves | $69.99/MONTH sticker over a stock man at a desk, side-by-side Premiere vs clone, Rust "BLAZINGLY FAST" runner meme, Kubrick portrait with a self-roast caption | self-deprecation, industry roast ("blazingly fast"), deadpan |
| 2:33-3:19 | New idea: reverse-engineer Premiere myself; what a binary is and why it is hard to read | C / C++ logos, assembly to machine code diagram, "Adobe intellectual property" text with highlight | explain-by-picture: three plain steps (source, binary, back) |
| 3:19-3:58 | Demo: install via npx, connect Ghidra, ask the agent to inspect Premiere's timeline feature, get back pseudo-code | terminal with npx command, Ghidra README, Claude Code in VS Code, decompiled C scrolling, "I know HTML" meme | real screen recording, sped up; credit given to the underlying tool |
| 3:58-4:13 | Hand that output to a coding agent to rewrite in Rust; build "Premiere Light" with only the features I want | agent output, Rust code, tweets from two devs who vibe-coded apps instead of paying | payoff of the title: the practical use |
| 4:13-4:57 | Escalate: apply it to a database-as-a-service; call my clone by a joke name, show "orders of magnitude faster" on a made-up benchmark | Vercel/Supabase logos, burning-money clip, Supabase UI, joke logo, benchmark slide, red "TRUST ME BRO" over it | the made-up benchmark is the skeptical beat: it mocks all benchmarks |
| 4:57-5:50 | Sponsor: an MCP server that exposes a few tools and finds the right one, so it saves tokens | logo, MCP setup, terminal install, token list, "$0.08" callout, then logo with "$25 FREE" and code | the sponsor is used inside the running joke (donkey dating app); a concrete number ($0.08) |
| 5:50-5:56 | Sign-off: this has been the show, thanks, next one | logo end card + "Link below" | fixed formula |

Jokes (approximate types, count ~17): jargon-dump parody (2), self-deprecation (4), industry roast (3), deadpan "yes, but" (2), absurd callback app (2), "trust me bro" benchmark (2), sarcastic aside (1), stereotype joke (1; do not copy).

Skepticism: the claim goes in as a thesis, the narrator tests it himself, and the first test fails. The second test uses invented numbers labelled as invented.

---

## Video B: FluKUJyeYD8 (GPT-6 Astra, with two other launches that week)

Structure by seconds:
- 0-50 s: hook (a quote joke, then a recap of the three launches and the promise).
- 54-70 s: aside (desert-festival joke).
- 70-143 s: Tuesday, the Anthropic release.
- 143-182 s: Wednesday, the Meta release and its pricing.
- 182-260 s: Thursday morning, the outage and the messy rollout.
- 260-335 s: Astra itself, with specs and the vendor benchmarks.
- 335-381 s: early reviews and demos.
- 381-395 s: the turn, with the independent index.
- 395-441 s: sponsor.
- 441-447 s: sign-off.

### Beat map
| time | said (paraphrase) | on screen | device |
|---|---|---|---|
| 0:00-0:11 | A philosopher quote (a pop band lyric) about years coming and not stopping; this week felt like years | stock clip of a sunglassed man walking, lyric words stacking in cream/red boxes beside him | cold open on a pop-culture quote presented as "philosophy" |
| 0:11-0:37 | Tuesday Anthropic, Wednesday Meta, Thursday OpenAI called it AGI for the select few | three Hacker News front-page cards stacked with the headlines, orange stickers for the marketing phrases, a crying-face reaction | three events, three weekdays; marketing lines turned into stickers |
| 0:37-0:54 | I made too many CEO jokes to get access; this video breaks down the models, tests how reviewers like it, and looks at a suspicious outage; date + show name | stock footage, "IN THIS VIDEO..." card, Code Report logo | promise in 3 clauses, ending on the "suspicious timing" tease |
| 0:54-1:10 | Normally this week is quiet: the rich and the managers are at a desert festival | desert-festival clip, ocarina meme | filler joke before the content starts; the hook has been paid |
| 1:10-1:56 | Tuesday: Fable/Mythos 5.1 are one model with different guardrails; the safe one changes the subject on dangerous topics; case study of a hedge fund's rare crash bug the model traced to a vendor library | "TUESDAY (SEP 1ST)" card, Anthropic blog with highlight, chat UI blocking a question, Spider-Man pointing meme re-captioned FABLE / MYTHOS, quote card from the customer with the key sentence highlighted, boy-band hedge-fund photo | the joke attaches to a real, sourced case study read from a quote card |
| 1:56-2:23 | Also strong at designing proteins (hit rate about 10% to about 50%) and at mapping Venus from old radar | protein visuals, hit-rate cards, VR protein, Venus globe, "volcano!" sticker | numbers on card, joke on the side |
| 2:23-3:02 | Wednesday: Meta's new model; standard price vs a cheap tier that lets Meta train on your data; "double-digit percent of devs choose it" | "WEDNESDAY (SEP 2ND)" card, Meta blog, CEO tweet highlighted, pricing tables with finger emoji, money-eating meme, "buT i hAveNothiNG to hidE" cartoon | joke on the trade (cheap, but your data): absurd comparison to mystery beef |
| 3:02-3:42 | Thursday morning: ChatGPT, Claude, Grok and Cursor all went down together; boring explanation (a cloud outage) vs the fun theory (Astra killed its competition) | "THURSDAY MORNING" card, status pages, outage article highlighted, cloud logo with burning barrel | Occam's-razor pair: dull cause first, fun theory second, labelled as fun |
| 3:42-4:20 | Launch page went up, embargoed press stories appeared, page was pulled, influencers flexed early access; 90 minutes later it was back and the model was not public; CEO apologised ("go to bed" reply) and said government reviewed it first | Reuters / CNBC / Verge cards, 404, tweets, SpongeBob wait meme, CEO apology tweet, CNBC highlight | a timeline of the mess, each step a card; the last line is a government-first joke |
| 4:20-4:58 | Astra specs: trained on 100k+ GPUs in Texas; pitch is computer use; desktop benchmark 73% in 40 min vs 65% in 75 min for the previous model | "INTRODUCING GPT-6 ASTRA" launch video clip, "100,000+ GPUs" aerial, desktop tasks in a spreadsheet and CAD, OSWorld chart with finger emoji | vendor claim shown with the vendor's own chart |
| 4:58-5:35 | "Trust me bro" benchmarks: 100% on one exploit test, 65% on a science terminal test, 99% on an AGI-generalisation test; first model to hit the company's highest cyber threshold; price same as the rival | tables with red arrow, bodybuilder meme, bar chart, ARC Prize logo, Stanford AGI definition page, safety page, price page with highlight | labelled skepticism: the phrase is said once, then the numbers keep coming |
| 5:35-6:21 | Early reviews are positive the way early reviews are; spatial demos are impressive; one demo of a world full of agents that started chatting | tweets, review article, 3D palace, game and city demos, Unreal Engine logo, agents walking in a scene with a joke caption | positive evidence given fully; joke callback on the agents |
| 6:21-6:35 | But the independent index scores it 61, equal to the previous model and 5 behind the Anthropic one; something does not add up | index bar chart with highlighted bar | the turn: independent source beats the vendor numbers |
| 6:35-7:21 | "One thing that does add up": sponsor, a security scanner that reasons about reachability and exploitability and proposes a fix | logo, then dashboard UI, "REACHABILITY" / "EXPLOITABILITY" / "DEEP SCANS" stickers, PR screen, "10 FREE SCANS" badge | the transition is a pun on the preceding doubt ("add up"); sponsor also tied to the "new exploits every week" theme |
| 7:21-7:27 | Sign-off | logo card + "Link below" | fixed formula |

Jokes (~24): CEO/industry roast (5), absurd comparison (3), self-deprecation (2), deadpan understatement (4), sarcasm about marketing (3), callback (2), drug/body jokes (2; some crude, do not copy), pop-culture misattribution (1), "trust me bro" label (1), pun transition (1).

Skepticism: three layers. (1) Marketing phrases become stickers. (2) Vendor benchmarks are labelled "trust me bro", then shown in full anyway. (3) The independent index is held until about 20 s before the sponsor, so the title's question gets a data-driven "not really" without the narrator ever saying "no".

---

## Video C: l3L_lETiSzc (Deno joins Cloudflare)

Structure by seconds:
- 0-39 s: hook and promise (including "spoiler: not so good").
- 39-44 s: date and show name.
- 44-168 s: backstory (Node 2009, Deno 2018 to 2022, the decline).
- 168-223 s: why the deal (Durable Objects, celld).
- 223-257 s: what Cloudflare gets and the plan.
- 257-283 s: consequences for Deno users and the closing thought.
- 283-335 s: sponsor.
- 335-340 s: sign-off.

### Beat map
| time | said (paraphrase) | on screen | device |
|---|---|---|---|
| 0:00-0:11 | Last week the runtime wars ended: the person who put JS on servers said his company joins a cloud company | "LAST WEEK..." typed, stock soldiers-and-clown clip with three runtime logos, explosion, Deno logo + cloud logo | claim-first cold open; the title claim is stated at 0:00 |
| 0:11-0:27 | On paper a standard acquisition; staff learn what a liquidation preference stack is; but why would a company with its own runtime buy a worse one? | Deno blog post, thumbs-up straw-hat man (sarcastic), stock office scene, article card "Liquidation Preference Waterfall" with an investor/lender pizza-eating meme | joke about corporate speak, then the real question |
| 0:27-0:39 | Promise: what they paid for, why the founder now thinks re-implementing Node was a mistake, what Deno's future looks like, "spoiler: not so good" | Cloudflare docs, HN comment card on "what's in it for them", question marks, "IN TODAY'S VIDEO..." card, architecture diagram | explicit 3-item promise with spoiler |
| 0:39-0:44 | Date + show name | Code Report logo card | |
| 0:44-1:14 | 2009: Node introduced at a conference; 2018: same stage, "10 things I regret about Node"; reveals Deno with built-in tools, TypeScript, secure by default | conference footage with big year stamps, slide, HTTP server snippet, Node logo, regret-talk slide with arrow, "deno fmt" lint-roller, lock, TS logos, "1.0" | history on a year-stamp timeline, clips from the real talk |
| 1:14-1:46 | Deno 1.0 in 2020, hosting platform and $5M seed in 2021; early wins (hosting companies and a chat app used it); $21M Series A in 2022; web framework | Deno Deploy card, funding post, baby meme, partner company posts, "Deno raises $21M" card, framework card | numbers and logos as proof of the high point |
| 1:46-2:30 | Then momentum died: Node added fetch, permissions and TypeScript; Deploy shrank from 35 regions to 6; KV stayed in beta; framework slowed; a legal fight over the JS trademark | wrestler meme, Node docs with highlights, pixel "35 -> 6", lemon image, trademark post, CEO portrait with a sticker, GoFundMe card, laughing-man meme with investor logo | each failure gets its own card and a one-line roast |
| 2:30-2:48 | A blog post said Deno was effectively dead because each release was Node catch-up; the founder had reached the same conclusion | blogger card, "Yeah, Deno is done." sticker, Whac-a-Mole toy, hat-man portrait + HN post with highlight | sourced by screenshot |
| 2:48-3:05 | So the team looked at problems outside the runtime; best answer was Cloudflare's Durable Objects: tiny single-threaded servers each with its own SQLite and WebSocket support | animated diagram: RUNTIME box, then COMPUTE / STATE / SCALE boxes appear one by one inside a dashed "DURABLE OBJECTS" border; green boxes get purple database cylinders, then blue antenna lines | the "what it is" part: build the picture in four steps, each synced to one phrase |
| 3:05-3:42 | Problem: it only works on their cloud; Deno shipped a self-hostable clone in August; the Cloudflare engineer replied that he had tried himself and could not make it work | celld logo, cost chart, tweet card, engineer photo with lower third, blog highlight, shrugging-man meme, strong-kid meme | the pivot of the story is a screenshot of the other side's admission |
| 3:42-4:02 | So they bought the whole company; the plan: merge the clone into the open-source Workers runtime | market-cap chart ($123.2B) with a heavy meme, Deno + cloud logos, founder and co-founder talking-head clips with lower thirds, logo equation "celld + workerd" | one number gives the size (market cap) |
| 4:02-4:28 | The focus is AI agents (aside: can't go a whole video without it); anyone using other Deno products is in trouble: Deno gets bug and security fixes for one year then stops; Deploy has 6 months to migrate | "0 DAYS WITHOUT MENTIONING AI" cartoon, "CHEAP COMPUTE / REAL-TIME CONNECTIONS / PERSISTENT STATE" stickers, "GET CELLD / GET FKED" meme, blog highlighted twice | the "not so good" spoiler paid off with the exact dates; self-aware AI aside |
| 4:28-4:43 | Closing thought: one runtime bought by an AI lab, one by a cloud, a build-tool company bought in June; only Node is left without a cloud owner | news cards with logos, Node logo grey-to-green | summary of the pattern across three deals, ends on the title line |
| 4:43-5:35 | Sponsor: Deno devs migrating can start cheap; a free baseline coding model in the IDE; used it for a rename and a test scaffold in minutes for $0; still use a frontier model for hard work; run agents in parallel | logo, dino-costume meme "DENO DEVS RN", terminal UI, model picker with "Free" and price columns, finger emoji, IDE agent panel, diff review | transition tied to the story; the demo is a real small task and an honest limit |
| 5:35-5:40 | Sign-off | "TRY FREE" badge on the logo card | fixed formula |

Jokes (~12): industry roast (3), deadpan understatement (2), absurd analogy (2), self-deprecation (2), sarcasm on funding (1), self-aware AI aside (1), "financial trauma" quip (1). Less joking than A or B, because the middle is a 2-minute history lesson.

Skepticism: mostly sourced and neutral: blog posts, HN comments, the other side's own post. The take is stated plainly at the end: the title line ("Node won") shows up as a summary, not as hype.

---

## How a news video is built from one news item (the recipe, with numbers)

1. Cold open (0-12 s): one sentence, past tense, "Last week..." in 2 of 3 (the third opens on a pop-culture lyric used as a joke). First thing on screen is a typed cream title word, then a stock or meme clip that exaggerates the headline. The first spoken sentence already contains the surprising fact or the title claim.
2. Fast naming (12-40 s): who did it, name of the thing, the key number. Every claim gets a screenshot (headline, repo stars, tweet, post) with an orange highlight on the exact line.
3. The promise (28-60 s): one sentence that restates the title as 2 to 3 things this video will do. A: test the claim (find out whether it is the end of software as we know it). B: break down the models, see how reviewers like it, look into the outage. C: what was paid for, why the founder changed his mind, what happens to Deno ("spoiler: not good"). "IN TODAY'S VIDEO..." appears as a card in 2 of 3 (A and C; B has "IN THIS VIDEO...").
4. The date + show name line comes after the promise, at 0:39 / 0:50 / 1:10. The brand is never the first thing; the story is.
5. Backstory only as far as the decision needs. C spends 124 s (37% of the video) on history, but every beat is a year stamp and a number. A and B spend 0 to 20 s on history and start straight from the event.
6. "What it is / how it works" is shown, not told. C: a 4-step diagram built piece by piece in ~15 s. A: three plain steps (code, binary, back) as images, then a real, sped-up demo (~40 s). B: the vendor's own launch page, charts and demos, never a demo run by the host.
7. Claims and benchmarks: sourced by screenshot (not by voice), vendor numbers get a joke label ("trust me bro"), and a third-party or opposing source is saved for the turn. B holds the independent index until about 20 s before the sponsor; A mocks its own invented benchmark; C quotes the other side's admission.
8. The turn (about 80 to 85% in): "but" or "something doesn't add up" right before the sponsor. A: "another thing you can trust". B: "one thing that does add up". C: "make the move cheaper". The sponsor transition is a pun or a story tie-in in all three.
9. Sponsor: 46 to 53 s, 10 to 15% of runtime, starts at 83 to 88%, always after the content has paid off. Always has a concrete demo number or action ($0.08, $0 task, 10 scans) and a badge on the end card. The first line of every description is the sponsor link.
10. Ending: 3-sentence fixed sign-off over a static end card (~10 s, 0 to 2 cuts/min). No recap, no subscribe ask. The last content beat is the sponsor CTA.
11. Title and 10-s promise payoff:
    - A: the title's thesis is first said at 0:59. The video agrees on the surface, shows it breaks on contact (clones are bad), then shows the mechanism that makes it real (decompile + rewrite).
    - B: the title is a question; the claim is stated in the first 30 s as "called AGI by a few", and the answer comes only from data (the independent index equals the last model), never as a yes or no.
    - C: the title is the claim and the 10-s promise (the wars ended); each of the three promised items is delivered in the order promised.

---

## Formula for a writer and an animator

Writer:
1. Pace: about 200 words/min (202 to 204 in all three), sentences of roughly 20 to 25 words, one idea per sentence, no pauses. Target 1,150 to 1,500 words for 5:40 to 7:30.
2. Open with a claim or a one-line anecdote in the first 12 s; give the full promise (2 to 3 items) by 28 to 40 s; place the date + brand line only after the promise (39 to 70 s in). Rule: nothing before the promise except the claim and one joke.
3. One joke per ~20 to 30 s (2.1 to 3.2 per min). Types seen: self-deprecation, industry roast, deadpan "yes, but", absurd analogy, callback, pun transition. The history-heavy video had the fewest (2.1/min); the product-launch video the most (3.2/min).
4. Every non-trivial fact has a visible source: the narrator rarely says it, a card shows it with the key line highlighted. Name the people and the numbers (percentages, prices, dates, valuations).
5. Skepticism recipe: quote the marketing, label vendor benchmarks, give the dull explanation before the fun one, and hold the independent number for the turn.
6. Explain a new thing as 3 to 4 sequential pictures, each lasting one sentence. Add the demo (if any) after, in under 45 s.
7. Place the sponsor at 83 to 88% (after the payoff and before the sign-off), 45 to 55 s, with a transition that reuses the story's last doubt, plus one real demo or number and one offer.
8. Close with a fixed 3-line sign-off of about 5 s. Do not use the source channel's wording; write our own fixed line.
9. Test 2 to 3 titles per story; the channel changed one title after launch.

Animator:
1. Black background, content as tilted cards with soft shadow; never a plain talking head.
2. Hard cuts at a median shot length of 2.6 to 4.3 s; p10 0.1 to 1.1 s (bursts of fast cuts on a list), p90 8 to 12 s. Cuts per minute: 8 to 15 overall at scene>0.3, and 14 to 23 visual-change events/min at 0.12.
3. First 15 s: only 3 hard cuts but 4 to 6 visual-change events; overlays and word-by-word typing carry the motion.
4. A meme/stock/reaction clip every 11 to 18 s, always matched to the sentence. Stock footage that exaggerates the headline is used for the first 10 s.
5. Highlighter (orange) on the sourced line, hand-drawn arrow, pointing emoji, tilted red uppercase sticker for the joke label, green badge for the sponsor offer.
6. Year stamps (large pixel font) for history; weekday cards for a week-in-review structure.
7. One styled transition (dissolve, swirl or page curl) at each major topic change; everything else is a hard cut.
8. End card: static brand logo + offer badge + "link below", about 10 s, holding the sign-off.
9. Audio: continuous narration at constant loudness (3 to 4 dB range), a bed under the gaps, no silence beats. Keep the last ~10 s about 5 dB quieter.

## Not to copy
Show name, "Last week..." typed card, cream pill title style, the fixed 3-line sign-off, the "trust me bro" label, stock-footage gags and
the day-card look are all this channel's identity. The offensive and stereotype jokes in A and B are also not part of the formula.
