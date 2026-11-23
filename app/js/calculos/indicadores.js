// Indicadores. Documentação: docs/05-indicadores.md

export function calcularIndicadores(mencoes) {
  const negativas = mencoes.filter(m => m.sentimento === 'negativo');
  const google = mencoes.filter(m => m.fonte === 'google' && m.estrelas != null);
  const pedemResposta = mencoes.filter(m => m.sentimento !== 'positivo');
  const respondidas = pedemResposta.filter(m => m.respondido);
  const comTempo = respondidas.filter(m => m.horasAteResposta != null);
  const media = (arr, f) => (arr.length ? arr.reduce((s, x) => s + f(x), 0) / arr.length : null);
  return {
    reclamacoes: negativas.length,
    ratingGoogle: media(google, m => m.estrelas),
    respondidas: pedemResposta.length ? (respondidas.length / pedemResposta.length) * 100 : null,
    horasAteResposta: media(comTempo, m => m.horasAteResposta),
    gravesSemResposta: negativas.filter(m => m.gravidade === 'alta' && !m.respondido).length,
  };
}

export function contarPorTema(mencoes) {
  const mapa = new Map();
  mencoes.filter(m => m.sentimento === 'negativo').forEach(m => mapa.set(m.tema, (mapa.get(m.tema) ?? 0) + 1));
  return [...mapa.entries()].map(([tema, n]) => ({ tema, n })).sort((a, b) => b.n - a.n);
}
