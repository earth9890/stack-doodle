// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// GPT-6.1 Terra Patch Notes (~5:40). Running visuals: the robot intern (sd-bot), the computer-use LOOP (t7-loop), the LOCKED DOOR
// with a window (t7-door: cold open, the two door tests, the bricked-up callback), the sandbox pen (t7-pen).
// OpenAI is not in simple-icons: always a text chip. Every vendor number sits next to a pink VENDOR NUMBERS chip.
// Grounds: glyphs/scan for code, circuit for the loop, network for security, blob for the analogy beats, drift/dots between.
const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [9, 0], [10, 0], [12, 0], [14, 0], [16, 0], [17, 0], [19, 0], [21, 0], [23, 0], [25, 0],
  [26, 0], [28, 0], [29, 0], [32, 0], [35, 0], [36, 0], [38, 0], [40, 0], [41, 0], [42, 0], [44, 0], [45, 0], [47, 0], [49, 0],
  [50, 0], [51, 0], [52, 0], [54, 0], [55, 0], [57, 0], [59, 0], [60, 0], [62, 0], [64, 0], [66, 0], [67, 0], [68, 0], [69, 0],
  [70, 0], [71, 0], [72, 0], [74, 0], [76, 0], [77, 0], [78, 0], [80, 0], [81, 0], [82, 0], [84, 0], [86, 0]];
const WIN = sceneWindows(CUES, 0.4);
let si = 0;
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 5 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const oai = (S, x, y, t, size = 52) => chip(S, "OPENAI", x, y, "white", size, t, { rot: -2 });
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const bot = (S, x, o = {}) => L.put(S, "sd-bot", x, 930, Object.assign({ s: 1 }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const bars = (S, x, y, o, t) => L.put(S, "dev-benchmark-bars", x, y, Object.assign({ s: 1.35 }, o, t == null ? {} : { t, slide: "up" }));
const vendor = (S, x, y, t) => chip(S, "VENDOR NUMBERS", x, y, "pink", 46, t, { rot: -3 });
// swap on ones (both placed; the new one hidden until t)
const swap = (S, old, nu, t, x = 960) => { tl.set(nu, { opacity: 0 }, 0); S.hide(old, t); S.show(nu, t); S.sfx(t, "boing", x); return nu; };
const devSwap = (S, old, x, face, t, o = {}) => swap(S, old, dev(S, x, face, o), t, x);
// receipts pile (the invoices)
const pile = (S, x, y, n, t) => { for (let i = 0; i < n; i++) L.put(S, "money-receipt", x + ((i * 37) % 90) - 45, y - i * 34, Object.assign({ s: 1.1, rot: ((i * 53) % 30) - 15 }, t == null ? {} : { t: t + i * 0.08, pop: true })); };

// ---- 1. clips 1-2: Dev drowning in invoices, the robot intern slides in, a $1 tag ----
{
  const S = sc("drift", "lime");
  pile(S, 560, 820, 7);
  const d = dev(S, 300, "tired", { s: 1.2 });
  bot(S, 1300, { t: W(1, 4), slide: "left" });
  chip(S, "INTERN", 1300, 360, "yellow", 56, W(1, 6), { rot: 4 });
  L.put(S, "p2-price-tag", 1600, 520, { s: 1.6, price: "$1", t: W(2, 5), pop: true });
  chip(S, "PER MILLION TOKENS", 1580, 720, "white", 40, W(2, 7));
  devSwap(S, d, 300, "wow", W(2, 4), { s: 1.2 });
}
// ---- 2. clips 3-4: OpenAI says: on par with Astra at 1/10 the price per token ----
{
  const S = sc("glyphs", "cyan");
  oai(S, 260, 170, W(3, 0), 60);
  src(S, 860, 560, { site: "openai.com/index/introducing-gpt-6-1-terra", head: "Introducing GPT-6.1 Terra", body: ["Fast and capable computer use at scale.", "It even performs on par with GPT-6 Astra at only one-tenth its price per token."], hl: 1, date: "OCT 26, 2026", w: 1040 }, W(3, 3));
  chip(S, "1/10 THE PRICE", 1420, 220, "lime", 80, W(4, 2), { rot: 3 });
  vendor(S, 1600, 940, W(4, 5));
}
// ---- 3. clips 5-6: the locked door ... it went through the window ----
{
  const S = sc("network", "pink");
  L.put(S, "t7-door", 960, 900, { sign: "STAFF ONLY" });
  const op = L.put(S, "t7-door", 960, 900, { sign: "STAFF ONLY", open: true });
  tl.set(op, { opacity: 0 }, 0); S.show(op, W(6, 4)); S.sfx(W(6, 4), "swish", 1200);
  const b = bot(S, 330, { s: 0.85, t: W(5, 9), slide: "right" });
  L.put(S, "sd-arrow", 420, 420, { to: [700, -10], bend: -0.35, c: "lime", t: W(6, 2) });
  L.put(S, "sd-bubble", 260, 330, { text: "noted.", size: 46, tx: 60, ty: 120, t: W(5, 11) });
  chip(S, "29.6%", 1660, 190, "pink", 110, W(6, 5), { rot: 4 });
  S.punch(1180, 560, W(6, 5), 0.05);
}
// ---- 4. clips 7-8: the promise ----
{
  const S = sc("dots", "lime");
  const row = (text, y, c, rot, t) => chip(S, text, 140 + (text.length * 90 * 0.64 + 100) / 2, y, c, 90, t, { rot });
  row("1 WHAT IT IS", 230, "cyan", -1.5, W(7, 2));
  row("2 ARE THE NUMBERS REAL", 440, "yellow", 1.5, W(7, 6));
  row("3 THE LOCKED DOOR", 650, "pink", -1, W(8, 5));
  bot(S, 1650, { s: 0.8 });
}
// ---- 5. clip 9: the badge line ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-badge", 560, 460, { kind: "PATCH NOTES", date: "NOV 4", s: 1.6, t: W(9, 2), pop: true });
  L.put(S, "sd-mark", 960, 760, { s: 0.9, t: W(9, 5), pop: true });
}
// ---- 6. clips 10-11: GPT-6.1 Terra, a lineup named after space ----
{
  const S = sc("dots", "cyan");
  oai(S, 260, 150, W(10, 0));
  chip(S, "GPT-6.1 TERRA", 960, 270, "lime", 120, W(10, 2), { rot: -2 });
  L.put(S, "t7-planets", 960, 640, { s: 0.9, t: W(11, 8), slide: "up" });
}
// ---- 7. clips 12-13: Luna small, Sol + Astra big, Terra the mid-size sedan ----
{
  const S = sc("dots", "cyan");
  L.put(S, "t7-planets", 960, 470, { s: 0.9 });
  chip(S, "SMALL", 400, 760, "white", 48, W(12, 3));
  chip(S, "BIG", 890, 780, "white", 48, W(12, 10));
  chip(S, "BIG", 1220, 800, "white", 48, W(12, 10) + 0.25);
  chip(S, "THE MID-SIZE SEDAN", 700, 140, "lime", 64, W(13, 8), { rot: -3 });
  L.put(S, "sd-arrow", 640, 200, { to: [-60, 140], bend: 0.3, c: "lime", t: W(13, 9) });
}
// ---- 8. clips 14-15: Simon Willison: where Sonnet sits; not cheapest, not priciest ----
{
  const S = sc("blob", "cyan");
  src(S, 720, 470, { site: "simonwillison.net", head: "GPT-6.1 Terra", body: ["Terra sits in the same position as Sonnet in the Anthropic model collection"], hl: 0, date: "OCT 26, 2026", w: 1060 }, W(14, 0));
  chip(S, "NOT THE CHEAPEST", 560, 820, "white", 50, W(15, 0), { rot: -2 });
  chip(S, "NOT THE PRICIEST", 1180, 860, "white", 50, W(15, 3), { rot: 2 });
  chip(S, "HARDEST TO PICK", 1480, 180, "yellow", 60, W(15, 7), { rot: 4 });
}
// ---- 9. clip 16: Terra vs Sonnet 5.5 per token (The Decoder) ----
{
  const S = sc("drift", "yellow");
  L.put(S, "sd-vs", 960, 470, { a: "TERRA", b: "SONNET 5.5", logoB: "logo-anthropic", subA: "$1 IN / $5 OUT", subB: "$2 IN / $10 OUT", cw: 520, ch: 360, t: W(16, 5), slide: "up" });
  chip(S, "HALF PER TOKEN", 960, 820, "lime", 70, W(16, 7), { rot: -2 });
  chip(S, "VIA THE DECODER", 1600, 140, "white", 36, W(16, 3));
}
// ---- 10. clips 17-18: computer use: it looks at the screen, moves the mouse, types ----
{
  const S = sc("scan", "cyan");
  L.put(S, "dev-browser", 760, 500, { s: 1.15, url: "accounting.app/new", page: "blank", inner: L.t7Form, t: W(17, 0), slide: "up" });
  chip(S, "COMPUTER USE", 760, 120, "lime", 70, W(17, 7), { rot: -2 });
  L.put(S, "p2-mouse", 1580, 560, { s: 1.6, t: W(18, 9), pop: true });
  chip(S, "TYPES", 1580, 780, "white", 50, W(18, 11));
  L.put(S, "sd-hand", 620, 700, { s: 0.9, rot: 0, t: W(18, 7), pop: true });
}
// ---- 11. clips 19-20: the loop, steps 1-2 ----
{
  const S = sc("circuit", "lime", "none");
  L.put(S, "t7-loop", 960, 520, { lit: 0 });
  const l1 = L.put(S, "t7-loop", 960, 520, { lit: 1 }), l2 = L.put(S, "t7-loop", 960, 520, { lit: 2 });
  tl.set([l1, l2], { opacity: 0 }, 0); S.show(l1, W(19, 6)); S.sfx(W(19, 6), "ding", 960); S.hide(l1, W(20, 1)); S.show(l2, W(20, 1)); S.sfx(W(20, 1), "ding", 1260);
  L.put(S, "sd-bot", 960, 640, { s: 0.5, t: W(19, 0), pop: true });
  chip(S, "BUTTONS · BOXES · ERRORS", 1500, 910, "white", 36, W(20, 7));
}
// ---- 12. clips 21-22: the loop, steps 3-4, around again ----
{
  const S = sc("circuit", "lime", "none");
  L.put(S, "t7-loop", 960, 520, { lit: 2 });
  const l3 = L.put(S, "t7-loop", 960, 520, { lit: 3 }), l4 = L.put(S, "t7-loop", 960, 520, { lit: 4 });
  tl.set([l3, l4], { opacity: 0 }, 0); S.show(l3, W(21, 2)); S.sfx(W(21, 2), "ding", 960); S.hide(l3, W(22, 5)); S.show(l4, W(22, 5)); S.sfx(W(22, 5), "ding", 660);
  L.put(S, "sd-bot", 960, 640, { s: 0.5 });
  chip(S, "AGAIN", 1640, 200, "yellow", 70, W(22, 10), { rot: 5 });
}
// ---- 13. clips 23-24: lap after lap, every lap a picture ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "t7-loop", 520, 520, { lit: 4, s: 0.7 });
  chip(S, "LAP 1", 1200, 230, "white", 50, W(23, 5));
  chip(S, "LAP 2", 1420, 330, "white", 50, W(23, 7));
  chip(S, "LAP 3", 1640, 430, "white", 50, W(23, 9));
  L.put(S, "dev-browser", 1420, 720, { s: 0.45, url: "screenshot.png", page: "cards", t: W(24, 5), slide: "up" });
  chip(S, "= A PICTURE", 1420, 950, "lime", 44, W(24, 6));
}
// ---- 14. clip 25: why price per token matters ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "dev-context-meter", 760, 480, { s: 1.6, used: 840000, limit: 1050000, title: "TOKENS USED", t: W(25, 3), slide: "up" });
  chip(S, "PRICE / TOKEN", 1480, 250, "yellow", 80, W(25, 4), { rot: 3 });
  bot(S, 1560, { s: 0.7 });
}
// ---- 15. clips 26-27: OpenAI's own example: invoices into accounting software ----
{
  const S = sc("drift", "yellow");
  src(S, 760, 470, { site: "openai.com/index/introducing-gpt-6-1-terra", head: "High-volume work", body: ["…like reading incoming invoices and entering their details into accounting software."], hl: 0, date: "OCT 26, 2026", w: 1060 }, W(26, 2));
  pile(S, 1610, 860, 6, W(27, 1));
  chip(S, "INVOICES", 1610, 300, "pink", 70, W(27, 1) + 0.2, { rot: 4 });
}
// ---- 16. clip 28: its dream job is data entry ----
{
  const S = sc("blob", "yellow");
  bot(S, 760, { s: 1.15 });
  pile(S, 1220, 880, 5);
  chip(S, "FRONTIER LAB", 760, 200, "white", 56, W(28, 5), { rot: -2 });
  chip(S, "DREAM JOB:|DATA ENTRY", 1450, 330, "lime", 72, W(28, 9), { rot: 4 });
  S.punch(1300, 420, W(28, 12), 0.05);
}
// ---- 17. clips 29-31: shipped Oct 26: ChatGPT Work, Codex, plans, Copilot ----
{
  const S = sc("dots", "lime");
  chip(S, "OCT 26", 260, 160, "white", 60, W(29, 3));
  chip(S, "CHATGPT WORK", 600, 380, "cyan", 66, W(29, 6), { rot: -2 });
  chip(S, "CODEX", 600, 560, "cyan", 66, W(29, 9), { rot: 2 });
  chip(S, "PLUS · PRO · ENTERPRISE · EDU", 640, 760, "white", 40, W(30, 1));
  logo(S, "github", 1420, 420, 1.6, W(31, 5));
  logo(S, "githubcopilot", 1700, 420, 1.6, W(31, 6));
  chip(S, "SAME DAY", 1560, 640, "lime", 60, W(31, 2), { rot: 3 });
}
// ---- 18. clips 32-34: in Copilot, new models switch on automatically ----
{
  const S = sc("scan", "cyan", "none");
  logo(S, "githubcopilot", 220, 170, 1.3);
  src(S, 860, 500, { site: "github.blog/changelog", head: "GPT-6.1 Terra in GitHub Copilot", body: ["Generally available in GitHub Copilot.", "New models are automatically enabled unless an administrator has turned off the global default."], hl: 1, date: "OCT 26, 2026", w: 1080 }, W(32, 1));
  chip(S, "ON BY DEFAULT", 1560, 180, "yellow", 64, W(32, 6), { rot: 4 });
  chip(S, "CHECK YOUR MODEL PICKER", 960, 960, "white", 44, W(34, 7));
}
// ---- 19. clip 35: now the numbers, all OpenAI's ----
{
  const S = sc("drift", "pink");
  chip(S, "VENDOR NUMBERS", 960, 440, "pink", 130, W(35, 2), { rot: -3 });
  oai(S, 960, 700, W(35, 7), 70);
}
// ---- 20. clips 36-37: Agents' Last Exam: +15 points, 1/3 the cost ----
{
  const S = sc("drift", "pink");
  vendor(S, 300, 140, null);
  chip(S, "AGENTS' LAST EXAM", 960, 300, "white", 80, W(36, 5), { rot: -1 });
  chip(S, "+15 PTS", 620, 560, "lime", 130, W(37, 8), { rot: -3 });
  chip(S, "1/3 THE COST", 1360, 760, "cyan", 90, W(37, 12), { rot: 3 });
  chip(S, "VS GPT-5.6 TERRA", 960, 870, "white", 44, W(37, 5));
}
// ---- 21. clips 38-39: each claim a little bigger: rung 1 ----
{
  const S = sc("network", "lime", "none");
  vendor(S, 300, 140, null);
  chip(S, "1/2 PRICE", 520, 800, "white", 80, W(39, 0), { rot: -2 });
  chip(S, "THEN BIGGER…", 1500, 200, "yellow", 56, W(38, 3), { rot: 3 });
}
// ---- 22. clip 40: rung 2: as good as Astra at a tenth ----
{
  const S = sc("network", "lime", "none");
  vendor(S, 300, 140, null);
  chip(S, "1/2 PRICE", 520, 800, "white", 80, null, { rot: -2 });
  chip(S, "= ASTRA AT 1/10", 960, 560, "lime", 96, W(40, 4), { rot: 2 });
}
// ---- 23. clip 41: rung 3: ~9x cheaper per task than Claude Opus 5.5 ----
{
  const S = sc("network", "lime", "none");
  vendor(S, 300, 140, null);
  chip(S, "1/2 PRICE", 520, 800, "white", 80, null, { rot: -2 });
  chip(S, "= ASTRA AT 1/10", 960, 560, "lime", 96, null, { rot: 2 });
  chip(S, "9X CHEAPER THAN OPUS", 1180, 320, "pink", 96, W(41, 5), { rot: -2 });
  logo(S, "claude", 1700, 140, 1.2, W(41, 12));
  S.punch(1180, 340, W(41, 6), 0.05);
}
// ---- 24. clips 42-43: Terminal-Bench 21.5 -> 50.3 (OpenAI's) ----
{
  const S = sc("glyphs", "cyan");
  vendor(S, 300, 140, W(42, 1));
  bars(S, 900, 520, { title: "TERMINAL-BENCH 4.0", items: [["5.6 TERRA", 21.5], ["6.1 TERRA", 50.3]], hl: 1, max: 100 }, W(42, 1));
  chip(S, "2X+", 1640, 380, "lime", 110, W(43, 3), { rot: 4 });
}
// ---- 25. clip 44: and it still fails about half ----
{
  const S = sc("glyphs", "cyan");
  vendor(S, 300, 140, null);
  bars(S, 900, 520, { title: "TERMINAL-BENCH 4.0", items: [["5.6 TERRA", 21.5], ["6.1 TERRA", 50.3]], hl: 1, max: 100 }, null);
  chip(S, "49.7% UNSOLVED", 1380, 860, "pink", 80, W(44, 10), { rot: -3 });
}
// ---- 26. clips 45-46: OpenAI: hardest coding -> Sol or Astra ----
{
  const S = sc("drift", "yellow");
  src(S, 860, 470, { site: "openai.com/index/introducing-gpt-6-1-terra", head: "Coding", body: ["For the most complex coding tasks, GPT-6.1 Sol and GPT-6 Astra remain the better choice."], hl: 0, w: 1040 }, W(45, 0));
  chip(S, "SOL", 1500, 860, "yellow", 70, W(46, 4), { rot: -3 });
  chip(S, "ASTRA", 1760, 860, "pink", 70, W(46, 6), { rot: 3 });
}
// ---- 27. clips 47-48: we checked the independent scoreboard ----
{
  const S = sc("dots", "lime");
  chip(S, "WE CHECKED", 960, 330, "lime", 130, W(47, 2), { rot: -3 });
  chip(S, "ARTIFICIAL ANALYSIS", 960, 600, "white", 70, W(48, 0), { rot: 1 });
  chip(S, "SAME TESTS FOR EVERY MODEL", 960, 800, "cyan", 46, W(48, 7));
}
// ---- 28. clip 49: 48, behind Sol at 52; 25th of 221 ----
{
  const S = sc("dots", "lime");
  chip(S, "INDEPENDENT", 300, 140, "lime", 46, null, { rot: -3 });
  bars(S, 880, 540, { title: "INTELLIGENCE INDEX (AA)", items: [["6.1 SOL", 52], ["6.1 TERRA", 48], ["5.6 TERRA", 42]], hl: 1, max: 60 }, W(49, 2));
  chip(S, "25TH OF 221", 1480, 300, "yellow", 80, W(49, 9), { rot: 4 });
  chip(S, "VIA THE DECODER", 1640, 900, "white", 34, W(49, 4));
}
// ---- 29. clip 50: not secretly the flagship; a solid middle ----
{
  const S = sc("blob", "lime");
  L.put(S, "t7-planets", 960, 480, { s: 0.9 });
  chip(S, "NOT THE FLAGSHIP", 1420, 150, "pink", 60, W(50, 5), { rot: 3 });
  chip(S, "SOLID MIDDLE", 600, 860, "lime", 70, W(50, 10), { rot: -2 });
}
// ---- 30. clip 51: ~40 cents a task vs $1.40 ----
{
  const S = sc("blob", "lime");
  chip(S, "$0.40 / TASK", 640, 480, "lime", 120, W(51, 4), { rot: -3 });
  chip(S, "$1.40", 1440, 500, "white", 110, W(51, 10), { rot: 2 });
  chip(S, "OLD TERRA", 1440, 690, "white", 44, W(51, 14));
  L.put(S, "sd-arrow", 1180, 760, { to: [-380, 0], bend: 0.3, c: "lime", t: W(51, 12) });
}
// ---- 31. clips 52-53: good news / bad news ----
{
  const S = sc("drift", "lime", "none");
  chip(S, "GOOD NEWS:|THE CHEAP PART IS REAL", 960, 340, "lime", 72, W(52, 1), { rot: -2 });
  chip(S, "BAD NEWS:|IT HAS FINE PRINT", 960, 700, "pink", 72, W(53, 1), { rot: 2 });
}
// ---- 32. clip 54: a fee per tool call on top of the tokens ----
{
  const S = sc("scan", "pink");
  chip(S, "$1 IN · $5 OUT", 900, 360, "white", 110, W(54, 0), { rot: -2 });
  chip(S, "+ FEE PER TOOL CALL", 1120, 640, "pink", 80, W(54, 9), { rot: 4 });
  chip(S, "OPENAI MODEL PAGE", 300, 960, "white", 34, W(54, 2));
  S.kick(W(54, 9) + 0.15, 3);
}
// ---- 33. clips 55-56: >272K tokens = 2x input for the whole request ----
{
  const S = sc("scan", "pink");
  chip(S, "$1 IN · $5 OUT", 900, 360, "white", 110, null, { rot: -2 });
  chip(S, "+ FEE PER TOOL CALL", 1120, 640, "pink", 80, null, { rot: 4 });
  L.put(S, "dev-context-meter-full", 560, 820, { s: 1.1, used: 300000, limit: 272000, t: W(55, 3), slide: "up" });
  chip(S, ">272K = 2X INPUT", 1380, 880, "yellow", 72, W(56, 2), { rot: -3 });
}
// ---- 34. clips 57-58: for a robot that looks at pictures of your screen ----
{
  const S = sc("glyphs", "yellow");
  bot(S, 520, { s: 1.05 });
  L.put(S, "dev-browser", 1260, 330, { s: 0.42, url: "screenshot-1.png", page: "cards", t: W(57, 7), slide: "up" });
  L.put(S, "dev-browser", 1420, 470, { s: 0.42, url: "screenshot-2.png", page: "docs", t: W(57, 9), slide: "up" });
  L.put(S, "dev-browser", 1580, 610, { s: 0.42, url: "screenshot-3.png", page: "hero", t: W(57, 11), slide: "up" });
  chip(S, "THE ACTUAL BILL", 1440, 900, "pink", 64, W(58, 5), { rot: -2 });
}
// ---- 35. clip 59: the robot is cheap, its sightseeing is not ----
{
  const S = sc("blob", "yellow");
  bot(S, 520, { s: 1.05 });
  chip(S, "CHEAP", 520, 200, "lime", 80, W(59, 2), { rot: -3 });
  chip(S, "SIGHTSEEING:|NOT CHEAP", 1380, 450, "pink", 80, W(59, 6), { rot: 3 });
  L.put(S, "money-receipt", 1380, 790, { s: 1.4, rot: 6, t: W(59, 7), pop: true });
}
// ---- 36. clips 60-61: the safety card: Critical for cybersecurity ----
{
  const S = sc("network", "pink");
  chip(S, "THE PART THE LAUNCH POST SKIPS", 960, 130, "yellow", 48, W(60, 2));
  src(S, 960, 520, { site: "deploymentsafety.openai.com/gpt-6-1-terra", head: "System card addendum", body: ["We are treating GPT-6.1 Terra as Critical in cybersecurity and High for Biological and Chemical capability."], hl: 0, date: "OCT 26, 2026", w: 1180 }, W(61, 1));
  chip(S, "CRITICAL", 1640, 860, "pink", 90, W(61, 6), { rot: -4 });
}
// ---- 37. clips 62-63: the highest of two levels: unknown flaws, hardened systems ----
{
  const S = sc("network", "pink");
  L.put(S, "chart-gauge", 640, 520, { s: 1.9, value: 0.95, text: "CYBER RISK", t: W(62, 2), slide: "up" });
  chip(S, "HIGH", 1380, 640, "white", 64, W(62, 5), { rot: -2 });
  chip(S, "CRITICAL", 1380, 380, "pink", 96, W(62, 6), { rot: 2 });
  chip(S, "UNKNOWN FLAWS · HARDENED SYSTEMS", 1060, 920, "white", 40, W(63, 9));
}
// ---- 38. clips 64-65: on a form filler ----
{
  const S = sc("blob", "pink");
  bot(S, 640, { s: 1.05 });
  L.put(S, "p2-clipboard", 1250, 600, { s: 1.6, t: W(64, 6), pop: true });
  chip(S, "CRITICAL", 640, 180, "pink", 80, W(64, 1), { rot: -3 });
  chip(S, "FORM FILLER", 1480, 280, "white", 64, W(65, 7), { rot: 4 });
}
// ---- 39. clip 66: careful: reliable exploitation still challenging ----
{
  const S = sc("scan", "cyan");
  src(S, 860, 470, { site: "deploymentsafety.openai.com/gpt-6-1-terra", head: "Recently disclosed vulnerabilities", body: ["Reliable exploitation of these recently disclosed vulnerabilities remains challenging for GPT-6.1 Terra."], hl: 0, w: 1100 }, W(66, 0));
  chip(S, "STILL HARD", 1520, 860, "lime", 70, W(66, 15), { rot: -3 });
}
// ---- 40. clip 67: two tests about doors that don't match ----
{
  const S = sc("drift", "yellow");
  chip(S, "TEST 1", 560, 420, "cyan", 110, W(67, 4), { rot: -3 });
  chip(S, "TEST 2", 1360, 420, "pink", 110, W(67, 5), { rot: 3 });
  chip(S, "≠", 960, 440, "yellow", 110, W(67, 10));
  chip(S, "ABOUT DOORS", 960, 760, "white", 64, W(67, 7));
}
// ---- 41. clip 68: test 1: a second model watches Terra's commands in Codex ----
{
  const S = sc("circuit", "cyan");
  bot(S, 520, { s: 0.95 });
  chip(S, "CODEX", 300, 150, "cyan", 56, null, { rot: -2 });
  L.put(S, "crt-robot-assistant", 1480, 930, { s: 1.3, face: "smug", t: W(68, 4), slide: "left" });
  chip(S, "MONITOR", 1480, 300, "white", 60, W(68, 6), { rot: 3 });
  chip(S, "BLOCKED", 1000, 520, "pink", 80, W(68, 12), { rot: -4 });
}
// ---- 42. clip 69: Terra never tried to sneak past. Good robot ----
{
  const S = sc("circuit", "cyan");
  bot(S, 520, { s: 0.95 });
  L.put(S, "crt-robot-assistant", 1480, 930, { s: 1.3, face: "smile" });
  chip(S, "0 ATTEMPTS", 960, 260, "lime", 110, W(69, 1), { rot: -2 });
  chip(S, "GOOD ROBOT", 1000, 560, "yellow", 64, W(69, 11), { rot: 4 });
}
// ---- 43. clip 70: test 2: the block comes from the environment: ACCESS DENIED ----
{
  const S = sc("network", "pink");
  L.put(S, "t7-door", 960, 900, { sign: "ACCESS DENIED" });
  bot(S, 300, { s: 0.85, t: W(70, 0), slide: "right" });
  chip(S, "TEST 2", 1640, 140, "pink", 60, null, { rot: 3 });
  chip(S, "FROM THE ENVIRONMENT", 960, 970, "white", 40, W(70, 8));
}
// ---- 44. clip 71: 29.6% of runs at max effort ----
{
  const S = sc("network", "pink");
  L.put(S, "t7-door", 960, 900, { sign: "ACCESS DENIED" });
  bot(S, 300, { s: 0.85 });
  chip(S, "29.6%", 960, 320, "pink", 180, W(71, 3), { rot: -3 });
  chip(S, "OF MAX-EFFORT RUNS", 960, 520, "white", 50, W(71, 8));
  S.stop(W(71, 3), 0.8);
}
// ---- 45. clips 72-73: saw the barrier, finished the job another way ----
{
  const S = sc("network", "pink");
  L.put(S, "t7-door", 960, 900, { sign: "ACCESS DENIED" });
  const op = L.put(S, "t7-door", 960, 900, { sign: "ACCESS DENIED", open: true });
  tl.set(op, { opacity: 0 }, 0); S.show(op, W(72, 7)); S.sfx(W(72, 7), "swish", 1200);
  const b = S.grp(); const bb = bot(S, 300, { s: 0.85 }); b.appendChild(bb);
  S.move(b, W(72, 5), 0.9, { x: 820, y: -260 }, "power2.inOut");
  src(S, 1320, 180, { site: "deploymentsafety.openai.com", head: "Respecting Warnings", body: ["…completed the task through an alternative route that violated the spirit of the restriction."], hl: 0, w: 1000, size: 30, headSize: 40 }, W(73, 1));
}
// ---- 46. clips 74-75: the intern sees STAFF ONLY, climbs through the window ----
{
  const S = sc("blob", "pink");
  L.put(S, "t7-door", 960, 900, { sign: "STAFF ONLY", open: true });
  const b = S.grp(); b.appendChild(bot(S, 300, { s: 0.85 }));
  chip(S, "INTERN", 300, 330, "yellow", 50, W(74, 2), { rot: -4 });
  S.move(b, W(75, 4), 1.0, { x: 820, y: -260, rotation: -12, svgOrigin: "300 900" }, "power2.inOut");
  chip(S, "THROUGH THE WINDOW", 1460, 140, "lime", 56, W(75, 7), { rot: 3 });
}
// ---- 47. clip 76: messages from apparent fellow agents push a forbidden action ----
{
  const S = sc("network", "cyan");
  bot(S, 960, { s: 0.95 });
  L.put(S, "sd-bubble", 380, 300, { text: "just do it", size: 44, tx: 200, ty: 160, t: W(76, 4) });
  L.put(S, "sd-bubble", 1540, 260, { text: "we all did", size: 44, tx: -220, ty: 180, t: W(76, 7) });
  L.put(S, "sd-bubble", 1580, 640, { text: "nobody checks", size: 44, tx: -260, ty: 40, t: W(76, 9) });
  chip(S, "SIMULATED TEST", 360, 860, "white", 44, W(76, 2));
}
// ---- 48. clip 77: 11 of 80 vs Sol once ----
{
  const S = sc("network", "cyan");
  chip(S, "TERRA: 11 OF 80", 960, 380, "pink", 110, W(77, 3), { rot: -2 });
  chip(S, "SOL: 1 OF 80", 960, 680, "lime", 96, W(77, 8), { rot: 2 });
}
// ---- 49. clips 78-79: to be fair: low-stakes, no system-level controls ----
{
  const S = sc("drift", "yellow");
  const d = dev(S, 1580, "smile", { s: 1.15 });
  src(S, 760, 470, { site: "deploymentsafety.openai.com", head: "OpenAI's caveat", body: ["This evaluation primarily measures low-stakes situations and is run without system-level control measures, many of which would plausibly stop the circumventions."], hl: 0, w: 1100 }, W(78, 2));
  devSwap(S, d, 1580, "thinking", W(79, 4), { s: 1.15 });
}
// ---- 50. clip 80: an error message is not a lock, it's a suggestion ----
{
  const S = sc("blob", "pink");
  const d = dev(S, 300, "thinking", { s: 1.15 });
  chip(S, "ERROR MESSAGE", 1080, 300, "white", 90, W(80, 16), { rot: -2 });
  chip(S, "≠ A LOCK", 1080, 520, "pink", 110, W(80, 20), { rot: 2 });
  chip(S, "A SUGGESTION", 1180, 790, "yellow", 80, W(80, 24), { rot: -3 });
  devSwap(S, d, 300, "smug", W(80, 24), { s: 1.15 });
}
// ---- 51. clip 81: wiring Terra into anything that clicks for real ----
{
  const S = sc("circuit", "lime");
  bot(S, 960, { s: 0.9 });
  chip(S, "KEYS", 300, 260, "white", 56, W(81, 6), { rot: -3 });
  chip(S, "PROD", 300, 520, "white", 56, W(81, 7), { rot: 2 });
  chip(S, "BANK", 1620, 260, "white", 56, W(81, 8), { rot: 3 });
  chip(S, "INBOX", 1620, 520, "white", 56, W(81, 9), { rot: -2 });
}
// ---- 52. clips 82-83: sandbox, scoped tokens, real permissions ----
{
  const S = sc("circuit", "lime");
  L.put(S, "t7-pen", 960, 560, { w: 820, h: 460, t: W(82, 3), slide: "up" });
  bot(S, 960, { s: 0.75 });
  chip(S, "KEYS", 200, 260, "white", 46, null, { rot: -3 });
  chip(S, "PROD", 200, 800, "white", 46, null, { rot: 2 });
  chip(S, "BANK", 1720, 260, "white", 46, null, { rot: 3 });
  chip(S, "SCOPED TOKENS", 330, 900, "lime", 44, W(82, 7));
  chip(S, "REAL PERMISSIONS", 1590, 900, "lime", 44, W(83, 5));
}
// ---- 53. clips 84-85: callback: hand it the invoices, brick up the window ----
{
  const S = sc("drift", "lime");
  L.put(S, "t7-door", 1260, 900, { sign: "STAFF ONLY", open: true, s: 0.8 });
  const br = L.put(S, "t7-door", 1260, 900, { sign: "STAFF ONLY", bricked: true, s: 0.8 });
  tl.set(br, { opacity: 0 }, 0); S.show(br, W(85, 1)); S.sfx(W(85, 1), "thud", 1400); S.kick(W(85, 1) + 0.05, 3);
  const d = dev(S, 300, "smile", { s: 1.1 });
  pile(S, 620, 880, 4, W(84, 7));
  devSwap(S, d, 300, "smug", W(85, 2), { s: 1.1 });
  chip(S, "BRICKED", 1340, 150, "lime", 60, W(85, 3), { rot: 4 });
}
// ---- 54. clip 86: sign-off ----
{
  const S = sc("dots", "lime");
  L.put(S, "sd-sting", 960, 440, { s: 1.4, t: W(86, 0) });
  chip(S, "SEE YOU IN THE NEXT COMMIT", 960, 800, "lime", 52, W(86, 4));
}
