# format: Postmortem
# topic: eMudhra CA weak private keys (8 intermediates; one key = 4), reported 17 Oct 2026; blocked by browsers; eMudhra's defence; stock fall (date checked 2026-10-22)
# engine: rise-and-fall
# want: Dev wants to know if the padlock in his browser still means anything
# obstacle: the company that vouches for websites had master keys anyone could guess, for well over a year
# stakes: anyone holding those keys could make a fake site look genuine to browsers and apps
# question: how does a certificate authority end up with a secret key that is the number four, and what did it cost?
# change: Dev learns the padlock held because browsers acted in hours, and that the real fix is updating his own software
# beat: AND a certificate authority is the internet's notary; its private key is the master stamp
# beat: BUT eMudhra's stamp was the number four, and seven more keys were almost as small
# beat: THEREFORE anyone could have made trusted certificates for any website since April twenty twenty-five
# beat: BUT a researcher scanning public data spotted it and signed a warning with their own key
# beat: THEREFORE Mozilla, Google, Apple and Microsoft blocked the certificates within days
# beat: BUT eMudhra pointed to its audits and blamed social media amplification
# beat: THEREFORE the market answered: two twenty percent lower circuits in two days, and an exit from the business
# beat: BUT revocation alone doesn't reach old software, so the last fix is on your own machine
# promise: 1) what a certificate key is and why "four" is a problem 2) how it was caught and blocked 3) the defence, the crash, and what you must update
# chapter: (short video, no chapters)

# pic: Dev at his laptop; a giant doodle padlock in the address bar; a notary stamp with "4" on it slams down
# gag: Dev counts on his fingers, gets to four, freezes
The company whose job is proving websites are real had a secret key, / and the key was the number four. [J] //
# pic: chip "NOT FOUR DIGITS"; chip "FOUR" in pink
Not four digits. Four. Just the number you get by counting your fingers and stopping early. [J] //
# pic: three numbered chips: 1 THE KEY, 2 CAUGHT, 3 THE FALLOUT; sd-badge POSTMORTEM
So how does a certificate authority end up guarding the internet with a four? Let's open it up. //
# chapter: The notary
# pic: doodle: browser → padlock → certificate card signed by a stamp; chip CERTIFICATE AUTHORITY
When your browser shows a padlock, it trusts a certificate, / and that certificate is signed by a company called a certificate authority. //
# pic: the stamp grows huge; chip PRIVATE KEY = THE STAMP
That company's private key is the master stamp. / Whoever holds it can sign a certificate for any website, and your browser will believe it. //
# pic: bank, email and payment page doodles each get a padlock from the stamp
It's how your bank, your email and every payment page prove they're really them. //
# pic: chip "a random 384-bit number"; a long scroll of digits unrolls off screen; chip "~10^115 POSSIBILITIES"
A proper key is a random three hundred eighty-four bit number, / with roughly a one followed by a hundred and fifteen zeros possible values. //
# pic: eMudhra text chip; sd-source card (The Register) with "is the number 4" highlighted; chips 4, 56, 115, 237
e-Mudhra, an Indian certificate authority trusted by every major browser, / had eight of those keys. One was four. Others were fifty-six, one hundred fifteen, two hundred thirty-seven. [J] //
# pic: Dev's face: the "wait…" look
You could brute force that with a calculator from a cereal box. [J] //
# chapter: How it happened
# pic: calendar April 30 2025; a vault-like hardware box chip HSM; a conveyor with two trays, strong keys and tiny keys; the tiny tray slides toward a browser
According to e-Mudhra, the keys were made at a ceremony on April thirtieth, twenty twenty-five, using high-end hardware security modules. //
# pic: sd-source card from eMudhra's statement: "produce a second set of weak keys alongside the original strong keys" highlighted
A flaw in one step quietly produced a second set of weak keys, / and the weak ones were the ones sent to the browsers. //
# pic: timeline bar: MID 2025 → OCT 2026, label "WELL OVER A YEAR"
Those certificates sat in browser trust lists for well over a year. //
# chapter: Caught
# pic: a hooded researcher doodle labelled "WAYNE" scanning a wall of public certificates with a flashlight; a tiny "4" glints
On October seventeenth, a researcher called Wayne was scanning public certificate data, / and the numbers just jumped out. //
# pic: a note card "We have a problem here – Wayne", signed with a stamp labelled eMudhra
To prove it, he signed a warning message with one of e-Mudhra's own keys. / Like finding a bank's master stamp on the pavement and stamping a note that says, you dropped this. [J] //
# pic: sd-source card (Scott Helme) with "curl, Python, Node, Go, Java" chips popping; chip FORGED CERT ACCEPTED
Researcher Scott Helme showed what that meant: / a forged certificate for a real payments site was accepted by curl, Python, Node, Go and Java. //
# pic: logos: Firefox (Mozilla), Chrome, Apple, Microsoft (text chips if missing) slam a BLOCKED stamp one by one; clock chip "~3 HOURS"
Then the internet did something fast for once. / Mozilla had a block within about three hours, Chrome the same day, Apple on the nineteenth, Microsoft on the twentieth. //
# pic: sd-source card (eMudhra): "revoked within 14 hours"; chip NO MISUSE FOUND (company says)
e-Mudhra revoked the eight certificates and says they never issued certificates to real websites or users. //
# chapter: The defence
# pic: sd-source card with "independent audits for two years in a row" highlighted; the Suit holding two gold stars
Then came the statement. The company pointed out it had passed independent audits two years in a row. //
# gag: a vault door, inspected twice, with the combination "4" taped to it
Which is like a vault passing two inspections with the combination taped to the door. [J] //
# pic: sd-source card: "the level of social media amplification around this incident has brought scrutiny that is out of proportion" highlighted
It also said social media amplification brought scrutiny out of proportion, / since website certificates are about one percent of its revenue. //
# pic: chip "SOCIAL MEDIA"; chip "THE NUMBER 4"; a balance scale tips hard toward 4
To be fair to social media, / it was mostly just repeating the number four. [J] //
# chapter: The fallout
# pic: doodle stock chart: ₹539 → ₹431.55 (Oct 21, -20 %) → ₹345.25 (Oct 22, -20 %); LOWER CIRCUIT stamps x2; chip "-36 % IN 2 DAYS"
The market had its own review. / The stock hit the twenty percent lower circuit on October twenty-first, and again the next day, about thirty-six percent down in two days. //
# pic: chip EXITING TLS BUSINESS; MeitY text chip + sd-source "very limited and for a very short interval"; chip "FEAR-MONGERING" (quote, attributed)
e-Mudhra is now leaving the website certificate business, / and India's IT ministry set up a special team, calling the impact on Indian websites very limited. //
# chapter: The part that's on you
# pic: a revoked certificate list arrives at a modern laptop (✓) and bounces off an old app (✗); sd-source (Helme) "doesn't help them at all"
Here's the catch. Revoking a certificate only works for software that checks, and plenty of older apps never do. //
# pic: terminal-style checklist: update browser · update OS · update Go / Node / Python certs; Go 1.27.3 / 1.26.10 chips
So update your browser and your operating system, / and if you ship code, update your runtimes and certificate bundles too. //
# pic: back to the cold-open stamp; the "4" stamp is now in a museum case labelled "PLEASE USE RANDOM NUMBERS"
The padlock survived because browsers moved in hours, / and the lesson cost one company a lot more than four rupees. [J] //
# pic: sd-sting
That's the stack, doodled. See you in the next commit.
