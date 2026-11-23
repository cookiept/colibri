// Google Reviews (export do Google Business Profile).
// Colunas esperadas: ver dados/exemplos/google-reviews.csv
import { criarMencao, lerData, horasEntre } from '../modelo/mencao.js';
import { classificarTema, sentimentoPorEstrelas, classificarGravidade } from '../modelo/taxonomia.js';

export const fonte = 'google';
const OBRIGATORIAS = ['id', 'data', 'local', 'estrelas', 'texto'];

export function reconhece(colunas) {
  return OBRIGATORIAS.every(c => colunas.includes(c));
}

export function converter(linha) {
  const estrelas = Number(linha.estrelas);
  const sentimento = sentimentoPorEstrelas(estrelas);
  const respondido = Boolean(String(linha.resposta ?? '').trim());
  return criarMencao({
    id: linha.id,
    fonte,
    canal: 'Google',
    data: linha.data,
    area: linha.local,
    texto: linha.texto,
    estrelas,
    sentimento,
    tema: classificarTema(linha.texto),
    gravidade: classificarGravidade({ sentimento, estrelas, texto: linha.texto }),
    respondido,
    horasAteResposta: respondido ? horasEntre(lerData(linha.data), lerData(linha.data_resposta)) : null,
  });
}
