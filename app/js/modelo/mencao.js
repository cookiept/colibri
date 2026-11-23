// Modelo comum: uma "menção" é uma review, um ticket ou um comentário.
// Documentação: docs/03-modelo-de-dados.md

export const FONTES = Object.freeze({
  google: { id: 'google', nome: 'Google Reviews' },
  jira: { id: 'jira', nome: 'Reclamações Jira' },
  redes: { id: 'redes', nome: 'Facebook e Instagram' },
});

export const SENTIMENTOS = ['negativo', 'neutro', 'positivo'];
export const GRAVIDADES = ['alta', 'media', 'baixa'];

/** Converte texto ou Date numa Date válida, ou devolve null. */
export function lerData(valor) {
  if (valor == null || valor === '') return null;
  if (valor instanceof Date) return isNaN(valor) ? null : valor;
  const d = new Date(String(valor).trim().replace(' ', 'T'));
  return isNaN(d) ? null : d;
}

/** Horas entre duas datas, ou null se faltar alguma. */
export function horasEntre(inicio, fim) {
  if (!inicio || !fim) return null;
  const h = (fim - inicio) / 36e5;
  return h >= 0 ? h : null;
}

/**
 * Cria uma menção validada. Lança erro se faltar um campo obrigatório,
 * para que o importador possa reportar a linha com problema.
 */
export function criarMencao(campos) {
  const m = {
    id: String(campos.id ?? '').trim(),
    fonte: campos.fonte,
    canal: campos.canal ?? FONTES[campos.fonte]?.nome ?? '',
    data: lerData(campos.data),
    area: campos.area ? String(campos.area).trim() : null,
    texto: String(campos.texto ?? '').trim(),
    estrelas: campos.estrelas != null && campos.estrelas !== '' ? Number(campos.estrelas) : null,
    sentimento: campos.sentimento,
    tema: campos.tema,
    gravidade: campos.gravidade,
    respondido: Boolean(campos.respondido),
    horasAteResposta: campos.horasAteResposta ?? null,
  };
  if (!m.id) throw new Error('Falta o identificador');
  if (!FONTES[m.fonte]) throw new Error(`Fonte desconhecida: ${m.fonte}`);
  if (!m.data) throw new Error('Data em falta ou inválida');
  if (!SENTIMENTOS.includes(m.sentimento)) throw new Error(`Sentimento inválido: ${m.sentimento}`);
  if (!GRAVIDADES.includes(m.gravidade)) throw new Error(`Gravidade inválida: ${m.gravidade}`);
  return Object.freeze(m);
}
