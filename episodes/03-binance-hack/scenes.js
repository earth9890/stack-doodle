// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// Binance hack postmortem (~6 min). Running visuals: the escalation LADDER (4 rungs), the POWER OF ATTORNEY paper (EIP-7702),
// the fake video-call tiles (cold open + callback). Grounds rotate per scene (L.sdBg): network for crypto, glyphs/scan for code,
// circuit for infra, blob for people beats. Engineers are victims: no gags at their expense; people are generic doodles / labels.
// Security: report-level only. The pyenv swap is shown as "same path" inspection output, never the commands that did it.
const CUES = [[1, 0], [2, 0], [3, 0], [4, 0], [6, 0], [9, 0], [10, 0], [11, 0], [12, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0],
  [20, 0], [22, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [31, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0],
  [40, 0], [41, 0], [42, 0], [43, 0], [45, 0], [46, 0], [47, 0], [48, 0], [49, 0], [51, 0], [52, 0], [53, 0], [54, 0], [56, 0], [58, 0],
  [59, 0], [61, 0], [62, 0], [64, 0], [66, 0], [67, 0], [68, 0], [70, 0], [71, 0], [73, 0], [75, 0], [77, 0], [79, 0], [81, 0],
  [83, 0], [85, 0], [87, 0]];
const WIN = sceneWindows(CUES, 0.3);
// punch words that end a clip get a longer hold: push that cut later (scene numbers 1-based)
[1, 10, 23, 49, 53, 55, 61].forEach((n) => { WIN[n - 1][1] += 0.3; WIN[n][0] += 0.3; });
let si = 0;
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 7 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const tile = (S, x, y, o, t) => L.put(S, "b3-tile", x, y, Object.assign({}, o, t == null ? {} : { t, slide: "up" }));
const term = (S, x, y, lines, o = {}, t) => L.put(S, "dev-terminal", x, y, Object.assign({ s: 1.7, lines, cursor: false }, o, t == null ? {} : { t, slide: "up" }));
const paper = (S, x, y, o, t) => L.put(S, "b3-paper", x, y, Object.assign({}, o, t == null ? {} : { t, slide: "up" }));
// swap Dev's face on ones (both placed; the new one hidden until t)
const swap = (S, old, x, face, t, o = {}) => { const n = dev(S, x, face, o); tl.set(n, { opacity: 0 }, 0); S.hide(old, t); S.show(n, t); S.sfx(t, "boing", x); return n; };
const LAD = ["A LIST OF NAMES", "A LAPTOP INSIDE", "A ROBOT PASSWORD", "THE SIGNING SERVICE"];
// the ladder scene: rungs lit up to n-1 from the start, rung n lights on its word
const ladder = (S, n, t) => { L.put(S, "b3-ladder", 520, 520, { lit: n - 1, labels: LAD, size: 46 }); L.put(S, "b3-ladder", 520, 520, { lit: n, labels: LAD, size: 46, t }).setAttribute("data-layout-allow-overlap", ""); S.sfx(t, "ding", 700); };

// ---- 1. clip 1: cold open, a video interview, an assignment folder, a vault behind ----
{
  const S = sc("network", "yellow");
  L.put(S, "p2-safe", 1560, 560, { s: 2.2 });
  logo(S, "binance", 1560, 250, 1.1, W(1, 2));
  tile(S, 900, 380, { name: "HIRING!", hc: "lime", badge: true }, W(1, 6));
  const d = dev(S, 330, "smile", { s: 1.2 });
  L.put(S, "p2-folder", 900, 760, { s: 1.6, color: "yellow", t: W(1, 14), slide: "up" });
  chip(S, "assignment/", 900, 640, "lime", 56, W(1, 17));
  S.punch(900, 700, W(1, 17), 0.06);
  swap(S, d, 330, "smug", W(1, 15), { s: 1.2 });
}
// ---- 2. clip 2: $6.34B, the report card ----
{
  const S = sc("network", "yellow");
  logo(S, "binance", 260, 220, 1.2);
  src(S, 760, 600, { site: "x.com/binance", head: "Initial incident report", body: ["~USD 6.34B digital assets impacted", "Incident on 29 Oct 2026"], hl: 0, logo: "logo-binance", w: 980 }, W(2, 1));
  chip(S, "$6.34B", 1400, 330, "pink", 150, W(2, 2), { rot: 3 });
  chip(S, "OCT 29", 1400, 760, "white", 70, W(2, 12), { rot: -2 });
}
// ---- 3. clip 3: the FBI says North Korea ----
{
  const S = sc("network", "pink");
  src(S, 960, 470, { site: "FBI statement, Oct 31 (via AP)", head: "North Korea responsible", body: ["The FBI refers to this activity as \"TraderTraitor.\""], hl: 0, w: 1000 }, W(3, 1));
  chip(S, "FBI: NORTH KOREA", 960, 830, "pink", 80, W(3, 6), { rot: -2 });
}
// ---- 4. clips 4-5: luckily / unluckily ----
{
  const S = sc("blob", "lime");
  chip(S, "LUCKILY: $2.85B FROZEN", 860, 330, "lime", 84, W(4, 0), { rot: -2 });
  L.put(S, "p2-snowman", 1660, 380, { s: 1.0, t: W(4, 6), pop: true });
  chip(S, "UNLUCKILY: $3.49B NOT", 860, 620, "pink", 84, W(5, 0), { rot: 2 });
  const d = dev(S, 1620, "smile", { s: 1.0 });
  swap(S, d, 1620, "worried", W(5, 3), { s: 1.0 });
}
// ---- 5. clips 6-8: the promise ----
{
  const S = sc("drift", "lime");
  const row = (text, y, c, rot, t) => chip(S, text, 170 + (text.length * 90 * 0.64 + 99) / 2, y, c, 90, t, { rot });
  row("1 THE FAKE JOB", 250, "cyan", -1.5, W(6, 4));
  row("2 THE STOP BUTTON", 470, "yellow", 1.5, W(7, 6));
  row("3 YOUR LAPTOP", 690, "lime", -1, W(8, 4));
  L.put(S, "sd-badge", 1240, 880, { kind: "POSTMORTEM", date: "NOV 4", t: W(8, 5) });
}
// ---- 6. clip 9: hot wallet ----
{
  const S = sc("circuit", "cyan");
  L.put(S, "p2-safe", 430, 560, { s: 1.8, t: W(9, 0) });
  chip(S, "COLD = OFFLINE", 430, 860, "cyan", 54, W(9, 1));
  L.put(S, "money-wallet", 1300, 500, { s: 2.6, t: W(9, 1), slide: "up" });
  chip(S, "HOT = ONLINE", 1300, 250, "pink", 64, W(9, 5));
  chip(S, "PAYS YOUR WITHDRAWALS", 1300, 830, "lime", 54, W(9, 11));
}
// ---- 7. clip 10: MPC ----
{
  const S = sc("circuit", "yellow");
  logo(S, "binance", 220, 200, 1.0);
  chip(S, "M P C", 960, 330, "yellow", 160, W(10, 4));
  chip(S, "MULTI-PARTY COMPUTATION", 960, 640, "white", 64, W(10, 5));
}
// ---- 8. clip 11: the key splits into shares on three machines ----
{
  const S = sc("circuit", "yellow");
  const key = L.put(S, "prop-key", 960, 260, { s: 2.2 });
  S.hide(key, W(11, 3));
  [460, 960, 1460].forEach((x, i) => {
    L.put(S, "dev-server", x, 640, { s: 1.0, t: W(11, 6) + i * 0.35 });
    L.put(S, "b3-share", x, 360, { label: `SHARE ${i + 1}/3`, t: W(11, 3) + i * 0.3, pop: true });
  });
  chip(S, "THE WHOLE KEY NEVER EXISTS", 960, 880, "lime", 56, W(11, 12));
}
// ---- 9. clips 12-13: nothing to steal (remember this) ----
{
  const S = sc("dots", "lime");
  const d = dev(S, 420, "thinking");
  swap(S, d, 420, "smug", W(12, 4));
  chip(S, "NOTHING TO STEAL", 1220, 380, "lime", 96, W(12, 6), { rot: -2 });
  L.put(S, "label-sticky", 1300, 720, { text: "REMEMBER THIS", size: 54, c: "yellow", t: W(13, 0), pop: true });
}
// ---- 10. clip 14: not October. June ----
{
  const S = sc("drift", "cyan");
  chip(S, "NOT OCTOBER", 960, 330, "white", 90, null, { rot: -2 });
  chip(S, "JUNE", 960, 640, "lime", 200, W(14, 8), { rot: 2 });
}
// ---- 11. clip 15: a search for an AI coding tool ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "dev-browser", 960, 500, { s: 1.15, url: "search", page: "blank" });
  chip(S, "POPULAR AI CODING TOOL", 960, 470, "cyan", 60, W(15, 5));
  L.put(S, "dev-ai-sparkle", 960, 660, { s: 0.9, t: W(15, 6), pop: true });
}
// ---- 12. clip 16: a tampered Homebrew download from a search ad ----
{
  const S = sc("glyphs", "pink");
  L.put(S, "dev-browser", 960, 500, { s: 1.15, url: "search", page: "blank" });
  chip(S, "AD", 600, 330, "yellow", 60, W(16, 12));
  logo(S, "homebrew", 960, 470, 1.6, W(16, 1));
  chip(S, "TAMPERED", 1180, 640, "pink", 70, W(16, 6), { rot: -6 });
  chip(S, "VIA A SEARCH AD (REUTERS)", 960, 900, "white", 46, W(16, 9));
}
// ---- 13. clip 17: caught, laptop replaced, creds rotated ----
{
  const S = sc("drift", "lime");
  L.put(S, "dev-shield-lock", 460, 480, { s: 1.6, c: "blue", t: W(17, 1), slide: "up" });
  chip(S, "LAPTOP REPLACED ✓", 1260, 380, "lime", 64, W(17, 3));
  chip(S, "CREDS ROTATED ✓", 1260, 600, "lime", 64, W(17, 7));
}
// ---- 14. clip 18: but the wallet team was exposed ----
{
  const S = sc("blob", "pink");
  L.put(S, "dev-shield-lock", 460, 480, { s: 1.6, c: "blue" });
  L.put(S, "label-sticky", 1240, 480, { text: "WALLET TEAM: A, B, C...", size: 60, c: "pink", t: W(18, 5), slide: "up" });
  chip(S, "ROLES EXPOSED", 1240, 840, "white", 56, W(18, 7));
}
// ---- 15. clip 19: ladder rung 1 ----
{ const S = sc("drift", "lime"); ladder(S, 1, W(19, 5)); }
// ---- 16. clips 20-21: September, a job-platform message from a company that doesn't exist ----
{
  const S = sc("blob", "cyan");
  chip(S, "SEPTEMBER", 400, 160, "white", 64, W(20, 1));
  src(S, 900, 520, { site: "job platform · messages", head: "Hi! I'm a Project Director", body: ["Exciting role for someone with your experience."], hl: 0, w: 960 }, W(20, 7));
  chip(S, "SOFTWARE ENGINEER B", 1500, 180, "cyan", 46, W(20, 2));
  chip(S, "COMPANY: DOESN'T EXIST", 1300, 880, "pink", 60, W(21, 6), { rot: -2 });
}
// ---- 17. clips 22-23: the HR video interview, then the CEO ----
{
  const S = sc("blob", "cyan");
  tile(S, 560, 420, { name: "HR", hc: "cyan", badge: true });
  chip(S, "PERSONAL PHOTOS", 560, 720, "yellow", 52, W(22, 12));
  tile(S, 1360, 420, { name: "CEO", hc: "yellow", badge: true }, W(23, 1));
  chip(S, "CHAT APP", 1360, 720, "white", 52, W(23, 6));
}
// ---- 18. clip 24: the CEO was also fake ----
{
  const S = sc("blob", "pink");
  tile(S, 560, 420, { name: "HR", hc: "cyan", badge: true });
  tile(S, 1360, 420, { name: "CEO", hc: "yellow", badge: true });
  tile(S, 1360, 420, { name: "CEO", hc: "yellow", badge: true, fake: true, t: W(24, 4) }).setAttribute("data-layout-allow-overlap", "");
  S.sfx(W(24, 4), "stamp", 1360);
  chip(S, "MOST REALISTIC STARTUP", 960, 820, "lime", 64, W(24, 10), { rot: -2 });
}
// ---- 19. clip 25: the assignment ----
{
  const S = sc("glyphs", "lime");
  L.put(S, "p2-folder", 520, 470, { s: 1.8, color: "yellow" });
  chip(S, "assignment/", 520, 330, "lime", 56);
  L.put(S, "modern-laptop-code", 1350, 480, { s: 1.5, t: W(25, 8), slide: "up" });
  chip(S, "WORK COMPUTER", 1350, 760, "pink", 56, W(25, 9));
  L.put(S, "sd-arrow", 760, 470, { to: [330, 0], bend: 0.25, c: "lime", t: W(25, 6) });
  chip(S, "$ setup", 960, 900, "white", 46, W(25, 10));
}
// ---- 20. clip 26: setup ran the malicious code; a zero-day ----
{
  const S = sc("scan", "pink");
  term(S, 520, 420, ["$ setup", "installing...", "done ✓"], { title: "assignment" }, W(26, 0));
  L.put(S, "sd-bug", 760, 760, { s: 0.9, mood: "smug", t: W(26, 3), pop: true });
  src(S, 1360, 520, { site: "Binance report", head: "Malicious code ran during setup", body: ["0-day not detected by endpoint tools"], hl: 0, w: 860, size: 38 }, W(26, 8));
}
// ---- 21. clip 27: it replaced pyenv ----
{
  const S = sc("scan", "lime", "none");
  term(S, 760, 470, ["$ which pyenv", "/opt/homebrew/bin/pyenv"], { title: "zsh" });
  chip(S, "pyenv", 1480, 300, "yellow", 70, W(27, 7));
  logo(S, "python", 1480, 560, 1.3, W(27, 10));
  chip(S, "PICKS YOUR PYTHON VERSION", 1400, 820, "white", 44, W(27, 11));
}
// ---- 22. clip 28: a malicious copy at the exact same path ----
{
  const S = sc("scan", "pink", "none");
  term(S, 760, 470, ["$ which pyenv", "/opt/homebrew/bin/pyenv", "-> Cellar/pyenv/2.8.0/libexec"], { title: "zsh" });
  chip(S, "SAME PATH", 1500, 300, "pink", 80, W(28, 8), { rot: 3 });
  logo(S, "homebrew", 1500, 620, 1.3, W(28, 12));
}
// ---- 23. clips 29-30: before / after: same name, same command, same folder, different everything ----
{
  const S = sc("scan", "lime", "none");
  const L1 = ["$ which pyenv", "/opt/homebrew/bin/pyenv"];
  term(S, 500, 380, L1, { title: "BEFORE", s: 1.45 });
  term(S, 1420, 380, L1, { title: "AFTER", s: 1.45 }, W(29, 0));
  chip(S, "NAME ✓", 420, 760, "lime", 54, W(29, 0) + 0.2);
  chip(S, "COMMAND ✓", 960, 760, "lime", 54, W(29, 2));
  chip(S, "FOLDER ✓", 1500, 760, "lime", 54, W(29, 4));
  L.put(S, "sd-bug", 1700, 560, { s: 0.8, mood: "smug", t: W(30, 4), pop: true });
  chip(S, "EVERYTHING ELSE ✗", 960, 920, "pink", 54, W(30, 6));
  S.punch(1420, 420, W(30, 6), 0.05);
}
// ---- 24. clips 31-32: it worked perfectly, and phoned home ----
{
  const S = sc("glyphs", "pink");
  const d = dev(S, 330, "smile");
  L.put(S, "modern-laptop-code", 860, 560, { s: 1.3 });
  chip(S, "$ pyenv  ✓ WORKS", 860, 300, "lime", 54, W(31, 7));
  L.put(S, "sd-arrow", 1100, 520, { to: [420, -160], bend: -0.3, c: "pink", t: W(32, 7) });
  L.put(S, "cloud-puffy", 1650, 330, { s: 1.2, t: W(32, 9), pop: true });
  chip(S, "ATTACKER", 1650, 520, "pink", 56, W(32, 10));
  chip(S, "(BITCOIN MAGAZINE)", 1550, 880, "white", 40, W(32, 3));
}
// ---- 25. clip 33: ladder rung 2 ----
{ const S = sc("drift", "lime"); ladder(S, 2, W(33, 2)); }
// ---- 26. clip 34: Oct 20, an internal AI tool as a springboard ----
{
  const S = sc("circuit", "cyan");
  chip(S, "OCT 20", 300, 160, "white", 64, W(34, 1));
  L.put(S, "dev-ai-sparkle", 960, 420, { s: 1.4, t: W(34, 7), pop: true });
  chip(S, "INTERNAL AI TOOL", 960, 680, "cyan", 70, W(34, 8));
  chip(S, "SPRINGBOARD", 960, 860, "yellow", 54, W(34, 8), { rot: -3 });
}
// ---- 27. clip 35: two more engineers' computers, A and C ----
{
  const S = sc("circuit", "cyan");
  L.put(S, "dev-ai-sparkle", 960, 300, { s: 1.0 });
  L.put(S, "prop-laptop", 480, 640, { s: 1.6, t: W(35, 4), slide: "up" });
  L.put(S, "prop-laptop", 1440, 640, { s: 1.6, t: W(35, 4) + 0.4, slide: "up" });
  chip(S, "A", 480, 870, "pink", 70, W(35, 5));
  chip(S, "C", 1440, 870, "pink", 70, W(35, 7));
  L.put(S, "sd-arrow", 860, 360, { to: [-320, 160], bend: 0.3, c: "pink", t: W(35, 1) });
  L.put(S, "sd-arrow", 1060, 360, { to: [320, 160], bend: -0.3, c: "pink", t: W(35, 2) });
}
// ---- 28. clip 36: a container deployment token on A ----
{
  const S = sc("circuit", "yellow");
  L.put(S, "prop-laptop", 480, 600, { s: 1.6 });
  chip(S, "A", 480, 860, "pink", 70);
  L.put(S, "prop-key", 1300, 420, { s: 1.8, t: W(36, 5), pop: true });
  chip(S, "CONTAINER|DEPLOY TOKEN", 1300, 700, "yellow", 70, W(36, 7));
}
// ---- 29. clip 37: a token is a password for robots ----
{
  const S = sc("drift", "yellow");
  L.put(S, "crt-robot-helper", 520, 900, { s: 1.3, face: "happy", t: W(37, 5), slide: "up" });
  chip(S, "A PASSWORD FOR ROBOTS", 1200, 300, "yellow", 70);
  L.put(S, "dev-container", 1200, 620, { s: 1.4, c: "teal", label: "app", t: W(37, 11), pop: true });
  logo(S, "binance", 1620, 620, 0.9, W(37, 12));
}
// ---- 30. clips 38-39: an AI tool was involved: as a tour guide ----
{
  const S = sc("blob", "cyan");
  L.put(S, "dev-ai-sparkle", 560, 460, { s: 1.6 });
  chip(S, "TOUR GUIDE", 560, 200, "yellow", 60, W(39, 9), { rot: -6 });
  chip(S, "WROTE THE ATTACK ✗", 1340, 380, "white", 60, W(39, 2));
  chip(S, "GAVE A TOUR ✓", 1340, 600, "lime", 60, W(39, 9) + 0.3);
}
// ---- 31. clip 40: ladder rung 3 ----
{ const S = sc("drift", "lime"); ladder(S, 3, W(40, 2)); }
// ---- 32. clip 41: Oct 29, 17:15 UTC, Engineer C's computer ----
{
  const S = sc("network", "pink");
  chip(S, "OCT 29 · 17:15 UTC", 700, 200, "white", 70, W(41, 0));
  L.put(S, "prop-laptop", 960, 600, { s: 1.9, t: W(41, 11), slide: "up" });
  chip(S, "C", 960, 880, "pink", 70, W(41, 12));
}
// ---- 33. clip 42: A's token, a container, one script ----
{
  const S = sc("network", "pink");
  L.put(S, "prop-laptop", 400, 600, { s: 1.4 });
  chip(S, "C", 400, 840, "pink", 60);
  L.put(S, "prop-key", 820, 420, { s: 1.2, t: W(42, 3), pop: true });
  L.put(S, "dev-container", 1180, 560, { s: 1.3, c: "teal", label: "app", t: W(42, 6), slide: "down" });
  chip(S, "1 SCRIPT", 1580, 400, "pink", 70, W(42, 9), { rot: 3 });
}
// ---- 34. clips 43-44: the wallet signing service says yes ----
{
  const S = sc("circuit", "lime");
  L.put(S, "dev-container", 280, 540, { s: 1.0, c: "teal", label: "app" });
  L.put(S, "sd-arrow", 440, 540, { to: [300, 0], bend: 0.15, c: "pink", t: W(43, 2) });
  L.put(S, "dev-server", 960, 520, { s: 1.4, t: W(43, 4), slide: "up" });
  chip(S, "WALLET SIGNING SERVICE", 960, 230, "white", 56, W(43, 5));
  chip(S, "YES", 960, 800, "lime", 80, W(43, 11), { rot: -6 });
  L.put(S, "sd-arrow", 1160, 540, { to: [300, 0], bend: 0.15, c: "pink", t: W(44, 3) });
  L.put(S, "money-wallet", 1640, 540, { s: 1.6, t: W(44, 3), pop: true });
  chip(S, "OUTSIDE THE WITHDRAWAL PROCESS", 1100, 940, "pink", 44, W(44, 6));
}
// ---- 35. clip 45: 233.46M XRP out of five hot wallets ----
{
  const S = sc("network", "yellow");
  chip(S, "20:05 UTC", 760, 200, "white", 64, W(45, 1));
  logo(S, "xrp", 700, 520, 1.5, W(45, 10));
  chip(S, "233.46M XRP", 1380, 720, "pink", 110, W(45, 11), { rot: -2 });
  chip(S, "5 HOT WALLETS", 1420, 300, "yellow", 56, W(45, 7));
}
// ---- 36. clip 46: four minutes ----
{
  const S = sc("drift", "yellow");
  chip(S, "4 MINUTES", 620, 460, "pink", 150, W(46, 0), { rot: -2 });
  L.put(S, "dev-pr-diff", 1460, 640, { s: 0.9, title: "fix: typo", state: "open", t: W(46, 9), slide: "up" });
  chip(S, "AWAITING REVIEW", 1460, 300, "white", 54, W(46, 9));
}
// ---- 37. clip 47: SOL and OP ----
{
  const S = sc("network", "cyan");
  logo(S, "solana", 500, 380, 1.4, W(47, 1));
  logo(S, "optimism", 1420, 380, 1.4, W(47, 3));
  chip(S, "~970,500 SOL", 500, 700, "cyan", 80, W(47, 9));
  chip(S, "44.2M OP", 1420, 700, "pink", 80, W(47, 13));
}
// ---- 38. clip 48: then 18,270 bitcoin ----
{
  const S = sc("network", "yellow");
  logo(S, "bitcoin", 960, 360, 2.0);
  chip(S, "18,270 BTC", 960, 720, "yellow", 140, W(48, 6), { rot: 2 });
}
// ---- 39. clips 49-50: an alert, withdrawals paused, the end of the story (it wasn't) ----
{
  const S = sc("circuit", "pink");
  L.put(S, "prop-alarm-clock", 400, 420, { s: 1.6, t: W(49, 3), pop: true });
  chip(S, "LARGE TRANSFERS", 400, 720, "pink", 56, W(49, 6));
  chip(S, "WITHDRAWALS PAUSED", 1240, 360, "white", 90, W(49, 9), { rot: -2 });
  const d = dev(S, 1300, "worried", { s: 0.95 });
  swap(S, d, 1300, "smile", W(50, 2), { s: 0.95 });
}
// ---- 40. clip 51: but, EIP-7702 ----
{
  const S = sc("glyphs", "cyan");
  const d = dev(S, 1640, "smile", { s: 1.0 });
  logo(S, "ethereum", 400, 300, 1.3, W(51, 2));
  chip(S, "EIP-7702", 400, 480, "cyan", 100, W(51, 12));
  src(S, 1050, 770, { site: "eips.ethereum.org", head: "EIP-7702: Set Code for EOAs", body: ["...execute the code pointed to by the delegation."], hl: 0, w: 900, size: 34 }, W(51, 15));
  swap(S, d, 1640, "worried", W(51, 0), { s: 1.0 });
}
// ---- 41. clip 52: a wallet hands execution rights to a smart contract, keeps its key ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "money-wallet", 420, 500, { s: 2.0 });
  L.put(S, "prop-key", 420, 800, { s: 1.0, t: W(52, 12), pop: true });
  chip(S, "KEY STAYS ✓", 420, 920, "lime", 44, W(52, 13));
  L.put(S, "sd-arrow", 680, 480, { to: [300, 0], bend: -0.25, c: "lime", t: W(52, 5) });
  chip(S, "EXECUTION RIGHTS", 820, 330, "yellow", 52, W(52, 7));
  L.put(S, "dev-code", 1440, 520, { s: 1.0, size: 34, code: "contract Delegate {\n  // acts for\n  // the wallet\n}", lang: "js", file: "contract", t: W(52, 11), slide: "left" });
}
// ---- 42. clip 53: built for nice things ----
{
  const S = sc("dots", "lime");
  chip(S, "BUILT FOR:", 960, 220, "white", 70, W(53, 2));
  chip(S, "BATCHED PAYMENTS", 960, 470, "lime", 80, W(53, 7));
  chip(S, "APPS PAY YOUR FEES", 960, 720, "lime", 80, W(53, 12));
}
// ---- 43. clips 54-55: think of it as a power of attorney ----
{
  const S = sc("blob", "yellow");
  paper(S, 960, 470, { title: "POWER OF|ATTORNEY", to: "NAMED: A CONTRACT", seal: "yellow" });
  L.put(S, "money-wallet", 360, 520, { s: 1.6, t: W(55, 1), pop: true });
  chip(S, "STILL YOURS", 360, 800, "lime", 54, W(55, 3));
  L.put(S, "crt-robot-helper", 1580, 880, { s: 1.0, face: "happy", t: W(55, 7), slide: "left" });
  chip(S, "ACTS FOR IT", 1580, 300, "yellow", 54, W(55, 10));
}
// ---- 44. clips 56-57: fifty signing transactions, delegations to the attackers' contract ----
{
  const S = sc("network", "pink");
  chip(S, "50", 430, 400, "pink", 220, W(56, 8), { rot: -3 });
  chip(S, "SIGNING TXS", 430, 640, "white", 64, W(56, 9));
  [0, 1, 2].forEach((i) => paper(S, 1180 + i * 70, 500 + i * 30, { title: "POWER OF|ATTORNEY", to: "TO: ATTACKER CONTRACT", seal: "pink", w: 460, h: 560, tsize: 44 }, i ? W(57, 3) + i * 0.6 : null));
  L.put(S, "dev-server", 1700, 260, { s: 0.7 });
}
// ---- 45. clip 58: the wallet signed every single one ----
{
  const S = sc("network", "pink");
  L.put(S, "dev-server", 460, 520, { s: 1.4 });
  chip(S, "SIGNING SERVICE", 460, 820, "white", 50);
  ["SIGNED ✓", "SIGNED ✓", "SIGNED ✓"].forEach((t, i) => chip(S, t, 1300, 300 + i * 200, "lime", 70, W(58, 2) + i * 0.6, { rot: i % 2 ? 2 : -2 }));
  chip(S, "IT'S ITS WHOLE JOB", 1300, 920, "yellow", 46, W(58, 9));
}
// ---- 46. clips 59-60: pausing withdrawals closed the front counter; a power of attorney doesn't use it ----
{
  const S = sc("drift", "pink");
  L.put(S, "b3-counter", 760, 930, { t: W(59, 0) });
  chip(S, "WITHDRAWALS PAUSED", 760, 120, "white", 56, W(59, 2), { rot: -2 });
  const bot = L.put(S, "crt-robot-helper", 1700, 900, { s: 0.9, face: "happy", t: W(60, 0), slide: "left" });
  S.move(bot, W(60, 5), 1.4, { x: 1450 }, "power1.inOut");
  L.put(S, "b3-paper", 1560, 330, { title: "POWER OF|ATTORNEY", seal: "pink", w: 380, h: 460, tsize: 36, t: W(60, 2), slide: "up" });
}
// ---- 47. clip 61: to cancel, sign a new authorization ----
{
  const S = sc("circuit", "yellow");
  paper(S, 960, 480, { title: "CANCEL|DELEGATION", to: "NEEDS: WALLET SIGNATURE", seal: "gray" }, W(61, 1));
  chip(S, "SIGN HERE", 1400, 820, "yellow", 56, W(61, 5), { rot: -4 });
}
// ---- 48. clips 62-63: MPC bites; a special procedure; the clock runs ----
{
  const S = sc("circuit", "yellow");
  [460, 960, 1460].forEach((x, i) => { L.put(S, "dev-server", x, 560, { s: 0.9 }); L.put(S, "b3-share", x, 300, { label: `SHARE ${i + 1}/3` }); });
  chip(S, "NO SINGLE KEY", 960, 820, "pink", 80, W(62, 10));
  chip(S, "SPECIAL PROCEDURE", 600, 950, "yellow", 46, W(63, 4));
  L.put(S, "p2-clock-12", 1640, 860, { s: 0.9, h: 11, m: 0, t: W(63, 8), pop: true });
}
// ---- 49. clips 64-65: callback: nothing to steal... nothing to use fast either ----
{
  const S = sc("dots", "lime");
  const d = dev(S, 420, "smug");
  chip(S, "NOTHING TO STEAL", 1220, 340, "lime", 96, W(64, 0), { rot: -2 });
  chip(S, "NOTHING TO USE FAST", 1220, 620, "pink", 96, W(65, 2), { rot: 2 });
  swap(S, d, 420, "shocked", W(65, 5));
  S.stop(W(65, 5), 0.8);
  S.punch(1220, 620, W(65, 5), 0.05);
}
// ---- 50. clip 66: the last transfer, 23:56 ----
{
  const S = sc("network", "cyan");
  chip(S, "23:56 UTC", 560, 260, "white", 80, W(66, 13));
  logo(S, "ethereum", 560, 560, 1.3);
  chip(S, "2,961.9 ETH · LAST", 1300, 560, "pink", 70, W(66, 5));
}
// ---- 51. clip 67: 00:10, the delegation points at the zero address ----
{
  const S = sc("network", "lime");
  chip(S, "00:10 UTC", 420, 300, "white", 80, W(67, 0));
  paper(S, 1040, 520, { title: "POWER OF|ATTORNEY", to: "TO: 0x0000...0000", seal: "pink", stamp: "REVOKED", stampC: "lime" }, W(67, 4));
  chip(S, "~4 HOURS", 1520, 820, "lime", 80, W(67, 16), { rot: -3 });
}
// ---- 52. clips 68-69: TraderTraitor, same as Bybit ----
{
  const S = sc("network", "pink");
  src(S, 860, 420, { site: "FBI statement (via Security Affairs)", head: "TraderTraitor", body: ["North Korea... was responsible for the theft of more than $6 billion USD"], hl: 0, w: 1000, size: 34 }, W(68, 1));
  chip(S, "SAME NAME AS BYBIT 2025 ($1.5B)", 960, 840, "yellow", 56, W(69, 6));
}
// ---- 53. clip 70: North Korea calls it absurd ----
{
  const S = sc("blob", "pink");
  chip(S, "NORTH KOREA:", 960, 360, "white", 80, W(70, 0));
  chip(S, "\"ABSURD\"", 960, 620, "pink", 140, W(70, 5), { rot: -2 });
}
// ---- 54. clips 71-72: Binance covers it; 98% replenished ----
{
  const S = sc("dots", "yellow");
  logo(S, "binance", 480, 400, 1.6, W(71, 0));
  chip(S, "BINANCE COVERS IT", 480, 720, "yellow", 64, W(71, 3));
  chip(S, "98%", 1340, 460, "lime", 200, W(72, 2), { rot: 2 });
  chip(S, "REPLENISHED", 1340, 830, "lime", 60, W(72, 7));
}
// ---- 55. clips 73-74: users OK; the exchange lost about four Bybits ----
{
  const S = sc("drift", "yellow");
  chip(S, "USERS: NOT OUT OF POCKET", 960, 180, "lime", 56, W(73, 1));
  L.put(S, "money-bag", 1500, 560, { s: 3.0, t: W(73, 6), slide: "up" });
  chip(S, "$6.34B", 1500, 870, "pink", 70, W(73, 8));
  [0, 1, 2, 3].forEach((i) => L.put(S, "money-bag", 260 + i * 220, 600, { s: 1.0, t: W(74, 2) + i * 0.35, pop: true }));
  chip(S, "≈ 4 BYBITS", 590, 870, "yellow", 70, W(74, 6));
  S.punch(700, 600, W(74, 6), 0.05);
}
// ---- 56. clips 75-76: respect: a state-level campaign; 57 blocked ----
{
  const S = sc("blob", "cyan");
  chip(S, "STATE-LEVEL CAMPAIGN", 960, 200, "white", 70, W(75, 10));
  L.put(S, "dev-shield-lock", 480, 560, { s: 1.5, c: "blue" });
  chip(S, "57 BLOCKED IN 2026", 480, 850, "lime", 56, W(76, 5));
  src(S, 1300, 580, { site: "Binance co-CEO Richard Teng", head: "\"A campaign built over many months\"", body: ["\"This was not a single mistake or a single breach.\""], hl: 0, w: 860, size: 34 }, W(75, 7));
  chip(S, "THEY NEEDED ONE", 1300, 900, "pink", 50, W(76, 11));
}
// ---- 57. clips 77-78: four rules; 1. never run an interview assignment on your work machine ----
{
  const S = sc("glyphs", "lime");
  chip(S, "4 RULES", 1400, 110, "lime", 80, W(77, 1), { rot: -2 });
  L.put(S, "sd-stacky", 170, 930, { s: 0.6, face: "grin", pose: "wave" });
  L.put(S, "sd-counter", 80, 110, { n: 1, of: 4, size: 40, t: W(78, 0) });
  L.put(S, "modern-laptop-code", 560, 520, { s: 1.4, t: W(78, 7) });
  chip(S, "WORK LAPTOP", 560, 800, "white", 50, W(78, 8));
  chip(S, "NO ASSIGNMENTS", 560, 240, "pink", 64, W(78, 4), { rot: -3 });
  L.put(S, "dev-container", 1400, 520, { s: 1.5, c: "teal", label: "VM", t: W(78, 12), slide: "up" });
  chip(S, "THROWAWAY VM", 1400, 340, "cyan", 56, W(78, 12));
  chip(S, "OR A SPARE COMPUTER", 1400, 800, "lime", 50, W(78, 16));
}
// ---- 59. clips 79-80: 2. official site, not the top ad; check the install source ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "sd-counter", 80, 110, { n: 2, of: 4, size: 40 });
  L.put(S, "dev-browser", 800, 500, { s: 1.0, url: "brew.sh", page: "blank", t: W(79, 4), slide: "up" });
  logo(S, "homebrew", 800, 500, 1.3, W(79, 5));
  chip(S, "OFFICIAL SITE ✓", 1500, 300, "lime", 56, W(79, 5));
  chip(S, "TOP AD ✗", 1500, 480, "pink", 56, W(79, 9));
  chip(S, "WHERE DID THIS SCRIPT COME FROM?", 960, 880, "yellow", 46, W(80, 2));
}
// ---- 60. clips 81-82: 3. scoped, short-lived tokens ----
{
  const S = sc("circuit", "yellow");
  L.put(S, "sd-counter", 80, 110, { n: 3, of: 4, size: 40 });
  L.put(S, "prop-key", 520, 480, { s: 2.0, t: W(81, 1), pop: true });
  chip(S, "SCOPE: ONE JOB", 1300, 340, "yellow", 64, W(81, 4));
  chip(S, "EXPIRES: 1 HOUR", 1300, 560, "lime", 64, W(81, 6));
  L.put(S, "p2-clock-12", 1300, 820, { s: 0.8, h: 12, m: 0, t: W(82, 6), pop: true });
  chip(S, "BEFORE LUNCH", 960, 940, "white", 44, W(82, 7));
}
// ---- 61. clips 83-84: 4. watch delegations on hot wallets ----
{
  const S = sc("network", "cyan");
  L.put(S, "sd-counter", 80, 110, { n: 4, of: 4, size: 40 });
  logo(S, "ethereum", 480, 360, 1.2, W(83, 6));
  L.put(S, "money-wallet", 480, 640, { s: 1.6, t: W(83, 3), pop: true });
  chip(S, "NEW 7702 DELEGATION", 1300, 360, "pink", 64, W(84, 8));
  L.put(S, "sd-arrow", 1300, 440, { to: [0, 160], bend: 0.1, c: "white", t: W(84, 12) });
  chip(S, "PAGE SOMEONE", 1300, 700, "yellow", 80, W(84, 14), { rot: -2 });
}
// ---- 62. clips 85-86: callback: the recruiter, CEO and job were fake; the assignment was real ----
{
  const S = sc("network", "lime");
  [["RECRUITER", 380, "cyan", 3], ["CEO", 960, "yellow", 7], ["JOB", 1540, "lime", 11]].forEach(([n, x, hc, wi]) => {
    tile(S, x, 330, { name: n, hc, w: 420, h: 300 });
    tile(S, x, 330, { name: n, hc, w: 420, h: 300, fake: true, t: W(85, wi) }).setAttribute("data-layout-allow-overlap", "");
    S.sfx(W(85, wi), "stamp", x);
  });
  L.put(S, "p2-folder", 960, 760, { s: 1.5, color: "yellow", t: W(86, 9), slide: "up" });
  chip(S, "assignment/ = REAL", 960, 640, "lime", 60, W(86, 11));
  S.punch(960, 700, W(86, 11), 0.06);
}
// ---- 63. clip 87: sign-off ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-sting", 960, 470, { s: 1.4, t: W(87, 0) });
  L.put(S, "sd-stacky", 1560, 920, { s: 0.8, face: "wink", pose: "wave", t: W(87, 3), slide: "up" });
}
