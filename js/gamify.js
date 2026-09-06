/* =========================================================================
   Fisiologia Vegetal — progresso e conquistas (gamificação moderada)
   Guarda tudo no navegador (localStorage). Sem servidor, sem login.
   ========================================================================= */
(function () {
  "use strict";

  var KEY = "fv-progress";
  var ALL10 = ["01-agua", "02-estomatos", "03-nutricao", "04-floema", "05-fotossintese",
               "06-respiracao", "07-hormonios", "08-luz", "09-tropismos", "10-estresse"];
  var EIXO_INTERNO = ["01-agua", "02-estomatos", "03-nutricao", "04-floema", "05-fotossintese", "06-respiracao"];
  var EIXO_PERCEP = ["07-hormonios", "08-luz", "09-tropismos", "10-estresse"];

  var MODULOS_NOME = {
    "01-agua": "Água e relações hídricas", "02-estomatos": "Estômatos e transpiração",
    "03-nutricao": "Nutrição mineral", "04-floema": "Transporte no floema",
    "05-fotossintese": "Fotossíntese", "06-respiracao": "Respiração e metabolismo",
    "07-hormonios": "Hormônios vegetais", "08-luz": "Luz e fotomorfogênese",
    "09-tropismos": "Movimentos e tropismos", "10-estresse": "Fisiologia do estresse"
  };

  function countDone(s) { return ALL10.filter(function (m) { return s.modules[m] && s.modules[m].done; }).length; }
  function done(s, m) { return !!(s.modules[m] && s.modules[m].done); }

  var BADGES = [
    { id: "primeiro-passo", nome: "Primeiro passo", icon: "🌱", desc: "Concluiu o primeiro módulo.",
      test: function (s) { return countDone(s) >= 1; } },
    { id: "na-metade", nome: "Na metade do caminho", icon: "🌿", desc: "Concluiu 5 módulos.",
      test: function (s) { return countDone(s) >= 5; } },
    { id: "ciclo-completo", nome: "Ciclo completo", icon: "🌳", desc: "Concluiu os 10 módulos.",
      test: function (s) { return countDone(s) >= 10; } },
    { id: "funcoes-internas", nome: "Funções internas", icon: "💧", desc: "Concluiu os 6 módulos do eixo Funções internas.",
      test: function (s) { return EIXO_INTERNO.every(function (m) { return done(s, m); }); } },
    { id: "percepcao-resposta", nome: "Percepção e resposta", icon: "🔆", desc: "Concluiu os 4 módulos do eixo Percepção e resposta.",
      test: function (s) { return EIXO_PERCEP.every(function (m) { return done(s, m); }); } },
    { id: "gabaritou", nome: "Gabaritou", icon: "⭐", desc: "Acertou todas as questões de uma tentativa.",
      test: function (s) { return Object.keys(s.modules).some(function (k) { var m = s.modules[k]; return m.total && m.best === m.total; }); } },
    { id: "explorador", nome: "Explorador", icon: "🧪", desc: "Abriu o instrumento interativo dos 10 módulos.",
      test: function (s) { return ALL10.every(function (m) { return s.seen && s.seen[m]; }); } },
    { id: "persistente", nome: "Persistente", icon: "🔁", desc: "Refez o quiz de um módulo 3 vezes ou mais.",
      test: function (s) { return Object.keys(s.modules).some(function (k) { return (s.modules[k].attempts || 0) >= 3; }); } }
  ];

  function fresh() { return { modules: {}, badges: [], seen: {}, created: Date.now(), updated: Date.now() }; }

  function get() {
    var s;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (!s || typeof s !== "object") s = fresh();
    if (!s.modules) s.modules = {};
    if (!s.badges) s.badges = [];
    if (!s.seen) s.seen = {};
    return s;
  }
  function save(s) { s.updated = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function checkBadges(s) {
    var novos = [];
    BADGES.forEach(function (b) {
      if (s.badges.indexOf(b.id) < 0 && b.test(s)) { s.badges.push(b.id); novos.push(b); }
    });
    return novos;
  }

  function aprovacao() {
    return (window.EXERCICIOS_CONFIG && window.EXERCICIOS_CONFIG.aprovacao) || 0.7;
  }

  var FVP = {
    ALL10: ALL10, EIXO_INTERNO: EIXO_INTERNO, EIXO_PERCEP: EIXO_PERCEP,
    MODULOS_NOME: MODULOS_NOME, BADGES: BADGES,
    get: get,
    reset: function () { save(fresh()); refreshPill(); },

    recordModule: function (slug, correct, total) {
      var s = get();
      var m = s.modules[slug] || { best: 0, total: total, done: false, attempts: 0 };
      m.attempts = (m.attempts || 0) + 1;
      m.total = total;
      if (correct > m.best) m.best = correct;
      if (correct / total >= aprovacao()) m.done = true;
      s.modules[slug] = m;
      var novos = checkBadges(s);
      save(s);
      refreshPill();
      novos.forEach(showToast);
      return { best: m.best, total: total, done: m.done, attempts: m.attempts, newBadges: novos };
    },

    markSeen: function (slug) {
      if (ALL10.indexOf(slug) < 0) return;
      var s = get();
      if (s.seen[slug]) return;
      s.seen[slug] = true;
      var novos = checkBadges(s);
      save(s);
      novos.forEach(showToast);
    },

    summary: function () {
      var s = get();
      return {
        modulesDone: countDone(s), modulesTotal: 10,
        perModule: s.modules, seen: s.seen,
        badgesEarned: BADGES.filter(function (b) { return s.badges.indexOf(b.id) >= 0; }),
        badgesLocked: BADGES.filter(function (b) { return s.badges.indexOf(b.id) < 0; })
      };
    }
  };
  window.FVP = FVP;

  /* ---------- pílula de progresso no cabeçalho ---------- */
  function progressoHref() {
    return (location.pathname.indexOf("/modulos/") >= 0 ? "../" : "") + "progresso.html";
  }
  function refreshPill() {
    var pill = document.querySelector(".progress-pill");
    if (!pill) return;
    var n = FVP.summary().modulesDone;
    var bars = "";
    for (var i = 0; i < 10; i++) bars += '<i class="' + (i < n ? "on" : "") + '"></i>';
    pill.innerHTML = '<span class="pp-leaf">🌿</span><span class="pp-bars">' + bars + '</span><span class="pp-num">' + n + '/10</span>';
  }
  function injectPill() {
    var nav = document.querySelector(".site-nav");
    if (!nav || nav.querySelector(".progress-pill")) return;
    var a = document.createElement("a");
    a.className = "progress-pill";
    a.href = progressoHref();
    a.setAttribute("aria-label", "Meu progresso");
    var toggle = nav.querySelector(".theme-toggle");
    nav.insertBefore(a, toggle || null);
    refreshPill();
  }

  /* ---------- toast de conquista ---------- */
  function showToast(badge) {
    var t = document.createElement("div");
    t.className = "fv-toast";
    t.innerHTML = '<span class="fv-toast-ic">' + badge.icon + '</span>' +
      '<span><b>Conquista desbloqueada</b><br>' + badge.nome + '</span>';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("show"); });
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 400); }, 4200);
  }

  window.addEventListener("DOMContentLoaded", function () {
    injectPill();
    // marca o instrumento do módulo como "explorado"
    var f = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
    if (document.querySelector(".lab") && ALL10.indexOf(f) >= 0) {
      setTimeout(function () { FVP.markSeen(f); }, 1200);
    }
  });
})();
