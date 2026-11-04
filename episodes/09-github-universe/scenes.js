// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// GitHub Universe 2026 Patch Notes (~5:40). Running visuals: the five-rung LADDER (Agent Merge → Review Max → Approvals →
// Fusion → Projects), the KITCHEN (Fusion analogy; callback on the bill), the THURSDAY PR card with a cobweb (cold open + end).
// Real people are name chips only (Jay Parikh on the source card); the keynote speaker doodle is the generic Suit.
// Grounds: glyphs/scan for code, circuit for infra, drift for news, blob for the turn, dots/network between.
const CUES = [[1, 0], [2, 0], [3, 0], [5, 0], [6, 0], [8, 0], [9, 0], [11, 0], [13, 0], [15, 0],
  [17, 0], [18, 0], [20, 0], [22, 0], [23, 0], [24, 0], [26, 0], [28, 0], [30, 0], [32, 0],
  [34, 0], [36, 0], [37, 0], [39, 0], [40, 0], [42, 0], [43, 0], [45, 0], [46, 0], [47, 0],
  [49, 0], [50, 0], [51, 0], [52, 0], [53, 0], [54, 0], [56, 0], [58, 0], [60, 0], [62, 0],
  [64, 0], [65, 0], [67, 0], [68, 0], [70, 0], [71, 0], [72, 0], [73, 0], [75, 0], [76, 0],
  [78, 0], [80, 0], [82, 0], [83, 0], [84, 0], [86, 0], [87, 0], [88, 0], [90, 0]];
const WIN = sceneWindows(CUES, 0.4);
let si = 0;
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 9 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const bot = (S, x, o = {}) => L.put(S, "sd-bot", x, o.gy || 930, Object.assign({ s: 1 }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const put = (S, name, x, y, o, t, how = "slide") => L.put(S, name, x, y, Object.assign({}, o, t == null ? {} : how === "pop" ? { t, pop: true } : { t, slide: "up" }));
const swap = (S, old, x, face, t, o = {}) => { const n = dev(S, x, face, o); tl.set(n, { opacity: 0 }, 0); S.hide(old, t); S.show(n, t); S.sfx(t, "boing", x); return n; };
const LAD = ["AGENT MERGE", "REVIEW MAX", "APPROVALS", "FUSION", "PROJECTS"];
// ladder: rungs up to n-1 lit from the start, rung n lights on its word
const ladder = (S, n, t, x = 330, y = 520) => { put(S, "u9-ladder", x, y, { lit: n - 1, labels: LAD, size: 44 }); put(S, "u9-ladder", x, y, { lit: n, labels: LAD, size: 44, t }, null); S.sfx(t, "ding", x + 300); };
const PR = { title: "fix: typo in README", num: 4521, state: "open", add: 1, del: 1, lines: [" # Stack Doodle", "- Teh fastest docs", "+ The fastest docs"] };

// ==================== COLD OPEN ====================
// ---- 1. clip 1: the keynote slide "< 1%" ----
{
  const S = sc("drift", "lime");
  put(S, "u9-slide", 1120, 400, { text: "< 1%", sub: "ALL SOFTWARE SO FAR", w: 1100, h: 600 });
  L.put(S, "sd-suit", 300, 930, { s: 1.3, face: "smug", pose: "point" });
  const d = dev(S, 1640, "smile", { s: 0.95 });
  L.put(S, "prop-coffee-mug", 1790, 830, { s: 0.7 });
  swap(S, d, 1640, "shocked", W(1, 11), { s: 0.95 });
  S.punch(1120, 400, W(1, 12), 0.05);
}
// ---- 2. clip 2: within five years ----
{
  const S = sc("drift", "lime");
  put(S, "u9-slide", 760, 420, { text: "< 1%", sub: "ALL SOFTWARE SO FAR", w: 1000, h: 560 });
  chip(S, "OF THE NEXT 5 YEARS", 1440, 820, "yellow", 70, W(2, 5), { rot: -3 });
  dev(S, 1640, "shocked", { s: 0.95 });
}
// ---- 3. clips 3-4: your PR from Thursday, cobweb ----
{
  const S = sc("glyphs", "cyan");
  put(S, "dev-pr-diff", 860, 440, Object.assign({ s: 1.3 }, PR));
  chip(S, "REVIEW REQUESTED · THURSDAY", 860, 790, "white", 50, W(3, 5));
  put(S, "nat-spider-web", 1250, 220, { s: 1.0 }, W(3, 8), "pop");
  const d = dev(S, 1620, "thinking", { s: 1.0 });
  chip(S, "NEXT WEEK?", 1620, 300, "lime", 90, W(4, 2), { rot: 3 });
  swap(S, d, 1620, "worried", W(4, 5), { s: 1.0 });
}
// ==================== 31 POSTS ====================
// ---- 4. clip 5: Universe, San Francisco, 31 entries in a day ----
{
  const S = sc("network", "cyan");
  logo(S, "github", 300, 250, 1.4);
  chip(S, "UNIVERSE 2026", 300, 470, "cyan", 60, W(5, 2));
  chip(S, "SAN FRANCISCO · OCT 28-29", 300, 580, "white", 40, W(5, 4));
  put(S, "dev-changelog", 1150, 470, { s: 1.15, v: "OCT 28", title: "Changelog", items: [["new", "Agent Merge"], ["new", "Copilot Fusion"], ["new", "Code review Max"], ["new", "+ 28 more"]] }, W(5, 9));
  chip(S, "31 POSTS · ONE DAY", 1150, 880, "lime", 80, W(5, 8), { rot: -2 });
}
// ---- 5. clips 6-7: the jargon dump ----
{
  const S = sc("glyphs", "yellow");
  logo(S, "github", 960, 140, 0.9);
  const J = [["WORKFLOW LOCKFILES", 520, 300, "cyan", -4, 6, 0], ["AGENTIC WORKFLOWS", 1400, 330, "lime", 3, 6, 2], ["ISSUE ARTIFACTS", 640, 470, "yellow", 2, 6, 4],
    ["MODERATE ROLE", 1320, 500, "white", -3, 6, 7], ["IMAGE GENERATION", 560, 640, "pink", -2, 6, 9], ["REPLICA", 1330, 670, "cyan", 4, 6, 14], ["SECURITY EXTENSION", 960, 830, "lime", -1, 7, 2]];
  J.forEach(([t, x, y, c, r, ci, wi]) => chip(S, t, x, y, c, 54, W(ci, wi), { rot: r }));
}
// ---- 6. clip 8: we read the ones that matter ----
{
  const S = sc("drift", "lime");
  put(S, "dev-changelog", 560, 470, { s: 1.0, v: "OCT 28", title: "Changelog", items: [["new", "…"], ["new", "…"], ["new", "…"], ["new", "…"]] });
  const d = dev(S, 1420, "thinking", { s: 1.1 });
  chip(S, "THE ONES THAT MATTER", 1420, 230, "lime", 60, W(8, 4), { rot: -2 });
  swap(S, d, 1420, "smug", W(8, 6), { s: 1.1 });
}
// ---- 7. clips 9-10: the promise rows 1-2 ----
const promise = (S, upto, ts) => {
  const R = [["1 SHIPPED vs PREVIEW", 250, "cyan", -1.5], ["2 THE ROBOT APPROVER", 460, "yellow", 1.5], ["3 THE BILL", 670, "pink", -1]];
  R.slice(0, upto).forEach(([text, y, c, rot], i) => chip(S, text, 170 + (text.length * 90 * 0.6 + 99) / 2, y, c, 90, ts[i], { rot }));
};
{
  const S = sc("dots", "lime");
  bot(S, 1580, { s: 1.0 });
  promise(S, 2, [W(9, 2), W(10, 1)]);
}
// ---- 8. clips 11-12: promise row 3 + the badge ----
{
  const S = sc("dots", "lime");
  bot(S, 1580, { s: 1.0 });
  promise(S, 3, [null, null, W(11, 3)]);
  L.put(S, "sd-badge", 170, 880, { kind: "PATCH NOTES", date: "NOV 4", t: W(12, 2) });
}
// ---- 9. clips 13-14: the pitch (source card) ----
{
  const S = sc("drift", "cyan");
  logo(S, "github", 220, 180, 1.0);
  src(S, 900, 480, { site: "github.blog · Jay Parikh · Oct 28", head: "GitHub Universe 2026", body: ["…to orchestrating fleets of agents.", "Completed work, not more code,", "is the output that matters."], hl: 0, logo: "logo-github", w: 1080 }, W(13, 1));
  chip(S, "FLEETS OF AGENTS", 1540, 840, "lime", 64, W(13, 11), { rot: -2 });
}
// ---- 10. clips 15-16: five robots on a ladder ----
{
  const S = sc("dots", "lime");
  put(S, "u9-ladder", 330, 520, { lit: 0, labels: LAD });
  chip(S, "5 ROBOTS", 1250, 260, "cyan", 90, W(15, 5), { rot: -2 });
  [1000, 1180, 1360, 1540, 1720].forEach((x, i) => bot(S, x, { s: 0.5, gy: 620, t: W(15, 6) + i * 0.12, pop: true }));
  dev(S, 1250, "thinking", { s: 0.7, t: W(16, 2), slide: "up" });
  chip(S, "EACH DOES A LITTLE MORE", 1250, 900, "white", 44, W(16, 5));
}
// ==================== THE LADDER ====================
// ---- 11. clip 17: rung 1 Agent Merge ----
{
  const S = sc("glyphs", "lime");
  ladder(S, 1, W(17, 3));
  logo(S, "github", 1500, 260, 1.0, W(17, 10));
  chip(S, "BUILT INTO PULL REQUESTS", 1400, 560, "white", 50, W(17, 6));
}
// ---- 12. clips 18-19: the merge box, Watch and fix ----
{
  const S = sc("scan", "lime", "none");
  put(S, "u9-mergebox", 960, 420, { rows: [["build (Actions)", "ok"], ["tests", "ok"]], head: "All checks have passed", hl: false });
  const mb2 = put(S, "u9-mergebox", 960, 420, { rows: [["build (Actions)", "fail"], ["tests", "ok"]], head: "Some checks were not successful", hl: true });
  tl.set(mb2, { opacity: 0 }, 0); S.show(mb2, W(18, 1));
  L.put(S, "sd-hand", 1300, 600, { s: 1.0, rot: 200, t: W(18, 1), pop: true });
  logo(S, "githubactions", 1520, 230, 0.9, W(19, 2));
  chip(S, "OR A MERGE CONFLICT", 960, 870, "pink", 56, W(19, 7));
}
// ---- 13. clips 20-21: Copilot fixes it in a cloud environment; on for every PR ----
{
  const S = sc("scan", "cyan", "none");
  const mb = put(S, "u9-mergebox", 760, 420, { rows: [["build (Actions)", "fail"], ["tests", "ok"]], head: "Copilot is fixing a blocker…", hl: true });
  const ok = put(S, "u9-mergebox", 760, 420, { rows: [["build (Actions)", "ok"], ["tests", "ok"]], head: "All checks have passed", hl: true });
  tl.set(ok, { opacity: 0 }, 0); S.hide(mb, W(20, 6)); S.show(ok, W(20, 6)); S.sfx(W(20, 6), "ding", 760);
  bot(S, 1560, { s: 0.85, t: W(20, 0), slide: "up" });
  logo(S, "githubcopilot", 1560, 200, 0.9, W(20, 0));
  chip(S, "CLOUD ENVIRONMENT", 1560, 300, "cyan", 44, W(20, 3));
  chip(S, "ON FOR EVERY PR", 760, 820, "lime", 64, W(21, 6), { rot: -2 });
}
// ---- 14. clip 22: the merge conflict is a robot's problem ----
{
  const S = sc("glyphs", "pink");
  put(S, "dev-merge-conflict", 960, 300, { s: 0.85, file: "README.md", code: "<<<<<<< yours\nThe fastest docs\n=======\nThe fastest docs ever\n>>>>>>> theirs" });
  dev(S, 330, "smug", { s: 1.0 });
  dev(S, 1590, "smug", { s: 1.0, hoodie: "#ff4d8d", flip: true });
  bot(S, 960, { s: 0.75, gy: 960, t: W(22, 9), slide: "up" });
  put(S, "prop-wrench", 1160, 700, { s: 0.9, rot: 20 }, W(22, 11), "pop");
  chip(S, "ROBOT'S PROBLEM", 960, 540, "lime", 64, W(22, 12), { rot: 2 });
}
// ---- 15. clip 23: paid plan + auto-merge ----
{
  const S = sc("drift", "lime");
  logo(S, "githubcopilot", 330, 250, 1.1);
  chip(S, "PAID COPILOT PLAN", 330, 420, "yellow", 52, W(23, 3));
  chip(S, "+ AUTO-MERGE", 330, 560, "cyan", 60, W(23, 9));
  put(S, "dev-pr-diff", 1220, 470, Object.assign({ s: 1.15 }, PR, { title: "fix: flaky test", num: 4600, state: "merged" }), W(23, 14));
}
// ---- 16. clips 24-25: rung 2 code review Max, public preview; Lite / Balanced ----
{
  const S = sc("glyphs", "pink");
  ladder(S, 2, W(24, 3));
  chip(S, "PUBLIC PREVIEW", 1400, 230, "pink", 56, W(24, 7), { rot: 3 });
  chip(S, "LITE", 1180, 520, "white", 54, W(25, 0));
  chip(S, "BALANCED", 1420, 520, "white", 54, W(25, 2));
  chip(S, "MAX", 1680, 520, "lime", 70, W(25, 3), { rot: -3 });
  chip(S, "EVERYDAY", 1300, 640, "cyan", 40, W(25, 5));
}
// ---- 17. clips 26-27: several review agents, one referee ----
{
  const S = sc("network", "cyan");
  chip(S, "MODELS FROM DIFFERENT PROVIDERS", 960, 120, "cyan", 46, W(26, 7));
  [[420, "yellow"], [960, "pink"], [1500, "cyan"]].forEach(([x, c], i) => {
    bot(S, x, { s: 0.6, gy: 560, t: W(26, 2) + i * 0.25, pop: true });
    chip(S, `REVIEWER ${i + 1}`, x, 610, c, 36, W(26, 2) + i * 0.25);
    L.put(S, "sd-arrow", x, 650, { to: [(960 - x) * 0.75, 120], bend: 0.15, c: "white", t: W(27, 1) });
  });
  bot(S, 960, { s: 0.55, gy: 960, t: W(27, 2), slide: "up" });
  chip(S, "REFEREE", 1260, 860, "lime", 56, W(27, 2), { rot: -3 });
  chip(S, "ONE REVIEW", 1550, 900, "white", 44, W(27, 8));
}
// ---- 18. clips 28-29: vendor numbers: highest F1 on ReviewBench ----
{
  const S = sc("drift", "pink");
  chip(S, "VENDOR NUMBERS", 360, 160, "pink", 56, null, { rot: -3 });
  src(S, 960, 470, { site: "github.blog · Universe keynote", head: "Copilot code review Max", body: ["posted the highest F1 score on", "ReviewBench for high-severity issues"], hl: [0, 1], logo: "logo-github", w: 1080 }, W(28, 0));
  chip(S, "GITHUB'S NUMBER, NOT OURS", 960, 860, "yellow", 56, W(29, 1), { rot: 2 });
}
// ---- 19. clips 30-31: rung 3 approvals, generally available ----
{
  const S = sc("blob", "lime");
  ladder(S, 3, W(30, 1));
  chip(S, "THE BIG ONE", 1400, 300, "yellow", 70, W(30, 4), { rot: -3 });
  chip(S, "GENERALLY AVAILABLE", 1400, 620, "lime", 80, W(31, 4), { rot: 2 });
}
// ---- 20. clips 32-33: Copilot approves; counts toward required approvals ----
{
  const S = sc("scan", "lime", "none");
  put(S, "dev-pr-diff", 560, 470, Object.assign({ s: 1.0 }, PR, { title: "feat: dark mode", num: 4611 }));
  const r0 = put(S, "u9-reviewers", 1400, 440, { rows: [["copilot", "pending"], ["you", "pending"]] });
  const r1 = put(S, "u9-reviewers", 1400, 440, { rows: [["copilot", "approved"], ["you", "pending"]] });
  tl.set(r1, { opacity: 0 }, 0); S.hide(r0, W(32, 2)); S.show(r1, W(32, 2)); S.sfx(W(32, 2), "stamp", 1400);
  chip(S, "COUNTS AS REQUIRED", 1400, 820, "lime", 56, W(33, 7), { rot: -2 });
}
// ---- 21. clips 34-35: push one more commit, approval dismissed ----
{
  const S = sc("scan", "pink", "none");
  const r1 = put(S, "u9-reviewers", 1300, 380, { rows: [["copilot", "approved"], ["you", "pending"]] });
  const r2 = put(S, "u9-reviewers", 1300, 380, { rows: [["copilot", "dismissed"], ["you", "pending"]] });
  tl.set(r2, { opacity: 0 }, 0);
  chip(S, "LIKE A HUMAN REVIEWER", 1300, 760, "cyan", 50, W(34, 4));
  const st = chip(S, "APPROVED", 1450, 160, "lime", 64, W(34, 5), { rot: -8 });
  const d = dev(S, 380, "smile", { s: 1.1 });
  chip(S, "git push", 380, 260, "white", 50, W(35, 0));
  S.hide(r1, W(35, 8)); S.show(r2, W(35, 8));
  tl.to(st, { y: "+=700", rotation: 40, opacity: 0, duration: 0.6, ease: "power2.in" }, W(35, 8));
  S.sfx(W(35, 8), "swish", 1450);
  swap(S, d, 380, "shocked", W(35, 8), { s: 1.1 });
}
// ---- 22. clip 36: off by default; admins choose file paths ----
{
  const S = sc("glyphs", "yellow", "none");
  chip(S, "OFF BY DEFAULT", 520, 200, "yellow", 80, W(36, 2), { rot: -2 });
  put(S, "dev-code", 1240, 520, { s: 1.05, file: "copilot approval paths", lang: "sh", code: "docs/**          ✓ Copilot may approve\nREADME.md        ✓ Copilot may approve\nsrc/auth/**      ✗ humans only\npayments/**      ✗ humans only", size: 30, lines: 4, hl: [3] }, W(36, 8));
  L.put(S, "prop-padlock", 400, 640, { s: 1.4, t: W(36, 9), pop: true });
  chip(S, "ADMINS PICK THE PATHS", 420, 860, "white", 44, W(36, 6));
}
// ---- 23. clips 37-38: rung 4 Fusion; the model picker ----
{
  const S = sc("network", "lime");
  ladder(S, 4, W(37, 3));
  chip(S, "GENERALLY AVAILABLE", 1400, 170, "lime", 50, W(37, 5));
  put(S, "u9-picker", 1400, 520, { items: ["Copilot Fusion", "Standard · High · Max"], hl: 0 }, W(38, 6));
  chip(S, "YOU STOP PICKING", 1400, 860, "white", 50, W(38, 1), { rot: 2 });
}
// ---- 24. clip 39: AT&T quote ----
{
  const S = sc("drift", "cyan");
  src(S, 960, 470, { site: "GitHub changelog · customer quote", head: "AT&T engineer on Copilot Fusion", body: ["developers would often choose a more", "powerful model for a complex task", "and forget to switch back"], hl: 2, logo: "logo-github", w: 1080 }, W(39, 1));
  chip(S, "MOST RELATABLE REASON", 960, 120, "yellow", 50, W(39, 12), { rot: -2 });
}
// ---- 25. clips 40-41: Dev hides the MAX badge ----
{
  const S = sc("blob", "pink");
  chip(S, "HARD TASK → MAX MODEL", 960, 180, "cyan", 60, W(40, 3));
  const d = dev(S, 700, "smug", { s: 1.25 });
  chip(S, "MAX", 980, 560, "pink", 64, W(40, 4), { rot: 12 });
  chip(S, "...FORGOT TO SWITCH BACK", 1300, 840, "lime", 56, W(41, 2), { rot: -2 });
  swap(S, d, 700, "worried", W(41, 2), { s: 1.25 });
}
// ---- the kitchen (clips 42-46): the Bot in a chef hat at the pass, three tickets, two cooks ----
const kitchen = (S, o = {}) => {
  bot(S, 960, { s: 0.75, gy: 900 });
  L.put(S, "u9-chefhat", 960, 590, { s: 0.7 });
  chip(S, "HEAD CHEF = FUSION", 1360, 880, "lime", 40);
};
// ---- 26. clip 42: think of a restaurant kitchen ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  chip(S, "THE KITCHEN", 960, 110, "yellow", 70, W(42, 3), { rot: -2 });
  [[330, "EASY", -4], [650, "HARD", 3], [1600, "TRICKY", -2]].forEach(([x, t, r], i) => put(S, "u9-ticket", x, 330, { title: "TICKET", lines: [t] }, W(42, 10) + i * 0.3, "pop"));
}
// ---- 27. clips 43-44: single / cascade ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  put(S, "u9-ticket", 330, 330, { title: "TICKET", lines: ["EASY"] });
  put(S, "prop-pot", 330, 650, { s: 1.0 }, W(43, 4), "pop");
  chip(S, "SINGLE", 330, 820, "cyan", 54, W(43, 5));
  put(S, "u9-ticket", 1600, 330, { title: "TICKET", lines: ["HARD"] }, W(44, 0), "pop");
  put(S, "prop-pan", 1600, 650, { s: 1.0 }, W(44, 5), "pop");
  chip(S, "FAST COOK FIRST", 1600, 820, "yellow", 44, W(44, 5));
}
// ---- 28. clip 45: fails the taste test → senior cook ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  put(S, "u9-ticket", 1600, 330, { title: "TICKET", lines: ["HARD"] });
  chip(S, "TASTE TEST", 1600, 600, "white", 50, W(45, 4));
  chip(S, "FAIL", 1700, 700, "pink", 60, W(45, 3), { rot: 6 });
  chip(S, "→ SENIOR COOK", 1560, 840, "lime", 50, W(45, 8));
  chip(S, "CASCADE", 330, 330, "cyan", 70, W(45, 0), { rot: -3 });
}
// ---- 29. clip 46: critique ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  chip(S, "CRITIQUE", 330, 330, "cyan", 70, null, { rot: -3 });
  chip(S, "COOK MAKES IT", 1500, 300, "white", 50, W(46, 2));
  chip(S, "ANOTHER TASTES IT", 1500, 460, "yellow", 50, W(46, 6));
  chip(S, "THEN IT LEAVES", 1500, 620, "lime", 50, W(46, 10));
  L.put(S, "sd-arrow", 1500, 335, { to: [0, 90], bend: 0.1, c: "white", t: W(46, 5) });
  L.put(S, "sd-arrow", 1500, 495, { to: [0, 90], bend: 0.1, c: "white", t: W(46, 9) });
}
// ---- 30. clips 47-48: vendor numbers, AA Coding Agent Index ----
{
  const S = sc("network", "pink", "none");
  chip(S, "VENDOR NUMBERS", 360, 140, "pink", 56, null, { rot: -3 });
  put(S, "dev-benchmark-bars", 960, 500, { s: 1.25, title: "AA Coding Agent Index (as reported by GitHub)", items: [["Fusion Max", 60], ["Claude Code + Opus 5.5 Max", 62]], hl: 0, max: 70 }, W(47, 4));
  logo(S, "claude", 1700, 150, 0.8, W(48, 4));
  chip(S, "WITHIN 2 POINTS", 960, 900, "white", 56, W(48, 1));
}
// ---- 31. clip 49: half the cost per task ----
{
  const S = sc("network", "pink", "none");
  chip(S, "VENDOR NUMBERS", 360, 140, "pink", 56, null, { rot: -3 });
  put(S, "dev-benchmark-bars", 960, 500, { s: 1.25, title: "AA Coding Agent Index (as reported by GitHub)", items: [["Fusion Max", 60], ["Claude Code + Opus 5.5 Max", 62]], hl: 0, max: 70 });
  chip(S, "~½ THE COST PER TASK", 1300, 880, "lime", 80, W(49, 2), { rot: -2 });
}
// ---- 32. clip 50: remember the kitchen ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  L.put(S, "label-sticky", 1500, 420, { text: "REMEMBER THE KITCHEN", size: 54, c: "yellow", t: W(50, 1), pop: true });
}
// ---- 33. clip 51: rung 5 Projects, public preview ----
{
  const S = sc("circuit", "cyan");
  ladder(S, 5, W(51, 3));
  chip(S, "PUBLIC PREVIEW", 1400, 180, "pink", 56, W(51, 6), { rot: 3 });
  chip(S, "IN THE COPILOT APP", 1400, 720, "white", 50, W(51, 9));
}
// ---- 34. clip 52: a goal + repos + mocks + Slack threads ----
{
  const S = sc("circuit", "cyan");
  put(S, "dev-chat", 620, 470, { s: 1.15, title: "Copilot app · new project", theme: "dark", msgs: [{ r: "user", t: "Goal: ship dark mode in web, api and mobile" }], typing: false });
  chip(S, "web/", 1400, 220, "cyan", 50, W(52, 5));
  chip(S, "api/", 1640, 220, "cyan", 50, W(52, 5) + 0.3);
  chip(S, "mobile/", 1520, 330, "cyan", 50, W(52, 5) + 0.6);
  logo(S, "figma", 1420, 520, 0.9, W(52, 8));
  chip(S, "SLACK THREADS", 1560, 700, "yellow", 50, W(52, 12));
}
// ---- 35. clip 53: as many agents as needed, in parallel ----
{
  const S = sc("circuit", "lime");
  put(S, "dev-chat", 620, 470, { s: 1.15, title: "Copilot app · new project", theme: "dark", msgs: [{ r: "user", t: "Goal: ship dark mode in web, api and mobile" }], typing: false });
  [1220, 1430, 1640].forEach((x, i) => bot(S, x, { s: 0.55, gy: 600, t: W(53, 5) + i * 0.3, pop: true }));
  chip(S, "IN PARALLEL", 1430, 760, "lime", 80, W(53, 10), { rot: -2 });
}
// ---- 36. clips 54-55: PRs come back; another robot approves ----
{
  const S = sc("glyphs", "lime");
  [[480, 330, "feat: dark mode (web)"], [560, 500, "feat: dark mode (api)"], [640, 670, "feat: dark mode (mobile)"]].forEach(([x, y, t], i) =>
    put(S, "dev-pr-diff", x, y, Object.assign({ s: 0.75 }, PR, { title: t, num: 4700 + i }), W(54, 4) + i * 0.35));
  dev(S, 1250, "thinking", { s: 1.0 });
  bot(S, 1650, { s: 0.7, gy: 930, t: W(55, 3), slide: "left" });
  chip(S, "APPROVE", 1650, 330, "lime", 64, W(55, 5), { rot: -8 });
}
// ---- 37. clips 56-57: computer use, asks first ----
{
  const S = sc("drift", "cyan");
  put(S, "prop-monitor", 640, 470, { s: 2.4 });
  chip(S, "Expenses.app", 640, 380, "white", 44, W(56, 11));
  L.put(S, "sd-hand", 760, 520, { s: 0.8, rot: 220, t: W(56, 8), pop: true });
  chip(S, "COMPUTER USE · PREVIEW", 640, 150, "pink", 50, W(56, 2));
  put(S, "dev-chat", 1450, 520, { s: 0.95, title: "Copilot", theme: "dark", msgs: [{ r: "ai", t: "Can I control Expenses?" }, { r: "user", t: "Allow" }], typing: false }, W(57, 2));
}
// ---- 38. clips 58-59: the boring change: cloud sessions + sandboxes GA ----
{
  const S = sc("dots", "lime");
  chip(S, "BORING BUT BIG", 960, 160, "yellow", 70, W(58, 3), { rot: -2 });
  put(S, "prop-phone", 420, 520, { s: 1.6, screen: "chat" }, W(59, 1), "pop");
  put(S, "dev-code", 960, 520, { s: 0.55, file: "app.ts", lang: "ts", code: "export const theme = 'dark';", size: 30 }, W(59, 1) + 0.3);
  put(S, "dev-browser", 1500, 520, { s: 0.42, url: "github.com", page: "cards" }, W(59, 1) + 0.6);
  chip(S, "GENERALLY AVAILABLE · PAID PLANS", 960, 850, "lime", 50, W(59, 8));
}
// ---- 39. clips 60-61: phone at standup → VS Code → web at lunch ----
{
  const S = sc("dots", "cyan");
  put(S, "prop-phone", 420, 480, { s: 1.6, screen: "chat" });
  put(S, "dev-code", 960, 480, { s: 0.55, file: "app.ts", lang: "ts", code: "export const theme = 'dark';", size: 30 });
  put(S, "dev-browser", 1500, 480, { s: 0.42, url: "github.com", page: "cards" });
  chip(S, "STANDUP", 420, 760, "yellow", 50, W(60, 7));
  chip(S, "VS CODE", 960, 760, "cyan", 50, W(60, 11));
  chip(S, "LUNCH", 1500, 760, "lime", 50, W(61, 7));
  chip(S, "ONE SESSION", 960, 890, "white", 44, W(61, 1));
}
// ---- 40. clips 62-63: Actions entitlement = one dollar pool ----
{
  const S = sc("circuit", "yellow");
  logo(S, "githubactions", 300, 220, 1.0);
  put(S, "money-wallet", 960, 470, { s: 2.6 }, W(62, 6));
  chip(S, "ACTIONS ENTITLEMENT", 960, 180, "yellow", 56, W(62, 6));
  chip(S, "RUNNER MINUTES", 560, 830, "white", 46, W(63, 8), { rot: -3 });
  chip(S, "→ ONE $ POOL", 1360, 830, "lime", 56, W(63, 4));
}
// ---- 41. clip 64: builds and agents share a wallet ----
{
  const S = sc("circuit", "yellow");
  put(S, "money-wallet", 960, 470, { s: 2.6 });
  L.put(S, "sd-hand", 760, 470, { s: 1.2, rot: 0, t: W(64, 1), slide: "right" });
  chip(S, "BUILDS", 420, 470, "cyan", 60, W(64, 1));
  L.put(S, "sd-hand", 1160, 470, { s: 1.2, rot: 180, t: W(64, 4), slide: "left" });
  chip(S, "AGENTS", 1500, 470, "pink", 60, W(64, 4));
  chip(S, "SHARED WALLET", 960, 860, "lime", 80, W(64, 7), { rot: -2 });
}
// ---- 42. clips 65-66: 4 million CPU cores ----
{
  const S = sc("circuit", "cyan");
  L.put(S, "dev-datacenter-row", 620, 900, { s: 1.5 });
  chip(S, "+4,000,000 CPU CORES", 1350, 330, "lime", 80, W(66, 4), { rot: -2 });
  chip(S, "THIS YEAR (GITHUB)", 1350, 520, "white", 46, W(66, 8));
}
// ---- 43. clip 67: multi-region Azure, early next year ----
{
  const S = sc("circuit", "cyan");
  L.put(S, "dev-datacenter-row", 620, 900, { s: 1.5 });
  chip(S, "MULTI-REGION AZURE", 1350, 330, "cyan", 70, W(67, 4), { rot: 2 });
  chip(S, "DONE: EARLY 2027", 1350, 540, "white", 50, W(67, 7));
}
// ---- 44. clips 68-69: the most Microsoft sentence: nameplate swap ----
{
  const S = sc("drift", "cyan");
  L.put(S, "furn-door", 960, 960, { s: 1.6 });
  const p1 = put(S, "u9-plate", 960, 420, { text: "GITHUB COPILOT SDK" });
  const p2 = put(S, "u9-plate", 960, 420, { text: "MICROSOFT COPILOT SDK", c: "#4cc9f0" });
  tl.set(p2, { opacity: 0 }, 0);
  tl.to(p1, { y: "+=600", rotation: -25, opacity: 0, duration: 0.7, ease: "power2.in" }, W(69, 4));
  S.show(p2, W(69, 5)); S.sfx(W(69, 4), "swish", 960); S.sfx(W(69, 5), "stamp", 960);
  chip(S, "MOST MICROSOFT SENTENCE", 960, 150, "yellow", 56, W(68, 4), { rot: -2 });
}
// ---- 45. clip 70: no immediate changes are required ----
{
  const S = sc("drift", "cyan");
  src(S, 900, 470, { site: "GitHub changelog · Oct 28", head: "GitHub Copilot SDK is becoming Microsoft Copilot SDK", body: ["The migration will happen in phases.", "No immediate changes are required", "for existing users."], hl: 1, logo: "logo-github", w: 1180 }, W(70, 1));
  dev(S, 1700, "smug", { s: 0.9 });
}
// ==================== THE BILL ====================
// ---- 46. clip 71: the part the keynote gave one sentence ----
{
  const S = sc("blob", "pink");
  put(S, "u9-ladder", 330, 520, { lit: 5, labels: LAD, size: 44 });
  const d = dev(S, 1550, "smile", { s: 1.15 });
  chip(S, "ONE SENTENCE", 1550, 220, "pink", 70, W(71, 6), { rot: 3 });
  swap(S, d, 1550, "thinking", W(71, 1), { s: 1.15 });
}
// ---- 47. clip 72: Enterprise includes Copilot ----
{
  const S = sc("blob", "lime");
  src(S, 960, 450, { site: "GitHub changelog · Oct 28", head: "GitHub Enterprise now includes access to GitHub Copilot", body: ["all Copilot features without", "buying a separate subscription"], hl: 0, logo: "logo-github", w: 1180 }, W(72, 0));
  chip(S, "INCLUDED", 1500, 820, "lime", 90, W(72, 7), { rot: -3 });
}
// ---- 48. clips 73-74: good news / bad news + the meter ----
{
  const S = sc("blob", "pink");
  chip(S, "GOOD NEWS: COPILOT IS INCLUDED", 760, 290, "lime", 64, W(73, 1), { rot: -2 });
  chip(S, "BAD NEWS: SO IS THE METER", 760, 560, "pink", 64, W(74, 1), { rot: 2 });
  put(S, "u9-meter", 1500, 760, { amount: "$0.01", label: "AI CREDITS" }, W(74, 7));
  S.stop(W(74, 8), 0.8);
  S.punch(1500, 760, W(74, 8), 0.05);
}
// ---- 49. clip 75: metered from the first request ----
{
  const S = sc("dots", "pink");
  const m0 = put(S, "u9-meter", 700, 450, { amount: "$0.00", label: "AI CREDITS" });
  const m1 = put(S, "u9-meter", 700, 450, { amount: "$0.04", label: "AI CREDITS" });
  tl.set(m1, { opacity: 0 }, 0); S.hide(m0, W(75, 6)); S.show(m1, W(75, 6)); S.sfx(W(75, 6), "tick", 700);
  chip(S, "FROM THE FIRST REQUEST", 700, 760, "white", 50, W(75, 4));
  chip(S, "NO INCLUDED ALLOWANCE", 1460, 300, "pink", 56, W(75, 10), { rot: 3 });
}
// ---- 50. clips 76-77: each model at standard rate; Max burns more ----
{
  const S = sc("dots", "yellow");
  logo(S, "githubcopilot", 960, 150, 0.8);
  [[420, "MODEL A"], [960, "MODEL B"], [1500, "MODEL C"]].forEach(([x, n], i) => {
    chip(S, n, x, 360, "cyan", 56, W(76, 3) + i * 0.3);
    chip(S, "$", x, 500, "yellow", 70, W(76, 9) + i * 0.3, { rot: -6 });
  });
  chip(S, "REVIEW MAX = MORE CREDITS", 960, 760, "pink", 64, W(77, 6), { rot: -2 });
}
// ---- 51. clips 78-79: kitchen callback: every cook holds a receipt ----
{
  const S = sc("blob", "yellow");
  kitchen(S);
  chip(S, "BACK TO THE KITCHEN", 960, 110, "yellow", 60, W(78, 3));
  [[330, 400], [650, 520], [1290, 520], [1600, 400]].forEach(([x, y], i) => put(S, "money-receipt", x, y, { s: 1.4 }, W(79, 6) + i * 0.3, "pop"));
  chip(S, "EVERY COOK BILLS", 960, 340, "pink", 56, W(79, 9), { rot: 2 });
}
// ---- 52. clips 80-81: the safety net at zero budget ----
{
  const S = sc("scan", "lime", "none");
  const b0 = put(S, "u9-budget", 960, 480, { head: "BUDGET: $12.40", rows: [["CODE COMPLETION", true], ["CHAT", true], ["CODE REVIEW", true], ["CLOUD AGENTS", true]] });
  const b1 = put(S, "u9-budget", 960, 480, { head: "BUDGET: $0.00", rows: [["CODE COMPLETION", true], ["CHAT", false], ["CODE REVIEW", false], ["CLOUD AGENTS", false]] });
  tl.set(b1, { opacity: 0 }, 0); S.hide(b0, W(80, 12)); S.show(b1, W(80, 12)); S.sfx(W(80, 12), "thud", 960);
  chip(S, "SAFETY NET", 1600, 220, "lime", 56, W(80, 2), { rot: 3 });
  chip(S, "STOP", 1600, 760, "pink", 70, W(81, 7), { rot: -4 });
}
// ---- 53. clip 82: Copilot Standalone $10 ----
{
  const S = sc("drift", "lime");
  logo(S, "githubcopilot", 300, 240, 1.1);
  chip(S, "COPILOT STANDALONE", 960, 300, "cyan", 80, W(82, 11), { rot: -2 });
  chip(S, "$10 / USER / MONTH", 960, 520, "lime", 90, W(82, 14), { rot: 2 });
  chip(S, "NO MONTHLY CREDITS", 960, 760, "pink", 56, W(82, 18));
}
// ---- 54. clip 83: sales only for now ----
{
  const S = sc("drift", "lime");
  chip(S, "$10 / USER / MONTH", 960, 300, "lime", 70, null, { rot: 2 });
  chip(S, "SALES ONLY (FOR NOW)", 960, 520, "yellow", 70, W(83, 4), { rot: -2 });
  chip(S, "SELF-SERVE: UNCHANGED", 960, 740, "white", 56, W(83, 8));
}
// ==================== NEXT WEEK ====================
const TODO = [["1 WATCH AND FIX ON ONE PR", 260, "lime"], ["2 PICK THE APPROVAL PATHS", 470, "yellow"], ["3 SET A BUDGET ALERT", 680, "pink"]];
const todo = (S, upto, ts) => TODO.slice(0, upto).forEach(([text, y, c], i) => chip(S, text, 140 + (text.length * 76 * 0.6 + 84) / 2, y, c, 76, ts[i], { rot: i % 2 ? 1.5 : -1.5 }));
// ---- 55. clips 84-85: row 1 ----
{
  const S = sc("network", "lime");
  const d = dev(S, 1640, "thinking", { s: 1.0 });
  todo(S, 1, [W(85, 6)]);
  swap(S, d, 1640, "smile", W(85, 7), { s: 1.0 });
}
// ---- 56. clip 86: row 2 ----
{
  const S = sc("network", "lime");
  dev(S, 1640, "smile", { s: 1.0 });
  todo(S, 2, [null, W(86, 4)]);
}
// ---- 57. clip 87: row 3 + the meter ----
{
  const S = sc("network", "lime");
  dev(S, 1640, "smile", { s: 1.0 });
  todo(S, 3, [null, null, W(87, 1)]);
  put(S, "u9-meter", 1000, 900, { amount: "$0.07", label: "AI CREDITS" }, W(87, 11));
}
// ---- 58. clips 88-89: callback: the slide and the Thursday PR with its cobweb ----
{
  const S = sc("drift", "lime");
  put(S, "u9-slide", 1250, 330, { text: "< 1%", sub: "ALL SOFTWARE SO FAR", w: 900, h: 480, size: 240 });
  put(S, "dev-pr-diff", 640, 640, Object.assign({ s: 1.1 }, PR), W(89, 1));
  put(S, "nat-spider-web", 1000, 470, { s: 0.9 }, W(89, 4), "pop");
  chip(S, "STILL WAITING FOR REVIEW", 640, 900, "yellow", 50, W(89, 6), { rot: -2 });
}
// ---- 59. clip 90: sign-off ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-sting", 960, 470, { s: 1.4, t: W(90, 0) });
  L.put(S, "sd-stacky", 1560, 920, { s: 0.8, face: "wink", pose: "wave", t: W(90, 3), slide: "up" });
}
