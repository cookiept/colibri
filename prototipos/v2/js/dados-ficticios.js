/* Dados fictícios para o protótipo v2.
   Gerados de forma determinística: os números são sempre os mesmos ao recarregar.
   Não representam a Colibri. */
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
    { id: 'jira', nome: 'Reclamações Jira', curto: 'Jira', logo: 'assets/logos/jira.svg', canais: ['Jira'] },
    { id: 'redes', nome: 'Facebook e Instagram', curto: 'Redes sociais', logo: 'assets/logos/instagram.svg', canais: ['Facebook', 'Instagram'] },
  ];

  var AREAS = ['Aveiras', 'Pombal', 'Mealhada', 'Leiria', 'Santarém', 'Antuã', 'Alcácer do Sal', 'Almodôvar'];
  var AREA_PESOS = [16, 14, 13, 12, 11, 10, 9, 7];

  // nome, peso, NPS VoC do driver (fictício), nome curto, ícone
  var TEMAS = [
    { nome: 'Instalações sanitárias', peso: 17, nps: 14, curto: 'Sanitários', icone: 'gota' },
    { nome: 'Serviço/Atendimento', peso: 15, nps: 33, curto: 'Atendimento', icone: 'pessoa' },
    { nome: 'Alimentação e bebidas', peso: 13, nps: 27, curto: 'Alimentação', icone: 'chavena' },
    { nome: 'Preço', peso: 12, nps: null, curto: 'Preço', icone: 'euro' },
    { nome: 'Caixa e pagamento', peso: 9, nps: 38, curto: 'Caixa', icone: 'cartao' },
    { nome: 'Chegada e estacionamento', peso: 7, nps: 41, curto: 'Estacionamento', icone: 'parque' },
    { nome: 'Zona de refeição', peso: 6, nps: 30, curto: 'Refeição', icone: 'mesa' },
    { nome: 'Máquinas de vending', peso: 5, nps: 19, curto: 'Vending', icone: 'caixa' },
    { nome: 'Reembolsos e faturação', peso: 5, nps: null, curto: 'Reembolsos', icone: 'recibo' },
    { nome: 'Serviço Colibri Express', peso: 3, nps: 45, curto: 'Express', icone: 'raio' },
    { nome: 'Espaços infantis', peso: 3, nps: 36, curto: 'Infantil', icone: 'estrela' },
    { nome: 'Produtos', peso: 3, nps: 40, curto: 'Produtos', icone: 'saco' },
  ];

  var TEXTOS = {
    'Instalações sanitárias': ['Casas de banho sem papel e com mau cheiro às 8h da manhã.', 'Só uma casa de banho a funcionar, as outras fechadas para limpeza.', 'Secadores de mãos avariados há semanas.', 'Chão molhado e sem sinalização, quase escorreguei.'],
    'Serviço/Atendimento': ['Fila de 15 pessoas e só uma funcionária no balcão do café.', 'Perguntei onde ficava o carregador elétrico e ninguém soube dizer.', 'Atendimento pouco simpático, nem um bom dia.'],
    'Alimentação e bebidas': ['Sandes seca e café frio.', 'A sopa veio morna e sem sabor.', 'Quase nenhuma opção vegetariana ao almoço.'],
    'Preço': ['4,20 € por uma garrafa de água de 1,5 L.', 'Um menu simples a 14 € é demasiado.', 'Os preços estão muito acima de qualquer café na cidade.'],
    'Caixa e pagamento': ['Cobraram duas vezes no cartão e ainda não devolveram.', 'Só uma caixa aberta num domingo de agosto.', 'O multibanco não funcionava e não aceitavam MB Way.'],
    'Chegada e estacionamento': ['Lugares de ligeiros ocupados por camiões.', 'Não há lugares para autocaravanas.', 'A sinalética à entrada da área é confusa.'],
    'Zona de refeição': ['Mesas todas por limpar à hora de almoço.', 'Ar condicionado desligado com 38 graus lá fora.', 'Barulho e nenhum lugar livre.'],
    'Máquinas de vending': ['A máquina ficou com as moedas e não deu o produto.', 'Vending sem stock durante a noite.', 'A máquina de café não aceita cartão.'],
    'Reembolsos e faturação': ['Pedi fatura com NIF e não foi emitida.', 'Estou há três semanas à espera do reembolso.', 'O talão tinha um valor diferente do cobrado.'],
    'Serviço Colibri Express': ['O Express estava fechado dentro do horário anunciado.', 'Demorou mais do que o balcão normal.', 'Pedido do Express veio errado.'],
    'Espaços infantis': ['Parque infantil com um baloiço partido.', 'Zona infantil suja e sem vigilância.', 'O muda-fraldas só existe na casa de banho feminina.'],
    'Produtos': ['O produto da promoção não existia na loja.', 'Prateleiras vazias à noite.', 'Pouca variedade de produtos regionais.'],
  };
  var ELOGIOS = ['Tudo limpo e o staff foi muito simpático.', 'Paragem rápida e café bom.', 'Desde as obras ficou muito melhor.', 'Os pastéis de nata continuam os melhores da A1.'];

  // 24 meses: m = 0 é dez 2024, m = 23 é nov 2026
  var MENCOES = [];
  var n = 0;
  for (var m = 0; m < 24; m++) {
    var mes = (11 + m) % 12;
    var verao = (mes === 6 || mes === 7) ? 1.35 : 1;
    var recente = m >= 21 ? 1.18 : 1;
    var total = Math.round(52 * verao * recente + rnd() * 10);
    var melhoria = m / 23 * 0.35; // o rating Google melhora devagar ao longo do tempo
    for (var i = 0; i < total; i++) {
      var fonte = pick(['google', 'jira', 'redes'], [46, 29, 25]);
      var canal = fonte === 'google' ? 'Google' : fonte === 'jira' ? 'Jira' : pick(['Facebook', 'Instagram'], [55, 45]);
      var tema = pick(TEMAS.map(function (t) { return t.nome; }), TEMAS.map(function (t) { return t.peso; }));
      var area = pick(AREAS, AREA_PESOS);
      if (m >= 21 && area === 'Aveiras' && rnd() < 0.45) tema = 'Instalações sanitárias';
      var estrelas = null, sentimento;
      if (fonte === 'google') {
        estrelas = pick([1, 2, 3, 4, 5], [22 - melhoria * 20, 13, 11, 18, 34 + melhoria * 20]);
        sentimento = estrelas <= 2 ? 'negativo' : estrelas === 3 ? 'neutro' : 'positivo';
      } else if (fonte === 'jira') {
        sentimento = 'negativo';
      } else {
        sentimento = pick(['negativo', 'neutro', 'positivo'], [56, 25, 19]);
      }
      var gravidade = sentimento !== 'negativo' ? 'Baixa' : (estrelas === 1 || rnd() < 0.13) ? 'Alta' : pick(['Média', 'Baixa'], [70, 30]);
      var respondido = fonte === 'jira' ? rnd() < 0.93 : fonte === 'google' ? rnd() < (0.45 + melhoria * 0.4) : rnd() < 0.72;
      var horas = fonte === 'jira' ? 16 + rnd() * 60 : fonte === 'google' ? 24 + rnd() * 110 : 2 + rnd() * 18;
      MENCOES.push({
        id: (fonte === 'jira' ? 'COL-' : fonte === 'google' ? 'GR-' : 'RS-') + String(1000 + (n++)),
        m: m, dia: 1 + Math.floor(rnd() * (m === 23 ? 23 : 28)) /* nov 2026 só até dia 23 */, fonte: fonte, canal: canal, tema: tema,
        area: fonte !== 'redes' || rnd() < 0.35 ? area : null,
        sentimento: sentimento, estrelas: estrelas, gravidade: gravidade,
        respondido: respondido, horas: horas,
        texto: sentimento === 'positivo' ? pick(ELOGIOS, [1, 1, 1, 1]) : pick(TEXTOS[tema], TEXTOS[tema].map(function () { return 1; })),
      });
    }
  }

  window.COLIBRI_DADOS = { FONTES: FONTES, AREAS: AREAS, TEMAS: TEMAS, MENCOES: MENCOES };
})();
