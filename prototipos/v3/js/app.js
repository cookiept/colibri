/* Colibri · Customer feedback
   Clickable prototype: Overview, Cases, Service areas (list and detail) and Sources.
   Classic script, no modules, so it opens with a double click. */
(function () {
  'use strict';

  var D = window.COLIBRI_DADOS;
  var HOJE = D.HOJE;
  var MES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MES_LONGO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var LOGO = { Google: 'assets/logos/google.svg', Jira: 'assets/logos/jira.svg', Facebook: 'assets/logos/facebook.svg', Instagram: 'assets/logos/instagram.svg' };
  var ORDEM_GRAV = { High: 0, Medium: 1, Low: 2 };
  var ESTADOS = [
    { id: 'New', cls: 'novo', cor: '#3D6FD6' },
    { id: 'In review', cls: 'anal', cor: '#D08A00' },
    { id: 'Replied', cls: 'resp', cor: '#1B7A4B' },
    { id: 'Closed', cls: 'fech', cor: '#A3A19D' },
  ];
  // Cores lisas por fonte (sem degradês)
  var COR_FONTE = { google: '#4285F4', jira: '#6554C0', redes: '#E1306C' };

  // Ícones de traço (24×24)
  var P = {
    gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    sanita: '<rect x="5" y="3" width="6" height="7" rx="1"/><path d="M4 10h16v.5a6.5 6.5 0 0 1-6.5 6.5h-3A6.5 6.5 0 0 1 4 10.5V10z"/><path d="M9 17l-.8 4h7.6L15 17"/>',
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
    grelha: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    exportar: '<path d="M12 15V4m0 0L8 8m4-4 4 4M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/>',
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

  // ---------- utilitários ----------
  function $(id) { return document.getElementById(id); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function nf(n, d) { d = d || 0; return Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function mesDe(m) { return new Date(2024, 11 + m, 1); }
  function mesTxt(m, ano) { var d = mesDe(m); return MES[d.getMonth()] + (ano ? ' ' + d.getFullYear() : ''); }
  function dataDe(x) { var d = mesDe(x.m); return new Date(d.getFullYear(), d.getMonth(), x.dia); }
  function diasAtras(x) { return Math.max(0, Math.round((HOJE - dataDe(x)) / 864e5)); }
  function dataLonga(x) { var d = dataDe(x); return d.getDate() + ' ' + MES_LONGO[d.getMonth()] + ' ' + d.getFullYear(); }
  function quando(x) {
    var d = diasAtras(x);
    if (d <= 0) return 'today';
    if (d === 1) return 'yesterday';
    if (d < 30) return d + ' days ago';
    var dt = dataDe(x); return dt.getDate() + ' ' + MES[dt.getMonth()] + ' ' + dt.getFullYear();
  }
  function tema(nome) { return D.TEMAS.filter(function (t) { return t.nome === nome; })[0]; }
  function fonte(id) { return D.FONTES.filter(function (f) { return f.id === id; })[0]; }
  function soma(arr, f) { return arr.reduce(function (s, x) { return s + f(x); }, 0); }
  function media(arr, f) { return arr.length ? soma(arr, f) / arr.length : null; }
  function iniciais(nome) { var p = nome.split(' ').filter(function (w) { return w.length > 2 || /^[A-Z]/.test(w); }); return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : p[0][1])).toUpperCase(); }
  function avCls(nome) { var h = 0; for (var i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) % 997; return 'av-' + (h % 5); }
  function avatar(nome) { return '<span class="av ' + avCls(nome) + '" aria-hidden="true">' + esc(nome === 'CX Team' ? 'CX' : iniciais(nome)) + '</span>'; }
  function estrelas(n) { return n ? '<span class="stars" aria-label="' + n + ' out of 5 stars">' + '★'.repeat(n) + '<s>' + '★'.repeat(5 - n) + '</s></span>' : ''; }
  function logoFonte(f) {
    return f.id === 'redes' ? '<span class="src-pair"><img class="src-logo" src="' + LOGO.Facebook + '" alt=""><img class="src-logo" src="' + LOGO.Instagram + '" alt=""></span>' : '<img class="src-logo" src="' + f.logo + '" alt="">';
  }
  function slug(area) { return encodeURIComponent(area); }

  // ---------- transições ----------
  var REDUZ = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function entrar(el) {
    clearTimeout(el._sai);
    if (!el.hidden && el.classList.contains('is-in')) return;
    el.hidden = false;
    void el.offsetWidth; // força o estado inicial antes de animar
    el.classList.add('is-in');
  }
  function sair(el, ms) {
    el.classList.remove('is-in');
    clearTimeout(el._sai);
    el._sai = setTimeout(function () { if (!el.classList.contains('is-in')) el.hidden = true; }, REDUZ ? 0 : (ms || 320));
  }
  // Barras e anéis crescem a partir de zero depois de desenhados
  function crescer(root) {
    var els = $$('[data-w], [data-dash], [data-h], [data-flex]', root || document);
    if (!els.length) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.forEach(function (e) {
          if (e.dataset.w) e.style.width = e.dataset.w;
          if (e.dataset.h) e.style.height = e.dataset.h;
          if (e.dataset.flex) e.style.flex = '0 0 ' + e.dataset.flex + '%';
          if (e.dataset.dash) e.setAttribute('stroke-dasharray', e.dataset.dash);
        });
      });
    });
  }

  // ---------- estado ----------
  var st = {
    periodo: 3, area: '',
    casos: { q: '', fonte: '', grav: '', tema: '', foco: '', agrupar: 'estado' },
    abertos: {}, mostrar: {}, voz: 0, drawer: null, actFonte: '',
    areasF: { q: '', via: '', servico: '', abertos: '', ordem: 'neg' },
  };
  var alterado = {};      // id -> estado escolhido nesta sessão
  var respondidoAgora = {};

  function estadoDe(x) { return alterado[x.id] || x.estado; }
  function porTratar(x) { var e = estadoDe(x); return e === 'New' || e === 'In review'; }
  function isResp(x) { return x.respondido || !!respondidoAgora[x.id]; }
  function isNeg(x) { return x.sentimento === 'negative'; }

  function janela() { var ate = 23, desde = 24 - st.periodo; return { desde: desde, ate: ate, pDesde: desde - st.periodo, pAte: desde - 1 }; }
  function periodoTxt(j) { return st.periodo === 1 ? 'November 2026' : mesTxt(j.desde, mesDe(j.desde).getFullYear() !== mesDe(j.ate).getFullYear()) + '–' + mesTxt(j.ate, true); }
  function filtrar(desde, ate, area) {
    area = area === undefined ? st.area : area;
    return D.MENCOES.filter(function (x) { return x.m >= desde && x.m <= ate && (!area || x.area === area); });
  }
  function areaTxt() { return st.area ? st.area + ' service area' : 'All service areas'; }

  function indicadores(rows) {
    var g = rows.filter(function (x) { return x.fonte === 'google'; });
    var pedem = rows.filter(function (x) { return x.sentimento !== 'positive'; });
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
    if (a == null || b == null || (tipo === 'rel' && b === 0)) return { cls: 'flat', txt: 'no comparison', v: 0 };
    var v = tipo === 'rel' ? (a - b) / b * 100 : a - b;
    var lim = tipo === 'dec' ? 0.05 : 0.5;
    if (Math.abs(v) < lim) return { cls: 'flat', txt: 'no change', v: 0 };
    var sobe = v > 0;
    var txt = tipo === 'rel' ? nf(Math.abs(v)) + '%' : tipo === 'pp' ? nf(Math.abs(v)) + ' pp' : tipo === 'h' ? nf(Math.abs(v)) + ' h' : tipo === 'dec' ? nf(Math.abs(v), 1) : nf(Math.abs(v));
    return { cls: bomSobe == null ? 'flat' : sobe === bomSobe ? 'good' : 'bad', txt: (sobe ? '↑ ' : '↓ ') + txt, v: v };
  }

  // ---------- gráficos ----------
  var charts = [];
  function chart(el, opt) {
    if (!el) return null;
    if (!window.echarts) { el.innerHTML = '<p class="empty-line">The chart needs an internet connection to load.</p>'; return null; }
    var c = echarts.init(el, null, { renderer: 'svg' });
    c.setOption(Object.assign({ animationDuration: REDUZ ? 0 : 700, animationEasing: 'cubicOut', animationDurationUpdate: REDUZ ? 0 : 400, textStyle: { fontFamily: 'Noto Sans, system-ui, sans-serif' } }, opt));
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
    return { p: partes[0] || 'overview', arg: partes[1] ? decodeURIComponent(partes[1]) : null };
  }
  function irCasos(filtros) {
    st.casos = Object.assign({ q: '', fonte: '', grav: '', tema: '', foco: '', agrupar: st.casos.agrupar }, filtros || {});
    if (location.hash === '#/cases') render(); else location.hash = '#/cases';
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


    var pg = $('page'), migalhas;
    if (r.p === 'cases') { pg.innerHTML = pgCasos(); migalhas = [['Cases']]; ligarCasos(); }
    else if (r.p === 'areas' && r.arg) { pg.innerHTML = pgArea(r.arg); migalhas = [['Service areas', '#/areas'], [r.arg]]; ligarArea(r.arg); }
    else if (r.p === 'areas') { pg.innerHTML = pgAreas(); migalhas = [['Service areas']]; ligarAreas(); }
    else if (r.p === 'sources') { pg.innerHTML = pgFontes(); migalhas = [['Sources']]; ligarFontes(); }
    else { pg.innerHTML = pgVisao(); migalhas = [['Overview']]; ligarVisao(); }
    ligarFiltros();
    melhorarSelects(pg);

    $('crumbs').innerHTML = '<a href="#/overview">Customer feedback</a>' + migalhas.map(function (m, i) {
      return '<span class="sep" aria-hidden="true">/</span>' + (m[1] ? '<a href="' + m[1] + '">' + esc(m[0]) + '</a>' : '<span aria-current="page">' + esc(m[0]) + '</span>');
    }).join('');
    document.title = migalhas[migalhas.length - 1][0] + ' · Colibri · Customer feedback';

    var chave = r.p + '/' + (r.arg || '');
    if (chave !== ultimaRota) {
      window.scrollTo(0, 0); ultimaRota = chave;
      pg.classList.remove('enter'); void pg.offsetWidth; pg.classList.add('enter');
    }
    crescer(pg);
    if (st.drawer) desenharGaveta();
  }

  // ======================================================================
  // VISÃO GERAL
  // ======================================================================
  var sinalAtual = null, outrosSinais = [], vozes = [];

  // Filtros no cabeçalho de cada página (pílulas)
  function filtros(o) {
    o = o || {};
    var per = [[1, 'Last month'], [3, 'Last 3 months'], [6, 'Last 6 months'], [12, 'Last 12 months']];
    return '<div class="head-actions">' +
      '<label class="sr" for="pf-periodo">Period</label><select class="select pill" id="pf-periodo">' + per.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === st.periodo ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') + '</select>' +
      (o.area ? '<label class="sr" for="pf-area">Service area</label><select class="select pill" id="pf-area"><option value="">All areas</option>' + D.AREAS.map(function (a) { return '<option' + (a === st.area ? ' selected' : '') + '>' + esc(a) + '</option>'; }).join('') + '</select>' : '') +
      (o.organizar ? '<button type="button" class="btn btn-ghost pill" id="pf-repor"' + (st.editar ? '' : ' hidden') + '>Reset order</button><button type="button" class="btn ' + (st.editar ? 'btn-dark' : 'btn-outline') + ' pill" id="pf-organizar" aria-pressed="' + !!st.editar + '">' + ic('grelha') + '<span>' + (st.editar ? 'Done' : 'Arrange') + '</span></button>' : '') +
      (o.exportar ? '<button type="button" class="btn btn-dark pill" id="pf-exportar">' + ic('exportar') + 'Export to PowerPoint</button>' : '') +
      '</div>';
  }
  function ligarFiltros() {
    if ($('pf-periodo')) $('pf-periodo').onchange = function (e) { st.periodo = +e.target.value; st.voz = 0; render(); };
    if ($('pf-area')) $('pf-area').onchange = function (e) { st.area = e.target.value; st.voz = 0; render(); };
    if ($('pf-exportar')) $('pf-exportar').onclick = exportarPptx;
  }
  // Variation pill: green when it is good news, red when it is bad, grey when neutral
  function pilula(d) {
    if (d.txt === 'no comparison') return '<span class="pill-delta flat">–</span>';
    if (d.txt === 'no change') return '<span class="pill-delta flat">No change</span>';
    var cls = d.cls === 'good' ? 'good' : d.cls === 'bad' ? 'bad' : 'neutral';
    return '<span class="pill-delta ' + cls + ' tnum">' + d.txt.replace('↑ ', '+').replace('↓ ', '−') + '</span>';
  }

  function pgVisao() {
    var j = janela();
    var rows = filtrar(j.desde, j.ate), prev = filtrar(j.pDesde, j.pAte);
    var k = indicadores(rows), kp = indicadores(prev);
    var neg = rows.filter(isNeg), negPrev = prev.filter(isNeg);
    var antTxt = st.periodo === 1 ? 'in October' : 'in ' + mesTxt(j.pDesde) + '–' + mesTxt(j.pAte);

    var h = '<div class="page-head hero"><div><h1>Overview</h1><p class="meta">' + esc(areaTxt()) + ' · ' + periodoTxt(j) + '</p></div>' + filtros({ area: true, exportar: true, organizar: true }) + '</div>';

    // ---- Linha 1: números com gráfico + atividade
    var meses = meses12();
    var porMes = meses.map(function (m) { return D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && (!st.area || x.area === st.area); }).length; });
    var maxM = Math.max.apply(null, [1].concat(porMes));
    // Monthly totals are discrete counts, so columns (not a line). The selected period is the dark part.
    var barras = '<div class="mini-bars" role="img" aria-label="Complaints per month: ' + meses.map(function (m, i) { return mesTxt(m, true) + ' ' + porMes[i]; }).join(', ') + '">' + meses.map(function (m, i) {
      return '<div class="mb" data-tip="' + mesTxt(m, true) + ' · ' + porMes[i] + '"><span class="b' + (m >= j.desde ? ' on' : '') + '" style="height:0" data-h="' + Math.max(4, porMes[i] / maxM * 100).toFixed(1) + '%"></span><span class="l">' + (i % 2 === 0 ? mesTxt(m) : '&nbsp;') + '</span></div>';
    }).join('') + '</div>';
    var W = {};
    snap = { j: j, k: k, kp: kp, antTxt: antTxt, meses: meses, porMes: porMes };
    W.reclamacoes = '<article class="kpi"><h2>Complaints</h2><div class="kpi-num"><b>' + nf(k.neg) + '</b>' + pilula(delta(k.neg, kp.neg, false, 'rel')) + '</div><p class="kpi-sub tnum">' + nf(kp.neg) + ' ' + antTxt + '</p>' + barras + '</article>';

    var porFonte = D.FONTES.map(function (f) { return { f: f, n: rows.filter(function (x) { return x.fonte === f.id; }).length }; });
    var tot = Math.max(1, k.total);
    W.fontes = '<article class="kpi"><h2>Mentions by source</h2><div class="kpi-num"><b>' + nf(k.total) + '</b>' + pilula(delta(k.total, kp.total, null, 'rel')) + '</div><p class="kpi-sub tnum">' + nf(kp.total) + ' ' + antTxt + '</p>' +
      '<div class="split" role="img" aria-label="' + porFonte.map(function (x) { return x.f.curto + ' ' + nf(x.n / tot * 100) + '%'; }).join(', ') + '">' + porFonte.map(function (x) {
        var p = x.n / tot * 100;
        return '<span class="seg" style="flex:0 0 0%;background:' + COR_FONTE[x.f.id] + '" data-flex="' + p.toFixed(2) + '"><b class="tnum">' + (p >= 12 ? nf(p) + '%' : '') + '</b></span>';
      }).join('') + '</div><div class="split-key">' + porFonte.map(function (x) { return '<span><i style="background:' + COR_FONTE[x.f.id] + '"></i>' + esc(x.f.curto) + ' <b class="tnum">' + nf(x.n) + '</b></span>'; }).join('') + '</div></article>';

    W.rating = '<article class="kpi kpi-line"><h2>Google rating</h2><div class="kpi-num"><b>' + (k.rating == null ? '–' : nf(k.rating, 1)) + '</b>' + pilula(delta(k.rating, kp.rating, true, 'dec')) + '</div><p class="kpi-sub tnum">' + nf(k.nReviews) + ' reviews · ' + (kp.rating == null ? 'no comparison' : nf(kp.rating, 1) + ' ' + antTxt) + '</p><div id="ch-rating" role="img" aria-label="Average Google rating by month, last 12 months"></div></article>';

    rowsVisao = rows;
    snap.porFonte = porFonte;
    W.atividade = '<article class="kpi kpi-act"><div class="kpi-head"><h2>Latest activity</h2><label class="sr" for="act-fonte">Source</label><select class="select mini" id="act-fonte"><option value="">All</option>' +
      D.FONTES.map(function (f) { return '<option value="' + f.id + '"' + (st.actFonte === f.id ? ' selected' : '') + '>' + esc(f.curto) + '</option>'; }).join('') + '</select></div>' +
      '<ul class="act" id="act-list">' + listaAtividade() + '</ul><a class="link-u act-all" href="#/cases">View all cases</a></article>';


    // ---- Linha 2: áreas, gráfico, temas
    var porArea = D.AREAS.map(function (a) { return { a: a, n: neg.filter(function (x) { return x.area === a; }).length }; }).sort(function (p, q) { return q.n - p.n; });
    var totA = Math.max(1, soma(porArea, function (x) { return x.n; }));
    var colA = '<section class="col"><div class="col-head"><h2>Service areas</h2><a class="link-u" href="#/areas">View all</a></div><ul class="dest">' + porArea.slice(0, 5).map(function (x) {
      var p = x.n / totA * 100;
      var pal = x.a.split(' ').filter(function (w) { return w.length > 2; });
      var mk = (pal.length > 1 ? pal[0][0] + pal[pal.length - 1][0] : x.a.slice(0, 2)).toUpperCase();
      return '<li><button type="button" data-area="' + esc(x.a) + '"><span class="mk">' + esc(mk) + '</span><span class="t"><span class="row"><span>' + esc(x.a) + '</span><b class="tnum">' + nf(p) + '%<small> · ' + x.n + '</small></b></span><span class="bar"><span class="fill" style="width:0" data-w="' + p.toFixed(1) + '%"></span></span></span></button></li>';
    }).join('') + '</ul><p class="col-note">Share of complaints with a known area</p></section>';

    snap.porArea = porArea;
    var colG = '<section class="col"><div class="col-head"><h2>Replies by month</h2><div class="legend"><span><i class="dot" style="background:#2E8B57"></i>Replied</span><span><i class="dot" style="background:#E5807A"></i>No reply</span></div></div><div class="chart-fill"><div id="ch-volume" role="img" aria-label="Complaints and neutral comments by month, replied and not replied"></div></div></section>';

    var temas = D.TEMAS.map(function (t) {
      var n = neg.filter(function (x) { return x.tema === t.nome; }).length;
      var np = negPrev.filter(function (x) { return x.tema === t.nome; }).length;
      return { t: t, n: n, d: n - np };
    }).filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 5);
    var colT = '<section class="col"><div class="col-head"><h2>Topics</h2><a class="link-u" href="#/cases">View cases</a></div><table class="tt"><thead><tr><th>Topic</th><th class="num">VoC NPS</th><th class="num">Compl.</th></tr></thead><tbody>' + temas.map(function (x) {
      var d = x.d === 0 ? 'No change' : (x.d > 0 ? '↑ ' : '↓ ') + Math.abs(x.d) + ' vs. prev.';
      return '<tr data-tema="' + esc(x.t.nome) + '" tabindex="0"><td><span class="tt-name"><span class="ic-circle">' + ic(x.t.icone) + '</span><span><b>' + esc(x.t.curto) + '</b><span class="' + (x.d > 0 ? 'bad' : x.d < 0 ? 'good' : '') + '">' + d + '</span></span></span></td><td class="num">' + (x.t.nps == null ? '–' : x.t.nps) + '</td><td class="num strong">' + x.n + '</td></tr>';
    }).join('') + '</tbody></table></section>';
    W.areas = colA; W.respostas = colG; W.temas = colT;
    snap.temas = temas;

    // ---- Linha 3: sinal + voz do cliente
    var combos = [];
    D.AREAS.forEach(function (a) {
      if (st.area && a !== st.area) return;
      D.TEMAS.forEach(function (t) {
        var n = neg.filter(function (x) { return x.area === a && x.tema === t.nome; });
        var np = negPrev.filter(function (x) { return x.area === a && x.tema === t.nome; }).length;
        if (n.length >= 4 && n.length > np) combos.push({ a: a, t: t, n: n.length, np: np });
      });
    });
    combos.sort(function (x, y) { return (y.n - y.np) - (x.n - x.np) || y.n - x.n; });
    sinalAtual = combos[0] || null;

    outrosSinais = [];
    var graves = rows.filter(function (x) { return x.gravidade === 'High' && porTratar(x); });
    if (graves.length) {
      var antigo = graves.reduce(function (a, b) { return diasAtras(a) > diasAtras(b) ? a : b; });
      outrosSinais.push({ html: '<b>' + nf(graves.length) + (graves.length === 1 ? ' high-severity case' : ' high-severity cases') + ' to handle.</b> The oldest is ' + diasAtras(antigo) + ' days old and is about ' + esc(antigo.tema.toLowerCase()) + (antigo.area ? ' at ' + esc(antigo.area) : '') + '.', acao: function () { irCasos({ foco: 'high' }); } });
    }
    var tempos = D.FONTES.map(function (f) {
      var rf = rows.filter(function (x) { return x.fonte === f.id && x.respondido; });
      return { f: f, tempo: media(rf, function (x) { return x.horas; }) };
    }).filter(function (x) { return x.tempo != null; }).sort(function (a, b) { return b.tempo - a.tempo; });
    if (tempos.length > 1) {
      var lento = tempos[0], rapido = tempos[tempos.length - 1];
      outrosSinais.push({ html: '<b>' + esc(lento.f.nome) + ' take ' + nf(lento.tempo) + ' h</b> to a first reply, against ' + nf(rapido.tempo) + ' h on ' + esc(rapido.f.curto) + '.', acao: function () { irCasos({ fonte: lento.f.id }); } });
    }
    if (combos[1]) {
      var c2 = combos[1];
      outrosSinais.push({ html: '<b>' + esc(c2.t.curto) + ' at ' + esc(c2.a) + '</b> went from ' + c2.np + ' to ' + c2.n + ' complaints.', acao: function () { st.area = c2.a; irCasos({ tema: c2.t.nome }); } });
    }
    var lista = '<ul class="more-signals">' + outrosSinais.map(function (s, i) { return '<li><button type="button" data-sinal="' + i + '"><span class="txt">' + s.html + '</span>' + ic('chevron') + '</button></li>'; }).join('') + '</ul>';

    var sig;
    var lado = '<aside class="signal-side"><h4>Also this period</h4>' + (outrosSinais.length ? lista : '<p class="empty-line">Nothing else stood out.</p>') + '</aside>';
    if (sinalAtual) {
      var c = sinalAtual;
      var gA = filtrar(j.desde, j.ate, c.a).filter(function (x) { return x.fonte === 'google'; });
      var gP = filtrar(j.pDesde, j.pAte, c.a).filter(function (x) { return x.fonte === 'google'; });
      var dRat = delta(media(gA, function (x) { return x.estrelas; }), media(gP, function (x) { return x.estrelas; }), true, 'dec');
      var frase = 'Complaints about ' + c.t.nome.toLowerCase() + ' at ' + c.a + ' went from ' + c.np + ' to ' + c.n + ' compared with the previous period' +
        (dRat.cls === 'bad' ? ', and the area\'s Google rating fell ' + nf(Math.abs(dRat.v), 1) + ' points.' : '.');
      sig = '<article class="panel signal" aria-labelledby="t-sinal"><div class="signal-main"><div class="signal-top"><p class="eyebrow">What changed</p><h3 id="t-sinal">' + esc(c.t.curto) + ' at ' + esc(c.a) + '</h3><p class="lead">' + esc(frase) + '</p></div>' +
        '<div class="signal-chart"><div id="ch-signal" role="img" aria-label="Complaints per month about ' + esc(c.t.nome.toLowerCase()) + ' at ' + esc(c.a) + ', compared with the area average"></div>' +
        '<div class="chip-row"><span class="float-chip">' + ic(c.t.icone) + esc(c.t.curto) + '<span class="pt-delta bad tnum">↑ ' + (c.n - c.np) + '</span></span>' +
        (dRat.cls !== 'flat' ? '<span class="float-chip"><img src="' + LOGO.Google + '" alt="">Area rating<span class="pt-delta ' + dRat.cls + ' tnum">' + dRat.txt + '</span></span>' : '') + '</div>' +
        '</div><div class="signal-foot"><span class="legend"><span><i style="background:#C2362E;height:3px"></i>' + esc(c.a) + '</span><span><i style="background:repeating-linear-gradient(90deg,#9A9895 0 4px,transparent 4px 7px);height:2px"></i>Area average</span></span>' +
        '<button type="button" class="link" id="btn-sinal">View the ' + c.n + ' cases' + ic('seta') + '</button></div></div>' + lado + '</article>';
    } else {
      sig = '<article class="panel signal" aria-labelledby="t-sinal"><div class="signal-main"><div class="signal-top"><p class="eyebrow">What changed</p><h3 id="t-sinal">No clear increase</h3><p class="lead">No area and topic combination rose clearly in this period.</p></div></div>' + lado + '</article>';
    }

    // Latest comments: the three most recent mentions, any source and sentiment
    vozes = rows.slice().sort(function (a, b) { return dataDe(b) - dataDe(a) || (b.id > a.id ? 1 : -1); }).slice(0, 3);
    var TAG = { negative: 'Complaint', neutral: 'Neutral', positive: 'Praise' };
    var vozHtml = '<section class="voices" aria-labelledby="t-voz"><div class="col-head"><h2 id="t-voz">Latest comments</h2><a class="link-u" href="#/cases">View all cases</a></div>' +
      (vozes.length ? '<div class="voice-row">' + vozes.map(function (x) {
        var cls = x.sentimento === 'positive' ? '' : x.sentimento === 'neutral' ? ' neu' : ' neg';
        return '<figure class="voice' + cls + '"><span class="tag">' + TAG[x.sentimento] + (x.sentimento === 'negative' ? ' · ' + x.gravidade.toLowerCase() + ' severity' : '') + '</span>' +
          '<blockquote>' + esc(x.texto) + '</blockquote>' +
          '<figcaption class="who"><span class="src"><img src="' + LOGO[x.canal] + '" alt=""></span><div><b>' + esc(x.canal) + (x.area ? ' · ' + esc(x.area) : '') + '</b><span>' + esc(tema(x.tema).curto) + ' · ' + quando(x) + (x.estrelas ? ' · ' : '') + estrelas(x.estrelas) + '</span></div>' +
          '<button type="button" class="link" data-abrir="' + x.id + '">Open case' + ic('seta') + '</button></figcaption></figure>';
      }).join('') + '</div>' : '<p class="empty-line">No comments in this period.</p>') + '</section>';
    snap.sinal = sinalAtual; snap.frase = sinalAtual ? frase : ''; snap.outros = outrosSinais.map(function (o) { return o.html.replace(/<[^>]+>/g, ''); }); snap.vozes = vozes;
    W.sinal = sig; W.voz = vozHtml;
    h += '<p class="edit-hint" id="edit-hint"' + (st.editar ? '' : ' hidden') + '>Drag the blocks to change the order. The order is saved in this browser.</p>' + quadro(W);
    return h;
  }

  // Latest activity: the three most recent complaints or neutral comments, optionally from one source
  var rowsVisao = [];
  function listaAtividade() {
    var recentes = rowsVisao.filter(function (x) { return x.sentimento !== 'positive' && (!st.actFonte || x.fonte === st.actFonte); })
      .sort(function (a, b) { return dataDe(b) - dataDe(a) || (b.id > a.id ? 1 : -1); }).slice(0, 3);
    if (!recentes.length) return '<li class="act-empty">Nothing from this source in the period.</li>';
    return recentes.map(function (x) {
      return '<li class="act-item"><div class="t"><b><img src="' + LOGO[x.canal] + '" alt="">' + esc(x.canal) + (x.area ? ' · ' + esc(x.area) : '') + '</b><span>' + esc(tema(x.tema).curto) + ' · ' + quando(x) + '</span></div><button type="button" class="btn-view" data-abrir="' + x.id + '" aria-label="View case ' + x.id + '">View</button></li>';
    }).join('');
  }

  function ligarVisao() {
    ligarQuadro();
    var j = janela();
    $$('.dest [data-area]').forEach(function (b) { b.onclick = function () { irArea(b.dataset.area); }; });
    if ($('act-list')) $('act-list').onclick = function (e) { var b = e.target.closest('[data-abrir]'); if (b) abrirGaveta(b.dataset.abrir); };
    if ($('act-fonte')) $('act-fonte').onchange = function (e) { st.actFonte = e.target.value; var l = $('act-list'); l.innerHTML = listaAtividade(); l.classList.remove('swap'); void l.offsetWidth; l.classList.add('swap'); };
    $$('.tt tr[data-tema]').forEach(function (tr) {
      var go = function () { irCasos({ tema: tr.dataset.tema }); };
      tr.onclick = go; tr.onkeydown = function (e) { if (e.key === 'Enter') go(); };
    });
    $$('[data-sinal]').forEach(function (b) { b.onclick = function () { outrosSinais[+b.dataset.sinal].acao(); }; });
    if ($('btn-sinal')) $('btn-sinal').onclick = function () { st.area = sinalAtual.a; irCasos({ tema: sinalAtual.t.nome }); };
    $$('.voices [data-abrir]').forEach(function (b) { b.onclick = function () { abrirGaveta(b.dataset.abrir); }; });

    var meses = meses12();
    // Rating: linha com área, sem eixos, ponto no último mês
    var serie = meses.map(function (m) {
      var g = D.MENCOES.filter(function (x) { return x.m === m && x.fonte === 'google' && (!st.area || x.area === st.area); });
      return g.length ? +(soma(g, function (x) { return x.estrelas; }) / g.length).toFixed(2) : null;
    });
    var vals = serie.filter(function (v) { return v != null; });
    var ult = serie.length - 1; while (ult > 0 && serie[ult] == null) ult--;
    // An average rating is a level that moves over time: a line. The scale is labelled so small moves do not look dramatic.
    var yMin = vals.length ? Math.max(1, Math.floor((Math.min.apply(null, vals) - 0.3) * 2) / 2) : 1;
    var yMax = vals.length ? Math.min(5, Math.ceil((Math.max.apply(null, vals) + 0.3) * 2) / 2) : 5;
    snap.rating = serie;
    var iSel = meses.indexOf(j.desde);
    chart($('ch-rating'), {
      grid: { left: 24, right: 14, top: 12, bottom: 24 },
      tooltip: Object.assign({ trigger: 'axis', valueFormatter: function (v) { return v == null ? '–' : nf(v, 2) + ' out of 5'; } }, TOOLTIP),
      xAxis: Object.assign({ type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }) }, EIXO, { axisLabel: { color: '#6E6D6B', fontSize: 11, interval: 2, margin: 8 } }),
      yAxis: { type: 'value', min: yMin, max: yMax, interval: 0.5, axisLabel: { color: '#6E6D6B', fontSize: 10, inside: false, margin: 4, formatter: function (v) { return nf(v, 1); } }, splitLine: { lineStyle: { color: '#E4E1DC' } } },
      series: [{
        type: 'line', smooth: 0.2, smoothMonotone: 'x', data: serie, symbol: 'none', connectNulls: true,
        markArea: iSel >= 0 ? { silent: true, itemStyle: { color: 'rgba(0,85,85,.06)' }, data: [[{ xAxis: iSel }, { xAxis: meses.length - 1 }]] } : undefined,
        lineStyle: { width: 2.5, color: '#005555' },
        areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,85,85,.2)' }, { offset: 1, color: 'rgba(0,85,85,0)' }]) } : null,
        markPoint: { symbol: 'circle', symbolSize: 11, itemStyle: { color: '#005555', borderColor: '#FFFFFF', borderWidth: 2.5 }, label: { show: false }, data: [{ coord: [ult, serie[ult]] }] },
      }],
    });

    // Sinal: área × tema vs. média das áreas
    if (sinalAtual) {
      var c = sinalAtual;
      var sA = meses.map(function (m) { return D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area === c.a && x.tema === c.t.nome; }).length; });
      var sM = meses.map(function (m) { return +(D.MENCOES.filter(function (x) { return x.m === m && isNeg(x) && x.area && x.tema === c.t.nome; }).length / D.AREAS.length).toFixed(1); });
      snap.sA = sA; snap.sM = sM;
      var iSel2 = meses.indexOf(j.desde);
      chart($('ch-signal'), {
        grid: { left: 30, right: 22, top: 48, bottom: 22 },
        tooltip: Object.assign({ trigger: 'axis' }, TOOLTIP),
        xAxis: Object.assign({ type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }) }, EIXO),
        yAxis: { type: 'value', min: 0, minInterval: 1, splitNumber: 3, axisLabel: { color: '#6E6D6B', fontSize: 10 }, splitLine: { lineStyle: { color: '#EFEDEA' } } },
        series: [
          { name: 'Area average', type: 'line', smooth: 0.2, smoothMonotone: 'x', data: sM, symbol: 'none', lineStyle: { width: 1.5, type: [4, 3], color: '#9A9895' },
            markArea: iSel2 >= 0 ? { silent: true, itemStyle: { color: 'rgba(0,85,85,.06)' }, label: { show: true, position: 'insideTop', color: '#5E7F7F', fontSize: 10, formatter: 'Selected period' }, data: [[{ xAxis: iSel2 }, { xAxis: meses.length - 1 }]] } : undefined },
          { name: c.a, type: 'line', smooth: 0.2, smoothMonotone: 'x', data: sA, symbol: 'circle', symbolSize: 7, showSymbol: false, lineStyle: { width: 2.5, color: '#C2362E' }, itemStyle: { color: '#C2362E' },
            areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(194,54,46,.10)' }, { offset: 1, color: 'rgba(194,54,46,0)' }]) } : null,
            markPoint: { symbol: 'circle', symbolSize: 10, itemStyle: { color: '#C2362E', borderColor: '#FFFFFF', borderWidth: 2 }, label: { show: false }, data: [{ coord: [meses.length - 1, sA[sA.length - 1]] }] } },
        ],
      });
    }

    // Respostas por mês: respondidas vs. sem resposta (reclamações e comentários neutros)
    var pedem = D.MENCOES.filter(function (x) { return x.m >= 12 && x.sentimento !== 'positive' && (!st.area || x.area === st.area); });
    var resp = meses.map(function (m) { return pedem.filter(function (x) { return x.m === m && isResp(x); }).length; });
    var sem = meses.map(function (m) { return pedem.filter(function (x) { return x.m === m && !isResp(x); }).length; });
    snap.resp = resp; snap.sem = sem;
    chart($('ch-volume'), {
      grid: { left: 0, right: 0, top: 12, bottom: 0, containLabel: true },
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(30,30,30,.04)' } },
        formatter: function (ps) { var i = ps[0].dataIndex, t = resp[i] + sem[i]; return '<div style="opacity:.7;margin-bottom:4px">' + mesTxt(meses[i], true) + '</div>' + ps.map(function (p) { return p.marker + p.seriesName + ' <b style="margin-left:6px">' + p.value + '</b>'; }).join('<br>') + (t ? '<div style="margin-top:4px;opacity:.85">Reply rate <b>' + nf(resp[i] / t * 100) + '%</b></div>' : ''); } }, TOOLTIP),
      xAxis: Object.assign({ type: 'category', data: meses.map(function (m) { return mesTxt(m); }) }, EIXO),
      yAxis: { type: 'value', splitNumber: 4, axisLabel: { color: '#6E6D6B', fontSize: 11 }, splitLine: { show: false } },
      series: [
        { name: 'Replied', type: 'bar', stack: 't', barWidth: '52%', data: resp, itemStyle: { color: '#2E8B57', borderRadius: [0, 0, 4, 4], borderColor: '#FFFFFF', borderWidth: 1 } },
        { name: 'No reply', type: 'bar', stack: 't', data: sem, itemStyle: { color: '#E5807A', borderRadius: [4, 4, 0, 0], borderColor: '#FFFFFF', borderWidth: 1 } },
      ],
    });
  }

  // ======================================================================
  // ORGANIZAR A VISÃO GERAL (arrastar blocos, como no ecrã do iPhone)
  // ======================================================================
  var ORDEM_PADRAO = ['reclamacoes', 'fontes', 'rating', 'atividade', 'areas', 'respostas', 'temas', 'sinal', 'voz'];
  var LARGURA = { reclamacoes: 'w-kpi', fontes: 'w-kpi', rating: 'w-kpi', atividade: 'w-kpi', areas: 'w-areas', respostas: 'w-resp', temas: 'w-temas', sinal: 'w-full', voz: 'w-full' };
  var NOME_BLOCO = { reclamacoes: 'Complaints', fontes: 'Mentions by source', rating: 'Google rating', atividade: 'Latest activity', areas: 'Service areas', respostas: 'Replies by month', temas: 'Topics', sinal: 'What changed', voz: 'Latest comments' };
  var CHAVE_ORDEM = 'colibri.overview.order';
  function lerOrdem() {
    try {
      var o = JSON.parse(localStorage.getItem(CHAVE_ORDEM));
      if (Array.isArray(o) && o.length === ORDEM_PADRAO.length && ORDEM_PADRAO.every(function (k) { return o.indexOf(k) >= 0; })) return o;
    } catch (e) { /* sem acesso ao armazenamento: usa a ordem de origem */ }
    return ORDEM_PADRAO.slice();
  }
  function guardarOrdem(o) { try { localStorage.setItem(CHAVE_ORDEM, JSON.stringify(o)); } catch (e) { /* ignora */ } }
  function quadro(W) {
    return '<div class="board' + (st.editar ? ' editing' : '') + '" id="board">' + lerOrdem().map(function (k, i) {
      return '<div class="w ' + LARGURA[k] + '" data-wid="' + k + '" style="--i:' + i + '" aria-label="' + NOME_BLOCO[k] + '">' + W[k] + '</div>';
    }).join('') + '</div>';
  }
  function aplicarEdicao() {
    var b = $('board'); if (!b) return;
    b.classList.toggle('editing', !!st.editar);
    var bt = $('pf-organizar');
    bt.classList.toggle('btn-dark', !!st.editar); bt.classList.toggle('btn-outline', !st.editar);
    bt.setAttribute('aria-pressed', String(!!st.editar));
    bt.querySelector('span').textContent = st.editar ? 'Done' : 'Arrange';
    $('pf-repor').hidden = !st.editar;
    $('edit-hint').hidden = !st.editar;
  }
  function flip(b, mudar, fixo) {
    var els = $$('.w', b).filter(function (x) { return x !== fixo; });
    var antes = els.map(function (el) { return el.getBoundingClientRect(); });
    mudar();
    els.forEach(function (el, i) {
      el.style.transition = 'none'; el.style.transform = '';
      var n = el.getBoundingClientRect();
      var dx = antes[i].left - n.left, dy = antes[i].top - n.top;
      if (!dx && !dy) { el.style.transition = ''; return; }
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      void el.offsetWidth;
      el.style.transition = REDUZ ? 'none' : 'transform .34s cubic-bezier(.2, .8, .2, 1)';
      el.style.transform = '';
    });
  }
  var arrasto = null;
  function ligarQuadro() {
    var b = $('board'); if (!b) return;
    $('pf-organizar').onclick = function () { st.editar = !st.editar; aplicarEdicao(); };
    $('pf-repor').onclick = function () {
      var porId = {}; $$('.w', b).forEach(function (el) { porId[el.dataset.wid] = el; });
      flip(b, function () { ORDEM_PADRAO.forEach(function (k) { b.appendChild(porId[k]); }); }, null);
      guardarOrdem(ORDEM_PADRAO.slice());
      toast('Original order restored.');
      setTimeout(function () { charts.forEach(function (c) { c.resize(); }); }, 360);
    };
    b.addEventListener('pointerdown', function (e) {
      var w = e.target.closest('.w');
      if (!w || e.button > 0) return;
      if (!st.editar) {
        // Carregar sem soltar durante meio segundo entra no modo de organizar
        var sx = e.clientX, sy = e.clientY;
        var t = setTimeout(function () { st.editar = true; aplicarEdicao(); limpar(); }, 550);
        var mv = function (ev) { if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) > 8) limpar(); };
        var limpar = function () { clearTimeout(t); window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', limpar); window.removeEventListener('pointercancel', limpar); };
        window.addEventListener('pointermove', mv); window.addEventListener('pointerup', limpar); window.addEventListener('pointercancel', limpar);
        return;
      }
      e.preventDefault();
      var r = w.getBoundingClientRect();
      arrasto = { b: b, w: w, ox: e.clientX - r.left, oy: e.clientY - r.top, x: e.clientX, y: e.clientY, ultimo: null };
      w.style.transition = 'none';
      w.classList.add('dragging');
      posicionar();
      window.addEventListener('pointermove', mover);
      window.addEventListener('pointerup', largar);
      window.addEventListener('pointercancel', largar);
    });
  }
  function posicionar() {
    var a = arrasto, br = a.b.getBoundingClientRect();
    var tx = a.x - a.ox - br.left - a.w.offsetLeft, ty = a.y - a.oy - br.top - a.w.offsetTop;
    a.w.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
  }
  function mover(e) {
    var a = arrasto; if (!a) return;
    a.x = e.clientX; a.y = e.clientY;
    posicionar();
    var br = a.b.getBoundingClientRect(), alvo = null;
    $$('.w', a.b).forEach(function (el) {
      if (el === a.w) return;
      var l = br.left + el.offsetLeft, t = br.top + el.offsetTop;
      if (a.x >= l && a.x <= l + el.offsetWidth && a.y >= t && a.y <= t + el.offsetHeight) alvo = el;
    });
    if (!alvo) { a.ultimo = null; return; }
    if (alvo === a.ultimo) return;
    a.ultimo = alvo;
    var irmaos = $$('.w', a.b);
    var depois = irmaos.indexOf(a.w) < irmaos.indexOf(alvo);
    flip(a.b, function () { a.b.insertBefore(a.w, depois ? alvo.nextSibling : alvo); }, a.w);
    posicionar();
  }
  function largar() {
    var a = arrasto; if (!a) return;
    arrasto = null;
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerup', largar);
    window.removeEventListener('pointercancel', largar);
    a.w.style.transition = REDUZ ? 'none' : 'transform .3s cubic-bezier(.2, .8, .2, 1)';
    a.w.style.transform = '';
    setTimeout(function () { a.w.classList.remove('dragging'); a.w.style.transition = ''; charts.forEach(function (c) { c.resize(); }); }, REDUZ ? 0 : 310);
    guardarOrdem($$('.w', a.b).map(function (el) { return el.dataset.wid; }));
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
    return '<div class="page-head"><div><h1>Cases</h1><p class="meta">' + esc(areaTxt()) + ' · ' + periodoTxt(j) + ' · <b class="tnum">' + nf(base.length) + '</b> mentions, <b class="tnum">' + nf(abertos) + '</b> to handle</p></div>' + filtros({ area: true }) + '</div>' +
      '<div class="todo-strip" id="todo-strip" role="group" aria-label="To handle"></div>' +
      '<div class="toolbar">' +
      '<div class="input-wrap">' + ic('lupa') + '<label class="sr" for="c-q">Search</label><input class="input" id="c-q" type="search" placeholder="Search text, ID or area" value="' + esc(c.q) + '" autocomplete="off"></div>' +
      '<label class="sr" for="c-fonte">Source</label><select class="select" id="c-fonte">' + opt('', 'All sources', c.fonte) + D.FONTES.map(function (f) { return opt(f.id, f.curto, c.fonte); }).join('') + '</select>' +
      '<label class="sr" for="c-grav">Severity</label><select class="select" id="c-grav">' + opt('', 'Any severity', c.grav) + ['High', 'Medium', 'Low'].map(function (g) { return opt(g, g + ' severity', c.grav); }).join('') + '</select>' +
      '<label class="sr" for="c-tema">Topic</label><select class="select" id="c-tema">' + opt('', 'All topics', c.tema) + temasPresentes.map(function (t) { return opt(t.nome, t.nome, c.tema); }).join('') + '</select>' +
      '<span class="spacer"></span>' +
      '<span class="inline">Group by <select class="select" id="c-agrupar" data-label="Group by">' + [['estado', 'Status'], ['area', 'Service area'], ['fonte', 'Source'], ['tema', 'Topic']].map(function (o) { return opt(o[0], o[1], c.agrupar); }).join('') + '</select></span>' +
      '</div><section class="panel"><div class="tbl-wrap" id="casos-tabela"></div></section>';
  }

  // To handle: open cases by status. Clicking a number filters the table; clicking it again clears it.
  var FOCOS = [
    { id: 'New', k: 'New', s: 'Not looked at yet', f: function (x) { return estadoDe(x) === 'New'; } },
    { id: 'In review', k: 'In review', s: 'Someone is on it', f: function (x) { return estadoDe(x) === 'In review'; } },
    { id: 'high', k: 'High severity', s: 'Open and high severity', f: function (x) { return porTratar(x) && x.gravidade === 'High'; }, bad: true },
  ];
  function desenharFaixa() {
    var el = $('todo-strip'); if (!el) return;
    var j = janela(), base = filtrar(j.desde, j.ate);
    el.innerHTML = '<p class="todo-title">To handle</p>' + FOCOS.map(function (o) {
      var n = base.filter(o.f).length, on = st.casos.foco === o.id;
      return '<button type="button" class="todo-stat' + (on ? ' on' : '') + (o.bad && n ? ' bad' : '') + '" data-foco="' + o.id + '" aria-pressed="' + on + '"><span class="k">' + o.k + '</span><b class="tnum">' + nf(n) + '</b><span class="s">' + o.s + '</span></button>';
    }).join('') + (st.casos.foco ? '<button type="button" class="link todo-clear" data-foco="">Show all cases</button>' : '');
    $$('[data-foco]', el).forEach(function (b) {
      b.onclick = function () { var v = b.dataset.foco; st.casos.foco = st.casos.foco === v ? '' : v; desenharFaixa(); desenharTabela(); };
    });
  }

  function casosFiltrados() {
    var j = janela(), c = st.casos, q = norm(c.q.trim());
    var foco = FOCOS.filter(function (o) { return o.id === c.foco; })[0];
    return filtrar(j.desde, j.ate).filter(function (x) {
      return (!foco || foco.f(x)) && (!c.fonte || x.fonte === c.fonte) && (!c.grav || x.gravidade === c.grav) && (!c.tema || x.tema === c.tema) &&
        (!q || norm(x.texto + ' ' + x.id + ' ' + (x.area || '') + ' ' + x.tema + ' ' + x.responsavel).indexOf(q) >= 0);
    });
  }

  function grupos(lista) {
    var a = st.casos.agrupar;
    if (a === 'estado') return ESTADOS.map(function (e) { return { id: e.id, nome: e.id, cor: e.cor, itens: lista.filter(function (x) { return estadoDe(x) === e.id; }) }; });
    if (a === 'fonte') return D.FONTES.map(function (f) { return { id: f.id, nome: f.nome, cor: COR_FONTE[f.id], itens: lista.filter(function (x) { return x.fonte === f.id; }) }; });
    if (a === 'area') return D.AREAS.concat(['']).map(function (ar) { return { id: ar || 'sem', nome: ar || 'No area given', cor: '#005555', itens: lista.filter(function (x) { return (x.area || '') === ar; }) }; });
    return D.TEMAS.map(function (t) { return { id: t.nome, nome: t.nome, cor: '#005555', itens: lista.filter(function (x) { return x.tema === t.nome; }) }; })
      .sort(function (p, q) { return q.itens.length - p.itens.length; });
  }

  function desenharTabela() {
    var el = $('casos-tabela'); if (!el) return;
    var lista = casosFiltrados();
    if (!lista.length) { el.innerHTML = '<div class="empty"><h3>No cases match these filters</h3><p>Clear the search or the To handle filter, or pick another period at the top.</p></div>'; return; }
    var gs = grupos(lista).filter(function (g) { return g.itens.length; });
    var EST = {}; ESTADOS.forEach(function (e) { EST[e.id] = e; });
    var html = '<table class="tbl cases"><colgroup><col class="c-id"><col class="c-txt"><col class="c-src"><col class="c-area"><col class="c-tema"><col class="c-grav"><col class="c-est"><col class="c-resp"><col class="c-when"></colgroup>' +
      '<thead><tr><th>ID</th><th>Comment</th><th>Source</th><th>Area</th><th>Topic</th><th>Severity</th><th style="text-align:center">Status</th><th>Owner</th><th>Received</th></tr></thead><tbody>';
    gs.forEach(function (g) {
      var chave = st.casos.agrupar + ':' + g.id;
      var aberto = st.abertos[chave] != null ? st.abertos[chave] : !(st.casos.agrupar === 'estado' && g.id === 'Closed');
      var n = st.mostrar[chave] || 12;
      g.itens.sort(function (p, q) { return (porTratar(q) - porTratar(p)) || ORDEM_GRAV[p.gravidade] - ORDEM_GRAV[q.gravidade] || dataDe(q) - dataDe(p); });
      html += '<tr class="group-row"><td colspan="9" style="--g:' + g.cor + '"><button type="button" class="group-toggle" data-grupo="' + esc(chave) + '" aria-expanded="' + aberto + '">' + ic('baixo') + esc(g.nome) + '<span class="n tnum">' + g.itens.length + '</span></button></td></tr>';
      if (!aberto) return;
      g.itens.slice(0, n).forEach(function (x) {
        var e = EST[estadoDe(x)], f = fonte(x.fonte), t = tema(x.tema);
        var gcls = x.gravidade === 'High' ? 'alta' : x.gravidade === 'Medium' ? 'media' : '';
        html += '<tr class="row-link' + (st.drawer === x.id ? ' is-open' : '') + '" data-id="' + x.id + '" data-grupo-de="' + esc(chave) + '" tabindex="0" style="--g:' + g.cor + '">' +
          '<td class="id">' + x.id + '</td>' +
          '<td class="txt" title="' + esc(x.texto) + '">' + esc(x.texto) + '</td>' +
          '<td><span class="cell-src"><img class="src-logo" src="' + LOGO[x.canal] + '" alt="">' + esc(x.canal) + '</span></td>' +
          '<td class="ell">' + (x.area ? esc(x.area) : '<span style="color:var(--faint)">Not given</span>') + '</td>' +
          '<td class="ell" title="' + esc(x.tema) + '">' + esc(t ? t.curto : x.tema) + '</td>' +
          '<td><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></td>' +
          '<td class="state-cell"><span class="state st-' + e.cls + '">' + e.id + '</span></td>' +
          '<td><span class="who-cell">' + avatar(x.responsavel) + '<span>' + esc(x.responsavel) + '</span></span></td>' +
          '<td class="ell tnum" style="color:var(--muted)">' + quando(x) + '</td></tr>';
      });
      if (g.itens.length > n) html += '<tr class="more-row"><td colspan="9" style="--g:' + g.cor + '"><button type="button" data-mais="' + esc(chave) + '">Show ' + Math.min(12, g.itens.length - n) + ' more of ' + (g.itens.length - n) + '</button></td></tr>';
    });
    el.innerHTML = html + '</tbody></table>';

    $$('.group-toggle', el).forEach(function (b) {
      b.onclick = function () {
        var abrir = b.getAttribute('aria-expanded') !== 'true';
        st.abertos[b.dataset.grupo] = abrir; desenharTabela();
        if (abrir) $$('tr[data-grupo-de="' + b.dataset.grupo + '"]', el).forEach(function (tr, i) { tr.style.animationDelay = Math.min(i, 10) * 18 + 'ms'; tr.classList.add('row-in'); });
        var nb = $$('.group-toggle', el).filter(function (x) { return x.dataset.grupo === b.dataset.grupo; })[0]; if (nb) nb.focus();
      };
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
    desenharFaixa();
    desenharTabela();
  }

  // ======================================================================
  // GAVETA DO CASO
  // ======================================================================
  var MODELOS = {
    'Restrooms': 'We are sorry about the state of the restrooms. We have passed this on to the service area team so they step up cleaning and checks throughout the day.',
    'Customer service': 'We are sorry the service was not up to our standard. We have shared your comment with the service area manager.',
    'Food and drinks': 'Thank you for telling us. The quality of what we serve is a priority and we have reported this to the kitchen team.',
    'Price': 'We understand your point about prices. We will share it with the commercial team, who review our range and prices regularly.',
    'Checkout and payment': 'We are sorry for the trouble at the till. If you were overcharged, send us the receipt by private message so we can arrange a refund.',
    'Refunds and invoicing': 'We apologise for the delay. To move this forward, please send us the receipt number and date of purchase by private message.',
  };
  function modelo(x) {
    if (x.sentimento === 'positive') return 'Hello. Thank you very much for your kind words. We will share them with the team' + (x.area ? ' at ' + x.area : '') + '.\n\nThe Colibri team';
    return 'Hello. ' + (MODELOS[x.tema] || 'Thank you for sharing your experience. We have passed your comment on to the team in charge.') + '\n\nThe Colibri team';
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
    sair($('drawer'), 360); sair($('drawer-scrim'), 360);
    $$('#casos-tabela tr.is-open').forEach(function (tr) { tr.classList.remove('is-open'); });
    if (focoAntes && document.body.contains(focoAntes)) focoAntes.focus();
  }

  function desenharGaveta() {
    var x = D.MENCOES.filter(function (y) { return y.id === st.drawer; })[0];
    if (!x) { fecharGaveta(); return; }
    var f = fonte(x.fonte), e = estadoDe(x), resp = isResp(x);
    var gcls = x.gravidade === 'High' ? 'alta' : x.gravidade === 'Medium' ? 'media' : '';
    var passos = [
      { ok: true, ic: 'entrada', t: 'Received via ' + x.canal, s: dataLonga(x) },
      { ok: true, ic: 'etiqueta', t: 'Classified automatically', s: x.tema + ' · ' + x.gravidade.toLowerCase() + ' severity' },
      { ok: true, ic: 'pessoaSeta', t: 'Assigned to ' + x.responsavel, s: x.area ? x.area + ' area manager' : 'No area given, so it stays with the CX team' },
      resp ? { ok: true, ic: 'conversa', t: 'Replied', s: respondidoAgora[x.id] ? 'Just now, in this session' : nf(x.horas) + ' h after it arrived' }
        : { ok: false, ic: 'relogio', t: 'Reply not sent yet', s: 'Waiting for ' + diasAtras(x) + (diasAtras(x) === 1 ? ' day' : ' days') },
    ];
    if (e === 'Closed') passos.push({ ok: true, ic: 'certo', t: 'Closed', s: resp ? 'Case closed' : 'Closed without a reply' });

    var el = $('drawer');
    el.innerHTML = '<div class="dr-head"><img class="src-logo" src="' + LOGO[x.canal] + '" alt=""><span class="id">' + x.id + '</span><span class="sp"></span><button type="button" class="icon-btn" id="dr-fechar" aria-label="Close">' + ic('fechar') + '</button></div>' +
      '<div class="dr-body"><h2 id="drawer-title">' + esc(x.texto) + '</h2><p class="q-meta">' + estrelas(x.estrelas) + '<span>' + esc(f.nome) + (x.fonte === 'redes' ? ' · ' + x.canal : '') + '</span><span aria-hidden="true">·</span><span>' + quando(x) + '</span></p>' +
      '<dl class="kv">' +
      '<dt><label for="dr-estado">Status</label></dt><dd><select class="select" id="dr-estado">' + ESTADOS.map(function (s) { return '<option' + (s.id === e ? ' selected' : '') + '>' + s.id + '</option>'; }).join('') + '</select></dd>' +
      '<dt>Owner</dt><dd>' + avatar(x.responsavel) + esc(x.responsavel) + '</dd>' +
      '<dt>Service area</dt><dd>' + (x.area ? '<a class="link" href="#/areas/' + slug(x.area) + '">' + esc(x.area) + '</a>' : '<span style="color:var(--muted)">Not given</span>') + '</dd>' +
      '<dt>Topic</dt><dd>' + esc(x.tema) + '</dd>' +
      '<dt>Severity</dt><dd><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></dd>' +
      '<dt>Sentiment</dt><dd>' + x.sentimento.charAt(0).toUpperCase() + x.sentimento.slice(1) + '</dd>' +
      '</dl><h3>History</h3><ol class="steps">' + passos.map(function (p) {
        return '<li><span class="dot ' + (p.ok ? 'done' : 'todo') + '">' + ic(p.ic) + '</span><div><b>' + esc(p.t) + '</b><span>' + esc(p.s) + '</span></div></li>';
      }).join('') + '</ol>' +
      (resp ? '' : '<div class="reply"><h3>Reply</h3><label for="dr-texto">Template for ' + esc(x.sentimento === 'positive' ? 'praise' : x.tema.toLowerCase()) + '. Edit it before sending.</label><textarea id="dr-texto">' + esc(modelo(x)) + '</textarea></div>') +
      '</div>' +
      (resp ? '' : '<div class="dr-foot"><span class="hint">Send it in ' + destino(x) + '.</span><button type="button" class="btn btn-outline" id="dr-copiar">' + ic('copiar') + 'Copy</button><button type="button" class="btn btn-primary" id="dr-feito">' + ic('certo') + 'Mark as replied</button></div>');
    var trocou = el.dataset.caso && el.dataset.caso !== x.id && el.classList.contains('is-in');
    el.dataset.caso = x.id;
    melhorarSelects(el);
    entrar(el); entrar($('drawer-scrim'));
    if (trocou) { var bd = el.querySelector('.dr-body'); bd.classList.add('swap'); }

    $('dr-fechar').onclick = fecharGaveta;
    $('dr-estado').onchange = function (ev) { alterado[x.id] = ev.target.value; toast(x.id + ' moved to ' + ev.target.value + '.'); atualizarDepoisDeMudar(); };
    if ($('dr-copiar')) $('dr-copiar').onclick = function () {
      var ta = $('dr-texto');
      var falha = function () { ta.select(); toast('Could not copy. The text is selected, press Ctrl+C.', 'erro'); };
      try { navigator.clipboard.writeText(ta.value).then(function () { toast('Reply copied.'); }, falha); } catch (err) { falha(); }
    };
    if ($('dr-feito')) $('dr-feito').onclick = function () { respondidoAgora[x.id] = true; alterado[x.id] = 'Replied'; toast(x.id + ' marked as replied.'); atualizarDepoisDeMudar(); };
    $$('.kv a', el).forEach(function (a) { a.addEventListener('click', function () { fecharGaveta(); }); });
  }
  function atualizarDepoisDeMudar() {
    var r = rota();
    if (r.p === 'cases') { desenharFaixa(); desenharTabela(); var n = D.MENCOES.filter(porTratar).length; $('nav-count').textContent = n ? nf(n) : ''; desenharGaveta(); }
    else render();
  }
  $('drawer-scrim').onclick = fecharGaveta;
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (st.drawer) fecharGaveta(); else if (st.editar && $('board')) { st.editar = false; aplicarEdicao(); } else fecharMenu(); }
  });

  // ======================================================================
  // ÁREAS DE SERVIÇO
  // ======================================================================
  function linhasAreas() {
    var j = janela(), f = st.areasF, q = norm(f.q.trim());
    var linhas = D.AREAS.map(function (a) {
      var rows = filtrar(j.desde, j.ate, a), prev = filtrar(j.pDesde, j.pAte, a);
      var k = indicadores(rows), kp = indicadores(prev);
      var neg = rows.filter(isNeg);
      var top = D.TEMAS.map(function (t) { return [t, neg.filter(function (x) { return x.tema === t.nome; }).length]; }).sort(function (p, q) { return q[1] - p[1]; })[0];
      return { a: a, info: D.AREA_INFO[a], k: k, kp: kp, top: top };
    }).filter(function (l) {
      return (!q || norm(l.a + ' ' + l.info.gestor + ' ' + l.info.via).indexOf(q) >= 0) &&
        (!f.via || l.info.via === f.via) &&
        (!f.servico || l.info.servicos.indexOf(f.servico) >= 0) &&
        (!f.abertos || l.k.abertos > 0);
    });
    var ORD = {
      neg: function (p, r) { return r.k.neg - p.k.neg; },
      rating: function (p, r) { return (p.k.rating == null ? 9 : p.k.rating) - (r.k.rating == null ? 9 : r.k.rating); },
      abertos: function (p, r) { return r.k.abertos - p.k.abertos || r.k.neg - p.k.neg; },
      nome: function (p, r) { return p.a.localeCompare(r.a, 'pt'); },
    };
    return linhas.sort(ORD[f.ordem] || ORD.neg);
  }
  function pgAreas() {
    var j = janela(), f = st.areasF;
    function opt(v, l, sel) { return '<option value="' + esc(v) + '"' + (v === sel ? ' selected' : '') + '>' + esc(l) + '</option>'; }
    var vias = D.AREAS.map(function (a) { return D.AREA_INFO[a].via; }).filter(function (v, i, arr) { return arr.indexOf(v) === i; }).sort();
    var servs = [].concat.apply([], D.AREAS.map(function (a) { return D.AREA_INFO[a].servicos; })).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
    return '<div class="page-head"><div><h1>Service areas</h1><p class="meta" id="areas-meta">' + D.AREAS.length + ' areas · ' + periodoTxt(j) + '</p></div>' + filtros() + '</div>' +
      '<div class="toolbar areas-toolbar">' +
      '<div class="input-wrap">' + ic('lupa') + '<label class="sr" for="a-q">Search areas</label><input class="input" id="a-q" type="search" placeholder="Search area or manager" value="' + esc(f.q) + '" autocomplete="off"></div>' +
      '<label class="sr" for="a-via">Motorway</label><select class="select" id="a-via">' + opt('', 'All motorways', f.via) + vias.map(function (v) { return opt(v, v, f.via); }).join('') + '</select>' +
      '<label class="sr" for="a-servico">Service</label><select class="select" id="a-servico">' + opt('', 'Any service', f.servico) + servs.map(function (v) { return opt(v, v, f.servico); }).join('') + '</select>' +
      '<label class="sr" for="a-abertos">Cases to handle</label><select class="select" id="a-abertos">' + opt('', 'With or without cases to handle', f.abertos) + opt('1', 'Only with cases to handle', f.abertos) + '</select>' +
      '<span class="spacer"></span>' +
      '<span class="inline">Sort by <select class="select" id="a-ordem" data-label="Sort by">' + [['neg', 'Most complaints'], ['rating', 'Lowest Google rating'], ['abertos', 'Most to handle'], ['nome', 'Name']].map(function (o) { return opt(o[0], o[1], f.ordem); }).join('') + '</select></span>' +
      '</div><div id="areas-corpo"></div>';
  }
  function desenharAreas() {
    var el = $('areas-corpo'); if (!el) return;
    var j = janela(), linhas = linhasAreas();
    $('areas-meta').textContent = (linhas.length === D.AREAS.length ? D.AREAS.length + ' areas' : linhas.length + ' of ' + D.AREAS.length + ' areas') + ' · ' + periodoTxt(j);
    if (!linhas.length) { el.innerHTML = '<section class="panel"><div class="empty"><h3>No service area matches</h3><p>Clear the search or change the filters.</p></div></section>'; return; }
    var h = '<section class="panel"><div class="tbl-wrap"><table class="tbl" style="min-width:920px"><thead><tr><th>Area</th><th>Manager</th><th class="num">Mentions</th><th class="num">Complaints</th><th class="num">Google rating</th><th class="num">Replied</th><th class="num">To handle</th><th>Main topic</th></tr></thead><tbody>' +
      linhas.map(function (l) {
        var d = delta(l.k.neg, l.kp.neg, false, 'abs');
        return '<tr class="row-link" data-area="' + esc(l.a) + '" tabindex="0"><td><span class="strong">' + esc(l.a) + '</span><span class="sub">' + l.info.via + ' · ' + l.info.km + '</span></td>' +
          '<td><span class="who-cell">' + avatar(l.info.gestor) + '<span>' + esc(l.info.gestor) + '</span></span></td>' +
          '<td class="num">' + nf(l.k.total) + '</td>' +
          '<td class="num"><span class="strong">' + nf(l.k.neg) + '</span> <span class="delta ' + d.cls + '">' + (d.cls === 'flat' ? '' : d.txt) + '</span></td>' +
          '<td class="num">' + (l.k.rating == null ? '–' : nf(l.k.rating, 1)) + '</td>' +
          '<td class="num">' + (l.k.taxa == null ? '–' : nf(l.k.taxa) + '%') + '</td>' +
          '<td class="num">' + (l.k.abertos ? '<span class="badge warn tnum">' + l.k.abertos + '</span>' : '<span style="color:var(--faint)">0</span>') + '</td>' +
          '<td>' + (l.top && l.top[1] ? esc(l.top[0].nome) + ' <span style="color:var(--muted)">(' + l.top[1] + ')</span>' : '–') + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';

    // Topics by area: a grid of counts, so a heatmap (one hue, darker = more)
    var areas = linhas.map(function (l) { return l.a; });
    var neg = filtrar(j.desde, j.ate, '').filter(function (x) { return isNeg(x) && areas.indexOf(x.area) >= 0; });
    var top = D.TEMAS.map(function (t) { return { t: t, n: neg.filter(function (x) { return x.tema === t.nome; }).length }; }).filter(function (x) { return x.n; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 7);
    var vals = areas.map(function (a) { return top.map(function (x) { return neg.filter(function (y) { return y.area === a && y.tema === x.t.nome; }).length; }); });
    var vmax = Math.max.apply(null, [1].concat([].concat.apply([], vals)));
    h += '<div class="sec-head"><h2>Topics by area</h2><span class="heat-key">fewer<i></i>more</span></div><section class="panel panel-body"><div class="tbl-wrap"><table class="heat"><colgroup><col class="first">' + top.map(function () { return '<col>'; }).join('') + '</colgroup><thead><tr><th></th>' +
      top.map(function (x) { return '<th title="' + esc(x.t.nome) + '">' + esc(x.t.curto) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      areas.map(function (a, i) {
        return '<tr><td class="a">' + esc(a) + '</td>' + vals[i].map(function (v, k) {
          var p = v / vmax;
          return '<td class="c" title="' + esc(a + ' · ' + top[k].t.nome + ': ' + v) + '" style="background:' + (v ? 'rgba(0,85,85,' + (0.07 + p * 0.85).toFixed(2) + ')' : '#FAFAF8') + ';color:' + (p > 0.5 ? '#FFFFFF' : '#003C3C') + '">' + (v || '') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></section>';
    el.innerHTML = h;
    $$('tr[data-area]', el).forEach(function (tr) {
      tr.onclick = function () { irArea(tr.dataset.area); };
      tr.onkeydown = function (e) { if (e.key === 'Enter') irArea(tr.dataset.area); };
    });
  }
  function ligarAreas() {
    var t;
    $('a-q').oninput = function (e) { clearTimeout(t); t = setTimeout(function () { st.areasF.q = e.target.value; desenharAreas(); }, 120); };
    $('a-via').onchange = function (e) { st.areasF.via = e.target.value; desenharAreas(); };
    $('a-servico').onchange = function (e) { st.areasF.servico = e.target.value; desenharAreas(); };
    $('a-abertos').onchange = function (e) { st.areasF.abertos = e.target.value; desenharAreas(); };
    $('a-ordem').onchange = function (e) { st.areasF.ordem = e.target.value; desenharAreas(); };
    desenharAreas();
  }

  function pgArea(nome) {
    var info = D.AREA_INFO[nome];
    if (!info) return '<div class="empty"><h3>Area not found</h3><p><a class="link" href="#/areas">Back to service areas</a></p></div>';
    var j = janela();
    var rows = filtrar(j.desde, j.ate, nome), prev = filtrar(j.pDesde, j.pAte, nome);
    var k = indicadores(rows), kp = indicadores(prev);
    var neg = rows.filter(isNeg);
    var palavras = nome.split(' ').filter(function (w) { return w.length > 2; });
    var marca = (palavras.length > 1 ? palavras[0][0] + palavras[palavras.length - 1][0] : nome.slice(0, 2)).toUpperCase();

    var pend = rows.filter(porTratar).sort(function (a, b) { return ORDEM_GRAV[a.gravidade] - ORDEM_GRAV[b.gravidade] || dataDe(b) - dataDe(a); });

    var h = '<div class="area-top"><a class="link back" href="#/areas">' + ic('voltar') + 'Service areas</a>' + filtros() + '</div><div class="profile"><aside class="profile-side">' +
      '<div class="area-mark" aria-hidden="true">' + esc(marca) + '</div><h1>' + esc(nome) + '</h1><p class="role">Service area · ' + info.via + ' ' + info.km + '</p>' +
      '<div class="actions"><button type="button" class="btn btn-primary btn-block" id="a-casos">View area cases</button><a class="btn btn-outline btn-block" href="#/areas">Compare with other areas</a></div>' +
      '<dl class="facts">' +
      '<div><dt>Motorway</dt><dd>' + info.via + ', ' + info.km + '</dd></div>' +
      '<div><dt>Direction</dt><dd>' + info.sentido + '</dd></div>' +
      '<div><dt>Manager</dt><dd>' + avatar(info.gestor) + esc(info.gestor) + '</dd></div>' +
      '<div><dt>Services</dt><dd>' + info.servicos.map(function (s) { return '<span class="badge">' + esc(s) + '</span>'; }).join('') + '</dd></div>' +
      '<div><dt>Google rating in the period</dt><dd>' + (k.rating == null ? '–' : '<b class="tnum">' + nf(k.rating, 1) + '</b> ' + estrelas(Math.round(k.rating)) + ' <span style="color:var(--muted);font-size:12px">' + k.nReviews + ' reviews</span>') + '</dd></div>' +
      '</dl></aside><div class="profile-main">';

    // Por tratar
    h += '<section class="pending" aria-labelledby="t-pend"><div class="pending-head"><h2 id="t-pend">To handle</h2><span class="tnum">' + (pend.length ? pend.length + (pend.length === 1 ? ' open case' : ' open cases') : 'Nothing pending') + '</span></div>' +
      (pend.length ? pend.slice(0, 3).map(function (x) {
        var gcls = x.gravidade === 'High' ? 'alta' : x.gravidade === 'Medium' ? 'media' : '';
        return '<div class="pending-item"><div class="t"><b>' + esc(x.texto) + '</b><span class="m"><img class="src-logo" src="' + LOGO[x.canal] + '" alt="' + esc(x.canal) + '">' + esc(x.tema) + '<span aria-hidden="true">·</span>' + quando(x) + '<span aria-hidden="true">·</span><span class="grav ' + gcls + '"><i></i>' + x.gravidade + '</span></span></div><button type="button" class="btn btn-outline" data-abrir="' + x.id + '">Open</button></div>';
      }).join('') + (pend.length > 3 ? '<div style="padding:10px 12px 4px"><button type="button" class="link" id="a-pend">View all ' + pend.length + ' open cases' + ic('seta') + '</button></div>' : '')
        : '<div class="pending-item"><div class="t"><b style="font-weight:500">Every case in this area is replied or closed.</b></div></div>') + '</section>';

    // Números
    function stat(kx, v, unid, d) { return '<div class="stat"><p class="k">' + kx + '</p><p class="v tnum">' + v + (unid ? '<small>' + unid + '</small>' : '') + '</p><span class="delta ' + d.cls + ' tnum">' + (d.cls === 'flat' && d.txt === 'no change' ? 'Same as before' : d.txt) + '</span></div>'; }
    h += '<section class="panel"><div class="panel-head"><h2>Summary</h2><p>' + periodoTxt(j) + ', compared with the previous period</p></div><div class="stat-row">' +
      stat('Mentions', nf(k.total), '', delta(k.total, kp.total, null, 'rel')) +
      stat('Complaints', nf(k.neg), '', delta(k.neg, kp.neg, false, 'rel')) +
      stat('Google rating', k.rating == null ? '–' : nf(k.rating, 1), k.rating == null ? '' : 'out of 5', delta(k.rating, kp.rating, true, 'dec')) +
      stat('Replied', k.taxa == null ? '–' : nf(k.taxa), k.taxa == null ? '' : '%', delta(k.taxa, kp.taxa, true, 'pp')) +
      stat('First reply', k.tempo == null ? '–' : nf(k.tempo), k.tempo == null ? '' : 'h', delta(k.tempo, kp.tempo, false, 'h')) +
      '</div></section>';

    // Temas vs. média
    var todasNeg = filtrar(j.desde, j.ate, '').filter(function (x) { return isNeg(x) && x.area; });
    var temas = D.TEMAS.map(function (t) {
      return { t: t, n: neg.filter(function (x) { return x.tema === t.nome; }).length, avg: todasNeg.filter(function (x) { return x.tema === t.nome; }).length / D.AREAS.length };
    }).filter(function (x) { return x.n || x.avg >= 1; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
    var mx = Math.max.apply(null, [1].concat(temas.map(function (x) { return Math.max(x.n, x.avg); })));
    h += '<section class="panel"><div class="panel-head"><h2>Complaints by topic</h2><p>' + periodoTxt(j) + '</p></div><div class="panel-body"><div class="bars">' +
      (temas.length ? temas.map(function (x, i) {
        return '<button type="button" class="bar-row' + (i === 0 && x.n ? ' top' : '') + '" data-tema="' + esc(x.t.nome) + '" aria-label="' + esc(x.t.nome) + ': ' + x.n + ' complaints, area average ' + nf(x.avg, 1) + '"><span class="lbl">' + esc(x.t.nome) + '</span><span class="track"><span class="fill" style="width:0" data-w="' + (x.n / mx * 100).toFixed(1) + '%"></span><span class="avg" style="left:' + (x.avg / mx * 100).toFixed(1) + '%"></span></span><span class="n tnum">' + x.n + '</span></button>';
      }).join('') : '<p class="empty-line">No complaints in this period.</p>') +
      '</div><p class="bar-key"><span><i></i>Average of the ' + D.AREAS.length + ' areas</span></p></div></section>';

    // Evolução
    h += '<section class="panel"><div class="panel-head"><h2>Complaints by month</h2><p>Last 12 months, compared with the area average</p></div><div class="panel-body" style="padding-top:8px"><div id="ch-area" role="img" aria-label="Complaints by month at ' + esc(nome) + ' and the area average"></div></div></section>';

    // Recentes
    var rec = rows.slice().sort(function (a, b) { return dataDe(b) - dataDe(a); }).slice(0, 5);
    h += '<section class="panel"><div class="panel-head"><h2>Recent comments</h2><p>All sources</p></div>' + (rec.length ? '<ul class="feed-list">' + rec.map(function (x) {
      return '<li><button type="button" data-abrir="' + x.id + '"><img src="' + LOGO[x.canal] + '" alt="' + esc(x.canal) + '"><span class="t"><p>' + esc(x.texto) + '</p><span>' + esc(x.tema) + ' · ' + quando(x) + (x.estrelas ? ' · ' : '') + estrelas(x.estrelas) + '</span></span></button></li>';
    }).join('') + '</ul>' : '<p class="panel-body empty-line">No comments in this period.</p>') + '</section>';

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
        { name: 'Area average', type: 'line', smooth: 0.35, smoothMonotone: 'x', data: sM, symbol: 'none', lineStyle: { width: 1.5, type: [4, 3], color: '#9A9895' } },
        { name: nome, type: 'line', smooth: 0.35, smoothMonotone: 'x', data: sA, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2.5, color: '#005555' }, itemStyle: { color: '#FFFFFF', borderColor: '#005555', borderWidth: 2 },
          areaStyle: window.echarts ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,85,85,.14)' }, { offset: 1, color: 'rgba(0,85,85,0)' }]) } : null },
      ],
    });
  }

  // ======================================================================
  // FONTES
  // ======================================================================
  var COMO = {
    google: 'Google Business Profile reviews export (.xlsx)',
    jira: 'Complaints project filter exported as CSV',
    redes: 'Meta Business Suite inbox export (.xlsx)',
  };
  function pgFontes() {
    var h = '<div class="page-head"><div><h1>Sources</h1><p class="meta">Where the data comes from, how it arrives and how it is classified</p></div></div>' +
      '<section class="panel"><div class="tbl-wrap"><table class="tbl" style="min-width:860px"><thead><tr><th>Source</th><th class="num">Records</th><th>Period covered</th><th>Last upload</th><th>Automatic connection</th></tr></thead><tbody>' +
      D.FONTES.map(function (f) {
        var r = D.MENCOES.filter(function (x) { return x.fonte === f.id; });
        return '<tr><td><span class="src-name"><span class="lg">' + logoFonte(f) + '</span><span><span class="strong">' + esc(f.nome) + '</span><span class="sub">' + COMO[f.id] + '</span></span></span></td>' +
          '<td class="num strong">' + nf(r.length) + '</td><td>Dec 2024 – Nov 2026</td><td>23 Nov 2026</td>' +
          '<td><span class="badge dashed">Phase 2</span></td></tr>';
      }).join('') + '</tbody></table></div></section>';

    h += '<div class="two-col" style="margin-top:20px"><section class="panel"><div class="panel-head"><h2>Upload files</h2><p>Exports from the three sources</p></div><div class="panel-body">' +
      '<label class="drop" id="drop" for="ficheiros">' + ic('nuvem') + '<b>Drag files here</b><p>Or click to choose. Accepts .xlsx and .csv. Files are read on this computer and nothing is sent anywhere.</p><input id="ficheiros" type="file" multiple accept=".xlsx,.xls,.csv" class="sr"></label>' +
      '<ul class="file-list" id="file-list"></ul></div></section>' +
      '<section class="panel"><div class="panel-head"><h2>How we classify</h2><p>Fixed rules, the same for every source</p></div><div class="panel-body"><dl class="rules">' +
      '<dt>Topic</dt><dd>The 12 drivers of the VoC survey, plus Price and Refunds and invoicing. Anything that does not fit goes to Other.</dd>' +
      '<dt>Sentiment</dt><dd>On Google it comes from the stars (1–2 negative, 3 neutral, 4–5 positive). On Jira it is always negative. On social media it comes from keywords.</dd>' +
      '<dt><span class="grav alta"><i></i></span>High severity</dt><dd>A 1-star review, or a legal, safety or reputational risk (for example a consumer association, a lawyer, fraud, an accident).</dd>' +
      '<dt><span class="grav media"><i></i></span>Medium severity</dt><dd>A specific complaint about the service.</dd>' +
      '<dt><span class="grav"><i></i></span>Low severity</dt><dd>A comment, a suggestion or a neutral mention.</dd>' +
      '</dl></div></section></div>';
    return h;
  }
  function ligarFontes() {
    var drop = $('drop'), inp = $('ficheiros');
    function listar(files) {
      var todos = Array.prototype.slice.call(files || []);
      var arr = todos.filter(function (f) { return /\.(xlsx|xls|csv)$/i.test(f.name); });
      var fora = todos.length - arr.length;
      $('file-list').innerHTML = arr.map(function (f) {
        return '<li><b>' + esc(f.name) + '</b><span class="tnum">' + nf(f.size / 1024, 0) + ' KB</span></li>';
      }).join('') + (arr.length ? '<li><span>In this version files are listed but not imported yet. The readers are ready in app/js/importadores and get connected next.</span></li>' : '');
      if (fora) toast(fora === 1 ? 'One file was skipped. Only .xlsx and .csv are accepted.' : fora + ' files were skipped. Only .xlsx and .csv are accepted.', 'erro');
      else if (arr.length) toast(arr.length === 1 ? '1 file added.' : arr.length + ' files added.');
    }
    inp.onchange = function () { listar(inp.files); };
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function (e) { listar(e.dataTransfer.files); });
  }

  // ======================================================================
  // EXPORT: the Overview as an editable PowerPoint (native charts, tables and text boxes)
  // Uses PptxGenJS (MIT), loaded only when someone exports.
  // ======================================================================
  var snap = null;
  function carregarScript(src) {
    return new Promise(function (res, rej) {
      if (window.PptxGenJS) return res();
      var sc = document.createElement('script'); sc.src = src; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc);
    });
  }
  function exportarPptx() {
    if (!snap) return;
    aCarregar('Preparing the PowerPoint');
    carregarScript('js/vendor/pptxgen.bundle.js')
      .then(construirPptx)
      .then(function () { pronto(); toast('PowerPoint downloaded.'); },
        function (e) { pronto(); toast('Could not create the PowerPoint. Try again.', 'erro'); if (window.console) console.error(e); });
  }
  function logoDataUrl() {
    try {
      var img = document.querySelector('.brand img'), c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext('2d').drawImage(img, 0, 0);
      return { data: c.toDataURL('image/png'), r: img.naturalHeight / img.naturalWidth };
    } catch (e) { return null; } // opened from disk: the browser blocks reading the image
  }
  function construirPptx() {
    var S = snap, j = S.j;
    var C = { ink: '1E1E1E', ink2: '484747', muted: '6E6D6B', line: 'E9E7E3', surf: 'F6F4F2', teal: '005555', teal50: 'E8F3F3', pink: 'B62454', good: '1B7A4B', bad: 'B3261E', red: 'C2362E', grey: '9A9895' };
    var F = 'Noto Sans';
    var pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
    pptx.author = 'Colibri · Customer feedback';
    pptx.title = 'Customer feedback · Overview';
    var sub = areaTxt() + ' · ' + periodoTxt(j);
    var logo = logoDataUrl();
    var mesesTxt = S.meses.map(function (m) { return mesTxt(m); });
    var EIXOS = { fontFace: F, catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, catAxisLabelFontSize: 10, valAxisLabelFontSize: 10, catAxisLineShow: false, valAxisLineShow: false,
      valGridLine: { color: 'E4E1DC', size: 0.5 }, catGridLine: { style: 'none' }, legendFontSize: 10, legendColor: C.ink2, legendFontFace: F };
    function deltaCor(d) { return d.cls === 'good' ? C.good : d.cls === 'bad' ? C.bad : C.muted; }
    function deltaTxt(d) { return d.txt === 'no comparison' ? 'No comparison' : d.txt === 'no change' ? 'No change' : d.txt.replace('↑ ', '+').replace('↓ ', '−'); }
    function cabecalho(sl, t, n) {
      sl.background = { color: 'FFFFFF' };
      sl.addText(t, { x: 0.6, y: 0.35, w: 9.5, h: 0.6, fontFace: F, fontSize: 24, bold: true, color: C.ink, margin: 0 });
      sl.addText(sub, { x: 0.6, y: 0.92, w: 9.5, h: 0.35, fontFace: F, fontSize: 12, color: C.muted, margin: 0 });
      if (logo) sl.addImage({ data: logo.data, x: 11.45, y: 0.4, w: 1.3, h: 1.3 * logo.r });
      sl.addText(String(n), { x: 12.2, y: 7.0, w: 0.6, h: 0.3, fontFace: F, fontSize: 9, color: C.muted, align: 'right', margin: 0 });
    }
    function kpi(sl, x, titulo, valor, d, antes) {
      sl.addShape(pptx.ShapeType.roundRect, { x: x, y: 1.55, w: 3.9, h: 1.55, fill: { color: C.surf }, line: { color: C.surf }, rectRadius: 0.18 });
      sl.addText(titulo, { x: x + 0.25, y: 1.7, w: 3.4, h: 0.3, fontFace: F, fontSize: 12, color: C.ink2, margin: 0 });
      sl.addText([{ text: valor, options: { fontSize: 30, bold: true, color: C.ink } }, { text: '   ' + deltaTxt(d), options: { fontSize: 13, bold: true, color: deltaCor(d) } }],
        { x: x + 0.25, y: 2.05, w: 3.4, h: 0.6, fontFace: F, margin: 0, valign: 'middle' });
      sl.addText(antes, { x: x + 0.25, y: 2.68, w: 3.4, h: 0.3, fontFace: F, fontSize: 11, color: C.muted, margin: 0 });
    }
    var n = 1;

    // 1. Cover
    var sl = pptx.addSlide(); sl.background = { color: 'FFFFFF' };
    if (logo) sl.addImage({ data: logo.data, x: 0.8, y: 0.8, w: 2.4, h: 2.4 * logo.r });
    sl.addText('Customer feedback', { x: 0.8, y: 2.6, w: 11, h: 0.9, fontFace: F, fontSize: 40, bold: true, color: C.ink, margin: 0 });
    sl.addText('Overview · ' + sub, { x: 0.8, y: 3.5, w: 11, h: 0.5, fontFace: F, fontSize: 18, color: C.ink2, margin: 0 });
    sl.addText('Google Reviews, Jira complaints, Facebook and Instagram · exported ' + dataLonga({ m: 23, dia: HOJE.getDate() }), { x: 0.8, y: 6.6, w: 11, h: 0.35, fontFace: F, fontSize: 11, color: C.muted, margin: 0 });
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 7.38, w: 13.33, h: 0.12, fill: { color: C.teal }, line: { color: C.teal } });

    // 2. Headline numbers and trends
    sl = pptx.addSlide(); cabecalho(sl, 'Headline numbers', ++n);
    var k = S.k, kp = S.kp;
    kpi(sl, 0.6, 'Complaints', nf(k.neg), delta(k.neg, kp.neg, false, 'rel'), nf(kp.neg) + ' ' + S.antTxt);
    kpi(sl, 4.72, 'Mentions', nf(k.total), delta(k.total, kp.total, null, 'rel'), nf(kp.total) + ' ' + S.antTxt);
    kpi(sl, 8.84, 'Google rating', k.rating == null ? '–' : nf(k.rating, 1), delta(k.rating, kp.rating, true, 'dec'), nf(k.nReviews) + ' reviews' + (kp.rating == null ? '' : ' · ' + nf(kp.rating, 1) + ' ' + S.antTxt));
    sl.addText('Complaints per month', { x: 0.6, y: 3.4, w: 6, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    sl.addChart(pptx.ChartType.bar, [{ name: 'Complaints', labels: mesesTxt, values: S.porMes }], Object.assign({}, EIXOS,
      { x: 0.6, y: 3.75, w: 6, h: 3.1, barDir: 'col', barGapWidthPct: 45, chartColors: [C.teal], showLegend: false, showValue: false }));
    sl.addText('Average Google rating per month', { x: 6.9, y: 3.4, w: 5.8, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    var rat = (S.rating || []).map(function (v) { return v == null ? 0 : v; });
    sl.addChart(pptx.ChartType.line, [{ name: 'Google rating', labels: mesesTxt, values: rat }], Object.assign({}, EIXOS,
      { x: 6.9, y: 3.75, w: 5.8, h: 3.1, chartColors: [C.teal], lineSize: 2, lineDataSymbol: 'none', showLegend: false, valAxisMinVal: 1, valAxisMaxVal: 5, valAxisMajorUnit: 1, valAxisLabelFormatCode: '0.0' }));

    // 3. Where mentions come from, and which areas
    sl = pptx.addSlide(); cabecalho(sl, 'Where mentions come from', ++n);
    sl.addText('Mentions by source', { x: 0.6, y: 1.55, w: 5.8, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    sl.addChart(pptx.ChartType.bar, S.porFonte.map(function (x) { return { name: x.f.curto, labels: ['Mentions'], values: [x.n] }; }), Object.assign({}, EIXOS,
      { x: 0.6, y: 1.9, w: 5.8, h: 2.2, barDir: 'bar', barGrouping: 'percentStacked', chartColors: S.porFonte.map(function (x) { return COR_FONTE[x.f.id].slice(1); }),
        showLegend: true, legendPos: 'b', showValue: true, dataLabelColor: 'FFFFFF', dataLabelFontSize: 11, dataLabelFontBold: true, catAxisHidden: true, valAxisHidden: true, valGridLine: { style: 'none' } }));
    sl.addTable([[{ text: 'Source', options: { bold: true, color: C.muted } }, { text: 'Mentions', options: { bold: true, color: C.muted, align: 'right' } }, { text: 'Share', options: { bold: true, color: C.muted, align: 'right' } }]].concat(
      S.porFonte.map(function (x) { return [x.f.nome, { text: nf(x.n), options: { align: 'right' } }, { text: nf(x.n / Math.max(1, k.total) * 100) + '%', options: { align: 'right' } }]; })),
      { x: 0.6, y: 4.4, w: 5.8, colW: [3.2, 1.3, 1.3], fontFace: F, fontSize: 11, color: C.ink, border: { type: 'solid', pt: 0.5, color: C.line }, rowH: 0.36 });
    sl.addText('Complaints by service area', { x: 6.9, y: 1.55, w: 5.8, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
    var pa = S.porArea.slice().reverse();
    sl.addChart(pptx.ChartType.bar, [{ name: 'Complaints', labels: pa.map(function (x) { return x.a; }), values: pa.map(function (x) { return x.n; }) }], Object.assign({}, EIXOS,
      { x: 6.9, y: 1.9, w: 5.8, h: 5.0, barDir: 'bar', barGapWidthPct: 55, chartColors: [C.teal], showLegend: false, showValue: true, dataLabelColor: C.ink2, dataLabelFontSize: 10, dataLabelPosition: 'outEnd', valAxisHidden: true, valGridLine: { style: 'none' } }));

    // 4. Replies
    sl = pptx.addSlide(); cabecalho(sl, 'Replies by month', ++n);
    var tR = soma(S.resp, function (v) { return v; }), tS = soma(S.sem, function (v) { return v; });
    sl.addText('Complaints and neutral comments, last 12 months. ' + nf(tR / Math.max(1, tR + tS) * 100) + '% replied.', { x: 0.6, y: 1.5, w: 12, h: 0.35, fontFace: F, fontSize: 13, color: C.ink2, margin: 0 });
    sl.addChart(pptx.ChartType.bar, [{ name: 'Replied', labels: mesesTxt, values: S.resp }, { name: 'No reply', labels: mesesTxt, values: S.sem }], Object.assign({}, EIXOS,
      { x: 0.6, y: 2.0, w: 12.1, h: 4.9, barDir: 'col', barGrouping: 'stacked', barGapWidthPct: 50, chartColors: ['2E8B57', 'E5807A'], showLegend: true, legendPos: 't' }));

    // 5. Topics
    sl = pptx.addSlide(); cabecalho(sl, 'Complaints by topic', ++n);
    var hd = function (t, al) { return { text: t, options: { bold: true, color: C.muted, align: al || 'left', fill: { color: C.surf } } }; };
    sl.addTable([[hd('Topic'), hd('Complaints', 'right'), hd('vs previous period', 'right'), hd('VoC NPS', 'right')]].concat(S.temas.map(function (x) {
      return [x.t.nome, { text: String(x.n), options: { align: 'right', bold: true } },
        { text: x.d === 0 ? 'No change' : (x.d > 0 ? '+' : '−') + Math.abs(x.d), options: { align: 'right', color: x.d > 0 ? C.bad : x.d < 0 ? C.good : C.muted } },
        { text: x.t.nps == null ? '–' : String(x.t.nps), options: { align: 'right' } }];
    })), { x: 0.6, y: 1.6, w: 12.1, colW: [6.1, 2, 2.2, 1.8], fontFace: F, fontSize: 13, color: C.ink, border: { type: 'solid', pt: 0.5, color: C.line }, rowH: 0.5, valign: 'middle' });

    // 6. What changed
    sl = pptx.addSlide(); cabecalho(sl, 'What changed', ++n);
    if (S.sinal) {
      sl.addText(S.sinal.t.curto + ' at ' + S.sinal.a, { x: 0.6, y: 1.5, w: 8, h: 0.45, fontFace: F, fontSize: 18, bold: true, color: C.ink, margin: 0 });
      sl.addText(S.frase, { x: 0.6, y: 1.95, w: 8, h: 0.7, fontFace: F, fontSize: 12, color: C.ink2, margin: 0, valign: 'top' });
      sl.addChart(pptx.ChartType.line, [{ name: S.sinal.a, labels: mesesTxt, values: S.sA || [] }, { name: 'Area average', labels: mesesTxt, values: S.sM || [] }], Object.assign({}, EIXOS,
        { x: 0.6, y: 2.75, w: 8, h: 4.15, chartColors: [C.red, C.grey], lineSize: 2, lineDataSymbol: 'none', showLegend: true, legendPos: 't', valAxisMinVal: 0 }));
    } else {
      sl.addText('No clear increase in this period.', { x: 0.6, y: 1.5, w: 8, h: 0.45, fontFace: F, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    }
    sl.addText('Also this period', { x: 9.0, y: 1.5, w: 3.7, h: 0.35, fontFace: F, fontSize: 12, bold: true, color: C.muted, margin: 0 });
    sl.addText(S.outros.length ? S.outros.map(function (t) { return { text: t, options: { bullet: true, paraSpaceAfter: 10 } }; }) : [{ text: 'Nothing else stood out.' }],
      { x: 9.0, y: 1.9, w: 3.7, h: 5.0, fontFace: F, fontSize: 12, color: C.ink, valign: 'top', margin: 0 });

    // 7. Latest comments
    sl = pptx.addSlide(); cabecalho(sl, 'Latest comments', ++n);
    S.vozes.forEach(function (x, i) {
      var xx = 0.6 + i * 4.12, neg = x.sentimento === 'negative', pos = x.sentimento === 'positive';
      sl.addShape(pptx.ShapeType.roundRect, { x: xx, y: 1.6, w: 3.95, h: 4.6, fill: { color: neg ? 'FBEFED' : pos ? 'EEF7F1' : C.surf }, line: { color: neg ? 'F3D6D2' : pos ? 'D5EBDD' : C.line }, rectRadius: 0.18 });
      sl.addText((pos ? 'PRAISE' : neg ? 'COMPLAINT · ' + x.gravidade.toUpperCase() + ' SEVERITY' : 'NEUTRAL'), { x: xx + 0.3, y: 1.85, w: 3.4, h: 0.3, fontFace: F, fontSize: 9, bold: true, color: neg ? C.bad : pos ? C.good : C.muted, margin: 0 });
      sl.addText(x.texto, { x: xx + 0.3, y: 2.3, w: 3.4, h: 2.6, fontFace: F, fontSize: 16, color: C.ink, valign: 'top', margin: 0 });
      sl.addText(x.canal + (x.area ? ' · ' + x.area : ''), { x: xx + 0.3, y: 5.15, w: 3.4, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.ink, margin: 0 });
      sl.addText(tema(x.tema).curto + ' · ' + quando(x) + (x.estrelas ? ' · ' + x.estrelas + ' of 5 stars' : '') + ' · ' + x.id, { x: xx + 0.3, y: 5.45, w: 3.4, h: 0.3, fontFace: F, fontSize: 10, color: C.muted, margin: 0 });
    });

    var nome = 'Colibri customer feedback - Overview - ' + (st.area || 'All areas') + ' - ' + periodoTxt(j).replace(/[^\w\s–-]/g, '') + '.pptx';
    return pptx.writeFile({ fileName: nome });
  }

  // ======================================================================
  // MENUS: select-only combobox (W3C ARIA Authoring Practices pattern)
  // The native <select> stays in the page, hidden, as the source of truth.
  // The menu sets its value and fires 'change', so the existing handlers keep working.
  // ======================================================================
  var ddAberto = null, ddSeq = 0;
  var CHEV = '<svg class="dd-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  function textoLabel(sel) {
    if (sel.dataset.label) return sel.dataset.label;
    var l = sel.id && document.querySelector('label[for="' + sel.id + '"]');
    return l ? l.textContent.trim() : '';
  }
  function melhorarSelects(root) {
    $$('select.select', root).forEach(function (sel) {
      if (sel._dd) return;
      var id = 'dd' + (++ddSeq), nome = textoLabel(sel);
      var dd = document.createElement('div');
      dd.className = 'dd' + (sel.classList.contains('pill') ? ' dd-pill' : '') + (sel.classList.contains('mini') ? ' dd-mini' : '');
      var btn = document.createElement('div');
      btn.className = sel.className.replace(/\bdd-native\b/, '') + ' dd-btn';
      btn.tabIndex = 0;
      btn.setAttribute('role', 'combobox');
      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', id + '-l');
      btn.setAttribute('aria-label', nome);
      var list = document.createElement('div');
      list.className = 'dd-list'; list.id = id + '-l'; list.tabIndex = -1;
      list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', nome);
      list.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
        return '<div class="dd-opt" role="option" id="' + id + '-' + i + '" data-i="' + i + '" aria-selected="false"><span>' + esc(o.textContent) + '</span>' + ic('certo').replace('<svg', '<svg class="ck"') + '</div>';
      }).join('');
      sel.parentNode.insertBefore(dd, sel);
      dd.appendChild(btn); dd.appendChild(list); dd.appendChild(sel);
      sel.classList.add('dd-native'); sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
      sel._dd = { btn: btn };

      var ativo = sel.selectedIndex, busca = '', tBusca;
      function opts() { return $$('.dd-opt', list); }
      function pintar() {
        var o = sel.options[sel.selectedIndex];
        btn.innerHTML = '<span class="dd-val">' + esc(o ? o.textContent : '') + '</span>' + CHEV;
        opts().forEach(function (x, i) { x.classList.toggle('is-value', i === sel.selectedIndex); });
      }
      function marcar(i) {
        var os = opts(); if (!os.length) return;
        ativo = Math.max(0, Math.min(os.length - 1, i));
        os.forEach(function (x, k) { x.classList.toggle('active', k === ativo); x.setAttribute('aria-selected', String(k === ativo)); });
        btn.setAttribute('aria-activedescendant', os[ativo].id);
        var o = os[ativo];
        if (o.offsetTop < list.scrollTop) list.scrollTop = o.offsetTop - 6;
        else if (o.offsetTop + o.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = o.offsetTop + o.offsetHeight - list.clientHeight + 6;
      }
      function abrir(i) {
        if (ddAberto && ddAberto.dd !== dd) ddAberto.fechar();
        if (!dd.classList.contains('open')) {
          dd.classList.remove('up', 'right');
          dd.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
          // Open below unless there is no room; align right if it would leave the screen
          var r = btn.getBoundingClientRect(), baixo = window.innerHeight - r.bottom, alto = Math.min(320, list.scrollHeight + 16);
          dd.classList.toggle('up', baixo < alto && r.top > baixo);
          dd.classList.toggle('right', r.left + Math.max(list.offsetWidth, r.width) > document.documentElement.clientWidth - 8);
          var host = dd.closest('.w, .page-head, .toolbar, .area-top'); if (host) host.classList.add('dd-host');
          ddAberto = { dd: dd, fechar: fechar };
        }
        marcar(i == null ? sel.selectedIndex : i);
      }
      function fechar() {
        dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.removeAttribute('aria-activedescendant');
        var host = dd.closest('.dd-host'); if (host) host.classList.remove('dd-host');
        if (ddAberto && ddAberto.dd === dd) ddAberto = null;
      }
      function escolher(i, manterFoco) {
        var mudou = i !== sel.selectedIndex, tinhaFoco = document.activeElement === btn;
        sel.selectedIndex = i; pintar(); fechar();
        if (!mudou) return;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        // If the page was redrawn, put focus back on the same menu
        if (manterFoco && tinhaFoco && !document.body.contains(btn) && sel.id) {
          var n = document.getElementById(sel.id); if (n && n._dd) n._dd.btn.focus();
        }
      }
      function procurar(ch) {
        clearTimeout(tBusca); tBusca = setTimeout(function () { busca = ''; }, 600);
        busca += ch.toLowerCase();
        var os = opts(), n = os.length, de = busca.length === 1 ? ativo + 1 : ativo;
        for (var k = 0; k < n; k++) { var i = (de + k) % n; if (os[i].textContent.trim().toLowerCase().indexOf(busca) === 0) return i; }
        return null;
      }
      btn.addEventListener('keydown', function (e) {
        var k = e.key, n = sel.options.length, letra = k.length === 1 && k !== ' ' && !e.ctrlKey && !e.metaKey && !e.altKey;
        if (!dd.classList.contains('open')) {
          if (k === 'ArrowDown' || k === 'Enter' || k === ' ') { e.preventDefault(); abrir(); }
          else if (k === 'ArrowUp' || k === 'Home') { e.preventDefault(); abrir(0); }
          else if (k === 'End') { e.preventDefault(); abrir(n - 1); }
          else if (letra) { var f = procurar(k); abrir(f == null ? undefined : f); }
          return;
        }
        if (k === 'Enter' || k === ' ' || (k === 'ArrowUp' && e.altKey)) { e.preventDefault(); escolher(ativo, true); }
        else if (k === 'Tab') escolher(ativo, false);
        else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); fechar(); }
        else if (k === 'ArrowDown') { e.preventDefault(); marcar(ativo + 1); }
        else if (k === 'ArrowUp') { e.preventDefault(); marcar(ativo - 1); }
        else if (k === 'Home') { e.preventDefault(); marcar(0); }
        else if (k === 'End') { e.preventDefault(); marcar(n - 1); }
        else if (k === 'PageDown') { e.preventDefault(); marcar(ativo + 10); }
        else if (k === 'PageUp') { e.preventDefault(); marcar(ativo - 10); }
        else if (letra) { var f2 = procurar(k); if (f2 != null) marcar(f2); }
      });
      btn.addEventListener('click', function () { if (dd.classList.contains('open')) fechar(); else abrir(); });
      btn.addEventListener('blur', function () { setTimeout(function () { if (dd.classList.contains('open') && !dd.contains(document.activeElement) && document.activeElement !== document.body) fechar(); }, 0); });
      list.addEventListener('mousedown', function (e) { e.preventDefault(); }); // keeps focus on the combobox
      list.addEventListener('pointermove', function (e) { var o = e.target.closest('.dd-opt'); if (o && +o.dataset.i !== ativo) marcar(+o.dataset.i); });
      list.addEventListener('click', function (e) { var o = e.target.closest('.dd-opt'); if (o) escolher(+o.dataset.i, true); });
      pintar();
    });
  }
  document.addEventListener('pointerdown', function (e) { if (ddAberto && !ddAberto.dd.contains(e.target)) ddAberto.fechar(); });
  window.addEventListener('resize', function () { if (ddAberto) ddAberto.fechar(); });

  // ======================================================================
  // Elementos fixos
  // ======================================================================
  // Toast: green with a tick when something worked, red with a cross when it failed
  function toast(msg, tipo) {
    var t = $('toast'), erro = tipo === 'erro';
    t.classList.toggle('is-error', erro); t.classList.toggle('is-ok', !erro);
    t.setAttribute('role', erro ? 'alert' : 'status');
    t.innerHTML = '<span class="toast-ic">' + ic(erro ? 'fechar' : 'certo') + '</span><span>' + esc(msg) + '</span>';
    entrar(t);
    clearTimeout(t._t); t._t = setTimeout(function () { sair(t, 250); }, 3000);
  }
  function fecharMenu() { $('sidebar').classList.remove('open'); if (!$('scrim').hidden) sair($('scrim'), 250); $('btn-menu').setAttribute('aria-expanded', 'false'); }
  $('btn-menu').onclick = function () { var o = !$('sidebar').classList.contains('open'); $('sidebar').classList.toggle('open', o); if (o) entrar($('scrim')); else sair($('scrim'), 250); this.setAttribute('aria-expanded', String(o)); };
  $('scrim').onclick = fecharMenu;


  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { charts.forEach(function (c) { c.resize(); }); }, 80); });
  window.addEventListener('hashchange', render);
  render();

  // Carregamento real: sai quando o primeiro ecrã está desenhado e os tipos de letra e imagens chegaram.
  // For other waits (e.g. reading files): aCarregar('Reading files') ... pronto().
  function aCarregar(txt) {
    var l = $('loader');
    $('loader-txt').textContent = txt || 'Loading';
    l.classList.remove('saindo'); l.style.opacity = ''; l.hidden = false;
    l.style.animation = 'none'; void l.offsetWidth; l.style.animation = '';
  }
  function pronto() {
    var l = $('loader');
    if (!l || l.hidden) return;
    var op = +getComputedStyle(l).opacity;
    if (!op) { l.hidden = true; return; }   // nunca chegou a aparecer: sai sem animação
    l.style.opacity = op; void l.offsetWidth; l.classList.add('saindo');
    setTimeout(function () { l.hidden = true; l.classList.remove('saindo'); l.style.opacity = ''; }, REDUZ ? 0 : 320);
  }
  window.colibriCarregamento = { mostrar: aCarregar, esconder: pronto };
  var carregou = new Promise(function (res) { if (document.readyState === 'complete') res(); else window.addEventListener('load', res); });
  var letras = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.all([carregou, letras]).then(pronto, pronto);
})();
