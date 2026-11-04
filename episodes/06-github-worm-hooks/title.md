# titles: 06-github-worm-hooks (≤ 60 chars; dramatic but true; recommend #1)
1. Hackers hid malware in a file too big for GitHub to see   (57)  <- recommended
2. Opening this GitHub repo was enough to get you hacked   (55)
3. A worm hid in 42 GitHub repos. Search said it was empty   (57)
4. Did GitHub's own search just help hide a worm?   (48)  (question variant)
5. This worm runs the moment you open the folder   (46)

Notes: "too big for GitHub to see" = code search skips files over 350 KiB and the contents API returned the content empty
(JFrog + GitHub docs). "Opening… was enough" = hooks run on folder open / session start in a supported tool (JFrog).
