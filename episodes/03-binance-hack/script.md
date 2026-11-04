# format: Postmortem
# topic: Binance hot-wallet theft, Oct 29 2026 (~$6.34B per Binance; FBI: North Korea / TraderTraitor); Binance initial report Nov 3 (date checked 2026-11-04)
# engine: heist
# want: Dev wants to know how a fake job interview turned into the biggest crypto theft ever, and why Binance couldn't just press stop
# obstacle: a patient state-level campaign that spent five months walking from one laptop to the wallet signing service
# stakes: six point three four billion dollars of other people's coins, and the trust in the world's biggest exchange
# question: how does a take-home assignment become six billion dollars, and why didn't pausing withdrawals stop it?
# change: Dev learns the attack was a chain of normal developer habits, and leaves with four rules for his own machine
# beat: AND an exchange pays withdrawals from hot wallets whose key is split by M P C, so no single key exists to steal
# beat: BUT in June a tampered Homebrew download exposed who works on the wallet team
# beat: THEREFORE in September one of them got a fake job, a fake CEO and a real assignment that swapped pyenv
# beat: THEREFORE on October twentieth an internal AI tool became a springboard to a container deploy token
# beat: THEREFORE on October twenty-ninth one script reached the signing service and the wallets started paying the attackers
# beat: BUT pausing withdrawals didn't stop it, because an E I P seventy-seven oh two delegation acts outside the withdrawal path
# beat: AND the M P C design meant there was no single key to revoke it quickly, so it ran for nearly four hours
# beat: THEREFORE Binance ate the loss, the F B I named North Korea, and the rest of us get four rules
# promise: 1) how a fake job became a foothold 2) why the stop button didn't work 3) what never to do on your work laptop
# punch: assignment, Four, either, assignment

# pic: Dev on a video call with a smiling "HIRING!" tile; a folder "assignment/" slides in; a vault behind him with the Binance logo
# gag: Dev cracks his knuckles, proud, while the vault door behind him creaks open
The biggest crypto theft in history started with something you've probably done this year: a take-home coding assignment. [J] //
# pic: big chip "$6.34B" slides up; sd-source card (Binance report) with the line highlighted; FBI text chip "NORTH KOREA (FBI)"
Binance says six point three four billion dollars in crypto left its wallets on October twenty-ninth, / and the F B I says North Korea did it. //
# pic: two stacked cards: lime "LUCKILY: $2.85B FROZEN", pink "UNLUCKILY: ~$3.5B NOT"
Luckily, Binance says it froze about two point eight five billion dollars of it. / Unluckily, that is the smaller half. [J] //
# pic: three numbered chips: 1 THE FAKE JOB, 2 THE STOP BUTTON, 3 YOUR LAPTOP; sd-badge POSTMORTEM
So how does a fake job become a six billion dollar heist, / why couldn't the world's biggest exchange just press stop, / and what should you never do on your work laptop? //
# chapter: The rules
# pic: doodle: cold vault (snowflake) vs hot wallet (flame, plugged into the internet) paying a withdrawal queue
A hot wallet is the internet-connected wallet an exchange uses to pay out your withdrawals fast. //
# pic: one key shatters into three glowing shares on three servers; chip "M P C"; chip "THE KEY NEVER EXISTS IN ONE PLACE"
Binance's hot wallets use M P C, multi-party computation. / The key is split into shares on separate machines, and the whole key never exists in one place. //
# pic: Dev nods, impressed; chip "NOTHING TO STEAL"
That's good security, because nobody can steal a key that doesn't exist. / Remember that sentence, it's coming back. //
# chapter: Five months of patience
# pic: calendar JUNE; a laptop with a search page; the top result has an "Ad" tag; Homebrew logo with a pink "TAMPERED" sticker
The attack didn't start in October. It started in June. / A wallet DevOps engineer searched for a popular AI coding tool. / The Homebrew download they installed was tampered with, and Reuters says it came from a search ad. //
# pic: Binance shield catches it: laptop swapped, key icon rotated ✓; then a sticky note peels off with "WALLET TEAM: A, B, C…"
Binance caught it, replaced the laptop and rotated the credentials. / But the attackers had already learned who worked on the wallet team. //
# pic: escalation ladder doodle on the left, rung 1 lit "A LIST OF NAMES"
Rung one of the ladder: a list of names. //
# pic: calendar SEPTEMBER; a job-site message card "Project Director, exciting role!"; a video tile "HR" with a photo-album sticker
In September, Software Engineer B got a message on a real job platform / from a project director at a company that didn't exist. //
# pic: HR video tile with a fake social profile full of holiday photos; then a chat-app window "CEO"
First, an H R video interview, with a social profile full of personal photos to build trust. / Then a second interview, in a chat app, with the company's CEO. //
# pic: the CEO tile flips to a cardboard cut-out labelled "FAKE"; chip "ALSO FAKE"
The CEO was also fake, which honestly makes it the most realistic startup in the story. [J] //
# pic: the folder "assignment/" lands on a laptop labelled WORK; a setup progress bar; a tiny Bug hides in the bar
Then came the assignment: download this repo to your work computer, and set it up. //
# pic: sd-source card (Binance report): "0-day not detected by endpoint tools" highlighted; an endpoint shield doodle asleep
Setup ran the malicious code. Binance says it was a zero-day that its endpoint security didn't catch. //
# pic: terminal pane: `which pyenv` → /opt/homebrew/bin/pyenv, then the Cellar path; pyenv chip; Python logo
And here's the quiet part. It replaced pyenv, the tool that picks your Python version, / with a malicious copy sitting at the exact same path inside the Homebrew folder. //
# pic: split terminal BEFORE / AFTER: identical path lines, the AFTER binary has a pink Bug face; chip "SAME PATH"
Same name. Same command. Same folder. / The only thing that changed was everything. [J] //
# pic: Dev types "pyenv" happily; a second, hidden wire runs from the laptop out to a pink cloud
Every time the engineer used pyenv, it worked perfectly, / and according to Bitcoin Magazine, it also opened a line to the attackers. //
# pic: ladder rung 2 lit "A LAPTOP INSIDE"
Rung two: a laptop inside Binance. //
# pic: calendar OCT 20; an internal tool panel "INTERNAL AI TOOL" as a springboard; the Bug bounces off it onto two laptops "A" and "C"
On October twentieth, the attackers used an internal AI tool as a springboard, / and took control of two wallet engineers' computers, A and C. //
# pic: on laptop A a glowing token card "CONTAINER DEPLOY TOKEN"; chip "A PASSWORD FOR ROBOTS"
On Engineer A's machine, they found a container deployment token. / A token is a password for robots, and this one could deploy containers inside Binance. //
# gag: the AI tool panel wears a little tour-guide hat with a flag
So yes, an AI tool was involved. / Not to write the attack. To give the attackers a tour of the building. [J] //
# pic: ladder rung 3 lit "A ROBOT PASSWORD"
Rung three: a password for robots. //
# chapter: The drain
# pic: calendar OCT 29, clock 17:15; laptop C; token A plugs in; a container box drops in; a script scroll "run.sh" unrolls
October twenty-ninth, a little after five p.m. U T C. They logged on to Engineer C's computer. / Then they used A's stolen token, deployed a container, and ran one script. //
# pic: diagram: container → "WALLET SIGNING SERVICE" (a big rubber stamp "YES") → hot wallets; chip "OUTSIDE THE WITHDRAWAL PROCESS"
That script reached the wallet signing service, the machine that says yes to transactions. / Now Binance's own wallets would sign whatever the attackers asked. //
# pic: ladder rung 4 lit "THE SIGNING SERVICE"; clock 20:05 → 20:09; XRP logo + chip "233.46M XRP" slides up
At twenty oh five U T C, five hot wallets sent two hundred thirty-three million X R P out. / Four minutes. That's faster than most of us get a pull request approved. [J] //
# pic: Solana and Optimism logos with chips "~970,500 SOL", "44.2M OP"; then Bitcoin logo + "18,270 BTC" stacks bigger
Then Solana and Optimism wallets sent about nine hundred seventy thousand SOL and forty-four million O P, / and then a Binance wallet sent eighteen thousand two hundred seventy bitcoin. //
# pic: an alarm light doodle (soft glow, no flashing) "LARGE TRANSFERS"; a big "WITHDRAWALS PAUSED" barrier slides down
Binance got an internal alert for large transfers and paused withdrawals, / which should have been the end of the story. //
# chapter: Why stop didn't work
# pic: Ethereum logo; chip "EIP-7702"; sd-source card (eips.ethereum.org) with the delegation line highlighted
But on Ethereum the attackers had one more trick, a feature called E I P seventy-seven oh two. //
# pic: a normal wallet hands a glowing "execution rights" ribbon to a smart-contract box; its key stays in its pocket
It lets a normal wallet hand its execution rights to a smart contract without giving away its key. / It was built for nice things, like batching payments or letting an app pay your fees. //
# pic: running analogy: a paper "POWER OF ATTORNEY" document with a wax seal; the wallet signs it, a contract-bot holds it
Think of it as a power of attorney. / The account still belongs to you, but someone you named can now act for it. //
# pic: counter tally "50 SIGNING TXS" ticks up; three power-of-attorney papers stack up, each signed for the attacker contract
Through the signing service, the attackers made about fifty signing transactions / and set up delegations to a contract they controlled. / The wallet signed every single one, because signing is its whole job. [J] //
# pic: bank front counter with a "CLOSED" sign (= withdrawals paused); the contract-bot walks past it waving the power of attorney
Pausing withdrawals closed the bank's front counter. / But a power of attorney doesn't go through the counter. [J] //
# pic: to cancel: a new paper "REVOKE" needs a signature; the three MPC shares on three servers each look at each other; chip "SPECIAL PROCEDURE"
To cancel it, the wallet has to sign a new authorization. / And this is where M P C bites, because there's no single key to grab. / Binance says it needed a special procedure, while the clock kept running. //
# pic: callback: the Dev "NOTHING TO STEAL" chip from the rules scene returns, a second chip appears under it
Nobody can steal a key that doesn't exist. / Nobody can quickly use one either. [J] //
# pic: clock 23:56, Ethereum logo + chip "2,961.9 ETH (LAST)"; clock 00:10, the power of attorney is torn, "→ 0x0000…"; chip "~4 HOURS"
The last unauthorized transfer, about two thousand nine hundred sixty E T H, finalized at eleven fifty-six p.m. / At ten past midnight, a new authorization pointed the delegation at the zero address, and the door finally closed. //
# chapter: The bill
# pic: sd-source card (FBI statement via AP/Security Affairs) "TraderTraitor"; chip "SAME AS BYBIT 2025"; chip "NORTH KOREA DENIES IT"
The F B I named the group TraderTraitor. / That's the same name it gave the one point five billion dollar Bybit hack in twenty twenty-five. / North Korea calls the accusation absurd. //
# pic: Binance logo; chip "BINANCE COVERS IT"; progress bar "98% REPLENISHED"
Binance says it's covering the loss itself, / and that ninety-eight percent of the affected tokens are already replenished. //
# pic: four Bybit-sized money bags line up next to one giant "$6.34B" bag; chip "≈ 4 BYBITS"
So users aren't out of pocket, according to Binance. / The exchange just lost about four Bybits. [J] //
# pic: a respectful card: shield with "57 BLOCKED IN 2026"; chip "STATE-LEVEL CAMPAIGN"; sd-source (Teng quote) "a campaign built over many months"
And before anyone dunks on the engineers: this was a state-level campaign, / and Binance says it blocked fifty-seven others like it this year. The attackers only needed one. //
# chapter: Four rules
# pic: sd-counter 1/4; laptop WORK with a "NO" sign over an "assignment/" folder; a separate throwaway VM box with a smiley
So, four rules for the rest of us. / One: never run an interview assignment on your work machine. Use a throwaway V M or a spare computer. //
# pic: sd-counter 2/4; search page with "Ad" crossed out, an "official site" bookmark ticked; Homebrew logo + checksum chip
Two: install tools from the official site, not the top search ad, / and check where an install script came from before you run it. //
# pic: sd-counter 3/4; a token card with a little timer "EXPIRES 1H" and a scope tag "THIS ONE REPO"
Three: tokens should be scoped and short-lived. / A token that can reach the wallets should expire before lunch. [J] //
# pic: sd-counter 4/4; a hot wallet with a doorbell/pager: "NEW 7702 DELEGATION → PAGE SOMEONE"
Four: if you run wallets on Ethereum, watch for delegations. / A new E I P seventy-seven oh two authorization on a hot wallet should wake someone up. //
# pic: callback: the cold-open video call, tiles flip: HR "FAKE", CEO "FAKE", JOB "FAKE"; the folder "assignment/" glows "REAL"
The recruiter was fake, the CEO was fake, the job was fake. / The only real thing in the whole hiring process was the assignment. [J] //
# pic: sd-sting
That's the stack, doodled. See you in the next commit.
