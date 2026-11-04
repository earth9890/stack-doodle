# format: Patch Notes
# topic: Google turns AI off by default for K-12 student accounts, and Google Search goes off with it (announced Tue Nov 3 2026; date checked 2026-11-04)
# engine: ultimatum
# want: Dev, who runs the school's laptops, wants students to keep Google Search without the AI on top
# obstacle: Google now counts Search itself as one of its AI products, with no AI-free mode
# stakes: a hundred and fifty million Classroom users, and the research tool every student reaches for first
# question: is Google Search without AI really impossible, or just not on the menu?
# change: Dev learns it's a product decision, that Google already built a no-AI view once, and what to check before twenty twenty-seven
# beat: AND in August Google switched its chatbot on by default inside Classroom
# beat: BUT school leaders pushed back, and New York City and Los Angeles restricted student AI in September
# beat: THEREFORE on Tuesday Google made every AI product off by default for K-12 students
# beat: BUT Google Search is on that list, because Google says Search and AI are deeply integrated
# beat: THEREFORE a school that says no to AI gets no Search, just a message
# beat: AND turning Search on means picking one of two kinds of AI, with no plain-links option
# beat: BUT in twenty twenty-four Google itself shipped a Web filter that hides AI Overviews
# beat: THEREFORE AI-free Search is a choice Google didn't offer, and critics call it a monopoly move
# beat: THEREFORE schools get a checklist, and Los Angeles gets the opposite of its wish
# promise: 1) what Google actually changed 2) is Search without AI really impossible 3) what a school, or you, can do
# punch: switch, verb, same, power, homework, More, message

# pic: Dev at a school desk with a Chromebook; search box "photosynthesis"; the page swaps to a grey card "NOT AVAILABLE — message from your school"
# gag: Dev holds a giant toggle labelled AI OFF; when he flips it, the Google logo on the laptop also switches off with a little "click"
Google just told schools they can finally switch its AI off. / The catch? That same switch turns off Google Search for your students. [J] //
# pic: sd-source card (blog.google, Chris Phillips) with "entirely off for K-12 student accounts" highlighted; four product chips pop: GEMINI, NOTEBOOK, CLASSROOM, SEARCH
On Tuesday, Google named four products: Gemini, Gemini Notebook, Gemini in Classroom, and Google Search. / All four will be entirely off for K through twelve student accounts, until a school admin turns them on. //
# pic: the SEARCH chip grows; a dictionary card "google (verb)" slides in next to it
One of those four is a search engine most people use as a verb. [J] //
# pic: big chip "150M" slides up; Classroom logo; chip "STUDENTS + TEACHERS (GOOGLE'S NUMBER)"
Google says a hundred and fifty million students and teachers use Classroom. / That's a lot of people about to meet one toggle. [J] //
# pic: sd-source card (NYT via Inquirer): Phillips quote highlighted "Search and AI are deeply integrated"; the "NOT AVAILABLE" card returns small
Google's education boss, Chris Phillips, told The New York Times that Search and AI are deeply integrated. / So a school that says no to AI gets no Search, just a message saying it's not available. //
# pic: two stacked cards: lime "GOOD NEWS: AN OFF SWITCH", pink "BAD NEWS: ONE SWITCH"
The good news is that schools finally get an off switch for AI. / The bad news is that it's the same switch. [J] //
# pic: three numbered chips: 1 WHAT CHANGED, 2 IMPOSSIBLE?, 3 WHAT TO DO; sd-badge PATCH NOTES NOV 4
So what exactly did Google change, / is Search without AI really impossible, / and what can a school, or you, do about it? //
This is Patch Notes for Wednesday, November fourth. //
# chapter: How we got here
# pic: escalation ladder on the left; rung 1 lit "AUGUST: CHATBOT ON"; Classroom logo; a toggle flips ON by itself
Rung one, August. Google switched its Gemini chatbot on by default inside Classroom, / for schools that already let students use Gemini. //
# pic: chip "UNTIL AUGUST: 18+ ONLY"; Dev's face swaps to "worried"; a homework app window with a surprise chatbot bubble "HI! :)"
Until then, the A P says, Gemini could only be turned on for students eighteen and older. / School leaders were not thrilled to find a new chatbot inside the homework app. [J] //
# pic: rung 2 lit "SEPTEMBER: NYC + LA"; two city chips; a "PAUSED" sign on an AI bubble
Rung two, September. New York City and Los Angeles are the two biggest school districts in the country. / Both put temporary bans on generative AI in elementary and middle schools. //
# pic: a wish bubble from a "LOS ANGELES" chip: Google search box with "AI OVERVIEWS: OFF"; a little pin icon "REMEMBER THIS"
Los Angeles officials said they hoped students could still use Google Search with the AI Overviews turned off. / Keep that wish in your pocket. //
# pic: rung 3 lit "LAST WEEK: LAWMAKERS"; a state law scroll "NY CHATBOT SAFETY LAW"; a letter with a calendar "NOV 2" deadline
Rung three, the last couple of weeks. New York State passed a chatbot safety law for minors. / Two U S senators sent Google's C E O questions about kids and AI. / They set a deadline of November second. //
# pic: rung 4 lit "TUESDAY: THE SWITCH"; a gift box labelled "CONTROL" opens to reveal one big switch
Rung four, Tuesday. Google gave everyone exactly what they asked for. Technically. [J] //
# chapter: What actually changed
# pic: admin console mock (Google Admin style, generic): four rows with toggles GEMINI / NOTEBOOK / CLASSROOM AI / SEARCH, all OFF; chip "EARLY 2027"
Here's the new setup. For K through twelve student accounts, those four products start switched off. / The details arrive over the coming months. //
# pic: a hand flips the GEMINI toggle while SEARCH stays OFF; sd-source (Engadget) "not an all-or-nothing deal" highlighted
An admin turns each one on, and Google told Engadget the toggles are separate, not all or nothing. //
# pic: Dev flips SEARCH to ON; a dropdown slides down from it with two options
So you can leave the chatbot off and turn Search back on. / But Search no longer comes without AI. //
# pic: two menu cards: "1 REGULAR: AI OVERVIEWS + AI CHAT" with a home icon; "2 GUIDED LEARNING: TUTOR MODE" with a coach whistle
Flavor one is regular Google with AI Overviews and AI chat, like at home. / Flavor two is Guided Learning, a tutor mode that's supposed to coach students instead of handing them the answer. //
# pic: an empty third menu slot "3 PLAIN LINKS" with a pink strike; sd-source (WSJ via Quartz) "no setting… switches off Search's AI features"
There is no flavor three called plain links. / The Wall Street Journal reports there's no setting that turns off only the AI part of Search. //
# pic: running analogy: a doodle TV with an ad banner; a remote with one button labelled POWER; chip "MUTE ADS = POWER OFF"
It's like a TV where the only way to mute the ads is the power button. [J] //
# pic: dev-code pane (labelled "OUR DOODLE, NOT GOOGLE'S CODE"): a policy object, line `if (!policy.ai) policy.search = false;` highlighted; sd-hand on it
If you've ever written feature flags, you know this pattern, / one flag quietly controlling two features. / Usually that's a bug. Here, it's the policy. [J] //
# chapter: The tutor
# pic: sd-source (blog.google) "measurable learning gains" highlighted; pink chip VENDOR NUMBERS
Now, the tutor. Google says its research shows Guided Learning leads to measurable learning gains. / Bloomberg notes the post didn't cite any independent evaluations. //
# pic: Dev at the laptop types "AP history essay prompt"; the screen fills with a long essay doodle; chip "NYT REPORTER'S TEST"
And the consumer version is already out. / In a New York Times reporter's test, it wrote a detailed essay for an Advanced Placement history prompt. //
# pic: the coach-whistle tutor doodle holds the finished essay; Dev's face swaps to "smug"
So the tutor built to stop homework shortcuts did the homework. [J] //
# pic: lime chip "SCHOOL VERSION: PILOT"; a transcript scroll with a teacher's eye icon; chip "TEACHERS SEE TRANSCRIPTS"
To be fair, Google says the school version, now in pilot, has more limits. / Teachers will be able to read the chat transcripts. //
# pic: Classroom logo + chip "LIVE WORLDWIDE NOV 3"; Search box + chip "PILOT: SOME U.S. SCHOOLS, NOV"
Guided Learning went live in Google Classroom worldwide on Tuesday. / The Search version starts as a pilot in some U S schools this month. //
# chapter: Is it impossible?
# pic: the Phillips quote card returns: "deeply integrated"; Dev's "thinking" face
Now the big claim, that Search and AI are too integrated to pull apart. //
# pic: sd-year "2024" stamp; sd-source (@searchliaison, May 14 2024) "a new 'Web' filter that shows only text-based links" highlighted
Here's the part the announcement skips. / In May twenty twenty-four, Google itself shipped a Web filter that shows only text links. //
# pic: sd-source (The Verge, Google spokesperson) "they will not appear when someone uses the web filter" highlighted
And a Google spokesperson told The Verge that AI Overviews don't appear when you use that filter. //
# pic: a search results bar: ALL, IMAGES, VIDEOS, MORE ▾; the WEB button hides inside the MORE dropdown; sd-hand points at it
So Google has already built a results page without AI Overviews. / It gave it a button, and then often tucked the button under More. [J] //
# pic: sd-source (Ars Technica) "Google could make a version of search for schools that doesn't have AI tools, but it's not doing that" highlighted
Whether that filter could work for schools, Google hasn't said. / Ars Technica put it plainly. Google could make a school version of Search without AI tools, but it's not doing that. //
# pic: three critic name chips slide in one by one with short quote cards: LINA KHAN "coerce", MAYOR MAMDANI "monopoly power", FAIRPLAY "backfire"
Critics went further. Former F T C chair Lina Khan said Google is using its search monopoly to coerce schools into adopting AI. //
New York City's mayor, Zohran Mamdani, accused Google of using its monopoly power to force AI into public schools. //
# pic: Fairplay chip; a compass doodle "OTHER SEARCH ENGINES"
Fairplay's Josh Golin told schools to switch off Google's AI the minute they can. / He also told them to find other ways to search. //
# pic: back to the gift box "CONTROL" with the one switch; Google's quote card "control and confidence… as they see fit"
Google says its goal is to give school leaders the control and confidence to use AI as they see fit. / The control just comes with one extra wire. [J] //
# chapter: What to do
# pic: sd-counter 1/3; calendar "COMING MONTHS → EARLY 2027"; chip "NOTHING CHANGES TODAY"
So, what now? If you run I T for a school, nothing changes today. / The details arrive over the coming months. //
# pic: checklist doodle with three boxes: "WHAT DO STUDENTS SEE WITH SEARCH OFF?", "WHO READS THE TRANSCRIPTS?", "IS A NO-AI VIEW ON THE TABLE?"
When they do, ask three questions. / What do students see when Search is off? / Who can read the Guided Learning transcripts? / And is a no-AI view, like the Web filter, on the table? //
# pic: DuckDuckGo logo with a toggle "AI: OFF" (per Ars Technica); chip "OTHER ENGINES EXIST"
Still a no? Ars Technica points out that other search engines, like DuckDuckGo, / let you switch their AI features off. //
# pic: callback: the LOS ANGELES wish bubble from rung two returns; it pops; next to it the two-flavor menu and the "NOT AVAILABLE — message from your school" card
Remember Los Angeles, hoping for Google Search with the AI Overviews turned off? / Google's answer is a menu with two kinds of AI, and a message from your school. //
# pic: sd-sting
That's the stack, doodled. See you in the next commit.
