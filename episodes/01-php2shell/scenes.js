// look: still
// captions: off
// @library auto
// @include ../../tools/sd-kit.js
// @include assets/logos.js
// PHP2Shell (Patch Notes trial, ~66 s). Ten scenes, one per beat of script.md; the kitchen (scenes 4-5, back clean in 10) is the running doodle.
// Cast: Dev (sd-dev, the viewer), Bot (sd-bot + magnifier), Bug (sd-bug); the stranger is a hooded person doodle (chef hat in the kitchen).
// Clip numbers (1-based, script.md split at / and //): 1 | 2 3 | 4 5 | 6 7 | 8 9 | 10 11 | 12 13 | 14 15 | 16 17 | 18
const WIN = sceneWindows([[1, 0], [2, 0], [4, 0], [6, 0], [8, 0], [10, 0], [12, 0], [14, 0], [16, 0], [18, 0]], 0.4);
const bg = (S, o = {}) => L.put(S, "sd-bg", 0, 0, o);
const chip = (S, text, x, y, c, size, t, o = {}) => L.put(S, "sd-chip", x, y, Object.assign({ text, c, size, rot: 0, t, pop: true }, o));
const stranger = (S, x, gy, o = {}) => L.put(S, "sd-dev", x, gy, Object.assign({ s: 1.05, hoodie: "#3a3f4d", phones: false, face: "smug" }, o));
// chef hat for the stranger: its own group so it pops after him (head top is ~372 px per 1.0 of scale above his feet)
const chefHat = (S, x, gy, s, t) => {
  const g = S.grp(), y = gy - 372 * s + 20;
  [[-48, -38, 42], [0, -72, 52], [48, -38, 42]].forEach(([dx, dy, r]) => DS.shape(S, circ(x + dx * s * 1.1, y + dy * s * 1.1, r * s * 1.1), "white", { w: "detail", parent: g }));
  DS.shape(S, rrect(x - 72 * s * 1.1, y - 14 * s, 144 * s * 1.1, 50 * s, 8), "white", { w: "detail", parent: g });
  S.popIn(g, t);
  return g;
};
// the kitchen: a cream doodle panel with a floor band and the counter; kept identical in scenes 4, 5 and 10
const KX = 520, KY = 140, KW = 1320, KH = 760;
const kitchen = (S) => {
  DS.drop(S, rrect(KX + 8, KY + 12, KW, KH, DS.r.lg), {});
  DS.shape(S, rrect(KX, KY, KW, KH, DS.r.lg), "white", { flat: true, w: "detail" });
  DS.shape(S, "M" + (KX + 14) + " 780 H" + (KX + KW - 14) + " V" + (KY + KH - 14) + " H" + (KX + 14) + " Z", "wall", { flat: true, w: "hair" });
};
const counter = (S) => L.put(S, "furn-kitchen-counter", 1250, 850, { s: 2.5 });
// translucent magnifying glass (the library one is an opaque white disc): rim + faint glass + handle; dir = -1 mirrors it
const lens = (S, x, y, r, dir, t) => {
  const g = S.grp();
  el("path", { d: `M${x + dir * r * 0.72} ${y + r * 0.72} L${x + dir * r * 1.75} ${y + r * 1.75}`, stroke: "#8a5a2b", "stroke-width": r * 0.3, "stroke-linecap": "round", fill: "none" }, g);
  el("circle", { cx: x, cy: y, r, fill: "#cfefff", "fill-opacity": 0.18, stroke: "#f4f1e8", "stroke-width": r * 0.16 }, g);
  el("path", { d: `M${x - r * 0.6} ${y - r * 0.2} A${r * 0.65} ${r * 0.65} 0 0 1 ${x - r * 0.15} ${y - r * 0.62}`, stroke: "#ffffff", "stroke-width": r * 0.08, "stroke-linecap": "round", fill: "none", opacity: 0.8 }, g);
  S.popIn(g, t);
  return g;
};
const dev = (S, x, face, o = {}) => L.put(S, "sd-dev", x, 930, Object.assign({ s: 1.15, face }, o));

// ---- 1. clip 1: the cold open ----
{
  const [a, b] = WIN[0], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 1380, gy: 520 });
  L.put(S, "sci-globe", 1380, 520, { s: 2.6 });
  dev(S, 330, "shocked", { s: 1.3 });
  L.put(S, "prop-laptop", 650, 840, { s: 1.3 });
  L.put(S, "logo-php", 200, 170, { tile: true, label: true, labelC: "white", s: 1.4, t: W(1, 1), pop: true });
  L.put(S, "sd-year", 1380, 560, { year: "70%", label: "OF THE WEB", c: "lime", size: 240, rot: -5, t: W(1, 3), pop: true });
  chip(S, "EMERGENCY|PATCH", 880, 270, "pink", 70, W(1, 11), { rot: -4 });
}

// ---- 2. clips 2-3: no password, and the AI sidekick ----
{
  const [a, b] = WIN[1], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 900, gy: 500 });
  L.put(S, "sd-chip", 700, 330, { text: "PASSWORD|********", c: "white", size: 70, rot: -2 });
  L.put(S, "prop-padlock", 1010, 310, { s: 1.3 });
  L.put(S, "sd-bug", 1730, 930, { s: 1.1, mood: "smug" });
  const st = stranger(S, 330, 930, { t: W(2, 4), pop: true });
  S.move(st, W(2, 4) + 0.3, 3.2, { x: 700 }, "sine.inOut");
  chip(S, "NO PASSWORD", 1400, 190, "pink", 66, W(2, 11), { rot: 4 });
  L.put(S, "sd-bot", 1380, 930, { s: 1.2, t: W(3, 8), pop: true });
  lens(S, 1735, 800, 70, 1, W(3, 8));
}

// ---- 3. clips 4-5: the promise ----
{
  const [a, b] = WIN[2], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 960, gy: 400 });
  L.put(S, "sd-chip", 960, 250, { text: "PHP2SHELL", c: "lime", size: 150, rot: -2 });
  chip(S, "1 WHAT BROKE", 960, 480, "cyan", 66, W(5, 1), { rot: -1.5 });
  chip(S, "2 WHO FOUND IT", 960, 610, "yellow", 66, W(5, 3), { rot: 1.5 });
  chip(S, "3 WHAT TO RUN", 960, 740, "pink", 66, W(5, 7), { rot: -1 });
  dev(S, 1650, "thinking", { s: 1.0 });
  L.put(S, "sd-badge", 80, 890, { kind: "PATCH NOTES", date: "OCT 22", t: W(5, 10), pop: true });
}

// ---- 4. clips 6-7: the kitchen, bug one ----
{
  const [a, b] = WIN[3], S = scene(a, b, { cam: "push" });
  bg(S, {});
  kitchen(S);
  dev(S, 280, "worried");
  counter(S);
  L.put(S, "money-receipt", 780, 310, { s: 0.9 });
  chip(S, "BUG 1", 1620, 230, "pink", 56, W(6, 8), { rot: 4 });
  L.put(S, "dev-ram-stick", 1660, 700, { s: 0.8, label: "FULL", t: W(6, 11), pop: true });
  L.put(S, "prop-broom", 790, 640, { s: 1.4, t: W(7, 2), pop: true });
  L.put(S, "food-pasta-plate", 1250, 480, { s: 0.8, t: W(7, 2), pop: true });
}

// ---- 5. clips 8-9: the sticky note, and the stranger cooks ----
{
  const [a, b] = WIN[4], S = scene(a, b, { cam: "push" });
  bg(S, {});
  kitchen(S);
  dev(S, 280, "worried");
  const g = S.grp();
  DS.shape(S, rect(640, 380, 360, 26), "wood", { w: "detail", parent: g });
  DS.shape(S, "M690 406 L690 470 L740 406 Z M900 406 L950 406 L950 470 Z", "wood", { w: "detail", parent: g });
  const s1 = stranger(S, 830, 850, { s: 0.95, t: W(8, 12), pop: true });
  tl.set(s1, { opacity: 0 }, W(9, 2));
  stranger(S, 1250, 690, { s: 0.95, face: "smug", t: W(9, 2), pop: true });
  counter(S);
  L.put(S, "food-pasta-plate", 1250, 480, { s: 0.8 });
  chefHat(S, 1250, 690, 0.95, W(9, 2) + 0.15);
  L.put(S, "sd-chip", 1620, 230, { text: "BUG 2", c: "pink", size: 56, rot: 4 });
  const n1 = L.put(S, "label-sticky", 820, 300, { text: "ORDER 7", size: 44, s: 1.0, t: W(8, 4), pop: true });
  const n2 = L.put(S, "label-sticky", 820, 300, { text: "HIS ORDER", size: 40, s: 1.0, c: "pink", t: W(8, 15), pop: true });
  S.hide(n1, W(8, 15) + 0.05);
  L.put(S, "ep-pencil-big", 1075, 255, { s: 0.45, t: W(8, 15), pop: true });
}

// ---- 6. clips 10-11: who found it ----
{
  const [a, b] = WIN[5], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 960, gy: 500 });
  L.put(S, "sd-bug", 960, 900, { s: 1.9, mood: "scared" });
  L.put(S, "sd-chip", 480, 250, { text: "CALIF", c: "cyan", size: 90, rot: -3 });
  chip(S, "OPENAI", 480, 450, "white", 66, W(10, 4), { rot: 2 });
  chip(S, "WIZ", 1440, 250, "yellow", 90, W(10, 8), { rot: 3 });
  L.put(S, "logo-googlegemini", 1440, 470, { tile: true, s: 1.5, t: W(10, 8), pop: true });
  lens(S, 890, 730, 95, -1, W(11, 3));
  lens(S, 1030, 730, 95, 1, W(11, 3));
}

// ---- 7. clips 12-13: the warning, and the date ----
{
  const [a, b] = WIN[6], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "pink", gx: 700, gy: 460 });
  L.put(S, "sd-source", 690, 520, { site: "openai.com", head: "Coordinated disclosure of critical vulnerabilities",
    body: ["...the same capabilities can also help attackers rapidly develop offensive tools and exploits."], hl: 0, w: 960, size: 38, t: W(12, 1), slide: "up" });
  chip(S, "AMAZON", 1560, 200, "white", 60, W(13, 1), { rot: 3 });
  L.put(S, "info-calendar-month", 1560, 560, { s: 0.78, month: "OCTOBER", days: 31, start: 3, marked: [17, 21], t: W(13, 6), pop: true });
  chip(S, "OCT 17: ATTEMPT", 1400, 890, "pink", 34, W(13, 6), { rot: -2 });
  chip(S, "OCT 21: FIX", 1740, 890, "lime", 34, W(13, 9), { rot: 2 });
}

// ---- 8. clips 14-15: the UK ----
{
  const [a, b] = WIN[7], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "cyan", gx: 600, gy: 400 });
  const map = L.put(S, "info-map-zoom", 470, 380, { s: 0.9, at: [-2, 54], zoom: 6 });
  const n32 = L.put(S, "sd-year", 520, 770, { year: "32", label: "SERVICES OFFLINE", c: "pink", size: 200, t: W(14, 4), pop: true });
  L.put(S, "sd-source", 1390, 400, { site: "parliament / The Independent", head: "UK government services offline",
    body: ["32 Government services are unavailable and four are partially unavailable."], hl: 0, w: 900, size: 36, t: W(14, 5), slide: "right" });
  chip(S, "AS OF OCT 22", 1700, 130, "cyan", 34, W(14, 7), { rot: 3 });
  chip(S, "NO CONFIRMED BREAK-IN|(OFFICIALS, OCT 22)", 1390, 740, "lime", 38, W(14, 7), { rot: -1 });
  S.fadeOut(map, W(15, 0), 0.4);
  S.fadeOut(n32, W(15, 0), 0.4);
  L.put(S, "furn-door", 330, 930, { s: 1.5, t: W(15, 0) + 0.2 });
  const d = dev(S, 840, "smug", { pose: "carry", flip: true, t: W(15, 3), pop: true });
  const rack = L.put(S, "modern-server-rack", 790, 930, { s: 0.7, t: W(15, 3), pop: true });
  S.move(rack, W(15, 3) + 0.5, 2.0, { x: -240 }, "sine.inOut");
  S.move(d, W(15, 3) + 0.5, 2.0, { x: -240 }, "sine.inOut");
}

// ---- 9. clips 16-17: what to run ----
{
  const [a, b] = WIN[8], S = scene(a, b, { cam: "none" });
  bg(S, { glow: "lime", gx: 700, gy: 400 });
  L.put(S, "dev-terminal", 640, 330, { s: 1.45, lines: ["$ php -v", "PHP 8.4.27 (cli) ..."], title: "example output", t: W(16, 1), slide: "up" });
  chip(S, "8.5.12", 340, 680, "lime", 56, W(16, 7), { rot: -2 });
  chip(S, "8.4.27", 660, 680, "lime", 56, W(16, 7), { rot: 2 });
  chip(S, "8.3.36", 980, 680, "lime", 56, W(16, 11), { rot: -2 });
  chip(S, "8.2.35", 1300, 680, "lime", 56, W(16, 11), { rot: 2 });
  chip(S, "RESTART|PHP-FPM", 1660, 680, "pink", 50, W(16, 14), { rot: 3 });
  L.put(S, "logo-ubuntu", 330, 850, { tile: true, s: 0.8, t: W(16, 19), pop: true });
  chip(S, "ON A DISTRO? CHECK THE PACKAGE", 1010, 850, "yellow", 42, W(16, 19), { rot: -1 });
  L.put(S, "logo-wordpress", 1450, 290, { tile: true, s: 1.7, t: W(17, 1), pop: true });
  chip(S, "NOT ENOUGH", 1450, 510, "pink", 60, W(17, 4), { rot: -3 });
}

// ---- 10. clip 18: the kitchen again, clean ----
{
  const [a, b] = WIN[9], S = scene(a, b, { cam: "push" });
  bg(S, { glow: "lime", gx: 1180, gy: 480 });
  kitchen(S);
  dev(S, 280, "laugh");
  counter(S);
  S.fill(rrect(KX, KY, KW, KH, DS.r.lg), W(18, 5) - 0.3, 0.4, DS.c("ink"), 0.75);
  L.put(S, "sd-sting", 1180, 350, { s: 1.4, t: W(18, 5), pop: true });
}
