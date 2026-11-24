/* Colibri · Feedback de clientes
   Protótipo navegável: Visão geral, Casos, Áreas de serviço (lista e ficha) e Fontes.
   Script clássico, sem módulos, para abrir com duplo clique. */
(function () {
  'use strict';

  var D = window.COLIBRI_DADOS;
  var HOJE = D.HOJE;
  var MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var MES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var LOGO = { Google: 'assets/logos/google.svg', Jira: 'assets/logos/jira.svg', Facebook: 'assets/logos/facebook.svg', Instagram: 'assets/logos/instagram.svg' };
  var ORDEM_GRAV = { Alta: 0, 'Média': 1, Baixa: 2 };
  var ESTADOS = [
    { id: 'Novo', cls: 'novo', cor: '#B62454' },
    { id: 'Em análise', cls: 'anal', cor: '#D08A00' },
    { id: 'Respondido', cls: 'resp', cor: '#1B7A4B' },
    { id: 'Fechado', cls: 'fech', cor: '#A3A19D' },
  ];
  var COR_FONTE = { google: '#4285F4', jira: '#0052CC', redes: '#D62976' };
  var MARCA = {
    google: [[0, '#4285F4'], [0.25, '#4285F4'], [0.25, '#EA4335'], [0.5, '#EA4335'], [0.5, '#FBBC05'], [0.75, '#FBBC05'], [0.75, '#34A853'], [1, '#34A853']],
    jira: [[0, '#2684FF'], [1, '#0052CC']],
    redes: [[0, '#4F5BD5'], [0.2, '#962FBF'], [0.5, '#D62976'], [0.8, '#FA7E1E'], [1, '#FEDA75']],
  };
  var CSS_MARCA = { google: 'var(--google)', jira: 'var(--jira)', redes: 'var(--redes)' };

  // Ícones de traço (24×24)
  var P = {
    gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    chavena: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>',
    euro: '<path d="M17 6.5A6.5 6.5 0 1 0 17 17.5M4 10.5h9M4 13.5h9"/>',
    cartao: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>',
    parque: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    mesa: '<path d="M3 9h18M5 9v10M19 9v10M8 9l1-4h6l1 4"/>',
    caixa: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M12 15v2"/>',
    recibo: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6"/>',
    raio: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"/>',
    estrela: '<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 4z"/>',
    saco: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    seta: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    voltar: '<path d="M19 12H5m5 5-5-5 5-5"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    baixo: '<path d="m6 9 6 6 6-6"/>',
    esq: '<path d="m15 6-6 6 6 6"/>',
    fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
    lupa: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    certo: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    entrada: '<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"/>',
    etiqueta: '<path d="M3 12V4h8l9 9-8 8-9-9z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
    pessoaSeta: '<circle cx="9" cy="8" r="4"/><path d="M2 21c1.2-3.6 3.8-5.5 7-5.5 1.6 0 3 .4 4.2 1.2M16 19h6m-2.5-2.5L22 19l-2.5 2.5"/>',
    conversa: '<path d="M4 5h16v11H9l-5 4V5z"/>',
    cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    nuvem: '<path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z"/><path d="M12 11v6m-3-3 3-3 3 3"/>',
    copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  };
  function ic(nome) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (P[nome] || '') + '</svg>'; }
  var SPARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5zM19 15.5c.3 2 1.2 2.9 3 3.2-1.8.3-2.7 1.2-3 3.2-.3-2-1.2-2.9-3-3.2 1.8-.3 2.7-1.2 3-3.2z"/></svg>';

  // ---------- utilitários ----------
  function $(id) { return document.getElementById(id); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function nf(n, d) { d = d || 0; return Number(n).toLocaleString('pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function mesDe(m) { return new Date(2024, 11 + m, 1); }
  function mesTxt(m, ano) { var d = mesDe(m); return MES[d.getMonth()] + (ano ? ' ' + d.getFullYear() : ''); }
  function dataDe(x) { var d = mesDe(x.m); return new Date(d.getFullYear(), d.getMonth(), x.dia); }
  function diasAtras(x) { return Math.max(0, Math.round((HOJE - dataDe(x)) / 864e5)); }
  function dataLonga(x) { var d = dataDe(x); return d.getDate() + ' de ' + MES_LONGO[d.getMonth()] + ' de ' + d.getFullYear(); }
  function quando(x) {
    var d = diasAtras(x);
    if (d <= 0) return 'hoje';
    if (d === 1) return 'ontem';
    if (d < 30) return 'há ' + d + ' dias';
    var dt = dataDe(x); return dt.getDate() + ' ' + MES[dt.getMonth()] + ' ' + dt.getFullYear();
  }
  function tema(nome) { return D.TEMAS.filter(function (t) { return t.nome === nome; })[0]; }
  function fonte(id) { return D.FONTES.filter(function (f) { return f.id === id; })[0]; }
  function soma(arr, f) { return arr.reduce(function (s, x) { return s + f(x); }, 0); }
  function media(arr, f) { return arr.length ? soma(arr, f) / arr.length : null; }
  function iniciais(nome) { var p = nome.split(' ').filter(function (w) { return w.length > 2 || /^[A-Z]/.test(w); }); return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : p[0][1])).toUpperCase(); }
  function avCls(nome) { var h = 0; for (var i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) % 997; return 'av-' + (h % 5); }
  function avatar(nome) { return '<span class="av ' + avCls(nome) + '" aria-hidden="true">' + esc(nome === 'Equipa CX' ? 'CX' : iniciais(nome)) + '</span>'; }
  function estrelas(n) { return n ? '<span class="stars" aria-label="' + n + ' de 5 estrelas">' + '★'.repeat(n) + '<s>' + '★'.repeat(5 - n) + '</s></span>' : ''; }
  function logoFonte(f) {
    return f.id === 'redes' ? '<span class="src-pair"><img class="src-logo" src="' + LOGO.Facebook + '" alt=""><img class="src-logo" src="' + LOGO.Instagram + '" alt=""></span>' : '<img class="src-logo" src="' + f.logo + '" alt="">';
  }
  function slug(area) { return encodeURIComponent(area); }

  // ---------- estado ----------
  var st = {
    periodo: 3, area: '',
    casos: { q: '', fonte: '', grav: '', tema: '', agrupar: 'estado' },
    abertos: {}, mostrar: {}, voz: 0, drawer: null,
  };
  var alterado = {};      // id -> estado escolhido nesta sessão
  var respondidoAgora = {};

  function estadoDe(x) { return alterado[x.id] || x.estado; }
  function porTratar(x) { var e = estadoDe(x); return e === 'Novo' || e === 'Em análise'; }
  function isResp(x) { return x.respondido || !!respondidoAgora[x.id]; }
  function isNeg(x) { return x.sentimento === 'negativo'; }

  function janela() { var ate = 23, desde = 24 - st.periodo; return { desde: desde, ate: ate, pDesde: desde - st.periodo, pAte: desde - 1 }; }
  function periodoTxt(j) { return st.periodo === 1 ? 'novembro de 2026' : mesTxt(j.desde) + '–' + mesTxt(j.ate, true); }
  function filtrar(desde, ate, area) {
    area = area === undefined ? st.area : area;
    return D.MENCOES.filter(function (x) { return x.m >= desde && x.m <= ate && (!area || x.area === area); });
  }
  function areaTxt() { return st.area ? 'Área de serviço de ' + st.area : 'Todas as áreas de serviço'; }

  function indicadores(rows) {
    var g = rows.filter(function (x) { return x.fonte === 'google'; });
    var pedem = rows.filter(function (x) { return x.sentimento !== 'positivo'; });
    var resp = pedem.filter(isResp);
    var comTempo = resp.filter(function (x) { return x.respondido; });
    return {
      total: rows.length,
      neg: rows.filter(isNeg).length,
      rating: media(g, function (x) { return x.estrelas; }),
      nReviews: g.length,
      taxa: pedem.length ? resp.length / pedem.length * 100 : null,
      tempo: media(comTempo, function (x) { return x.horas; }),
      abertos: rows.filter(porTratar).length,
    };
  }

  // Variação entre dois valores. bomSobe: true se subir é bom; null se for neutro.
  function delta(a, b, bomSobe, tipo) {
    if (a == null || b == null || (tipo === 'rel' && b === 0)) return { cls: 'flat', txt: 'sem comparação', v: 0 };
    var v = tipo === 'rel' ? (a - b) / b * 100 : a - b;
    var lim = tipo === 'dec' ? 0.05 : 0.5;
    if (Math.abs(v) < lim) return { cls: 'flat', txt: 'igual', v: 0 };
    var sobe = v > 0;
    var txt = tipo === 'rel' ? nf(Math.abs(v)) + '%' : tipo === 'pp' ? nf(Math.abs(v)) + ' p.p.' : tipo === 'h' ? nf(Math.abs(v)) + ' h' : tipo === 'dec' ? nf(Math.abs(v), 1) : nf(Math.abs(v));
    return { cls: bomSobe == null ? 'flat' : sobe === bomSobe ? 'good' : 'bad', txt: (sobe ? '↑ ' : '↓ ') + txt, v: v };
  }

  // ---------- gráficos ----------
  var charts = [];
  function chart(el, opt) {
    if (!el) return null;
    if (!window.echarts) { el.innerHTML = '<p class="empty-line">O gráfico precisa de ligação à internet para carregar.</p>'; return null; }
    var c = echarts.init(el, null, { renderer: 'svg' });
    c.setOption(Object.assign({ animationDuration: 350, textStyle: { fontFamily: 'Noto Sans, system-ui, sans-serif' } }, opt));
    charts.push(c);
    return c;
  }
  var EIXO = { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#6E6D6B', fontSize: 11 } };
  var GRELHA = { splitLine: { lineStyle: { color: '#EFEDEA' } } };
  var TOOLTIP = { backgroundColor: '#1E1E1E', borderWidth: 0, textStyle: { color: '#FFFFFF', fontSize: 12 }, extraCssText: 'border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.18)' };
  function meses12() { var a = []; for (var m = 12; m <= 23; m++) a.push(m); return a; }

  // ---------- navegação ----------
  function rota() {
    var h = location.hash.replace(/^#\/?/, '');
    var partes = h.split('/');
    return { p: partes[0] || 'visao-geral', arg: partes[1] ? decodeURIComponent(partes[1]) : null };
  }
  function irCasos(filtros) {
    st.casos = Object.assign({ q: '', fonte: '', grav: '', tema: '', agrupar: st.casos.agrupar }, filtros || {});
    if (location.hash === '#/casos') render(); else location.hash = '#/casos';
  }
  function irArea(nome) { location.hash = '#/areas/' + slug(nome); }

  var ultimaRota = null;
  function render() {
    var r = rota();
    charts.forEach(function (c) { c.dispose(); }); charts = [];
    fecharMenu();

    var navId = r.p === 'areas' ? 'areas' : r.p;
    $$('.nav a').forEach(function (a) { if (a.dataset.route === navId) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var abertos = D.MENCOES.filter(porTratar).length;
    $('nav-count').textContent = abertos ? nf(abertos) : '';
    $('nav-count').hidden = !abertos;

    $$('#periodo button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.p === st.periodo)); });
    $('f-area').value = st.area;
    var mostraArea = r.p === 'visao-geral' || r.p === 'casos';
    $('f-area').hidden = !mostraArea;
    $('top-filters').hidden = r.p === 'fontes';

    var pg = $('page'), migalhas;
    if (r.p === 'casos') { pg.innerHTML = pgCasos(); migalhas = [['Casos']]; ligarCasos(); }
    else if (r.p === 'areas' && r.arg) { pg.innerHTML = pgArea(r.arg); migalhas = [['Áreas de serviço', '#/areas'], [r.arg]]; ligarArea(r.arg); }
    else if (r.p === 'areas') { pg.innerHTML = pgAreas(); migalhas = [['Áreas de serviço']]; ligarAreas(); }
    else if (r.p === 'fontes') { pg.innerHTML = pgFontes(); migalhas = [['Fontes']]; ligarFontes(); }
    else { pg.innerHTML = pgVisao(); migalhas = [['Visão geral']]; ligarVisao(); }

    $('crumbs').innerHTML = '<a href="#/visao-geral">Feedback de clientes</a>' + migalhas.map(function (m, i) {
      return '<span class="sep" aria-hidden="true">/</span>' + (m[1] ? '<a href="' + m[1] + '">' + esc(m[0]) + '</a>' : '<span aria-current="page">' + esc(m[0]) + '</span>');
    }).join('');
    document.title = migalhas[migalhas.length - 1][0] + ' · Colibri · Feedback de clientes';

    var chave = r.p + '/' + (r.arg || '');
    if (chave !== ultimaRota) { window.scrollTo(0, 0); ultimaRota = chave; }
    if (st.drawer) desenharGaveta();
  }

  // ======================================================================
  // VISÃO GERAL
  // ======================================================================
  var sinalAtual = null, outrosSinais = [], vozes = [];

  function pgVisao() {
    var j = janela();
    var rows = filtrar(j.desde, j.ate), prev = filtrar(j.pDesde, j.pAte);
    var k = indicadores(rows), kp = indicadores(prev);
    var neg = rows.filter(isNeg), negPrev = prev.filter(isNeg);

    var h = '<div class="page-head"><div><h1>Visão geral</h1><p class="meta">' + esc(areaTxt()) + ' · ' + periodoTxt(j) + ' · <b class="tnum">' + nf(k.total) + '</b> menções, <b class="tnum">' + nf(k.neg) + '</b> reclamações</p></div></div>';

    // Rating
    var r = k.rating, circ = 2 * Math.PI * 70, frac = r == null ? 0 : (r - 1) / 4;
    var dr = delta(k.rating, kp.rating, true, 'dec');
    var verdict = r == null ? 'Sem reviews' : r < 2.5 ? 'Fraco' : r < 3.5 ? 'Razoável' : r < 4.2 ? 'Bom' : 'Muito bom';
    h += '<section class="panel score-panel" aria-labelledby="t-rating"><div class="score-left">' +
      '<div class="ring"><svg viewBox="0 0 168 168" aria-hidden="true"><circle cx="84" cy="84" r="70" fill="none" stroke="#F1EFEC" stroke-width="12"/>' +
      '<circle cx="84" cy="84" r="70" fill="none" stroke="#B62454" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + (circ * frac).toFixed(1) + ' ' + circ.toFixed(1) + '"/></svg>' +
      '<div class="val"><b class="tnum">' + (r == null ? '–' : nf(r, 1)) + '</b><span>de 5 no Google</span></div></div>' +
      '<p class="verdict">' + verdict + '</p>' +
      '<p class="trend">' + (dr.cls === 'flat' ? 'Igual ao período anterior' : '<span class="delta ' + dr.cls + '">' + dr.txt + '</span> face a ' + (st.periodo === 1 ? 'outubro' : mesTxt(j.pDesde) + '–' + mesTxt(j.pAte)) ) + '</p>' +
      '</div><div class="score-right"><h2 id="t-rating">Rating médio no Google</h2><p>Média das estrelas por mês, ' + nf(k.nReviews) + ' reviews no período. A zona sombreada é o período escolhido.</p><div id="ch-rating" role="img" aria-label="Evolução mensal do rating médio no Google"></div></div></section>';

    // Temas
    var temas = D.TEMAS.map(function (t) {
      var n = neg.filter(function (x) { return x.tema === t.nome; }).length;
      var np = negPrev.filter(function (x) { return x.tema === t.nome; }).length;
      return { t: t, n: n, np: np, d: n - np };
    });
    var foco = temas.filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 3);
    var bem = temas.filter(function (x) { return x.d < 0 && foco.indexOf(x) < 0; }).sort(function (a, b) { return a.d - b.d; }).slice(0, 3);
    function chipTema(x, bom) {
      var d = x.d === 0 ? '<span class="delta flat">igual</span>' : '<span class="delta ' + (x.d > 0 ? 'bad' : 'good') + ' tnum">' + (x.d > 0 ? '↑ ' : '↓ ') + Math.abs(x.d) + '</span>';
      return '<button type="button" class="theme-chip" data-tema="' + esc(x.t.nome) + '"><span class="ic-dot' + (bom ? ' good' : '') + '">' + ic(x.t.icone) + '</span><span class="t"><span class="v"><b class="tnum">' + x.n + '</b>' + d + '</span><span class="name">' + esc(x.t.nome) + '</span></span></button>';
    }
    h += '<div class="sec-head"><h2>Temas</h2><p>Reclamações por tema e variação face ao período anterior</p></div>' +
      '<div class="theme-rows"><div class="theme-row"><div><h3>Onde focar</h3><p>Os temas com mais reclamações</p></div><div class="chips">' + (foco.map(function (x) { return chipTema(x, false); }).join('') || '<p class="empty-line">Sem reclamações neste período.</p>') + '</div></div>' +
      '<div class="theme-row"><div><h3>A correr bem</h3><p>Os temas que mais desceram</p></div><div class="chips">' + (bem.map(function (x) { return chipTema(x, true); }).join('') || '<p class="empty-line">Nenhum tema desceu face ao período anterior.</p>') + '</div></div></div>';

    // Sinal principal
    var combos = [];
    D.AREAS.forEach(function (a) {
      if (st.area && a !== st.area) return;
      D.TEMAS.forEach(function (t) {
        var n = neg.filter(function (x) { return x.area === a && x.tema === t.nome; });
        var np = negPrev.filter(function (x) { return x.area === a && x.tema === t.nome; }).length;
        if (n.length >= 4 && n.length > np) combos.push({ a: a, t: t, n: n.length, np: np, fontes: n });
      });
    });
    combos.sort(function (x, y) { return (y.n - y.np) - (x.n - x.np) || y.n - x.n; });
    sinalAtual = combos[0] || null;

    outrosSinais = [];
    var graves = rows.filter(function (x) { return x.gravidade === 'Alta' && porTratar(x); });
    if (graves.length) {
      var antigo = graves.reduce(function (a, b) { return diasAtras(a) > diasAtras(b) ? a : b; });
      outrosSinais.push({ html: '<b>' + nf(graves.length) + (graves.length === 1 ? ' caso grave' : ' casos graves') + ' por tratar.</b> O mais antigo tem ' + diasAtras(antigo) + ' dias e é sobre ' + esc(antigo.tema.toLowerCase()) + (antigo.area ? ' em ' + esc(antigo.area) : '') + '.', acao: function () { irCasos({ grav: 'Alta' }); } });
    }
    var tempos = D.FONTES.map(function (f) {
      var rf = rows.filter(function (x) { return x.fonte === f.id && x.respondido; });
      return { f: f, tempo: media(rf, function (x) { return x.horas; }) };
    }).filter(function (x) { return x.tempo != null; }).sort(function (a, b) { return b.tempo - a.tempo; });
    if (tempos.length > 1) {
      var lento = tempos[0], rapido = tempos[tempos.length - 1];
      outrosSinais.push({ html: '<b>' + esc(lento.f.nome) + ' demora ' + nf(lento.tempo) + ' h</b> até à primeira resposta, contra ' + nf(rapido.tempo) + ' h em ' + esc(rapido.f.curto) + '.', acao: function () { irCasos({ fonte: lento.f.id }); } });
    }
    if (combos[1]) {
      var c2 = combos[1];
      outrosSinais.push({ html: '<b>' + esc(c2.t.curto) + ' em ' + esc(c2.a) + '</b> passou de ' + c2.np + ' para ' + c2.n + ' reclamações.', acao: function () { st.area = c2.a; irCasos({ tema: c2.t.nome }); } });
    }
    var lista = '<ul class="more-signals">' + outrosSinais.map(function (s, i) { return '<li><button type="button" data-sinal="' + i + '"><span class="txt">' + s.html + '</span>' + ic('chevron') + '</button></li>'; }).join('') + '</ul>';

    var sig;
    if (sinalAtual) {
      var c = sinalAtual;
      var gA = filtrar(j.desde, j.ate, c.a).filter(function (x) { return x.fonte === 'google'; });
      var gP = filtrar(j.pDesde, j.pAte, c.a).filter(function (x) { return x.fonte === 'google'; });
      var rA = media(gA, function (x) { return x.estrelas; }), rP = media(gP, function (x) { return x.estrelas; });
      var dRat = delta(rA, rP, true, 'dec');
      var frase = 'As reclamações sobre ' + c.t.nome.toLowerCase() + ' em ' + c.a + ' passaram de ' + c.np + ' para ' + c.n + ' face ao período anterior' +
        (dRat.cls === 'bad' ? ', e o rating Google da área desceu ' + nf(Math.abs(dRat.v), 1) + ' pontos.' : '.');
      sig = '<article class="panel signal" aria-labelledby="t-sinal"><div class="signal-top"><span class="spark">' + SPARK + '</span><div><p class="eyebrow">Sinal</p><h3 id="t-sinal">' + esc(c.t.curto) + ' em ' + esc(c.a) + '</h3><p class="lead">' + esc(frase) + '</p></div></div>' +
        '<div class="signal-chart"><div id="ch-signal" role="img" aria-label="Reclamações por mês sobre ' + esc(c.t.nome.toLowerCase()) + ' em ' + esc(c.a) + ', comparado com a média das áreas"></div>' +
        '<div class="chip-row"><span class="float-chip">' + ic(c.t.icone) + esc(c.t.curto) + '<span class="pt-delta bad tnum">↑ ' + (c.n - c.np) + '</span></span>' +
        (dRat.cls !== 'flat' ? '<span class="float-chip"><img src="' + LOGO.Google + '" alt="">Rating da área<span class="pt-delta ' + dRat.cls + ' tnum">' + dRat.txt + '</span></span>' : '') + '</div>' +
        '</div><div class="signal-foot"><span class="legend"><span><i style="background:#B62454;height:3px"></i>' + esc(c.a) + '</span><span><i style="background:repeating-linear-gradient(90deg,#9A9895 0 4px,transparent 4px 7px);height:2px"></i>Média das áreas</span></span>' +
        '<button type="button" class="link" id="btn-sinal">Ver os ' + c.n + ' casos' + ic('seta') + '</button></div>' + (outrosSinais.length ? lista : '') + '</article>';
    } else {
      sig = '<article class="panel signal"><div class="signal-top"><span class="spark">' + SPARK + '</span><div><p class="eyebrow">Sinais</p><h3>Nenhuma subida relevante</h3><p class="lead">Nenhuma combinação de área e tema subiu de forma clara neste período.</p></div></div>' + (outrosSinais.length ? '<div style="margin-top:18px">' + lista + '</div>' : '') + '</article>';
    }

    // Voz do cliente
    vozes = rows.filter(function (x) { return isNeg(x) && x.gravidade === 'Alta'; }).sort(function (a, b) { return dataDe(b) - dataDe(a); }).slice(0, 4)
      .concat(rows.filter(function (x) { return x.sentimento === 'positivo'; }).sort(function (a, b) { return dataDe(b) - dataDe(a); }).slice(0, 2));
    if (st.voz >= vozes.length) st.voz = 0;
    // Áreas com mais reclamações
    var porArea = D.AREAS.map(function (a) { return { a: a, n: neg.filter(function (x) { return x.area === a; }).length }; }).sort(function (p, q) { return q.n - p.n; });
    var maxA = Math.max(1, porArea[0].n);
    var ranking = st.area ? '' : '<section class="panel"><div class="panel-head"><h2>Áreas com mais reclamações</h2><a class="link" href="#/areas">Ver todas' + ic('seta') + '</a></div><ul class="rank">' +
      porArea.slice(0, 5).map(function (x) { return '<li><button type="button" data-area="' + esc(x.a) + '"><span class="lbl">' + esc(x.a) + '</span><span class="track"><span class="fill" style="width:' + (x.n / maxA * 100).toFixed(1) + '%"></span></span><span class="n">' + x.n + '</span></button></li>'; }).join('') + '</ul></section>';
    h += '<div class="story">' + sig + '<div class="side-col"><div id="voz" style="display:flex"></div>' + ranking + '</div></div>';

    // Fontes
    var ativas = D.FONTES;
    h += '<div class="sec-head"><h2>De onde vêm</h2><p>Reclamações por fonte, últimos 12 meses</p></div>' +
      '<section class="panel sources-panel"><div class="chart"><div class="legend">' + ativas.map(function (f) { return '<span><i style="background:' + CSS_MARCA[f.id] + '"></i>' + esc(f.curto) + '</span>'; }).join('') + '</div><div id="ch-volume" role="img" aria-label="Reclamações por mês e por fonte"></div></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fonte · ' + periodoTxt(j) + '</th><th class="num">Reclam.</th><th class="num">Respondidas</th><th class="num">1.ª resposta</th></tr></thead><tbody>' +
      ativas.map(function (f) {
        var kf = indicadores(rows.filter(function (x) { return x.fonte === f.id; }));
        return '<tr class="row-link" data-fonte="' + f.id + '" tabindex="0"><td><span class="cell-src">' + logoFonte(f) + esc(f.curto) + '</span></td><td class="num strong">' + nf(kf.neg) + '</td><td class="num">' + (kf.taxa == null ? '–' : nf(kf.taxa) + '%') + '</td><td class="num">' + (kf.tempo == null ? '–' : nf(kf.tempo) + ' h') + '</td></tr>';
      }).join('') +
      '<tr><td class="strong">Total</td><td class="num strong">' + nf(k.neg) + '</td><td class="num">' + (k.taxa == null ? '–' : nf(k.taxa) + '%') + '</td><td class="num">' + (k.tempo == null ? '–' : nf(k.tempo) + ' h') + '</td></tr>' +
      '</tbody></table></div></section>';

    return h;
  }

  function desenharVoz() {
    var el = $('voz'); if (!el) return;
    var x = vozes[st.voz];
    if (!x) { el.innerHTML = ''; return; }
    var neg = x.sentimento !== 'positivo';
    el.innerHTML = '<figure class="panel voice' + (neg ? ' neg' : '') + '" style="margin:0;flex:1">' +
      '<div class="top"><span class="tag">' + (neg ? 'Voz do cliente · grave' : 'Voz do cliente · elogio') + '</span>' +
      '<span class="nav-q"><button type="button" class="icon-btn" id="voz-ant" aria-label="Comentário anterior">' + ic('esq') + '</button><button type="button" class="icon-btn" id="voz-seg" aria-label="Comentário seguinte">' + ic('chevron') + '</button></span></div>' +
      '<blockquote>“' + esc(x.texto) + '”</blockquote>' +
      '<figcaption class="who"><span class="src"><img src="' + LOGO[x.canal] + '" alt=""></span><div><b>' + esc(x.canal) + (x.area ? ' · ' + esc(x.area) : '') + '</b><span>' + quando(x) + (x.estrelas ? ' · ' : '') + estrelas(x.estrelas) + '</span></div></figcaption>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px"><span class="meta tnum" style="margin:0">' + (st.voz + 1) + ' de ' + vozes.length + '</span><button type="button" class="link" id="voz-abrir">Abrir caso' + ic('seta') + '</button></div></figure>';
    $('voz-ant').onclick = function () { st.voz = (st.voz - 1 + vozes.length) % vozes.length; desenharVoz(); };
    $('voz-seg').onclick = function () { st.voz = (st.voz + 1) % vozes.length; desenharVoz(); };
    $('voz-abrir').onclick = function () { abrirGaveta(x.id); };
  }

  function ligarVisao() {
    var j = janela();
    $$('.theme-chip').forEach(function (b) { b.onclick = function () { irCasos({ tema: b.dataset.tema }); }; });
    $$('.rank [data-area]').forEach(function (b) { b.onclick = function () { irArea(b.dataset.area); }; });
    $$('[data-sinal]').forEach(function (b) { b.onclick = function () { outrosSinais[+b.dataset.sinal].acao(); }; });
    $$('tr[data-fonte]').forEach(function (tr) {
      var go = function () { irCasos({ fonte: tr.dataset.fonte }); };
      tr.onclick = go; tr.onkeydown = function (e) { if (e.key === 'Enter') go(); };
    });
    if ($('btn-sinal')) $('btn-sinal').onclick = function () { st.area = sinalAtual.a; irCasos({ tema: sinalAtual.t.nome }); };
    desenharVoz();

    var meses = meses12();
    // Rating
    var serie = meses.map(function (m) {
      var g = D.MENCOES.filter(function (x) { return x.m === m && x.fonte === 'google' && (!st.area || x.area === st.area); });
      return g.length ? +(soma(g, function (x) { return x.estrelas; }) / g.length).toFixed(2) : null;
    });
    var vals = serie.filter(function (v) { return v != null; });
    var yMin = vals.length ? Math.max(1, Math.floor((Math.min.apply(null, vals) - 0.3) * 2) / 2) : 1;
    var yMax = vals.length ? Math.min(5, Math.ceil((Math.max.apply(null, vals) + 0.3) * 2) / 2) : 5;
    chart($('ch-rating'), {
      grid: { left: 4, right: 12, top: 14, bottom: 4, containLabel: true },
      tooltip: Object.assign({ trigger: 'axis', valueFormatter: function (v) { return v == null ? '–' : nf(v, 2) + ' de 5'; } }, TOOLTIP),
      xAxis: Object.assign({ type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }) }, EIXO),
      yAxis: Object.assign({ type: 'value', min: yMin, max: yMax, interval: 0.5, axisLabel: { color: '#6E6D6B', fontSize: 11, formatter: function (v) { return nf(v, 1); } } }, GRELHA),
      series: [{
        type: 'line', smooth: 0.3, smoothMonotone: 'x', data: serie, symbol: 'circle', symbolSize: 6, connectNulls: true,
        lineStyle: { width: 2.5, color: '#B62454' }, itemStyle: { color: '#FFFFFF', borderColor: '#B62454', borderWidth: 2 },
        areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(182,36,84,.14)' }, { offset: 1, color: 'rgba(182,36,84,0)' }]) } : null,
        markArea: { silent: true, itemStyle: { color: 'rgba(30,30,30,.035)' }, data: [[{ xAxis: mesTxt(j.desde) }, { xAxis: mesTxt(j.ate) }]] },
      }],
    });

    // Sinal: área × tema vs. média das áreas
    if (sinalAtual) {
      var c = sinalAtual;
      var sA = meses.map(function (m) { return D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area === c.a && x.tema === c.t.nome; }).length; });
      var sM = meses.map(function (m) { return +(D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area && x.tema === c.t.nome; }).length / D.AREAS.length).toFixed(1); });
      chart($('ch-signal'), {
        grid: { left: 22, right: 22, top: 44, bottom: 22 },
        tooltip: Object.assign({ trigger: 'axis' }, TOOLTIP),
        xAxis: Object.assign({ type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }) }, EIXO),
        yAxis: { type: 'value', show: false, min: 0 },
        series: [
          { name: 'Média das áreas', type: 'line', smooth: 0.4, smoothMonotone: 'x', data: sM, symbol: 'none', lineStyle: { width: 1.5, type: [4, 3], color: '#9A9895' } },
          { name: c.a, type: 'line', smooth: 0.4, smoothMonotone: 'x', data: sA, symbol: 'circle', symbolSize: 7, showSymbol: false, lineStyle: { width: 2.5, color: '#B62454' }, itemStyle: { color: '#B62454' },
            areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(182,36,84,.10)' }, { offset: 1, color: 'rgba(182,36,84,0)' }]) } : null,
            markPoint: { symbol: 'circle', symbolSize: 10, itemStyle: { color: '#B62454', borderColor: '#FFFFFF', borderWidth: 2 }, label: { show: false }, data: [{ coord: [meses.length - 1, sA[sA.length - 1]] }] } },
        ],
      });
    }

    // Volume por fonte
    var r12 = filtrar(12, 23).filter(isNeg);
    var totais = meses.map(function (m) { return r12.filter(function (x) { return x.m === m; }).length; });
    chart($('ch-volume'), {
      grid: { left: 4, right: 4, top: 26, bottom: 4, containLabel: true },
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(30,30,30,.04)' } } }, TOOLTIP),
      xAxis: Object.assign({ type: 'category', data: meses.map(function (m) { return mesTxt(m); }) }, EIXO, { axisLine: { lineStyle: { color: '#DCD9D4' } } }),
      yAxis: Object.assign({ type: 'value', splitNumber: 3, axisLabel: { color: '#6E6D6B', fontSize: 11 } }, GRELHA),
      series: D.FONTES.map(function (f, i) {
        var g = window.echarts ? new echarts.graphic.LinearGradient(0, 0, f.id === 'google' ? 1 : 0, f.id === 'google' ? 0 : 1, MARCA[f.id].map(function (s) { return { offset: s[0], color: s[1] }; })) : COR_FONTE[f.id];
        return {
          name: f.curto, type: 'bar', stack: 't', barMaxWidth: 24,
          itemStyle: { color: g, borderRadius: i === D.FONTES.length - 1 ? [5, 5, 0, 0] : 0 },
          data: meses.map(function (m) { return { value: r12.filter(function (x) { return x.m === m && x.fonte === f.id; }).length, itemStyle: m >= j.desde ? {} : { color: '#E6E3DE' } }; }),
          label: i === D.FONTES.length - 1 ? { show: true, position: 'top', color: '#484747', fontSize: 11, fontWeight: 600, formatter: function (p) { return meses[p.dataIndex] >= j.desde ? totais[p.dataIndex] : ''; } } : { show: false },
        };
      }),
    });
  }

  // ======================================================================
  // CASOS
  // ======================================================================
  function pgCasos() {
    var j = janela();
    var base = filtrar(j.desde, j.ate);
    var abertos = base.filter(porTratar).length;
    var c = st.casos;
    function opt(v, l, sel) { return '<option value="' + esc(v) + '"' + (v === sel ? ' selected' : '') + '>' + esc(l) + '</option>'; }
    var temasPresentes = D.TEMAS.filter(function (t) { return base.some(function (x) { return x.tema === t.nome; }); });
    return '<div class="page-head"><div><h1>Casos</h1><p class="meta">' + esc(areaTxt()) + ' · ' + periodoTxt(j) + ' · <b class="tnum">' + nf(base.length) + '</b> menções, <b class="tnum">' + nf(abertos) + '</b> por tratar</p></div></div>' +
      '<div class="toolbar">' +
      '<div class="input-wrap">' + ic('lupa') + '<label class="sr" for="c-q">Procurar</label><input class="input" id="c-q" type="search" placeholder="Procurar texto, ID ou área" value="' + esc(c.q) + '" autocomplete="off"></div>' +
      '<label class="sr" for="c-fonte">Fonte</label><select class="select" id="c-fonte">' + opt('', 'Todas as fontes', c.fonte) + D.FONTES.map(function (f) { return opt(f.id, f.curto, c.fonte); }).join('') + '</select>' +
      '<label class="sr" for="c-grav">Gravidade</label><select class="select" id="c-grav">' + opt('', 'Qualquer gravidade', c.grav) + ['Alta', 'Média', 'Baixa'].map(function (g) { return opt(g, 'Gravidade ' + g.toLowerCase(), c.grav); }).join('') + '</select>' +
      '<label class="sr" for="c-tema">Tema</label><select class="select" id="c-tema">' + opt('', 'Todos os temas', c.tema) + temasPresentes.map(function (t) { return opt(t.nome, t.nome, c.tema); }).join('') + '</select>' +
      '<span class="spacer"></span>' +
      '<label class="inline" for="c-agrupar">Agrupar por <select class="select" id="c-agrupar">' + [['estado', 'Estado'], ['area', 'Área de serviço'], ['fonte', 'Fonte'], ['tema', 'Tema']].map(function (o) { return opt(o[0], o[1], c.agrupar); }).join('') + '</select></label>' +
      '</div><section class="panel"><div class="tbl-wrap" id="casos-tabela"></div></section>';
  }

  function casosFiltrados() {
    var j = janela(), c = st.casos, q = norm(c.q.trim());
    return filtrar(j.desde, j.ate).filter(function (x) {
      return (!c.fonte || x.fonte === c.fonte) && (!c.grav || x.gravidade === c.grav) && (!c.tema || x.tema === c.tema) &&
        (!q || norm(x.texto + ' ' + x.id + ' ' + (x.area || '') + ' ' + x.tema + ' ' + x.responsavel).indexOf(q) >= 0);
    });
  }

  function grupos(lista) {
    var a = st.casos.agrupar;
    if (a === 'estado') return ESTADOS.map(function (e) { return { id: e.id, nome: e.id, cor: e.cor, itens: lista.filter(function (x) { return estadoDe(x) === e.id; }) }; });
    if (a === 'fonte') return D.FONTES.map(function (f) { return { id: f.id, nome: f.nome, cor: COR_FONTE[f.id], itens: lista.filter(function (x) { return x.fonte === f.id; }) }; });
    if (a === 'area') return D.AREAS.concat(['']).map(function (ar) { return { id: ar || 'sem', nome: ar || 'Área não indicada', cor: '#484747', itens: lista.filter(function (x) { return (x.area || '') === ar; }) }; });
    return D.TEMAS.map(function (t) { return { id: t.nome, nome: t.nome, cor: '#484747', itens: lista.filter(function (x) { return x.tema === t.nome; }) }; })
      .sort(function (p, q) { return q.itens.length - p.itens.length; });
  }

  function desenharTabela() {
    var el = $('casos-tabela'); if (!el) return;
    var lista = casosFiltrados();
    if (!lista.length) { el.innerHTML = '<div class="empty"><h3>Nenhum caso com estes filtros</h3><p>Limpe a pesquisa ou escolha outro período no topo.</p></div>'; return; }
    var gs = grupos(lista).filter(function (g) { return g.itens.length; });
    var EST = {}; ESTADOS.forEach(function (e) { EST[e.id] = e; });
    var html = '<table class="tbl cases"><colgroup><col class="c-id"><col class="c-txt"><col class="c-src"><col class="c-area"><col class="c-tema"><col class="c-grav"><col class="c-est"><col class="c-resp"><col class="c-when"></colgroup>' +
      '<thead><tr><th>ID</th><th>Comentário</th><th>Fonte</th><th>Área</th><th>Tema</th><th>Gravidade</th><th style="text-align:center">Estado</th><th>Responsável</th><th>Recebido</th></tr></thead><tbody>';
    gs.forEach(function (g) {
      var chave = st.casos.agrupar + ':' + g.id;
      var aberto = st.abertos[chave] != null ? st.abertos[chave] : !(st.casos.agrupar === 'estado' && g.id === 'Fechado');
      var n = st.mostrar[chave] || 12;
      g.itens.sort(function (p, q) { return (porTratar(q) - porTratar(p)) || ORDEM_GRAV[p.gravidade] - ORDEM_GRAV[q.gravidade] || dataDe(q) - dataDe(p); });
      html += '<tr class="group-row"><td colspan="9" style="--g:' + g.cor + '"><button type="button" class="group-toggle" data-grupo="' + esc(chave) + '" aria-expanded="' + aberto + '">' + ic('baixo') + esc(g.nome) + '<span class="n tnum">' + g.itens.length + '</span></button></td></tr>';
      if (!aberto) return;
      g.itens.slice(0, n).forEach(function (x) {
        var e = EST[estadoDe(x)], f = fonte(x.fonte), t = tema(x.tema);
        var gcls = x.gravidade === 'Alta' ? 'alta' : x.gravidade === 'Média' ? 'media' : '';
        html += '<tr class="row-link' + (st.drawer === x.id ? ' is-open' : '') + '" data-id="' + x.id + '" tabindex="0" style="--g:' + g.cor + '">' +
          '<td class="id">' + x.id + '</td>' +
          '<td class="txt" title="' + esc(x.texto) + '">' + esc(x.texto) + '</td>' +
          '<td><span class="cell-src"><img class="src-logo" src="' + LOGO[x.canal] + '" alt="">' + esc(x.canal) + '</span></td>' +
          '<td class="ell">' + (x.area ? esc(x.area) : '<span style="color:var(--faint)">Não indicada</span>') + '</td>' +
          '<td class="ell" title="' + esc(x.tema) + '">' + esc(t ? t.curto : x.tema) + '</td>' +
          '<td><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></td>' +
          '<td class="state-cell"><span class="state st-' + e.cls + '">' + e.id + '</span></td>' +
          '<td><span class="who-cell">' + avatar(x.responsavel) + '<span>' + esc(x.responsavel) + '</span></span></td>' +
          '<td class="ell tnum" style="color:var(--muted)">' + quando(x) + '</td></tr>';
      });
      if (g.itens.length > n) html += '<tr class="more-row"><td colspan="9" style="--g:' + g.cor + '"><button type="button" data-mais="' + esc(chave) + '">Mostrar mais ' + Math.min(12, g.itens.length - n) + ' de ' + (g.itens.length - n) + '</button></td></tr>';
    });
    el.innerHTML = html + '</tbody></table>';

    $$('.group-toggle', el).forEach(function (b) {
      b.onclick = function () { st.abertos[b.dataset.grupo] = b.getAttribute('aria-expanded') !== 'true'; desenharTabela(); };
    });
    $$('[data-mais]', el).forEach(function (b) { b.onclick = function () { st.mostrar[b.dataset.mais] = (st.mostrar[b.dataset.mais] || 12) + 12; desenharTabela(); }; });
    $$('tr[data-id]', el).forEach(function (tr) {
      tr.onclick = function () { abrirGaveta(tr.dataset.id); };
      tr.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirGaveta(tr.dataset.id); } };
    });
  }

  function ligarCasos() {
    var t;
    $('c-q').oninput = function (e) { clearTimeout(t); t = setTimeout(function () { st.casos.q = e.target.value; desenharTabela(); }, 120); };
    ['fonte', 'grav', 'tema', 'agrupar'].forEach(function (k) { $('c-' + k).onchange = function (e) { st.casos[k] = e.target.value; desenharTabela(); }; });
    desenharTabela();
  }

  // ======================================================================
  // GAVETA DO CASO
  // ======================================================================
  var MODELOS = {
    'Instalações sanitárias': 'Lamentamos o estado em que encontrou as instalações sanitárias. Já passámos a informação à equipa da área de serviço para reforçar a limpeza e a verificação ao longo do dia.',
    'Serviço/Atendimento': 'Lamentamos que o atendimento não tenha estado ao nível que esperamos. Partilhámos o seu comentário com a responsável da área de serviço.',
    'Alimentação e bebidas': 'Obrigado por nos dizer. A qualidade do que servimos é uma prioridade e já reportámos o caso à equipa de cozinha.',
    'Preço': 'Percebemos a sua observação sobre os preços. Vamos partilhá-la com a equipa comercial, que revê a oferta e os preços regularmente.',
    'Caixa e pagamento': 'Lamentamos o incómodo no pagamento. Se houve uma cobrança a mais, envie-nos o talão e os últimos dígitos do cartão por mensagem privada para tratarmos a devolução.',
    'Reembolsos e faturação': 'Pedimos desculpa pela demora. Para avançarmos já, envie-nos por mensagem privada o número do talão e a data da compra.',
  };
  function modelo(x) {
    if (x.sentimento === 'positivo') return 'Olá. Muito obrigado pelas palavras simpáticas. Vamos partilhá-las com a equipa' + (x.area ? ' de ' + x.area : '') + '.\n\nEquipa Colibri';
    return 'Olá. ' + (MODELOS[x.tema] || 'Obrigado por partilhar a sua experiência. Já passámos o seu comentário à equipa responsável.') + '\n\nEquipa Colibri';
  }
  function destino(x) { return x.fonte === 'jira' ? 'Jira' : x.fonte === 'google' ? 'Google Business Profile' : 'Meta Business Suite'; }

  var focoAntes = null;
  function abrirGaveta(id) {
    if (!st.drawer) focoAntes = document.activeElement;
    st.drawer = id;
    desenharGaveta();
    $$('#casos-tabela tr[data-id]').forEach(function (tr) { tr.classList.toggle('is-open', tr.dataset.id === id); });
    var b = $('dr-fechar'); if (b) b.focus();
  }
  function fecharGaveta() {
    st.drawer = null;
    $('drawer').hidden = true; $('drawer-scrim').hidden = true;
    $$('#casos-tabela tr.is-open').forEach(function (tr) { tr.classList.remove('is-open'); });
    if (focoAntes && document.body.contains(focoAntes)) focoAntes.focus();
  }

  function desenharGaveta() {
    var x = D.MENCOES.filter(function (y) { return y.id === st.drawer; })[0];
    if (!x) { fecharGaveta(); return; }
    var f = fonte(x.fonte), e = estadoDe(x), resp = isResp(x);
    var gcls = x.gravidade === 'Alta' ? 'alta' : x.gravidade === 'Média' ? 'media' : '';
    var passos = [
      { ok: true, ic: 'entrada', t: 'Recebido via ' + x.canal, s: dataLonga(x) },
      { ok: true, ic: 'etiqueta', t: 'Classificado automaticamente', s: x.tema + ' · gravidade ' + x.gravidade.toLowerCase() },
      { ok: true, ic: 'pessoaSeta', t: 'Atribuído a ' + x.responsavel, s: x.area ? 'Responsável da área de ' + x.area : 'Sem área indicada, fica com a equipa CX' },
      resp ? { ok: true, ic: 'conversa', t: 'Respondido', s: respondidoAgora[x.id] ? 'Agora, nesta sessão' : nf(x.horas) + ' h depois de chegar' }
        : { ok: false, ic: 'relogio', t: 'Resposta por enviar', s: 'À espera há ' + diasAtras(x) + (diasAtras(x) === 1 ? ' dia' : ' dias') },
    ];
    if (e === 'Fechado') passos.push({ ok: true, ic: 'certo', t: 'Fechado', s: resp ? 'Caso encerrado' : 'Encerrado sem resposta' });

    var el = $('drawer');
    el.innerHTML = '<div class="dr-head"><img class="src-logo" src="' + LOGO[x.canal] + '" alt=""><span class="id">' + x.id + '</span><span class="sp"></span><button type="button" class="icon-btn" id="dr-fechar" aria-label="Fechar">' + ic('fechar') + '</button></div>' +
      '<div class="dr-body"><h2 id="drawer-title">“' + esc(x.texto) + '”</h2><p class="q-meta">' + estrelas(x.estrelas) + '<span>' + esc(f.nome) + (x.fonte === 'redes' ? ' · ' + x.canal : '') + '</span><span aria-hidden="true">·</span><span>' + quando(x) + '</span></p>' +
      '<dl class="kv">' +
      '<dt><label for="dr-estado">Estado</label></dt><dd><select class="select" id="dr-estado">' + ESTADOS.map(function (s) { return '<option' + (s.id === e ? ' selected' : '') + '>' + s.id + '</option>'; }).join('') + '</select></dd>' +
      '<dt>Responsável</dt><dd>' + avatar(x.responsavel) + esc(x.responsavel) + '</dd>' +
      '<dt>Área de serviço</dt><dd>' + (x.area ? '<a class="link" href="#/areas/' + slug(x.area) + '">' + esc(x.area) + '</a>' : '<span style="color:var(--muted)">Não indicada</span>') + '</dd>' +
      '<dt>Tema</dt><dd>' + esc(x.tema) + '</dd>' +
      '<dt>Gravidade</dt><dd><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></dd>' +
      '<dt>Sentimento</dt><dd>' + x.sentimento.charAt(0).toUpperCase() + x.sentimento.slice(1) + '</dd>' +
      '</dl><h3>Histórico</h3><ol class="steps">' + passos.map(function (p) {
        return '<li><span class="dot ' + (p.ok ? 'done' : 'todo') + '">' + ic(p.ic) + '</span><div><b>' + esc(p.t) + '</b><span>' + esc(p.s) + '</span></div></li>';
      }).join('') + '</ol>' +
      (resp ? '' : '<div class="reply"><h3>Resposta</h3><label for="dr-texto">Modelo para ' + esc(x.sentimento === 'positivo' ? 'elogios' : x.tema.toLowerCase()) + '. Edite antes de enviar.</label><textarea id="dr-texto">' + esc(modelo(x)) + '</textarea></div>') +
      '</div>' +
      (resp ? '' : '<div class="dr-foot"><span class="hint">Envie no ' + destino(x) + '.</span><button type="button" class="btn btn-outline" id="dr-copiar">' + ic('copiar') + 'Copiar</button><button type="button" class="btn btn-primary" id="dr-feito">' + ic('certo') + 'Marcar como respondido</button></div>');
    el.hidden = false; $('drawer-scrim').hidden = false;

    $('dr-fechar').onclick = fecharGaveta;
    $('dr-estado').onchange = function (ev) { alterado[x.id] = ev.target.value; atualizarDepoisDeMudar(); };
    if ($('dr-copiar')) $('dr-copiar').onclick = function () {
      var ta = $('dr-texto');
      var falha = function () { ta.select(); toast('Texto selecionado. Use Ctrl+C para copiar.'); };
      try { navigator.clipboard.writeText(ta.value).then(function () { toast('Resposta copiada.'); }, falha); } catch (err) { falha(); }
    };
    if ($('dr-feito')) $('dr-feito').onclick = function () { respondidoAgora[x.id] = true; alterado[x.id] = 'Respondido'; toast('Marcado como respondido.'); atualizarDepoisDeMudar(); };
    $$('.kv a', el).forEach(function (a) { a.addEventListener('click', function () { fecharGaveta(); }); });
  }
  function atualizarDepoisDeMudar() {
    var r = rota();
    if (r.p === 'casos') { desenharTabela(); var n = D.MENCOES.filter(porTratar).length; $('nav-count').textContent = n ? nf(n) : ''; desenharGaveta(); }
    else render();
  }
  $('drawer-scrim').onclick = fecharGaveta;
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (st.drawer) fecharGaveta(); else fecharMenu(); }
  });

  // ======================================================================
  // ÁREAS DE SERVIÇO
  // ======================================================================
  function pgAreas() {
    var j = janela();
    var linhas = D.AREAS.map(function (a) {
      var rows = filtrar(j.desde, j.ate, a), prev = filtrar(j.pDesde, j.pAte, a);
      var k = indicadores(rows), kp = indicadores(prev);
      var neg = rows.filter(isNeg);
      var top = D.TEMAS.map(function (t) { return [t, neg.filter(function (x) { return x.tema === t.nome; }).length]; }).sort(function (p, q) { return q[1] - p[1]; })[0];
      return { a: a, info: D.AREA_INFO[a], k: k, kp: kp, top: top };
    }).sort(function (p, q) { return q.k.neg - p.k.neg; });

    var h = '<div class="page-head"><div><h1>Áreas de serviço</h1><p class="meta">' + D.AREAS.length + ' áreas · ' + periodoTxt(j) + ' · ordenadas por número de reclamações</p></div></div>' +
      '<section class="panel"><div class="tbl-wrap"><table class="tbl" style="min-width:920px"><thead><tr><th>Área</th><th>Responsável</th><th class="num">Menções</th><th class="num">Reclamações</th><th class="num">Rating Google</th><th class="num">Respondidas</th><th class="num">Por tratar</th><th>Tema principal</th></tr></thead><tbody>' +
      linhas.map(function (l) {
        var d = delta(l.k.neg, l.kp.neg, false, 'abs');
        return '<tr class="row-link" data-area="' + esc(l.a) + '" tabindex="0"><td><span class="strong">' + esc(l.a) + '</span><span class="sub">' + l.info.via + ' · ' + l.info.km + '</span></td>' +
          '<td><span class="who-cell">' + avatar(l.info.gestor) + '<span>' + esc(l.info.gestor) + '</span></span></td>' +
          '<td class="num">' + nf(l.k.total) + '</td>' +
          '<td class="num"><span class="strong">' + nf(l.k.neg) + '</span> <span class="delta ' + d.cls + '">' + (d.cls === 'flat' ? '' : d.txt) + '</span></td>' +
          '<td class="num">' + (l.k.rating == null ? '–' : nf(l.k.rating, 1)) + '</td>' +
          '<td class="num">' + (l.k.taxa == null ? '–' : nf(l.k.taxa) + '%') + '</td>' +
          '<td class="num">' + (l.k.abertos ? '<span class="badge pink tnum">' + l.k.abertos + '</span>' : '<span style="color:var(--faint)">0</span>') + '</td>' +
          '<td>' + (l.top && l.top[1] ? esc(l.top[0].nome) + ' <span style="color:var(--muted)">(' + l.top[1] + ')</span>' : '–') + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';

    // Mapa de calor área × tema
    var neg = filtrar(j.desde, j.ate, '').filter(isNeg);
    var top = D.TEMAS.map(function (t) { return { t: t, n: neg.filter(function (x) { return x.tema === t.nome; }).length }; }).filter(function (x) { return x.n; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 7);
    var vals = D.AREAS.map(function (a) { return top.map(function (x) { return neg.filter(function (y) { return y.area === a && y.tema === x.t.nome; }).length; }); });
    var vmax = Math.max.apply(null, [1].concat([].concat.apply([], vals)));
    h += '<div class="sec-head"><h2>Temas por área</h2><span class="heat-key">menos<i></i>mais</span></div><section class="panel panel-body"><div class="tbl-wrap"><table class="heat"><colgroup><col class="first">' + top.map(function () { return '<col>'; }).join('') + '</colgroup><thead><tr><th></th>' +
      top.map(function (x) { return '<th title="' + esc(x.t.nome) + '">' + esc(x.t.curto) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      D.AREAS.map(function (a, i) {
        return '<tr><td class="a">' + esc(a) + '</td>' + vals[i].map(function (v) {
          var p = v / vmax;
          return '<td class="c" style="background:' + (v ? 'rgba(182,36,84,' + (0.07 + p * 0.83).toFixed(2) + ')' : '#FAFAF8') + ';color:' + (p > 0.5 ? '#FFFFFF' : '#5A1516') + '">' + (v || '') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></section>';
    return h;
  }
  function ligarAreas() {
    $$('tr[data-area]').forEach(function (tr) {
      tr.onclick = function () { irArea(tr.dataset.area); };
      tr.onkeydown = function (e) { if (e.key === 'Enter') irArea(tr.dataset.area); };
    });
  }

  function pgArea(nome) {
    var info = D.AREA_INFO[nome];
    if (!info) return '<div class="empty"><h3>Área não encontrada</h3><p><a class="link" href="#/areas">Voltar às áreas de serviço</a></p></div>';
    var j = janela();
    var rows = filtrar(j.desde, j.ate, nome), prev = filtrar(j.pDesde, j.pAte, nome);
    var k = indicadores(rows), kp = indicadores(prev);
    var neg = rows.filter(isNeg);
    var palavras = nome.split(' ').filter(function (w) { return w.length > 2; });
    var marca = (palavras.length > 1 ? palavras[0][0] + palavras[palavras.length - 1][0] : nome.slice(0, 2)).toUpperCase();

    var pend = rows.filter(porTratar).sort(function (a, b) { return ORDEM_GRAV[a.gravidade] - ORDEM_GRAV[b.gravidade] || dataDe(b) - dataDe(a); });

    var h = '<a class="link back" href="#/areas">' + ic('voltar') + 'Áreas de serviço</a><div class="profile"><aside class="profile-side">' +
      '<div class="area-mark" aria-hidden="true">' + esc(marca) + '</div><h1>' + esc(nome) + '</h1><p class="role">Área de serviço · ' + info.via + ' ' + info.km + '</p>' +
      '<div class="actions"><button type="button" class="btn btn-primary btn-block" id="a-casos">Ver casos da área</button><a class="btn btn-outline btn-block" href="#/areas">Comparar com as outras áreas</a></div>' +
      '<dl class="facts">' +
      '<div><dt>Autoestrada</dt><dd>' + info.via + ', ' + info.km + '</dd></div>' +
      '<div><dt>Sentido</dt><dd>' + info.sentido + '</dd></div>' +
      '<div><dt>Responsável</dt><dd>' + avatar(info.gestor) + esc(info.gestor) + '</dd></div>' +
      '<div><dt>Serviços</dt><dd>' + info.servicos.map(function (s) { return '<span class="badge">' + esc(s) + '</span>'; }).join('') + '</dd></div>' +
      '<div><dt>Rating Google no período</dt><dd>' + (k.rating == null ? '–' : '<b class="tnum">' + nf(k.rating, 1) + '</b> ' + estrelas(Math.round(k.rating)) + ' <span style="color:var(--muted);font-size:12px">' + k.nReviews + ' reviews</span>') + '</dd></div>' +
      '</dl></aside><div class="profile-main">';

    // Por tratar
    h += '<section class="pending" aria-labelledby="t-pend"><div class="pending-head"><h2 id="t-pend">Por tratar</h2><span class="tnum">' + (pend.length ? pend.length + (pend.length === 1 ? ' caso aberto' : ' casos abertos') : 'Nada pendente') + '</span></div>' +
      (pend.length ? pend.slice(0, 3).map(function (x) {
        var gcls = x.gravidade === 'Alta' ? 'alta' : x.gravidade === 'Média' ? 'media' : '';
        return '<div class="pending-item"><div class="t"><b>' + esc(x.texto) + '</b><span class="m"><img class="src-logo" src="' + LOGO[x.canal] + '" alt="' + esc(x.canal) + '">' + esc(x.tema) + '<span aria-hidden="true">·</span>' + quando(x) + '<span aria-hidden="true">·</span><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></span></div><button type="button" class="btn btn-outline" data-abrir="' + x.id + '">Abrir</button></div>';
      }).join('') + (pend.length > 3 ? '<div style="padding:10px 12px 4px"><button type="button" class="link" id="a-pend">Ver os ' + pend.length + ' casos abertos' + ic('seta') + '</button></div>' : '')
        : '<div class="pending-item"><div class="t"><b style="font-weight:500">Todos os casos desta área estão respondidos ou fechados.</b></div></div>') + '</section>';

    // Números
    function stat(kx, v, unid, d) { return '<div class="stat"><p class="k">' + kx + '</p><p class="v tnum">' + v + (unid ? '<small>' + unid + '</small>' : '') + '</p><span class="delta ' + d.cls + ' tnum">' + (d.cls === 'flat' && d.txt === 'igual' ? 'igual ao anterior' : d.txt) + '</span></div>'; }
    h += '<section class="panel"><div class="panel-head"><h2>Resumo</h2><p>' + periodoTxt(j) + ', comparado com o período anterior</p></div><div class="stat-row">' +
      stat('Menções', nf(k.total), '', delta(k.total, kp.total, null, 'rel')) +
      stat('Reclamações', nf(k.neg), '', delta(k.neg, kp.neg, false, 'rel')) +
      stat('Rating Google', k.rating == null ? '–' : nf(k.rating, 1), k.rating == null ? '' : 'de 5', delta(k.rating, kp.rating, true, 'dec')) +
      stat('Respondidas', k.taxa == null ? '–' : nf(k.taxa), k.taxa == null ? '' : '%', delta(k.taxa, kp.taxa, true, 'pp')) +
      stat('1.ª resposta', k.tempo == null ? '–' : nf(k.tempo), k.tempo == null ? '' : 'h', delta(k.tempo, kp.tempo, false, 'h')) +
      '</div></section>';

    // Temas vs. média
    var todasNeg = filtrar(j.desde, j.ate, '').filter(function (x) { return isNeg(x) && x.area; });
    var temas = D.TEMAS.map(function (t) {
      return { t: t, n: neg.filter(function (x) { return x.tema === t.nome; }).length, avg: todasNeg.filter(function (x) { return x.tema === t.nome; }).length / D.AREAS.length };
    }).filter(function (x) { return x.n || x.avg >= 1; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
    var mx = Math.max.apply(null, [1].concat(temas.map(function (x) { return Math.max(x.n, x.avg); })));
    h += '<section class="panel"><div class="panel-head"><h2>Reclamações por tema</h2><p>' + periodoTxt(j) + '</p></div><div class="panel-body"><div class="bars">' +
      (temas.length ? temas.map(function (x, i) {
        return '<button type="button" class="bar-row' + (i === 0 && x.n ? ' top' : '') + '" data-tema="' + esc(x.t.nome) + '" aria-label="' + esc(x.t.nome) + ': ' + x.n + ' reclamações, média das áreas ' + nf(x.avg, 1) + '"><span class="lbl">' + esc(x.t.nome) + '</span><span class="track"><span class="fill" style="width:' + (x.n / mx * 100).toFixed(1) + '%"></span><span class="avg" style="left:' + (x.avg / mx * 100).toFixed(1) + '%"></span></span><span class="n tnum">' + x.n + '</span></button>';
      }).join('') : '<p class="empty-line">Sem reclamações neste período.</p>') +
      '</div><p class="bar-key"><span><i></i>Média das ' + D.AREAS.length + ' áreas</span></p></div></section>';

    // Evolução
    h += '<section class="panel"><div class="panel-head"><h2>Reclamações por mês</h2><p>Últimos 12 meses, comparado com a média das áreas</p></div><div class="panel-body" style="padding-top:8px"><div id="ch-area" role="img" aria-label="Reclamações por mês em ' + esc(nome) + ' e média das áreas"></div></div></section>';

    // Recentes
    var rec = rows.slice().sort(function (a, b) { return dataDe(b) - dataDe(a); }).slice(0, 5);
    h += '<section class="panel"><div class="panel-head"><h2>Comentários recentes</h2><p>Todas as fontes</p></div>' + (rec.length ? '<ul class="feed-list">' + rec.map(function (x) {
      return '<li><button type="button" data-abrir="' + x.id + '"><img src="' + LOGO[x.canal] + '" alt="' + esc(x.canal) + '"><span class="t"><p>' + esc(x.texto) + '</p><span>' + esc(x.tema) + ' · ' + quando(x) + (x.estrelas ? ' · ' : '') + estrelas(x.estrelas) + '</span></span></button></li>';
    }).join('') + '</ul>' : '<p class="panel-body empty-line">Sem comentários neste período.</p>') + '</section>';

    return h + '</div></div>';
  }
  function ligarArea(nome) {
    if (!D.AREA_INFO[nome]) return;
    $('a-casos').onclick = function () { st.area = nome; irCasos({}); };
    if ($('a-pend')) $('a-pend').onclick = function () { st.area = nome; irCasos({ agrupar: 'estado' }); };
    $$('[data-abrir]').forEach(function (b) { b.onclick = function () { abrirGaveta(b.dataset.abrir); }; });
    $$('.bar-row').forEach(function (b) { b.onclick = function () { st.area = nome; irCasos({ tema: b.dataset.tema }); }; });
    var meses = meses12();
    var sA = meses.map(function (m) { return D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area === nome; }).length; });
    var sM = meses.map(function (m) { return +(D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area; }).length / D.AREAS.length).toFixed(1); });
    chart($('ch-area'), {
      grid: { left: 4, right: 12, top: 18, bottom: 4, containLabel: true },
      tooltip: Object.assign({ trigger: 'axis' }, TOOLTIP),
      xAxis: Object.assign({ type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }) }, EIXO),
      yAxis: Object.assign({ type: 'value', min: 0, splitNumber: 3, axisLabel: { color: '#6E6D6B', fontSize: 11 } }, GRELHA),
      series: [
        { name: 'Média das áreas', type: 'line', smooth: 0.35, smoothMonotone: 'x', data: sM, symbol: 'none', lineStyle: { width: 1.5, type: [4, 3], color: '#9A9895' } },
        { name: nome, type: 'line', smooth: 0.35, smoothMonotone: 'x', data: sA, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2.5, color: '#B62454' }, itemStyle: { color: '#FFFFFF', borderColor: '#B62454', borderWidth: 2 },
          areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(182,36,84,.12)' }, { offset: 1, color: 'rgba(182,36,84,0)' }]) } : null },
      ],
    });
  }

  // ======================================================================
  // FONTES
  // ======================================================================
  var COMO = {
    google: 'Exportação de reviews do Google Business Profile (.xlsx)',
    jira: 'Filtro do projeto de reclamações exportado em CSV',
    redes: 'Exportação da caixa de entrada do Meta Business Suite (.xlsx)',
  };
  function pgFontes() {
    var h = '<div class="page-head"><div><h1>Fontes</h1><p class="meta">De onde vêm os dados, como chegam e como são classificados</p></div></div>' +
      '<section class="panel"><div class="tbl-wrap"><table class="tbl" style="min-width:860px"><thead><tr><th>Fonte</th><th class="num">Registos</th><th>Período coberto</th><th>Última carga</th><th>Dados</th><th>Ligação automática</th></tr></thead><tbody>' +
      D.FONTES.map(function (f) {
        var r = D.MENCOES.filter(function (x) { return x.fonte === f.id; });
        return '<tr><td><span class="src-name"><span class="lg">' + logoFonte(f) + '</span><span><span class="strong">' + esc(f.nome) + '</span><span class="sub">' + COMO[f.id] + '</span></span></span></td>' +
          '<td class="num strong">' + nf(r.length) + '</td><td>dez 2024 – nov 2026</td><td>23 nov 2026</td>' +
          '<td><span class="badge pink">Fictícios</span></td><td><span class="badge dashed">Fase 2</span></td></tr>';
      }).join('') + '</tbody></table></div></section>';

    h += '<div class="two-col" style="margin-top:20px"><section class="panel"><div class="panel-head"><h2>Carregar ficheiros</h2><p>Exportações das três fontes</p></div><div class="panel-body">' +
      '<label class="drop" id="drop" for="ficheiros">' + ic('nuvem') + '<b>Arraste os ficheiros para aqui</b><p>Ou clique para escolher. Aceita .xlsx e .csv. Os ficheiros são lidos neste computador e nada é enviado para fora.</p><input id="ficheiros" type="file" multiple accept=".xlsx,.xls,.csv" class="sr"></label>' +
      '<ul class="file-list" id="file-list"></ul></div></section>' +
      '<section class="panel"><div class="panel-head"><h2>Como classificamos</h2><p>Regras fixas, iguais para todas as fontes</p></div><div class="panel-body"><dl class="rules">' +
      '<dt>Tema</dt><dd>Os 12 drivers do inquérito VoC, mais Preço e Reembolsos e faturação. O que não encaixa fica em Outros.</dd>' +
      '<dt>Sentimento</dt><dd>No Google vem das estrelas (1–2 negativo, 3 neutro, 4–5 positivo). No Jira é sempre negativo. Nas redes sociais vem de palavras-chave.</dd>' +
      '<dt><span class="grav alta"><i></i></span>Gravidade alta</dt><dd>Review de 1 estrela, ou risco legal, de segurança ou reputacional (por exemplo DECO, advogado, burla, acidente).</dd>' +
      '<dt><span class="grav media"><i></i></span>Gravidade média</dt><dd>Queixa concreta sobre o serviço.</dd>' +
      '<dt><span class="grav"><i></i></span>Gravidade baixa</dt><dd>Comentário, sugestão ou menção neutra.</dd>' +
      '</dl></div></section></div>';
    return h;
  }
  function ligarFontes() {
    var drop = $('drop'), inp = $('ficheiros');
    function listar(files) {
      var arr = Array.prototype.slice.call(files || []);
      $('file-list').innerHTML = arr.map(function (f) {
        return '<li><b>' + esc(f.name) + '</b><span class="tnum">' + nf(f.size / 1024, 0) + ' KB</span></li>';
      }).join('') + (arr.length ? '<li><span>Nesta versão os ficheiros ainda não substituem os dados fictícios. A leitura já está preparada em app/js/importadores e liga-se a seguir.</span></li>' : '');
    }
    inp.onchange = function () { listar(inp.files); };
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function (e) { listar(e.dataTransfer.files); });
  }

  // ======================================================================
  // Elementos fixos
  // ======================================================================
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(t._t); t._t = setTimeout(function () { t.hidden = true; }, 3000);
  }
  function fecharMenu() { $('sidebar').classList.remove('open'); $('scrim').hidden = true; $('btn-menu').setAttribute('aria-expanded', 'false'); }
  $('btn-menu').onclick = function () { var o = !$('sidebar').classList.contains('open'); $('sidebar').classList.toggle('open', o); $('scrim').hidden = !o; this.setAttribute('aria-expanded', String(o)); };
  $('scrim').onclick = fecharMenu;

  $('f-area').innerHTML = '<option value="">Todas as áreas</option>' + D.AREAS.map(function (a) { return '<option>' + esc(a) + '</option>'; }).join('');
  $('f-area').onchange = function (e) { st.area = e.target.value; st.voz = 0; render(); };
  $$('#periodo button').forEach(function (b) { b.onclick = function () { st.periodo = +b.dataset.p; st.voz = 0; render(); }; });

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { charts.forEach(function (c) { c.resize(); }); }, 80); });
  window.addEventListener('hashchange', render);
  render();
})();
