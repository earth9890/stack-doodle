// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// Google: no AI, no Search (Patch Notes, ~5:20). Running visuals: the AI OFF toggle + the "NOT AVAILABLE" card (cold open, callback),
// the 4-rung LADDER (Aug → Sep → last weeks → Tuesday), the admin CONSOLE toggles, the LA WISH bubble (set up in rung 2, paid off at the end).
// Real people (Phillips, Khan, Mamdani, Golin) = name chips + their quoted words only. UI is generic doodle, never Google's real UI.
// Grounds: blob for people/critic beats, drift/dots for the timeline, glyphs/scan for the console + code, circuit for "how it works".
const CUES = [[1, 0], [3, 0], [4, 0], [5, 0], [6, 0], [8, 0], [9, 0], [10, 0], [12, 0], [15, 0], [16, 0], [18, 0], [19, 0], [20, 0],
  [21, 0], [22, 0], [24, 0], [25, 0], [27, 0], [28, 0], [30, 0], [31, 0], [33, 0], [34, 0], [35, 0], [37, 0], [38, 0], [41, 0], [43, 0],
  [45, 0], [46, 0], [48, 0], [50, 0], [51, 0], [53, 0], [54, 0], [56, 0], [57, 0], [58, 0], [59, 0], [60, 0], [62, 0], [63, 0], [64, 0],
  [66, 0], [69, 0], [70, 0], [72, 0], [73, 0], [74, 0]];
const WIN = sceneWindows(CUES, 0.4);
let si = 0;
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 5 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const put = (S, name, x, y, o = {}, t, how = "up") => L.put(S, name, x, y, Object.assign({}, o, t == null ? {} : how === "pop" ? { t, pop: true } : { t, slide: how }));
// swap Dev's face on ones (both placed; the new one hidden until t)
const swap = (S, old, x, face, t, o = {}) => { const n = dev(S, x, face, o); tl.set(n, { opacity: 0 }, 0); S.hide(old, t); S.show(n, t); S.sfx(t, "boing", x); return n; };
const LAD = ["AUG: CHATBOT ON", "SEP: NYC + LA SAY NO", "LAST WEEKS: LAWMAKERS", "TUESDAY: THE SWITCH"];
// the ladder: rungs lit up to n-1 from the start, rung n lights on its word
const ladder = (S, n, t) => { L.put(S, "g5-ladder", 330, 500, { lit: n - 1, labels: LAD, size: 44 }); L.put(S, "g5-ladder", 330, 500, { lit: n, labels: LAD, size: 44, t }); S.sfx(t, "ding", 500); };
const ROWS = (g, n, c, s) => [["GEMINI", g], ["NOTEBOOK", n], ["CLASSROOM AI", c], ["SEARCH", s]];
const PHIL = { site: "nytimes.com (via inquirer.com)", head: "Google will turn off search for schools that reject AI", body: ["\"Search and AI are deeply integrated,\" said Chris Phillips, vice president for education at Google."], hl: 0, date: "NOV 3, 2026" };

// ---- 1. clips 1-2: cold open. Dev flips AI OFF; the search page turns into NOT AVAILABLE ----
{
  const S = sc("drift", "cyan");
  const page = put(S, "g5-search", 1180, 330, { q: "photosynthesis", w: 1000, url: "school chromebook" });
  const d = dev(S, 300, "smile", { s: 1.2 });
  logo(S, "google", 1180, 600, 1.1, W(1, 0));
  put(S, "p2-toggle", 640, 470, { s: 1.4, on: false }, W(1, 7), "pop");
  chip(S, "AI OFF", 640, 300, "lime", 60, W(1, 9), { rot: -3 });
  S.hide(page, W(2, 5));
  put(S, "g5-blocked", 1180, 330, { w: 900 }, W(2, 5));
  swap(S, d, 300, "shocked", W(2, 7), { s: 1.2 });
  chip(S, "SAME SWITCH", 1180, 820, "pink", 64, W(2, 3), { rot: 2 });
  S.punch(1180, 330, W(2, 5), 0.05);
}
// ---- 2. clip 3: four products ----
{
  const S = sc("dots", "cyan");
  chip(S, "TUESDAY, GOOGLE NAMED FOUR", 960, 170, "white", 54, null, { rot: -1 });
  [["googlegemini", "GEMINI", 3, 6], ["googlegemini", "NOTEBOOK", 3, 8], ["googleclassroom", "IN CLASSROOM", 3, 11], ["google", "SEARCH", 3, 14]].forEach(([lg, txt, c, i], k) => {
    const x = 270 + k * 460;
    logo(S, lg, x, 470, 1.2, W(c, i));
    chip(S, txt, x, 700, k === 3 ? "pink" : "cyan", 50, W(c, i) + 0.1, { rot: k % 2 ? 2 : -2 });
  });
}
// ---- 3. clip 4: the blog line ----
{
  const S = sc("dots", "lime");
  logo(S, "google", 220, 200, 1.0);
  src(S, 1000, 470, { site: "blog.google (Chris Phillips, VP Education)", head: "Designing responsible AI for learning",
    body: ["Access to these products will be entirely off for K-12 student accounts until school administrators explicitly turn them on."], hl: 0, w: 1120, date: "NOV 3, 2026" }, W(4, 0));
  chip(S, "OFF BY DEFAULT", 1000, 850, "lime", 60, W(4, 5), { rot: -2 });
}
// ---- 4. clip 5: a verb ----
{
  const S = sc("blob", "yellow");
  logo(S, "google", 520, 430, 2.0);
  chip(S, "google  (verb)", 1280, 360, "yellow", 90, W(5, 6), { rot: -3 });
  chip(S, "TO LOOK IT UP", 1280, 580, "white", 56, W(5, 13), { rot: 2 });
  chip(S, "1 OF THE 4", 520, 760, "pink", 56, W(5, 2), { rot: 2 });
}
// ---- 5. clips 6-7: 150M users, one toggle ----
{
  const S = sc("drift", "lime");
  logo(S, "googleclassroom", 300, 260, 1.2);
  chip(S, "150M", 820, 430, "lime", 220, W(6, 6), { rot: -3 });
  chip(S, "STUDENTS + TEACHERS (GOOGLE'S NUMBER)", 960, 720, "white", 46, W(6, 9));
  put(S, "p2-toggle", 1560, 430, { s: 1.6, on: false }, W(7, 8), "pop");
  chip(S, "ONE TOGGLE", 1560, 230, "yellow", 54, W(7, 9), { rot: 4 });
}
// ---- 6. clip 8: Phillips: deeply integrated ----
{
  const S = sc("blob", "cyan");
  chip(S, "CHRIS PHILLIPS, GOOGLE EDUCATION", 960, 170, "white", 50, null, { rot: -1 });
  src(S, 960, 520, Object.assign({}, PHIL, { w: 1120 }), W(8, 5));
  chip(S, "DEEPLY INTEGRATED", 1350, 840, "pink", 64, W(8, 15), { rot: 3 });
}
// ---- 7. clip 9: no AI, no Search, just a message ----
{
  const S = sc("drift", "pink");
  const d = dev(S, 330, "thinking", { s: 1.15 });
  chip(S, "NO AI", 820, 260, "lime", 90, W(9, 5), { rot: -3 });
  L.put(S, "sd-arrow", 1000, 260, { to: [240, 0], bend: 0.2, c: "white", t: W(9, 8) });
  chip(S, "NO SEARCH", 1520, 260, "pink", 90, W(9, 9), { rot: 3 });
  put(S, "g5-blocked", 1180, 620, { w: 860 }, W(9, 13));
  swap(S, d, 330, "worried", W(9, 13), { s: 1.15 });
}
// ---- 8. clips 10-11: good news / bad news ----
{
  const S = sc("blob", "lime");
  const d = dev(S, 1620, "smile", { s: 1.0 });
  chip(S, "GOOD NEWS: AN OFF SWITCH", 780, 340, "lime", 80, W(10, 1), { rot: -2 });
  chip(S, "BAD NEWS: IT'S ONE SWITCH", 780, 640, "pink", 80, W(11, 1), { rot: 2 });
  swap(S, d, 1620, "worried", W(11, 7), { s: 1.0 });
  S.punch(780, 640, W(11, 7), 0.05);
}
// ---- 9. clips 12-14: the promise ----
{
  const S = sc("drift", "lime");
  const row = (text, y, c, rot, t) => chip(S, text, 170 + (text.length * 90 * 0.64 + 99) / 2, y, c, 90, t, { rot });
  row("1 WHAT CHANGED", 260, "cyan", -1.5, W(12, 1));
  row("2 IMPOSSIBLE?", 480, "yellow", 1.5, W(13, 4));
  row("3 WHAT TO DO", 700, "lime", -1, W(14, 7));
  dev(S, 1560, "thinking", { s: 1.3 });
}
// ---- 10. clip 15: badge ----
{
  const S = sc("glyphs", "lime");
  L.put(S, "sd-mark", 960, 380, { s: 1.6 });
  L.put(S, "sd-badge", 560, 700, { kind: "PATCH NOTES", date: "NOV 4", s: 1.4, t: W(15, 2) });
}
// ---- 11. clips 16-17: rung 1, August: chatbot on by default ----
{
  const S = sc("drift", "cyan");
  ladder(S, 1, W(16, 2));
  logo(S, "googleclassroom", 1500, 260, 1.1, W(16, 11));
  put(S, "p2-toggle", 1500, 560, { s: 1.3, on: true }, W(16, 8), "pop");
  chip(S, "ON BY DEFAULT", 1500, 790, "lime", 54, W(16, 9), { rot: -2 });
}
// ---- 12. clip 18: until then, 18+ only ----
{
  const S = sc("drift", "cyan");
  ladder(S, 1, 0);
  chip(S, "BEFORE AUGUST:", 1430, 330, "white", 54, null, { rot: -2 });
  chip(S, "18+ ONLY", 1430, 540, "yellow", 120, W(18, 14), { rot: 2 });
  chip(S, "(PER THE AP)", 1430, 740, "white", 44, W(18, 3));
}
// ---- 13. clip 19: a surprise chatbot in the homework app ----
{
  const S = sc("blob", "pink");
  put(S, "dev-chat", 1180, 430, { s: 1.2, title: "homework app", theme: "light", msgs: [{ r: "ai", t: "Hi! I'm new here :)" }], typing: false });
  const d = dev(S, 330, "smile", { s: 1.15 });
  swap(S, d, 330, "shocked", W(19, 9), { s: 1.15 });
  chip(S, "NOT THRILLED", 1180, 850, "pink", 64, W(19, 3), { rot: -3 });
}
// ---- 14. clip 20: rung 2, September: NYC + LA ----
{
  const S = sc("dots", "yellow");
  ladder(S, 2, W(20, 0));
  chip(S, "NEW YORK CITY", 1450, 330, "cyan", 64, W(20, 3), { rot: -2 });
  chip(S, "LOS ANGELES", 1450, 520, "cyan", 64, W(20, 7), { rot: 2 });
  chip(S, "2 BIGGEST DISTRICTS", 1450, 740, "white", 50, W(20, 12));
}
// ---- 15. clip 21: temporary bans ----
{
  const S = sc("dots", "yellow");
  ladder(S, 2, 0);
  put(S, "dev-chat", 1450, 430, { s: 0.9, title: "chatbot", theme: "light", msgs: [{ r: "ai", t: "Ask me anything!" }], typing: false });
  chip(S, "PAUSED", 1450, 430, "pink", 110, W(21, 3), { rot: -8 });
  chip(S, "ELEMENTARY + MIDDLE SCHOOL", 1300, 800, "white", 46, W(21, 8));
}
// ---- 16. clips 22-23: LA's wish (callback setup) ----
{
  const S = sc("blob", "cyan");
  chip(S, "LOS ANGELES", 330, 200, "cyan", 60, null, { rot: -2 });
  const d = dev(S, 330, "thinking", { s: 1.1 });
  L.put(S, "sd-bubble", 1180, 380, { text: "GOOGLE SEARCH|WITH AI OVERVIEWS|TURNED OFF?", size: 64, tx: -520, ty: 200, t: W(22, 5) });
  L.put(S, "sd-hand", 1250, 760, { s: 1.1, rot: -30, t: W(23, 2), pop: true });
  chip(S, "KEEP THIS WISH", 1560, 800, "yellow", 60, W(23, 2), { rot: 3 });
  swap(S, d, 330, "smile", W(22, 15), { s: 1.1 });
}
// ---- 17. clip 24: rung 3: lawmakers ----
{
  const S = sc("drift", "pink");
  ladder(S, 3, W(24, 1));
  put(S, "g5-paper", 1520, 480, { title: "NY CHATBOT|SAFETY LAW", n: 6, w: 500, h: 600, stamp: "PASSED", stampC: "lime" }, W(24, 10));
}
// ---- 18. clips 25-26: two senators, a deadline ----
{
  const S = sc("drift", "pink");
  ladder(S, 3, 0);
  put(S, "prop-envelope", 1350, 400, { s: 2.2 }, W(25, 4), "pop");
  chip(S, "2 U.S. SENATORS", 1350, 200, "white", 54, W(25, 3), { rot: -2 });
  chip(S, "KIDS + AI?", 1660, 560, "cyan", 54, W(25, 11), { rot: 4 });
  chip(S, "DEADLINE: NOV 2", 1400, 780, "yellow", 80, W(26, 3), { rot: -2 });
}
// ---- 19. clip 27: rung 4: Tuesday, a gift with one switch ----
{
  const S = sc("blob", "lime");
  ladder(S, 4, W(27, 1));
  put(S, "prop-gift", 1500, 450, { s: 2.0 }, W(27, 4), "pop");
  chip(S, "CONTROL!", 1500, 230, "lime", 60, W(27, 7), { rot: -4 });
  chip(S, "TECHNICALLY.", 1500, 760, "pink", 80, W(27, 11), { rot: 3 });
}
// ---- 20. clips 28-29: the new setup: everything off ----
{
  const S = sc("glyphs", "cyan", "none");
  put(S, "g5-console", 760, 470, { rows: ROWS(false, false, false, false), w: 900 });
  chip(S, "K-12 STUDENT ACCOUNTS", 760, 130, "white", 50, W(28, 5), { rot: -1 });
  chip(S, "ALL OFF", 1560, 380, "pink", 90, W(28, 14), { rot: 4 });
  chip(S, "EARLY 2027", 1560, 620, "yellow", 64, W(29, 4), { rot: -3 });
}
// ---- 21. clip 30: separate toggles (Google to Engadget) ----
{
  const S = sc("glyphs", "cyan", "none");
  const c0 = put(S, "g5-console", 560, 440, { rows: ROWS(false, false, false, false), w: 860, s: 0.85 });
  S.hide(c0, W(30, 2));
  put(S, "g5-console", 560, 440, { rows: ROWS(true, false, false, false), hl: 0, w: 860, s: 0.85 }, W(30, 2), "pop");
  src(S, 1420, 470, { site: "engadget.com", head: "Google clarified:", body: ["administrators will be able to enable these products individually", "it's not an all-or-nothing deal"], hl: 1, w: 760, size: 34 }, W(30, 7));
}
// ---- 22. clips 31-32: chatbot off, Search on: and Search brings AI ----
{
  const S = sc("glyphs", "pink", "none");
  const c0 = put(S, "g5-console", 620, 470, { rows: ROWS(false, false, false, false), w: 900 });
  S.hide(c0, W(31, 9));
  put(S, "g5-console", 620, 470, { rows: ROWS(false, false, false, true), hl: 3, w: 900 }, W(31, 9), "pop");
  chip(S, "+ AI, ALWAYS", 1530, 720, "pink", 80, W(32, 4), { rot: 4 });
  L.put(S, "sd-arrow", 1400, 600, { to: [-240, 60], bend: -0.3, c: "pink", t: W(32, 4) });
  chip(S, "CHATBOT OFF, SEARCH ON", 620, 130, "lime", 50, W(31, 3), { rot: -1 });
}
// ---- 23. clip 33: flavor one ----
{
  const S = sc("circuit", "cyan");
  chip(S, "SEARCH, IF YOU SWITCH IT ON:", 960, 150, "white", 50, null, { rot: -1 });
  put(S, "g5-menu", 960, 520, { title: "flavor 1 (from early 2027)", items: [{ text: "REGULAR GOOGLE", sub: "AI Overviews + AI chat, like at home", c: "cyan" }], w: 1100 }, W(33, 0));
  logo(S, "google", 1600, 790, 0.9, W(33, 4));
  chip(S, "LIKE AT HOME", 960, 800, "cyan", 56, W(33, 11), { rot: 2 });
}
// ---- 24. clip 34: flavor two: Guided Learning ----
{
  const S = sc("circuit", "lime");
  chip(S, "SEARCH, IF YOU SWITCH IT ON:", 960, 150, "white", 50, null, { rot: -1 });
  put(S, "g5-menu", 820, 520, { title: "flavor 2", items: [{ text: "GUIDED LEARNING", sub: "a tutor mode: coach, don't answer", c: "lime" }], w: 1100 }, W(34, 3));
  put(S, "sport-whistle", 1620, 500, { s: 1.5 }, W(34, 6), "pop");
  chip(S, "TUTOR MODE", 1620, 740, "lime", 56, W(34, 6) + 0.3, { rot: -3 });
}
// ---- 25. clips 35-36: no flavor three ----
{
  const S = sc("circuit", "pink");
  put(S, "g5-menu", 560, 480, { title: "search options", w: 820, s: 0.9, items: [{ text: "REGULAR", sub: "AI Overviews + AI chat", c: "cyan" }, { text: "GUIDED LEARNING", sub: "tutor mode", c: "lime" }] });
  put(S, "g5-menu", 560, 480, { title: "search options", w: 820, s: 0.9, items: [{ text: "REGULAR", sub: "AI Overviews + AI chat", c: "cyan" }, { text: "GUIDED LEARNING", sub: "tutor mode", c: "lime" }, { text: "PLAIN LINKS", strike: true }] }, W(35, 5), "pop");
  src(S, 1450, 480, { site: "qz.com (citing The Wall Street Journal)", head: "No AI-free Search", body: ["Google provides no setting that switches off Search's AI features on their own"], hl: 0, w: 760, size: 34 }, W(36, 1));
}
// ---- 26. clip 37: the TV analogy ----
{
  const S = sc("blob", "yellow");
  put(S, "g5-tv", 700, 430, { ad: "AI! AI! AI!" });
  chip(S, "MUTE THE ADS =", 1450, 260, "white", 56, W(37, 9), { rot: -2 });
  put(S, "g5-remote", 1450, 560, { s: 1.0 }, W(37, 14), "pop");
  chip(S, "POWER OFF", 1450, 860, "pink", 64, W(37, 14) + 0.2, { rot: 3 });
}
// ---- 27. clips 38-40: one flag, two features (our doodle) ----
{
  const S = sc("scan", "lime", "none");
  chip(S, "OUR DOODLE, NOT GOOGLE'S CODE", 960, 110, "yellow", 44, null, { rot: -1 });
  put(S, "dev-code", 820, 520, { s: 1.35, file: "student-policy.js", lang: "js", hl: [6], lines: 8,
    code: "// one flag for the whole school\nconst ai = false;            // school says no\n\nconst policy = {\n  gemini:    ai,\n  classroom: ai,\n  search:    ai,  // ...wait\n};" }, W(38, 3));
  L.put(S, "sd-hand", 1420, 690, { s: 1.0, rot: 180, t: W(39, 1), pop: true });
  chip(S, "USUALLY A BUG", 1560, 330, "pink", 54, W(40, 0), { rot: 3 });
  chip(S, "HERE: THE POLICY", 1560, 480, "lime", 54, W(40, 4), { rot: -2 });
}
// ---- 28. clips 41-42: vendor claim vs no independent evals ----
{
  const S = sc("dots", "pink");
  chip(S, "NOW, THE TUTOR", 960, 120, "white", 50, null, { rot: -1 });
  src(S, 780, 470, { site: "blog.google", head: "Guided Learning", body: ["Our research shows that Guided Learning leads to measurable learning gains for students"], hl: 0, w: 1060 }, W(41, 3));
  chip(S, "VENDOR NUMBERS", 1560, 280, "pink", 54, W(41, 12), { rot: 4 });
  chip(S, "NO INDEPENDENT EVALS CITED (BLOOMBERG)", 900, 800, "white", 46, W(42, 6), { rot: -1 });
}
// ---- 29. clips 43-44: the consumer version wrote the essay ----
{
  const S = sc("glyphs", "yellow");
  put(S, "dev-prompt-box", 640, 300, { s: 1.2, text: "Help with my AP history prompt", w: 900 });
  chip(S, "CONSUMER VERSION", 640, 120, "white", 50, W(43, 2), { rot: -1 });
  put(S, "g5-paper", 1480, 520, { title: "DETAILED|ESSAY", n: 11, w: 500, h: 700 }, W(44, 10));
  chip(S, "NYT REPORTER'S TEST", 640, 620, "cyan", 60, W(44, 5), { rot: 2 });
}
// ---- 30. clip 45: the tutor did the homework ----
{
  const S = sc("blob", "lime");
  put(S, "sport-whistle", 700, 380, { s: 1.6 });
  chip(S, "THE TUTOR", 700, 180, "lime", 56, null, { rot: -3 });
  put(S, "g5-paper", 1060, 560, { title: "HOMEWORK", n: 7, w: 380, h: 500, stamp: "DONE", stampC: "lime" }, W(45, 8));
  const d = dev(S, 1600, "thinking", { s: 1.1 });
  swap(S, d, 1600, "smug", W(45, 9), { s: 1.1 });
}
// ---- 31. clips 46-47: the school version: pilot, transcripts ----
{
  const S = sc("dots", "lime");
  chip(S, "TO BE FAIR", 960, 120, "white", 50, null, { rot: -1 });
  chip(S, "SCHOOL VERSION: PILOT", 640, 330, "lime", 70, W(46, 6), { rot: -2 });
  chip(S, "MORE LIMITS (GOOGLE)", 640, 520, "white", 54, W(46, 12), { rot: 2 });
  put(S, "hist-scroll", 1450, 520, { s: 1.6 }, W(47, 6), "pop");
  put(S, "body-eye", 1450, 300, { s: 0.8 }, W(47, 4), "pop");
  chip(S, "TEACHERS SEE TRANSCRIPTS", 1300, 830, "cyan", 54, W(47, 7), { rot: -1 });
}
// ---- 32. clips 48-49: rollout ----
{
  const S = sc("drift", "cyan");
  logo(S, "googleclassroom", 480, 360, 1.3);
  chip(S, "LIVE WORLDWIDE · NOV 3", 480, 620, "lime", 54, W(48, 7), { rot: -2 });
  put(S, "g5-search", 1400, 350, { q: "physics homework", w: 760, s: 0.9 }, W(49, 1));
  chip(S, "PILOT: SOME U.S. SCHOOLS", 1400, 620, "yellow", 54, W(49, 6), { rot: 2 });
}
// ---- 33. clip 50: the big claim ----
{
  const S = sc("blob", "pink");
  src(S, 1100, 420, Object.assign({}, PHIL, { w: 1060 }));
  const d = dev(S, 300, "smile", { s: 1.1 });
  swap(S, d, 300, "thinking", W(50, 3), { s: 1.1 });
  chip(S, "TOO INTEGRATED?", 1100, 800, "pink", 80, W(50, 9), { rot: -2 });
}
// ---- 34. clips 51-52: 2024: the Web filter ----
{
  const S = sc("scan", "cyan");
  chip(S, "THE PART THE POST SKIPS", 960, 120, "yellow", 50, null, { rot: -1 });
  L.put(S, "sd-year", 420, 430, { year: "2024", size: 220, label: "MAY", t: W(52, 1), pop: true });
  src(S, 1240, 480, { site: "x.com/searchliaison (via techcrunch.com)", head: "Google adds a \"Web\" filter", body: ["We've launched a new \"Web\" filter that shows only text-based links"], hl: 0, w: 900, date: "MAY 14, 2024" }, W(52, 6));
}
// ---- 35. clip 53: Google to The Verge: no AI Overviews there ----
{
  const S = sc("scan", "cyan");
  L.put(S, "sd-year", 300, 200, { year: "2024", size: 120 });
  src(S, 960, 520, { site: "theverge.com", head: "Google now offers 'web' search", body: ["Google spokesperson: AI Overviews \"will not appear when someone uses the web filter for a search.\""], hl: 0, w: 1160, date: "MAY 15, 2024" }, W(53, 2));
  chip(S, "NO AI OVERVIEWS", 1400, 860, "lime", 60, W(53, 9), { rot: 2 });
}
// ---- 36. clips 54-55: built, then tucked under More ----
{
  const S = sc("glyphs", "lime", "none");
  put(S, "g5-search", 860, 360, { q: "photosynthesis", tabs: ["ALL", "IMAGES", "VIDEOS", "MORE ▾"], active: 0, w: 1100 });
  put(S, "g5-search", 860, 360, { q: "photosynthesis", tabs: ["ALL", "IMAGES", "VIDEOS", "MORE ▾"], active: 0, drop: ["WEB", "BOOKS"], dropHl: 0, w: 1100 }, W(55, 8), "pop");
  chip(S, "ALREADY BUILT", 1600, 160, "lime", 56, W(54, 3), { rot: 3 });
  L.put(S, "sd-hand", 855, 735, { s: 1.0, rot: 180, t: W(55, 11), pop: true });
  chip(S, "UNDER MORE", 1500, 760, "yellow", 64, W(55, 11) + 0.2, { rot: -3 });
}
// ---- 37. clip 56: for schools? Google hasn't said ----
{
  const S = sc("blob", "yellow");
  put(S, "g5-search", 1180, 330, { q: "photosynthesis", tabs: ["WEB"], active: 0, w: 760, s: 0.9 });
  const d = dev(S, 330, "thinking", { s: 1.15 });
  chip(S, "FOR SCHOOLS?", 1180, 640, "white", 70, W(56, 4), { rot: -2 });
  chip(S, "GOOGLE HASN'T SAID", 1180, 820, "yellow", 64, W(56, 7), { rot: 2 });
  swap(S, d, 330, "worried", W(56, 7), { s: 1.15 });
}
// ---- 38. clip 57: Ars Technica ----
{
  const S = sc("dots", "cyan");
  chip(S, "ARS TECHNICA, PLAINLY", 960, 140, "white", 50, null, { rot: -1 });
  src(S, 960, 500, { site: "arstechnica.com", head: "Schools can skip AI, but give up search", body: ["Google could make a version of search for schools that doesn't have AI tools, but it's not doing that."], hl: 0, w: 1180, date: "NOV 3, 2026" }, W(57, 5));
  chip(S, "A CHOICE", 1460, 840, "lime", 64, W(57, 16), { rot: 3 });
}
// ---- 39. clip 58: Lina Khan ----
{
  const S = sc("blob", "pink");
  chip(S, "CRITICS WENT FURTHER", 960, 130, "white", 50, null, { rot: -1 });
  chip(S, "LINA KHAN, FORMER FTC CHAIR", 960, 300, "cyan", 60, W(58, 3), { rot: -2 });
  src(S, 960, 600, { site: "apnews.com", head: "Lina Khan, on social media", body: ["\"Google is using its search monopoly to coerce schools into adopting AI.\""], hl: 0, w: 1120 }, W(58, 10));
}
// ---- 40. clip 59: Mayor Mamdani ----
{
  const S = sc("blob", "pink");
  chip(S, "ZOHRAN MAMDANI, NYC MAYOR", 960, 230, "cyan", 60, null, { rot: 2 });
  src(S, 960, 540, { site: "theguardian.com", head: "Posted on X", body: ["\"Google is trying to use its monopoly power to force AI into our public schools.\""], hl: 0, w: 1120 }, W(59, 6));
  chip(S, "MONOPOLY POWER", 1400, 860, "pink", 56, W(59, 11), { rot: -3 });
}
// ---- 41. clips 60-61: Fairplay ----
{
  const S = sc("blob", "lime");
  chip(S, "JOSH GOLIN, FAIRPLAY", 640, 200, "cyan", 60, null, { rot: -2 });
  src(S, 640, 520, { site: "apnews.com", head: "Fairplay's advice", body: ["\"schools should turn off Google's AI tools the minute that option becomes available\""], hl: 0, w: 960, size: 34 }, W(60, 3));
  put(S, "p2-compass", 1520, 470, { s: 1.6 }, W(61, 6), "pop");
  chip(S, "OTHER WAYS TO SEARCH", 1460, 760, "lime", 54, W(61, 7), { rot: 2 });
}
// ---- 42. clip 62: Google's goal ----
{
  const S = sc("drift", "lime");
  put(S, "prop-gift", 360, 500, { s: 2.0 });
  src(S, 1160, 470, { site: "blog.google", head: "Google's stated goal", body: ["\"provide school leaders the control and confidence to use AI products in classrooms as they see fit\""], hl: 0, w: 1000, size: 34 }, W(62, 2));
}
// ---- 43. clip 63: one extra wire ----
{
  const S = sc("drift", "pink");
  put(S, "prop-gift", 520, 470, { s: 2.0 });
  chip(S, "CONTROL", 520, 230, "lime", 60, null, { rot: -4 });
  put(S, "p2-toggle", 1160, 470, { s: 1.4, on: false }, W(63, 3), "pop");
  L.put(S, "sd-arrow", 1290, 470, { to: [230, 0], bend: 0.35, c: "pink", t: W(63, 6) });
  logo(S, "google", 1640, 470, 1.0, W(63, 6) + 0.2);
  chip(S, "+1 EXTRA WIRE", 1160, 790, "pink", 70, W(63, 6), { rot: 2 });
}
// ---- 44. clips 64-65: nothing changes today ----
{
  const S = sc("dots", "lime");
  L.put(S, "sd-counter", 80, 900, { n: 1, of: 3 });
  chip(S, "SO, WHAT NOW?", 960, 160, "white", 54, null, { rot: -1 });
  chip(S, "NOTHING CHANGES TODAY", 960, 420, "lime", 90, W(64, 11), { rot: -2 });
  chip(S, "COMING MONTHS → EARLY 2027", 960, 680, "yellow", 60, W(65, 1), { rot: 2 });
}
// ---- 45. clips 66-68: ask three questions (1, 2) ----
const Q = ["WHAT DO STUDENTS SEE WITH SEARCH OFF?", "WHO READS THE TRANSCRIPTS?", "IS A NO-AI VIEW ON THE TABLE?"];
const qrow = (S, i, t) => L.put(S, "sd-chip", 150 + (Q[i].length * 52 * 0.64 + 57) / 2, 360 + i * 190, Object.assign({ text: (i + 1) + "  " + Q[i], c: ["cyan", "yellow", "lime"][i], size: 52, rot: i % 2 ? 1 : -1 }, t == null ? {} : { t, slide: "right" }));
{
  const S = sc("scan", "cyan");
  L.put(S, "sd-counter", 80, 900, { n: 2, of: 3 });
  chip(S, "ASK THREE QUESTIONS", 960, 150, "white", 54, null, { rot: -1 });
  qrow(S, 0, W(67, 0));
  qrow(S, 1, W(68, 0));
}
// ---- 46. clip 69: question 3 ----
{
  const S = sc("scan", "cyan");
  L.put(S, "sd-counter", 80, 900, { n: 2, of: 3 });
  chip(S, "ASK THREE QUESTIONS", 960, 150, "white", 54, null, { rot: -1 });
  qrow(S, 0); qrow(S, 1);
  qrow(S, 2, W(69, 1));
  chip(S, "LIKE THE WEB FILTER", 1500, 880, "white", 44, W(69, 7), { rot: 2 });
}
// ---- 47. clips 70-71: other engines let you switch AI off ----
{
  const S = sc("drift", "yellow");
  L.put(S, "sd-counter", 80, 900, { n: 3, of: 3 });
  chip(S, "STILL A NO?", 960, 150, "white", 54, null, { rot: -1 });
  logo(S, "duckduckgo", 620, 470, 1.6, W(70, 12));
  put(S, "p2-toggle", 1300, 470, { s: 1.5, on: false }, W(71, 2), "pop");
  chip(S, "AI FEATURES: OFF", 1300, 700, "lime", 60, W(71, 4), { rot: 2 });
  chip(S, "(PER ARS TECHNICA)", 620, 760, "white", 44, W(70, 3));
}
// ---- 48. clip 72: callback: LA's wish ----
{
  const S = sc("blob", "cyan");
  chip(S, "LOS ANGELES", 330, 200, "cyan", 60, null, { rot: -2 });
  dev(S, 330, "thinking", { s: 1.1 });
  L.put(S, "sd-bubble", 1180, 420, { text: "GOOGLE SEARCH|WITH AI OVERVIEWS|TURNED OFF?", size: 64, tx: -520, ty: 200, t: W(72, 3) });
}
// ---- 49. clip 73: Google's answer: two kinds of AI, and a message ----
{
  const S = sc("drift", "pink");
  put(S, "g5-menu", 560, 400, { title: "google's answer", w: 820, s: 0.9, items: [{ text: "REGULAR", sub: "AI Overviews + AI chat", c: "cyan" }, { text: "GUIDED LEARNING", sub: "tutor mode", c: "lime" }] }, W(73, 3));
  put(S, "g5-blocked", 1380, 640, { w: 820, s: 0.85 }, W(73, 11));
  chip(S, "TWO KINDS OF AI", 560, 800, "yellow", 56, W(73, 6), { rot: -2 });
  chip(S, "OR THIS", 1380, 400, "pink", 56, W(73, 10), { rot: 3 });
}
// ---- 50. clip 74: sign-off ----
{
  const S = sc("glyphs", "lime");
  L.put(S, "sd-sting", 960, 470, { s: 1.3, t: W(74, 0) });
  L.put(S, "sd-mark", 960, 220, { s: 0.9 });
}
