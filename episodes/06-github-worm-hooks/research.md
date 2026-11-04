# topic: testmetest worm armed 42 real GitHub repos with editor / AI-coding-tool startup hooks; the payload files (12.9–13.7 MB) were too big for GitHub code search and the contents API, so early scans saw "empty" files
# date checked: 2026-11-04   event date: JFrog report Oct 26, 2026 (Mon); SafeDep npm side Oct 22 (updates Oct 26, 27); arming batches Sep 28   format: Patch Notes (security)
# the one-sentence story: a worm turned "open the folder" into "run the malware" in 42 real repos, and hid the payload by making it too big for the search tools defenders use.
# open questions (resolved below): who found it / when; how many repos and owners; why search missed it; what triggers it; what to do

## Timeline (all UTC, from JFrog / SafeDep)
- Jul 2026: real "smoke test" waves on hijacked accounts (AsharaFernando18 Jul 23, leamasuero Jul 30) — JFrog.
- Sep 19: first exfiltration test from a related account — SafeDep.
- Sep 28: scripted arming batches across victim accounts; commits copied old messages + author dates, appended `skip-checks:true` — JFrog.
- Oct 19–27: 19 npm packages from the same operator (accounts alexjoipamiba, testnewtestme, iobandamwer, testsecuiitytestme) — SafeDep.
- Oct 21: JFrog scanners alert on shai-hulud packages on npm — JFrog.
- Oct 22: SafeDep documents the npm side; "As of 22 October 2026, SafeDep has found no compromised third-party packages or victims."
- Oct 26: JFrog: 42 armed third-party repos across 11 legitimate owners. npm replaces iobandamwer packages with security placeholders; <20 h later a new account publishes again (SafeDep update Oct 27).
- Oct 27/28: InfoWorld + CSO Online (Evan Schuman) coverage with analyst quotes.

## How it works (safe level: class of bug + impact, no payload)
1. Steal a token: the npm worm stole GitHub and npm credentials from machines that installed malicious packages (JFrog).
2. Use the token to commit into the owner's repos: small config files for Claude Code, Gemini, Cursor, VS Code that run a script when a session starts or a folder opens, plus a huge script file in `.github/` (JFrog lists the file names as audit targets).
3. A developer opens the repo in one of those tools → the hook runs the script → it steals that developer's tokens / publishes more poisoned packages via GitHub Actions + npm tokens or trusted publishing (JFrog: "feeding package delivery back into repository compromise").
4. Hiding: the payload blob is 12.9–13.7 MB; GitHub code search doesn't index it (SafeDep June: code search "skips files larger than roughly 384 KB") and the contents API can't return it, so the first sweep (26 repos) saw hooks pointing at "empty" files. Walking Git trees found all 42.
5. Extra camouflage (npm side): a compiled native addon with no payload, decrypting a `.napi_cache` dotfile at runtime; refuses to run in CI, containers, small VMs, under a debugger; on Windows stands down if Wireshark / Process Monitor run (JFrog; Dickson quote).
6. Wiper: the worm installs a wiper that deletes the home directory when the victim revokes the stolen GitHub token (SafeDep); JFrog: remove persistence BEFORE revoking.

## The catch / the other side
- InfoWorld: "Security protections on GitHub were not breached but individual customer protections were."
- Frank Dickson (Dickson Research): "these hooks are features, not flaws. The root cause here is stolen credentials, not the AI tools."
- Aman Mahapatra (Tribeca Softech): "`.claude/settings.json` is the new `autorun.inf`." / "The attacker read the documentation for your detection tooling and padded the file past its limits."
- Reach is limited: 42 repos, 11 owners (individual devs, students, one company: Crayon-Biz-LLP). No proof any cPanel server was breached.

## Developer angle (Monday)
- Before opening an unfamiliar repo in an editor or coding agent, look at the hook/config folders: `.claude/`, `.gemini/`, `.cursor/`, `.vscode/tasks.json` (JFrog's audit list).
- Keep VS Code Workspace Trust / Restricted Mode for unknown code (VS Code docs: Restricted Mode disables "AI agents, terminal, tasks, debugging, workspace settings, and extensions").
- Scope tokens and make them short-lived; if infected, follow JFrog's order (remove persistence, then rotate).
- Audit by listing repo trees, not code search.

## Hand-off
- Story card: engine discovery/mystery; want: find out how many repos are armed; obstacle: the files look empty to search; stakes: every dev who opens the repo leaks their keys and becomes the next spreader; question: how do you hide malware in plain sight on GitHub, and what triggers it?; change: Dev learns opening a folder is now an execution event.
- Promise: 1) what happens when you open the folder 2) why the scanners saw nothing 3) the five-minute check.
- VENDOR vs REALITY: SafeDep (Oct 22) "no victims" vs JFrog (Oct 26) 42 armed repos. Fair framing: SafeDep's statement was about npm packages; the size limit hid the GitHub side.
- Analogy: airport X-ray with a size limit; the smuggler packs a suitcase too big for the belt, so it goes round the side unchecked.
- Jokes from facts: "the file was too big to be suspicious"; malware that won't run when you're watching (shy malware / stage fright); revoking the token triggers the wiper (the most passive-aggressive malware); the fake commit dates (backdated to look old: commits with fake birthdays); the account renamed repos "come-to-telegram-…" (skip, it's a person's hijacked account: don't joke at victims).
