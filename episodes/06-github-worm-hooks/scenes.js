// look: still
// motion: v2
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// GitHub worm hooks, Patch Notes (~6 min). Running visuals: the file card ".github/init.js 13.7 MB" vs the search box "EMPTY"
// (cold open + callback), the escalation LADDER (4 rungs), the airport X-ray (analogy). Grounds rotate per scene (L.sdBg):
// network / scan / glyphs for security, circuit for infra, drift / dots for explainer beats, blob for the turn.
// Security: class-level only. File NAMES and sizes appear (published IOCs); no hook contents, payload, commands or infrastructure.
// The only terminal is our own harmless lab run (lab/log.txt: git ls-tree on a dummy repo).
const CUES = [[1, 0], [3, 0], [5, 0], [7, 0], [8, 0], [9, 0], [11, 0], [13, 0], [15, 0], [17, 0], [19, 0], [20, 0], [22, 0], [23, 0],
  [25, 0], [27, 0], [28, 0], [29, 0], [30, 0], [32, 0], [34, 0], [35, 0], [36, 0], [37, 0], [39, 0], [41, 0], [42, 0], [44, 0], [46, 0],
  [48, 0], [50, 0], [51, 0], [52, 0], [54, 0], [55, 0], [56, 0], [57, 0], [59, 0], [61, 0], [62, 0], [64, 0], [65, 0], [66, 0], [68, 0],
  [70, 0], [72, 0], [74, 0], [76, 0], [78, 0], [79, 0], [81, 0], [83, 0], [84, 0], [85, 0], [87, 0], [89, 0]];
const WIN = sceneWindows(CUES, 0.4);
let si = 0;
// keep every entrance >= 1.05 s before its scene ends: the next scene's 0.6 s crossfade covers the last ~0.6 s, so a chip on the
// scene's last word would pop in under the fade. ponytail: one clamp on L.put; raw tl.to() moves are timed by hand.
const _put = L.put;
L.put = (S, n, x, y, o) => (o && o.t != null && S && S.end != null && o.t > S.end - 1.05 ? _put(S, n, x, y, Object.assign({}, o, { t: Math.max(S.start, S.end - 1.05) })) : _put(S, n, x, y, o));
const sc = (kind, c, cam = "push") => { const [a, b] = WIN[si]; const S = scene(a, b, { cam }); L.sdBg(S, kind, { c, seed: 5 + si * 3 }); si++; return S; };
// chips: small ones pop, big ones (size >= 80) slide up (a big pop is a whole-frame jump)
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : size >= 80 ? { t, slide: "up" } : { t, pop: true }, o));
const logo = (S, name, x, y, s, t) => L.put(S, "logo-" + name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const file = (S, x, y, o, t) => L.put(S, "w6-file", x, y, Object.assign({ name: ".github/init.js", size: "13.7 MB" }, o, t == null ? {} : { t, slide: "up" }));
const tree = (S, x, y, o, t) => L.put(S, "w6-tree", x, y, Object.assign({}, o, t == null ? {} : { t, slide: "up" }));
const term = (S, x, y, lines, o = {}, t) => L.put(S, "dev-terminal", x, y, Object.assign({ s: 1.7, lines, cursor: false }, o, t == null ? {} : { t, slide: "up" }));
const bug = (S, x, y, o = {}) => L.put(S, "sd-bug", x, y, Object.assign({ s: 0.6, mood: "smug" }, o));
const room = (S, x, y, o, t) => L.put(S, "w6-room", x, y, Object.assign({}, o, t == null ? {} : { t, pop: true }));
// swap Dev's face on ones (both placed; the new one hidden until t)
const swap = (S, old, x, face, t, o = {}) => { const n = dev(S, x, face, o); tl.set(n, { opacity: 0 }, 0); S.hide(old, t); S.show(n, t); S.sfx(t, "boing", x); return n; };
const LAD = ["STOLEN TOKENS", "REAL REPOS", "TINY HOOKS", "OPEN THE FOLDER"];
// the ladder: rungs lit up to n-1 from the start, rung n lights on its word
const ladder = (S, n, t) => { L.put(S, "w6-ladder", 360, 500, { lit: n - 1, labels: LAD, size: 44 }); L.put(S, "w6-ladder", 360, 500, { lit: n, labels: LAD, size: 44, t }); S.sfx(t, "ding", 500); };
const TOOLS = [["claude", "CLAUDE CODE"], ["googlegemini", "GEMINI"], ["cursor", "CURSOR"], [null, "VS CODE"]];
const HOOKS = [[".claude/settings.json", "1 KB"], [".gemini/settings.json", "1 KB"], [".cursor/mcp.json", "1 KB"], [".vscode/tasks.json", "1 KB"], [".github/init.js", "13.7 MB", true]];
const LS = ["$ git ls-tree -r -l HEAD", "100644 blob 9168758  13729714  .github/init.js", "100644 blob fc72a5c         7  README.md", "100644 blob 1ac74b4        18  src/index.js"];

// ---- 1. clips 1-2: cold open: Dev opens a folder, the Bug peeks out ----
{
  const S = sc("network", "pink");
  const d = dev(S, 380, "smile", { s: 1.25 });
  L.put(S, "prop-laptop", 760, 720, { s: 1.5 });
  L.put(S, "p2-folder", 1340, 470, { s: 2.2, color: "yellow", t: W(1, 7), slide: "up" });
  chip(S, "cool-project/", 1340, 250, "white", 56, W(1, 10));
  bug(S, 1340, 560, { s: 0.75, t: W(2, 4), pop: true });
  chip(S, "JUST OPEN IT", 1340, 800, "pink", 70, W(2, 4), { rot: -3 });
  swap(S, d, 380, "shocked", W(2, 5), { s: 1.25 });
  S.punch(1340, 520, W(2, 6), 0.05);
}
// ---- 2. clips 3-4: the 13 MB file, and search says EMPTY ----
{
  const S = sc("scan", "cyan");
  logo(S, "github", 200, 190, 1.1);
  file(S, 760, 420, {}, W(3, 2));
  L.put(S, "dev-prompt-box", 1440, 640, { s: 1.0, text: "path:.github/init.js", w: 700, t: W(4, 4), slide: "up" });
  L.put(S, "ep-magnifier", 1700, 520, { s: 0.9, t: W(4, 6), pop: true });
  chip(S, "EMPTY", 1440, 820, "pink", 96, W(4, 9), { rot: -4 });
}
// ---- 3. clips 5-6: JFrog report, 42 repos, 11 owners ----
{
  const S = sc("network", "lime");
  logo(S, "jfrog", 200, 180, 1.1);
  src(S, 800, 520, { site: "research.jfrog.com", head: "Beyond testmetest", body: ["42 armed third-party GitHub repositories across 11 legitimate owners connected to the testmetest npm campaign."], hl: 0, logo: "logo-jfrog", date: "OCT 26, 2026", w: 1040 }, W(5, 3));
  chip(S, "42 REPOS", 1580, 300, "lime", 110, W(5, 7), { rot: 3 });
  chip(S, "11 OWNERS", 1600, 520, "white", 60, W(5, 12), { rot: -2 });
  logo(S, "npm", 1580, 740, 1.1, W(6, 3));
  chip(S, "testmetest", 1580, 880, "pink", 50, W(6, 6));
}
// ---- 4. clip 7: the four tools around a folder ----
{
  const S = sc("glyphs", "cyan");
  L.put(S, "p2-folder", 960, 500, { s: 2.0, color: "yellow" });
  const P = [[480, 280], [1440, 280], [480, 740], [1440, 740]], words = [6, 8, 9, 11];
  TOOLS.forEach(([lg, name], i) => {
    const [x, y] = P[i], t = W(7, words[i]);
    if (lg) logo(S, lg, x, y - 60, 1.0, t);
    chip(S, name, x, y + (lg ? 70 : 0), lg ? "white" : "cyan", lg ? 46 : 64, t + 0.1);
  });
  chip(S, "STARTUP HOOKS", 960, 140, "lime", 60, W(7, 3));
}
// ---- 5. clip 8: open it, the hook runs ----
{
  const S = sc("glyphs", "pink");
  const d = dev(S, 330, "smile");
  L.put(S, "p2-folder", 900, 520, { s: 1.8, color: "yellow" });
  L.put(S, "sci-gears", 1250, 420, { s: 1.1, t: W(8, 9), pop: true });
  L.put(S, "sd-arrow", 1060, 520, { to: [140, -60], bend: 0.3, c: "white", t: W(8, 9) });
  bug(S, 1600, 640, { s: 0.9, t: W(8, 13), pop: true });
  chip(S, "RUNS THE PAYLOAD", 1460, 860, "pink", 56, W(8, 11));
  swap(S, d, 330, "worried", W(8, 11));
}
// ---- 6. clips 9-10: promise 1, 2 ----
const prow = (S, text, y, c, rot, t) => chip(S, text, 140 + (text.length * 90 * 0.64 + 99) / 2, y, c, 90, t, { rot });
{
  const S = sc("drift", "lime");
  prow(S, "1 OPEN = RUN", 260, "cyan", -1.5, W(9, 3));
  prow(S, "2 THE EMPTY FILE", 480, "yellow", 1.5, W(10, 4));
  dev(S, 1580, "thinking", { s: 1.3 });
}
// ---- 7. clips 11-12: promise 3 + badge ----
{
  const S = sc("drift", "lime");
  prow(S, "1 OPEN = RUN", 260, "cyan", -1.5);
  prow(S, "2 THE EMPTY FILE", 480, "yellow", 1.5);
  prow(S, "3 YOUR CHECKLIST", 700, "pink", -1, W(11, 4));
  dev(S, 1580, "determined", { s: 1.3 });
  L.put(S, "sd-badge", 80, 900, { kind: "PATCH NOTES", date: "NOV 4", t: W(12, 2), pop: true });
}
// ---- 8. clips 13-14: npm, eighteen testmetest packages ----
{
  const S = sc("network", "cyan");
  logo(S, "npm", 220, 200, 1.2, W(13, 3));
  chip(S, "OCT 19-25", 1620, 170, "white", 56, W(13, 5), { rot: 2 });
  const t0 = W(13, 11);
  for (let i = 0; i < 6; i++) L.put(S, "dev-container", 520 + (i % 3) * 330, 470 + Math.floor(i / 3) * 210, { s: 1.0, c: "teal", label: "pkg", t: t0 + i * 0.22, pop: true });
  chip(S, "18 PACKAGES", 860, 860, "yellow", 70, W(13, 12));
  chip(S, "*-testmetest", 860, 300, "pink", 50, W(14, 6));
  chip(S, "ONE OPERATOR", 1560, 860, "pink", 50, W(13, 15));
}
// ---- 9. clips 15-16: SafeDep's verdict: test accounts only ----
{
  const S = sc("scan", "lime");
  src(S, 820, 470, { site: "SafeDep, quoted by The Register", head: "testmetest, Oct 22", body: ["\"All observed activity belongs to the operator's own test accounts.\""], hl: 0, date: "OCT 22, 2026", w: 1080 }, W(15, 3));
  chip(S, "NO VICTIMS", 1520, 820, "lime", 90, W(16, 7), { rot: -3 });
}
// ---- 10. clips 17-18: the malware author doing QA ----
{
  const S = sc("dots", "yellow");
  L.put(S, "dev-container", 760, 500, { s: 2.0, c: "teal", label: "test" });
  chip(S, "testmetest", 760, 270, "pink", 50);
  bug(S, 1260, 640, { s: 1.0, mood: "smug", t: W(17, 3), pop: true });
  L.put(S, "sd-bubble", 1470, 260, { text: "TESTING|ON MYSELF", size: 46, tx: -120, ty: 150, t: W(17, 6) });
  chip(S, "MORE QA THAN US", 760, 860, "yellow", 64, W(18, 2), { rot: 2 });
}
// ---- 11. clip 19: good news / bad news, NO VICTIMS gets WRONG ----
{
  const S = sc("network", "pink");
  logo(S, "jfrog", 220, 200, 1.1, W(19, 1));
  chip(S, "OCT 26", 220, 360, "white", 56, W(19, 1));
  chip(S, "THE TEST HAD NO VICTIMS", 1060, 400, "lime", 64, W(19, 5), { rot: -1 });
  chip(S, "IT WASN'T A TEST", 1060, 640, "pink", 96, W(19, 12), { rot: 2 });
  S.punch(1060, 620, W(19, 18), 0.05);
}
// ---- 12. clips 20-21: rung 1, stolen tokens ----
{
  const S = sc("circuit", "lime", "none");
  ladder(S, 1, W(20, 0));
  L.put(S, "prop-laptop", 1450, 640, { s: 1.6 });
  chip(S, "GITHUB TOKEN", 1300, 330, "cyan", 52, W(21, 1), { rot: -4 });
  chip(S, "NPM TOKEN", 1640, 440, "yellow", 52, W(21, 3), { rot: 3 });
  logo(S, "github", 1160, 200, 0.8, W(21, 1));
  logo(S, "npm", 1780, 260, 0.8, W(21, 3));
}
// ---- 13. clip 22: rung 2, every repo the token reaches ----
{
  const S = sc("circuit", "lime", "none");
  ladder(S, 2, W(22, 0));
  const t0 = W(22, 10);
  ["owner/app", "owner/site", "owner/lib"].forEach((n, i) => L.put(S, "dev-repo-card", 1400, 250 + i * 230, { s: 0.62, name: n, desc: "a real project", stars: [312, 88, 1450][i], forks: [21, 4, 96][i], lang: "JavaScript", t: t0 + i * 0.35, slide: "left" }));
}
// ---- 14. clips 23-24: forged history ----
{
  const S = sc("glyphs", "pink");
  L.put(S, "dev-commit-graph", 820, 480, { s: 1.35, msgs: ["Update README.md", "fix typo", "bump deps", "Initial commit", "Update README.md", "add tests"], branch: "main", feature: "chore" });
  chip(S, "FORGED", 1560, 300, "pink", 110, W(23, 5), { rot: -6 });
  chip(S, "OLD DATES", 1560, 560, "white", 60, W(24, 4), { rot: 3 });
  chip(S, "OLD MESSAGES", 1560, 720, "white", 60, W(24, 2), { rot: -2 });
}
// ---- 15. clips 25-26: rung 3, tiny hooks + one giant script ----
{
  const S = sc("scan", "cyan", "none");
  ladder(S, 3, W(25, 0));
  tree(S, 1390, 520, { rows: HOOKS.slice(0, 4), w: 860, size: 40 }, W(25, 7));
  tree(S, 1390, 520, { rows: HOOKS, w: 860, size: 40 }, W(26, 2));
  chip(S, "GIANT", 1600, 860, "pink", 60, W(26, 2), { rot: -3 });
}
// ---- 16. clip 27: what a startup hook is ----
{
  const S = sc("dots", "cyan");
  L.put(S, "p2-folder", 360, 480, { s: 1.6, color: "yellow" });
  L.put(S, "sd-arrow", 560, 480, { to: [230, 0], bend: 0.2, c: "lime", t: W(27, 5) });
  L.put(S, "sci-gears", 1000, 470, { s: 1.2, t: W(27, 5), pop: true });
  chip(S, "STARTUP HOOK", 1000, 220, "lime", 60, W(27, 2));
  L.put(S, "sd-arrow", 1180, 480, { to: [230, 0], bend: -0.2, c: "lime", t: W(27, 8) });
  term(S, 1580, 480, ["$ (runs by itself)", "session starting…"], { s: 1.2 }, W(27, 8));
  chip(S, "WHEN A FOLDER OPENS", 1000, 820, "cyan", 56, W(27, 17));
}
// ---- 17. clip 28: it exists so the project can set itself up ----
{
  const S = sc("dots", "lime");
  dev(S, 480, "happy", { s: 1.3 });
  L.put(S, "sci-gears", 1260, 380, { s: 1.0 });
  chip(S, "SETS ITSELF UP", 1260, 650, "lime", 70, W(28, 6), { rot: -2 });
  chip(S, "A FEATURE", 1260, 830, "white", 56, W(28, 9), { rot: 2 });
}
// ---- 18. clip 29: rung 4, a developer clones and opens it ----
{
  const S = sc("circuit", "pink", "none");
  ladder(S, 4, W(29, 7));
  L.put(S, "p2-folder", 1400, 480, { s: 1.6, color: "yellow", t: W(29, 3), slide: "up" });
  chip(S, "git clone", 1400, 260, "white", 50, W(29, 3));
  chip(S, "OPEN", 1400, 740, "lime", 80, W(29, 7), { rot: -3 });
}
// ---- 19. clips 30-31: the tool politely runs the attacker's script ----
{
  const S = sc("glyphs", "pink");
  L.put(S, "sci-gears", 620, 430, { s: 1.4 });
  chip(S, "YOUR TOOL", 620, 720, "cyan", 56);
  L.put(S, "sd-arrow", 860, 430, { to: [300, 0], bend: 0.25, c: "white", t: W(30, 3) });
  bug(S, 1400, 640, { s: 1.0, t: W(30, 5), pop: true });
  chip(S, "attacker's script", 1400, 230, "pink", 56, W(30, 6));
  L.put(S, "sd-bubble", 640, 160, { text: "AS CONFIGURED!", size: 46, tx: 0, ty: 140, t: W(31, 3) });
}
// ---- 20. clips 32-33: Mahapatra: .claude/settings.json is the new autorun.inf ----
{
  const S = sc("scan", "yellow");
  src(S, 760, 450, { site: "infoworld.com", head: "Aman Mahapatra, Tribeca Softech", body: ["\".claude/settings.json is the new autorun.inf.\""], hl: 0, date: "OCT 27, 2026", w: 1060 }, W(32, 2));
  chip(S, "AUTORUN.INF", 1470, 800, "yellow", 90, W(33, 9), { rot: -3 });
  L.put(S, "w6-disc", 1640, 330, { s: 0.9, t: W(33, 9), pop: true });
}
// ---- 21. clip 34: the old Windows file: a disc starts a program ----
{
  const S = sc("drift", "yellow");
  L.put(S, "furn-computer", 760, 900, { s: 1.6 });
  L.put(S, "w6-disc", 1300, 330, { s: 0.8, t: W(34, 8), pop: true });
  L.put(S, "sd-arrow", 1180, 400, { to: [-240, 140], bend: 0.3, c: "white", t: W(34, 13) });
  chip(S, "AUTORUN", 1500, 640, "yellow", 70, W(34, 3), { rot: 3 });
  chip(S, "PROGRAM STARTS", 1500, 820, "white", 50, W(34, 12));
}
// ---- 22. clip 35: we spent years turning that off ----
{
  const S = sc("drift", "pink");
  chip(S, "AUTORUN", 760, 420, "yellow", 110, null, { rot: 3 });
  L.put(S, "sd-chip", 1080, 300, { text: "OFF", c: "pink", size: 70, rot: -8, t: W(35, 4), pop: true }); // small enough to pop
  dev(S, 1500, "tired", { s: 1.3 });
  chip(S, "YEARS OF WORK", 760, 720, "white", 60, W(35, 2));
}
// ---- 23. clip 36: the script makes more of itself ----
{
  const S = sc("network", "lime");
  bug(S, 760, 640, { s: 1.0 });
  bug(S, 1060, 640, { s: 0.8, t: W(36, 6), pop: true });
  bug(S, 1300, 640, { s: 0.6, t: W(36, 7) + 0.25, pop: true });
  bug(S, 1500, 640, { s: 0.45, t: W(36, 9), pop: true });
  chip(S, "SELF-PUBLISHING", 1060, 250, "lime", 80, W(36, 3), { rot: -2 });
}
// ---- 24. clips 37-38: the loop: package → repo → GitHub Actions → new package ----
{
  const S = sc("circuit", "cyan", "none");
  const N = [[480, 300, "PACKAGE", "npm"], [1440, 300, "REPO", "github"], [1440, 760, "GITHUB ACTIONS", "githubactions"], [480, 760, "NEW PACKAGE", "npm"]];
  const T = [null, null, W(37, 10), W(38, 6)];
  N.forEach(([x, y, lab, lg], i) => { logo(S, lg, x, y - 70, 0.9, T[i]); chip(S, lab, x, y + 70, i === 3 ? "pink" : "white", 50, T[i] == null ? null : T[i] + 0.1); });
  L.put(S, "sd-arrow", 640, 300, { to: [600, 0], bend: 0.12, c: "lime" });
  L.put(S, "sd-arrow", 1440, 420, { to: [0, 220], bend: 0.12, c: "lime", t: W(37, 5) });
  L.put(S, "sd-arrow", 1240, 760, { to: [-560, 0], bend: 0.12, c: "lime", t: W(38, 2) });
  chip(S, "npm tokens", 960, 860, "yellow", 46, W(38, 2));
}
// ---- 25. clips 39-40: a supply chain with a subscription plan ----
{
  const S = sc("blob", "pink");
  logo(S, "npm", 560, 330, 1.2);
  logo(S, "github", 1360, 330, 1.2);
  L.put(S, "sd-arrow", 700, 260, { to: [520, 0], bend: 0.35, c: "lime", t: W(39, 1) });
  L.put(S, "sd-arrow", 1220, 420, { to: [-520, 0], bend: 0.35, c: "lime", t: W(39, 5) });
  chip(S, "SUPPLY CHAIN", 960, 640, "white", 70, W(40, 2));
  chip(S, "NOW A SUBSCRIPTION", 960, 800, "pink", 70, W(40, 6), { rot: -2 });
}
// ---- 26. clip 41: it isn't clever code, it's a big file ----
{
  const S = sc("scan", "pink");
  chip(S, "NOT CLEVER CODE", 520, 240, "white", 56, W(41, 6), { rot: -3 });
  file(S, 960, 560, { w: 900, h: 360, nsize: 60 }, W(41, 10));
  chip(S, "A BIG FILE", 1500, 860, "pink", 70, W(41, 11), { rot: 3 });
}
// ---- 27. clips 42-43: code search skips files over 350 KiB; this one is ~40x ----
{
  const S = sc("glyphs", "cyan");
  src(S, 760, 420, { site: "docs.github.com, About code search", head: "Limitations", body: ["Empty files and files over 350 KiB are excluded"], hl: 0, logo: "logo-github", w: 1060 }, W(42, 2));
  chip(S, "350 KiB", 640, 800, "cyan", 80, W(42, 9));
  chip(S, "13.7 MB", 1520, 780, "pink", 110, W(43, 3), { rot: -3 });
  chip(S, "~40x", 1600, 230, "yellow", 70, W(43, 5), { rot: 4 });
}
// ---- 28. clips 44-45: contents API: "content": "" ----
{
  const S = sc("scan", "lime", "none");
  src(S, 620, 330, { site: "docs.github.com, Repository contents", head: "Files between 1-100 MB", body: ["the content field will be an empty string"], hl: 0, w: 960, size: 34 }, W(44, 7));
  L.put(S, "dev-code", 1340, 680, { s: 1.5, lang: "json", file: "response.json", code: "{\n  \"path\": \".github/init.js\",\n  \"size\": 13729714,\n  \"content\": \"\",\n  \"encoding\": \"none\"\n}", hl: [4], t: W(45, 0), slide: "up" });
  chip(S, "EMPTY STRING", 520, 760, "pink", 64, W(45, 7), { rot: -2 });
}
// ---- 29. clips 46-47: first sweep: 26 repos, scripts look empty; "that conclusion was wrong" ----
{
  const S = sc("network", "yellow");
  chip(S, "26 REPOS", 380, 240, "yellow", 90, W(46, 8), { rot: -2 });
  file(S, 560, 560, { size: "0 B?", sc: "white", note: "", w: 780 }, W(46, 13));
  src(S, 1420, 520, { site: "research.jfrog.com", head: "JFrog", body: ["\"That conclusion was wrong.\""], hl: 0, logo: "logo-jfrog", w: 720, size: 40 }, W(47, 1));
}
// ---- 30. clips 48-49: read the git trees directly: 26 → 42 ----
{
  const S = sc("circuit", "lime");
  logo(S, "git", 260, 220, 1.0, W(48, 7));
  tree(S, 820, 540, { title: "git tree", rows: [[".claude/", ""], [".github/", ""], ["  init.js", "13.7 MB", true], ["src/", ""]], w: 700, size: 40 }, W(48, 5));
  chip(S, "26", 1520, 380, "white", 90, null, { rot: -3 });
  L.put(S, "sd-arrow", 1520, 470, { to: [0, 150], bend: 0.2, c: "lime", t: W(49, 2) });
  chip(S, "42", 1520, 760, "lime", 150, W(49, 5), { rot: 3 });
}
// ---- 31. clip 50: the airport scanner analogy ----
{
  const S = sc("dots", "cyan");
  L.put(S, "w6-xray", 900, 560, {});
  L.put(S, "prop-suitcase", 900, 520, { s: 0.9, t: W(50, 4), slide: "right" });
  chip(S, "SCANNED", 900, 220, "lime", 56, W(50, 6));
  L.put(S, "prop-suitcase", 1600, 450, { s: 2.6, t: W(50, 9), slide: "left" });
  chip(S, "TOO BIG TO SCAN", 1520, 860, "pink", 60, W(50, 11), { rot: -2 });
}
// ---- 32. clip 51: you just need a bigger suitcase ----
{
  const S = sc("dots", "pink");
  L.put(S, "w6-xray", 760, 560, {});
  L.put(S, "prop-suitcase", 1560, 470, { s: 2.6 });
  L.put(S, "sd-arrow", 1250, 820, { to: [-700, 20], bend: -0.25, c: "white", t: W(51, 6) });
  chip(S, "WAVED THROUGH", 760, 220, "yellow", 70, W(51, 10), { rot: 2 });
  S.punch(1560, 470, W(51, 11), 0.05);
}
// ---- 33. clips 52-53: Mahapatra: read the documentation, padded the file ----
{
  const S = sc("glyphs", "yellow");
  src(S, 900, 450, { site: "infoworld.com", head: "Aman Mahapatra", body: ["\"The attacker read the documentation for your detection tooling and padded the file past its limits.\""], hl: 0, w: 1180 }, W(52, 5));
  chip(S, "PADDED", 1560, 820, "pink", 90, W(53, 1), { rot: -3 });
}
// ---- 34. clip 54: ten versions, 12.9 to 13.7 MB ----
{
  const S = sc("scan", "cyan");
  const sz = ["12.9", "13.0", "13.0", "13.2", "13.7", "13.7", "13.7", "13.7", "13.7", "13.7"];
  sz.forEach((v, i) => L.put(S, "sd-chip", 360 + (i % 5) * 300, 330 + Math.floor(i / 5) * 200, { text: v + " MB", c: i % 2 ? "white" : "cyan", size: 50, rot: (i % 3 - 1) * 3, t: W(54, 2) + i * 0.12, pop: true }));
  chip(S, "10 VERSIONS", 960, 800, "yellow", 80, W(54, 4));
}
// ---- 35. clip 55: all ten were the same 2 MB payload ----
{
  const S = sc("scan", "pink");
  for (let i = 0; i < 10; i++) L.put(S, "sd-chip", 300 + i * 146, 260, { text: "v" + (i + 1), c: "white", size: 40, rot: (i % 3 - 1) * 4 });
  for (let i = 0; i < 10; i++) L.put(S, "sd-arrow", 300 + i * 146, 320, { to: [(960 - (300 + i * 146)) * 0.8, 260], bend: 0.05, c: "lime", w: 6, t: W(55, 2) + i * 0.05 });
  chip(S, "SAME 2 MB PAYLOAD", 960, 720, "pink", 90, W(55, 5));
}
// ---- 36. clip 56: here's the boring tool that sees it: WE RAN IT ----
{
  const S = sc("glyphs", "lime");
  chip(S, "WE RAN IT", 300, 180, "lime", 70, W(56, 7), { rot: -3 });
  logo(S, "git", 960, 420, 1.6, W(56, 2));
  chip(S, "DUMMY FILE, SAME SIZE", 960, 720, "white", 60, W(56, 14));
}
// ---- 37. clips 57-58: git ls-tree prints 13729714; search can skip, git can't ----
{
  const S = sc("scan", "lime", "none");
  term(S, 900, 400, LS, { s: 2.05, title: "zsh: demo-repo" }, W(57, 1));
  chip(S, "13,729,714 BYTES", 1440, 820, "pink", 60, W(57, 6), { rot: 2 });
  chip(S, "SEARCH CAN SKIP", 500, 905, "white", 50, W(58, 0));
  chip(S, "GIT CAN'T", 1000, 905, "lime", 50, W(58, 5));
}
// ---- 38. clips 59-60: newest builds: compiled add-on + encrypted cache, checks where it runs ----
{
  const S = sc("network", "pink");
  chip(S, "NEWEST BUILD", 380, 180, "yellow", 56, W(59, 1), { rot: -3 });
  L.put(S, "dev-container", 820, 480, { s: 2.0, c: "purple", label: "addon", t: W(59, 12), slide: "up" });
  L.put(S, "prop-padlock", 1340, 500, { s: 1.6, t: W(59, 7), pop: true });
  chip(S, ".napi_cache", 1340, 720, "white", 50, W(59, 9));
  chip(S, "addon.node", 820, 720, "white", 50, W(59, 12));
  L.put(S, "ep-magnifier", 1640, 400, { s: 1.0, t: W(60, 2), pop: true });
  chip(S, "WHERE AM I?", 1640, 820, "cyan", 50, W(60, 3), { rot: 3 });
}
// ---- 39. clip 61: CI runner, container, tiny VM, debugger: asleep ----
{
  const S = sc("circuit", "cyan");
  [["CI RUNNER", 9 - 5], ["CONTAINER", 6], ["TINY VM", 9], ["DEBUGGER", 14]].forEach(([lab, wi], i) => {
    const x = 300 + i * 440, t = W(61, i === 0 ? 4 : wi);
    room(S, x, 480, { label: lab, zzz: true, w: 380, h: 320 }, t);
    bug(S, x - 40, 600, { s: 0.55, mood: "scared", t: t + 0.1, pop: true });
  });
  chip(S, "QUIETLY DOES NOTHING", 960, 820, "white", 64, W(61, 16));
}
// ---- 40. clips 62-63: on a real laptop it wakes up; shy around scanners ----
{
  const S = sc("blob", "pink");
  room(S, 420, 460, { label: "SANDBOX", zzz: true, w: 380, h: 320, c: "cyan" });
  bug(S, 380, 580, { s: 0.55, mood: "scared" });
  chip(S, "SHY", 420, 760, "cyan", 70, W(63, 1), { rot: -3 });
  room(S, 1320, 440, { label: "YOUR LAPTOP", w: 640, h: 440, c: "pink" }, W(62, 2));
  L.put(S, "prop-laptop", 1320, 560, { s: 1.3, t: W(62, 2) + 0.1, pop: true });
  bug(S, 1500, 640, { s: 0.9, mood: "smug", t: W(62, 5), pop: true });
  chip(S, "VERY OUTGOING", 1320, 860, "pink", 64, W(63, 5), { rot: 2 });
}
// ---- 41. clip 64: revoke the token, it wipes your home directory ----
{
  const S = sc("network", "pink");
  L.put(S, "ep46-delete-key", 560, 430, { s: 1.0, c: "red", label: "REVOKE TOKEN", w: 640, h: 220, size: 58, t: W(64, 6), pop: true });
  src(S, 1340, 430, { site: "theregister.com", head: "The Register", body: ["installs a wiper that deletes the home directory when the victim revokes the stolen GitHub token"], hl: 0, w: 900, size: 36 }, W(64, 10));
  chip(S, "TAKES IT PERSONALLY", 960, 860, "pink", 64, W(64, 20), { rot: -2 });
}
// ---- 42. clip 65: clean up first, then revoke ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-counter", 300, 330, { n: 1, size: 60 });
  chip(S, "REMOVE PERSISTENCE", 920, 330, "lime", 70, W(65, 7));
  L.put(S, "sd-counter", 300, 580, { n: 2, size: 60, t: W(65, 11) });
  chip(S, "THEN REVOKE", 780, 580, "white", 70, W(65, 11) + 0.1);
  dev(S, 1620, "determined", { s: 1.2 });
}
// ---- 43. clips 66-67: GitHub wasn't breached; hooks aren't bugs ----
{
  const S = sc("blob", "cyan");
  const d = dev(S, 380, "thinking", { s: 1.25 });
  logo(S, "github", 1100, 380, 1.5, W(67, 0));
  chip(S, "NOT BREACHED", 1100, 640, "lime", 80, W(67, 3), { rot: -2 });
  chip(S, "HOOKS ≠ BUGS", 1100, 830, "white", 56, W(67, 7), { rot: 2 });
  swap(S, d, 380, "wow", W(66, 5), { s: 1.25 });
}
// ---- 44. clips 68-69: Dickson: features, not flaws; stolen credentials ----
{
  const S = sc("blob", "lime");
  src(S, 860, 420, { site: "infoworld.com", head: "Frank Dickson, Dickson Research", body: ["\"these hooks are features, not flaws.\"", "\"The root cause here is stolen credentials, not the AI tools.\""], hl: [1], w: 1180 }, W(68, 1));
  chip(S, "STOLEN CREDENTIALS", 1180, 830, "pink", 70, W(69, 5), { rot: -2 });
}
// ---- 45. clips 70-71: nobody knows how many laptops ----
{
  const S = sc("dots", "yellow");
  L.put(S, "prop-laptop", 520, 480, { s: 1.4 });
  chip(S, "? LAPTOPS", 520, 760, "yellow", 90, W(70, 6), { rot: -3 });
  src(S, 1340, 460, { site: "heise.de", head: "heise online", body: ["\"It's unclear how many computers ran the malware or what data was stolen.\""], hl: 0, w: 860, size: 36 }, W(71, 0));
}
// ---- 46. clips 72-73: danger moved from install to open ----
{
  const S = sc("drift", "pink");
  chip(S, "DANGER = INSTALL", 620, 400, "white", 80, W(73, 4), { rot: -2 });
  S.strike(240, 340, 1000, 460, W(73, 8), 0.4, { c: "#ff4d8d" });
  chip(S, "DANGER = OPEN", 1340, 640, "pink", 100, W(73, 12), { rot: 2 });
  S.punch(1340, 640, W(73, 12), 0.05);
}
// ---- 47. clips 74-75: three checks; one: don't trust it yet ----
{
  const S = sc("scan", "lime");
  chip(S, "3 CHECKS", 400, 200, "lime", 80, W(74, 1), { rot: -2 });
  L.put(S, "sd-counter", 120, 900, { n: 1, of: 3, size: 44, t: W(75, 0) });
  chip(S, "VS CODE", 400, 420, "cyan", 60, W(75, 0));
  L.put(S, "dev-browser", 1240, 500, { s: 0.85, url: "Workspace Trust", page: "blank", w: 900, h: 520, t: W(75, 3), slide: "up" });
  chip(S, "Trust the authors of this folder?", 1240, 390, "cyan", 40, W(75, 5));
  chip(S, "No, I don't trust the authors", 1240, 560, "lime", 40, W(75, 7));
}
// ---- 48. clips 76-77: VS Code docs: Restricted Mode, agents off ----
{
  const S = sc("glyphs", "cyan");
  src(S, 820, 420, { site: "code.visualstudio.com/docs", head: "Workspace Trust", body: ["\"When in doubt, leave a folder in Restricted Mode.\"", "\"Opening a workspace in restricted mode disables agents in that workspace.\""], hl: 0, w: 1100 }, W(76, 3));
  chip(S, "RESTRICTED MODE", 1520, 820, "lime", 64, W(76, 12), { rot: -2 });
  chip(S, "AGENTS OFF", 560, 840, "white", 56, W(77, 4), { rot: 2 });
}
// ---- 49. clip 78: same answer for every agent's trust prompt ----
{
  const S = sc("glyphs", "lime");
  TOOLS.slice(0, 3).forEach(([lg], i) => logo(S, lg, 460 + i * 500, 330, 1.0, W(78, 1) + i * 0.25));
  [0, 1, 2].forEach((i) => chip(S, "NOT YET", 460 + i * 500, 520, "pink", 50, W(78, 7) + i * 0.15));
  chip(S, "SAME ANSWER", 960, 790, "lime", 80, W(78, 6));
}
// ---- 50. clips 79-80: two: look in the dot folders first ----
{
  const S = sc("scan", "cyan", "none");
  L.put(S, "sd-counter", 120, 900, { n: 2, of: 3, size: 44, t: W(79, 0) });
  chip(S, "PLAIN FILE VIEWER", 440, 200, "white", 50, W(79, 9));
  tree(S, 1100, 520, { title: "stranger-repo/", rows: [[".claude/", "1 KB"], [".gemini/", "1 KB"], [".cursor/", "2 KB"], [".vscode/", "1 KB"], [".github/", "13.7 MB", true]], w: 900, size: 42 }, W(80, 0));
}
// ---- 51. clips 81-82: a 13 MB script is not setting up your linter ----
{
  const S = sc("dots", "pink");
  const d = dev(S, 330, "thinking", { s: 1.2 });
  L.put(S, "w6-file", 900, 700, { name: "lint.json", size: "1 KB", sc: "lime", w: 560, h: 260, nsize: 44 });
  L.put(S, "bld-skyscraper", 1450, 930, { s: 1.6, t: W(81, 6), slide: "up" });
  chip(S, "13 MB", 1450, 200, "pink", 80, W(81, 6), { rot: 3 });
  chip(S, "NOT A LINTER", 900, 400, "white", 60, W(82, 2), { rot: -2 });
  swap(S, d, 330, "confused", W(82, 2), { s: 1.2 });
}
// ---- 52. clip 83: three: don't audit with search alone, read the tree ----
{
  const S = sc("circuit", "lime");
  L.put(S, "sd-counter", 120, 900, { n: 3, of: 3, size: 44, t: W(83, 0) });
  chip(S, "SEARCH ALONE", 520, 330, "white", 70, W(83, 8), { rot: -2 });
  chip(S, "READ THE TREE", 1300, 560, "lime", 100, W(83, 10), { rot: 2 });
  logo(S, "git", 1300, 300, 1.1, W(83, 11));
}
// ---- 53. clip 84: scoped, short-lived tokens ----
{
  const S = sc("network", "cyan");
  chip(S, "TOKEN", 720, 340, "cyan", 110, W(84, 2), { rot: -2 });
  chip(S, "EXPIRES 1H", 640, 580, "yellow", 60, W(84, 5), { rot: 3 });
  chip(S, "ONE REPO", 1000, 700, "white", 60, W(84, 3), { rot: -3 });
  chip(S, "IT STARTED WITH A STOLEN TOKEN", 960, 880, "pink", 50, W(84, 10));
}
// ---- 54. clips 85-86: treat it as a compromised machine, rotate everything in order ----
{
  const S = sc("network", "pink");
  logo(S, "jfrog", 220, 200, 1.0, W(85, 6));
  src(S, 900, 420, { site: "research.jfrog.com (via InfoWorld)", head: "If you ran it", body: ["treat installation of a full-worm version as a host compromise"], hl: 0, w: 1000 }, W(85, 6));
  chip(S, "ROTATE EVERYTHING", 900, 760, "lime", 80, W(86, 1), { rot: -2 });
  chip(S, "IN ORDER", 1560, 880, "white", 56, W(86, 7), { rot: 3 });
}
// ---- 55. clips 87-88: callback: the file card and the search box; EMPTY moves onto the search result ----
{
  const S = sc("scan", "cyan");
  logo(S, "github", 200, 190, 1.1);
  file(S, 760, 420, {});
  L.put(S, "dev-prompt-box", 1440, 640, { s: 1.0, text: "path:.github/init.js", w: 700 });
  chip(S, "EMPTY", 1440, 820, "pink", 96, null, { rot: -4 });
  chip(S, "13.7 MB", 760, 760, "pink", 90, W(88, 2), { rot: 3 });
  chip(S, "SEARCH RESULT: EMPTY", 1340, 220, "yellow", 56, W(88, 9), { rot: -2 });
}
// ---- 56. clip 89: sign-off ----
{
  const S = sc("drift", "lime");
  L.put(S, "sd-sting", 960, 440, { s: 1.6, t: W(89, 0) });
  dev(S, 1560, "happy", { s: 1.1 });
}
