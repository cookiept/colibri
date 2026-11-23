// Escolhe o importador certo pelas colunas do ficheiro.
import * as google from './google-reviews.js';
import * as jira from './jira.js';
import * as redes from './redes-sociais.js';

const IMPORTADORES = [google, jira, redes];

/**
 * @param {object[]} linhas linhas do ficheiro, como objetos coluna → valor
 * @returns {{ fonte: string|null, mencoes: object[], erros: {linha:number, motivo:string}[] }}
 */
export function importar(linhas) {
  if (!linhas.length) return { fonte: null, mencoes: [], erros: [{ linha: 0, motivo: 'O ficheiro não tem linhas.' }] };
  const colunas = Object.keys(linhas[0]);
  const imp = IMPORTADORES.find(i => i.reconhece(colunas));
  if (!imp) {
    return { fonte: null, mencoes: [], erros: [{ linha: 0, motivo: `Colunas não reconhecidas: ${colunas.join(', ')}. Ver docs/02-fontes-de-dados.md.` }] };
  }
  const mencoes = [], erros = [];
  linhas.forEach((l, i) => {
    try { mencoes.push(imp.converter(l)); } catch (e) { erros.push({ linha: i + 2, motivo: e.message }); }
  });
  return { fonte: imp.fonte, mencoes, erros };
}
