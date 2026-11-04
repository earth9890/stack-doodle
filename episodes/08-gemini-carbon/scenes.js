// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// Gemini 4 Carbon Patch Notes (~5:40). Running visuals: the locked Gemini gift box (cold open, the price gag, the callback),
// the velvet rope (defenders only → Fairwind → its holes → the callback), the element tiles ARGON (lazy) / CARBON (bonds),
// the find/prove/fix row with growing VENDOR NUMBERS bars. Grounds rotate per scene (L.sdBg): network for security beats,
// glyphs/scan for benchmarks, blob for the jokes, drift/dots elsewhere. Real people: none on screen. Vendor numbers are labelled.
const CUES = [[1, 0], [3, 0], [5, 0], [6, 0], [8, 0], [10, 0], [12, 0], [13, 0], [15, 0], [16, 0], [18, 0], [19, 0], [21, 0], [23, 0],
  [25, 0], [27, 0], [28, 0], [30, 0], [32, 0], [33, 0], [35, 0], [37, 0], [39, 0], [41, 0], [42, 0], [44, 0], [45, 0], [47, 0], [49, 0],
  [50, 0], [52, 0], [54, 0], [55, 0], [57, 0], [59, 0], [60, 0], [62, 0], [63, 0], [65, 0], [66, 0], [68, 0], [70, 0], [71, 0], [73, 0],
  [74, 0], [75, 0], [77, 0], [79, 0]];
const WIN = sceneWindows(CUES, 0.4);
let si = 0;
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 5 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 940, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const bars = (S, x, y, o, t) => L.put(S, "dev-benchmark-bars", x, y, Object.assign({ s: 1.35 }, o, t == null ? {} : { t, slide: "up" }));
const elem = (S, x, y, o, t) => L.put(S, "g4-elem", x, y, Object.assign({}, o, t == null ? {} : { t, slide: "up" }));
const rope = (S, x, o, t) => L.put(S, "g4-rope", x, 900, Object.assign({ w: 700 }, o, t == null ? {} : { t, slide: "up" }));
const bouncer = (S, x, o = {}) => L.put(S, "sd-suit", x, 930, Object.assign({ s: 1.3, face: "flat", suitC: "#2b2f38" }, o));
const counter = (S, n, t) => L.put(S, "sd-counter", 80, 90, { n, of: 3, size: 40, t });
// swap a cast member's face on ones (both placed; the new one hidden until t)
const swapAny = (S, old, mk, t, x) => { const n = mk(); tl.set(n, { opacity: 0 }, 0); S.hide(old, t); S.show(n, t); S.sfx(t, "boing", x); return n; };
const swap = (S, old, x, face, t, o = {}) => swapAny(S, old, () => dev(S, x, face, o), t, x);
// the locked box: Gemini logo on a gift, chained, with a padlock
const lockedBox = (S, x, y, s, t) => { L.put(S, "prop-gift", x, y, Object.assign({ s: 2.4 * s }, t == null ? {} : { t, slide: "up" }));
  logo(S, "googlegemini", x, y + 40 * s, 0.9 * s, t == null ? null : t + 0.3); L.put(S, "prop-padlock", x + 150 * s, y + 150 * s, Object.assign({ s: 1.1 * s }, t == null ? {} : { t: t + 0.5, pop: true })); };
const STEPS = (S, lit, t) => ["FIND", "PROVE", "FIX"].forEach((w, i) => chip(S, `${i + 1} ${w}`, 560 + i * 400, 150, i === lit ? "lime" : "#3a404c", 64, i === lit ? t : null, { rot: 0 }));
const BAR3 = [["SEC-bench Pro", 88.2], ["ExploitGym", 54.8], ["CWE-bench", 71.0]];

// ---- 1. clips 1-2: the strongest model ever, and you can't use it ----
{
  const S = sc("blob", "cyan");
  lockedBox(S, 1300, 470, 1, W(1, 4));
  chip(S, "GEMINI 4 CARBON", 1300, 170, "cyan", 64, W(2, 5));
  const d = dev(S, 420, "excited", { s: 1.25, pose: "point" });
  swap(S, d, 420, "shocked", W(2, 11), { s: 1.25 });
  chip(S, "YOU CAN'T USE IT", 1300, 820, "pink", 80, W(2, 11), { rot: -2 });
  S.punch(1300, 600, W(2, 11), 0.05);
}
// ---- 2. clips 3-4: the blog post ----
{
  const S = sc("drift", "cyan");
  logo(S, "google", 230, 200, 1.1);
  src(S, 900, 560, { site: "blog.google", head: "Gemini 4 Carbon: our next frontier model", body: ["our strongest model with state-of-the-art", "cybersecurity and long horizon capabilities."], hl: [0, 1], logo: "logo-googlegemini", date: "OCT 28, 2026" }, W(3, 3));
  chip(S, "OCT 28", 1610, 230, "yellow", 70, W(3, 1), { rot: 3 });
  chip(S, "LONG HORIZON", 1600, 880, "lime", 54, W(4, 4));
}
// ---- 3. clip 5: find, prove, fix ----
{
  const S = sc("network", "lime");
  L.put(S, "ep-magnifier", 420, 440, { s: 1.3, t: W(5, 1), pop: true });
  chip(S, "FIND", 420, 760, "cyan", 90, W(5, 1));
  L.put(S, "prop-key", 960, 440, { s: 2.0, t: W(5, 7), pop: true });
  chip(S, "PROVE", 960, 760, "yellow", 90, W(5, 7));
  L.put(S, "med-bandage", 1500, 440, { s: 1.8, t: W(5, 13), pop: true });
  chip(S, "FIX", 1500, 760, "lime", 90, W(5, 13));
}
// ---- 4. clips 6-7: defenders only; everyone else gets a blog post ----
{
  const S = sc("network", "pink");
  lockedBox(S, 1320, 380, 0.8);
  rope(S, 1320, { sign: "CYBER DEFENDERS ONLY" }, W(6, 8));
  const d = dev(S, 400, "thinking", { s: 1.2 });
  swap(S, d, 400, "flat", W(7, 0), { s: 1.2 });
  L.put(S, "label-sticky", 690, 360, { text: "A NICE|BLOG POST", size: 50, c: "yellow", t: W(7, 5), pop: true });
}
// ---- 5. clips 8-9: the promise, items 1-2 ----
const row = (S, text, y, c, rot, t) => chip(S, text, 170 + (text.length * 90 * 0.64 + 99) / 2, y, c, 90, t, { rot });
{
  const S = sc("dots", "lime");
  row(S, "1 WHAT IT DOES", 250, "cyan", -1.5, W(8, 1));
  row(S, "2 WHY IT'S LOCKED", 470, "yellow", 1.5, W(9, 9));
  lockedBox(S, 1540, 470, 0.75);
}
// ---- 6. clips 10-11: item 3 + the badge ----
{
  const S = sc("dots", "lime");
  row(S, "1 WHAT IT DOES", 250, "cyan", -1.5);
  row(S, "2 WHY IT'S LOCKED", 470, "yellow", 1.5);
  row(S, "3 YOUR NEXT WEEK", 690, "lime", -1, W(10, 4));
  lockedBox(S, 1540, 470, 0.75);
  L.put(S, "sd-badge", 1180, 880, { kind: "PATCH NOTES", date: "NOV 4", t: W(11, 2) });
}
// ---- 7. clip 12: Argon, then Carbon, two weeks apart ----
{
  const S = sc("drift", "cyan");
  elem(S, 600, 470, { sym: "Ar", num: 18, name: "ARGON", c: "cyan" }, W(12, 8));
  elem(S, 1320, 470, { sym: "C", num: 6, name: "CARBON", c: "lime" }, W(12, 0));
  L.put(S, "sd-arrow", 790, 470, { to: [330, 0], bend: 0.25, c: "white", t: W(12, 3) });
  chip(S, "+2 WEEKS", 960, 250, "yellow", 64, W(12, 3));
  chip(S, "ROLLED OUT TO EVERYONE", 600, 800, "cyan", 46, W(12, 14));
  chip(S, "DEFENDERS ONLY", 1320, 800, "pink", 46, W(12, 0) + 0.5);
}
// ---- 8. clips 13-14: argon = lazy; carbon bonds with everything ----
{
  const S = sc("blob", "lime");
  const ar = elem(S, 560, 480, { sym: "Ar", num: 18, name: "ARGON", c: "cyan" });
  const arZ = elem(S, 560, 480, { sym: "Ar", num: 18, name: "ARGON", c: "cyan", sleep: true });
  tl.set(arZ, { opacity: 0 }, 0); S.hide(ar, W(13, 10)); S.show(arZ, W(13, 10)); S.sfx(W(13, 10), "boing", 560);
  chip(S, "GREEK: \"LAZY\"", 560, 810, "cyan", 60, W(13, 10), { rot: -2 });
  const c0 = elem(S, 1360, 480, { sym: "C", num: 6, name: "CARBON", c: "lime" });
  const c1 = elem(S, 1360, 480, { sym: "C", num: 6, name: "CARBON", c: "lime", bonds: true });
  tl.set(c1, { opacity: 0 }, 0); S.hide(c0, W(14, 1)); S.show(c1, W(14, 1)); S.sfx(W(14, 1), "pop", 1360);
  chip(S, "BONDS WITH EVERYTHING", 1360, 880, "lime", 54, W(14, 3), { rot: 2 });
}
// ---- 9. clip 15: long horizon ----
{
  const S = sc("circuit", "cyan");
  logo(S, "googlegemini", 330, 300, 1.3, W(15, 0));
  chip(S, "LONG HORIZON", 960, 300, "cyan", 100, W(15, 0));
  chip(S, "ONE HARD PROBLEM", 760, 600, "white", 60, W(15, 6));
  L.put(S, "ep-wall-clock", 1500, 600, { s: 1.2, h: 3, m: 40, t: W(15, 11), pop: true });
}
// ---- 10. clips 16-17: Carbon ran for days ----
{
  const S = sc("glyphs", "lime");
  L.put(S, "sd-bot", 520, 900, { s: 1.15 });
  ["DAY 1", "DAY 2", "DAY 3"].forEach((d, i) => chip(S, d, 1080 + i * 270, 260, i === 2 ? "lime" : "white", 60, W(16, 9) + i * 0.4, { rot: i % 2 ? 2 : -2 }));
  chip(S, "ROOT-CAUSE", 1350, 520, "cyan", 64, W(17, 0));
  chip(S, "PATCH", 1350, 680, "lime", 64, W(17, 2));
  chip(S, "LARGE CODEBASES", 1350, 840, "white", 54, W(17, 6));
}
// ---- 11. clip 18: Dev gives up after one stand-up ----
{
  const S = sc("blob", "yellow");
  L.put(S, "sd-bot", 1450, 900, { s: 1.0 });
  chip(S, "DAY 3", 1450, 340, "lime", 60);
  const d = dev(S, 520, "bored", { s: 1.2 });
  swap(S, d, 520, "sleep", W(18, 9), { s: 1.2 });
  L.put(S, "ep-mug-coffee", 800, 930, { s: 0.8, t: W(18, 4) });
  L.put(S, "ep-mug-coffee", 920, 930, { s: 0.8, t: W(18, 8) });
  chip(S, "1 STAND-UP", 640, 260, "pink", 70, W(18, 10), { rot: -3 });
}
// ---- 12. clips 19-20: the home inspector ----
{
  const S = sc("drift", "yellow");
  L.put(S, "g4-wall", 1250, 480, {});
  L.put(S, "sd-dev", 430, 930, { s: 1.2, face: "thinking", hoodie: "#ffd23f", t: W(20, 3), slide: "right" });
  L.put(S, "p2-clipboard", 640, 560, { s: 1.4, t: W(20, 12), pop: true });
  chip(S, "\"CRACK IN WALL\"", 640, 260, "white", 54, W(20, 9), { rot: -3 });
  chip(S, "HOME INSPECTOR", 1250, 860, "yellow", 54, W(20, 3));
}
// ---- 13. clips 21-22: finds it, leans on it, fills it ----
{
  const S = sc("drift", "yellow");
  const g = S.grp(); const w0 = L.put(S, "g4-wall", 1250, 480, { parent: g });
  L.put(S, "sd-dev", 430, 930, { s: 1.2, face: "determined", hoodie: "#ffd23f" });
  L.put(S, "ep-magnifier", 1230, 360, { s: 1.0, t: W(21, 2), pop: true });
  chip(S, "FIND", 1250, 140, "cyan", 60, W(21, 2));
  [0, 0.12, 0.24, 0.36].forEach((k, i) => S.move(g, W(21, 5) + k, 0.12, { rotation: i % 2 ? -1.6 : 1.6, svgOrigin: "1250 740" }, "sine.inOut"));
  S.move(g, W(21, 5) + 0.48, 0.15, { rotation: 0, svgOrigin: "1250 740" });
  S.kick(W(21, 5), 3);
  chip(S, "PROVE", 1250 - 260, 140, "yellow", 60, W(21, 10));
  const w1 = L.put(S, "g4-wall", 1250, 480, { patch: true }); tl.set(w1, { opacity: 0 }, 0); S.show(w1, W(22, 2)); S.sfx(W(22, 2), "stamp", 1250);
  chip(S, "FIX", 1250 + 260, 140, "lime", 60, W(22, 2));
}
// ---- 14-16. clips 23-27: find / prove / fix with the vendor's numbers growing ----
{
  const S = sc("scan", "lime", "none");
  STEPS(S, 0, W(23, 2));
  bars(S, 960, 560, { items: BAR3.slice(0, 1), max: 100, title: "GOOGLE'S NUMBERS" }, W(23, 6));
  chip(S, "VENDOR NUMBERS", 1600, 900, "pink", 50, W(23, 3), { rot: -3 });
  chip(S, "REAL VULNERABILITIES", 400, 900, "cyan", 46, W(24, 3));
}
{
  const S = sc("scan", "yellow", "none");
  STEPS(S, 1, W(25, 2));
  bars(S, 960, 560, { items: BAR3.slice(0, 1), max: 100, title: "GOOGLE'S NUMBERS" });
  bars(S, 960, 560, { items: BAR3.slice(0, 2), max: 100, title: "GOOGLE'S NUMBERS", hl: 1 }, W(26, 2));
  chip(S, "VENDOR NUMBERS", 1600, 900, "pink", 50);
  chip(S, "BUG → WORKING EXPLOIT", 400, 900, "yellow", 46, W(25, 12));
}
{
  const S = sc("scan", "lime", "none");
  STEPS(S, 2, W(27, 2));
  bars(S, 960, 560, { items: BAR3.slice(0, 2), max: 100, title: "GOOGLE'S NUMBERS", hl: 1 });
  bars(S, 960, 560, { items: BAR3, max: 100, title: "GOOGLE'S NUMBERS", hl: 2 }, W(27, 16));
  chip(S, "VENDOR NUMBERS", 1600, 900, "pink", 50);
  chip(S, "FLAW → PATCH", 400, 900, "lime", 46, W(27, 9));
}
// ---- 17. clips 28-29: Chrome team, 10x better patches than an unnamed lab ----
{
  const S = sc("network", "cyan");
  logo(S, "googlechrome", 420, 330, 1.5);
  chip(S, "CHROME TEAM (PER GOOGLE)", 420, 560, "white", 44, W(28, 5));
  chip(S, "10X BETTER PATCHES", 1200, 300, "lime", 90, W(28, 13), { rot: -2 });
  L.put(S, "label-sticky", 1200, 650, { text: "ANOTHER|LAB: ???", size: 58, c: "pink", t: W(29, 1), pop: true });
  chip(S, "POLITELY UNNAMED", 1200, 900, "white", 50, W(29, 9), { rot: 2 });
}
// ---- 18. clips 30-31: Artificial Analysis index ----
{
  const S = sc("glyphs", "cyan", "none");
  chip(S, "INDEPENDENT", 300, 150, "lime", 54, W(30, 4), { rot: -2 });
  chip(S, "ARTIFICIAL ANALYSIS INDEX v5", 1160, 150, "white", 46);
  bars(S, 960, 560, { items: [["Gemini 4 Carbon", 59], ["Claude Opus 5.5", 58], ["GPT-6 Astra", 57]], max: 70, hl: 0 }, W(30, 9));
  chip(S, "#1", 1650, 420, "lime", 110, W(30, 11), { rot: 4 });
}
// ---- 19. clip 32: photo finish ----
{
  const S = sc("drift", "lime");
  L.put(S, "g4-finish", 1250, 500, { t: W(32, 2), slide: "left" });
  chip(S, "+1 POINT", 1580, 860, "lime", 80, W(32, 0), { rot: -3 });
  chip(S, "PHOTO FINISH", 1500, 160, "white", 60, W(32, 11));
}
// ---- 20. clips 33-34: good news / bad news ----
{
  const S = sc("blob", "pink");
  L.put(S, "prop-padlock", 960, 860, { s: 1.3 });
  chip(S, "GOOD NEWS:", 520, 300, "lime", 84, W(33, 6), { rot: -2 });
  chip(S, "BEST AT EXPLOITS", 1260, 300, "white", 84, W(33, 13), { rot: 1 });
  chip(S, "BAD NEWS:", 520, 620, "pink", 84, W(34, 0), { rot: 2 });
  chip(S, "BEST AT EXPLOITS", 1260, 620, "white", 84, W(34, 7), { rot: -1 });
  S.stop(W(34, 9), 0.8);
}
// ---- 21. clips 35-36: one key, two doors; a prompt has no badge ----
{
  const S = sc("network", "yellow");
  L.put(S, "g4-door", 720, 880, { text: "PATCH", c: "lime", t: W(35, 3), slide: "up" });
  L.put(S, "g4-door", 1200, 880, { text: "ATTACK", c: "pink", t: W(35, 12), slide: "up" });
  L.put(S, "prop-key", 960, 200, { s: 1.6, t: W(35, 1), pop: true });
  chip(S, "SAME SKILL", 960, 360, "yellow", 64, W(35, 9));
  L.put(S, "label-sticky", 1620, 520, { text: "PROMPT:|NO BADGE", size: 50, c: "white", t: W(36, 2), pop: true });
}
// ---- 22. clips 37-38: a deliberate approach, US pre-release testing ----
{
  const S = sc("drift", "cyan");
  src(S, 900, 520, { site: "blog.google", head: "Introducing Gemini 4 Carbon", body: ["We're taking a deliberate approach to rollout", "and are actively engaged in the U.S. government's", "voluntary process for pre-release model testing."], hl: [0, 2], logo: "logo-google", w: 1100 });
  chip(S, "DELIBERATE", 1650, 200, "lime", 60, W(37, 6), { rot: 4 });
  chip(S, "PRE-RELEASE TESTING", 960, 900, "cyan", 54, W(38, 10));
}
// ---- 23. clips 39-40: Fairwind, 650+ partners ----
{
  const S = sc("network", "lime");
  rope(S, 1100, { sign: "FAIRWIND" }, W(39, 4));
  const b = bouncer(S, 1620);
  L.put(S, "p2-clipboard", 1520, 640, { s: 1.0, t: W(39, 4) + 0.4 });
  chip(S, "650+ PARTNERS", 560, 300, "lime", 84, W(40, 8), { rot: -2 });
  chip(S, "PER FORBES", 560, 460, "white", 44, W(40, 2));
}
// ---- 24. clip 41: who goes first ----
{
  const S = sc("network", "lime");
  rope(S, 1100, { sign: "FAIRWIND" });
  bouncer(S, 1620);
  chip(S, "1 GOVERNMENTS", 480, 240, "cyan", 60, W(41, 1));
  chip(S, "2 CRITICAL INFRASTRUCTURE", 590, 400, "yellow", 60, W(41, 2));
  chip(S, "3 CORE TECH PLATFORMS", 540, 560, "lime", 60, W(41, 5));
}
// ---- 25. clips 42-43: the rules ----
{
  const S = sc("scan", "cyan");
  const R = [["BACKGROUND CHECK", "white", W(42, 2)], ["PHISHING-RESISTANT MFA", "cyan", W(42, 6)], ["PEN TESTING ✓", "lime", W(43, 5)], ["MALWARE ANALYSIS ✓", "lime", W(43, 8)], ["BUILDING MALWARE ✗", "pink", W(43, 13)]];
  R.forEach(([t, c, tt], i) => chip(S, t, 700, 150 + i * 165, c, 64, tt, { rot: i % 2 ? 1.5 : -1.5 }));
  bouncer(S, 1550, { face: "smug" });
}
// ---- 26. clip 44: the dress code ----
{
  const S = sc("blob", "pink");
  rope(S, 860, { sign: "DRESS CODE: 2FA" }, W(44, 2));
  bouncer(S, 1450, { face: "smug" });
  L.put(S, "prop-phone", 1560, 560, { s: 1.0, t: W(44, 8), pop: true });
  chip(S, "NIGHTCLUB", 560, 220, "yellow", 70, W(44, 2), { rot: -3 });
}
// ---- 27. clips 45-46: guardrails off ----
{
  const S = sc("glyphs", "pink");
  src(S, 860, 480, { site: "forbes.com", head: "Google Limits Gemini 4 Carbon To Vetted Cyber Defenders", body: ["Google says it ran its external cybersecurity", "tests without guardrails, so the numbers describe", "the model with refusals off."], hl: [0, 1], w: 1080 });
  L.put(S, "sd-hand", 300, 470, { s: 1.0, rot: 0, t: W(45, 6), pop: true });
  chip(S, "= THE RAW MODEL", 700, 870, "white", 54, W(46, 5), { rot: 2 });
  chip(S, "GUARDRAILS: OFF", 1560, 870, "pink", 80, W(45, 12), { rot: -3 });
}
// ---- 28. clips 47-48: not reproduced ----
{
  const S = sc("scan", "pink", "none");
  bars(S, 900, 520, { items: BAR3, max: 100, title: "GOOGLE'S NUMBERS", hl: 2 });
  L.put(S, "ep-magnifier", 1400, 380, { s: 1.4, t: W(47, 4), pop: true });
  chip(S, "GOOGLE'S OWN TESTING", 900, 120, "white", 54, W(47, 7));
  chip(S, "NOT REPRODUCED YET", 1300, 880, "pink", 80, W(48, 2), { rot: 2 });
}
// ---- 29. clip 49: vendor claim, 2x fewer unsupported claims ----
{
  const S = sc("drift", "pink");
  logo(S, "googlegemini", 330, 300, 1.2);
  chip(S, "VENDOR NUMBERS", 330, 520, "pink", 54, W(49, 0));
  chip(S, "~2X FEWER", 1170, 360, "white", 110, W(49, 4), { rot: -2 });
  chip(S, "UNSUPPORTED CLAIMS VS ARGON", 1170, 600, "white", 54, W(49, 6));
}
// ---- 30. clips 50-51: independent accuracy ----
{
  const S = sc("glyphs", "lime", "none");
  chip(S, "INDEPENDENT: ARTIFICIAL ANALYSIS", 960, 130, "lime", 54, W(50, 0));
  bars(S, 960, 560, { items: [["Argon accuracy", 48], ["Carbon accuracy", 58]], max: 100, hl: 1, title: "AA-OMNISCIENCE" }, W(51, 2));
}
// ---- 31. clips 52-53: hallucination rate went up ----
{
  const S = sc("glyphs", "pink", "none");
  chip(S, "INDEPENDENT: ARTIFICIAL ANALYSIS", 960, 130, "lime", 54);
  bars(S, 800, 560, { items: [["Argon hallucination", 4], ["Carbon hallucination", 11]], max: 20, hl: 1, title: "HALLUCINATION RATE %" }, W(52, 2));
  const d = dev(S, 1650, "thinking", { s: 1.0 });
  swap(S, d, 1650, "worried", W(52, 4), { s: 1.0 });
  chip(S, "KNOWS MORE. GUESSES MORE.", 960, 930, "pink", 54, W(53, 5));
}
// ---- 32. clip 54: still #1 on that test ----
{
  const S = sc("dots", "lime");
  L.put(S, "sport-trophy", 620, 520, { s: 2.0 });
  chip(S, "54", 1250, 400, "lime", 200, W(54, 9), { rot: -3 });
  chip(S, "BEST ANY MODEL HAS SCORED", 1250, 700, "white", 54, W(54, 12));
}
// ---- 33. clips 55-56: behind Opus at programming ----
{
  const S = sc("drift", "cyan");
  logo(S, "claude", 480, 360, 1.5, W(55, 7));
  chip(S, "CODING: OPUS 5.5 AHEAD", 1200, 360, "white", 64, W(55, 12));
  chip(S, "(ARTIFICIAL ANALYSIS)", 1200, 500, "cyan", 40, W(55, 1));
  chip(S, "NOT BEST AT EVERYTHING", 960, 780, "yellow", 84, W(56, 9), { rot: -2 });
}
// ---- 34. clips 57-58: the price ----
{
  const S = sc("dots", "yellow");
  const t0 = L.put(S, "p2-price-tag", 640, 500, { s: 2.6, color: "yellow", price: "$2 / $10" });
  chip(S, "PER 1M TOKENS IN / OUT", 640, 800, "white", 46, W(57, 9));
  chip(S, "INTRO = SAME AS ARGON", 640, 180, "cyan", 50, W(57, 17));
  L.put(S, "p2-price-tag", 1340, 500, { s: 2.6, color: "pink", price: "$4 / $20", t: W(58, 2), pop: true });
  chip(S, "LATER", 1340, 180, "pink", 60, W(58, 0));
  chip(S, "END DATE: ?", 1340, 800, "white", 60, W(58, 11), { rot: 3 });
}
// ---- 35. clip 59: an introductory price for a model you can't buy ----
{
  const S = sc("blob", "yellow");
  lockedBox(S, 960, 480, 1.05);
  chip(S, "SALE!", 1420, 260, "pink", 100, W(59, 3), { rot: 8 });
  chip(S, "NOT FOR SALE (YET)", 960, 860, "white", 70, W(59, 9), { rot: -2 });
}
// ---- 36. clips 60-61: Anthropic did it first ----
{
  const S = sc("network", "cyan");
  logo(S, "anthropic", 260, 200, 1.1, W(61, 2));
  src(S, 1000, 560, { site: "forbes.com", head: "Carbon Next To Glasswing", body: ["Anthropic took the same route in April with", "Glasswing … access to Claude Mythos Preview."], hl: 0, w: 1100 }, W(61, 0));
  chip(S, "NOT THE FIRST", 1560, 180, "yellow", 64, W(60, 1), { rot: 3 });
}
// ---- 37. clip 62: two labs, strongest cyber model skipped the public ----
{
  const S = sc("network", "pink");
  lockedBox(S, 560, 400, 0.8);
  L.put(S, "prop-gift", 1360, 400, { s: 1.9 }); logo(S, "anthropic", 1360, 430, 0.75); L.put(S, "prop-padlock", 1480, 520, { s: 0.9 });
  rope(S, 960, { w: 1500, sign: "2 LABS. NO PUBLIC." }, W(62, 2));
  chip(S, "STRONGEST CYBER MODELS", 960, 120, "white", 54, W(62, 6));
}
// ---- 38. clips 63-64: the part the launch post skips ----
{
  const S = sc("drift", "pink");
  const d = dev(S, 380, "smile", { s: 1.2 });
  swap(S, d, 380, "thinking", W(63, 1), { s: 1.2 });
  chip(S, "THE CATCH", 380, 200, "pink", 70, W(63, 3), { rot: -3 });
  [0, 1, 2, 3].forEach((i) => L.put(S, "dev-issue-card", 1200 + i * 30, 300 + i * 150, { s: 0.9, title: ["Heap overflow in parser", "Auth bypass", "Path traversal", "Use after free"][i], num: 412 + i * 7, labels: [["bug", "red"]], t: W(64, 3) + i * 0.4, slide: "left" }));
}
// ---- 39. clip 65: the bottleneck moves to triage ----
{
  const S = sc("drift", "pink");
  [0, 1, 2, 3, 4].forEach((i) => L.put(S, "dev-issue-card", 1250 + (i % 2) * 40, 160 + i * 130, { s: 0.75, title: ["Heap overflow in parser", "Auth bypass", "Path traversal", "Use after free", "SSRF in webhook"][i], num: 412 + i * 7, labels: [["bug", "red"]] }));
  L.put(S, "dev-dev-at-desk", 470, 930, { s: 1.0, face: "tired", t: W(65, 8), slide: "up" });
  chip(S, "TRIAGE", 470, 220, "yellow", 110, W(65, 9), { rot: -3 });
  chip(S, "HUMANS CONFIRM + SHIP", 470, 380, "white", 46, W(65, 13));
}
// ---- 40-41. clips 66-69: the gate's holes ----
{
  const S = sc("network", "pink");
  rope(S, 1350, { sign: "FAIRWIND" });
  bouncer(S, 1780, { s: 1.1 });
  chip(S, "THE GATE'S HOLES", 520, 180, "pink", 70, W(66, 3), { rot: -2 });
  chip(S, "1 CHECKED ONCE", 520, 420, "white", 60, W(67, 11));
  chip(S, "WORKOS, VIA FORBES", 520, 900, "cyan", 40, W(67, 1));
}
{
  const S = sc("network", "pink");
  rope(S, 1350, { sign: "FAIRWIND" });
  bouncer(S, 1780, { s: 1.1 });
  chip(S, "THE GATE'S HOLES", 520, 180, "pink", 70);
  chip(S, "1 CHECKED ONCE", 520, 420, "white", 60);
  chip(S, "2 COMPANY, NOT PERSON", 600, 580, "white", 60, W(68, 3));
  chip(S, "3 LIST: PRIVATE", 520, 740, "white", 60, W(69, 4));
  chip(S, "WORKOS, VIA FORBES", 520, 900, "cyan", 40);
}
// ---- 42. clip 70: the bouncer and the classified guest list ----
{
  const S = sc("blob", "pink");
  bouncer(S, 560, { s: 1.4, face: "smug" });
  chip(S, "ID: CHECKED ONCE", 560, 140, "white", 54, W(70, 3));
  L.put(S, "label-sticky", 1300, 480, { text: "GUEST LIST:|CLASSIFIED", size: 60, c: "pink", t: W(70, 14), pop: true });
  S.punch(1300, 480, W(70, 15), 0.05);
}
// ---- 43. clips 71-72: next week, 1: Argon is out today ----
{
  const S = sc("dots", "lime");
  counter(S, 1, W(72, 0));
  const d = dev(S, 400, "thinking", { s: 1.2 });
  swap(S, d, 400, "smile", W(72, 9), { s: 1.2 });
  elem(S, 1250, 470, { sym: "Ar", num: 18, name: "ARGON", c: "cyan" }, W(72, 9));
  chip(S, "AVAILABLE TODAY", 1250, 840, "lime", 64, W(72, 7));
}
// ---- 44. clip 73: where Argon is ----
{
  const S = sc("dots", "lime");
  counter(S, 1);
  elem(S, 520, 470, { sym: "Ar", num: 18, name: "ARGON", c: "cyan" });
  logo(S, "google", 1040, 260, 0.9, W(73, 2));
  chip(S, "AI STUDIO", 1400, 260, "white", 64, W(73, 2));
  chip(S, "GEMINI API", 1400, 470, "white", 64, W(73, 6));
  chip(S, "GOOGLE CLOUD", 1400, 680, "white", 64, W(73, 11));
}
// ---- 45. clip 74: 2: budget for the real price ----
{
  const S = sc("scan", "yellow");
  counter(S, 2, W(74, 0));
  chip(S, "BUDGET: $4 / $20", 960, 380, "lime", 120, W(74, 10), { rot: -2 });
  chip(S, "NOT $2 / $10 (INTRO)", 960, 660, "pink", 70, W(74, 13), { rot: 2 });
}
// ---- 46. clips 75-76: 3: interest form, but build triage first ----
{
  const S = sc("circuit", "lime");
  counter(S, 3, W(75, 0));
  L.put(S, "p2-clipboard", 400, 470, { s: 1.8, t: W(75, 8), pop: true });
  chip(S, "INTEREST FORM", 400, 760, "cyan", 54, W(75, 8));
  chip(S, "BUGS", 900, 470, "pink", 70, W(76, 7));
  L.put(S, "sd-arrow", 1010, 470, { to: [160, 0], bend: 0.2, c: "white", t: W(76, 7) + 0.3 });
  chip(S, "TRIAGE", 1330, 470, "yellow", 90, W(76, 3));
  L.put(S, "sd-arrow", 1480, 470, { to: [140, 0], bend: 0.2, c: "white", t: W(76, 3) + 0.4 });
  chip(S, "FIX", 1730, 470, "lime", 70, W(76, 12));
  chip(S, "BUILD THIS FIRST", 1330, 760, "yellow", 54, W(76, 5));
}
// ---- 47. clips 77-78: callback, lazy gas vs the element behind the rope ----
{
  const S = sc("blob", "cyan");
  elem(S, 460, 440, { sym: "Ar", num: 18, name: "ARGON", c: "cyan", sleep: true });
  chip(S, "THE LAZY GAS", 460, 800, "cyan", 54, W(77, 7));
  elem(S, 1340, 400, { sym: "C", num: 6, name: "CARBON", c: "lime", bonds: true }, W(78, 6));
  rope(S, 1340, { w: 760, sign: "DEFENDERS ONLY" }, W(78, 17));
  S.punch(1340, 600, W(78, 18), 0.05);
}
// ---- 48. clip 79: sign-off ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-sting", 960, 460, { s: 1.4, t: W(79, 0) });
  chip(S, "THAT'S THE STACK, DOODLED.", 960, 820, "white", 60, W(79, 2));
}
