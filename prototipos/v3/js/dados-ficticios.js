/* Sample data for the prototype.
   Generated deterministically: the numbers are the same on every reload.
   They do not represent Colibri. */
(function () {
  'use strict';

  var seed = 20261124;
  function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
  function pick(arr, pesos) {
    var total = pesos.reduce(function (a, b) { return a + b; }, 0);
    var r = rnd() * total;
    for (var i = 0; i < arr.length; i++) { r -= pesos[i]; if (r <= 0) return arr[i]; }
    return arr[arr.length - 1];
  }

  var FONTES = [
    { id: 'google', nome: 'Google Reviews', curto: 'Google', logo: 'assets/logos/google.svg', canais: ['Google'] },
    { id: 'jira', nome: 'Jira complaints', curto: 'Jira', logo: 'assets/logos/jira.svg', canais: ['Jira'] },
    { id: 'redes', nome: 'Facebook and Instagram', curto: 'Social media', logo: 'assets/logos/instagram.svg', canais: ['Facebook', 'Instagram'] },
  ];

  var AREAS = ['Aveiras', 'Pombal', 'Mealhada', 'Leiria', 'Santarém', 'Antuã', 'Alcácer do Sal', 'Almodôvar'];
  var AREA_PESOS = [16, 14, 13, 12, 11, 10, 9, 7];

  // name, weight, VoC driver NPS (sample), short name, icon
  var TEMAS = [
    { nome: 'Restrooms', peso: 17, nps: 14, curto: 'Restrooms', icone: 'sanita' },
    { nome: 'Customer service', peso: 15, nps: 33, curto: 'Service', icone: 'pessoa' },
    { nome: 'Food and drinks', peso: 13, nps: 27, curto: 'Food', icone: 'chavena' },
    { nome: 'Price', peso: 12, nps: null, curto: 'Price', icone: 'euro' },
    { nome: 'Checkout and payment', peso: 9, nps: 38, curto: 'Checkout', icone: 'cartao' },
    { nome: 'Arrival and parking', peso: 7, nps: 41, curto: 'Parking', icone: 'parque' },
    { nome: 'Dining area', peso: 6, nps: 30, curto: 'Dining', icone: 'mesa' },
    { nome: 'Vending machines', peso: 5, nps: 19, curto: 'Vending', icone: 'caixa' },
    { nome: 'Refunds and invoicing', peso: 5, nps: null, curto: 'Refunds', icone: 'recibo' },
    { nome: 'Colibri Express service', peso: 3, nps: 45, curto: 'Express', icone: 'raio' },
    { nome: 'Kids areas', peso: 3, nps: 36, curto: 'Kids', icone: 'estrela' },
    { nome: 'Products', peso: 3, nps: 40, curto: 'Products', icone: 'saco' },
  ];

  var TEXTOS = {
    'Restrooms': ['No toilet paper and a bad smell at 8 in the morning.', 'Only one restroom open, the others closed for cleaning.', 'Hand dryers have been broken for weeks.', 'Wet floor with no warning sign, I almost slipped.'],
    'Customer service': ['A queue of 15 people and only one person at the coffee counter.', 'I asked where the EV charger was and nobody knew.', 'Unfriendly service, not even a good morning.'],
    'Food and drinks': ['Dry sandwich and cold coffee.', 'The soup was lukewarm and tasteless.', 'Hardly any vegetarian options at lunch.'],
    'Price': ['€4.20 for a 1.5 L bottle of water.', '€14 for a simple meal deal is too much.', 'Prices are far above any café in town.'],
    'Checkout and payment': ['I was charged twice on my card and still have not been refunded.', 'Only one till open on a Sunday in August.', 'The card machine was down and they did not take MB Way.'],
    'Arrival and parking': ['Car spaces taken by lorries.', 'No spaces for motorhomes.', 'The signs at the entrance are confusing.'],
    'Dining area': ['Every table left dirty at lunchtime.', 'Air conditioning off with 38 degrees outside.', 'Noisy and not a single free seat.'],
    'Vending machines': ['The machine took my coins and gave me nothing.', 'Vending machines empty overnight.', 'The coffee machine does not take cards.'],
    'Refunds and invoicing': ['I asked for an invoice with my tax number and never got it.', 'I have been waiting three weeks for a refund.', 'The receipt showed a different amount from what I paid.'],
    'Colibri Express service': ['Express was closed during its advertised hours.', 'It took longer than the regular counter.', 'My Express order was wrong.'],
    'Kids areas': ['Playground with a broken swing.', 'Kids area dirty and unsupervised.', 'The baby changing table is only in the women\'s restroom.'],
    'Products': ['The promoted product was not in the shop.', 'Empty shelves at night.', 'Little choice of regional products.'],
  };
  var ELOGIOS = ['Everything was clean and the staff were very friendly.', 'Quick stop and good coffee.', 'Much better since the renovation.', 'Still the best pastéis de nata on the A1.'];

  // 24 months: m = 0 is Dec 2024, m = 23 is Nov 2026
  var MENCOES = [];
  var n = 0;
  for (var m = 0; m < 24; m++) {
    var mes = (11 + m) % 12;
    var verao = (mes === 6 || mes === 7) ? 1.35 : 1;
    var recente = m >= 21 ? 1.18 : 1;
    var total = Math.round(52 * verao * recente + rnd() * 10);
    var melhoria = m / 23 * 0.35; // the Google rating slowly improves over time
    for (var i = 0; i < total; i++) {
      var fonte = pick(['google', 'jira', 'redes'], [46, 29, 25]);
      var canal = fonte === 'google' ? 'Google' : fonte === 'jira' ? 'Jira' : pick(['Facebook', 'Instagram'], [55, 45]);
      var tema = pick(TEMAS.map(function (t) { return t.nome; }), TEMAS.map(function (t) { return t.peso; }));
      var area = pick(AREAS, AREA_PESOS);
      if (m >= 21 && area === 'Aveiras' && rnd() < 0.45) tema = 'Restrooms';
      var estrelas = null, sentimento;
      if (fonte === 'google') {
        estrelas = pick([1, 2, 3, 4, 5], [22 - melhoria * 20, 13, 11, 18, 34 + melhoria * 20]);
        sentimento = estrelas <= 2 ? 'negative' : estrelas === 3 ? 'neutral' : 'positive';
      } else if (fonte === 'jira') {
        sentimento = 'negative';
      } else {
        sentimento = pick(['negative', 'neutral', 'positive'], [56, 25, 19]);
      }
      var gravidade = sentimento !== 'negative' ? 'Low' : (estrelas === 1 || rnd() < 0.13) ? 'High' : pick(['Medium', 'Low'], [70, 30]);
      var respondido = fonte === 'jira' ? rnd() < 0.93 : fonte === 'google' ? rnd() < (0.45 + melhoria * 0.4) : rnd() < 0.72;
      var horas = fonte === 'jira' ? 16 + rnd() * 60 : fonte === 'google' ? 24 + rnd() * 110 : 2 + rnd() * 18;
      MENCOES.push({
        id: (fonte === 'jira' ? 'COL-' : fonte === 'google' ? 'GR-' : 'RS-') + String(1000 + (n++)),
        m: m, dia: 1 + Math.floor(rnd() * (m === 23 ? 23 : 28)) /* Nov 2026 only up to the 23rd */, fonte: fonte, canal: canal, tema: tema,
        area: fonte !== 'redes' || rnd() < 0.35 ? area : null,
        sentimento: sentimento, estrelas: estrelas, gravidade: gravidade,
        respondido: respondido, horas: horas,
        texto: sentimento === 'positive' ? pick(ELOGIOS, [1, 1, 1, 1]) : pick(TEXTOS[tema], TEXTOS[tema].map(function () { return 1; })),
      });
    }
  }

  // Details of each service area (sample)
  var AREA_INFO = {
    'Aveiras':        { via: 'A1', km: 'km 48', sentido: 'Both directions', gestor: 'Marta Sousa', servicos: ['Restaurant', 'Colibri Express', 'Shop', 'EV charging'] },
    'Pombal':         { via: 'A1', km: 'km 155', sentido: 'Both directions', gestor: 'Rui Carvalho', servicos: ['Restaurant', 'Colibri Express', 'Shop'] },
    'Mealhada':       { via: 'A1', km: 'km 211', sentido: 'North–South', gestor: 'Inês Pinto', servicos: ['Restaurant', 'Shop', 'Kids area'] },
    'Leiria':         { via: 'A1', km: 'km 117', sentido: 'Both directions', gestor: 'Tiago Lopes', servicos: ['Restaurant', 'Colibri Express', 'EV charging'] },
    'Santarém':       { via: 'A1', km: 'km 73', sentido: 'South–North', gestor: 'Sara Matos', servicos: ['Restaurant', 'Shop'] },
    'Antuã':          { via: 'A1', km: 'km 262', sentido: 'Both directions', gestor: 'Nuno Faria', servicos: ['Restaurant', 'Colibri Express', 'Shop'] },
    'Alcácer do Sal': { via: 'A2', km: 'km 82', sentido: 'Both directions', gestor: 'Joana Reis', servicos: ['Restaurant', 'Shop', 'Kids area'] },
    'Almodôvar':      { via: 'A2', km: 'km 186', sentido: 'Both directions', gestor: 'Pedro Neves', servicos: ['Restaurant', 'Shop'] },
  };

  // Status and owner of each mention. Separate generator so the numbers above do not change.
  var seed2 = 7;
  function rnd2() { seed2 = (seed2 * 1664525 + 1013904223) % 4294967296; return seed2 / 4294967296; }
  var HOJE = new Date(2026, 10, 24);
  // A praise comment's topic follows what the text says
  var TEMA_ELOGIO = {
    'Everything was clean and the staff were very friendly.': 'Customer service',
    'Quick stop and good coffee.': 'Food and drinks',
    'Much better since the renovation.': 'Dining area',
    'Still the best pastéis de nata on the A1.': 'Food and drinks',
  };
  MENCOES.forEach(function (x) {
    var d = new Date(2024, 11 + x.m, x.dia);
    var dias = Math.round((HOJE - d) / 864e5);
    if (x.respondido) x.estado = dias <= 12 && rnd2() < 0.8 ? 'Replied' : 'Closed';
    else if (dias <= 5) x.estado = rnd2() < 0.7 ? 'New' : 'In review';
    else if (dias <= 30) x.estado = rnd2() < 0.75 ? 'In review' : 'New';
    else if (dias <= 75 && x.sentimento !== 'positive') x.estado = 'In review';
    else x.estado = 'Closed';
    x.responsavel = x.area ? AREA_INFO[x.area].gestor : 'CX Team';
    if (x.sentimento === 'positive' && TEMA_ELOGIO[x.texto]) x.tema = TEMA_ELOGIO[x.texto];
  });

  window.COLIBRI_DADOS = { FONTES: FONTES, AREAS: AREAS, AREA_INFO: AREA_INFO, TEMAS: TEMAS, MENCOES: MENCOES, HOJE: HOJE };
})();
