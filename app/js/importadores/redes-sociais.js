// Facebook e Instagram (export da Meta Business Suite).
// Colunas esperadas: ver dados/exemplos/redes-sociais.csv
import { criarMencao, lerData, horasEntre } from '../modelo/mencao.js';
import { classificarTema, sentimentoPorTexto, classificarGravidade } from '../modelo/taxonomia.js';

export const fonte = 'redes';
const OBRIGATORIAS = ['id', 'data', 'rede', 'texto', 'respondido'];

export function reconhece(colunas) {
  return OBRIGATORIAS.every(c => colunas.includes(c));
}

export function converter(linha) {
  const sentimento = sentimentoPorTexto(linha.texto);
  const respondido = ['sim', 'yes', 'true', '1'].includes(String(linha.respondido).trim().toLowerCase());
  return criarMencao({
    id: linha.id,
    fonte,
    canal: linha.rede,
    data: linha.data,
    area: null,
    texto: linha.texto,
    sentimento,
    tema: classificarTema(linha.texto),
    gravidade: classificarGravidade({ sentimento, texto: linha.texto }),
    respondido,
    horasAteResposta: respondido ? horasEntre(lerData(linha.data), lerData(linha.data_resposta)) : null,
  });
}
