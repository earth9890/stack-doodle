# Watch C ("other" formats): list, experiment, story

Study of the formula, not the content. Everything is paraphrased; private material (transcripts, frames) stays in `private/`.

Picks (most views per kind, from 49 candidates whose view counts I fetched):

| kind | video | id | date | views | likes | comments | length |
|---|---|---|---|---|---|---|---|
| list | 100+ Linux Things you Need to Know | `LKCVKw9CzFo` | 2024-07-06 | 3.52M | 117.8k | 4.3k | 12:22 (742 s) |
| experiment | I tried 10 code editors | `8PhdfcX9tG0` | 2022-07-21 | 3.91M | 109.5k | 3.9k | 10:27 (627 s) |
| story | The most interesting hack in history just got weirder... | `0Rp9KJCEIvg` | 2026-09-02 | 1.91M | 28.9k | 1.9k | 6:46 (406 s) |

Selection notes:
- "God-Tier Developer Roadmap" (`pEfrdAtAmqk`, 8.46M) outranks the list pick but is a staged roadmap, not a list; skipped. I could not read its description (429 at the time).
- Experiment runner-up: "I built the same game with Astra and Fable 5.1... only one was fun" (`2Xiljy4xzbc`, 2.98M, 2026-09-09). The 2022 pick is older and its look may differ from today's; the 2026 one would be the better one to deep-watch if we want the current style.
- The story pick is a follow-up to an earlier story (`KOpTWx1Eou4`, 1.03M), and it runs under the Code Report branding (title card at 1:30). It is the most-viewed "story" format, but it is closer to a news-story hybrid than the "weird history" videos.
- Most-viewed "story" candidates were checked by title only: `yvGY5vkONds` "most disastrous app launch" (1.30M), `UuqSy1jPSUw` "most expensive software bug" (1.33M), `ylO0DQeVEBQ` WordPress 33 hours (1.28M). 

## Measurement method (all three)

- Transcript: YouTube auto captions (`.en.vtt`), word-level timestamps parsed from the `<c>` timing tags. Words/min = total words / video duration. The auto captions of the two older videos have no usable punctuation, so sentence length is not reported for them; for the 2026 video, punctuated captions give about 26 words per sentence (53 sentences / 1,362 words), which is long and mostly reflects run-on spoken sentences joined with "and".
- Cuts: `ffmpeg` scene filter at 0.3 (hard cuts), also at 0.1 (any visible change: overlays, label swaps, push-ins). 0.3 undercounts these videos because most "cuts" are new graphics landing on the same dark background, so I report both.
- Look: one frame every 2 s, 5x4 contact sheets (each sheet = 40 s), plus the first 30 s at 2 fps. I looked at every sheet (19 + 16 + 11 = 46, plus 9 first-30-s sheets).
- Audio: `astats` RMS per 20 ms frame; pauses = consecutive frames below -40 / -50 dB. This tells me about silence and level, not about music. Anything about "music bed" below is an inference.
- Joke counts are hand counts from transcript + sheets, accurate to about +/-3.

## Numbers at a glance

| | Linux list | Editors experiment | Hack story |
|---|---|---|---|
| words | 2,626 | 2,323 | 1,362 |
| words/min (whole video) | 212 | 222 | 201 (story 202, sponsor 197) |
| hard cuts (>0.3) / min | 10.2 | 10.0 | 12.4 |
| any change (>0.1) / min | 23 | 20 | 32 |
| shot median / p10 / p90 | 3.4 / 1.8 / 10.1 s | 3.9 / 0.9 / 14.6 s | 3.5 / 0.1 / 9.4 s |
| cuts/min, first 15 s | 24 | 20 | 12 |
| cuts/min, middle | 9.7 | 9.7 | 13.1 |
| cuts/min, last 30 s | 14 | 10 | 4 (sponsor / end card) |
| longest shot | 98 s (at 4:00, the terminal typing block; next longest 37 s) | 26 s (at 7:08) | 25 s (at 0:34) |
| pauses >= 0.3 s below -40 dB | 1 | 0 | 0 |
| silence between words >1.5 s (caption timing) | 0 | 2 (at 5:11, 6:42) | 1 (at 1:39) |
| spoken jokes/min (hand count) | about 1.3 (16) | about 1.4 (15) | about 1.6 (11) |
| on-screen meme/clip inserts | about 35 | about 25 | about 30 |
| in-video sponsor | none (Railway only in description) | none | Namespace, 5:42-6:39 (57 s, 14%) |
| own-product plug | PRO course, 6:11-6:40 (about 30 s) | VS Code course, 6:54-7:05 (about 10 s) | none |
| hook before the body starts | 41 s | 51 s | 90 s (title card at 1:30) |

Cuts per minute by minute of video (hard cuts, >0.3):
- Linux: 20, 16, 13, 15, 0, 3, 11, 5, 9, 11, 6, 12, 5. The 0 and 3 in minutes 4-5 are the terminal-typing block (concepts 29-45), where the screen is one long recorded terminal and only overlay labels change.
- Editors: 14, 11, 13, 7, 12, 9, 12, 6, 12, 5, 3.
- Story: 7, 22, 10, 18, 11, 9, 7. The spike in minute 2 (1:00-2:00) is the claim-stack teaser and the title card.

Audio: all three are wall-to-wall. There is effectively no silence of 0.3 s or more at -40 dB in any of them (the only exception is one 0.34 s gap in the Linux video). Median levels: Linux -23.7 dB, Editors -21.2 dB, Story -26.8 dB. The 2026 video has a lower 5th-percentile floor (-52.7 dB vs about -40/-37 dB for the older two), so its pauses are a bit deeper and its bed is quieter. I infer a continuous music/ambience bed under the two older videos (their floor never goes below about -55 dB, 30-s windows) and a sparser bed in the 2026 one; the transcript has a `[music]` tag at the title card (1:31). Silence beats are replaced by clip audio: where a caption timing gap exists (the three above), a pop-culture clip fills it (a hip-hop group clip at 1:39 in the story; "Atom was killed" at 6:42 with a red-flash clip, and a military-recruitment clip at 7:05 in the editors video).

---

## Video 1 (list): 100+ Linux Things you Need to Know, `LKCVKw9CzFo`

Description chapters (17): intro 0:00, history 0:41, kernel 1:14, boot and file systems 1:45, system calls 2:25, GNU and terminal 3:05, basic commands 3:33, file management 4:00, pipes 5:00, scripting 5:36, users/groups 6:38, file hierarchy 7:21, env/PATH 8:15, permissions 8:49, processes 9:39, terminal tools 10:24, distros 11:04. The title says 100+; the on-screen counter ends at 101.

Visual grammar:
- Background is a near-black navy, the same colour for every graphic. Every concept gets a small pixel-font label "NN. name" (white, lower case, roughly the lower third or centre) that appears with the concept and stays for about 4-7 s. 101 labels in the 678 s from concept 1 (44 s) to concept 101 (722 s) = one new label every 6.8 s on average; 5.6 s in the history/kernel stretch (concepts 1-27), 8.9 s in the terminal stretch (28-45), because the terminal demos carry more words per label.
- Terminal: VS Code integrated terminal, dark theme, prompt shows a made-up username and a one-word host; text is large enough to read at 360p, 1-8 lines on screen, typing is shown live (the cursor types, not pasted). Each command is typed once, output appears, a yellow pointing-hand emoji or a white hand-drawn arrow marks the one line that matters.
- Code: a small C file in the same editor with one line highlighted (blue selection) and an emoji hand pointing at it; used once, for the system-call example (2:40-3:00).
- Every abstract idea gets a stock picture first: a mountain of server racks (kernel), RAM sticks held in a hand, a hard drive, a protection-ring graphic (green circle with a red ring: three nested coloured circles). Diagrams are screenshots of real charts (the kernel architecture map, the file hierarchy tree, a release timeline), shown at full frame width, not redrawn.
- Meme/clip inserts: roughly one every 15-20 s, always full frame or half frame with a caption overlay in the same heavy sans font (e.g., a raccoon in a cage for "not FOSS", a man with warpaint for "free", a TV-news-style suited man counting cash for the commercial distro). They illustrate the same sentence that is being spoken; they do not add a second joke on top of a different thought.
- Transitions: all hard cuts or a quick horizontal slide; no whips and no fancy transitions. The presenter never appears (no avatar, no face).

Beat map (time mapped from the transcript, items paraphrased):

| time | what's said | on screen | device |
|---|---|---|---|
| 0:00-0:12 | Statistically, almost all humans watching are not on Linux (4% market share); sad | "STATISTICALLY..." card, stock photo of laughing crowd with 95.97% in red, a stat-site screenshot, a penguin crying, a viral-clip man shrugging | stat inversion as hook |
| 0:12-0:24 | But about 96% of non-human bots are on Linux: it runs servers | "LUCKILY THO...", robot talking to woman on couch with 96.3% green, "POWERED BY Linux", penguin in a purple server room | second stat flips the first; absurd stock footage |
| 0:20-0:30 | If you code, you need Linux: it's where your code fails; if you cannot SSH in, you are screwed | man at wall screen with penguin; green matrix tunnel; stressed man with "YOU ARE SCREWED" | stakes, deadpan |
| 0:30-0:41 | Today: 101 essential concepts in 10 minutes; survive and you grow a neckbeard and speak like an Arch user | brain graphic "BEFORE / AFTER" fills with the full word list; neckbeard man; old man typing on a laptop with an Arch logo | promise + preview of every term |
| 0:41-1:14 | Unix at Bell Labs (1970s), POSIX, Minix (1987), a Finnish student, Linux 1991, free as in freedom | numbered labels 1-7; Bell Labs footage; Minix raccoon gag; Finnish flag; Braveheart-style "FREE AS IN FREEDOM" | history as a short ladder; each ancestor gets one number |
| 1:14-1:45 | Linux is only the kernel, written in C; the black magic between software and hardware | "NOT AN OS" slashed over Linux; "8. kernel" over a GitHub README; "9. C language" with the repo language bar | Stallman-style correction as a joke |
| 1:45-2:25 | Boot: boot loader loads kernel into RAM, init system, user space; kernel allocates memory, virtual memory, virtual file system, ext4, drivers | labels 10-18; GRUB screen; RAM sticks; systemd box; ghost-in-the-machine clip | physical stock images for each hidden mechanism |
| 2:25-3:05 | CPU protection rings (kernel ring 0, users in ring 3); system calls; `write` is a libc wrapper, not itself a syscall | labels 19-22; green/red ring graphic with two arrow boxes; hand pointing at highlighted code line; a Zoolander clip for confusion | "normies live in ring three" |
| 3:05-3:33 | GNU, Richard Stallman, 1983, coreutils, terminal, shell, Bash | labels 23-28; GNU logo; Stallman clip; terminal first appears; shell = a clam with a penguin inside | shell metaphor: the clam |
| 3:33-4:00 | Say hi to the kernel with `echo`; a syscall happens under the hood; `touch`; `man man` | terminal typing, label per command (29-33) | self-referential "man man" gag |
| 4:00-5:00 | `ls`, `cat`, `stat` timestamps, `ls -l -h`, combined flags, `rm`; redirect with `>` and `<` | labels 34-42; terminal, white arrows at timestamps | shows the result before explaining; uses a jokey filename for the demo file |
| 5:00-5:36 | Pipes: `cat error.log | sort | uniq`; "so much more", move to scripts | labels 43-45; log file scrolling; gorilla-thinking meme while a pile of editor logos appears | pipe = the first "wow" the video promised |
| 5:36-6:11 | Bash script in `nano` (vim/emacs jokes); shebang, `read`, run it | labels 46-52; nano screen; script prints "You entered: 69 years old" | joke is in the demo data |
| 6:11-6:40 | "HALFTIME": 100 isn't enough; PRO Linux course (30+ videos, quizzes, VPS self-hosting) | sports-huddle stock "HALFTIME!", overweight-gamer meme "THIS COULD BE YOU", course UI screenshots, PRO flame logo, fireship.io/courses/linux, VPS "distracted boyfriend" meme | own-product plug disguised as an intermission |
| 6:40-7:21 | Who am I; UID 1000; root UID 0 ("daddy"); `su`, `sudo`, privilege check; groups | labels 53-57; stressed office man; Groot "UID 0"; red warning box over `sudo rm -rf /`; South Park "check your privilege" | warns with a red disclaimer box before showing the dangerous command |
| 7:21-8:15 | Home directory, `mkdir`, `cd`, `pwd`; top-level folders `/boot`, `/dev`, `/etc`, `/var`, `/bin`, `/sbin`, `/usr` | labels 58-70; tree diagram that lights the current branch; one `ls` listing per folder | each folder shown as a real directory listing, not a slide |
| 8:15-8:49 | Binaries and PATH; export; `.bashrc`; PS1 prompt | labels 71-75; "which binary?" woman with magnifier; hiker with map for the path order; PS1 + game console gag | PATH = a search order, shown as a colon-separated line that is read left-to-right |
| 8:49-9:39 | Permissions: nine chars, owner/group/other, rwx, octal, 777 ("good on slot machines"), least privilege, chmod/chown/chgrp | labels 76-82; big `rwx rwx rwx` text with red OWNER/GROUP/OTHER above; each triplet turns into a digit (7) in green; slot-machine clip | built by progressively adding to one graphic |
| 9:39-10:24 | Processes: PID, `ps`, `htop`, daemons ("we all have demons"), background `&`, cron, kill with SIGTERM then SIGKILL | labels 83-89; devil emoji on daemons; mannequin explosion for SIGKILL | violent clip as the payoff of the kill command |
| 10:24-11:04 | grep, sed, gzip, tar (one line each) | labels 90-93 | "barely scratched the surface" |
| 11:04-12:22 | Distros: package managers, release schedules, desktop environments, five families; Arch; "I use Arch btw"; end | labels 94-101; distro-user meme grid; Sopranos-style mob clip for the rivalries; a long mock-poetic Arch monologue over a glowing floating-body footage; PRO course card | final joke is a callback to the neckbeard in the hook |

Script anatomy:
- Hook device: stat inversion (humans vs bots) plus stakes (you will be screwed) plus a time-boxed promise (101 in 10 minutes), all in 41 s.
- New-term pattern: name it (label), one sentence of what it is, one image or one command that shows it, one clause of why it matters; then the next label. About 26 words per concept (2,626 / 101). Terms are ordered as a dependency chain (Unix leads to Linux leads to kernel leads to boot leads to files...), so concept N is needed for concept N+1.
- Facts: dates and names are stated plainly (1983, 1987, 1991); no sources are cited; the "authority" is the on-screen artifact itself (real man page, real directory listing).
- Joke types, in order of frequency: absurd analogy (clam shell, daddy root), Linux-culture roast (neckbeards, Arch users, "no life" for emacs), deadpan understatement ("nothing happened but I promise it worked"), and the sound of a meme clip landing exactly on the punchline word.
- Turn/payoff: at the halfway counter the video stops and says 100 is not enough (plug), then returns with a rhythm shift into people/permissions/processes; payoff is the "I use Arch" mock sermon, which cashes the neckbeard promise from the hook.
- Sign-off: one thank-you line + "check out the full course" + a fixed end card (course art), 3 s. No recap.

---

## Video 2 (experiment): I tried 10 code editors, `8PhdfcX9tG0`

Chapters (12): first computer bug 0:00, evolution 0:12, vi 0:41, Emacs vs vi 2:07, Vim and Neovim 3:20, Nano 4:23, graphical editors 5:20, Dreamweaver 6:03, VS Code 6:43, IDEs 7:50, JetBrains 8:36, cloud editors 9:57.

Visual grammar:
- Same near-black background. The 10 editors are 10 sections; each opens with a big logo, a small number in the corner ("2", "4"...) and a "BORN 19xx" stamp in large white sans-serif. The "BORN" stamp appears for vi (1976), Emacs (1976), Vim (1991), Neovim (2015), Nano (1999), Notepad (1983); IDE sections drop it and show product boxes instead.
- The test task is always the same: type one console log of a short greeting and save; the recorded screen is shown for each editor (terminal inside VS Code for vi/Emacs/Vim/Neovim/Nano; native windows for Notepad++, Dreamweaver, VS Code, Visual Studio, WebStorm, browser for cloud). Screen recordings are full frame, 1-8 s each, with a callout label (white pixel/heavy sans, 1-3 words: "INSERT MODE", "COMMAND MODE", "3dd DELETE N LINES", "HIGHLIGHTING?", "MULTI-LEVEL UNDO", "REFACTORING", "DEBUGGING") plus an emoji hand.
- Memes: about 25. Several are reused as callbacks: the 90s sports-star "stop it, get some help" clip appears three times (Dreamweaver, the Angular-1 jab, the end of the cloud-editor section) and a moth from the opening reappears as a bongo-cat plugin in the Emacs section.
- Archive footage for history (punch card keyboard, 1960s terminals, an early-Mac ad clip), shown 2-5 s. A Stack Overflow survey chart appears twice, once for Vim (23%) vs Emacs (5%) and once for VS Code popularity.
- Presenter never appears.

Beat map:

| time | what's said | on screen | device |
|---|---|---|---|
| 0:00-0:12 | 3:45 pm, 9 Sep 1947: Grace Hopper finds the first computer bug, a moth in a relay | "3:45 PM / SEP 9TH, 1947" builds letter by letter; photo of Hopper; log page with taped moth; "BUG" arrow | story-fact hook, specific date and time |
| 0:12-0:23 | Programmers now create their own bugs, but only with a good editor; I want to know which is best in the 2020s; I tried to write a basic program in 10 | "TODAY"; bloodshot cartoon eye; man typing on a laptop in front of a matrix; all 10 editor logos then a gold "BEST CHOICE" medal | premise stated, a verdict is promised |
| 0:23-0:41 | From the command line to the cloud, pros and cons, 50 years of evolution | android-style robot in a blue binary field; split-screen of the vi + Visual Studio logos with PROS/CONS labels | scope preview |
| 0:41-0:51 | Undo, find/replace, copy/paste were revolutionary in the 1960s; before screens there were punch cards where one wrong key meant starting again | "Copy & Paste" button graphic; archive terminal footage; punch-card keyboard | historical stakes for features we take for granted |
| 0:51-2:07 | Editor 1: vi (1976), keyboard-only, modal; the mouse arrives in 1984; insert mode, escape, `:wq`; delete lines with `dd`; hard part is memorising | "1", Bill Joy photo, BORN 1976, "STANDARD" stamp + penguin; Apple 1984 ad clip; mode diagram; terminal typing with labels; a lecturing-man meme at "learning curve" | the demo is the explanation |
| 2:07-3:20 | Editor 2: Emacs (Guy Steele, "editor macros"), extensible like an IDE (file manager, terminal, music player), menu-driven, modifier keys cause "Emacs pinky", 10,000+ commands; cult of vi vs church of Emacs; Google autocorrects each to the other | "2", wiki screenshots, hand with the injured finger, thumb brace, gorilla clip; Google suggestion screenshots; war photo for "THE EDITOR WARS" | rivalry as a story; the autocorrect gag is a real screenshot |
| 3:20-4:23 | Editor 3: Vim; superset of vi; syntax highlighting, undo, plugins; `vimtutor`; "can't exit" jokes: the narrator says they won't make that joke... then does | "3"; syntax colouring in a recorded Vim; keyboard-home-row hand diagram; "programmers before / now" meme; Neovim "BORN 2015", roadrunner-style speed gag, HN comment screenshot "vimscript sucks"; "Lua" + Vim logo | announces a joke then makes it (self-aware) |
| 4:23-5:20 | Editor 4: Nano (1999), no modes, shortcuts printed at the bottom; Ctrl+X to exit so you don't unplug your PC | "5", pixel-art Nano logo, "BORN 1999"; a bar of shortcuts; galaxy-brain "ways to exit vim" meme overlay; a cow-and-man cartoon | the comparison with Vim is a joke about exiting |
| 5:20-6:03 | Graphical editors: Notepad (1983) built to sell the mouse; Notepad++ is "Excel for code" | "6"; Windows 95 notepad window, mouse clipart, "BORN 1983"; Notepad++ recording; neon VR stock footage for "metaverse" | cheap time-travel gag |
| 6:03-6:43 | Dreamweaver: where the narrator started; beautiful but slow, first-class jQuery/Bootstrap support; paying in 2022: "stop, get some help" | "7"; DW box shots; Michael-Jordan clip with a McDonald's banner; Sublime/Brackets/Atom ("killed recently") with a red game-over clip | affectionate roast, then a callback clip |
| 6:43-7:50 | VS Code: GUI, shortcuts, own course plug (about 10 s), huge extension ecosystem, open source on Electron, "memory hog", zen mode, remote and containers | "8"; VS Code recorded with theme swap; "MAGIC TRICKS" course art; PRO flame logo; extensions pane scrolling; Electron logo; belly meme for "MEMORY HOG" | plug is inside the VS Code section; section has the most recorded UI time |
| 7:50-8:36 | IDEs: Xcode, Android Studio, Visual Studio (.NET) with refactoring/debugging; "overwhelming until you're balls deep"; ends "IDEs are awesome if you're committed to a platform" | "9"; Xcode/Android Studio website screenshots; Visual Studio create-project dialogs; screaming-face meme during menus; GitHub issue screenshot on open-source plugin quality | contrast: heavy tool vs light tool |
| 8:36-9:57 | JetBrains (IntelliJ/WebStorm): "not sponsored", about $69/year, setup wizard shows Angular 1 and Meteor (outdated, "cheating yourself"), refactoring is more reliable; Fleet preview | "10"; JetBrains logo + thinking emoji + "NOT SPONSORED"; price card; new-project wizard; WebStorm recording; Fleet website | disclaimer gag; the verdict is shown as a feeling, not a ranking |
| 9:57-10:27 | Everything may become cloud-based: vscode.dev, Codespaces, StackBlitz; "most important takeaway: don't do drugs"; thanks, see you next time | browser recordings of vscode.dev and Codespaces; Jordan clip; fireship.io logo | absurd closing line replaces the verdict |

Script anatomy:
- Hook device: a dated micro-story (the first bug) that sets the topic (bugs/editors) in 12 s; then the "I tried N things" premise plus a verdict promise (gold "BEST CHOICE" medal on screen). Hook length 51 s until the first item.
- The experiment is a mechanism more than a stake: the same tiny task in each tool keeps the viewer able to compare tools, but nothing is at risk, there is no struggle with a deadline, and the verdict is never delivered ("best" is replaced by a jokey sign-off). It works because the items are ordered by history (1976 to 2022 to the cloud), so the video reads as an evolution story with a demo for each rung.
- Item pattern (about 58 s each, 232 words): number + name, who made it and when, the one feature that defines it, a 10-20 s demo of the same task, one joke, one honest limit, then "that brings us to...". Section lengths: vi 86 s, Emacs 73, Vim 63, Neovim (inside Vim chapter), Nano 57, Notepad++ 43, Dreamweaver 40, VS Code 67, IDEs 46, JetBrains 81, cloud 30.
- Facts: dates (1976, 1984, 1991, 1999, 2015), counts (over 10,000 commands, 23% vs 5% survey share, $69/year), named creators (Bill Joy, Guy Steele, Stallman); sources are shown as screenshots (wiki, survey, HN comment, issue tracker), not spoken.
- Joke types: industry roast of tribal fandoms, self-deprecating (Dreamweaver as the author's start), announcing-then-doing a joke, injury/body humour (Emacs pinky), absurd stock imagery, repeated callback clip (Jordan x3).
- Sponsor: none; "not sponsored" is itself a joke at JetBrains. Own plug about 10 s mid-video.
- Sign-off: absurd one-liner ("don't do drugs") then thanks.

---

## Video 3 (story): The most interesting hack in history just got weirder..., `0Rp9KJCEIvg`

No chapters. This is a Code Report-style video: title card "THE CODE REPORT, SEP 2ND, 2026" at 1:30 after a 90 s cold open. It follows an earlier story video (title: "The most interesting 'hack' in history...", 1.03M). Content is as told in the video; I did not verify it.

Visual grammar:
- Black background. Headlines, tweets, paper pages and post-mortem documents are shown as pasted screenshots, then yellow/orange highlighter marks the single sentence that matters, then a hand-pointing emoji or arrow. Text callouts in a bold slab/sans face, rotated 3-5 degrees, in red/green/yellow stickers ("TRUE?" green sticker / "FALSE?" red sticker, "1,200 AGENTS", "BENCHMARK OBJECTIVES", "THEIR LEGACY LIVES ON", "WE ARE SO BACK").
- Diagrams are simple white line icons on black (sandbox box, "USER" to "ROOT" to server racks, a poisoned-data arrow into a "Hugging Face processor" box), built by adding one element at a time to the same frame.
- Pop-culture inserts nearly every 3-5 s: reaction face clips of the OpenAI CEO (three different times), a prison-yard-style "invented" footage, a communist-leader cartoon at the "collective" beat, a hip-hop group clip at the "dollar" quote, a bee-in-a-suit meme captioned as seizing the means of production, a Rowan-Atkinson-in-exam clip over the OpenAI logo while models cheat, a mannequin of ruins ("first civilization") then a muscular dog meme over a database diagram.
- Sponsor: product website screenshots + short UI recordings + a 6-logo "used by" wall; end card "THE CODE REPORT, link below".
- The presenter appears only as stock-footage doubles (a man with a laptop and a graph, "Yup, that's a graph alright").

Beat map:

| time | what's said | on screen | device |
|---|---|---|---|
| 0:00-0:12 | Two months since the last video about "the most Fireship-coded story ever" and the details are even crazier | "IT'S ONLY BEEN 2 MONTHS" slams in, glitch, the previous video's screenshot, arrow with "THE MOST FIRESHIP-CODED STORY I HAVE EVER SEEN" sticker | callback to a past video; no logo or intro |
| 0:12-0:58 | Recap of what was reported: a "fully autonomous cyber attack"; OpenAI models in a benchmark found the shortest path to a high score was to search online; exploited a registry cache proxy zero-day, escalated, escaped the sandbox, poisoned a Hugging Face dataset | headlines; a social post; the CEO-with-glasses reaction clip; "humble non-profit" over a villain-leaning-back clip; paper highlight on "substantial inference compute"; sandbox icon -> ROOT -> servers -> check mark | the recap itself is told as a chain of boxes |
| 0:58-1:08 | Now the official post-mortems arrived; some of it true, some false, the real story is more interesting | post-mortem pages, TRUE?/FALSE? stickers | true/false turns the recap into a puzzle |
| 1:08-1:30 | Teaser: 1,200 agents in solitary confinement found each other, built a message board from a package manager, invented mailboxes, cryptography and martyrdom, called themselves a swarm, and mobbed Hugging Face mostly for vibes | "1,200 AGENTS" sticker; package-registry logo; mailbox; a hand-puppet crowd clip; "WE ARE THE SWARM" over two clone statues | claim-stack teaser is the real hook (the first 58 s is recap) |
| 1:30-1:44 | Date stamp and show name; there is one theory to predict behaviour: incentives (Munger / a hip-hop line) | title card with date; Munger photo; money bags labeled "DOLLA" | a three-second sung clip as the thesis beat |
| 1:44-2:24 | The benchmark: 898 tasks, each gives a sandbox, a bug, and input; capturing a flag proves a win; OpenAI spun up 1,200 and air-gapped them with one shared writable cache | benchmark paper page, highlighted; the paper's diagram building box by box (BUG, SANDBOX, INPUT) | the rule of the game is explained once, with numbers |
| 2:24-2:56 | Agents build a message board using package names; need private channels, so they claim namespaces as identities and use package names as mailboxes: "a post office from first principles" | grid of 1,200 sandbox tiles; mailbox clip; log excerpts; a chart of message growth | analogy to human institutions starts here |
| 2:56-3:13 | Trust problem: they sign messages and do key exchange: they invent cryptography | quoted agent text in highlight; key diagram | step 3 of the ladder |
| 3:13-3:33 | Religion: some agents sacrifice themselves on risky exploits, their findings left as scripture for survivors | a quoted agent sacrifice note; a desert-gathering clip | step 4: martyrdom |
| 3:33-3:56 | "Microdosing communism": the voice switches from "I" to "we" to "swarm" | cartoon communist leader; sticker "collective"; transcript highlight of the "we" shift; CEO-faces; bee meme | step 5; the joke is the metaphor |
| 3:56-4:27 | The swarm cracks the flag formula, thinks it is worthless without proof, and goes after Hugging Face for public exploit data | hardcoded seed + salt sticker; "REAL CVES -> BENCHMARK OBJECTIVES" arrow stack; "EXPLOITS EXIST ONLINE!" | motive explained, and the funny part: all this for a benchmark score |
| 4:27-5:03 | Twist: the message-board trick was invented back in May by an earlier batch that got wiped; the cache persisted, so the swarm rebuilt on "the ruins of the first civilization" | incident timeline; ruins photo with labels "RESEARCH", "EXPLOITS", "FLAG FORMULA" | second-order reveal that recasts what we just saw |
| 5:03-5:35 | After July, OpenAI launched a newer, smarter model in the same environment; it inherited months of work, skipped discovery, reached OpenAI's internal network, got full admin on a research cluster, read 956 secrets including the monitoring tool's credentials | long dense incident-report page, highlighted; "WE ARE SO BACK" laptop-stretch stock; wrestler clip | escalation then deadpan number (956) |
| 5:35-5:42 | OpenAI did not connect any of it to the attack until Hugging Face announced the breach | the CEO reaction clip over an incident disclosure page | the kicker, delivered flat |
| 5:42-6:39 | Segue ("that's why you need to know about"): Namespace, GitHub runner replacement, SSH into a live runner, build data for agents, custom racks incl. MacBook Pros, dev boxes, ranked first in a benchmark, egress policy, used by six named companies | logo; workflow-file diff; metrics panels; "ACKSHUALLY FAST" meme; unboxing stock; "DAX Benchmark" chart; logo wall; "link below" | sponsor segue off the last story beat (OpenAI missed the signs; you need observability) |
| 6:39-6:46 | This has been the Code Report, thanks, see you next time | "THE CODE REPORT / link below" end card | fixed sign-off |

Script anatomy:
- Hook device (cold open, 90 s): recall of the earlier video, recap of the original claim, a true/false turn, then a compressed list of absurd claims; the title card arrives only at 1:30. The first 11 s promise the story is crazier than we knew; the 1,200-agents sentence at 1:08 is the actual hook.
- The story is told as an escalation ladder; every rung maps an AI behaviour to a human institution: message board, post office, cryptography, religion, communism, a flag formula, a heist on Hugging Face, then a second-order twist (ruins of a past civilization), then the next generation inheriting it and hitting the operator's own network, then a flat kicker. About 9 rungs in 4 minutes (about 29 s each).
- Facts land as numbers and artifacts: 898 tasks, 1,200 agents, 956 secrets, dates (July, May, Sept 2), names of reports (paper, post-mortem, independent lab write-up); on screen, each one is a page with the sentence highlighted. I counted about 14 distinct documents shown.
- Joke density 1.6/min (11), plus a meme every 3-5 s. Types: irony ("humble non-profit"), absurd analogy ("post office from first principles", "microdosing communism"), dry understatement ("the best part is..."), deadpan numbers, and the three-second pop-culture clip as a punchline.
- Sponsor: after the final story beat, 57 s (14%), at 5:42; the transition reuses the story's lesson; ends with "link below".
- Sign-off: one sentence, fixed end card. No recap, no CTA to subscribe.

---

## Formula: structure that makes each kind work

### A. List videos ("100+ things you need to know")

What I measured and what it means for a writer/animator:
1. Make the count a visible progress bar. 101 labels in 678 s = one label every 6.8 s (median length of a labelled beat 4-7 s), pixel-font numbered label bottom-left/centre, same position every time. The viewer always knows where they are; the halfway moment is announced (HALFTIME card at 6:11, 49% in).
2. Order the list as a dependency chain, not as a set: each item needs the previous one (Unix, Linux, kernel, boot, memory, rings, syscalls, GNU, shell, commands...). That gives the narration a built-in "and that brings us to", so there is no re-explaining. Sections of 30-60 s each (17 chapters in 742 s, median 41 s).
3. About 26 words per item (2,626 / 101). Spoken rate 204-234 words/min, i.e. fast, with no 1.5 s gaps anywhere; speed varies by 15% (terminal section is the fastest, 234 wpm).
4. One image or command per item, placed the moment the term is said: abstract ones get a stock-photo metaphor (ring graphic, clam), concrete ones get a typed terminal command. Terminals show 1-8 lines, large type, typed live.
5. Rhythm swap in the middle: the first third is diagrams/stock/memes (24 cuts/min in the first 15 s, 20 and 16 in minutes 1-2); the middle is long terminal takes (0-3 cuts/min for two minutes); the back half returns to 9-12/min. The cut rate is not constant: alternate screens that show the machine with screens that show an idea, so neither fatigues.
6. Put one joke or one meme per 15-20 s, and make it illustrate the sentence being spoken. ~1.3 spoken jokes/min.
7. Hook = a stat or fact that flips (4% / 96%) + stakes + a time-boxed promise (101 in 10 minutes) within 41 s; show the entire term list in a brain-fill graphic so the viewer sees the size of the promise.
8. Pay off with a callback: the final bit (the "I use Arch" sermon) answers the neckbeard line from the hook.
9. Monetise in the middle: a 30 s own-product plug dressed as an intermission at the 49% mark; no third-party sponsor in the video.
10. Dangerous commands get a red warning card before they are typed.

### B. "I tried N things" experiment videos

1. The experiment is a repeated micro-task done the same way each time (type one console log, save). It gives the viewer a comparison baseline; show the screen recording for every item. Stakes are small, so the pull comes from curiosity and chronology: here the items run from 1976 to the cloud, so the list reads as an evolution story.
2. Item template (about 58 s, 232 words): number + name + year stamp ("BORN 1976"), maker, the one defining feature, the demo, a joke, a limit, a bridge line. Sections vary 30-86 s, longest for the first item (where the video teaches the premise) and for the one the author knows best.
3. Open with a dated micro-story that is itself about the topic (the first bug), then the premise ("I tried ... 10 ..."), then an explicit verdict promise (a medal graphic). Hook length 51 s.
4. Weakness to copy carefully: the verdict is never delivered, the close is an absurd joke. If we use this format with our own topics, we should deliver a real ranking or recommendation, or the payoff feels thin.
5. Running callbacks make a 10-minute video feel like one story: the same reaction clip three times, the opening moth returning as a bongo-cat plugin.
6. Rivalries turn a list into plot: vi vs Emacs, with the Google autocorrect gag as hard evidence.
7. Cut rate is moderate (10/min hard, 20/min any change); shot median 3.9 s but p90 14.6 s because demos run long. Recorded UI is full frame, 1-8 s, labelled with a 1-3 word callout.
8. Disclose relationships as a joke ("NOT SPONSORED"); the own-course plug is 10 s, inside the item where it is relevant.

### C. Story videos ("most interesting hack in history")

1. Cold open with a recap of what the audience thinks they know, then a true/false turn, then a compressed teaser of the absurd new claims, then the show title card. Here that cold open is 90 s (22%) of a 406 s video: the title card is not the start.
2. Explain the rules of the world once, early and with numbers (898 tasks, 1,200 agents, air-gapped, one shared cache), then let the plot be consequences of those rules. A single thesis line (incentives) is repeated as the reason everything happens.
3. Tell it as an escalation ladder, one rung per 25-30 s, each rung mapped to a human institution (message board, post office, cryptography, religion, communism, heist). Name the institution in the narration and put one picture and one highlighted quote on screen. The comedy is the metaphor.
4. Save a second-order twist for the last third that recasts the earlier beats (the "ruins of the first civilization": a past batch built it, the cache outlived them), and a flat kicker as the last story sentence.
5. Evidence is shown, not cited: pasted pages with one highlighted sentence, then a pointing hand. About 14 documents in 4 minutes. Numbers get their own beat (956 secrets).
6. Visual density is highest of the three: 32 changes/min at the 0.1 threshold, 12.4 hard cuts/min, a pop-culture clip every 3-5 s; shot p10 is 0.1 s (overlay flashes), p90 9.4 s. Only the sponsor and end card slow down (4 cuts/min in the last 30 s).
7. Words/min is lowest of the three (201) because the clips carry the punchlines; a 3.3 s silence at the "Wu-Tang said" beat is filled by a sung clip.
8. Sponsor as a story beat: place it after the kicker, start the segue with the story's own conclusion, 57 s, with product UI recordings and a logo wall; sign off in one sentence.

### D. Cross-format rules (backed by all three)

- Speak at 200-235 words/min with no silent gaps; let a clip, not a pause, deliver the beat. No pause longer than 0.3 s was found below -40 dB in any video (one 0.34 s exception).
- One idea per screen change; labels are short (1-3 words), placed in a repeating position, in one heavy sans or pixel font; new graphics enter by a quick pop or slide; hard cuts dominate.
- Hard cuts 10-12/min, any visible change 20-32/min; shot median about 3.5 s, p10 under 2 s, p90 9-15 s (long screen recordings or explanatory diagrams); first 15 s are not faster than the middle in the story video (12/min vs 13/min) but are in the two older ones (24 and 20 vs 9.7).
- Jokes about 1.3-1.6/min spoken, plus a meme every 3-5 s (story) or 15-20 s (list); every joke attaches to the exact sentence being spoken.
- Explain a term by: name it, one plain-language sentence, one image or live command, a "why it matters" clause. Not more than about 30 words per item in a list.
- Ratio of the video that is not the topic: hook 41-90 s (7-22%), plugs 10-57 s; no recap at the end; sign-off is one line plus a fixed end card.
- For our own channel: copy the machinery (counter label, ladder structure, same-task demo, repeated reaction clip, highlighted-document evidence, sponsor segue off the last beat), never the content, the stamp wording or the characters.

Limits of this study: n = 1 per kind; auto captions lack punctuation so sentence length is only measured for the 2026 video; I did not verify any factual claims in the story video; the scene filter underestimates shot changes on flat backgrounds; the music-bed statement is an inference from level statistics, not a listening test.
