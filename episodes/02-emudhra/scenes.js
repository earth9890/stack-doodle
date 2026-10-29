// look: still
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// @include assets/ep-kit.js
// eMudhra postmortem (~3 min). The notary SEAL with a big "4" on its face is the running visual: cold open, the defence, the end (in a museum case).
// Cast: Dev (sd-dev, the viewer), Suit (the company spokesperson, generic), Wayne (hooded researcher doodle), Stacky cameo. Real people are name chips only.
// Educational only: no code, commands or recovery/forging steps anywhere.
// Clip numbers (1-based, script.md split at / and //), one scene each: 1-2 | 3 | 4 | 5-6 | 7-8 | 9 | 10-11 | 12 | 13 | 14 | 15 | 16-17 | 18 | 19-20 | 21 | 22 | 23-24 | 25-26 | 27 | 28 | 29 | 30-31 | 32-33 | 34-35 | 36-37 | 38 | 39-40 | 41-42 | 43
const WIN = sceneWindows([[1, 0], [3, 0], [4, 0], [5, 0], [7, 0], [9, 0], [10, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [18, 0], [19, 0], [21, 0], [22, 0],
  [23, 0], [25, 0], [27, 0], [28, 0], [29, 0], [30, 0], [32, 0], [34, 0], [36, 0], [38, 0], [39, 0], [41, 0], [43, 0]], 0.4);
const bg = (S, o = {}) => L.put(S, "sd-bg", 0, 0, o);
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0 }, t == null ? {} : { t, pop: true }, o));
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));
const wayne = (S, x, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.25, hoodie: L.epHood, phones: false, face: "smug" }, o));
const suit = (S, x, o = {}) => L.put(S, "sd-suit", x, 930, Object.assign({ s: 1.4, face: "smug" }, o));
const seal = (S, x, y, r, text, t, o = {}) => L.put(S, "sd-seal", x, y, Object.assign({ r, text }, t == null ? {} : { t, pop: true }, o));
const src = (S, x, y, o, t) => L.put(S, "sd-source", x, y, Object.assign({ w: 900, size: 36 }, o, t == null ? {} : { t, slide: "up" }));
const logo = (S, name, x, y, s, t) => L.put(S, name, x, y, Object.assign({ tile: true, s }, t == null ? {} : { t, pop: true }));
// spread a run of word times so no two entrances land closer than g seconds
const sp = (ts, g = 0.55) => ts.reduce((o, t) => (o.push(o.length ? Math.max(t, o[o.length - 1] + g) : t), o), []);
// left-aligned todo row: centre x from the row width (same maths as sd-todo)
const todo = (S, text, x0, y, t, size = 70) => L.put(S, "sd-todo", x0 + (text.length * size * 0.62 + size * 2.1) / 2, y, { text, size, t, slide: "right" });

// ---- 1. clips 1-2: cold open, a padlock, a stamp that says 4, Dev counts on his fingers ----
{
  const [a, b] = WIN[0], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 1270, gy: 520 });
  L.put(S, "dev-browser", 1270, 490, { s: 1.3, url: "mybank.in", page: "blank" });
  const d1 = dev(S, 330, "thinking", { s: 1.25 });
  L.put(S, "prop-padlock", 1090, 570, { s: 2.2, t: W(1, 6), pop: true });
  chip(S, "SECRET KEY", 1680, 150, "pink", 56, W(1, 11), { rot: 4 });
  const tool = L.put(S, "sd-seal", 1500, 600, { r: 200, face: false, tool: true });
  tl.set(tool, { y: 280, opacity: 0 }, 0);
  tl.to(tool, { y: 600, opacity: 1, duration: 0.25, ease: "power2.in" }, W(2, 4) - 0.05);
  seal(S, 1500, 600, 200, "4", W(2, 5));
  tl.to(tool, { y: 280, opacity: 0, duration: 0.5, ease: "power1.out" }, W(2, 5) + 0.3);
  S.hide(d1, W(2, 6));
  dev(S, 330, "shocked", { s: 1.25, t: W(2, 6), pop: true });
  L.put(S, "sd-bubble", 500, 330, { text: "1 2 3 4...", size: 60, tx: -90, ty: 130, t: W(2, 4) });
}

// ---- 2. clip 3: not four digits, four ----
{
  const [a, b] = WIN[1], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 1300, gy: 560 });
  chip(S, "NOT FOUR DIGITS", 700, 170, "white", 90, null, { rot: -2 });
  chip(S, "FOUR", 520, 520, "pink", 240, W(3, 3), { rot: -3 });
  seal(S, 1400, 560, 300, "4", W(3, 6));
  L.put(S, "sd-hand", 1090, 790, { s: 1.2, rot: -35, t: W(3, 12), pop: true });
}

// ---- 3. clip 4: the promise ----
{
  const [a, b] = WIN[2], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 800, gy: 480 });
  const row = (text, y, c, rot, t) => chip(S, text, 140 + (text.length * 100 * 0.64 + 110) / 2, y, c, 100, t, { rot });
  row("1 THE KEY", 250, "cyan", -1.5, W(4, 2));
  row("2 CAUGHT", 460, "yellow", 1.5, W(4, 8));
  row("3 THE FALLOUT", 670, "pink", -1, W(4, 13));
  dev(S, 1560, "thinking", { s: 1.35 });
  L.put(S, "sd-badge", 80, 890, { kind: "POSTMORTEM", date: "OCT 22", t: W(4, 15), pop: true });
}

// ---- 4. clips 5-6: browser, padlock, a certificate signed by a company ----
{
  const [a, b] = WIN[3], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 900, gy: 500 });
  L.put(S, "dev-browser", 480, 480, { s: 0.8, url: "mybank.in", page: "blank" });
  L.put(S, "prop-padlock", 480, 530, { s: 1.5, t: W(5, 5), pop: true });
  L.put(S, "sd-arrow", 860, 480, { to: [210, 0], bend: 0.2, c: "lime", t: W(5, 6) });
  L.put(S, "sd-cert", 1380, 470, { title: "CERTIFICATE", sub: "mybank.in", w: 500, h: 640, t: W(5, 8), slide: "up" });
  seal(S, 1560, 700, 140, "4", W(6, 4));
  chip(S, "CERTIFICATE AUTHORITY", 960, 880, "pink", 62, W(6, 8), { rot: -1.5 });
}

// ---- 5. clips 7-8: the stamp is the private key; sign anything ----
{
  const [a, b] = WIN[4], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 560, gy: 560 });
  seal(S, 560, 580, 300, "4", null);
  chip(S, "PRIVATE KEY = THE STAMP", 960, 150, "pink", 64, W(7, 4), { rot: -1 });
  L.put(S, "sd-cert", 1250, 330, { title: "CERTIFICATE", sub: "bank.in", w: 330, h: 300, tsize: 0.095, t: W(8, 4), slide: "left" });
  L.put(S, "sd-cert", 1620, 480, { title: "CERTIFICATE", sub: "mail.example", w: 330, h: 300, tsize: 0.095, t: W(8, 7), slide: "left" });
  L.put(S, "sd-cert", 1250, 650, { title: "CERTIFICATE", sub: "any-site.com", w: 330, h: 300, tsize: 0.095, t: W(8, 10), slide: "left" });
  chip(S, "BROWSER BELIEVES IT", 1500, 870, "lime", 52, W(8, 13), { rot: 2 });
}

// ---- 6. clip 9: bank, email, payments each get a padlock ----
{
  const [a, b] = WIN[5], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "yellow", gx: 960, gy: 400 });
  seal(S, 960, 240, 140, "4", null);
  [["mybank.in", 340], ["mail.example", 960], ["pay.example", 1580]].forEach(([u, x]) => L.put(S, "dev-browser", x, 650, { s: 0.62, url: u, page: "blank" }));
  const T = sp([W(9, 3), W(9, 5), W(9, 8)], 0.6);
  [340, 960, 1580].forEach((x, i) => L.put(S, "prop-padlock", x, 700, { s: 1.3, t: T[i], pop: true }));
}

// ---- 7. clips 10-11: a proper key is a huge random number ----
{
  const [a, b] = WIN[6], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "cyan", gx: 960, gy: 500 });
  chip(S, "A RANDOM 384-BIT NUMBER", 960, 200, "cyan", 80, W(10, 4), { rot: -1 });
  const dg = L.put(S, "sd-digits", 200, 520, { text: "5829174036158274920163857409218364570281936452087153649201837465", size: 220, c: "lime", t: W(10, 8) });
  S.move(dg, W(10, 8), b - W(10, 8) - 0.3, { x: -4300 }, "none");
  chip(S, "~10^115 POSSIBILITIES", 960, 810, "pink", 80, W(11, 7), { rot: 1.5 });
}

// ---- 8. clip 12: eMudhra, trusted by every browser ----
{
  const [a, b] = WIN[7], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 600, gy: 400 });
  chip(S, "eMudhra", 440, 210, "lime", 130, null, { rot: -2 });
  src(S, 1330, 520, { site: "theregister.com", head: "Scott Helme, researcher", body: ["“One of eMudhra's certificate authority private keys is the number 4.”"], hl: 0, w: 960, size: 40 }, W(12, 3));
  const T = sp([W(12, 5), W(12, 7), W(12, 9)], 0.9);
  chip(S, "TRUSTED BY", 440, 400, "white", 48, T[0] - 0.3, { rot: -1 });
  logo(S, "logo-firefox", 200, 560, 1.7, T[0]);
  logo(S, "logo-googlechrome", 440, 560, 1.7, T[1]);
  logo(S, "logo-apple", 680, 560, 1.7, T[2]);
}

// ---- 9. clip 13: eight keys: 4, 56, 115, 237 ----
{
  const [a, b] = WIN[8], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 700, gy: 560 });
  chip(S, "8 KEYS", 960, 170, "lime", 130, null, { rot: -1.5 });
  seal(S, 440, 590, 210, "4", W(13, 6));
  seal(S, 870, 590, 150, "56", W(13, 10), { ac: "ink" });
  seal(S, 1210, 590, 150, "115", W(13, 13), { ac: "ink" });
  seal(S, 1550, 590, 150, "237", W(13, 16), { ac: "ink" });
}

// ---- 10. clip 14: a calculator from a cereal box ----
{
  const [a, b] = WIN[9], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "yellow", gx: 1000, gy: 500 });
  dev(S, 280, "confused", { s: 1.35 });
  L.put(S, "sd-bubble", 480, 300, { text: "WAIT...", size: 64, tx: -120, ty: 150, t: W(14, 1) });
  L.put(S, "p2-calculator", 940, 540, { s: 3.4, t: W(14, 7), pop: true });
  L.put(S, "sd-cereal", 1560, 520, { s: 1.1, t: W(14, 10), pop: true });
}

// ---- 11. clip 15: the ceremony, April 30 2025, hardware security module ----
{
  const [a, b] = WIN[10], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 800, gy: 500 });
  L.put(S, "info-calendar-month", 520, 500, { s: 1.2, month: "APRIL", days: 30, start: 1, marked: [30] });
  chip(S, "APRIL 30, 2025", 1280, 180, "cyan", 66, W(15, 11), { rot: -2 });
  L.put(S, "p2-safe", 1420, 920, { s: 2.9, t: W(15, 15), pop: true });
  chip(S, "HSM", 1760, 360, "yellow", 90, W(15, 17), { rot: 4 });
}

// ---- 12. clips 16-17: the company's explanation; the weak keys go to the browsers ----
{
  const [a, b] = WIN[11], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 960, gy: 500 });
  const card = src(S, 960, 450, { site: "theregister.com", head: "eMudhra's statement", body: ["“A flaw in the KGC caused a wrap/unwrap step to", "produce a second set of weak keys alongside the original strong keys.”"], hl: 1, w: 1300, size: 44, headSize: 56 });
  const weakChip = chip(S, "A SECOND SET: WEAK", 960, 850, "pink", 80, W(16, 8), { rot: -1.5 });
  const t17 = W(17, 0) - 0.3;
  S.fadeOut(card, t17, 0.4);
  S.fadeOut(weakChip, t17, 0.4);
  L.put(S, "dev-browser", 1380, 430, { s: 1.0, url: "browser trust list", page: "blank", t: W(17, 0), slide: "left" });
  const belt = S.grp();
  DS.shape(S, rrect(100, 790, 1480, 60, 28), "gray", { flat: true, w: "detail", parent: belt });
  [200, 420, 640, 860, 1080, 1300, 1500].forEach((x) => DS.shape(S, circ(x, 820, 14), "ink", { flat: true, w: "hair", parent: belt }));
  S.fadeIn(belt, W(17, 0) + 0.1, 0.4);
  chip(S, "STRONG KEYS", 400, 720, "lime", 66, W(17, 1), { rot: -1 });
  const weak = chip(S, "TINY KEYS", 850, 720, "pink", 66, W(17, 3), { rot: 1 });
  S.move(weak, W(17, 6), 1.6, { x: 1250, y: 600 }, "sine.inOut");
  chip(S, "TO THE BROWSERS", 1380, 880, "cyan", 54, W(17, 9), { rot: 1 });
}

// ---- 13. clip 18: well over a year ----
{
  const [a, b] = WIN[12], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "pink", gx: 960, gy: 520 });
  const bar = S.grp();
  DS.shape(S, rrect(260, 450, 1400, 140, 70), "green", { flat: true, w: "detail", parent: bar });
  tl.fromTo(bar, { scaleX: 0, svgOrigin: "260 520" }, { scaleX: 1, svgOrigin: "260 520", duration: Math.min(3.2, (b - a) - 1.4), ease: "power1.inOut" }, a + 0.9);
  chip(S, "MID 2025", 330, 740, "cyan", 72, W(18, 1), { rot: -2 });
  chip(S, "WELL OVER A YEAR", 960, 290, "pink", 110, W(18, 8), { rot: -1.5 });
  chip(S, "OCT 2026", 1590, 740, "yellow", 72, W(18, 10), { rot: 2 });
}

// ---- 14. clips 19-20: Wayne scans a wall of public certificates; a 4 glints ----
{
  const [a, b] = WIN[13], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "yellow", gx: 1250, gy: 520 });
  L.put(S, "sd-certwall", 1290, 520, { cols: 6, rows: 3, cw: 170, ch: 215, gap: 24 });
  wayne(S, 330, { s: 1.3, pose: "point", t: W(19, 6), pop: true });
  chip(S, "WAYNE", 330, 360, "white", 70, W(19, 6), { rot: -3 });
  S.fill(poly([[560, 640], [690, 230], [690, 830]]), W(19, 8), 0.5, DS.c("yellow"), 0.22);
  seal(S, 1455, 520, 62, "4", W(20, 3), { top: "", bottom: "" });
  L.put(S, "star-twinkle", 1455, 520, { s: 0.8, t: W(20, 3) + 0.3, pop: true });
}

// ---- 15. clip 21: the note, signed with eMudhra's own key ----
{
  const [a, b] = WIN[14], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 900, gy: 450 });
  L.put(S, "sd-note", 900, 400, { lines: ["We have a problem here", "– Wayne"], w: 1300, size: 100 });
  seal(S, 1380, 660, 210, "4", W(21, 6), { top: "eMUDHRA", bottom: "SIGNED" });
  chip(S, "THEIR OWN KEY", 520, 800, "yellow", 70, W(21, 9), { rot: -2 });
}

// ---- 16. clip 22: the master stamp on the pavement ----
{
  const [a, b] = WIN[15], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "yellow", gx: 700, gy: 600 });
  DS.shape(S, rect(0, 810, 1920, 130), "gray", { flat: true, w: "hair" });
  L.put(S, "sd-stamptool", 620, 830, { r: 270, t: W(22, 3), pop: true });
  chip(S, "BANK'S MASTER STAMP", 620, 190, "pink", 62, W(22, 4), { rot: -2 });
  wayne(S, 1000, { s: 1.15, pose: "point", t: W(22, 7), pop: true });
  L.put(S, "sd-note", 1470, 430, { lines: ["YOU DROPPED", "THIS"], w: 640, size: 80, t: W(22, 9), slide: "left" });
  seal(S, 1640, 620, 140, "4", W(22, 12), { top: "eMUDHRA", bottom: "SIGNED" });
}

// ---- 17. clips 23-24: Scott Helme, a forged certificate accepted by five tools ----
{
  const [a, b] = WIN[16], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 700, gy: 550 });
  chip(S, "SCOTT HELME|RESEARCHER", 500, 150, "cyan", 58, W(23, 1), { rot: -2 });
  L.put(S, "sd-cert", 500, 590, { title: "FORGED CERT", sub: "payments site", ac: "pink", w: 480, h: 600, tsize: 0.09, t: W(23, 4), slide: "up" });
  const tools = [["logo-curl", "curl", 1180, 330], ["logo-python", "Python", 1440, 330], ["logo-nodedotjs", "Node", 1700, 330], ["logo-go", "Go", 1310, 620], ["logo-openjdk", "Java", 1570, 620]];
  const T = sp([W(24, 11), W(24, 12), W(24, 13), W(24, 14), W(24, 16)], 0.6);
  tools.forEach(([lg, nm, x, y], i) => L.put(S, "sd-ticklogo", x, y, { logo: lg, name: nm, w: 230, t: T[i], pop: true }));
  chip(S, "FORGED CERT ACCEPTED", 1430, 860, "pink", 54, W(24, 9), { rot: 1 });
}

// ---- 18. clips 25-26: the internet moves fast; Mozilla, Chrome, Apple, Microsoft block ----
{
  const [a, b] = WIN[17], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 960, gy: 500 });
  const fast = chip(S, "FAST, FOR ONCE", 960, 520, "yellow", 150, null, { rot: -2 });
  S.fadeOut(fast, W(26, 0) - 0.3, 0.4);
  const row = (logoName, name, sub, c, x, tt, ts) => {
    L.put(S, "sd-tile", x, 520, Object.assign({ name, sub, c, t: tt, pop: true }, logoName ? { logo: logoName } : {}));
    L.put(S, "stamp-nope", x, 700, { s: 0.62, text: "BLOCKED", c: "red", t: ts, pop: true });
  };
  row("logo-firefox", "FIREFOX", "~3 HOURS", "cyan", 300, W(26, 0), W(26, 4));
  row("logo-googlechrome", "CHROME", "SAME DAY", "yellow", 740, W(26, 8), W(26, 10));
  row("logo-apple", "APPLE", "OCT 19", "lime", 1180, W(26, 12), W(26, 14));
  row(null, "MICROSOFT", "OCT 20", "pink", 1620, W(26, 16), W(26, 18));
}

// ---- 19. clip 27: revoked within 14 hours, no misuse (company says) ----
{
  const [a, b] = WIN[18], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 650, gy: 500 });
  src(S, 640, 500, { site: "thenextweb.com", head: "eMudhra's statement", body: ["Revoked “within 14 hours of discovery”.", "“the affected authorities issued no certificates to websites or users”"], hl: [0, 1], w: 1080, size: 40 });
  L.put(S, "sd-year", 1560, 330, { year: "14", label: "HOURS", c: "pink", size: 300, t: W(27, 1), pop: true });
  chip(S, "NO MISUSE FOUND|(COMPANY SAYS)", 1540, 730, "lime", 52, W(27, 8), { rot: -2 });
}

// ---- 20. clip 28: the audits, the suit with two gold stars ----
{
  const [a, b] = WIN[19], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "yellow", gx: 1300, gy: 500 });
  src(S, 690, 500, { site: "theregister.com", head: "eMudhra's statement", body: ["“These roots and issuing CAs have gone through", "independent audits for two years in a row.”"], hl: 1, w: 1000, size: 40 });
  suit(S, 1560, { s: 1.5, face: "smug", t: W(28, 6), pop: true });
  L.put(S, "sign-star", 1390, 640, { s: 1.1, t: W(28, 13), pop: true });
  L.put(S, "sign-star", 1730, 640, { s: 1.1, t: W(28, 14) + 0.15, pop: true });
}

// ---- 21. clip 29: the vault with the combination taped to the door ----
{
  const [a, b] = WIN[20], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 960, gy: 550 });
  L.put(S, "p2-safe", 960, 920, { s: 3.1 });
  chip(S, "INSPECTION 1|PASS", 300, 360, "lime", 54, W(29, 5), { rot: -3 });
  chip(S, "INSPECTION 2|PASS", 1590, 360, "lime", 54, W(29, 7), { rot: 3 });
  L.put(S, "label-sticky", 960, 650, { text: "4", size: 190, s: 0.75, t: W(29, 10), pop: true });
}

// ---- 22. clips 30-31: social media amplification; one percent of revenue ----
{
  const [a, b] = WIN[21], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "cyan", gx: 900, gy: 400 });
  src(S, 900, 410, { site: "thenextweb.com", head: "eMudhra's statement", body: ["“the level of social media amplification around this incident has brought scrutiny that is out of proportion”"], hl: 0, w: 1300, size: 46, headSize: 56 });
  chip(S, "WEBSITE CERTIFICATES", 1300, 830, "cyan", 54, W(31, 1), { rot: -1.5 });
  L.put(S, "sd-year", 540, 790, { year: "1%", label: "OF REVENUE", c: "lime", size: 280, t: W(31, 5), pop: true });
}

// ---- 23. clips 32-33: to be fair to social media ----
{
  const [a, b] = WIN[22], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 960, gy: 500 });
  const sc = { s: 1.25, left: "SOCIAL MEDIA", right: "THE NUMBER 4", leftItem: "prop-phone", rightItem: "sd-seal", itemOpts: { r: 70, text: "4" } };
  const bal = L.put(S, "story-balance-scale", 960, 900, Object.assign({ tilt: 0 }, sc));
  S.fadeOut(bal, W(33, 3), 0.4);
  L.put(S, "story-balance-scale", 960, 900, Object.assign({ tilt: 0.9, t: W(33, 3) + 0.1 }, sc));
}

// ---- 24. clips 34-35: the stock chart (drawn by hand): two lower circuits, minus 36 % ----
{
  const [a, b] = WIN[23], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "pink", gx: 900, gy: 500 });
  const P0 = [330, 300], P1 = [960, 510], P2 = [1560, 700], pink = DS.c("pink"), gray = DS.c("gray");
  S.draw(line([220, 190], [220, 860]), a + 0.2, 0.5, { c: gray, w: 5 });
  S.draw(line([220, 860], [1740, 860]), a + 0.2, 0.5, { c: gray, w: 5 });
  chip(S, "≈₹539", 360, 190, "white", 64, W(34, 1), { rot: -2 });
  chip(S, "prev. close, derived", 360, 255, "white", 28, W(34, 1) + 0.25);
  S.draw(smooth([[240, 270], [285, 300], [330, 300]]), W(34, 2), 0.3, { c: pink, w: 14 });
  S.fill(circ(P0[0], P0[1], 18), W(34, 2), 0.3, pink, 1);
  S.draw(line(P0, P1), W(35, 4), 1.6, { c: pink, w: 14 });
  S.fill(circ(P1[0], P1[1], 18), W(35, 8), 0.3, pink, 1);
  L.put(S, "stamp-nope", 640, 640, { s: 0.55, text: "LOWER CIRCUIT", c: "red", rot: -8, t: W(35, 7), pop: true });
  chip(S, "₹431.55", 960, 405, "white", 64, W(35, 9), { rot: 1 });
  chip(S, "OCT 21  -20 %", 960, 335, "pink", 38, W(35, 9) + 0.25);
  S.draw(line(P1, P2), W(35, 12), 1.5, { c: pink, w: 14 });
  S.fill(circ(P2[0], P2[1], 18), W(35, 14), 0.3, pink, 1);
  L.put(S, "stamp-nope", 1240, 790, { s: 0.55, text: "LOWER CIRCUIT", c: "red", rot: -8, t: W(35, 15), pop: true });
  chip(S, "₹345.25", 1560, 595, "white", 64, W(35, 14), { rot: -1 });
  chip(S, "OCT 22  -20 %", 1560, 525, "pink", 38, W(35, 14) + 0.25);
  chip(S, "-36 % IN 2 DAYS", 1390, 175, "pink", 80, W(35, 17), { rot: -2 });
  chip(S, "Source: BSE via Inc42, Business Standard", 960, 905, "white", 26, null);
}

// ---- 25. clips 36-37: eMudhra leaves the TLS business; MeitY and the special team ----
{
  const [a, b] = WIN[24], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 1300, gy: 500 });
  const t37 = W(37, 0) - 0.3, outs = [];
  outs.push(L.put(S, "furn-door", 1500, 930, { s: 1.9 }));
  outs.push(chip(S, "EXITING|TLS BUSINESS", 620, 260, "pink", 96, W(36, 3), { rot: -2 }));
  const man = suit(S, 640, { s: 1.35, face: "flat", pose: "carry" });
  const box = L.put(S, "prop-parcel", 760, 700, { s: 1.0 });
  S.move(man, a + 0.8, 2.0, { x: 1180 }, "sine.inOut");
  S.move(box, a + 0.8, 2.0, { x: 1300 }, "sine.inOut");
  outs.push(man, box, chip(S, "eMudhra", 640, 590, "white", 54, W(36, 0), { rot: 3 }));
  outs.forEach((o) => S.fadeOut(o, t37, 0.4));
  chip(S, "MeitY", 480, 200, "lime", 120, W(37, 2), { rot: -2 });
  chip(S, "SPECIAL TEAM", 480, 420, "cyan", 76, W(37, 7), { rot: 1.5 });
  src(S, 1350, 500, { site: "dtnext.in", head: "MeitY statement", body: ["“The impact of this incident on Indian websites and applications has been very limited and for a very short interval”"], hl: 0, w: 900, size: 38 }, W(37, 11));
  chip(S, "“FEAR-MONGERING”|(MEITY, ON SOME ACCOUNTS)", 480, 700, "pink", 36, W(37, 13), { rot: -1.5 });
}

// ---- 26. clip 38: the revoked list reaches a modern laptop, bounces off an old app ----
{
  const [a, b] = WIN[25], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 1300, gy: 500 });
  const t12 = W(38, 12) - 0.3, outs = [];
  outs.push(L.put(S, "prop-laptop", 1400, 560, { s: 3.3 }));
  const list = L.put(S, "sd-cert", 450, 500, { title: "REVOKED", sub: "LIST", ac: "pink", w: 420, h: 540 });
  S.move(list, W(38, 4), 1.4, { x: 1000 }, "sine.inOut");
  outs.push(chip(S, "SOFTWARE THAT CHECKS", 1400, 200, "lime", 52, W(38, 9), { rot: 1.5 }));
  outs.push(L.put(S, "sign-tick-badge", 1400, 520, { s: 2.2, t: W(38, 10), pop: true }));
  outs.forEach((o) => S.fadeOut(o, t12, 0.4));
  S.move(list, t12, 0.6, { x: 450 }, "sine.inOut");
  L.put(S, "dev-browser", 1400, 330, { s: 0.8, url: "old-app", tabs: ["OLD APP"], page: "blank", t: W(38, 13), slide: "left" });
  src(S, 1400, 770, { site: "scotthelme.co.uk", head: "Scott Helme", body: ["“...the fact that eMudhra and Sectigo have revoked these intermediates doesn't help them at all”"], hl: 0, w: 820, size: 32, headSize: 44 }, W(38, 15));
  S.move(list, W(38, 16) - 0.3, 0.4, { x: 880 }, "power2.in");
  S.move(list, W(38, 16) + 0.1, 0.6, { x: 520 }, "power2.out");
  L.put(S, "sign-cross-badge", 1400, 330, { s: 2.3, t: W(38, 16) + 0.1, pop: true });
}

// ---- 27. clips 39-40: what to update ----
{
  const [a, b] = WIN[26], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "lime", gx: 700, gy: 500 });
  todo(S, "UPDATE BROWSER", 110, 220, W(39, 1));
  todo(S, "UPDATE OS", 110, 400, W(39, 5));
  chip(S, "IF YOU SHIP CODE", 1540, 320, "cyan", 48, W(40, 3), { rot: 2 });
  todo(S, "UPDATE RUNTIMES", 110, 580, W(40, 6));
  chip(S, "GO 1.27.3|GO 1.26.10", 1540, 600, "yellow", 62, W(40, 7), { rot: -2 });
  todo(S, "UPDATE CERT BUNDLES", 110, 760, W(40, 9));
}

// ---- 28. clips 41-42: the padlock survived; the stamp in a museum case ----
{
  const [a, b] = WIN[27], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 1050, gy: 520 });
  const t42 = W(42, 0) - 0.3, outs = [];
  outs.push(L.put(S, "prop-padlock", 1050, 520, { s: 3.4 }));
  const T = sp([W(41, 4), W(41, 5), W(41, 6)], 0.55);
  outs.push(logo(S, "logo-firefox", 330, 290, 1.3, T[0]), logo(S, "logo-googlechrome", 330, 540, 1.3, T[1]), logo(S, "logo-apple", 330, 790, 1.3, T[2]));
  outs.push(chip(S, "IN HOURS", 1560, 250, "lime", 90, W(41, 7), { rot: 3 }));
  outs.forEach((o) => S.fadeOut(o, t42, 0.4));
  L.put(S, "hist-display-case", 620, 910, { s: 2.6, item: "none", label: "EXHIBIT A", t: W(42, 0) });
  seal(S, 620, 560, 150, "4", W(42, 1));
  chip(S, "PLEASE USE|RANDOM|NUMBERS", 1420, 400, "yellow", 100, W(42, 5), { rot: -2 });
  chip(S, "MORE THAN ₹4", 1420, 780, "pink", 70, W(42, 8), { rot: 2 });
}

// ---- 29. clip 43: sign-off ----
{
  const [a, b] = WIN[28], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 960, gy: 450 });
  dev(S, 330, "laugh", { s: 1.25 });
  L.put(S, "sd-sting", 960, 460, { s: 1.5, t: W(43, 0) + 0.3, pop: true });
  L.put(S, "sd-stacky", 1590, 930, { s: 1.1, face: "grin", pose: "wave", t: W(43, 4), pop: true });
}
