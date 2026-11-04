# format: Patch Notes
# topic: GitHub Universe 2026 (Oct 28–29, San Francisco): what shipped vs what is preview, Copilot approvals, the new metered bill (date checked 2026-11-04)
# engine: versus
# want: Dev wants to know what changes on his pull request on Monday, not in five years
# obstacle: a keynote about fleets of agents and thirty-one changelog posts in one day
# stakes: who gets to approve your code, and who pays for the robots doing it
# question: what did GitHub ship at Universe, and what does it cost?
# change: Dev learns the robots now fix, review, approve and pick models, that the real new thing is the meter, and leaves with three switches to check
# beat: AND GitHub's keynote says all code so far is less than one percent of what's coming, while Dev's pull request still waits for a review
# beat: THEREFORE we sort thirty-one changelog posts into what shipped and what is only a preview
# beat: BUT each new robot does a little more of the job: Agent Merge fixes CI and conflicts
# beat: THEREFORE code review Max stacks several review agents into one review
# beat: BUT Copilot approvals are now generally available and count toward required approvals
# beat: THEREFORE Copilot Fusion takes the model choice away from you, like a head chef picking the cook
# beat: THEREFORE Copilot Projects run agents across repos and hand back pull requests another robot can approve
# beat: BUT the turn: Copilot is now included in GitHub Enterprise, and so is the meter, from the first request
# beat: THEREFORE Dev leaves with three switches: watch and fix, approval paths, a budget alert
# promise: 1) what shipped vs preview 2) the robot that can approve your pull request 3) the new bill
# punch: percent, Thursday, robot's, dismissed, meter, plate, required

# chapter: Cold open
# pic: keynote stage doodle: generic Suit at a podium, giant slide "< 1%"; Dev in the crowd with coffee
# gag: the "< 1%" slide is so big it pushes Dev's coffee off the edge of the frame
GitHub's keynote says all the software ever written is less than one percent of what's coming. / And they mean within the next five years. [J] //
# pic: a lonely PR card "fix: typo in README #4521 · review requested 4 days ago"; a cobweb on it
# gag: cobweb grows on the PR card
Meanwhile, your pull request from Thursday is still waiting for a review. / So what changes for you next week? [J] //
# chapter: Thirty-one posts
# pic: GitHub logo pops; chip "UNIVERSE 2026 · SAN FRANCISCO"; a stack of changelog cards fanning out, counter "31 / ONE DAY"
At GitHub Universe in San Francisco, GitHub posted thirty-one changelog entries in a single day. //
# pic: (fast) jargon dump: changelog title chips rain down and pile up: WORKFLOW LOCKFILES, AGENTIC WORKFLOWS, ISSUE ARTIFACTS, MODERATE ROLE, IMAGE GENERATION, REPLICA, SECURITY EXTENSION…
(fast) Workflow lockfiles, agentic workflows, issue artifacts, a moderate role, image generation, a prototyping tool called Replica, / and a security extension for the app. //
We read the ones that matter, so you don't have to. [J] //
# pic: three numbered chips: 1 SHIPPED vs PREVIEW, 2 THE ROBOT APPROVER, 3 THE BILL; then sd-badge PATCH NOTES NOV 4
So here's what shipped versus what's only a preview, / the robot that can now approve your pull request, / and the new bill that comes with all of it. //
This is Patch Notes for Wednesday, November fourth. //
# pic: sd-source card (github.blog, Jay Parikh) with the quote highlighted; chip "FLEETS OF AGENTS"
The pitch, from GitHub's Jay Parikh, is that developers now orchestrate fleets of agents. / Completed work, not more code, is what matters. //
# pic: an empty ladder doodle with five rungs; Dev at the bottom looking up
To get there, GitHub stacked five robots into a ladder, / and each rung does a little more of your job than the last. //
# chapter: The ladder
# pic: rung 1 lights: "AGENT MERGE"; a merge box mockup with a "Watch and fix" button; the hand points at it
Rung one is Agent Merge, now built into pull requests on GitHub. //
# pic: CI check list: red X "build", then a robot icon, then green check; a conflict marker <<<<<<< turning into a clean file
Click Watch and fix in the merge box. / When an Actions workflow fails or a merge conflict shows up, / Copilot opens a cloud environment and fixes it. / You can even turn it on for every pull request you open. //
# gag: Dev and a coworker doodle glaring at each other over a "CONFLICT" sign; the Bot walks between them holding a wrench
So the merge conflict between you and your coworker is now a robot's problem. [J] //
# pic: chip "PAID COPILOT PLAN"; chip "+ AUTO-MERGE"
It needs a paid Copilot plan, and paired with auto-merge, the pull request can land by itself. //
# pic: rung 2 lights: "REVIEW MAX" + pink chip "PUBLIC PREVIEW"; three small Bot reviewers on three model tiles, arrows into one "referee" Bot
Rung two is code review Max, in public preview. / Lite and Balanced stay for everyday reviews. / Max runs several independent review agents on models from different providers, / then a referee agent settles their disagreements into one review. //
# pic: VENDOR NUMBERS chip; sd-source card "highest F1 score on ReviewBench for high-severity issues"
GitHub says Max posted the highest F one score on ReviewBench for high-severity issues. / That's GitHub's own number, and we haven't tested it. //
# pic: rung 3 lights big: "APPROVALS" + lime chip "GENERALLY AVAILABLE"
Rung three is the big one. / Copilot approvals are now generally available. //
# pic: PR sidebar mockup: "Required approvals 1 of 1 ✓ copilot approved"
Copilot can approve your pull request, / and that approval counts toward your repository's required approvals. //
# pic: Dev pushes a commit; the green "approved" stamp peels off and falls
# gag: the approval stamp falls off the PR like a sticker
It behaves like a human reviewer's approval. / Push one more commit, and the approval is dismissed. [J] //
# pic: chip "OFF BY DEFAULT"; a file tree with a padlock on src/auth/ and a tick on docs/
Approvals are off by default, and admins choose which file paths Copilot is allowed to approve. //
# pic: rung 4 lights: "FUSION" + lime chip "GENERALLY AVAILABLE"; the model picker dropdown with one entry "Copilot Fusion"
Rung four is Copilot Fusion, generally available on all Copilot plans. / You stop picking a model, and Fusion picks the models for each task. //
# pic: sd-source card (changelog, AT&T engineer quote) with "forget to switch back" highlighted; Dev sheepishly hides a "MAX" model badge behind his back
An engineer at AT&T is quoted in the launch post with the most relatable reason this exists. / Developers picked a powerful model for a hard task, / and then forgot to switch back. [J] //
# pic: the running analogy: a restaurant pass, a head chef (the Bot in a chef hat) reading order tickets, three cooks (model tiles)
Think of a restaurant kitchen, where a head chef reads every ticket and picks the cook. //
# pic: ticket 1 → one cook (SINGLE); ticket 2 → the fast cook, a taste-test check, escalated to the senior cook (CASCADE); ticket 3 → cook, taster, cook (CRITIQUE)
Easy orders go straight to one cook. / Harder ones go to the fast cook first. / If the plate fails the taste test, the senior cook takes over. / Or one cook makes it, and another tastes it before it leaves. //
# pic: VENDOR NUMBERS chip; dev-benchmark-bars: Fusion Max 60 vs Claude Code Opus 5.5 Max 62 (labelled "Artificial Analysis Coding Agent Index, as reported by GitHub"); chip "~½ COST PER TASK"
GitHub says Fusion Max scored sixty on the Artificial Analysis Coding Agent Index, / within two points of Claude Code on Opus five point five Max, / at about half the cost per task. //
# pic: the kitchen shrinks into the corner, a pinned note "REMEMBER ME"
Remember the kitchen, it's coming back. //
# pic: rung 5 lights: "PROJECTS" + pink chip "PUBLIC PREVIEW"; Copilot app window with a goal box; three repo cards, design mock, Slack-thread chip
Rung five is Copilot Projects, in public preview in the Copilot app. / You give it a goal, the repos, the design mocks and the Slack threads, / and it runs as many agents as the work needs, in parallel. //
# pic: three PR cards stack up in front of Dev; the Bot with an "APPROVE" stamp leans in from the side
It comes back with pull requests for you to review. / Which, conveniently, another robot can now approve. [J] //
# pic: desktop window with a cursor driven by the Bot; chip "COMPUTER USE · PREVIEW"; a permission dialog "Allow Copilot to control Expenses?"
The app's computer use, also in preview, can click through your desktop apps, / and it asks for your approval before it touches one. //
# pic: three devices in a row (phone, VS Code window, browser) joined by one glowing session line; lime chip "GENERALLY AVAILABLE · PAID PLANS"
There's also one boring change that matters more than it sounds. / Copilot cloud sessions and cloud sandboxes are now generally available on paid plans. //
Start a task from your phone at standup, steer it from VS Code, / and check on it from the web at lunch. //
# pic: a wallet doodle labelled "ACTIONS ENTITLEMENT ($)" with two hands reaching in: a CI runner and a Bot
# gag: the CI runner and the Bot both grab the same coin
The compute comes out of your Actions entitlement, / which is now one dollar-based pool instead of runner minutes. / Your builds and your agents now share a wallet. [J] //
# pic: server racks doodle; chip "+4,000,000 CPU CORES (2026)"; Azure text chip "MULTI-REGION AZURE · EARLY 2027"
All these robots need somewhere to run. / GitHub says it added four million CPU cores this year, / and it's moving to multiple Azure regions, finishing early next year. //
# pic: a GitHub nameplate on a door being unscrewed, a "MICROSOFT" nameplate held up beside it; sd-source card with "No immediate changes are required" highlighted
# gag: the old nameplate is unscrewed while the sign underneath already says Microsoft
And then the most Microsoft sentence of the week. / GitHub Copilot SDK is becoming Microsoft Copilot SDK. / And no immediate changes are required. [J] //
# chapter: The bill
# pic: Dev's face changes to the "wait…" look; the ladder dims
But here's the part the keynote gave one sentence. //
# pic: sd-source card (changelog) "GitHub Enterprise now includes access to GitHub Copilot"; lime chip "INCLUDED"
GitHub Enterprise customers now get every Copilot feature without a separate subscription. //
# pic: lime card "GOOD NEWS: COPILOT IS INCLUDED", then pink card "BAD NEWS: SO IS THE METER"; a taxi-style meter doodle starts ticking
The good news is that Copilot is now included. / The bad news is that so is the meter. [J] //
# pic: meter shows "$0.00 → first request"; chip "NO INCLUDED ALLOWANCE"
Usage is metered from the very first request, and there's no included allowance to top up. //
# pic: Fusion bill: three model tiles each with its own price tag; Max review with a bigger tag "MORE CREDITS"
Fusion bills each model it calls at that model's standard rate, / and Max reviews take longer and burn more credits. //
# pic: callback: the kitchen returns; every cook holds out a receipt
So let's go back to the kitchen. / You don't pay the chef, you pay every cook who touched the plate. [J] //
# pic: budget gauge at zero: "COMPLETIONS ✓" stays green, "CHAT · REVIEW · CLOUD AGENTS" go grey
There's one safety net: code completion keeps working when the budget hits zero, / while chat, code review and cloud agents stop. //
# pic: chip "$10 / USER / MONTH · COPILOT STANDALONE"; chip "SALES ONLY (FOR NOW)"
Anyone in an enterprise account without a GitHub Enterprise license gets Copilot Standalone at ten dollars a month each, with no monthly credits. / For now it's through sales only, and current self-serve plans are unaffected. //
# chapter: Next week
# pic: three to-do rows tick in: WATCH AND FIX on one PR / PICK APPROVAL PATHS / SET A BUDGET ALERT
So, what do you do next week? / If you're on a paid plan, try Watch and fix on one ugly pull request. //
If you're an admin, choose the file paths Copilot may approve before anyone flips the switch. / And set a budget alert, because the robots are on the meter now. //
# pic: callback: the "< 1%" keynote slide returns; Dev's old Thursday PR card, cobweb and all, sits in front of it
GitHub says the code so far is less than one percent of what's coming. / Your pull request from Thursday would still like a review. [J] //
# pic: sd-sting, Dev waves
That's the stack, doodled. See you in the next commit.
