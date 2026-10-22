# @Fireship: channel-wide numbers (study date 2026-10-22)

Purpose: measure the formula, never copy the content (see BRIEF.md). All numbers below are computed from
`data/videos.json` (803 long videos), `data/shorts.json` (48 Shorts) and `data/videos.csv`; scripts are throw-away,
the raw JSON lines are in `private/`.

## 0. Method and caveats

- **Collection**: `yt-dlp --no-update -j --skip-download` per id. The default web client hit YouTube's "confirm you're not a bot"
  wall after ~130 videos, so the rest was fetched with `--extractor-args "youtube:player_client=mweb"` (same fields), 4 sequential
  workers, 1 s sleep, back-off on 429. **803 of 804 long videos** and **48 of 48 Shorts** are in. Missing: `66tfvFeALBQ`
  ("How to ACTUALLY learn to code... 7 Roadmaps for 2023", age-gated, needs sign-in).
- Views/likes are as of the fetch (2026-10-22), so very new videos are still accumulating (see the by-month table in section 5).
- `channel_follower_count` = **4.31 M** (identical on all newest videos). The "long video" list is the Videos tab; Shorts are the 48 on the Shorts tab
  (all dated 2021-03-20 to 2024-09-21; no Short after that date).
- "Last 12 months" = uploads after 2025-10-22 (87 videos). "Last 24 months" = after 2024-10-22 (174 videos).
- Chapter count is YouTube's parsed chapters (a video can have chapters from a timestamp list in the description).

### Format rules (applied in this order, first match wins; code in the scratch `an.py`, regexes on the lower-cased title)

| order | format | rule | count |
|---|---|---|---|
| 1 | `100sec` | title contains "in 100 sec" (also the "01100100 Seconds" joke) | 167 |
| 2 | `100+` | title starts with "100+" or contains a 3-digit "N+" | 5 |
| 3 | `code-report` | title contains "code report" (only a 2022 Feb-Mar run uses it in the title; the later "Code Report" is a thumbnail badge and a #thecodereport hashtag) | 7 |
| 4 | `i-built` | "I tried/built/made/created/spent/replaced/ran/tested/ported/coded/wrote/read/connected/use/post", "let's build", "same app/game" | 22 |
| 5 | `list` | starts with a number or "top N", "tier list/ranked", "N <noun> you/every/that/should/need/missed/crazy/wild/new/ways/things/tips", "... and N other" | 61 |
| 6 | `history` | history, untold, rise of, most expensive/interesting/controversial, "in history", "burn $" | 12 |
| 7 | `explainer` | "explained", "every ... concept", "how ... works", "what is", "in N minutes" | 7 |
| 8 | `tutorial` | tutorial/course/beginner/quickstart/from scratch/guide/learn/master/"code this, not that"/crash/bootcamp, plus (<= 2021) Angular/Firebase/Flutter/Ionic/RxJS/PWA/Stripe/etc. words; any leftover pre-2021 title | 234 |
| 9 | `news` | 2021+: title has "...", "…" or "?"; 2022+: any leftover title under 12 min. This is the "Code Report"/commentary format | 277 |
| 10 | `other` | leftovers (2021-22 single-topic reviews and a few one-offs, e.g. the "Developer Roadmap" and "Programmer Stereotypes" videos) | 11 |

Caveat: `news` is the one soft rule (a leftover under 12 min since 2022), so a few explainer-style videos from 2022-24 sit in it. I read the full title lists of `other`, `tutorial` (2021+), `list`, `i-built`, `history` and `explainer` after the rules and tuned them until they looked right; `news` was not read title by title.
Format counts: news 277, tutorial 234, 100sec 167, list 61, i-built 22, history 12, other 11, explainer 7, code-report 7, 100+ 5 = 803.

## Top findings (details and tables follow)

1. **The channel is a news channel now**: 64 of the 87 videos of the last 12 months (74 %) are the ellipsis-title news/commentary format and they carry 77 % of last-12-month views; median 917 K views, median length 5:17.
2. **The switch happened in 2020-2022**: tutorials were 193 of 207 videos in 2017-19 (median 55-105 K views) and 21 of 62 in 2020; "in 100 Seconds" went 4 (2019) -> 34 (2020) -> 56 (2021) -> 40 -> 15 -> 14 -> 1 (2025); news went 3 (2021) -> 30 -> 52 -> 67 -> 70 (2025).
3. **Views per video have been flat for 5 years**: median 934 K for all 2021+ videos, p10 449 K, p90 2.09 M (last 12 months: 487 K / 923 K / 2.16 M). The floor is high; the ceiling is 2-7x the median.
4. **Cadence is 1.67 long videos a week** (87 in 52 weeks), 1-2 in 36 of 53 week-slots, Mon-Fri only (Wed-Fri = 72 %, zero weekend uploads in 12 months).
5. **Sweet spot length: 5-8 min** (58 of 87 videos); 6-8 min got median 1.57 M vs 933 K for 4-6 min and 548 K for under 4 min in the last 12 months (n = 17 / 57 / 8). Median length rose from 3:06 (2022) to 5:29 (2026).
6. **What pays in titles: the entity.** A frontier-AI-lab name (OpenAI, Anthropic, Google/Gemini) is in 29 % of hits vs 9 % of flops; JS/web-stack names are in 0 % of hits vs 26 % of flops (median 582 K vs 1.0 M); "in 100 Seconds" is 0 % of hits and 15 % of flops (median 536 K).
7. **Sponsor line moved to the first line of the description** and went 1 % (2023 H1) -> 51 % (2024 H2) -> 97 % (2026 H2) with no view penalty (median 950 K sponsored vs 901 K not, last 24 months).
8. **Thumbnail formula is nearly invariant**: warm charcoal `#231f20` background (19 of 20 top last-12-month thumbs), 2-3 giant words in two lines (cream on top, red `#e82038` below), one cut-out human face or character on the right (17 of 20), a company logo top-left (14 of 20), a small badge bottom-left (19 of 20). Hits differ from flops by who the face/logo is (the story's famous person/lab), not by layout.

*Metadata fetched for 803/804 long videos and 48/48 Shorts.*

## 1. Channel overview

| metric | value |
|---|---|
| subscribers (channel_follower_count on newest videos) | 4310000 |
| long videos | 803 |
| Shorts | 48 |
| total long-video views | 706,313,102 |
| total Shorts views | 76,460,305 |
| median views per long video | 729K |
| mean views per long video | 880K |
| first upload | 2017-04-07 |
| latest upload | 2026-10-20 |
| median length (s) | 300 |
| median likes/views % | 3.62 |
| median comments/1k views | 1.25 |


### Uploads, views and length per year (2026 = Jan to 22 Oct)

| year | videos | per month | sum views | median views | median length |
|---|---|---|---|---|---|
| 2017 | 69 | 5.8 | 5.39M | 58K | 6:11 |
| 2018 | 64 | 5.3 | 16.02M | 67K | 9:41 |
| 2019 | 74 | 6.2 | 16.34M | 149K | 9:52 |
| 2020 | 62 | 5.2 | 47.18M | 614K | 3:21 |
| 2021 | 99 | 8.2 | 119.14M | 986K | 5:15 |
| 2022 | 99 | 8.2 | 114.48M | 807K | 3:06 |
| 2023 | 86 | 7.2 | 93.65M | 964K | 3:47 |
| 2024 | 92 | 7.7 | 104.93M | 971K | 4:21 |
| 2025 | 82 | 6.8 | 90.19M | 957K | 4:12 |
| 2026 | 76 | 7.8 | 99.00M | 932K | 5:29 |


### Last 12 months (2025-10-22 to 2026-10-22): 87 long videos = 1.67 per week

Weekly cadence: 7-day slots counted from 2025-10-22 (the 53rd slot is one day long, so 6 of the 7 zero-upload slots are real weeks): 0 uploads in 6 weeks, 1 upload in 16, 2 in 20, 3 in 9, 4 in 1, 5 in 0.

| weekday | last 12 mo | all time | last-12-mo share |
|---|---|---|---|
| Mon | 11 | 162 | 13% |
| Tue | 13 | 151 | 15% |
| Wed | 23 | 151 | 26% |
| Thu | 21 | 152 | 24% |
| Fri | 19 | 142 | 22% |
| Sat | 0 | 24 | 0% |
| Sun | 0 | 21 | 0% |


### Uploads per month by half-year

| half | videos | per month | median length | median views |
|---|---|---|---|---|
| 2017H1 | 18 | 3.0 | 4:27 | 45K |
| 2017H2 | 51 | 8.5 | 7:20 | 61K |
| 2018H1 | 29 | 4.8 | 9:36 | 87K |
| 2018H2 | 35 | 5.8 | 9:54 | 63K |
| 2019H1 | 44 | 7.3 | 9:43 | 126K |
| 2019H2 | 30 | 5.0 | 10:51 | 167K |
| 2020H1 | 37 | 6.2 | 2:10 | 542K |
| 2020H2 | 25 | 4.2 | 8:09 | 942K |
| 2021H1 | 46 | 7.7 | 8:31 | 689K |
| 2021H2 | 53 | 8.8 | 2:33 | 1.04M |
| 2022H1 | 58 | 9.7 | 2:51 | 818K |
| 2022H2 | 41 | 6.8 | 3:30 | 739K |
| 2023H1 | 55 | 9.2 | 3:47 | 858K |
| 2023H2 | 31 | 5.2 | 3:43 | 1.06M |
| 2024H1 | 43 | 7.2 | 4:14 | 1.09M |
| 2024H2 | 49 | 8.2 | 4:29 | 965K |
| 2025H1 | 46 | 7.7 | 4:26 | 1.24M |
| 2025H2 | 36 | 6.0 | 4:04 | 782K |
| 2026H1 | 40 | 6.7 | 5:18 | 827K |
| 2026H2 | 36 | 6.0 | 5:37 | 1.31M |


(2026H2 is 1 Jul to 22 Oct, 3.7 months, so the per-month figure for it is really 9.7: the autumn 2026 pace is the fastest since 2022 H1; the 2025 H2 dip to 6.0 is 36 videos in 6 months, a quieter holiday-period stretch.)

### Length bands over time (count of videos; median views in brackets)

| year | <1 min | 1-2 min | 2-5 min | 5-8 min | 8-12 min | 12-20 min | >20 min |
|---|---|---|---|---|---|---|---|
| 2017 | - | 3 (67K) | 15 (41K) | 29 (61K) | 18 (64K) | 4 (126K) | - |
| 2018 | - | - | 6 (47K) | 10 (47K) | 36 (76K) | 11 (263K) | 1 (1.25M) |
| 2019 | - | 5 (422K) | 7 (24K) | 8 (81K) | 37 (105K) | 15 (267K) | 2 (363K) |
| 2020 | - | 12 (420K) | 20 (1.01M) | 1 (241K) | 21 (597K) | 7 (256K) | 1 (638K) |
| 2021 | - | - | 47 (1.03M) | 5 (453K) | 33 (904K) | 12 (1.19M) | 2 (1.56M) |
| 2022 | - | - | 67 (741K) | 10 (1.02M) | 14 (894K) | 7 (1.99M) | 1 (446K) |
| 2023 | - | - | 67 (889K) | 9 (858K) | 10 (1.50M) | - | - |
| 2024 | - | - | 69 (945K) | 17 (1.07M) | 4 (1.89M) | 2 (3.09M) | - |
| 2025 | - | - | 68 (946K) | 11 (950K) | 3 (1.60M) | - | - |
| 2026 | - | - | 13 (805K) | 58 (1.03M) | 5 (773K) | - | - |


**Reading section 1**: views per video stepped up between 2019 (median 149 K) and 2020 (614 K) and have sat at 0.8-1.0 M since 2021 even though the format changed completely; 2021-2026 videos hold 88 % of all 706 M views. Uploads are steady at 5-9 per month (peak 9.7/month in 2022 H1). The length bands show the change: 2017-19 were 8-12 min tutorials (median 55-105 K), 2020-25 are 2-5 min (a 3-4 min "100 Seconds" or news item), 2026 moved to 5-8 min (58 of 76 videos).

## 2. Top 30 all time

| # | title | id | views | length | date | format |
|---|---|---|---|---|---|---|
| 1 | God-Tier Developer Roadmap | pEfrdAtAmqk | 8.46M | 16:42 | 2022-08-24 | other |
| 2 | Brainf**k in 100 Seconds | hdHjjBS4cs8 | 7.92M | 2:10 | 2021-12-10 | 100sec |
| 3 | Every app on Earth is now open source... whether it likes it or not | wajoP_5Cpw8 | 6.48M | 5:55 | 2026-10-12 | news |
| 4 | AI influencers are getting filthy rich... let's build one | ky5ZB-mqZKM | 5.63M | 4:25 | 2023-11-29 | i-built |
| 5 | Did OpenAI actually build AGI? GPT-6 Astra first look | FluKUJyeYD8 | 4.24M | 7:26 | 2026-09-04 | news |
| 6 | C in 100 Seconds | U3aXWizDbQ4 | 3.96M | 2:25 | 2021-11-10 | 100sec |
| 7 | I tried 10 code editors | 8PhdfcX9tG0 | 3.91M | 10:27 | 2022-07-21 | i-built |
| 8 | Big Tech in panic mode... Did DeepSeek R1 just pop the AI bubble? | Nl7aCUsWykg | 3.89M | 3:36 | 2025-01-27 | news |
| 9 | 10 Programmer Stereotypes | _k-F-MMvQV4 | 3.55M | 5:08 | 2022-05-20 | list |
| 10 | 100+ Linux Things you Need to Know | LKCVKw9CzFo | 3.52M | 12:22 | 2024-07-06 | 100+ |
| 11 | OpenAI's biggest math breakthrough is getting ugly... | aspmNhKAFMc | 3.46M | 5:44 | 2026-09-11 | news |
| 12 | 100+ Computer Science Concepts Explained | -uleG_Vecis | 3.31M | 13:07 | 2022-05-04 | 100+ |
| 13 | Tragic mistake... Anthropic leaks Claude’s source code | mBHRPeg8zPU | 3.27M | 7:22 | 2026-04-01 | news |
| 14 | Java for the Haters in 100 Seconds | m4-HM_sCvtQ | 3.19M | 2:21 | 2022-04-01 | 100sec |
| 15 | How a CPU Works in 100 Seconds // Apple Silicon M1 vs Intel i9 | vqs_0W-MSB0 | 3.13M | 12:43 | 2021-05-06 | 100sec |
| 16 | This free Chinese AI just crushed OpenAI's $200 o1 model... | -2k1rcRzsLA | 3.12M | 4:40 | 2025-01-21 | news |
| 17 | Python in 100 Seconds | x7X9w_GIm1s | 3.12M | 2:23 | 2021-10-25 | 100sec |
| 18 | 100+ JavaScript Concepts you Need to Know | lkIFF4maKMU | 3.11M | 12:23 | 2022-11-22 | 100+ |
| 19 | Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial | Q7AOvWpIVHU | 3.09M | 15:38 | 2021-05-21 | tutorial |
| 20 | An ex-OpenAI researcher just deleted language from the LLM... | TbkUKCm3CHQ | 3.03M | 5:27 | 2026-09-21 | news |
| 21 | How to Learn to Code - 8 Hard Truths | NtfbWkxJTHw | 3.02M | 6:45 | 2022-02-09 | tutorial |
| 22 | How to OVER Engineer a Website // What is a Tech Stack? | Sxxw3qtb3_g | 3.02M | 11:20 | 2021-09-24 | explainer |
| 23 | How programmers flex on each other | r6tH55syq0o | 2.98M | 6:19 | 2023-08-08 | news |
| 24 | I built the same game with Astra and Fable 5.1... only one was fun | 2Xiljy4xzbc | 2.98M | 6:08 | 2026-09-09 | i-built |
| 25 | This new AI is powerful and uncensored… Let’s run it | GyllRd2E6fg | 2.96M | 4:36 | 2023-12-18 | news |
| 26 | 10 Design Patterns Explained in 10 Minutes | tv-_1er1mWI | 2.89M | 11:04 | 2022-03-14 | list |
| 27 | PewDiePie is setting AI free... and OpenAI is furious | _5p1_TNSWqQ | 2.89M | 5:45 | 2026-10-05 | news |
| 28 | Lua in 100 Seconds | jUuqBZwwkQw | 2.87M | 2:24 | 2022-02-14 | 100sec |
| 29 | I built the same app 10 times // Which JS Framework is best? | cuHDQhDhvPE | 2.85M | 21:58 | 2021-08-11 | i-built |
| 30 | Anthropic researchers are quitting... and now we know why | 7r4ikZHm9AI | 2.79M | 6:16 | 2026-09-15 | news |


Composition of the all-time top 30: news 11, 100sec 6, i-built 4, 100+ 3, list 2, tutorial 2, explainer 1, other 1. Seven of the 30 are from the last 7 weeks (2026-09-01 to 2026-10-20), so the top of the table is inflated by recent AI-lab news; the top 10 % of videos (80) hold 32 % of all views, the top 30 hold 16 %.

### Top 20 of the last 12 months

| # | title | id | views | length | date | format |
|---|---|---|---|---|---|---|
| 1 | Every app on Earth is now open source... whether it likes it or not | wajoP_5Cpw8 | 6.48M | 5:55 | 2026-10-12 | news |
| 2 | Did OpenAI actually build AGI? GPT-6 Astra first look | FluKUJyeYD8 | 4.24M | 7:26 | 2026-09-04 | news |
| 3 | OpenAI's biggest math breakthrough is getting ugly... | aspmNhKAFMc | 3.46M | 5:44 | 2026-09-11 | news |
| 4 | Tragic mistake... Anthropic leaks Claude’s source code | mBHRPeg8zPU | 3.27M | 7:22 | 2026-04-01 | news |
| 5 | An ex-OpenAI researcher just deleted language from the LLM... | TbkUKCm3CHQ | 3.03M | 5:27 | 2026-09-21 | news |
| 6 | I built the same game with Astra and Fable 5.1... only one was fun | 2Xiljy4xzbc | 2.98M | 6:08 | 2026-09-09 | i-built |
| 7 | PewDiePie is setting AI free... and OpenAI is furious | _5p1_TNSWqQ | 2.89M | 5:45 | 2026-10-05 | news |
| 8 | Anthropic researchers are quitting... and now we know why | 7r4ikZHm9AI | 2.79M | 6:16 | 2026-09-15 | news |
| 9 | DHH has gone completely off the rails... | OuNKBjuV7A4 | 2.34M | 6:43 | 2026-09-28 | news |
| 10 | The wild rise of OpenClaw... | ssYt09bCgUY | 2.04M | 5:18 | 2026-01-30 | history |
| 11 | Did Google just kickstart the intelligence explosion? | LoLYw--s-5w | 1.99M | 4:58 | 2026-09-17 | news |
| 12 | Google just changed the future of UI/UX design... | qaB5HF4ax9M | 1.92M | 4:50 | 2026-03-19 | news |
| 13 | The most interesting hack in history just got weirder... | 0Rp9KJCEIvg | 1.91M | 6:46 | 2026-09-02 | history |
| 14 | The one OpenAI announcement that can actually make you money... | No-JPdFvYWU | 1.87M | 5:47 | 2026-10-01 | news |
| 15 | The mystery is solved... and the answer is 40x cheaper than Claude | r-tzcMlQISk | 1.77M | 5:33 | 2026-09-01 | news |
| 16 | OpenAI’s lead engineer was secretly a spy... | QZVzuq28eFw | 1.72M | 5:06 | 2026-10-14 | news |
| 17 | Did Google just dethrone OpenAI and Anthropic? | b2tjnxX8IHU | 1.66M | 6:33 | 2026-10-20 | news |
| 18 | A $6.3 billion open-weight model just got embarrassed by the French... | WrCjAAl9okA | 1.63M | 6:10 | 2026-10-07 | news |
| 19 | Meta is pivoting again... everything you missed from Connect 2026 | c1rPlzxSZ8E | 1.62M | 5:40 | 2026-09-25 | news |
| 20 | 10 open source tools that feel illegal... | Ukt2gVz25PQ | 1.58M | 10:03 | 2026-02-05 | list |


Reading: the top 20 of the last 12 months is 16 news-format videos, 2 history, 1 i-built, 1 list; 16 of 20 are from 2026-09 or 2026-10 (the last 7 weeks). The AI-lab news cycle of this autumn is pulling the whole table; before September the monthly median was 0.51-1.0 M (section 5).

## 3. Formats

| format | count | median views | median length | first | last |
|---|---|---|---|---|---|
| news | 277 | 934K | 4:26 | 2021-01-22 | 2026-10-20 |
| tutorial | 234 | 91K | 9:27 | 2017-04-07 | 2025-11-19 |
| 100sec | 167 | 819K | 2:29 | 2019-12-17 | 2026-02-20 |
| list | 61 | 931K | 7:47 | 2017-07-21 | 2026-09-07 |
| i-built | 22 | 991K | 8:32 | 2020-09-23 | 2026-09-09 |
| history | 12 | 1.30M | 5:37 | 2019-06-18 | 2026-09-23 |
| other | 11 | 929K | 9:07 | 2021-01-14 | 2022-08-24 |
| explainer | 7 | 773K | 8:53 | 2020-10-22 | 2026-05-07 |
| code-report | 7 | 296K | 3:00 | 2022-02-01 | 2022-03-17 |
| 100+ | 5 | 3.11M | 12:23 | 2022-05-04 | 2024-07-06 |


### Count of videos per format per year

| year | news | tutorial | 100sec | list | i-built | history | other | explainer | code-report | 100+ |
|---|---|---|---|---|---|---|---|---|---|---|
| 2017 | 0 | 67 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2018 | 0 | 63 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2019 | 0 | 63 | 4 | 6 | 0 | 1 | 0 | 0 | 0 | 0 |
| 2020 | 0 | 21 | 34 | 5 | 1 | 0 | 0 | 1 | 0 | 0 |
| 2021 | 3 | 12 | 56 | 11 | 3 | 1 | 10 | 3 | 0 | 0 |
| 2022 | 30 | 3 | 40 | 7 | 8 | 0 | 1 | 0 | 7 | 3 |
| 2023 | 52 | 2 | 15 | 11 | 5 | 0 | 0 | 1 | 0 | 0 |
| 2024 | 67 | 1 | 14 | 7 | 0 | 1 | 0 | 0 | 0 | 2 |
| 2025 | 70 | 2 | 1 | 6 | 2 | 0 | 0 | 1 | 0 | 0 |
| 2026 | 55 | 0 | 3 | 5 | 3 | 9 | 0 | 1 | 0 | 0 |


### Median views per format per year (n in brackets)

| year | news | tutorial | 100sec | list | i-built | history | other | explainer | code-report | 100+ |
|---|---|---|---|---|---|---|---|---|---|---|
| 2017 | - | 55K (67) | - | 148K (2) | - | - | - | - | - | - |
| 2018 | - | 67K (63) | - | 225K (1) | - | - | - | - | - | - |
| 2019 | - | 105K (63) | 459K (4) | 235K (6) | - | 1.31M (1) | - | - | - | - |
| 2020 | - | 465K (21) | 722K (34) | 773K (5) | 1.54M (1) | - | - | 555K (1) | - | - |
| 2021 | 453K (3) | 1.02M (12) | 927K (56) | 1.10M (11) | 2.62M (3) | 1.85M (1) | 917K (10) | 660K (3) | - | - |
| 2022 | 660K (30) | 320K (3) | 966K (40) | 1.24M (7) | 722K (8) | - | 8.46M (1) | - | 296K (7) | 3.11M (3) |
| 2023 | 918K (52) | 1.89M (2) | 1.06M (15) | 973K (11) | 796K (5) | - | - | 1.13M (1) | - | - |
| 2024 | 1.15M (67) | 938K (1) | 622K (14) | 823K (7) | - | 1.93M (1) | - | - | - | 2.53M (2) |
| 2025 | 957K (70) | 765K (2) | 536K (1) | 1.23M (6) | 1.00M (2) | - | - | 2.00M (1) | - | - |
| 2026 | 998K (55) | - | 486K (3) | 931K (5) | 1.57M (3) | 1.03M (9) | - | 773K (1) | - | - |


### Last 12 months: formats, with views

| format | videos | median views | mean views | best | share of last-12-mo views |
|---|---|---|---|---|---|
| news | 64 | 917K | 1.27M | 6.48M | 77% |
| history | 9 | 1.03M | 1.10M | 2.04M | 9% |
| list | 6 | 1.00M | 1.06M | 1.58M | 6% |
| 100sec | 3 | 486K | 485K | 582K | 1% |
| i-built | 3 | 1.57M | 1.77M | 2.98M | 5% |
| tutorial | 1 | 763K | 763K | 763K | 1% |
| explainer | 1 | 773K | 773K | 773K | 1% |


Reading: median views by format since 2021 are 0.8-1.3 M for every format except tutorials (a 2017-19 relic: 55-105 K; 2021 rebound to 1.0 M for the few remaining; the 2022 dip is 3 videos) and `code-report` (296 K, a 7-video experiment in 2022). The switch order was tutorials (until 2019) -> 100sec (2020-2022 peak) -> news (30 in 2022, 52-70 a year since). The format that pays now is news at 0.9-1.2 M median; the best recurring formats by median are `100+` (3.11 M, n = 5), `history` (1.30 M, n = 12), `list` (0.93-1.0 M) and `i-built` (0.99 M).

## 4. Duration vs views

- Pearson r of log(views) vs log(duration), all (n=803): -0.20
- Pearson r of log(views) vs log(duration), last 24 mo (n=174): 0.29
- Pearson r of log(views) vs log(duration), last 12 mo (n=87): 0.36

Last 24 months, by length band:

| band | videos | median views | p25 | p75 | best |
|---|---|---|---|---|---|
| 2-5 min | 91 | 910K | 680K | 1.24M | 3.89M |
| 5-8 min | 74 | 1.02M | 779K | 1.63M | 6.48M |
| 8-12 min | 8 | 1.47M | 772K | 1.58M | 1.84M |
| 12-20 min | 1 | 2.66M | 2.66M | 2.66M | 2.66M |


Reading: over all 803 videos the correlation is negative (-0.20) because 2017-19 tutorials were long and weak; inside the current news era it is positive (+0.29 last 24 months, +0.36 last 12). Four-to-six-minute videos are the volume (57 of 87), six-to-eight-minute ones win on the median.

## 5. Title patterns: hits (top 20% of last 24 months) vs flops (bottom 20%)

Last 24 months = uploads after 2024-10-22; n=174; hits = top 34 by views (>= 1.58M), flops = bottom 34 (<= 666K).

| feature | hits | flops | all 24 mo |
|---|---|---|---|
| n | 34 | 34 | 174 |
| median views | 1.99M | 547K | 946K |
| median chars | 51.0 | 41.0 | 47.0 |
| median words | 8.0 | 7.0 | 8.0 |
| has ... or … | 79% | 79% | 89% |
| has ? | 15% | 3% | 7% |
| has digit | 35% | 29% | 32% |
| has $ | 6% | 3% | 4% |
| names a company/product/tech | 65% | 62% | 66% |
| has ALL-CAPS word (>=3 letters, not acronym-list) | 12% | 12% | 14% |
| has quote marks | 9% | 12% | 11% |
| has "just"/"new" | 32% | 32% | 33% |
| has "you"/"your"/"our" | 21% | 18% | 17% |
| median likes/views % | 2.42 | 3.87 | 3.37 |
| median length | 5:44 | 4:24 | 4:57 |


First words, hits: the (6), did (3), i (2), every (1), big (1), openai's (1), tragic (1), this (1), an (1), pewdiepie (1), anthropic (1), 25 (1)

First words, flops: the (3), openai (2), alibaba (2), ai (2), this (2), when (1), i (1), apache (1), a (1), d-link (1), net (1), 10 (1)


Format mix hits vs flops: hits {'news': 25, 'i-built': 2, 'list': 4, 'history': 2, 'explainer': 1}; flops {'news': 25, '100sec': 5, 'list': 1, 'history': 2, 'i-built': 1}


10 flops of the last 12 months (lowest views, long videos only, ≥ 1 week old):

| title | id | views | len | date | format |
|---|---|---|---|---|---|
| This neural interface writes code from my brain waves… | 4bQ2qhfJUjA | 254K | 4:02 | 2025-11-12 | news |
| This new JS framework wants you to quit React… | IIj9UWpvSFI | 298K | 3:48 | 2025-11-06 | news |
| The forgotten developer who saved JavaScript... | JfPWbttemYE | 327K | 6:28 | 2026-05-29 | news |
| The weird history of the internet... | 7B0ydm64cV8 | 343K | 8:06 | 2026-07-01 | history |
| TanStack Start in 100 Seconds | 1fUBWAETmkk | 386K | 2:18 | 2026-02-20 | 100sec |
| Anthropic just bought your favorite JS runtime... | 5JMiNsV7P3Y | 422K | 4:02 | 2025-12-05 | news |
| How to burn $30m on a JavaScript framework | ReAnFFqvCeA | 442K | 5:08 | 2026-03-18 | history |
| Millions of WordPress sites just got hacked... again | piah4fV_o2Q | 472K | 5:16 | 2026-04-16 | news |
| Bun in 100 Seconds | M4TufsFlv_o | 486K | 2:46 | 2026-01-22 | 100sec |
| AI agents are paying each other now… | S6wc6yvoZLY | 488K | 4:50 | 2025-11-26 | news |


### Which names/words in the title go with views (last 24 months, n=174)

| entity/theme in title | n | median views with | median without | ratio | % of hits | % of flops |
|---|---|---|---|---|---|---|
| OpenAI | 25 | 1.33M | 910K | 1.46x | 29% | 9% |
| Anthropic/Claude | 16 | 1.09M | 930K | 1.18x | 15% | 6% |
| Google/Gemini | 17 | 1.09M | 930K | 1.17x | 9% | 6% |
| Meta/Zuck | 5 | 854K | 951K | 0.90x | 3% | 3% |
| Elon/X/xAI | 5 | 1.40M | 931K | 1.50x | 3% | 0% |
| Apple | 4 | 1.04M | 946K | 1.09x | 0% | 0% |
| Microsoft/GitHub | 6 | 1.11M | 937K | 1.19x | 3% | 0% |
| AWS/Cloudflare/Vercel | 2 | 818K | 946K | 0.86x | 0% | 3% |
| China/DeepSeek/Qwen | 10 | 1.08M | 946K | 1.14x | 9% | 9% |
| JS/web stack | 16 | 582K | 1000K | 0.58x | 0% | 26% |
| Rust/C/Linux | 5 | 928K | 962K | 0.96x | 0% | 3% |
| hack/exploit/leak | 12 | 839K | 951K | 0.88x | 12% | 9% |
| AI (any) | 59 | 1.11M | 877K | 1.26x | 47% | 24% |
| 100 Seconds | 5 | 536K | 962K | 0.56x | 0% | 15% |


Words in >=3 hit titles and their hit/flop counts: just (9/6), openai (7/3), did (4/1), open (3/1), anthropic (3/1), claude (3/0), google (3/2)

Words in >=3 flop titles: just (9/6), new (2/6), 100 (0/5), seconds (0/5), openai (7/3), weird (0/3), javascript (0/3), framework (0/3)


Title ending form, last 24 months:

| form | n | median views | in hits | in flops |
|---|---|---|---|---|
| ends with ... | 115 | 931K | 17 | 22 |
| ... in the middle | 40 | 1.08M | 10 | 5 |
| ends with ? | 5 | 1.58M | 3 | 0 |
| no ellipsis/question | 14 | 647K | 4 | 7 |


Title length (chars), last 24 months:

| chars | n | median views |
|---|---|---|
| <30 | 10 | 593K |
| 30-44 | 62 | 908K |
| 45-59 | 78 | 1.00M |
| 60+ | 24 | 1.35M |


### Median views by upload month (shows the age effect), last 14 months

| month | videos | median views | best | median length |
|---|---|---|---|---|
| 2025-09 | 6 | 777K | 1.26M | 4:32 |
| 2025-10 | 10 | 998K | 1.15M | 4:13 |
| 2025-11 | 6 | 580K | 941K | 3:58 |
| 2025-12 | 3 | 513K | 641K | 4:01 |
| 2026-01 | 5 | 800K | 2.04M | 5:18 |
| 2026-02 | 4 | 781K | 1.58M | 5:50 |
| 2026-03 | 9 | 879K | 1.92M | 5:08 |
| 2026-04 | 9 | 998K | 3.27M | 5:16 |
| 2026-05 | 7 | 759K | 1.09M | 6:28 |
| 2026-06 | 6 | 802K | 1.01M | 5:16 |
| 2026-07 | 9 | 805K | 1.04M | 4:59 |
| 2026-08 | 7 | 880K | 1.57M | 5:34 |
| 2026-09 | 13 | 1.99M | 4.24M | 5:40 |
| 2026-10 | 7 | 1.72M | 6.48M | 5:47 |


Videos <=60 s inside the long-video list: 0 (e.g. )



Reading section 5: the ellipsis is on 79 % of both hits and flops (and 89 % of all 24-month titles), so it is a house style, not a driver. What separates hits is the entity (OpenAI, Anthropic, Google), the "Did ... ?" question form, longer titles (51 vs 41 median characters), and not being about a niche JS tool. Likes/views is lower on hits (2.42 %) than flops (3.87 %): broad viral reach dilutes the like rate. Title "just"/"new" is 33 % overall and 32 % in both groups; "just" is in 9 hits and 6 flops. The share of titles with "just" or "new" rose 10 % (2023) -> 22 % -> 29 % -> 34 % (2026). Caution: the by-month table shows 2026-09 and 2026-10 median views of 1.7-2.0 M against 0.5-1.0 M in the earlier months, so the hit group is skewed to the last 7 weeks.


## 6. Descriptions and tags

Share of videos in each period with the feature (regex on the description text; n in the header):

| feature | 2017-19 (n=207) | 2020-21 (n=161) | 2022-23 (n=185) | 2024 (n=92) | 2025-Jan..Oct21 (n=70) | last 12 mo (n=88) |
|---|---|---|---|---|---|---|
| first line has link | 90% | 78% | 10% | 34% | 91% | 94% |
| first line = sponsor pitch (link + code/free/try/download/get) | 32% | 22% | 6% | 24% | 81% | 90% |
| promo code anywhere | 21% | 92% | 97% | 99% | 99% | 26% |
| "Upgrade to PRO" block | 18% | 89% | 96% | 98% | 99% | 14% |
| "Editor Settings" block | 3% | 92% | 98% | 99% | 100% | 20% |
| "Topics Covered" block | 0% | 23% | 100% | 98% | 97% | 44% |
| Resources block | 0% | 44% | 98% | 98% | 86% | 25% |
| Discord link | 0% | 1% | 57% | 100% | 97% | 15% |
| newsletter bytes.dev | 0% | 0% | 0% | 0% | 0% | 80% |
| fireship.dev courses | 0% | 0% | 0% | 0% | 0% | 85% |
| #hashtags | 27% | 93% | 100% | 98% | 91% | 83% |
| timestamps in text | 0% | 35% | 6% | 1% | 0% | 0% |
| link to another video (youtu.be) | 11% | 20% | 84% | 96% | 50% | 0% |
| median description words | 37 | 87 | 128 | 127 | 122 | 62 |
| median chapters (YouTube) | 6 | 6 | 5 | 5 | 5 | 0 |
| has chapters | 90% | 93% | 76% | 83% | 80% | 44% |
| median tag count | 19 | 10 | 4 | 4 | 8 | 9 |
| tags = only the 4 boilerplate tags | 0% | 30% | 99% | 71% | 49% | 45% |
| tags start with the boilerplate 4 + more | 79% | 50% | 1% | 24% | 50% | 52% |
| has "fireship" tag | 2% | 0% | 0% | 10% | 4% | 3% |

**The description template, paraphrased (as of 2026)**

1. **Line 1 = sponsor pitch**: one sentence plus a tracked short link and often a promo code (e.g. "try X free for 30 days", "download X and use code ... for your first month at $1"). It is first because only the first ~2 lines show before "more".
   Sponsor-style first lines: 1 % of videos in 2023 H1, 11 % 2024 H1, 51 % 2024 H2, 89 % 2025 H1, 97 % 2025 H2, 90 % 2026 H1, 97 % 2026 H2. Domains seen in the last 12 months (83 sponsored videos): coderabbit 9, railway 6, hostinger 5, blacksmith 5, brilliant 4, jetbrains (jb.gg) 4, a handful of one-to-three-offs. Sponsored vs not, last 24 months: median 950 K (n = 157) vs 901 K (n = 18), no visible penalty.
2. **Line 2-3 = what the video covers in one or two sentences**, written like a neutral news lede, often ending with a nudge to watch ("Let's take a look at what went down...").
3. **Hashtags**: 2-3 generic ones (`#programming #coding`, then `#ai`/`#tech`/`#thecodereport` for news): in the last 24 months `#programming` 119x, `#coding` 95x, `#ai` 59x, `#thecodereport` 47x, `#tech` 45x. Hashtags are in 83-100 % of descriptions since 2020.
4. **Footer block (2026)**: "Want more Fireship?" then a newsletter link (bytes.dev, 80 % of last-12-month videos) and a courses link (fireship.dev, 85 %). Until ~mid-2025 the footer was longer and heavily templated: a Discord invite, a "Resources" list with links to sources and to related videos, a "Get More Content - Upgrade to PRO" block with a 25 % promo code, an "Editor Settings" list (theme, icon pack, font; the same three lines for years) and a "Topics Covered" keyword list (these were SEO bullets such as "X vs Y", "How does X work?").
   Presence of those old blocks: Resources 98 % (2022-23) -> 25 % (last 12 months); Topics Covered 100 % -> 44 %; Editor Settings 98-100 % -> 20 %; link to another Fireship video 84-96 % (2022-24) -> 0 %.
5. **Chapters**: 90 % of videos in 2017-21 had parsed chapters (median 5-6), 76-83 % in 2022-24, 44 % in the last 12 months (38 of 87 videos; no pattern with length: 10 of 24 under 5 min, 18 of 41 at 5-6 min, 10 of 22 at 6 min or more; 29 of 64 news videos). Plain timestamp lines inside the text were only used in 2020-21 (35 %) and are at most 1 % since 2024, so the chapters come from the video editor/uploader tooling, not the description.
6. **Length**: median 37 words (2017-19) -> 87 -> 128 (2022-23) -> 127 (2024) -> 122 (2025) -> **62 words in the last 12 months**. The description got shorter as the news format took over; it carries less SEO text.

**Tags**

- Tags are present on 100 % of videos. Every video since 2020 starts with the same four channel-default tags (`webdev`, `app development`, `lesson`, `tutorial`); in 2022-23 99 % had only those four, in 2024 71 %, 2025 49 %, last 12 months 45 %.
- When a video has more, the extras are **topic-specific keyword tags** that restate the story many ways (e.g. the Google antitrust video carries "google antitrust case", "google chrome lawsuit", plus the other companies named: 20 tags). Median 17-19 tags in 2017-19, 10 in 2020-21, 4 in 2022-24, 8-9 in 2025-26. The word "fireship" is a tag on only 0-10 % of videos.
- No evidence tags drive views here: 2022-23 (4 tags) and 2025-26 (8-9 tags) have the same median views (~0.9-1.0 M).


## 7. Shorts

**Count and reach** (all 48 from the Shorts tab, 2021-03-20 to 2024-09-21; 25 in 2021, 5 in 2022, 11 in 2023, 7 in 2024, none since):

| metric | value |
|---|---|
| Shorts | 48 |
| total views | 76.5 M (10 % of the 706 M long-video views) |
| median views | 1.33 M (long videos: 729 K) |
| mean views | 1.59 M |
| over 1 M views | 27 of 48 |
| median length | 40 s (range 23-59 s) |
| median likes/views | 5.9 % (long videos: 3.6 %) |
| median comments | 660 |

The 2021 Shorts (the first 25: median 747 K views vs 1.57 M for the 23 later ones; mostly "#Shorts"-suffixed quick tips) are the weak ones: the bottom five are all 2021 ("Is your memory leaking?" 451 K, "Quick overview of CSS" 391 K, "4 Steps to Become a Developer" 247 K, "7 Linux Things You Say WRONG" 228 K, "I've become my own Arch Enemy" 218 K). Everything above 2 M is a concept-with-a-twist, not a tip list.

**Top 10 Shorts**

| # | title | id | views | length | date |
|---|---|---|---|---|---|
| 1 | Why do computers suck at math? | s9F8pu5KfyM | 8.78M | 54 s | 2021-06-15 |
| 2 | the untold history of web development | aXcuz6fn8_w | 5.23M | 53 s | 2023-12-20 |
| 3 | Why do computers use RGB for colors, and not RBY? | B1t4Fjlomi8 | 3.63M | 43 s | 2021-07-13 |
| 4 | 7 killer website features | 8B20fRB78nA | 3.39M | 47 s | 2022-12-16 |
| 5 | Uh oh… AI-search engine for developers has emerged | 91IPJ6LFmto | 3.07M | 27 s | 2023-04-13 |
| 6 | how god programmed birds probably | X8LglXSG53A | 3.03M | 39 s | 2024-02-13 |
| 7 | real eyes realize AI lies | Z8omJ59hNfY | 3.02M | 43 s | 2023-01-23 |
| 8 | my code works… why? | 9BvBRXkJA58 | 2.82M | 30 s | 2022-03-24 |
| 9 | how big is a yottabyte? | 6V-eRPPLSy0 | 2.57M | 33 s | 2023-02-10 |
| 10 | God Tier HTML Programming | ZtyMdRzvi0w | 2.52M | 50 s | 2021-06-18 |

**Title patterns (48 Shorts)**: median 32 characters / 5.5 words; 14 of 48 start lower-case (5 of the top 10 do: "the untold...", "how god...", "real eyes...", "my code...", "how big..."); 9 have "?"; 6 have "..." or "…"; 8 have a digit; 10 carry "#shorts"/"#Shorts" in the title (all 10 are 2021 Shorts, ranks 11-48); 4 start with Why/How/What and **all 4 are in the top 10** (ranks 1, 3, 6, 9). Top-10 first words: Why, the, Why, 7, Uh, how, real, my, how, God. Bottom-10 first words: Web, get, Delete, This, VS, Is, Quick, 4, 7, I've. So: a curiosity question ("why do computers ..."), or a punchy lower-case riff, beats "N tips" and "quick overview".

**What a description of a Short looks like**: one or two plain sentences stating the question, then `#shorts #compsci #math`-style hashtags, optionally a GitHub-sponsors line and 2-3 resource links; 4-9 tags.

### Top 3 Shorts, watched (360p, `-f 18` via the mweb client; cuts via ffmpeg `select='gt(scene,T)'`)

Files: `private/shorts/<id>.mp4` (to be trashed), contact sheets `private/shorts/<id>-sheet1.jpg`, `-sheet2.jpg` (1 frame/s, 6x5 tiles).

| Short | length | cuts/min, scene > 0.3 (brief's threshold) | cuts/min, scene > 0.2 | scene > 0.1 | cut timestamps (> 0.3) |
|---|---|---|---|---|---|
| Why do computers suck at math? (8.78M) | 53.8 s | 12 cuts = **13.4/min** | 17.8 | 46.8 | 5.5, 9.6, 19.9, 21.6, 23.6, 25.8, 28.2, 40.2, 43.4, 46.9, 48.9, 52.1 |
| the untold history of web development (5.23M) | 53.2 s | 1 cut = **1.1/min** | 3.4 | 11.3 | 46.5 |
| Why do computers use RGB..., not RBY? (3.63M) | 43.1 s | 11 cuts = **15.3/min** | 20.9 | 40.3 | 3.6, 10.3, 14.5, 15.0, 17.8, 19.7, 23.6, 26.4, 35.2, 35.3, 40.8 |

(The 0.3 threshold under-counts here because the format is mostly in-frame animation, not camera cuts; 0.1 catches every new element or caption pop. Read the columns as: **a new visual event every 1.3-1.5 s** at 0.1 for the two cut-driven explainers, every 5 s for the history timeline.)

What each looks like (read from the sheets):

1. **Why do computers suck at math?** Vertical 9:16, near-black (`#15181a`-ish) canvas. Beat 1 (0-5 s): the numbers "0.1 + 0.2" typed in huge white sans type on black top third while a **grey-background stick-figure comic** (monitor, round-head figure, no colour) acts out frustration below; a dev-tools console with `0.30000000000000004` in purple monospace; a one-frame **South Park clip** as a reaction. Beat 2: the same stick figure pours a red gasoline can over the desk and a **hand-drawn flame** fills the frame (the "it's on fire" gag), then a Python logo with REPL. Beat 3 (the explanation, ~28-50 s): **chunky outlined display captions** in a bold rounded font that each hold 1-3 words and change colour per idea (yellow "SPACE IS LIMITED", white "FLOATING POINT MATH", neon green "PRECISION" vs white "RANGE", cyan "BASE-2", orange "BASE-10", red/pink "ROUNDING ERRORS", red "SUCKS"), over **stock photos of a woman with a telescope vs a woman with a microscope** (the range-or-precision metaphor), a binary block `0110 1001 1010`, an IEEE-754 bit-layout diagram, a screenshot of an IEEE converter, an abacus photo, and a retro Mac with the console output on its screen as the punchline. Nothing stays on screen longer than ~3 s; a technical visual (diagram/console) alternates with a joke visual (meme, stock photo, figure) about every second beat.
2. **the untold history of web development** (the one that barely cuts): a single continuous animation. A pixel-font **year counter at the top** (1990, 1994, 1995, 2006, 2010, 2013, 2014 ... 2024) ticks while a **stack of logos builds up and shrinks at the bottom** (HTML as a yellow block, CSS, JS, jQuery, AngularJS, React, Vue, Angular, WebAssembly, Svelte, Solid, React Suspense, Svelte Runes). Each new logo drops in big in the upper half, then shrinks onto the pile; a callback gag at the end: the pile ends on a burning dumpster labelled "75% of websites" with a screaming-man reaction clip over the jQuery logo. 100 % graphics, no stock footage, one idea (the pile only grows).
3. **Why do computers use RGB..., not RBY?** Bold white outlined caption "PRIMARY COLORS?" over a stock photo of crayons; a **kid-making-a-face reaction photo** (child with paint cups) with a red "LIE" stamp; a halftone-dot zoom into an eye to show that print uses CMYK; white-background Venn diagrams (C M Y) captioned "SUBTRACT/LIGHT", then dark-background RGB Venn "ADDITIVE"; a phone-screen subpixel macro (red/green/blue stripes) cutting to a psychedelic eye image on the phone; a Newton engraving with an apple on his head and a red "LIE" at the end. Captions are the same chunky outlined face as in #1.

**What a Fireship Short is, in one paragraph**: 27-59 s (median 40 s), 9:16, dark flat background, one idea posed as a question or a claim in the title; the voice carries the explanation while on screen there is always exactly one big thing (a 1-3 word caption in a heavy outlined rounded font, a logo, a diagram, a console snippet, or a meme/stock photo); a reaction image or stick-figure gag lands every 8-10 s; no face of the presenter, no webcam, no code editor beyond a console; the last beat is a short punchline visual ("LIE", flaming dumpster, "SUCKS"). Measured cut rates of 13-15 per minute for the two cut-driven ones (3-5 s average shot) and 1/min for the animation-only one.

Do not copy: the stick-figure comic style, the specific outlined display font and colour-per-idea caption look, the "#Shorts" title suffix, lower-case "the untold history of ..." riffs as a brand voice. Copy: question title (hits start Why/How), one idea per Short, alternate technical visual and joke visual, 40-55 s.

## 8. Thumbnails

Downloaded `maxresdefault.jpg` (1280x720; no fallback needed) for 50 videos into `thumbs/<group>-<rank>-<id>.jpg`; groups: `all` = top 20 all time, `l12` = top 20 of the last 12 months, `new` = 10 newest, `flop` = 10 lowest-view videos of the last 12 months (long videos that are >= 2 min and >= 7 days old). Contact sheets: `thumbs/sheet-all-1.jpg`, `sheet-all-2.jpg`, `sheet-l12-1.jpg`, `sheet-l12-2.jpg`, `sheet-new-1.jpg`, `sheet-flop-1.jpg` (4 columns, label under each tile = rank, views, month, title). I read every sheet; the 10 newest are all in the top 20 of the last 12 months or overlap with them, which is the point: the current template is used on everything.

Pixel measurements: background colour sampled at 4 edge points per thumb = `#231f20` (warm near-black) on 19 of the 20 top-last-12-month thumbs and all 10 newest (the other one is `#1d1e23`, a cool near-black); the most common saturated red in the l12/flop sets is `#e82038`-`#f02038` (43 K of 320x180 sampled pixels, 7x the next shade); the most common cream is `#f0f0d0`-`#f8f0d8` (off-white with a yellow cast, not pure white).

### The current formula (2025-11 onwards; every news video)

| element | what it is | how often (top 20, last 12 months) |
|---|---|---|
| background | flat warm charcoal `#231f20`, no gradient, no photo background | 20/20 (19 `#231f20`, 1 `#1d1e23`) |
| headline | 2-3 giant words stacked in 2 lines (median 3 words incl. a tiny subtitle, range 2-6): line 1 cream, line 2 red `#e82038`; heavy rounded display face with a thick dark outline/shadow. Occasionally a 3rd line in a small pixel/monospace face in lower case: "first look", "demo", "recap", "(again)", "trust me, bro", or an asterisk ("IS HERE*") | 19/20 two-tone cream+red; 5/20 have the small pixel-font tag and 2 more add an asterisk |
| words used | claims/labels, not descriptions: "IS HERE", "CRACKED", "KILLER", "DEAD (again)", "FIRST LOOK", "HANDS-ON", "TAKEOVER", "DOUBLE AGENT", "BANNED by OpenAI", "THREAT LEVEL". They are not a copy of the title; they add a second joke/claim | 20/20 |
| face / character | one cut-out person (celebrity or movie-still lookalike) filling the right 35-45 % of the frame, looking at camera with a worried/smug/surprised face, often **bleeding off the right edge**; or a mascot/object (Tamagotchi, red lobster) when the story has no person | 17/20 human face (incl. 1 masked), 3/20 object/mascot |
| famous face = the story's protagonist or a meme casting | the CEO of the lab in the story (Altman 3x, Pichai 3x, Macron, DHH, PewDiePie) or a film actor cast as the story (Channing Tatum for a "Jev" model, Hugo Weaving for "threat level", Tim Curry for "who made this?") | about 14 of the 17 faces |
| logo | one company/product logo top-left above the first word (OpenAI x5, Adobe, Meta, Figma, Gemini 4 wordmark, Cloudflare, TypeSafe, Hugging Face, a row of 4 model logos) | 14/20 |
| badge | small white-bordered square "THE CODE REPORT" bottom-left, same size/position every time | 19/20 |
| composition | text block left-centre (about 45 % of width), face right, badge bottom-left, logo top-left: a constant three-column grid; nothing in the middle top | 20/20 |

### Earlier eras (all-time top 20)

- **"100 SECONDS OF" template** (5 of the top 20: Brainf**k 7.92 M, C 3.96 M, Java 3.19 M, "How a CPU works" 3.13 M, Python 3.12 M): a coloured header bar (red, blue, black-gradient, steel-blue; a different colour per episode) with italic "100 SECONDS OF", then one giant logo or word on the dark body, no face (Java adds a meme reaction face).
- **"101"/"100+" template** (3 of the top 20: Linux 101 3.52 M, CS 101 3.31 M, JS 101 3.11 M): huge white word or logo + red "101" label + a meme face or brain graphic on the right.
- **2021-23 big-story template** (the ancestor of today's): dark `#1d1e23` background, big white + red words, a meme/celebrity face on the right, logos in a column (10 code editors with a crying-Jordan face 3.91 M, "PROGRAMMER STEREOTYPES" with Elon and a hat guy 3.55 M, "REVERSE ENGINEER ANYTHING", "HOW TO build HER" 5.63 M with a pink-haired AI face, "FALLOUT" with DeepSeek logo and a smoking man 3.89 M).
- Outliers: the "Programming Iceberg" (8.46 M, the channel's most-viewed video): an iceberg chart packed with ~40 language logos, a meme face lower-left (the only top-20 thumb that is a dense infographic).

### Hits vs flops (the 10 flops of the last 12 months, 254 K-488 K views)

| | hits (top 20 l12, 1.58-6.5 M) | flops (10 lowest, 254-488 K) |
|---|---|---|
| layout | identical | identical (same palette, same badge on 7/10) |
| face | 17/20 real human; faces are the famous protagonist | 5/10 real human, but obscure (a JS-library author, Tim Berners-Lee, Joffrey, Vince McMahon meme, a man eating a dumpling); 4/10 cartoon/mascot (Winnie the Pooh meme, a sad egg mascot, a brain cartoon, the Bun dumpling); 2/10 pure "100 Seconds" template with no face |
| logo | the lab's logo (OpenAI 5/20, Claude sparkle, Gemini, Meta) | small-tool logos (TS, JS, WordPress, Backbone, Bun, a payments-protocol shield) |
| words | 2-3, claim-like, often exclamatory ("IS HERE", "CRACKED") | 2-4, descriptive or insider ("ripple up close", "syntactic SUGAR DADDY", "is BUN COOKED?", "TANSTACK START", "x402 explained"); 6 of 10 put a lower-case word in the small pixel face ("syntactic", "internet", "is", "why", "up close", "explained") where hits use all-caps |
| topic | frontier labs, AI drama, security leaks | niche JS tooling and runtimes, small frameworks, 100-seconds explainers |
| text size | the cream+red pair fills the left half | similar size; no systematic difference seen by eye |

Conclusion (honest): the layout is a constant, so it does not explain hit vs flop; **topic and recognisability of the face/logo do**. The one visual signal that separates them in this sample is "a person every viewer already knows, looking at camera, next to two words that make a claim". The flops that use the same layout with an unknown person or a cartoon pull 250-490 K, about half the channel median.

### The thumbnail formula, generalised (what to build, without the brand)

1. One flat dark background colour. No gradients or photo backgrounds.
2. Two-line headline, 2-3 words, two colours (neutral light + one hot accent), heavy display face with outline; 20 % of the time add a tiny third line in a contrast face for the joke ("(again)", "first look").
3. One cut-out face on the right third, cropped by the frame edge, expression readable at 120 px wide; use the face of the protagonist or a recognisable casting, not a stranger.
4. One logo top-left, small, only when the story is about that company.
5. A fixed small badge in one corner (series recognition), always the same.
6. Words add a claim/joke the title does not state; they never repeat the title.
7. Readable at 168x94 (the feed size): test by shrinking; the two headline words must still read.

## 9. What a new channel should copy (formula) and must not copy (brand)

### Copy (the formula; every point has a number)

1. **Lead with news/commentary on the biggest company stories, one per release, 4-7 min.** News videos are 74 % of the last 12 months' uploads and 77 % of its views (64 videos; median 917 K, mean 1.27 M); the top 20 of the last 12 months has 16 news-format videos and its median length is 5:46 (section 2).
2. **Aim for 5-8 minutes, lean to 6-8.** Last 12 months: under 4 min median 548 K (n = 8), 4-6 min 933 K (n = 57), 6-8 min 1.57 M (n = 17); log-log correlation of views with length is +0.36 in the last 12 months (it was -0.20 over all 803 because the old long tutorials flopped). Channel median length went 3:06 (2022) -> 5:29 (2026) as the format matured.
3. **Name the actor in the title.** Last 24 months: OpenAI-family names in 29 % of hits vs 9 % of flops (median 1.33 M vs 910 K without), Anthropic/Claude 15 % vs 6 %, any AI term in 47 % of hits vs 24 % of flops. Niche tooling words (JS/web stack) are in 0 % of hits and 26 % of flops (582 K vs 1.0 M median).
4. **Titles of 45-60+ characters, a full sentence with a consequence.** Median 51 characters for hits vs 41 for flops; 60+ chars median 1.35 M (n = 24), under 30 chars 593 K (n = 10). Question titles ("Did X just ...?") are 15 % of hits vs 3 % of flops and the 5 that end with "?" had median 1.58 M (small n; treat as a hint, not proof).
5. **Ship 1-2 videos a week on weekdays, Wednesday to Friday heaviest**, never a long gap: 87 videos in 52 weeks, only 6 of 52 weeks with zero uploads; Wed-Fri = 72 % of last-12-month uploads. The floor is what makes the channel's median (934 K) stable across five years: p10 of all 2021+ videos is 449 K.
6. **Sell the sponsor in line 1 of the description and keep the rest short.** 97 % of 2026 H2 descriptions open with a sponsor link; median 62 words; no view penalty (950 K sponsored vs 901 K not, last 24 months). Keep two or three generic hashtags and a footer to your own newsletter/courses.
7. **Thumbnail = fixed template + a recognisable face + a 2-3 word claim.** `#231f20`-style flat dark background, two-line headline (light + one hot colour), a cut-out face on the right (17 of 20 hits), company logo top-left (14 of 20), a fixed corner badge (19 of 20). Hits differ from flops by the fame of the face/logo, not by layout (section 8).
8. **Build one idea per Short, as a question, 40-55 s.** The 4 Why/How titles are all in the top 10 of the 48 Shorts; Shorts median 1.33 M views, 27 of 48 above 1 M, likes ratio 5.9 % vs 3.6 % for long videos; the late Shorts (2022-24) median 1.57 M vs 747 K for the 2021 batch. (Shorts stopped in 2024-09, so the format is proven but not currently maintained by them.)
9. **Packaging a series that pays outside the news cycle.** "N things everyone should know" mega-lists were the highest-yield recurring format: `100+` (5 videos, median 3.11 M, 12-13 min); `history` (12 videos, median 1.30 M; 9 of them in 2026); `i-built` (22 videos, median 991 K, last 12 months 1.57 M, n = 3). These are the evergreen counterweight to news.
10. **Be willing to retire a format.** "In 100 Seconds" went from median 927 K (2021, n = 56) to 486 K (2026, n = 3) and 536 K (2025, n = 1); the channel cut it from 56 uploads a year to 3 and did not lose its median (2021 986 K -> 2025 957 K). Tutorials (median 55-105 K in 2017-19) were dropped by 2020 (21 of 62) once the channel found 800 K-1 M formats.

### Must not copy (the brand; these are Fireship's and also distinctive enough to read as a clone)

1. **"... in 100 Seconds"** (167 videos, 173 M views) and **"100+ things you should know"** naming (5 videos, 3.11 M median): both are the channel's trademarks. Use your own series name and counter.
2. **The ellipsis headline.** 93 % of 2025 titles and 88 % of 2026 titles end in "..." or "…" (4 % in 2021). Hits and flops use it equally (79 % vs 79 %), so the numbers give no reason to copy it. It is the most recognisable surface tell of this channel; do not use it as a default.
3. **The "Code Report" name/badge, the flame logo, the cream+red-on-`#231f20` palette with the pixel-font tag line, the 3-column thumbnail grid exactly.** Copy the rules (flat dark ground, two words, one face, one logo, one badge), pick your own palette, display face and badge.
4. **Catchphrases and format jokes** ("is here*" asterisk gag, "first look" tag, "(again)", the sign-off, the stick-figure/meme-reaction look of the Shorts, the outlined caption font) and **the description boilerplate** (Editor Settings, "Topics Covered", the "Upgrade to PRO" block; four default tags `webdev, app development, lesson, tutorial`).
5. **Specific content**: any Fireship script, joke, example or sequence. The measurable formula above is about structure, not text.
6. **Do not assume his audience size.** 4.31 M subscribers, 706 M views on 803 videos: the 934 K median is a result of seven years of compounding. A new channel should plan for the shape (steady cadence, tight scope, a strong top end) not the level. The all-time top 30 contain 11 news videos, 6 "100 Seconds", 4 "I built", 3 "100+", i.e. one-off hits come from several different formats, so test formats, not only titles.
