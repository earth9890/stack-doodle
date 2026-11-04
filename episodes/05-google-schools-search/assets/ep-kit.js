// ===================== episode 05 (Google: no AI, no Search) kit: ladder, admin console, search page, blocked card, menu, paper, TV + remote =====================
// Same palette as tools/sd-kit.js. Generic UI doodles (no Google wordmark or real UI copied); real logos come from assets/logos.js only.
(function () {
const L = window.L, f1 = L.f1;
const C = { bg: "#15171c", panel: "#242831", paper: "#f4f1e8", paper2: "#e3dece", lime: "#b6f24a", pink: "#ff4d8d", cyan: "#4cc9f0", yellow: "#ffd23f", ink: "#1d1b1f", ink2: "#3a363d", gray: "#8b909a", white: "#ffffff" };
const col = (n) => C[n] || n;
const shadow = (d, dx = 9, dy = 12, op = 0.5) => L.g(L.flat(d, "#000000", op), `translate(${dx} ${dy})`);
const mono = (txt, x, y, size, c, anchor = "middle", weight = 800) => L.text(txt, x, y, { size, c, font: "Mono", weight, anchor });
const card = (w, h, c = C.paper) => shadow(L.rrect(-w / 2, -h / 2, w, h, 24)) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 24), c, { flat: true });
const bar = (w, h, txt) => L.flat(`M${-w / 2 + 2} ${-h / 2 + 62}V${-h / 2 + 24}Q${-w / 2 + 2} ${-h / 2 + 2} ${-w / 2 + 24} ${-h / 2 + 2}H${w / 2 - 24}Q${w / 2 - 2} ${-h / 2 + 2} ${w / 2 - 2} ${-h / 2 + 24}V${-h / 2 + 62}Z`, C.paper2)
  + L.stroke(L.line([-w / 2, -h / 2 + 62], [w / 2, -h / 2 + 62]), { c: C.ink, w: 3 }) + (txt ? mono(txt, -w / 2 + 34, -h / 2 + 42, 26, C.ink2, "start", 600) : "");
// a toggle pill (centre x,y): on = lime, knob right
const toggle = (x, y, on, k = 1) => {
  const w = 132 * k, h = 62 * k;
  return L.shape(L.rrect(x - w / 2, y - h / 2, w, h, h / 2), on ? C.lime : "#c9c4b6", { flat: true, c: C.ink, w: 4 })
    + L.shape(L.circ(x + (on ? 1 : -1) * (w / 2 - h / 2), y, h / 2 - 7), C.white, { flat: true, c: C.ink, w: 4 })
    + mono(on ? "ON" : "OFF", x + (on ? -1 : 1) * 22 * k, y + 9 * k, 24 * k, C.ink);
};

// escalation ladder (same as ep03's): rung 1 = bottom; the first `lit` rungs lime with labels
L.reg("sd", "g5-ladder", (o) => {
  const n = o.n || 4, h = o.h || 680, rw = 150, labels = o.labels || [], lit = o.lit || 0;
  let s = L.stroke(`M${-rw / 2} ${h / 2 + 30}V${-h / 2 - 30}M${rw / 2} ${h / 2 + 30}V${-h / 2 - 30}`, { c: "#5a606c", w: 14 });
  for (let i = 0; i < n; i++) {
    const y = h / 2 - (i + 0.5) * (h / n), on = i < lit;
    s += L.stroke(`M${-rw / 2} ${f1(y)}H${rw / 2}`, { c: on ? C.lime : "#3a404c", w: 16 });
    if (on && labels[i]) s += mono(labels[i], rw / 2 + 36, y + 14, o.size || 40, i === lit - 1 ? C.lime : C.gray, "start");
  }
  return s;
}, { box: [-90, -370, 900, 740], group: "Episode", label: "Escalation ladder", tags: ["ladder", "steps"],
  call: 'L.put(S, "g5-ladder", x, y, { n: 4, lit: 2, labels: ["AUG: CHATBOT ON", …], h: 680, size: 40, t })' });

// admin console card: rows of product toggles (generic, not Google's UI)
L.reg("sd", "g5-console", (o) => {
  const rows = o.rows || [["GEMINI", false]], w = o.w || 860, rh = 100, h = 62 + 40 + rows.length * rh + 20;
  let s = card(w, h) + bar(w, h, o.title || "admin console / K-12 students");
  rows.forEach(([label, on], i) => {
    const y = -h / 2 + 62 + 30 + i * rh + rh / 2;
    if (o.hl === i) s += L.flat(L.rrect(-w / 2 + 18, y - rh / 2 + 8, w - 36, rh - 16, 16), C.yellow, 0.45);
    s += mono(label, -w / 2 + 50, y + 15, 44, C.ink, "start");
    s += toggle(w / 2 - 110, y, on);
    if (i < rows.length - 1) s += L.stroke(L.line([-w / 2 + 40, y + rh / 2], [w / 2 - 40, y + rh / 2]), { c: C.paper2, w: 3 });
  });
  return s;
}, { box: [-440, -330, 880, 660], group: "Episode", label: "Admin console toggles", tags: ["admin", "console", "toggle", "settings"],
  call: 'L.put(S, "g5-console", x, y, { rows: [["GEMINI", false], ["SEARCH", true]], hl: 1, title, w: 860, t, slide })' });

// search page: a search box (+ query), a tab row; optional dropdown under the last tab
L.reg("sd", "g5-search", (o) => {
  const w = o.w || 1000, tabs = o.tabs || [], h = tabs.length ? 330 : 230;
  let s = card(w, h) + bar(w, h, o.url || "search");
  const by = -h / 2 + 62 + 70;
  s += L.shape(L.rrect(-w / 2 + 50, by - 42, w - 100, 84, 42), C.white, { flat: true, c: C.ink, w: 4 });
  s += L.stroke(L.circ(-w / 2 + 102, by - 4, 18), { c: C.ink2, w: 6 }) + L.stroke(L.line([-w / 2 + 115, by + 9], [-w / 2 + 132, by + 26]), { c: C.ink2, w: 6 });
  s += L.text(o.q || "", -w / 2 + 150, by + 15, { size: 42, c: C.ink, anchor: "start", weight: 700 });
  if (tabs.length) {
    let x = -w / 2 + 60; const ty = by + 110;
    tabs.forEach((tb, i) => {
      const tw = tb.length * 30 * 0.6 + 40;
      if (i === (o.active ?? 0)) s += L.stroke(L.line([x, ty + 22], [x + tw, ty + 22]), { c: C.cyan, w: 7 });
      s += mono(tb, x + tw / 2, ty, 30, i === (o.active ?? 0) ? C.ink : C.ink2, "middle", 700);
      if (i === tabs.length - 1 && o.drop) {
        const dw = 230, dh = o.drop.length * 70 + 20, dx = x + tw / 2 - dw / 2, dy = ty + 40;
        s += shadow(L.rrect(dx, dy, dw, dh, 16), 6, 8) + L.shape(L.rrect(dx, dy, dw, dh, 16), C.white, { flat: true, c: C.ink, w: 4 });
        o.drop.forEach((d, k) => {
          if (k === o.dropHl) s += L.flat(L.rrect(dx + 10, dy + 14 + k * 70, dw - 20, 60, 10), C.lime);
          s += mono(d, dx + dw / 2, dy + 56 + k * 70, 32, C.ink, "middle", 800);
        });
      }
      x += tw + 30;
    });
  }
  return s;
}, { box: [-510, -170, 1020, 520], group: "Episode", label: "Search page (generic)", tags: ["search", "browser", "tabs"],
  call: 'L.put(S, "g5-search", x, y, { q: "photosynthesis", tabs: ["ALL", "IMAGES", "MORE ▾"], active: 0, drop: ["WEB"], dropHl: 0, w: 1000, t, slide })' });

// the "not available" card a student sees
L.reg("sd", "g5-blocked", (o) => {
  const w = o.w || 820, h = 300;
  let s = card(w, h, "#d9dbe0") + bar(w, h, o.url || "search");
  s += L.stroke(L.circ(-w / 2 + 130, 30, 62), { c: C.pink, w: 14 }) + L.stroke(L.line([-w / 2 + 88, 72], [-w / 2 + 172, -12]), { c: C.pink, w: 14 });
  s += mono(o.head || "NOT AVAILABLE", -w / 2 + 230, 24, 52, C.ink, "start");
  s += L.text(o.sub || "a message from your school", -w / 2 + 232, 84, { size: 36, c: C.ink2, anchor: "start", weight: 700 });
  return s;
}, { box: [-420, -160, 840, 320], group: "Episode", label: "Not available card", tags: ["blocked", "unavailable", "error"],
  call: 'L.put(S, "g5-blocked", x, y, { head: "NOT AVAILABLE", sub: "a message from your school", w: 820, t, slide })' });

// menu card: numbered options; strike: true crosses one out
L.reg("sd", "g5-menu", (o) => {
  const items = o.items || [], w = o.w || 900, rh = 120, h = 62 + 30 + items.length * rh;
  let s = card(w, h) + bar(w, h, o.title || "search options");
  items.forEach((it, i) => {
    const y = -h / 2 + 62 + 20 + i * rh + rh / 2, c = col(it.c || "lime");
    s += L.shape(L.circ(-w / 2 + 80, y, 38), it.strike ? "#c9c4b6" : c, { flat: true, c: C.ink, w: 4 }) + mono(String(i + 1), -w / 2 + 80, y + 16, 46, C.ink);
    s += mono(it.text, -w / 2 + 145, y - (it.sub ? 4 : -14), 42, it.strike ? C.gray : C.ink, "start");
    if (it.sub) s += L.text(it.sub, -w / 2 + 147, y + 40, { size: 32, c: C.ink2, anchor: "start", weight: 700 });
    if (it.strike) s += L.stroke(L.line([-w / 2 + 40, y + 4], [w / 2 - 40, y - 6]), { c: C.pink, w: 12 });
  });
  return s;
}, { box: [-460, -320, 920, 640], group: "Episode", label: "Options menu", tags: ["menu", "options", "list"],
  call: 'L.put(S, "g5-menu", x, y, { title, items: [{ text: "REGULAR", sub: "AI Overviews + chat", c: "cyan" }, { text: "PLAIN LINKS", strike: true }], w: 900, t, slide })' });

// a document: title, ruled lines (long = an essay), optional diagonal stamp
L.reg("sd", "g5-paper", (o) => {
  const w = o.w || 520, h = o.h || 660, x0 = -w / 2, y0 = -h / 2, n = o.n || 9;
  let s = shadow(L.rrect(x0, y0, w, h, 14)) + L.shape(L.rrect(x0, y0, w, h, 14), C.paper, { flat: true });
  String(o.title || "ESSAY").split("|").forEach((ln, i) => (s += mono(ln, 0, y0 + 86 + i * 56, o.tsize || 46, C.ink)));
  const top = y0 + (o.title ? 140 : 70), step = (h - (top - y0) - 50) / n;
  for (let i = 0; i < n; i++) s += L.stroke(L.line([x0 + 46, top + i * step], [x0 + w - 46 - (i === n - 1 ? w * 0.35 : (i * 37) % 60), top + i * step]), { c: C.gray, w: 6 });
  if (o.stamp) s += L.g(L.stroke(L.rrect(-w * 0.4, -50, w * 0.8, 100, 14), { c: col(o.stampC || "pink"), w: 8 }) + mono(o.stamp, 0, 22, 60, col(o.stampC || "pink")), "rotate(-14)");
  return s;
}, { box: [-260, -330, 520, 660], group: "Episode", label: "Document / essay", tags: ["paper", "essay", "law", "letter"],
  call: 'L.put(S, "g5-paper", x, y, { title: "ESSAY", n: 9, w: 520, h: 660, stamp, t, slide })' });

// a TV with an ad on screen; and a remote whose only button is POWER
L.reg("sd", "g5-tv", (o) => {
  const w = 720, h = 440;
  let s = shadow(L.rrect(-w / 2, -h / 2, w, h, 30)) + L.shape(L.rrect(-w / 2, -h / 2, w, h, 30), C.panel, { flat: true, c: "#000", w: 6 });
  s += L.flat(L.rrect(-w / 2 + 30, -h / 2 + 30, w - 60, h - 60, 14), "#0e1014");
  s += L.g(L.shape(L.rrect(-230, -70, 460, 140, 20), C.pink, { flat: true, c: C.ink, w: 5 }) + mono(o.ad || "BUY NOW!", 0, 22, 66, C.ink), "rotate(-4)");
  s += L.shape(L.rect(-80, h / 2, 160, 40), "#3a404c", { flat: true }) + L.shape(L.rrect(-200, h / 2 + 36, 400, 24, 12), "#3a404c", { flat: true });
  return s;
}, { box: [-380, -240, 760, 560], group: "Episode", label: "TV with an ad", tags: ["tv", "ad"], call: 'L.put(S, "g5-tv", x, y, { ad: "BUY NOW!", t, slide })' });
L.reg("sd", "g5-remote", (o) => {
  let s = shadow(L.rrect(-90, -230, 180, 460, 60)) + L.shape(L.rrect(-90, -230, 180, 460, 60), "#3a404c", { flat: true, c: "#000", w: 6 });
  s += L.shape(L.circ(0, -90, 62), C.pink, { flat: true, c: C.ink, w: 5 }) + L.stroke(L.arc(0, -90, 28, -60, 240), { c: C.ink, w: 9 }) + L.stroke(L.line([0, -128], [0, -92]), { c: C.ink, w: 9 });
  s += mono(o.label || "POWER", 0, 30, 34, C.white);
  for (let i = 0; i < 3; i++) s += L.flat(L.rrect(-50, 80 + i * 40, 100, 18, 9), "#2b3038");
  return s;
}, { box: [-110, -250, 220, 500], group: "Episode", label: "Remote, one POWER button", tags: ["remote", "power"], call: 'L.put(S, "g5-remote", x, y, { label: "POWER", t, pop })' });
})();
