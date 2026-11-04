# Stack Doodle: channel-level SEO setup (draft, 2026-11-04)

Channel `UCJSjSUoVEvLZFoZSlZPbGzw` (@stackdoodle). This adapts the Tiny Tune Town setup
(`~/.claude/skills/tiny-tune-town/references/package-upload.md`) for a not-made-for-kids tech-news channel.
Everything here is a draft. The lead applies it in Studio, and the playlist IDs stay `<TBD>` until the playlists exist.

## 0. Audit: public state, 2026-11-04 (curl / yt-dlp, logged out)
- **2 public videos, 11 views:**

  | ID | Title | Format | Length | Views |
  |---|---|---|---|---|
  | `XHOOrmG-x08` | AI vs. PHP: The Bug That Shocked the Internet | Patch Notes trial | 55 s | 6 |
  | `vlEw9NFSlBo` | eMudhra: One Indian Company. One Big Mistake. The Internet at Risk. | Postmortem | 2:48 | 5 |

  Both titles were renamed after `uploads.log` was written, so the log is out of date.
- **Category:** Science & Technology on both videos (correct). Each has 13–14 tags ending in "stack doodle", sources in the
  description, and no playlist or subscribe lines.
- **About:** already set: "Tech news, doodled. Fast, funny and sourced videos about … software, AI and security …". It uses
  the word **AI** (see decision 1). **Keywords: empty. Playlists: none. No Shorts tab.**
- The channel is unverified, so description links are not clickable until the owner completes phone verification
  (memory note, 2026-10-22).
- There are too few views to judge titles. The template below rests on the Fireship study (`research/fireship/channel.md` §5).

## 1. What the peers do (patterns only)
These come from the public About and Playlists pages.
- **Fireship:**
  - Keywords: 5 words (angular, firebase, web development, javascript, typescript), left over from its early days.
  - About: a one-line promise, then the series names.
  - About 30 playlists. Most are **company or topic shelves** (OpenAI, Google, Anthropic, Microsoft, "Security, Hacks and
    Leaks", "Artificial Intelligence", "Coding and Programming Languages"), plus one per **series** ("The Code Report",
    "First Look", "CS101", "Top N Lists").
- **ThePrimeagen:** about 40 keywords (485 characters) mixing editors, languages and "programmer humor". Its playlists are
  mostly series ("Prime Rants", "Tech Weekly").
- **ByteByteGo:** no keywords; 7 topic playlists ("System Design Fundamentals", "Security", "Database").

The pattern: **one playlist per series, plus topic shelves that a news story can join.** A viewer who lands on a security
story binges the security shelf.

## 2. Channel keywords (19, each ≤ 30 characters, 260 of 500 characters)
Paste as one comma-separated line in Studio → Settings → Channel → Basic info → Keywords:
```
tech news, programming, software engineering, web development, cybersecurity, security news, hacking news, developer news, coding, javascript, python, linux, open source, tech explained, programming humor, data breach, zero day, dev tools, stack doodle
```
If the owner allows AI as a topic word (decision 1), swap `data breach` → `ai news` and `zero day` → `ai coding`.

## 3. Channel description / About (627 characters)
Draft without the word "AI" (decision 1 picks between this and keeping the live text):
```
Tech news, doodled. Fast, funny and sourced videos about what just happened in software, security and the tools developers use, and what it actually means for you.

Patch Notes: the week's biggest tech story, explained within a couple of days.
Postmortem: how a company, a bug or a hack broke the internet, step by step.
Doodled: one tool, language or concept in under three minutes.
Cheat Sheet and Lab: everything about one thing, and real tests with a real verdict.

Real code, real terminal runs, and every claim linked in the description. No hype, no guessing, just what changed and what to update.

New videos every week.
```
Links section: none until there is a newsletter or site.

## 4. Upload defaults (Studio → Settings → Upload defaults)
| Field | Value | Why |
|---|---|---|
| Visibility | **Private** | Public only after the owner's OK in chat; the upload flow sets final visibility. |
| Category | **Science & Technology** | Matches both live videos and every peer in the niche. |
| Title / description language | **English** | |
| Licence | **Standard YouTube Licence** | |
| Comments | Allow all, hold potentially inappropriate for review | Opinions in comments are the engagement loop (pinned question). |
| Description (default footer) | below | Only pre-fills manual uploads; the Chrome helper overwrites the box, so the package template carries the same lines. |
| Tags | **empty, on purpose** | Every package carries its own ≤ 15 tags ending "stack doodle"; defaults would duplicate and add off-topic tags to every news story. |
| Audience | Not made for kids | Needed for end screens and cards. |
| Altered/synthetic content | Yes (owner's standing choice, `references/package.md`) | |

Default description footer:
```
▶ All Stack Doodle videos: https://www.youtube.com/playlist?list=PLS46fNkfJOIg
▶ Subscribe: https://www.youtube.com/@stackdoodle?sub_confirmation=1
```

## 5. Playlists (3 now + All; Public; newest first)
| Playlist | ID | Description "More" line |
|---|---|---|
| All Stack Doodle Videos | `PLS46fNkfJOIg` | (always the second line) |
| Patch Notes: Tech News, Explained | `PLQqMXUwOKgjg` | `▶ More Patch Notes:` |
| Postmortems: How Tech Broke | `PLCGcwKgtQ88g` | `▶ More Postmortems:` |
| Security, Hacks & Breaches | `PLZh23h-GyC4g` | `▶ More security stories:` |

Each video gets **one series playlist and every topic shelf that fits**. The description "More" line uses the topic shelf
when there is one, because topic binges run longer, and the series otherwise.

Descriptions:
- **All:** `Every Stack Doodle video, newest first: tech news, hacks, postmortems and dev explainers, doodled and sourced.`
- **Patch Notes:** `The week's biggest tech story, explained fast: what changed, why it matters, and what you should update. Real code, real sources, no hype.`
- **Postmortems:** `How a bug, a hack or a bad decision broke something big, step by step. Tech disasters and rise-and-fall stories, doodled and sourced.`
- **Security:** `Cybersecurity news for developers: vulnerabilities, breaches, broken certificates and zero days, what happened and exactly what to patch.`

Membership:
- **All:** `vlEw9NFSlBo`, `XHOOrmG-x08`
- **Patch Notes:** `XHOOrmG-x08`
- **Postmortems:** `vlEw9NFSlBo`
- **Security:** `vlEw9NFSlBo`, `XHOOrmG-x08`

Add these when the first video exists. Don't create them empty, because an empty shelf on the channel page looks dead:
- **Doodled: Dev Tools & Concepts Explained** (series)
- **Cheat Sheets** (series)
- **Labs: We Tested It** (series)
- **company shelves** such as "OpenAI", "Google" or "Anthropic", once 3 videos share a company (Fireship's most common kind)

## 6. Title template (checked against the study's hits; our 2 videos have no signal yet)
`<Actor people know> <just did X>, <and consequence>`. 45–60 characters, actor first or second word, a dramatic but true consequence.
One of the 5 options is a question ("Did X just …?"). Doodled uses the search wording: "What is X, and why is everyone switching?".
- The live `vlEw9NFSlBo` title is 68 characters and gets cut off in search and suggested. A trimmed version that keeps the claim:
  "eMudhra: One Company's Mistake Put the Internet at Risk" (55). Optional; renaming a 2-day-old video is safe.
- **No `| Stack Doodle` suffix.** The brand gets no searches, and the channel name already shows.

## 7. Description template and base tags (now in `~/.claude/skills/stack-doodle/references/package.md`)
```
<Search line, the only line above "...more">
<One sentence of context>

Sources:
- …

Chapters (videos ≥ 4 min): 0:00 …

▶ More <series or topic>: https://www.youtube.com/playlist?list=<id>
▶ All Stack Doodle videos: https://www.youtube.com/playlist?list=PLS46fNkfJOIg
▶ Subscribe: https://www.youtube.com/@stackdoodle?sub_confirmation=1

#programming #<topic> #<webdev|security|…>
```
Base tags on every video (put them last): `tech news, programming, stack doodle`. The other ≤ 12 tags stay story-specific: product names, spellings, CVE IDs.
There is no About paragraph. The series name in the "More" line already tells a viewer what the channel is, and the package rule says "no boilerplate blocks".

## 8. Watch-next and channel page
- **End screen (last 10–15 s, every video):**
  - Element 1: "Most recent upload" (news channels live on recency).
  - Element 2: "Best for viewer".
  - Element 3: Subscribe.
  - The landing and sign-off beat (`formats.md`, 88–100 %) is where it goes. Keep that board calm for about 12 s.
  - Build it once, then use **Import from video**.
- **Cards:**
  - One card where the script mentions an earlier story, linked to that video.
  - One at about 70 % to the matching topic shelf.
- **Channel page (Customization → Layout):**
  - Trailer for non-subscribers: `vlEw9NFSlBo`, the eMudhra Postmortem. It is the fuller format; the PHP video is a 55 s trial.
    Re-pick the trailer once a 5–7 min Patch Notes exists.
  - Sections:
    1. Latest videos
    2. Security, Hacks & Breaches
    3. Patch Notes
    4. Postmortems
    5. Popular videos (add once there are 6 or more videos)

## 9. Applied checklist (Studio only, in order)
1. In Chrome: avatar → Switch account → **harish sugandhi (9102)**. In Studio, confirm the channel is **Stack Doodle**.
2. **Settings → Channel → Feature eligibility.** The owner does the phone verification, which makes description links
   clickable and lifts the thumbnail limit. The lead must not enter phone numbers.
3. **Customization → Basic info:** description. Use §3, or keep the live text if decision 1 says AI is fine → Publish.
4. **Settings → Channel → Basic info:** §2 keywords → Save.
5. **Settings → Channel → Advanced settings:** audience = not made for kids.
6. **Settings → Upload defaults:** §4 table and footer; leave the tags empty → Save.
7. **Content → Playlists → New playlist** ×4: the §5 names and descriptions, Public. Send the four `list=` IDs back so the
   `<TBD>`s get filled.
8. **Content → Videos:** add each video to its §5 playlists. Then put the real All ID into the upload-defaults footer.
9. On both videos, add the `▶ More / ▶ All / ▶ Subscribe` lines to the description above the hashtags.
   Optional: shorten the eMudhra title (§6). Save.
10. **End screen** on `vlEw9NFSlBo` (§8). The 55 s PHP video gets the same end screen; it is long enough.
11. **Customization → Layout:** trailer + sections (§8) → Publish.
12. Check:
    - `curl -s https://www.youtube.com/@stackdoodle/playlists` lists 4 playlists;
    - `/about` shows the new description.
