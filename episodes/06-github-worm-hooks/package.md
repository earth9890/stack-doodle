# package: 06-github-worm-hooks (DRAFT, not uploaded; publishing needs the owner's OK in chat)

**Title:** Hackers hid malware in a file too big for GitHub to see
**Thumbnail:** thumbnails/a.png (B = thumbnails/b.png for Test & Compare)

## Description
GitHub worm explained: how 42 repos were booby-trapped to run code when you open the folder, and why search saw an empty file.

JFrog found an npm worm ("testmetest") that planted startup hooks for Claude Code, Gemini, Cursor and VS Code in 42 real GitHub repos, with a 13 MB script that GitHub's code search skipped. Here's how it worked, what was overblown, and three checks before you open a stranger's repo.

Sources:
- JFrog Security Research (Oct 26, 2026): https://research.jfrog.com/post/beyond-testmetest-42-hijacked-github-repos/
- The Register: https://www.theregister.com/security/2026/10/26/worm-armed-42-github-repos-by-hiding-a-payload-too-big-to-fail/5305570
- InfoWorld: https://www.infoworld.com/article/4241474/attackers-compromised-42-github-repositories-by-using-files-too-large-to-be-searched.html
- GitHub Docs, code search limits: https://docs.github.com/en/search-github/github-code-search/about-github-code-search
- VS Code Workspace Trust: https://code.visualstudio.com/docs/editing/workspaces/workspace-trust

Chapters:
CHAPTERS_HERE   (fill from the # chapter: lines + real clip times after the voice: The test that wasn't / Open means run / The empty file / Shy in sandboxes / What it means / Three checks)

▶ More security stories: https://www.youtube.com/playlist?list=PLZh23h-GyC4g
▶ All Stack Doodle videos: https://www.youtube.com/playlist?list=PLS46fNkfJOIg
▶ Subscribe: https://www.youtube.com/@stackdoodle?sub_confirmation=1

#cybersecurity #github #programming

## Tags (15)
github malware, github worm, npm worm, testmetest, supply chain attack, npm supply chain attack, claude code hooks, vscode tasks json, cursor mcp, workspace trust, jfrog, github code search, tech news, programming, stack doodle

## Upload settings
Science & Technology · Not made for kids · Altered/synthetic content: Yes · English · Standard licence · Playlists: All, Patch Notes (PLQqMXUwOKgjg), Security (PLZh23h-GyC4g).
End screen on the calm sign-off board (last ~10 s). Card at ~70 % → Security playlist; card where it fits → the Binance episode (03) if it is live (same "assignment repo" lesson).

## Thumbnail concepts
- **A (the claim):** a giant file icon bursting out of a tiny GitHub search box that reads "0 results"; headline "TOO BIG|TO SEE" (white + pink), Dev on the right third with the shocked face, GitHub logo top-left, PATCH NOTES badge bottom-left. Graphite + faint grid.
- **B (the object):** a folder icon cracked open with the pink Bug climbing out, a lime cursor double-clicking it; headline "DON'T OPEN|IT" (white + pink); GitHub logo top-left; badge bottom-left.

## Pinned comment
Do you look inside the .vscode / .claude folders before you open a repo you cloned, or do you trust the prompt?
