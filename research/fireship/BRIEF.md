# Fireship study (2026-10-22): shared brief for 4 research agents

The owner is starting a new tech-news / tech-explainer YouTube channel in the spirit of Fireship (@Fireship,
`https://www.youtube.com/@Fireship`). Our job: measure **the formula** (script anatomy, pacing, visual grammar,
packaging) so we can build our own skill. **We learn the formula, never copy the content**: no Fireship scripts,
jokes, catchphrases, "in 100 Seconds" naming, flame logo, look or thumbnails end up in our videos.

Files already here:
- `data/flat-videos.tsv`: all 804 long videos (id, title, duration s), newest first.
- `data/flat-shorts.tsv`: 48 Shorts (id, title, views).

Rules for every agent:
1. Tools: `yt-dlp --no-update` (metadata, subtitles, 360p downloads), `ffmpeg`/`ffprobe`, python3 (Pillow via
   `~/.local/bin/uv run --offline --with pillow python …`). Whisper is NOT installed and must not be installed:
   transcripts come from YouTube subtitles (`--write-subs --write-auto-subs --sub-langs "en.*" --sub-format vtt`).
   Be gentle with YouTube: `--sleep-requests 1` on big metadata runs; if you get rate-limited (HTTP 429), back off.
2. Private material (transcripts, mp4s, frames) goes under `private/` only. It is never committed and never
   quoted at length: in your notes **paraphrase**; at most a few quotes, each under 15 words.
3. Write ONLY your own output files (named in your task). Use `nice -n 10` for ffmpeg. `trash`, never `rm`. No git.
4. Measure, don't guess: give numbers (counts, medians, seconds) and say how you measured them.
5. When you finish, trash the mp4s you downloaded (keep transcripts, contact sheets and frames).

## Deep-watch method (watch agents)
For each of your 3 videos:
1. Metadata: `yt-dlp --no-update -j --skip-download <id>` (views, likes, comments, date, chapters, description).
2. Transcript: subtitles → clean timestamped text `private/transcripts/<id>.txt`; words, words/min, sentence length.
3. Video: `yt-dlp --no-update -f "bv*[height<=360]+ba/b[height<=360]" -o "private/video/%(id)s.%(ext)s" <id>`.
4. Cuts: `nice -n 10 ffmpeg -i v.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep pts_time` → cut list;
   cuts/min overall and for 0–15 s / middle / last 30 s; median and p10/p90 shot length.
5. Look: one frame every 2 s → contact sheets (`fps=1/2,scale=320:-1,tile=5x4`) in `private/frames/<id>/`; also the
   first 30 s at 2 fps. READ every sheet (you can see images). Note per block what is on screen: code editor (theme,
   font size, lines shown, highlights, typing?), terminal, logos, meme/reaction images, stock footage, diagrams,
   charts/benchmarks, text overlays (font, colour, position), the presenter's avatar/face, transitions (hard cut, zoom,
   slide, whip), background colour, how often the screen is "busy" vs one big thing.
6. Script anatomy: hook in the first 10 s (device used), section structure with timestamps, how a new term is
   explained, joke density (jokes/min) and joke types (absurd analogy, industry roast, self-deprecation, deadpan
   understatement, meme callback…), how facts land (versions, numbers, benchmarks, sources named), the turn/payoff,
   sponsor segment (position, length, transition into it), the outro/sign-off pattern.
7. Audio cues you can infer (music under narration? sfx on cuts? silence beats?) — `ffmpeg` volumedetect / astats per
   10 s is enough.

Output: `watch-<bucket>.md`: per video (title, id, date, views, length, measured numbers, beat map table:
time | what's said (paraphrase) | what's on screen | joke/device), then a cross-video **formula** section: the
rules you'd give a writer and an animator to make a video with this feel, each backed by your numbers.
Final reply (short): the file, the 3 videos, the 5 most important findings.
