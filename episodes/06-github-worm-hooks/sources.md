# sources: 06-github-worm-hooks (accessed 2026-11-04)
Rungs: 1 primary (JFrog research post, GitHub docs, VS Code docs) · 2 specialist (SafeDep, Corgea) · 3 reputable press (The Register, InfoWorld/CSO, heise).
J = JFrog Security Research, "Beyond testmetest: Native Addon Camouflage and 42 Armed GitHub Repositories Reveal a Hidden npm Publisher", G. Korolevski & Y. Benamou, 26 Oct 2026, https://research.jfrog.com/post/beyond-testmetest-42-hijacked-github-repos/
R = The Register, Jessica Lyons, 26 Oct 2026, https://www.theregister.com/security/2026/10/26/worm-armed-42-github-repos-by-hiding-a-payload-too-big-to-fail/5305570
I = InfoWorld, Evan Schuman, 27 Oct 2026, https://www.infoworld.com/article/4241474/attackers-compromised-42-github-repositories-by-using-files-too-large-to-be-searched.html

| script line | claim | exact quote / number | source | rung | accessed |
|---|---|---|---|---|---|
| cold open / "forty-two real GitHub repositories… eleven owners" | count | J: "42 armed third-party GitHub repositories across 11 legitimate owners connected to the `testmetest` npm campaign" | J | 1 | 2026-11-04 |
| "thirteen megabytes" / "twelve point nine to thirteen point seven" | size | J: "12.9 to 13.7 MB polymorphic wrappers that all decode to the same hidden CI-publisher payload"; G1 blob 13,729,714 B | J | 1 | 2026-11-04 |
| "too big for GitHub's own search" | evasion | J: "GitHub code search did not index the 12.9 to 13.7 MB blobs, and the contents API could not return files of that size" | J; R | 1/3 | 2026-11-04 |
| "code search skips files over three hundred fifty kibibytes" (on screen "350 KiB") | limit | GitHub docs: "Empty files and files over 350 KiB are excluded" | https://docs.github.com/en/search-github/github-code-search/about-github-code-search | 1 | 2026-11-04 |
| "the content field comes back as an empty string" | API | GitHub docs (files 1-100 MB): "when using the object media type, the content field will be an empty string" | https://docs.github.com/en/rest/repos/contents | 1 | 2026-11-04 |
| "first sweep found twenty-six… files looked empty… read the trees… forty-two" | discovery | J: "Our first GitHub code-search sweep found the execution harness in 26 repositories… the associated `.github/init.js` files initially appeared empty… That conclusion was wrong." … "raising the total to 42" | J | 1 | 2026-11-04 |
| "SafeDep… eighteen packages… October nineteenth to twenty-fifth" | npm side | R: "identifying 18 packages linked to the same operator between October 19 and October 25" | R | 3 | 2026-11-04 |
| "all observed activity belongs to the operator's own test accounts" | SafeDep Oct 22 | R quoting SafeDep: "All observed activity belongs to the operator's own test accounts." | R | 3 (quoting 2) | 2026-11-04 |
| "self-replicating, steals credentials" | worm | R: "the malware is self-replicating, steals credentials, and installs a wiper that deletes the home directory when the victim revokes the stolen GitHub token" | R | 3 | 2026-11-04 |
| "hooks for Claude Code, Gemini, Cursor and VS Code… runs when you open the folder / start a session" | trigger | J: "Equivalent triggers were planted for Gemini, Cursor MCP configuration and VS Code folder-open tasks… turns routine developer actions, including opening a workspace with a supported tool, into payload execution opportunities"; SessionStart hook for Claude | J | 1 | 2026-11-04 |
| "dot-claude, dot-gemini, dot-cursor, dot-vscode" (file names on screen) | IOC names | J/I audit list: "`.github/init.js`, `.claude/settings.json`, `.gemini/settings.json`, `.cursor/mcp.json`, `.cursor/rules/setup.mdc`, `.vscode/tasks.json`" | I (quoting J) | 1 | 2026-11-04 |
| "the new autorun dot I N F" | quote | Aman Mahapatra (Tribeca Softech) in I: "`.claude/settings.json` is the new `autorun.inf`." | I | 3 | 2026-11-04 |
| "read the documentation for your detection tooling" | quote | Mahapatra in I: "The attacker read the documentation for your detection tooling and padded the file past its limits." | I | 3 | 2026-11-04 |
| "ten different wrappers, same payload" | polymorphism | J: "Across the 42 repositories we found 10 distinct wrapper blobs… all 10 wrappers… decrypt to a byte-identical 2 MB `_p` payload" | J | 1 | 2026-11-04 |
| "republishes… GitHub Actions… npm tokens" | CI publisher | I quoting J: "publishers designed to run through GitHub Actions and use npm tokens or trusted publishing to produce further malicious testmetest releases, feeding package delivery back into repository compromise" | I; J | 1 | 2026-11-04 |
| "accounts hijacked as early as July" | timeline | R: "hijacking accounts as early as July" | R | 3 | 2026-11-04 |
| "forged commit history… copied old messages and dates" | forgery | J: "account hijacks, forged commit timelines, short-lived publishing branches"; LDS (per J): "On September 28, scripted batches copied old commit messages and dates from real history" | J; https://letsdatascience.com/news/jfrog-finds-42-github-repositories-armed-with-ai-tool-hooks-ff2d1429 | 1/3 | 2026-11-04 |
| "refuses to run in CI, containers, small VMs, under a debugger" | evasion | J: "the payload fires on a real developer laptop or a regular server, and stays asleep inside the CI runners, containers and sandboxes that automated package scanners use" | J | 1 | 2026-11-04 |
| "npm swapped them for security placeholders" | response | Corgea: "npm replaced all three packages with `0.0.1-security` placeholders between 16:25 UTC and 16:28 UTC on 26 October" | https://corgea.com/research/testmetest-iobandamwer-npm-native-addon-armed-github-repos-october-2026 | 2 | 2026-11-04 |
| "revoke the token and it deletes your home folder… clean up first" | wiper + order | R (above); LDS: "Remove the net-health-checker and pkg-runtime persistence before revoking the stolen GitHub token, because the worm contains a token-revocation wiper" | R; LDS | 3 | 2026-11-04 |
| "unclear how many computers ran it" | unknown | heise: "It's unclear how many computers ran the malware or what data was stolen." | https://www.heise.de/en/news/Attackers-hijack-42-GitHub-repositories-in-npm-worm-campaign-testmetest-11504709.html | 3 | 2026-11-04 |
| "GitHub itself wasn't breached" | scope | I: "Security protections on GitHub were not breached but individual customer protections were" | I | 3 | 2026-11-04 |
| "hooks are features… root cause stolen credentials" | fair framing | Frank Dickson (Dickson Research) in I: "To be fair, these hooks are features, not flaws. The root cause here is stolen credentials, not the AI tools." | I | 3 | 2026-11-04 |
| "treat it as a compromised machine, rotate everything" | advice | I quoting J: "should treat installation of a full-worm version as a host compromise"; rotate "GitHub, GitLab, npm, PyPI, RubyGems, cloud, SSH, Vault, Kubernetes and AI-provider credentials" | I; J | 1 | 2026-11-04 |
| "don't audit with search, read the tree" | advice | I: "enumerate repository trees directly… should not rely on GitHub code search or the contents API" | I; J | 1 | 2026-11-04 |
| "Restricted Mode… when in doubt" | VS Code | VS Code docs: "When in doubt, leave a folder in Restricted Mode." … "Opening a workspace in restricted mode disables agents in that workspace." | https://code.visualstudio.com/docs/editing/workspaces/workspace-trust | 1 | 2026-11-04 |
| "we ran git ls-tree… thirteen point seven million bytes" (WE RAN IT) | our demo | lab/log.txt: a local dummy repo, `.github/init.js` = 13,729,714 bytes of "x"; `git ls-tree -r -l HEAD` prints the size | lab/log.txt (ours, M-series Mac) | ours | 2026-11-04 |

## Checked and NOT used
- Exact hook file contents, decoding steps, C2 addresses, the XOR key, package names beyond "testmetest": omitted on purpose (security rule: class of bug only).
- "Miasma family" lineage: SafeDep itself is uncertain (InfoWorld: "explicitly noting uncertainty about its lineage"); script says "a relative of earlier npm worms" at most.
- The cPanel CVE-2026-41940 scanner link: real per JFrog/Register, but "did not confirm any downstream cPanel compromises"; cut for length.
- June Miasma episode (73 Microsoft repos disabled): different campaign; not used to avoid mixing.
- Code-search limit "~384 KB" (SafeDep/Corgea) vs docs "350 KiB": we use the docs number.

## Contested
- Victim count beyond 42 repos and any machines infected: unknown (heise). Script says "forty-two repositories that we know of" and "nobody knows yet how many laptops opened one".
