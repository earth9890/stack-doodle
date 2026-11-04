# topic: GitHub Universe 2026 (Oct 28–29, San Francisco): Copilot app Projects, Copilot Fusion, Agent Merge, code review Max + approvals, Copilot included in GitHub Enterprise, Copilot SDK → Microsoft Copilot SDK
# date checked: 2026-11-04   event date: 2026-10-28 (keynote + 31 changelog entries tagged that day)   format: Patch Notes
# the one-sentence story: GitHub's keynote says developers now "orchestrate fleets of agents"; the changelog shows what really shipped on Monday: agents that fix your CI, review AND approve your PR, pick the model for you, and run across repos, all billed per AI credit.
# open questions (resolved): which items are GA vs preview (see table); what is billed how (see Billing).

## Sources used (all primary, github.blog; fetched 2026-11-04 with curl, quotes in sources.md)
- Keynote post, Jay Parikh (EVP CoreAI, Microsoft), Oct 28: github.blog/news-insights/company-news/github-universe-2026-evolving-every-layer-of-the-stack/
- Changelog Oct 28 (31 entries that day, counted from github.blog/changelog/ on 2026-11-04): agent-merge…, copilot-code-review…max-and-approvals, github-copilot-app-universe-releases, route-and-orchestrate-models-with-github-copilot-fusion, github-enterprise-now-includes-access-to-github-copilot, github-copilot-sdk-is-becoming-microsoft-copilot-sdk, work-from-anywhere…copilot-cloud-experience.
- Press: not used. WebSearch/WebFetch were rate-limited tonight; every claim is on a GitHub primary page, so no press number is needed. Secondary roundups seen earlier (dev.to recaps, smartscope.blog, cryptobriefing) agreed and are not cited.

## Status table (exact wording from the changelog)
| Thing | Status | Who gets it |
|---|---|---|
| Copilot app | "Already available"; Universe release adds Projects | download/update |
| Copilot Projects | "now in public preview" | Copilot app |
| Computer use in the app | "public preview on macOS and Windows" | opt-in, asks approval |
| Copilot Fusion | "generally available" | "all Copilot plans" in VS Code, app, CLI, JetBrains |
| Agent Merge on github.com PRs ("Watch and fix") | released (no preview label) | "users with a paid Copilot plan" |
| Code review Max | "now in public preview" | Pro, Pro+, Max, Business, Enterprise |
| Copilot approvals | "generally available"; "Approvals are off by default" | same plans |
| Copilot included in GitHub Enterprise | "Available now for GitHub Enterprise Cloud" via account team; self-serve "Currently unavailable" | GHE licensed users; others: Copilot Standalone $10/user/month |
| Cloud experience + cloud sandboxes | "both generally available on paid Copilot plans" | |
| Copilot SDK → Microsoft Copilot SDK | transition "in phases"; "No immediate changes are required" | |

## Billing (the turn)
- Enterprise: "You pay for the AI credits you use." "AI usage is metered from the first request … There is no included usage allowance". Standalone/GHE access "does not include monthly AI credits per seat".
- "Code completion and next edit suggestions keep working even with no budget available. Copilot Chat, Copilot code review, and Copilot in the cloud require available budget".
- Fusion: "billed for each model it uses, at each model's standard rate"; limited-time 30% discount on paid plans.
- Max review: "takes longer and uses more AI credits than Lite or Balanced".

## Vendor vs reality
VENDOR NUMBERS: Fusion Max scored 60 on the Artificial Analysis Coding Agent Index, "within two points of Claude Code with Opus 5.5 Max", "about half the average API cost per task … about 40% less time" (GitHub's changelog). Code review Max "posted the highest F1 score on ReviewBench for high-severity issues" (GitHub). We did not run either (paid plans; owner rule). Reality check = the billing lines: every model Fusion calls is billed at standard rate, so "half the cost" is per task vs one specific competitor setup, not vs your current bill.

## Story card draft
engine: versus (keynote vs Monday). want: Dev wants to know what actually changes on his PR on Monday. obstacle: 31 changelog posts in one day and a keynote about "fleets of agents". stakes: who approves the code, and who pays. question: what did GitHub actually ship, and what does it cost? change: Dev learns the robots now fix, review, approve and pick models, and that the real new thing is the meter; he leaves with three switches to check.

## Promise
1) what actually shipped (and what's only a preview) 2) the robot that can now approve your PR 3) the new bill.

## Analogy
Copilot Fusion = a restaurant pass: a head chef reads each ticket and decides which cook handles it (Single), lets the fast cook try first and escalates if it fails the taste test (Cascade), or has one cook make it and another taste it (Critique). You still pay for every cook who touched the plate.

## Candidate jokes (from facts)
- "GitHub Copilot SDK is becoming Microsoft Copilot SDK. No immediate changes are required." That sentence is doing a lot.
- Agent Merge fixes merge conflicts; the merge conflict between your branch and your coworker's is now a robot's problem.
- Copilot's approval "behaves like a human reviewer's approval": push a new commit and it's dismissed. Same as Dave from backend.
- Included in Enterprise / so is the meter (deadpan double line).
- Keynote: all software so far < 1% of the next five years; Monday: you still click merge.
