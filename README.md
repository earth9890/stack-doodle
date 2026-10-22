# Stack Doodle

Fast, funny, sourced tech news and developer explainers. Our own doodle cast on a dark grid, plus real code, real terminal
runs and the logos of the products we talk about.

- **YouTube:** Stack Doodle, @stackdoodle, channel `UCJSjSUoVEvLZFoZSlZPbGzw`. Google account harishsugandhi9102@gmail.com: in Chrome, avatar → Switch account → "harish sugandhi" (9102). Branding: `brand/v3/` (flat Stacky avatar + "stackdoodle" wordmark banner, live since 2026-10-22; v1/v2 kept as earlier drafts).
- **Workflow:** the `stack-doodle` skill (`~/.claude/skills/stack-doodle/`, synced into `skill/` by `sync.sh`).
- **Engine:** the still look and asset library from `whiteboard-video-studio` (shared with Black Hole Life).

## How a video gets made
1. The owner sends a tech topic (a link or a name).
2. We pick the format: Patch Notes (news), Postmortem (story), Doodled (explainer), Cheat Sheet (list), Lab (experiment) or Short.
3. Research: `research.md` + `sources.md`, with an exact quote and URL for every claim, and a hands-on run of the tool when we can.
4. The script goes to the owner for OK. Then the voice, the scenes, the render, the package, and the upload (owner OK).

## Rules
- We learn the Fireship formula (`research/fireship/`) and never copy its content or brand.
- Product logos appear only when that product is the topic (`tools/logos.py`, simple-icons, nominative use).
- Real people appear as names only.
- Pace: fast, but no flicker.
- Security stories never include exploit steps.

## Layout
- `episodes/NN-slug/`: one video.
- `tools/`: `logos.py` (logo assets from simple-icons) and `sd-kit.js` (channel kit: background, chips, evidence cards, badges, cast).
- `brand/`: logo, banner and thumbnail template (proposals until the owner picks).
- `research/fireship/`: the study.
  - `channel.md`: 804 videos.
  - `watch-*.md`: 10 videos deep-watched.
  - `private/` holds transcripts and video frames. It is git-ignored and never published.
