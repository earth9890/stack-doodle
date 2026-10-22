# format: Patch Notes
# topic: PHP2Shell, two critical PHP flaws disclosed 21 Oct 2026, found with AI help (date checked 2026-10-22)
# engine: mission
# want: Dev, who runs a PHP site, wants to be safe by tonight
# obstacle: the flaws sit inside PHP itself, so no app update fixes them, and the AI that found them can help attackers too
# stakes: a stranger runs code on the server with no password, or the site has to go dark like the UK government pages did
# question: what are these two bugs, and what exactly must Dev run today?
# change: Dev goes from "PHP is PHP" to checking the runtime version and restarting the workers
# beat: AND Two PHP bugs can give a stranger code execution, PHP runs about seventy percent of websites, AI helped find them
# beat: BUT the flaws live in PHP itself, not in anyone's app, so what exactly broke?
# beat: THEREFORE the kitchen picture: a half-made order trusted by cleanup, and a stale sticky note a stranger rewrites
# beat: THEREFORE AI-assisted researchers proved it this summer, and OpenAI itself says the same tools help attackers
# beat: BUT a four-day-early attempt, millions of attempts, and thirty-two UK services offline, with no confirmed break-in
# beat: THEREFORE today check the version, update to the fixed release, restart the workers
# promise: 1) what broke 2) who found it (and the AI catch) 3) what to run today
# chapter: (trial, no chapters)

# pic: Dev at his laptop; a big "70%" stamp lands on a doodle globe; PHP logo top-left; EMERGENCY PATCH chip
The language behind seventy percent of the web just shipped an emergency patch. /
# pic: a hooded stranger strolls past a password box that never opens (chip NO PASSWORD); the Bot pops up with a magnifying glass on a bug
Two bugs let a stranger run code on your server with no password, / and the people who found them had an AI sidekick. [J] //
# pic: chip PHP2SHELL; three numbered chips 1 WHAT BROKE 2 WHO FOUND IT 3 WHAT TO RUN; PATCH NOTES badge with the date
This is P H P two Shell. / So what broke, who found it, and what do you run today? //
# pic: a doodle kitchen, one counter, orders sliding through; the counter overflows mid-order; cleanup wipes around a half-made dish and serves it
Picture P H P as a kitchen. Bug one: it runs out of memory mid-order, / and cleanup trusts the half-made mess. /
# pic: a sticky note on an empty shelf; the stranger rewrites it; then the stranger in a chef hat on Dev's counter
Bug two: a stale sticky note survives a cleared shelf, and a stranger gets to write it. / Now he's cooking on your counter. [J] //
# pic: CALIF chip + OpenAI text chip; WIZ chip + Gemini logo (Wiz used Google's and OpenAI's models); two magnifying glasses meet on the same bug
Calif found it using OpenAI's model, and then Wiz found it again on its own. / The most expensive second opinion ever. [J] //
# pic: quote card, OpenAI line highlighted "the same capabilities can also help attackers"; calendar Oct 17 circled pink vs FIX on Oct 21
But OpenAI itself warns these tools can help attackers too, / and Amazon spotted an attack attempt four days before the fix. //
# pic: UK map doodle with a big 32; Dev carries a whole server rack out of the door
The U K took thirty-two government services offline, / because the safest server is the one that's switched off. [J] //
# pic: terminal "php -v"; version chips 8.5.12 8.4.27 8.3.36 8.2.35 pop; RESTART chip; small chip ON A DISTRO? CHECK THE PACKAGE (Ubuntu keeps the old number, e.g. 8.3.6-0ubuntu0.24.04.13); WordPress logo + chip NOT ENOUGH
So run P H P dash v, update to your branch's newest patch, and restart P H P F P M. / Updating WordPress alone will not fix it. //
# pic: the kitchen again, clean counter; sd-sting
That's the stack, doodled. See you in the next commit.
