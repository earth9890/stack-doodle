# Watch A, bucket "100s": deep-watch of 4 "X in 100 Seconds" videos (3 true shorts + 1 collab)

Study of format only (paraphrased, no scripts or catchphrases to be reused). Private transcripts, frames and cut lists are in `private/` (`transcripts/<id>.txt`, `frames/<id>/`, `cuts/<id>.txt`).

## 0. Selection and caveats

- Candidate pool: 166 long videos with "in 100 Seconds" in the title. I fetched view counts for 56 of them (every 3rd row of `flat-videos.tsv`, so the sample spans 2020 to 2026). The 110 unsampled titles could hold a higher-viewed video.
- Picks: top-2 by views in the sample, plus the most-viewed uploaded in the last 24 months (cutoff 2024-10-22) from a different topic family. Because the CPU video turned out not to be a true short, the lead added the next most-viewed true short (C#).
  - `vqs_0W-MSB0` How a CPU Works (hardware): 3.13M views, 2021-05-06.
  - `5C_HPTJg5ek` Rust (language): 2.59M views, 2021-10-12.
  - `uHm6FEb2Re4` DuckDB (database): 536k views, 2025-08-14. TanStack Start (386k) was next.
  - `ravLFzIguCM` C# (language): 2.55M views, 2021-12-06. Added later.
- **Important caveat on the CPU video.** It is 763 s (12.7 min) long. Only the first 0:00 to ~2:11 is a true 100-second explainer. At 2:11 the presenter hands off to a guest (Alex Ziskind, M1 vs i9 comparison, chapters 02:25 to 11:55). I analyse 0 to 134 s as "the short" and treat the rest only as context. For format work the **three true shorts are Rust (149 s), DuckDB (142 s) and C# (147 s)**. All "average across shorts" numbers below use these three and exclude CPU. Two are 2021 and one is 2025, so any "formula" is a 2021-to-2025 mix with n=3. Treat single-case behaviours (e.g. the turn) as options, not laws.
- All four have **no sponsor segment**. The shorts carry no sponsor or merch read, only the sign-off.
- "100 seconds" is a brand, not a runtime. The actual spoken content runs 134 to 137 s (+ a 6 to 13 s sign-off): "…has been Rust in 100 seconds" lands at 137 s, DuckDB at 135.6 s, C# at 134.3 s, CPU's wrap line at 131 s.

## 1. Measured numbers

| | CPU (first 134 s, collab) | Rust | DuckDB | C# | 3-short mean (Rust, DuckDB, C#) |
|---|---|---|---|---|---|
| Duration | 763 s total; short = 134 s | 149 s | 142 s | 147 s | 146 s |
| Views / likes / comments | 3,128,408 / 82,717 / 1,600 | 2,587,666 / 85,655 / 1,600 | 536,501 / 29,805 / 993 | 2,554,683 / 87,637 / 1,800 | n/a |
| Like rate | 2.6% | 3.3% | 5.6% | 3.4% | n/a |
| Chapters | 7 (guest-led) | 5 | 5 | 7 | n/a |
| Spoken words (cleaned VTT, de-duplicated) | 449 | 492 | 477 | 503 | 491 |
| Words per minute | 201 | 202 | 202 | 207 | 204 |
| First spoken word | 0.2 s | ~2.7 s (after logo build) | 0.1 s | 0.2 s (logo sting runs under it) | 0.1 to 2.7 s |
| Sentences (DuckDB only, has punctuation) | n/a | n/a | 24 sentences, mean 19.9 words, median 15, max 66 | n/a (no punctuation in subs) | n/a |
| Hard cuts, scene > 0.3, per min | 5.4 | 6.0 (15 cuts) | 8.9 (21 cuts) | 2.9 (7 cuts) | 5.9 |
| Visual changes, scene > 0.1, per min | 11.6 | 18.9 (47 changes) | 18.6 (44 changes) | 10.2 (25 changes) | 15.9 |
| Visual changes, scene > 0.05, per min | 16.6 | 30.2 | 46.5 | 34.3 (84 changes) | 37 |
| Median / p10 / p90 shot (> 0.1) | 4.9 / 0.9 / 6.5 s | 2.25 / 0.07 / 6.4 s | 2.8 / 0.13 / 4.6 s | 3.5 / 1.0 / 7.1 s | 2.8 s median |
| Median / p10 / p90 shot (> 0.3) | 5.8 / 1.7 / 10.4 s | 6.2 / 1.0 / 20.5 s | 4.4 / 2.3 / 7.8 s | 5.6 / 2.9 / 49 s (code editor held for ~49 s at a stretch) | 5.6 s median |
| Cuts/min at > 0.3: 0–15 s / middle / last 30 s | 16.0 / 4.0 / 4.0 | 16.0 / 5.2 / 4.0 | 12.0 / 9.3 / 6.0 | 8.0 / 1.8 / 4.0 | 12 / 5.4 / 4.7 |
| Cuts/min at > 0.1: 0–15 s / middle / last 30 s | n/a | n/a | n/a | 24 / 8.8 / 8.0 | busiest in first 15 s (logo sting + first facts) |
| Narration level (RMS per 1 s) | steady -19 to -21 dB | steady -18 to -19 dB | steady -22 to -23 dB | steady -18 to -20 dB | -18 to -23 dB |
| Pauses of 0.12 s or more below -35 dB | 1 in 134 s | 1 in 134 s | 6 in 134 s (11 at -30 dB) | 0 in 134 s (1 at -30 dB) | 0 to 6 |
| Full-video cut stats (for reference) | 203 cuts, 16.0/min, median 2.87 s | n/a | n/a | n/a | n/a |

How measured:
- Words and wpm come from YouTube auto-subs with rolling captions de-duplicated, divided by spoken span.
- Cuts come from `ffmpeg select='gt(scene,T)'` at 360p. C# at 0.3 shows only 7 cuts because most of its demo is one editor held on screen with typing inside it. At 0.3 the animated graphics undercount badly, because most "changes" are an asset popping in on an otherwise static dark canvas and not a hard cut. The 0.1 row is the better proxy for "something new on screen".
- Audio comes from `astats` at 1 s windows plus `silencedetect`. Narration is loud and flat the whole way, with no silence beats and no dips. Whether a music bed sits under it cannot be separated from loudness alone. Any bed is inaudible or very low. The Rust, CPU and C# narration is edited with essentially zero breaths (0 to 1 gaps in 134 s). The 2025 DuckDB narration keeps a few more (6 to 11).

## 2. Beat maps

### 2.1 Rust in 100 Seconds (`5C_HPTJg5ek`, 2021-10-12, 149 s)

Chapters on YouTube: 5.

| Time | What's said (paraphrase) | On screen | Device |
|---|---|---|---|
| 0–3.5 s | (silent logo build; VO starts ~2.7 s) | Rust logo assembles out of a thin outline with a glow on near-black navy | Brand sting |
| 2.7–16 | One-sentence definition: memory-safe compiled language, high-level simplicity with low-level performance; used where speed is critical (game engines, databases, OS), good for WebAssembly | Keywords pop as sticker chips over night-road driving footage: HIGH-LEVEL, SIMPLICITY (green chip), LOW-LEVEL, PERFORMANCE (yellow chip), SYSTEMS (tilted). Then one logo per noun: retro game, Amethyst engine, MeiliSearch (typing demo), Linux penguin with "?", WA | Visual per noun, each within ~0.5 s of the word |
| 16–29 | History: side project, creator's name, 2007; named after a fungus; Mozilla sponsored in 2009; "most loved language since 2016"; fans called Rustaceans | GitHub profile + "2007 / GRAYDON HOARE"; leaf-fungus stock photo; moz://a logo with "SPONSORED IN 2009"; animated bar chart (Rust 86.1% top); mascot crab with RUSTACEANS label | Dated facts, named person and org, ranking chart |
| 29–44 | Problem: high-level languages have a garbage collector that hampers control; low-level languages give free/allocate so you can hurt yourself | Python+Go logos, garbage-truck video, Nerf-gun image with "AUTOMATIC MEMORY MANAGEMENT"; C++ logo + code window + photo of a foot being shot | Verb gags rendered literally (nerf your control, shoot yourself in the foot) |
| 44–87 | Core idea: no GC, safety via ownership and borrowing. Immutable by default means stack; mutable or unknown-size values go to the heap; each value has one owner, dropped when out of scope; borrowing = reference without ownership; many rules, checked by the borrow checker at compile time | "OWNERSHIP & BORROWING" with a hand holding a key; ice-cube "IMMUTABLE BY DEFAULT" next to `let hello = "hi mom"`; CALL STACK diagram; blue heap cloud; code `let my_dog = Pug::new()` with a woman walking a pug on a leash (OWNER and VALUE arrows); `drop(my_dog)` "CALLED AUTOMATICALLY BY RUST"; second person walks the dog via `&my_dog` "REFERENCE A VALUE"; red list NULL POINTERS / DANGLING POINTERS / RACE CONDITIONS beside a "OBEY THE RULES" meme still; BORROW CHECKER chip; terminal with compile errors; woman in helmet stock clip | One running analogy (dog + leash) carries the hardest concept. Meme reaction for "ton of rules". On-screen list names the bugs the VO never says |
| 87–121 | Tooling and code: package manager (cargo, packages are crates), `cargo new`, main function, `let` with name and type, immutable by default so add `mut`, name is the owner, borrow with `&`, a macro prints, std library | Crate-box animation + crates.io page; terminal `cargo new`; VS Code with explorer; code typed live (1 line, then growing) with Intellisense lightbulb and error squiggles; hand-pointer stickers; chips NAME / TYPE / VALUE, MUTABLE, & BORROWING, MACRO!; STD page + list I/O, filesystem, multithreading, "and more!" | Typed code with sticker chips naming each token. 3 to 6 lines max on screen |
| 121–137 | Compile with the compiler and you have a memory-safe executable | Terminal `rustc`, `.exe` appears in explorer (hand-pointer), warning text, logo re-forms (136 s) | Payoff = the thing exists |
| 137–149 | "This has been Rust in 100 seconds." CTA: like/subscribe for more short videos, comment if you want a full tutorial, see you next time | Logo bookend (136–139), "SUBSCRIBE" word with logo as the O, "MOAR?" with logo, brand flame logo + URL on black (146–148), black | CTA asks for the next topic (comment feedback loop). ~12 s sign-off, 8% of runtime |

Rust section budget (seconds, % of 149): sting+definition 3.5+13 (11%), history 13 (9%), problem 15 (10%), core concept 43 (29%), tooling+code 34 (23%), compile 16 (11%), sign-off 12 (8%).

### 2.2 DuckDB in 100 Seconds (`uHm6FEb2Re4`, 2025-08-14, 142 s)

Chapters on YouTube: 5.

| Time | What's said (paraphrase) | On screen | Device |
|---|---|---|---|
| 0–4.5 | VO starts at 0.1 s: open-source, fast, embeddable SQL OLAP database that simplifies analytics implementation | Yellow duck-logo ring forms and glows over near-black (0–4.5 s), then a blue data-wall stock clip with a silhouette | Logo sting *under* the first clause (no dead air) |
| 7.8–14 | History in one breath: made in the Netherlands, written in C++, first released 2019. Then "TL;DR" | Windmill landscape, C++ logo, "2019", then text "tl;dr" typing out | Facts compressed to ~6 s. "TL;DR" resets attention |
| 14–31.5 | TL;DR is "SQLite for columnar data". SQLite is the most-deployed DB because it is a single binary, no server process, embedded in billions of phones. DuckDB is built on the same philosophy | SQLite logo → arrow → "column-store" table graphic; blue cell-blob + monitor on fire gag; user→RDBMS(X'd out)→database diagram; cracked phone "over 1 trillion deployments!" (a figure in text that is not spoken); duck photo | Definition by analogy to something the audience already trusts. On-screen text adds a number the VO omits |
| 31.5–62 | Row-wise vs column-wise. Rows are great for transactional apps (e-commerce reading or writing whole records), bad for large time-series analytics (IoT) where you read one column across many records. Column storage makes aggregation (average), filters and joins faster | "PRODUCT / PRICE" table graphic splits into rows then columns; "row-wise" with phone icon + OLTP chip (green); marketplace screenshot as the e-commerce example (a dark joke); trading-terminal footage; "column-wise" with stopwatch + OLAP chip; Parquet row-group diagram; stock-chart footage, "DATA AGGREGATION" chip | OLTP/OLAP acronyms get a chip and one object each (phone, stopwatch) |
| 62–72.5 | Performance on huge datasets from a columnar, vectorised query engine: batches of values processed as vectors in parallel | Benchmark line chart (DuckDB vs ClickHouse/HyPer/Pandas); duck cartoon + chip "COLUMNAR-VECTORIZED QUERY EXECUTION ENGINE"; coloured pixel-block batches | Jargon chip appears verbatim, mascot on the side |
| 72.5–76.5 | Already used at big companies: Meta, Google, Airbnb | Three logos around the duck logo | Social proof in 4 s |
| 76.5–102 | Get started: install, run `duckdb` in terminal, insert data, select one column, query a CSV or parquet file directly, export to JSON or an HTML table | `curl … | sh` line; terminal banner; dark editor with `app.sql`, ~6 lines (CREATE TABLE horses, INSERT); `sales.csv` in explorer; `SELECT … FROM 'sales.csv'`; `COPY … TO 'output.json'`; round table labelled HTML (literal-pun for "table") | Code typed live in one pane. Selected line highlighted blue |
| 102–123 | Turn: "That's cool and all, but the real power is aggregation on time-series data." Imagine a big stock-price dataset: avg/max/min for the last day via built-in aggregates and GROUP BY to bucket time | Hands on calculator stock clip; STONKS meme; editor grows one aggregate line at a time; chips "AGGREGATE FUN", "TIMESTAMP FUN" with hand-drawn arrows; ~7 to 9 code lines visible | Meme + deadpan. One concept per added line |
| 123–135.5 | Under the hood: unlike SQLite (row by row) it processes vectorised batches and is multi-threaded by default, great for analytics | Yawning man at a laptop + SQLite logo "ROW BY ROW"; pixel batches fly past duck logo; trading footage with glowing logo | Callback to the opening contrast, closing the loop |
| 135.5–142 | "This has been DuckDB in 100 seconds." Thanks, see you next time | Logo bloom over chart footage, fade. Audio fades to -45 dB in the last second | No CTA, no outro card. ~6.5 s, 4.6% of runtime |

DuckDB section budget (seconds, % of 142): definition 8 (5%), facts 6 (4%), SQLite analogy 17 (12%), core concept 41 (29%), social proof + install 8 (6%), basic demo 26 (18%), "real power" demo 21 (15%), recap 12.5 (9%), sign-off 6.5 (5%).

### 2.2b C# in 100 Seconds (`ravLFzIguCM`, 2021-12-06, 147 s)

Chapters on YouTube: 7 (0, 36, 57, 65, 80, 102, 122 s). The chapter boundaries match my beat boundaries below to within 2 s, so the beats are not my invention.

| Time | What's said (paraphrase) | On screen | Device |
|---|---|---|---|
| 0–3.5 | VO starts at 0.2 s: a statically typed general-purpose language, the workhorse of the .NET framework | Green logo draws on as a glowing outline, fills solid at ~2 s; purple .NET bot mascot waves in at ~3 s | Logo sting under the first clause. Definition is ~16 words |
| 6–16 | Created in 2000 at Microsoft by a named designer; designed as a modern, C-like, object-oriented language; was going to be called "Cool" | Vertical year scrubber (1998 to 2002) over a colour-block backdrop, cut-out portrait + name chip; "MODERN", "C", C++ logo + "-LIKE", "OBJECT-ORIENTED", "LANGUAGE" as big grey words; then letters C-O-O-L with a sunglasses stock face pasted in the middle | Pun made literal: the "cool" gag is a face with shades dropped into the letters |
| 16–22 | At first criticised as an imitation of Java; now one of the most popular and most-loved languages | Wrestler entering with Java logo on his vest, then a cheering crowd with a C# logo jersey; bar chart (survey, C# mid-pack) with a pixel heart and "POPULAR" chip with hand-pointer | Meme still stands in for "criticised" and then for "loved"; pixel heart for "loved" |
| 22–36 | Use cases: desktop apps with .NET Core, cross-platform mobile with Xamarin, web with Blazor, games with Unity; open source in 2014 | Orbit-card layout: C# logo in a ring on the right, a dashed orbit, each platform logo swings in with a two-line label chip (.NET CORE / DESKTOP APPS, XAMARIN / MOBILE APPS, BLAZOR / WEB APPS, UNITY / VIDEO GAMES); open-source badge + compiler-platform web page; a horizontal blur whip into the next section | One logo per noun, each arrives inside ~0.5 s of the word |
| 36–47 | Architecture: source is compiled to an intermediate language, run by the common language runtime, becomes native code on any OS with no recompiling | File icons C# → CIL (wavy connector) → CLR box with Linux, Windows and Mac icons; diagram greys out when the next feature appears | Diagram built in the order of speech |
| 47–65 | Features: object-oriented; also lambdas; LINQ queries on any data structure; memory-safe via garbage collection; but unsafe pointers if you want them | Code card labelled OBJECT / ORIENTED; `Func<int,int>` lambda card; LINQ query card with a tilted "LINQ" sticker; green "MEMORY SAFE" chip + garbage-truck clip; `int*` pointers card + a lab-coat stock photo (danger, mad scientist) | Feature checklist: one card per feature, ~3 to 5 s each |
| 65–80 | Getting started: install the SDK, run `dotnet new`, it creates a program file that imports the system namespace and has a class with Main | "Download .NET" page; terminal with `dotnet new console` and restore output; editor with `using System;` and chips IMPORT CODE and START HERE | Install page, terminal, then editor in 15 s |
| 80–122 | Syntax and OO: variable = type, name, value; non-null by default, add `?` to allow null; wrap code in a namespace; class with constructor and destructor; inheritance and polymorphism; properties with get/set; methods; lambdas | One editor, typed live: chips TYPE / NAME / VALUE; autocomplete dropdown for `null`; NULL SAFE; namespace hand-pointer; CONSTRUCTOR; ~FINALIZER; INHERITANCE; POLYMORPHISM; AUTO-IMPLEMENTED PROPERTIES; METHOD; LAMBDAS. Code strings carry jokes (a class named for people with an "I'm alive!" / "I'm in heaven now" constructor and finalizer) | The longest single take (~42 s, one editor, ~9 chips). Jokes live inside the code |
| 122–134 | Async: task-based pattern, async/await syntax for non-blocking code; run with `dotnet run` | Thread-pool diagram: TASK → pool of four yellow blocks → RESULT; code `await SlowTask()` ×3 with a pixel heart; terminal `dotnet run`; logo bloom over the terminal (~134 s) | Payoff = the terminal runs; logo re-forms as the bookend |
| 134–147 | "This has been C# in 100 seconds." CTA: like and subscribe for more short videos, comment if you want a full .NET or Unity tutorial, see you next time | Like/subscribe shown as code (`like = new Like()`, `sub = new Subscriber()`), then "MOAR?" with the four logos from the use-case section, flame logo + URL on black | CTA is dressed in the topic's own syntax. ~12.7 s sign-off, 8.6% of runtime. Ends with 1 s of fade (-36 dB) |

C# section budget (seconds, % of 147): definition 6 (4%), history 16 (11%), use cases 14 (10%), architecture + features 29 (20%), setup 15 (10%), syntax tour 42 (29%), async + run 12 (8%), sign-off 13 (9%). Code demo total (65–134) = 69 s = 47%.

Observations unique to C#: it is a feature checklist with no narrative contrast and no "turn". The history beat is the longest of the three (16 s) and has two jokes. The topic-specific CTA graphic (code-styled like/subscribe) is the same trick as the Rust "MOAR?" card (logo as a letter) and is worth copying as a principle: wrap the CTA in the video's own visual language.

### 2.3 How a CPU Works (`vqs_0W-MSB0`, 2021-05-06): 0 to 134 s short only

| Time | What's said (paraphrase) | On screen | Device |
|---|---|---|---|
| 0–4 | CPU is like a car engine, or the brain in your skull, or a fancy calculator | M1 and Intel logos (collab teaser, 0–2 s), then a car-engine photo for 2.5 s, brain x-ray, retro PC + calculator | Three analogies in ~6 s. Each held ~2 s |
| 7–26 | It runs your apps; JS or Python becomes machine code; the CPU is metal and silicon with billions of transistors (on/off switches = 1 and 0) | JS and Python logos; IBM instruction-set card; CPU icon with a binary packet going into it; die map; transistor row "01010101" + SEM microscope image | Zoom in on the physical object |
| 26.5–47 | Transistors combine into logic gates; an AND gate takes two inputs and returns true only if both are true; billions flip billions of times per second | Gate sheet (OR/NOR/AND/NAND…), AND symbol with truth table, schematic of chained gates | Real diagram, then one worked example |
| 48.6–66 | Clock generator sets timing; more pulses per second = faster, measured in GHz; overclocking aside | Alarm clock with CLOCK GENERATOR chip; sine waves labelled 1.8 / 3.3 / 4.8 Hz; liquid-cooled gaming PC footage | Aside (overclock) is a throwaway joke beat, ~5 s |
| 63–73 | CPU talks to RAM in a four-step cycle | CPU↔ALU↔RAM loop diagram with 1. FETCH, 2. DECODE, 3. EXECUTE, 4. STORE | Roadmap before the walk-through |
| 74–97 | Fetch: program counter starts at 0, copied to memory address register, control unit copies data to the instruction register | "1. FETCH" chip; RAM table (address / value); three coloured registers (purple, blue, yellow) filling with values 1011 1110 and 0000 | Animated state machine, one register at a time |
| 98–110 | Decode: control unit splits the instruction into opcode (e.g. add) and operand (memory address) | "2. DECODE"; 1011 (OPTCODE) 1110 (OPERAND) boxes; hand-pointer, chips ADD and ADDRESS | Same chip grammar |
| 110–131 | Execute: ALU does the math and stores the result in RAM; repeat billions of times; multiple cores run in parallel. "That's how a CPU works." | "3. EXECUTE"; die diagram; CPU→ALU→RAM; full loop again; multi-core graphic | Loop diagram re-shown to recap |
| 131–140 | Hand-off: "there's a lot more you should know about architectures…" and introduction of the guest | M1 chip graphic over the opening engine photo | Collab bridge. No sign-off CTA |

Section budget of the 134 s short: analogies 7 s (5%), what-it-runs 10 s, hardware/logic gates 21 s, clock 13 s, cycle 60 s (45%), hand-off ~7 s.

What follows 2:11 (not analysed in detail, skimmed): the guest on camera in front of a plain backdrop with a lower-third card, interleaved with stock clips, Apple slides, a sandwich-shop analogy (SoC vs separate chips as store runs), benchmark tables. Fireship's flame logo appears at the very end as an end slate. The guest segment cuts at 16 per min and has a median shot length of 2.9 s.

## 3. How a 100-second explainer is structured, second by second

The three true shorts (Rust, DuckDB, C#) give one skeleton; CPU's first 134 s agrees where noted. They agree to within a few seconds on the opening and sign-off, and differ on the middle (Rust and DuckDB have a contrast act and a concept act; C# is a feature checklist). Times are seconds from video start.

| Time | Beat | Content rule | Screen |
|---|---|---|---|
| 0–3 | Logo sting + first VO word | VO is already speaking by 0.1–2.7 s (Rust holds ~2.7 s of pure logo, DuckDB starts at 0.1 s, C# at 0.2 s). CPU has no sting and opens on analogies. First sentence is the definition. | Logo builds from outline to solid with glow on near-black navy (about 2 s) |
| 3–8 | The definition | ONE sentence of ~16 words (DuckDB 16, Rust 15, C# 16 for the definition clause; CPU's analogy sentence is 25): X is a [adjective] [category] that [benefit]. Rust 13.6 s (with use cases), DuckDB 7.7 s, C# ~6 s, CPU 7 s for three analogies. | Chips with keywords (HIGH-LEVEL, SIMPLICITY…) or key stock clip behind them |
| 8–16 | Who/what it is used for | Use cases listed as 3 nouns, each with its own logo or screenshot within 0.5 s of the word | Left logo/right label two-column cards |
| 8–29 | History beat | Who made it, when, which org, ranking/popularity. 6 s (DuckDB), 13 s (Rust), 16 s (C#). Always dated (2007, 2019, 2000), always one named entity. Ends on or contains a joke fact (fungus name, fan name, the near-name "Cool"). | Screenshot + big year + name chip; stock photo; org logo; animated bar chart |
| 14–45 | "Why it exists" / contrast | The thing it is NOT: the old way. Rust 15 s on GC vs manual memory. DuckDB 17 s on SQLite and row-wise vs column-wise. Defines by contrast to a thing the audience already knows (SQLite, C++, Python/Go). C# has no contrast act; it uses a 6 s "criticised as a Java imitation" aside instead. | Old thing's logo, diagram with X over the removed part, 1 visual gag per 5 s |
| 30–75 | "How it works" core | 20 to 29% of the runtime (Rust 43 s; DuckDB 41 s; C# 29 s of architecture + features; CPU cycle 60 s). 3 to 5 sub-concepts max (C# lists 5 features at 3 to 5 s each). Each gets: spoken term + chip with the term + one concrete object (key, dog leash, stopwatch, alarm clock, garbage truck). One running analogy for the hardest concept in Rust and DuckDB; C# has none. | Diagrams animate in one element per phrase; terms appear as ALL-CAPS chips |
| 72–77 | Social proof (optional) | Names 3 big-company users in one clause (DuckDB 4 s) | Logos in a row |
| 77–125 | Code demo (software topics) | 23% to 47% of runtime (Rust 34 s, DuckDB 46.5 s, C# 69 s). Install, first run, one core operation, and in DuckDB ONE twist that shows the real strength; C# instead tours syntax (type, null, namespace, class, inheritance, properties, lambdas, async) at ~4 s per concept. Each line of code is typed or revealed as it is explained, with a chip naming the token | Dark VS Code-like pane, zoomed so 3 to 9 lines fill the frame; hand-pointer stickers; terminal for run/compile; C# holds the same editor up to ~42 s while code is typed |
| ~100–105 | The turn (DuckDB only, optional) | Signalled by a deadpan phrase ("that's cool and all, but…" / "the real power is…") followed by the real use case. Appears once, ~72% through. Rust and C# have no such beat; their "payoff" is the compile/run at the end | Meme still + new code example |
| 123–137 | Recap / payoff | Restate the single differentiator in one sentence; callback to the opening contrast (DuckDB: row-by-row yawn gag). Rust and C#: compile/run and show that it works (terminal output + logo bloom). | Callback image; terminal outcome |
| 135–149 | Sign-off | "This has been X in 100 seconds" at 134 to 137 s. Then thanks/see-you-next-time. Rust and C# (both 2021) add like/subscribe + "comment for a full tutorial" (~12 to 13 s); DuckDB (2025) is just 6.5 s with no CTA. In C# the CTA is drawn as code. | Logo returns (bookend), then end-slate/flame and fade to black. Audio ends with 1 s fade (-45 dB) |

Visual density: at the 0.05 threshold a new asset or state change every ~1.1 to 2 s (Rust 30 per min, C# 34, DuckDB 46; mean 37). At 0.1 it is a change every 2.3 to 3.5 s (Rust 18.9, DuckDB 18.6, C# 10.2; mean 15.9 per min, median shot 2.8 s). C# is lower because its long editor take (~42 s) changes only by typing. Hard cuts at 0.3: median shot 4.4 to 6.2 s (Rust p90 20 s and C# p90 49 s are the editor typing takes). The first 15 s is always the busiest stretch (C# 24 changes per min at 0.1, vs 8.8 in the middle).

## 4. Rules for a writer

1. **Cadence: ~200 wpm, no air.** All four videos land at 201 to 207 words per minute (mean of the three shorts 204). A 142 to 149 s short is 477 to 503 words. Pauses are mostly cut (Rust, CPU and C# have 0 to 1 gaps above 0.12 s in 134 s; DuckDB 6 to 11). Write for a ~490 word script.
2. **First sentence is the definition, and it arrives inside the first 3 s of speech.** No cold open, no hook line, no "hey guys". VO starts at 0.1 to 2.7 s (C# at 0.2 s). The hook is that the answer is already starting. Length about 15 to 16 words for the definition clause (three of three shorts); Rust then adds a second clause of use cases (~20 words).
3. **History beat is 6 to 16 s and present in all three software shorts.** Always contains: a year (2007, 2009, 2016, 2019, 2000, 2014), a place/org/person, and in Rust and C# a popularity number or ranking. One mildly funny fact lives inside it (named after a fungus; fans' nickname; nearly named "Cool").
4. **Explain by contrast to something the audience already trusts.** Rust is "not C++, not Python/Go", DuckDB is "SQLite for columns"; C# is the lighter case ("Java imitation, then loved"). In Rust and DuckDB the contrast is stated in the first 15 s of the core section, then re-used as the callback in the recap.
5. **One analogy object per hard concept, kept for the whole concept.** Dog + leash for ownership and borrowing (~20 s). Alarm clock for the clock generator. Stopwatch for OLAP. Never two analogies for one concept; CPU's opener stacks three analogies but each only lasts 2 s and is a joke, not an explanation.
6. **Budget: 20 to 29% core concept, 23 to 47% code, 4 to 11% each for definition and history.** Rust 43 s concept + 34 s code; DuckDB 41 s concept + 46.5 s code; C# 29 s concept + 69 s code. Concept plus code is 52 to 67% in the three shorts (Rust 52%, DuckDB 62%, C# 67%). Sign-off 5 to 9%.
7. **A turn near the 72% mark is optional (1 of 3 shorts).** Only DuckDB (2025) has one: "that's cool and all, but the real power…" at 102.5 s of 142 s. Rust and C# (2021) have no turn and run as feature tours that end on a compile/run payoff (~129 s of 149 s and ~132 s of 147 s). The turn makes the demo feel like a story instead of a feature list; the C# tour works only because each concept is 3 to 5 s.
8. **Jokes: sparse in the words, dense in the pictures.** By my reading verbal jokes are about 1 to 2 per minute and mostly one-clause (roast of a feature via a verb: "nerf your control", "shoot yourself in the foot", "fancy calculator", "overclock at the cost of life expectancy"). Visual gags run about 2 to 3 per minute (my count: ~6 in DuckDB, ~5 in Rust, ~5 in C#) (foot-gun photo, STONKS meme, yawning stock-footage man for "row by row", marketplace screenshot for "e-commerce", round table for "HTML table", "OBEY THE RULES" meme for "a ton of rules", sunglasses face in the letters of "COOL", wrestler-entrance meme for "imitation Java"). In C# jokes are also hidden inside code strings (3 in the OO section), which makes the demo itself funny. Counting those, C# is ~4 jokes per min. Deadpan, no laugh pause, the next sentence starts immediately.
9. **Numbers and facts: dates, named entities and one chart, no version numbers.** Rust cites 2007/2009/2016 and a bar chart. DuckDB cites 2019, Meta/Google/Airbnb, and one benchmark chart. C# cites 2000, 2014, a named designer and a survey bar chart. No benchmark claim is spoken. The on-screen text may add a fact the VO leaves out ("over 1 trillion deployments!", the three bug classes).
10. **Sign-off is the same line every time ("this has been X in 100 seconds").** It lands 134 to 137 s. Then either a thank-you only (DuckDB, 6.5 s) or a like/subscribe + "comment which tutorial you want" CTA (Rust and C#, 12 to 13 s). The CTA asks for the next topic, which is a feedback loop for the channel.

## 5. Rules for an animator

1. **Canvas: near-black navy (#0d0d17 to #101018), no gradient, no frame.** Subjects centred or in a 2-column split (asset left, label right). Roughly 80% of the frames in the three true shorts have one to three elements on an empty dark canvas. Full-bleed stock footage appears 3 to 6 times per video for texture (night road, data wall, windmills, trading terminal).
2. **Label chips: ALL-CAPS heavy geometric display face, 1 to 3 words.** White on black box, or black text on a colour block (yellow, green, blue, purple, pink). They pop in on the spoken noun (±0.5 s). Tilted by a few degrees for a sticker feel. Each chip names a thing the narrator just said (HIGH-LEVEL, SYSTEMS, STD, MACRO!, OLAP, AGGREGATE FUN).
3. **One new visual per noun.** 25 to 47 changes at the 0.1 threshold per ~145 s (mean 39); about 1 per 3 s on average with clusters of 0.5 s changes in the first 30 s. Each noun in a list gets its own logo, the way "game engines, databases, OS" got Amethyst, MeiliSearch and Linux in 4.5 s, and ".NET Core / Xamarin / Blazor / Unity" got one orbit-card each in 8 s. Use a recurring layout (logo on a ring or card + two-line label chip) so the list reads as a set.
4. **Logo sting: 0 to ~3.5 s.** Thin outline ring draws on, glow flashes, solid logo holds (all three shorts, each in the language's brand colour: orange, yellow, green). It returns at 134 to 142 s as the bookend, and the end slate shows the brand mark on black.
5. **Code pane: VS Code-style dark theme, tab bar visible, zoomed so the text is large.** Rust: 1 to 6 lines, ~7% of frame height per line; DuckDB: up to 9 lines, ~6%; C#: 4 to 9 lines. Typed live, with error squiggles and a lightbulb (Rust). Selection highlighted blue (DuckDB). Hand-emoji pointer on the token being explained. Colour chips (NAME / TYPE / VALUE, MUTABLE; in C# neon-green boxes like CONSTRUCTOR, INHERITANCE, METHOD) pinned beside the line. Terminal is the same dark pane with a bash prompt.
6. **Diagrams are drawn from simple icons, not slides.** Laptop → box → database with a red X, call-stack boxes, labelled arrows with the label above, row/column colour bars (red/blue). Everything animates in element by element along the order of speech. Hand-drawn white arrows and doodles ("TIMESTAMP FUN" with arrow) point at code.
7. **Cutouts and photos are pasted raw**: a person with a pug, a hand with a key, a Nerf gun, a garbage truck, a Mario-era sprite sheet. Cutout PNGs sit on the dark canvas with no drop shadow. Meme stills (STONKS, OBEY THE RULES) come in at 1 to 2 s.
8. **No presenter face in a short.** The voice is the presenter. A real face only appears in the guest segment of the CPU collab and as cut-out portraits for historical figures (the language's designer in C# and Rust).
9. **Transitions: hard cuts and element pop-ins; one whip.** A dissolve from logo to footage in the first seconds is the soft transition. C# uses one horizontal motion-blur whip at ~34 s between the use-case act and the architecture act, and Rust/DuckDB use none. Zoom-in with motion blur appears when an object is replaced (CPU chip).
10. **Audio: continuous, flat narration at about -18 to -23 dB RMS, no beat of silence.** The only silence is the last 1 s (fade to -26 to -45 dB). Music or SFX under the voice could not be isolated from loudness alone. If we add them, they must stay far under the voice.

## 6. Open items for the team lead

- The numeric base is now 3 true shorts (Rust, DuckDB, C#). Two are 2021 and one is 2025, so n=3 is thin and the 2021/2025 difference (CTA, turn, breaths) could be an era effect instead of a format choice.
- Likes/view and comments are higher for the newer video (5.6%) than the 2021 ones (2.6 to 3.3%). That fits a smaller, more loyal audience for a 2025 niche topic. It is not evidence of a better format.
- mp4s (including C#) trashed per the brief. Contact sheets, transcripts and cut lists stay in `private/`.
