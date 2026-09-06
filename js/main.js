/* =========================================================================
   Fisiologia Vegetal — comportamento compartilhado
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Tema claro/escuro ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("fv-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  window.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("fv-theme", next); } catch (e) {}
      });
    }

    /* ---------- Marca item de navegação ativo ---------- */
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      var target = a.getAttribute("href").split("/").pop();
      if (target === here) a.setAttribute("aria-current", "page");
    });

    /* ---------- Glossário: tooltips ---------- */
    initGlossary();

    /* ---------- Quiz ---------- */
    document.querySelectorAll(".quiz .q").forEach(initQuestion);
  });

  /* ---------- Glossário ---------- */
  var GLOSS = {
    "potencial hídrico": "Energia potencial da água por unidade de volume relativa à água pura à pressão atmosférica (Ψw, em MPa). Determina a direção do fluxo de água: sempre do maior para o menor Ψw.",
    "potencial de soluto": "Componente osmótico do potencial hídrico (Ψs, sempre ≤ 0). Quanto mais solutos, mais negativo.",
    "potencial de pressão": "Componente de pressão do potencial hídrico (Ψp). Positivo na turgência da célula viva; negativo (tensão) no xilema em transpiração.",
    "turgor": "Pressão hidrostática exercida pelo protoplasto contra a parede celular. Mantém a rigidez de tecidos não lenhosos e move as células-guarda.",
    "plasmólise": "Retração do protoplasto para longe da parede quando a célula perde água em solução hipertônica.",
    "apoplasto": "Contínuo de paredes celulares e espaços intercelulares por onde a água se move sem cruzar membranas.",
    "simplasto": "Contínuo de citoplasmas conectados por plasmodesmos.",
    "estria de Caspary": "Faixa de suberina nas paredes radiais da endoderme que obriga a água e os solutos a passarem pela membrana (via simplasto/transmembrana), filtrando o que entra no cilindro vascular.",
    "coesão-tensão": "Mecanismo do transporte no xilema: a transpiração gera tensão que é transmitida por colunas contínuas de água mantidas coesas por pontes de hidrogênio.",
    "transpiração": "Perda de vapor d'água pela planta, principalmente pelos estômatos. Motor do fluxo de massa no xilema.",
    "condutância estomática": "Medida da facilidade com que vapor d'água (e CO₂) atravessa os estômatos; proporcional à abertura e à densidade estomática (gs, em mol m⁻² s⁻¹).",
    "células-guarda": "Par de células epidérmicas especializadas que delimitam o poro estomático; mudam de volume por fluxo de K⁺, Cl⁻, malato e água.",
    "ABA": "Ácido abscísico — hormônio do estresse hídrico; sinaliza o fechamento estomático e a dormência.",
    "ponto de compensação de luz": "Irradiância em que a fotossíntese bruta iguala a respiração; a troca líquida de CO₂ é zero.",
    "ponto de compensação de CO₂": "Concentração de CO₂ em que a assimilação líquida é zero. Baixo em plantas C4, mais alto em C3.",
    "fotorrespiração": "Via iniciada pela oxigenação da RuBP pela rubisco; consome O₂ e ATP e libera CO₂ previamente fixado, reduzindo a eficiência em C3 sob calor/seca.",
    "rubisco": "Ribulose-1,5-bisfosfato carboxilase/oxigenase — enzima que fixa CO₂ no ciclo de Calvin; também catalisa a oxigenação (fotorrespiração).",
    "ciclo de Calvin": "Fase bioquímica da fotossíntese (estroma): carboxilação, redução e regeneração da RuBP; produz triose-fosfato.",
    "C4": "Via em que o CO₂ é pré-fixado em ácidos de 4 carbonos no mesofilo e concentrado na bainha vascular, suprimindo a fotorrespiração.",
    "CAM": "Metabolismo ácido das crassuláceas: fixação de CO₂ à noite (estômatos abertos) e descarboxilação de dia (estômatos fechados).",
    "PEP-carboxilase": "Enzima que fixa HCO₃⁻ em oxaloacetato; não reage com O₂, base da concentração de carbono em C4 e CAM.",
    "fitocromo": "Fotorreceptor que alterna entre as formas Pr (absorve vermelho) e Pfr (absorve vermelho-distante); regula germinação, desestiolamento e floração.",
    "fotoperiodismo": "Resposta do desenvolvimento ao comprimento do dia/noite; controla a floração em muitas espécies.",
    "auxina": "Hormônio (AIA) do alongamento celular, dominância apical e tropismos; transportada polarmente pelas proteínas PIN.",
    "gravitropismo": "Crescimento orientado pela gravidade, mediado pela sedimentação de amiloplastos (estatólitos) e redistribuição de auxina.",
    "macronutriente": "Elemento essencial exigido em grande quantidade: N, P, K, Ca, Mg, S.",
    "micronutriente": "Elemento essencial exigido em pequena quantidade: Fe, Mn, Zn, Cu, B, Mo, Cl, Ni.",
    "clorose": "Amarelecimento do tecido foliar por perda ou não formação de clorofila; pode ser uniforme ou internerval.",
    "fonte": "Órgão que exporta carbono pelo floema: folha madura fotossinteticamente ativa, órgão de reserva em mobilização.",
    "dreno": "Órgão que importa carbono pelo floema: raiz, fruto, semente, folha jovem, meristema.",
    "fluxo de pressão": "Hipótese de Münch: o carregamento de açúcar na fonte e a descarga no dreno criam um gradiente de potencial de pressão que empurra a seiva do floema por fluxo de massa.",
    "célula companheira": "Célula viva adjacente ao elemento de tubo crivado; faz o carregamento e mantém o metabolismo do tubo, que é anucleado.",
    "translocação": "Transporte de fotoassimilados e outros solutos a longa distância pelo floema.",
    "glicólise": "Via citosólica que cliva a glicose em dois piruvatos, com saldo líquido de 2 ATP e 2 NADH.",
    "ciclo do ácido cítrico": "Ciclo mitocondrial que oxida o acetil-CoA a CO₂, gerando NADH, FADH₂ e GTP; também chamado ciclo de Krebs.",
    "fosforilação oxidativa": "Síntese de ATP acoplada ao transporte de elétrons de NADH/FADH₂ até o O₂ na membrana mitocondrial interna.",
    "fermentação": "Regeneração de NAD⁺ sem O₂, reduzindo o piruvato a lactato ou a etanol + CO₂; rende só os 2 ATP da glicólise.",
    "quociente respiratório": "Razão CO₂ liberado / O₂ consumido na respiração. ≈ 1,0 para carboidratos, ≈ 0,7 para lipídios, > 1 para ácidos orgânicos.",
    "oxidase alternativa": "Enzima vegetal que transfere elétrons ao O₂ sem bombear H⁺; dissipa energia como calor e alivia o estresse oxidativo.",
    "giberelina": "Hormônio (GA) do alongamento de entrenós, germinação e indução da floração; antagoniza o ABA na dormência.",
    "citocinina": "Hormônio da divisão celular e da formação de parte aérea; retarda a senescência e quebra a dominância apical.",
    "etileno": "Hormônio gasoso do amadurecimento de frutos, senescência, abscisão e respostas a estresse e alagamento.",
    "dominância apical": "Inibição do brotamento das gemas laterais pela auxina produzida na gema apical e transportada para baixo.",
    "criptocromo": "Fotorreceptor de luz azul/UV-A envolvido no desestiolamento, no movimento estomático e no ajuste do relógio circadiano.",
    "florígeno": "Sinal móvel da floração; a proteína FT, produzida na folha sob fotoperíodo indutivo, viaja pelo floema até o meristema apical.",
    "quebra de noite": "Pulso breve de luz (vermelho) no meio da noite que reconverte Pr em Pfr e reinicia a medição do comprimento da noite.",
    "tropismo": "Crescimento com direção determinada por um estímulo vetorial (luz, gravidade, contato).",
    "nastismo": "Movimento cuja direção independe da direção do estímulo, geralmente por mudança de turgor e reversível.",
    "estatólito": "Amiloplasto denso que sedimenta nos estatócitos conforme a orientação do órgão, iniciando a resposta gravitrópica.",
    "pulvino": "Estrutura articular na base do pecíolo/folíolo com células-motoras que movem a folha por variação de turgor.",
    "tigmotropismo": "Crescimento orientado pelo contato, como o enrolamento de gavinhas em um suporte.",
    "aclimatação": "Ganho de tolerância a um estresse após exposição prévia, moderada e reversível, com reprogramação da expressão gênica.",
    "ajuste osmótico": "Acúmulo ativo de solutos (prolina, glicina-betaína, açúcares) que baixa o potencial hídrico e mantém o turgor sob estresse.",
    "espécies reativas de oxigênio": "Moléculas oxidantes (O₂•⁻, H₂O₂, ¹O₂) que danificam células em excesso, mas em baixa dose sinalizam respostas de defesa; sigla ROS.",
    "proteína de choque térmico": "Chaperona (HSP) induzida pelo calor e outros estresses que renatura ou degrada proteínas desdobradas.",
    "aerênquima": "Tecido com grandes espaços de ar, formado sob alagamento, que conduz O₂ da parte aérea até as raízes hipóxicas."
  };

  function initGlossary() {
    var tip;
    document.querySelectorAll(".term").forEach(function (el) {
      var key = (el.dataset.term || el.textContent).trim().toLowerCase();
      var def = GLOSS[key] || el.dataset.def;
      if (!def) return;
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", el.textContent + ": " + def);
      function show() {
        hide();
        tip = document.createElement("span");
        tip.className = "term-tip";
        tip.textContent = def;
        Object.assign(tip.style, {
          position: "absolute", zIndex: 80, maxWidth: "300px",
          background: "var(--panel)", color: "var(--ink)",
          border: "1px solid var(--line-firm)", borderRadius: "8px",
          padding: "10px 13px", font: "400 .85rem/1.5 var(--sans)",
          boxShadow: "var(--shadow-lg)"
        });
        document.body.appendChild(tip);
        var r = el.getBoundingClientRect();
        var top = window.scrollY + r.bottom + 8;
        var left = Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - 320);
        tip.style.top = top + "px";
        tip.style.left = Math.max(12, left) + "px";
      }
      function hide() { if (tip) { tip.remove(); tip = null; } }
      el.addEventListener("mouseenter", show);
      el.addEventListener("mouseleave", hide);
      el.addEventListener("focus", show);
      el.addEventListener("blur", hide);
    });
  }

  /* ---------- Quiz ---------- */
  function initQuestion(q) {
    var opts = q.querySelectorAll(".opts button");
    var fb = q.querySelector(".fb");
    var answered = false;
    opts.forEach(function (b) {
      b.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        var ok = b.dataset.correct === "true";
        b.classList.add(ok ? "correct" : "wrong");
        if (!ok) {
          opts.forEach(function (x) { if (x.dataset.correct === "true") x.classList.add("correct"); });
        }
        if (fb) fb.classList.add("show");
      });
    });
  }

  /* ---------- Helper exposto p/ instrumentos ---------- */
  window.FV = {
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    fmt: function (v, d) { return (typeof d === "number" ? v.toFixed(d) : String(v)); }
  };
})();
