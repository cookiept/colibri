/* Protótipo v2 · lógica do ecrã de resultados e comentários. */
(function () {
  'use strict';

  var D = window.COLIBRI_DADOS;
  var HOJE = new Date(2026, 10, 24);
  var MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var LOGO_CANAL = { Google: 'assets/logos/google.svg', Jira: 'assets/logos/jira.svg', Facebook: 'assets/logos/facebook.svg', Instagram: 'assets/logos/instagram.svg' };
  var ORDEM_GRAV = { Alta: 0, 'Média': 1, Baixa: 2 };

  // Cores das marcas para os gráficos (iguais às dos logótipos)
  var MARCA = {
    google: { css: 'var(--google)', stops: [[0, '#4285F4'], [0.25, '#4285F4'], [0.25, '#EA4335'], [0.5, '#EA4335'], [0.5, '#FBBC05'], [0.75, '#FBBC05'], [0.75, '#34A853'], [1, '#34A853']] },
    jira: { css: 'var(--jira)', stops: [[0, '#2684FF'], [1, '#0052CC']] },
    redes: { css: 'var(--redes)', stops: [[0, '#4F5BD5'], [0.2, '#962FBF'], [0.5, '#D62976'], [0.8, '#FA7E1E'], [1, '#FEDA75']] },
  };

  // Ícones de traço simples (24×24)
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
    conversa: '<path d="M4 5h16v11H9l-5 4V5z"/>',
    certo: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alerta: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
    subida: '<path d="M4 17l6-6 4 4 6-7"/><path d="M15 8h5v5"/>',
    seta: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    lapis: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
  };
  function ic(nome) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[nome] || '') + '</svg>'; }

  // ---------- utilitários ----------
  function $(id) { return document.getElementById(id); }
  function nf(n, d) { d = d || 0; return n.toLocaleString('pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mesDe(m) { return new Date(2024, 11 + m, 1); }
  function mesTxt(m, ano) { var d = mesDe(m); return MES[d.getMonth()] + (ano ? ' ' + d.getFullYear() : ''); }
  function dataDe(x) { var d = mesDe(x.m); return new Date(d.getFullYear(), d.getMonth(), x.dia); }
  function diasAtras(x) { return Math.max(0, Math.round((HOJE - dataDe(x)) / 864e5)); }
  function quando(x) {
    var d = diasAtras(x);
    if (d === 0) return 'hoje';
    if (d === 1) return 'ontem';
    if (d < 30) return 'há ' + d + ' dias';
    var dt = dataDe(x); return dt.getDate() + ' ' + MES[dt.getMonth()] + ' ' + dt.getFullYear();
  }
  function tema(nome) { return D.TEMAS.filter(function (t) { return t.nome === nome; })[0]; }
  function fonte(id) { return D.FONTES.filter(function (f) { return f.id === id; })[0]; }
  function soma(arr, f) { return arr.reduce(function (s, x) { return s + f(x); }, 0); }
  function media(arr, f) { return arr.length ? soma(arr, f) / arr.length : null; }

  // ---------- estado ----------
  var st = {
    periodo: 3, area: '', fontes: { google: true, jira: true, redes: true }, vista: 'resultados',
    c: { estado: 'sem', fonte: 'todas', grav: 'todas', tema: 'todos' }, mostrar: 10,
  };
  var respondidosAgora = {};

  function filtrar(desde, ate, ignorarFontes) {
    return D.MENCOES.filter(function (x) {
      return x.m >= desde && x.m <= ate && (ignorarFontes || st.fontes[x.fonte]) && (!st.area || x.area === st.area);
    });
  }
  function janela() { var ate = 23, desde = 24 - st.periodo; return { desde: desde, ate: ate, pDesde: desde - st.periodo, pAte: desde - 1 }; }
  function periodoTxt(j) { return st.periodo === 1 ? 'novembro 2026' : mesTxt(j.desde) + '–' + mesTxt(j.ate, true); }
  function isResp(x) { return x.respondido || respondidosAgora[x.id]; }

  function indicadores(rows) {
    var neg = rows.filter(function (x) { return x.sentimento === 'negativo'; });
    var g = rows.filter(function (x) { return x.fonte === 'google'; });
    var pedem = rows.filter(function (x) { return x.sentimento !== 'positivo'; });
    var resp = pedem.filter(isResp);
    var comTempo = resp.filter(function (x) { return x.respondido; });
    return {
      neg: neg.length,
      rating: media(g, function (x) { return x.estrelas; }),
      taxa: pedem.length ? resp.length / pedem.length * 100 : null,
      tempo: media(comTempo, function (x) { return x.horas; }),
      graves: neg.filter(function (x) { return x.gravidade === 'Alta' && !isResp(x); }).length,
    };
  }

  function delta(a, b, bomSobe, tipo) {
    if (a == null || b == null || b === 0) return { cls: 'flat', txt: 'sem comparação' };
    var v = tipo === 'rel' ? (a - b) / b * 100 : a - b;
    var lim = tipo === 'dec' ? 0.05 : 0.5;
    if (Math.abs(v) < lim) return { cls: 'flat', txt: 'igual' };
    var sobe = v > 0;
    var txt = tipo === 'rel' ? nf(Math.abs(v)) + '%' : tipo === 'pp' ? nf(Math.abs(v)) + ' p.p.' : tipo === 'h' ? nf(Math.abs(v)) + ' h' : tipo === 'dec' ? nf(Math.abs(v), 1) : nf(Math.abs(v));
    return { cls: sobe === bomSobe ? 'good' : 'bad', txt: (sobe ? '↑ ' : '↓ ') + txt };
  }

  // ---------- elementos fixos ----------
  $('f-area').innerHTML = '<option value="">Todas as áreas de serviço</option>' + D.AREAS.map(function (a) { return '<option>' + a + '</option>'; }).join('');
  ['f-area', 'f-area-c'].forEach(function (id) {
    $(id).innerHTML = $('f-area').innerHTML;
    $(id).addEventListener('change', function (e) { st.area = e.target.value; st.mostrar = 10; render(); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('#periodo button'), function (b) {
    b.addEventListener('click', function () { st.periodo = +b.dataset.p; st.mostrar = 10; render(); });
  });
  $('lista-ficheiros').innerHTML = [
    ['google', 'google_reviews_colibri_nov26.xlsx'], ['jira', 'jira_reclamacoes_colibri.csv'], ['redes', 'meta_inbox_colibri_nov26.xlsx'],
  ].map(function (f) {
    var n = D.MENCOES.filter(function (x) { return x.fonte === f[0]; }).length;
    return '<div class="ficheiro"><img src="' + fonte(f[0]).logo + '" alt=""><div><b>' + fonte(f[0]).nome + '</b><span>' + f[1] + ' · ' + nf(n) + ' linhas</span></div><span class="ok">Carregado</span></div>';
  }).join('');
  $('btn-ficheiros').addEventListener('click', function () {
    var p = $('painel-ficheiros'); p.hidden = !p.hidden; this.setAttribute('aria-expanded', String(!p.hidden));
  });
  document.addEventListener('click', function (e) {
    var p = $('painel-ficheiros');
    if (!p.hidden && !p.contains(e.target) && !$('btn-ficheiros').contains(e.target)) { p.hidden = true; $('btn-ficheiros').setAttribute('aria-expanded', 'false'); }
  });
  $('btn-exportar').addEventListener('click', function () { toast('No produto final: exportação para PDF e PowerPoint, como no Stater.'); });

  function setVista(v) {
    st.vista = v;
    $('view-resultados').hidden = v !== 'resultados';
    $('view-comentarios').hidden = v !== 'comentarios';
    $('tab-resultados').setAttribute('aria-selected', String(v === 'resultados'));
    $('tab-comentarios').setAttribute('aria-selected', String(v === 'comentarios'));
    window.scrollTo(0, 0);
    render();
  }
  $('tab-resultados').addEventListener('click', function () { setVista('resultados'); });
  $('tab-comentarios').addEventListener('click', function () { setVista('comentarios'); });

  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('role', 'status');
      toastEl.style.cssText = 'position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:#1E1E1E;color:#fff;padding:10px 16px;border-radius:999px;font-size:13px;z-index:50;max-width:calc(100vw - 32px);box-shadow:0 8px 24px rgba(0,0,0,.2)';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.hidden = true; }, 3200);
  }

  // ---------- render: resultados ----------
  var chRating, chVolume;

  function renderResultados() {
    var j = janela();
    var rows = filtrar(j.desde, j.ate), prev = filtrar(j.pDesde, j.pAte);
    var k = indicadores(rows), kp = indicadores(prev);
    var neg = rows.filter(function (x) { return x.sentimento === 'negativo'; });
    var negPrev = prev.filter(function (x) { return x.sentimento === 'negativo'; });

    $('eyebrow').textContent = (st.area ? 'Área de serviço de ' + st.area : 'Todas as áreas de serviço') + ' · ' + periodoTxt(j);

    // Chips de fonte
    var todas = filtrar(j.desde, j.ate, true);
    $('sources').innerHTML = D.FONTES.map(function (f) {
      var n = todas.filter(function (x) { return x.fonte === f.id; }).length;
      var logos = f.id === 'redes' ? '<img src="assets/logos/facebook.svg" alt=""><img src="assets/logos/instagram.svg" alt="" style="margin-left:-4px">' : '<img src="' + f.logo + '" alt="">';
      return '<button type="button" class="source-chip" data-f="' + f.id + '" aria-pressed="' + st.fontes[f.id] + '">' + logos + f.nome + ' <span class="n tnum">' + nf(n) + '</span></button>';
    }).join('');
    Array.prototype.forEach.call(document.querySelectorAll('.source-chip'), function (b) {
      b.addEventListener('click', function () {
        var id = b.dataset.f, ativas = Object.keys(st.fontes).filter(function (x) { return st.fontes[x]; });
        if (st.fontes[id] && ativas.length === 1) return;
        st.fontes[id] = !st.fontes[id]; render();
      });
    });

    // Anel de rating
    var r = k.rating;
    var circ = 2 * Math.PI * 84;
    var frac = r == null ? 0 : (r - 1) / 4;
    $('ring').innerHTML =
      '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7BDBE"/><stop offset="1" stop-color="#B62454"/></linearGradient></defs>' +
      '<circle cx="100" cy="100" r="84" fill="none" stroke="#F4F2EF" stroke-width="14"/>' +
      '<circle cx="100" cy="100" r="84" fill="none" stroke="url(#rg)" stroke-width="14" stroke-linecap="round" stroke-dasharray="' + (circ * frac).toFixed(1) + ' ' + circ.toFixed(1) + '"/></svg>' +
      '<div class="val"><b class="tnum">' + (r == null ? '–' : nf(r, 1)) + '</b><span>de 5 estrelas</span></div>';
    $('verdict').textContent = r == null ? 'Sem reviews Google' : r < 2.5 ? 'Fraco' : r < 3.5 ? 'Razoável' : r < 4.2 ? 'Bom' : 'Muito bom';
    var dr = delta(k.rating, kp.rating, true, 'dec');
    $('trend').innerHTML = dr.cls === 'flat' ? '<span>igual ao período anterior</span>' : '<span class="' + (dr.cls === 'good' ? 'up' : 'down') + '">' + dr.txt + '</span> vs. período anterior';

    // Linha do rating (12 meses)
    var meses = []; for (var m = 12; m <= 23; m++) meses.push(m);
    var serie = meses.map(function (m) {
      var g = D.MENCOES.filter(function (x) { return x.m === m && x.fonte === 'google' && (!st.area || x.area === st.area); });
      return g.length ? +(soma(g, function (x) { return x.estrelas; }) / g.length).toFixed(2) : null;
    });
    var vals = serie.filter(function (v) { return v != null; });
    var yMin = vals.length ? Math.max(1, Math.floor((Math.min.apply(null, vals) - 0.3) * 2) / 2) : 1;
    var yMax = vals.length ? Math.min(5, Math.ceil((Math.max.apply(null, vals) + 0.3) * 2) / 2) : 5;
    chRating = chRating || echarts.init($('ch-rating'), null, { renderer: 'svg' });
    chRating.setOption({
      animationDuration: 400,
      textStyle: { fontFamily: 'Noto Sans, system-ui, sans-serif' },
      grid: { left: 4, right: 8, top: 16, bottom: 4, containLabel: true },
      tooltip: { trigger: 'axis', valueFormatter: function (v) { return v == null ? '–' : nf(v, 2) + ' ★'; } },
      xAxis: { type: 'category', boundaryGap: false, data: meses.map(function (m) { return mesTxt(m); }), axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#757575', fontSize: 11 } },
      yAxis: { type: 'value', min: yMin, max: yMax, interval: 0.5, axisLabel: { color: '#757575', fontSize: 11, formatter: function (v) { return nf(v, 1); } }, splitLine: { lineStyle: { color: '#F0EEEA' } } },
      series: [{
        type: 'line', smooth: 0.35, data: serie, symbol: 'circle', symbolSize: 7, showSymbol: true,
        lineStyle: { width: 3, color: '#B62454' }, itemStyle: { color: '#FFFFFF', borderColor: '#B62454', borderWidth: 2 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(182,36,84,.16)' }, { offset: 1, color: 'rgba(182,36,84,0)' }]) },
        markArea: { silent: true, itemStyle: { color: 'rgba(182,36,84,.05)' }, data: [[{ xAxis: mesTxt(j.desde) }, { xAxis: mesTxt(j.ate) }]] },
      }],
    }, true);

    // Resumo
    var temas = D.TEMAS.map(function (t) {
      var n = neg.filter(function (x) { return x.tema === t.nome; }).length;
      var np = negPrev.filter(function (x) { return x.tema === t.nome; }).length;
      return { t: t, n: n, np: np, dv: np ? (n - np) / np * 100 : null };
    });
    var porN = temas.slice().sort(function (a, b) { return b.n - a.n; });
    var t1 = porN[0];
    var dVol = kp.neg ? (k.neg - kp.neg) / kp.neg * 100 : null;
    $('summary-title').innerHTML = nf(k.neg) + ' reclamações' + (dVol == null || Math.abs(dVol) < 1 ? '' : ', ' + (dVol > 0 ? 'mais' : 'menos') + ' ' + nf(Math.abs(dVol)) + '% do que no período anterior');
    var li = [];
    if (t1 && t1.n) li.push('<b>' + esc(t1.t.nome) + '</b> explica ' + nf(t1.n / Math.max(1, k.neg) * 100) + '% das queixas' + (t1.t.nps != null ? ' e é o driver com NPS mais baixo no inquérito (' + t1.t.nps + ').' : '.'));
    if (!st.area) {
      var porArea = D.AREAS.map(function (a) { return [a, neg.filter(function (x) { return x.area === a; }).length]; }).sort(function (a, b) { return b[1] - a[1]; })[0];
      li.push('<b>' + porArea[0] + '</b> é a área de serviço com mais reclamações (' + porArea[1] + ').');
    }
    if (k.taxa != null) li.push('A Colibri respondeu a <b>' + nf(k.taxa) + '%</b> das menções negativas ou neutras; ' + nf(k.graves) + ' casos graves continuam sem resposta.');
    $('summary').innerHTML = li.map(function (x) { return '<li>' + x + '</li>'; }).join('');

    // Métricas
    function metrica(icone, cls, rot, valor, unid, d) {
      return '<article class="card metric"><span class="icon-badge ' + cls + '">' + ic(icone) + '</span><div><p class="k">' + rot + '</p><p class="v tnum">' + valor + (unid ? '<small>' + unid + '</small>' : '') + '</p><span class="delta ' + d.cls + ' tnum">' + d.txt + '</span>' + (d.cls !== 'flat' ? '<span class="vs">vs. anterior</span>' : '') + '</div></article>';
    }
    $('metrics').innerHTML = [
      metrica('conversa', '', 'Reclamações', nf(k.neg), '', delta(k.neg, kp.neg, false, 'rel')),
      metrica('certo', 'teal', 'Respondidas', k.taxa == null ? '–' : nf(k.taxa), k.taxa == null ? '' : '%', delta(k.taxa, kp.taxa, true, 'pp')),
      metrica('relogio', 'teal', 'Tempo até à 1.ª resposta', k.tempo == null ? '–' : nf(k.tempo), k.tempo == null ? '' : ' h', delta(k.tempo, kp.tempo, false, 'h')),
      metrica('alerta', 'bad', 'Graves sem resposta', nf(k.graves), '', delta(k.graves, kp.graves, false, 'abs')),
    ].join('');

    // Sinais
    var sinais = [];
    var combos = [];
    D.AREAS.forEach(function (a) {
      if (st.area && a !== st.area) return;
      D.TEMAS.forEach(function (t) {
        var n = neg.filter(function (x) { return x.area === a && x.tema === t.nome; });
        var np = negPrev.filter(function (x) { return x.area === a && x.tema === t.nome; }).length;
        if (n.length >= 4 && n.length > np) combos.push({ a: a, t: t, n: n, np: np, sobe: n.length - np });
      });
    });
    combos.sort(function (x, y) { return y.sobe - x.sobe; });
    if (combos[0]) {
      var c = combos[0];
      var fontesC = D.FONTES.filter(function (f) { return c.n.some(function (x) { return x.fonte === f.id; }); });
      sinais.push({
        icone: 'subida', cls: 'bad', titulo: c.t.curto + ' em ' + c.a,
        texto: 'As reclamações sobre ' + c.t.nome.toLowerCase() + ' em ' + c.a + ' passaram de ' + c.np + ' para ' + c.n.length + ' face ao período anterior.',
        pills: ['<span class="pill bad tnum">+' + (c.n.length - c.np) + ' reclamações</span>'].concat(fontesC.map(function (f) { return '<span class="pill"><img src="' + f.logo + '" alt="">' + f.curto + '</span>'; })).concat(c.t.nps != null ? ['<span class="pill ' + (c.t.nps < 25 ? 'warn' : '') + '">NPS VoC ' + c.t.nps + '</span>'] : []),
        acao: function () { st.c = { estado: 'todos', fonte: 'todas', grav: 'todas', tema: c.t.nome }; st.area = c.a; setVista('comentarios'); },
      });
    }
    var graves = neg.filter(function (x) { return x.gravidade === 'Alta' && !isResp(x); });
    if (graves.length) {
      var maisAntigo = graves.reduce(function (a, b) { return diasAtras(a) > diasAtras(b) ? a : b; });
      sinais.push({
        icone: 'alerta', cls: 'bad', titulo: nf(graves.length) + ' casos graves sem resposta',
        texto: 'O mais antigo tem ' + diasAtras(maisAntigo) + ' dias e é sobre ' + maisAntigo.tema.toLowerCase() + (maisAntigo.area ? ' em ' + maisAntigo.area : '') + '.',
        pills: D.FONTES.map(function (f) { var n = graves.filter(function (x) { return x.fonte === f.id; }).length; return n ? '<span class="pill"><img src="' + f.logo + '" alt="">' + f.curto + ' · ' + n + '</span>' : ''; }),
        acao: function () { st.c = { estado: 'sem', fonte: 'todas', grav: 'Alta', tema: 'todos' }; setVista('comentarios'); },
      });
    }
    var tempos = D.FONTES.filter(function (f) { return st.fontes[f.id]; }).map(function (f) {
      var r2 = rows.filter(function (x) { return x.fonte === f.id && x.sentimento !== 'positivo'; });
      var resp = r2.filter(function (x) { return x.respondido; });
      return { f: f, tempo: media(resp, function (x) { return x.horas; }), taxa: r2.length ? resp.length / r2.length * 100 : null, sem: r2.length - resp.length };
    }).filter(function (x) { return x.tempo != null; }).sort(function (a, b) { return b.tempo - a.tempo; });
    if (tempos.length > 1) {
      var lento = tempos[0], rapido = tempos[tempos.length - 1];
      sinais.push({
        icone: 'relogio', cls: 'teal', titulo: lento.f.curto + ' é a fonte com resposta mais lenta',
        texto: 'Em média ' + nf(lento.tempo) + ' h até à 1.ª resposta, contra ' + nf(rapido.tempo) + ' h em ' + rapido.f.curto + '. Há ' + lento.sem + ' menções sem resposta.',
        pills: ['<span class="pill"><img src="' + lento.f.logo + '" alt="">' + nf(lento.taxa) + '% respondidas</span>', '<span class="pill warn tnum">' + nf(lento.tempo) + ' h</span>'],
        acao: function () { st.c = { estado: 'sem', fonte: lento.f.id, grav: 'todas', tema: 'todos' }; setVista('comentarios'); },
      });
    }
    $('signals').innerHTML = sinais.map(function (s, i) {
      return '<article class="card signal"><div class="signal-head"><span class="icon-badge ' + s.cls + '">' + ic(s.icone) + '</span><h3>' + esc(s.titulo) + '</h3></div><p>' + esc(s.texto) + '</p><div class="pills">' + s.pills.join('') + '</div><button type="button" class="link" data-s="' + i + '">Ver casos ' + ic('seta') + '</button></article>';
    }).join('') || '<article class="card"><p>Sem sinais relevantes neste período.</p></article>';
    Array.prototype.forEach.call(document.querySelectorAll('#signals .link'), function (b) { b.addEventListener('click', function () { sinais[+b.dataset.s].acao(); }); });

    // Onde focar / onde está bem
    function chip(x, bom) {
      var d = x.dv == null ? '' : '<span class="d ' + (x.dv > 0 ? 'bad' : 'good') + ' tnum">' + (x.dv > 0 ? '↑ ' : '↓ ') + nf(Math.abs(x.dv)) + '%</span>';
      var nps = x.t.nps == null ? '<span class="nps">NPS VoC<b>–</b></span>' : '<span class="nps">NPS VoC<b class="tnum ' + (x.t.nps < 25 ? 'low' : '') + '">' + x.t.nps + '</b></span>';
      return '<button type="button" class="theme-chip" data-tema="' + esc(x.t.nome) + '"><span class="icon-badge ' + (bom ? 'good' : '') + '">' + ic(x.t.icone) + '</span><span class="t"><b class="tnum">' + x.n + '</b>' + d + '<span class="name">' + esc(x.t.nome) + '</span></span>' + nps + '</button>';
    }
    $('focus').innerHTML = porN.filter(function (x) { return x.n > 0; }).slice(0, 4).map(function (x) { return chip(x, false); }).join('');
    var melhoram = temas.filter(function (x) { return x.dv != null && x.dv < 0; }).sort(function (a, b) { return a.dv - b.dv; }).slice(0, 4);
    $('thriving').innerHTML = melhoram.length ? melhoram.map(function (x) { return chip(x, true); }).join('') : '<p style="color:var(--muted);font-size:14px">Nenhum tema desceu face ao período anterior.</p>';
    Array.prototype.forEach.call(document.querySelectorAll('.theme-chip'), function (b) {
      b.addEventListener('click', function () { st.c = { estado: 'todos', fonte: 'todas', grav: 'todas', tema: b.dataset.tema }; setVista('comentarios'); });
    });

    // Volume por fonte
    $('volume-sub').textContent = 'Menções negativas por fonte, últimos 12 meses';
    $('legend').innerHTML = D.FONTES.filter(function (f) { return st.fontes[f.id]; }).map(function (f) { return '<span><i style="background:' + MARCA[f.id].css + '"></i>' + f.curto + '</span>'; }).join('');
    var r12 = filtrar(12, 23).filter(function (x) { return x.sentimento === 'negativo'; });
    var ativas = D.FONTES.filter(function (f) { return st.fontes[f.id]; });
    var totais = meses.map(function (m) { return r12.filter(function (x) { return x.m === m; }).length; });
    var series = ativas.map(function (f, i) {
      var grad = new echarts.graphic.LinearGradient(0, 0, f.id === 'google' ? 1 : 0, f.id === 'google' ? 0 : 1, MARCA[f.id].stops.map(function (s) { return { offset: s[0], color: s[1] }; }));
      return {
        name: f.curto, type: 'bar', stack: 't', barMaxWidth: 26,
        itemStyle: { color: grad, borderRadius: i === ativas.length - 1 ? [6, 6, 0, 0] : 0 },
        data: meses.map(function (m) { return { value: r12.filter(function (x) { return x.m === m && x.fonte === f.id; }).length, itemStyle: m >= j.desde ? {} : { color: '#E7E4DF' } }; }),
        label: i === ativas.length - 1 ? { show: true, position: 'top', color: '#484747', fontSize: 11, fontWeight: 600, formatter: function (p) { return meses[p.dataIndex] >= j.desde ? totais[p.dataIndex] : ''; } } : { show: false },
      };
    });
    chVolume = chVolume || echarts.init($('ch-volume'), null, { renderer: 'svg' });
    chVolume.setOption({
      animationDuration: 400,
      textStyle: { fontFamily: 'Noto Sans, system-ui, sans-serif' },
      grid: { left: 4, right: 4, top: 24, bottom: 4, containLabel: true },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(30,30,30,.04)' } } },
      xAxis: { type: 'category', data: meses.map(function (m) { return mesTxt(m); }), axisLine: { lineStyle: { color: '#DDD9D3' } }, axisTick: { show: false }, axisLabel: { color: '#757575', fontSize: 11 } },
      yAxis: { type: 'value', splitNumber: 3, axisLabel: { color: '#757575', fontSize: 11 }, splitLine: { lineStyle: { color: '#F0EEEA' } } },
      series: series,
    }, true);

    // Por fonte
    $('por-fonte-periodo').textContent = periodoTxt(j);
    $('por-fonte').innerHTML = ativas.map(function (f) {
      var rf = rows.filter(function (x) { return x.fonte === f.id; });
      var kf = indicadores(rf);
      var share = kf.neg / Math.max(1, k.neg) * 100;
      var logo = f.id === 'redes' ? '<span style="position:relative;display:block;width:28px;height:28px"><img src="assets/logos/facebook.svg" alt="" style="width:20px;height:20px;position:absolute;left:0;top:0"><img src="assets/logos/instagram.svg" alt="" style="width:20px;height:20px;position:absolute;right:0;bottom:0"></span>' : '<img src="' + f.logo + '" alt="">';
      var sub = (kf.taxa == null ? '' : nf(kf.taxa) + '% respondidas') + (kf.tempo == null ? '' : ' · 1.ª resposta ' + nf(kf.tempo) + ' h') + (f.id === 'google' && kf.rating != null ? ' · ' + nf(kf.rating, 1) + ' ★' : '');
      return '<div class="src-row">' + logo + '<div><b>' + f.nome + '</b><span class="sub tnum">' + sub + '</span><div class="bar"><i style="width:' + share.toFixed(1) + '%;background:' + MARCA[f.id].css + '"></i></div></div><div class="num"><b class="tnum">' + nf(kf.neg) + '</b><span class="tnum">' + nf(share) + '%</span></div></div>';
    }).join('');

    // Mapa de calor
    var top = porN.filter(function (x) { return x.n > 0; }).slice(0, 6);
    var areas = st.area ? [st.area] : D.AREAS;
    var vals2 = areas.map(function (a) { return top.map(function (x) { return neg.filter(function (y) { return y.area === a && y.tema === x.t.nome; }).length; }); });
    var vmax = Math.max.apply(null, [1].concat([].concat.apply([], vals2)));
    $('heat').innerHTML = '<colgroup><col class="first">' + top.map(function () { return '<col>'; }).join('') + '</colgroup><thead><tr><th></th>' + top.map(function (x) { return '<th title="' + esc(x.t.nome) + '">' + esc(x.t.curto) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      areas.map(function (a, i) {
        return '<tr><td class="a">' + a + '</td>' + vals2[i].map(function (v) {
          var p = v / vmax;
          var bg = v ? 'rgba(182,36,84,' + (0.07 + p * 0.83).toFixed(2) + ')' : '#F9F8F6';
          var fg = p > 0.5 ? '#FFFFFF' : '#5A1516';
          return '<td class="c" style="background:' + bg + ';color:' + fg + '">' + (v || '') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';
  }

  // ---------- render: comentários ----------
  var MODELOS = {
    'Instalações sanitárias': 'Lamentamos o estado em que encontrou as instalações sanitárias. Já passámos a informação à equipa da área de serviço para reforçar a limpeza e a verificação ao longo do dia.',
    'Serviço/Atendimento': 'Lamentamos que o atendimento não tenha estado ao nível que esperamos. Partilhámos o seu comentário com a responsável da área de serviço.',
    'Alimentação e bebidas': 'Obrigado por nos dizer. A qualidade do que servimos é uma prioridade e já reportámos o caso à equipa de cozinha.',
    'Preço': 'Percebemos a sua observação sobre os preços. Vamos partilhá-la com a equipa comercial, que revê a oferta e os preços regularmente.',
    'Caixa e pagamento': 'Lamentamos o incómodo no pagamento. Se houve uma cobrança a mais, envie-nos o talão e os últimos dígitos do cartão por mensagem privada para tratarmos a devolução.',
    'Reembolsos e faturação': 'Pedimos desculpa pela demora. Para avançarmos já, envie-nos por mensagem privada o número do talão e a data da compra.',
  };
  function modelo(x) {
    var corpo = MODELOS[x.tema] || 'Obrigado por partilhar a sua experiência. Já passámos o seu comentário à equipa responsável.';
    return 'Olá. ' + corpo + (x.area ? ' (Área de serviço de ' + x.area + '.)' : '') + '\n\nEquipa Colibri';
  }

  function renderComentarios() {
    var j = janela();
    $('eyebrow-c').textContent = (st.area ? 'Área de serviço de ' + st.area : 'Todas as áreas de serviço') + ' · ' + periodoTxt(j);
    var base = filtrar(j.desde, j.ate, true).filter(function (x) { return x.sentimento !== 'positivo'; });

    function opts(id, chave, lista) {
      $(id).innerHTML = lista.map(function (o) {
        return '<button type="button" class="opt" data-k="' + chave + '" data-v="' + esc(o.v) + '" aria-pressed="' + (st.c[chave] === o.v) + '">' + (o.logo ? '<img src="' + o.logo + '" alt="">' : '') + esc(o.l) + '</button>';
      }).join('');
    }
    opts('fo-estado', 'estado', [{ v: 'sem', l: 'Sem resposta' }, { v: 'com', l: 'Respondidos' }, { v: 'todos', l: 'Todos' }]);
    opts('fo-fonte', 'fonte', [{ v: 'todas', l: 'Todas' }].concat(D.FONTES.map(function (f) { return { v: f.id, l: f.curto, logo: f.logo }; })));
    opts('fo-grav', 'grav', [{ v: 'todas', l: 'Todas' }, { v: 'Alta', l: 'Alta' }, { v: 'Média', l: 'Média' }, { v: 'Baixa', l: 'Baixa' }]);
    var temasPresentes = D.TEMAS.filter(function (t) { return base.some(function (x) { return x.tema === t.nome; }); });
    opts('fo-tema', 'tema', [{ v: 'todos', l: 'Todos' }].concat(temasPresentes.map(function (t) { return { v: t.nome, l: t.curto }; })));
    Array.prototype.forEach.call(document.querySelectorAll('.opt'), function (b) {
      b.addEventListener('click', function () { st.c[b.dataset.k] = b.dataset.v; st.mostrar = 10; renderComentarios(); });
    });

    var lista = base.filter(function (x) {
      return (st.c.estado === 'todos' || (st.c.estado === 'sem' ? !isResp(x) : isResp(x))) &&
        (st.c.fonte === 'todas' || x.fonte === st.c.fonte) &&
        (st.c.grav === 'todas' || x.gravidade === st.c.grav) &&
        (st.c.tema === 'todos' || x.tema === st.c.tema);
    }).sort(function (a, b) { return (isResp(a) - isResp(b)) || ORDEM_GRAV[a.gravidade] - ORDEM_GRAV[b.gravidade] || dataDe(b) - dataDe(a); });

    var semResp = base.filter(function (x) { return !isResp(x); }).length;
    $('tab-count').textContent = nf(semResp);
    $('feed-title').textContent = st.c.tema !== 'todos' ? st.c.tema : st.c.estado === 'sem' ? 'Por responder' : st.c.estado === 'com' ? 'Respondidos' : 'Todos os comentários';
    $('feed-sub').textContent = nf(lista.length) + ' comentários · primeiro os sem resposta e mais graves';

    var visiveis = lista.slice(0, st.mostrar);
    $('feed').innerHTML = visiveis.map(function (x) {
      var f = fonte(x.fonte);
      var quem = x.fonte === 'google' ? 'Google Reviews' : x.fonte === 'jira' ? 'Jira · ' + x.id : x.canal;
      var estrelas = x.estrelas ? '<span class="stars" aria-label="' + x.estrelas + ' estrelas">' + '★'.repeat(x.estrelas) + '<s>' + '★'.repeat(5 - x.estrelas) + '</s></span>' : '';
      var gcls = x.gravidade === 'Alta' ? 'bad' : x.gravidade === 'Média' ? 'warn' : '';
      var estado = isResp(x) ? '<span class="pill good">' + (respondidosAgora[x.id] ? 'Respondido agora' : 'Respondido em ' + nf(x.horas) + ' h') + '</span>' : '<span class="pill bad">Sem resposta</span>';
      return '<article class="comment" data-id="' + x.id + '">' +
        '<div class="comment-top"><img src="' + LOGO_CANAL[x.canal] + '" alt="' + esc(f.nome) + '"><span class="who">' + esc(quem) + '</span>' + estrelas + '<span class="when">' + quando(x) + '</span><span class="status">' + estado + '</span></div>' +
        '<p class="bubble">' + esc(x.texto) + '</p>' +
        '<div class="comment-tags">' + (x.area ? '<span class="pill">' + esc(x.area) + '</span>' : '<span class="pill">Área não indicada</span>') + '<span class="pill">' + esc(x.tema) + '</span><span class="pill ' + gcls + '">Gravidade ' + x.gravidade.toLowerCase() + '</span></div>' +
        (isResp(x) ? '' : '<div class="comment-actions"><button type="button" class="btn btn-ghost btn-sm" data-acao="responder">' + ic('lapis') + 'Preparar resposta</button></div>') +
        '</article>';
    }).join('') || '<div class="card empty"><h3>Nada por aqui</h3><p>Nenhum comentário com estes filtros. Experimente "Todos" no estado ou outro período.</p></div>';
    $('btn-mais').hidden = lista.length <= st.mostrar;

    Array.prototype.forEach.call(document.querySelectorAll('[data-acao="responder"]'), function (b) {
      b.addEventListener('click', function () {
        var art = b.closest('.comment'); var x = D.MENCOES.filter(function (y) { return y.id === art.dataset.id; })[0];
        if (art.querySelector('.reply')) return;
        var box = document.createElement('div'); box.className = 'reply';
        var tid = 'r-' + x.id;
        box.innerHTML = '<label for="' + tid + '">' + ic('lapis') + 'Modelo de resposta para ' + esc(x.tema.toLowerCase()) + '</label><textarea id="' + tid + '">' + esc(modelo(x)) + '</textarea>' +
          '<div class="row"><span class="hint">Edite antes de enviar no ' + (x.fonte === 'jira' ? 'Jira' : x.fonte === 'google' ? 'Google Business Profile' : 'Meta Business Suite') + '.</span><button type="button" class="btn btn-quiet btn-sm" data-r="copiar">Copiar texto</button><button type="button" class="btn btn-primary btn-sm" data-r="feito">Marcar como respondido</button></div>';
        b.parentNode.replaceWith(box);
        box.querySelector('textarea').focus();
        box.querySelector('[data-r="copiar"]').addEventListener('click', function () {
          var ta = box.querySelector('textarea');
          var ok = function () { toast('Texto copiado.'); };
          try { navigator.clipboard.writeText(ta.value).then(ok, function () { ta.select(); toast('Selecionado. Use Ctrl+C para copiar.'); }); } catch (e) { ta.select(); toast('Selecionado. Use Ctrl+C para copiar.'); }
        });
        box.querySelector('[data-r="feito"]').addEventListener('click', function () { respondidosAgora[x.id] = true; toast('Marcado como respondido.'); renderComentarios(); });
      });
    });
  }
  $('btn-mais').addEventListener('click', function () { st.mostrar += 10; renderComentarios(); });

  function render() {
    Array.prototype.forEach.call(document.querySelectorAll('#periodo button'), function (b) { b.setAttribute('aria-pressed', String(+b.dataset.p === st.periodo)); });
    $('f-area').value = st.area; $('f-area-c').value = st.area;
    if (st.vista === 'resultados') renderResultados();
    renderComentarios();
  }

  render();
  window.addEventListener('resize', function () { chRating && chRating.resize(); chVolume && chVolume.resize(); });
})();
