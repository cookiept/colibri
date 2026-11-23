// Reclamações Jira (filtro guardado → Export CSV).
// Colunas esperadas: ver dados/exemplos/jira-reclamacoes.csv
import { criarMencao, lerData, horasEntre } from '../modelo/mencao.js';
import { temaDaCategoriaJira, classificarGravidade } from '../modelo/taxonomia.js';

export const fonte = 'jira';
const OBRIGATORIAS = ['Chave', 'Criado', 'Categoria', 'Prioridade', 'Estado', 'Descrição'];

export function reconhece(colunas) {
  return OBRIGATORIAS.every(c => colunas.includes(c));
}

export function converter(linha) {
  const criado = lerData(linha['Criado']);
  const primeira = lerData(linha['Primeira resposta']);
  return criarMencao({
    id: linha['Chave'],
    fonte,
    canal: 'Jira',
    data: criado,
    area: linha['Área de serviço'],
    texto: linha['Descrição'],
    sentimento: 'negativo',
    tema: temaDaCategoriaJira(linha['Categoria'], linha['Descrição']),
    gravidade: classificarGravidade({ sentimento: 'negativo', texto: linha['Descrição'], prioridade: linha['Prioridade'] }),
    respondido: Boolean(primeira) || String(linha['Estado']).toLowerCase() === 'resolvido',
    horasAteResposta: horasEntre(criado, primeira),
  });
}
