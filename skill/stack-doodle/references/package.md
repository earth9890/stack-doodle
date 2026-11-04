# Package: title, thumbnail, description, upload, cadence

Measured in `R/research/fireship/channel.md` §5–§8. Our versions of the rules; never their wording, palette or grid.

## Title (write 5, recommend 1; plan a Test & Compare)
- **Dramatic first** (owner 2026-10-22): lead with the consequence and its scale, the way a person would tell a friend ("AI just found a hole in 70% of the internet", not "PHP just patched two critical flaws"). Still true and paid off by the video.
- **Name the actor**: the company/product people know, first or second word. Measured (last 24 months): frontier-lab names in
  29 % of hits vs 9 % of flops; niche JS/web-tool names in 0 % of hits vs 26 % of flops (median 582 K vs 1.0 M).
- 45–60 characters, a full sentence with a consequence ("X just did Y, and Z"); hits median 51 chars vs 41 for flops.
  Hard cap 60 (ep02's live 68-char title truncates); no "| Stack Doodle" suffix.
- One of the 5 is a question ("Did X just …?" — 15 % of hits vs 3 % of flops, small n).
- No ellipsis by default (it's their house style and equally common in hits and flops). No claim the video can't pay off.
- Doodled: search wording first ("What is DuckDB, and why is everyone switching?"); Shorts: a why/how question.
- Avoid "in 100 Seconds", "100+", "Code Report", "first look" tag lines.

## Thumbnail (1280×720; pro pass `S/references/thumbnail-pro.md`; final render `python3 S/scripts/thumb_hires.py E thumbnails/thumb-a.js thumbnails/a.png`)
Reference: `episodes/01-php2shell/thumbnails/thumb-c.js` ("WEB CRACKED": glowing wireframe globe split by a white-hot crack, light beam, logo in the crack, Dev screaming) is the level to beat; the plain template (`brand/thumbnails/thumb-template.js`) is only a starting point.
1. Background: graphite `#15171c` + the faint grid (our tell). No photo backgrounds.
2. Headline: 2–3 giant words in two lines, white + one accent (lime for "new/wow", pink for "dead/broken/hype"); heavy
   outline; the words add a claim the title doesn't say; never repeat the title.
3. One big doodle cast member on the right third, cropped by the edge, with one readable extreme expression (their hits
   use a famous face; we use our cast — never a real person's likeness).
4. One product logo top-left, only when the story is about that product (`logos.py`); text chip if simple-icons lacks it.
5. Series badge bottom-left, always the same place and size (PATCH NOTES / POSTMORTEM / DOODLED / CHEAT SHEET / LAB).
6. Readable at 168×94: run `S/scripts/thumb_check.py` (lint + feed grid) and look at the grid.
Make A (the claim) and B (the object: the logo/doodle as the hero) for every video.

## Description
Channel setup (keywords, About, upload defaults, playlists, end screens): `R/research/channel-setup.md`.
```
<Search line: what the video answers, in the words people type (check autocomplete with
 ~/videos/black-hole-life/seo/suggest.py "<seed>"). Only line above "...more".>
<One sentence of context: what happened / what you'll learn.>

Sources:
- <primary source 1 title> <url>
- … (3–6 links from sources.md; primary rung first)

Chapters (videos ≥ 4 min): 0:00 … (≥ 3, each ≥ 10 s, from the # chapter: lines + clip times)

▶ More <series or topic playlist>: https://www.youtube.com/playlist?list=<id>
▶ All Stack Doodle videos: https://www.youtube.com/playlist?list=PLS46fNkfJOIg
▶ Subscribe: https://www.youtube.com/@stackdoodle?sub_confirmation=1

#programming #<topic> #<webdev|security|…>
```
No boilerplate blocks beyond the three ▶ lines, no tag walls, no AI/TTS mentions. The sources block is our trust signal; keep it.
Tags: ≤ 15, the searches people type + product names/spellings/CVE IDs; end with the base set `tech news, programming, stack doodle`.
Pinned comment: one question that invites an opinion or experience ("Would you move a production app to X yet?").

## Playlists (created 2026-11-04)
Every video: All + its series + every topic shelf that fits. The "More" line uses the topic shelf if any, else the series.
| Playlist | ID | "More" line |
|---|---|---|
| All Stack Doodle Videos | `PLS46fNkfJOIg` | (always 2nd line) |
| Patch Notes: Tech News, Explained | `PLQqMXUwOKgjg` | `▶ More Patch Notes:` |
| Postmortems: How Tech Broke | `PLCGcwKgtQ88g` | `▶ More Postmortems:` |
| Security, Hacks & Breaches | `PLZh23h-GyC4g` | `▶ More security stories:` |
Create "Doodled: Dev Tools & Concepts Explained", "Cheat Sheets", "Labs: We Tested It" with their first video; a company
shelf (OpenAI / Google / …) once 3 videos share the company. Never create an empty playlist.

## Upload settings
Category Science & Technology · Not made for kids · Altered/synthetic content: Yes (owner's standing choice) · Language
English · Licence Standard · default tags empty · Public only after the owner's OK in chat · thumbnail A, B kept for Test & Compare.
End screen (last 10–15 s, the calm sign-off board): most recent + best for viewer + subscribe; import from the previous video.
Cards: one where the script mentions an earlier story, one at ~70 % to the topic shelf. After Public: add to playlists
(`studio.youtube.com/video/<id>/edit` → Playlists → Save), log the line in `R/uploads.log`.
Channel `UCJSjSUoVEvLZFoZSlZPbGzw`; check which Google account owns it on the first upload (Studio avatar → switch account)
and write it in the repo README.

## Cadence (proposal for the owner)
The reference channel ships 1.67 long videos/week, Mon–Fri only, Wed–Fri = 72 %, never a long gap; its floor (p10 449 K)
comes from consistency. Start: 2 Patch Notes per week (Wed + Fri, within 48 h of the news) + 1 evergreen (Doodled or
Postmortem) + 1–2 Shorts cut from them. Log every upload in `R/uploads.log` (date, id, title, format).
