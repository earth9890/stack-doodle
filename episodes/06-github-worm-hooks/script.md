# format: Patch Notes
# topic: the "testmetest" npm worm armed 42 real GitHub repos with editor / AI-coding-tool startup hooks and a payload too big for GitHub search (JFrog, Oct 26 2026; date checked 2026-11-04)
# engine: mystery
# want: Dev wants to know how a worm that "had no victims" ended up inside forty-two real repos
# obstacle: the payload was built to be invisible to the exact tools defenders use to look for it
# stakes: every token on a developer laptop: GitHub, npm, cloud, SSH
# question: how does opening a folder run malware, and why did GitHub's own search see an empty file?
# change: Dev learns that "open" now means "run", and checks the dot folders and the trust prompt before opening a stranger's repo
# beat: AND on npm SafeDep found eighteen testmetest packages and said all activity was the operator's own test accounts
# beat: BUT four days later JFrog found the same operator had already armed forty-two real repos
# beat: THEREFORE the question becomes how it got in: stolen tokens, then commits with forged history
# beat: AND each commit adds tiny startup hooks for four tools plus one giant script
# beat: THEREFORE opening the folder in a supported tool runs the script, and the script publishes more packages
# beat: BUT the giant script looked empty, because code search skips big files and the API hands back an empty string
# beat: THEREFORE JFrog read the git trees directly and the count went from twenty-six to forty-two
# beat: AND newer builds sleep inside sandboxes and punish token revocation with a wiper
# beat: BUT GitHub wasn't breached and the hooks are features; the root cause is stolen credentials
# beat: THEREFORE the danger moved from install to open, and Dev gets three checks for Monday
# promise: 1) how opening a folder became running code 2) why the scanners saw an empty file 3) what to check before you open someone else's repo
# punch: folder, empty, test, wrong, suitcase, laptop, open, empty

# pic: Dev at a laptop, a folder card "cool-project/" slides in; Dev double-clicks; a tiny Bug peeks out of the folder; chip "JUST OPEN IT"
Hackers just found a way to run malware on your machine without you running anything. / You only have to open the folder. //
# pic: GitHub logo; a file card ".github/init.js" with a big "13.7 MB" size chip; a search box beside it returns "EMPTY"
And the file that does it is thirteen megabytes, / which is exactly why GitHub's own search thinks it's empty. [J] //
# pic: sd-source card (JFrog research, Oct 26) with the "42 armed… 11 legitimate owners" line highlighted; chip "42 REPOS"
On October twenty-sixth, JFrog's security researchers reported forty-two real GitHub repositories from eleven owners, / booby-trapped by an npm worm called testmetest. //
# pic: a folder in the middle; four tool chips pop around it: CLAUDE CODE, GEMINI, CURSOR, VS CODE (logos where we have them)
The traps are startup hooks for Claude Code, Gemini, Cursor and VS Code. / Open the project in one of them, and the hook can run the payload. //
# pic: three numbered chips: 1 OPEN = RUN, 2 THE EMPTY FILE, 3 YOUR CHECKLIST; then sd-badge PATCH NOTES NOV 4
So how does opening a folder become running code, / why did the scanners see an empty file, / and what should you check before you open someone else's repo? //
This is Patch Notes for Wednesday, November fourth. //
# chapter: The test that wasn't
# pic: npm logo; small package boxes stack up, each labelled "-testmetest"; calendar chip OCT 19–25
It started on npm. Between October nineteenth and twenty-fifth, SafeDep spotted eighteen packages from one operator, / all with testmetest in the name. //
# pic: sd-source card (SafeDep, quoted by The Register) "All observed activity belongs to the operator's own test accounts." highlighted; lime chip "NO VICTIMS"
On October twenty-second, SafeDep's verdict was reassuring: / all observed activity belonged to the operator's own test accounts. //
# gag: the package box wears a tiny lab coat and a clipboard that says "QA"
A malware author, testing their malware, on their own accounts. / Honestly, that's more Q A than most of us do. [J] //
# pic: calendar OCT 26 + JFrog card; the lime "NO VICTIMS" chip gets a pink "WRONG" stamp across it
Then JFrog looked closer. The good news: the test had no victims. The bad news: it wasn't a test. [J] //
# chapter: Open means run
# pic: escalation ladder on the left, rung 1 lit "STOLEN TOKENS"; a key card "GITHUB TOKEN" and "NPM TOKEN" fly out of a laptop
Rung one is the boring one. The worm steals credentials, / the GitHub and npm tokens sitting on a developer's laptop. //
# pic: ladder rung 2 lit "REAL REPOS"; a commit list with dates 2017, 2019, 2021 that are all stamped "FORGED"
Rung two: with a stolen token, it can commit to every repo that token reaches. / JFrog says the history was forged too. / Old commit messages and dates were copied from real projects. //
# pic: ladder rung 3 lit "TINY HOOKS"; a file tree slides in: .claude/, .gemini/, .cursor/, .vscode/ (small files), .github/init.js (huge, pink)
Rung three: each commit adds a few tiny config files, one per tool, / and one giant script hiding in the dot github folder. //
# pic: a doodle: folder opens → a little gear "STARTUP HOOK" spins → a terminal line runs; chip "RUNS ON OPEN"
A startup hook is a command your tool runs by itself when a session starts or a folder opens. / It exists so a project can set itself up for you. //
# pic: ladder rung 4 lit "OPEN THE FOLDER"; Dev opens the folder; the tool's gear politely hands the Bug a tray
So a developer clones the repo and opens it, / and the tool politely runs the attacker's script. / That's what the project told it to do. [J] //
# pic: sd-source card (InfoWorld) with the Mahapatra quote highlighted; chip "AUTORUN.INF"; an old CD doodle
One analyst, Aman Mahapatra, summed it up in one line: / dot claude slash settings dot json is the new autorun dot I N F. //
# pic: CD drops into a doodle PC tower, a program window pops up by itself; chip "AUTORUN"
That's the old Windows file that told a disc which program to start when you put it in. / We spent years teaching computers not to do that. //
# pic: a loop diagram: PACKAGE → REPO → GITHUB ACTIONS → NEW PACKAGE (arrows), npm and GitHub Actions logos; chip "SELF-PUBLISHING"
And the script's job is to make more of itself. / JFrog says it carries a publisher built to run in GitHub Actions. / It uses npm tokens to push new malicious releases. //
# pic: the loop spins once; a pink chip "SUPPLY CHAIN, NOW A SUBSCRIPTION"
Packages poison repos, and repos publish packages. / It's a supply chain with a subscription plan. [J] //
# chapter: The empty file
# pic: big file card ".github/init.js" "13.7 MB"; a GitHub search magnifier bounces off it; chip "NOT INDEXED"
Now the clever part, and it isn't clever code. It's a big file. //
# pic: sd-source card (GitHub Docs: About code search) "Empty files and files over 350 KiB are excluded" highlighted
GitHub's own docs say code search skips files over three hundred fifty kibibytes. / This one was about forty times bigger. [J] //
# pic: sd-source card (GitHub Docs: repository contents) "the content field will be an empty string" highlighted; chip `"content": ""`
And for files over one megabyte, the contents A P I, in one of its formats, / hands back the content field as an empty string. //
# pic: a counter "26 REPOS" with the hooks found; the init.js card shows "0 B?"; then JFrog quote card "That conclusion was wrong."
So JFrog's first sweep found the hooks in twenty-six repos, pointing at scripts that looked empty. / In JFrog's own words: that conclusion was wrong. [J] //
# pic: a git tree doodle being walked node by node; the counter rolls 26 → 42
Then they stopped searching and read the git trees directly, file by file, / and the count went to forty-two. //
# pic: running analogy: an airport X-ray belt; a normal bag goes through; a giant suitcase is waved around the machine; chip "TOO BIG TO SCAN"
Think of an airport scanner that waves through any suitcase too big to fit in the machine. / You don't need to hide anything. You just need a bigger suitcase. [J] //
# pic: Mahapatra quote card "read the documentation for your detection tooling and padded the file past its limits" highlighted
Or as Mahapatra put it, the attacker read the documentation for your detection tooling / and padded the file past its limits. //
# pic: ten file cards fan out with different sizes 12.9 … 13.7 MB; they all funnel into one small box "SAME 2 MB PAYLOAD"
JFrog found ten different versions of that file, from twelve point nine to thirteen point seven megabytes, / and unpacked, all ten were the same two megabyte payload. //
# pic: lime chip "WE RAN IT"; dev-terminal with lab/log.txt: git ls-tree -r -l HEAD showing 13729714 .github/init.js; hand points at the size
Here's the boring tool that sees it. We made a throwaway repo with a dummy file the same size, / and git ls-tree printed thirteen point seven million bytes in one line. //
Search can skip a file. Git can't. //
# chapter: Shy in sandboxes
# pic: a compiled add-on box "addon.node" with a padlocked note ".napi_cache"; chip "NEWEST BUILD"
The newest npm builds went further. They hide the loader in a compiled add-on, / and it checks where it's running before it does anything. //
# pic: four small rooms: CI RUNNER, CONTAINER, TINY VM, DEBUGGER, each with the Bug asleep (zzz); then a laptop room where the Bug is wide awake
Inside a C I runner, a container, a tiny virtual machine, or under a debugger, it quietly does nothing. / On a real laptop, it wakes up. //
# gag: the Bug in the sandbox room wears a "VISITOR" badge and a halo
It's shy around scanners and very outgoing on laptops. [J] //
# pic: a "REVOKE TOKEN" button with a pink warning card "HOME FOLDER WIPED"; chip "CLEAN UP FIRST, THEN REVOKE"
And if you find it and revoke the stolen token, The Register says it can wipe your home directory. It takes being revoked personally. / So the cleanup guides give an order: remove its persistence first, then revoke. [J] //
# chapter: What it means
# pic: Dev's "wait…" face; GitHub logo with a lime chip "NOT BREACHED"
But here's the part the scary headlines skip. / GitHub itself wasn't breached, and these hooks aren't bugs. //
# pic: sd-source card (InfoWorld) Frank Dickson: "these hooks are features, not flaws. The root cause here is stolen credentials" highlighted
Analyst Frank Dickson put it fairly: these hooks are features, not flaws. / The root cause here is stolen credentials, not the A I tools. //
# pic: a question-mark laptop counter "? LAPTOPS"; sd-source heise "It's unclear how many computers ran the malware"
And nobody knows yet how many laptops opened one of these repos. / Heise reports it's unclear how many computers ran the malware. //
# pic: two chips side by side: old "DANGER = INSTALL" crossed out, new "DANGER = OPEN" in pink
What changed is the moment of danger. / It used to be when you installed something. Now it's when you open it. //
# chapter: Three checks
# pic: sd-counter 1/3; VS Code logo; a trust dialog doodle with the button "No, I don't trust the authors" highlighted lime
So, three checks before you open the next stranger's repo. / One: if you don't know a repo, don't trust it yet. //
# pic: sd-source card (VS Code docs) "When in doubt, leave a folder in Restricted Mode." highlighted
VS Code's own docs say, when in doubt, leave a folder in Restricted Mode, / and that also turns agents off in that workspace. / Give every coding agent's trust prompt the same answer. //
# pic: sd-counter 2/3; a plain file viewer listing .claude/, .gemini/, .cursor/, .vscode/, .github/ with sizes; the 13.7 MB row glows pink
Two: look in the dot folders first, in a plain file viewer. / Dot claude, dot gemini, dot cursor, dot vscode, and dot github. //
# gag: a tiny config file next to a skyscraper-sized script; Dev squints
If a script in there is thirteen megabytes, / it is not setting up your linter. [J] //
# pic: sd-counter 3/3; a git tree with a magnifier "READ THE TREE"; a token card with a timer "EXPIRES 1H" and a scope tag "ONE REPO"
Three: if you own repos, don't audit with search alone. Read the tree. / And keep tokens scoped and short-lived. Every one of these started with a stolen token. //
# pic: JFrog card "treat… as a host compromise"; chip "ROTATE EVERYTHING (IN ORDER)"
If you think you opened one, JFrog says treat it as a compromised machine, / and rotate every credential on it, in the right order. //
# pic: callback: the cold-open file card ".github/init.js 13.7 MB" and the search box "EMPTY"; the EMPTY label slides over onto the search box itself
GitHub's search said that file was empty. / It was thirteen megabytes. The only thing empty was the search result. [J] //
# pic: sd-sting
That's the stack, doodled. See you in the next commit.
