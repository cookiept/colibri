// Ponto de entrada: lê os ficheiros, converte para menções e mostra um resumo.
import { importar } from './importadores/index.js';
import { calcularIndicadores, contarPorTema } from './calculos/indicadores.js';
import { FONTES } from './modelo/mencao.js';

const estado = { google: [], jira: [], redes: [] };
const $ = id => document.getElementById(id);
const nf = (n, d = 0) => (n == null ? '–' : n.toLocaleString('pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d }));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function lerLinhas(ficheiro) {
  const buffer = await ficheiro.arrayBuffer();
  const livro = XLSX.read(buffer, { type: 'array', cellDates: true, codepage: 65001 });
  const folha = livro.Sheets[livro.SheetNames[0]];
  return XLSX.utils.sheet_to_json(folha, { defval: '', raw: false, dateNF: 'yyyy-mm-dd hh:mm' });
}

async function aoEscolher(evento) {
  const input = evento.target;
  const esperado = input.dataset.fonte;
  const caixa = $('e-' + esperado);
  const ficheiro = input.files[0];
  if (!ficheiro) return;
  try {
    const { fonte, mencoes, erros } = importar(await lerLinhas(ficheiro));
    if (fonte !== esperado) {
      caixa.className = 'estado erro';
      caixa.textContent = fonte
        ? `Este ficheiro parece ser de ${FONTES[fonte].nome}. Carregue-o no campo certo.`
        : erros[0]?.motivo ?? 'Ficheiro não reconhecido.';
      return;
    }
    estado[fonte] = mencoes;
    caixa.className = erros.length ? 'estado erro' : 'estado ok';
    caixa.textContent = `${nf(mencoes.length)} linhas lidas` + (erros.length ? `, ${erros.length} com problemas (1.ª: linha ${erros[0].linha}, ${erros[0].motivo})` : '');
    desenhar();
  } catch (e) {
    caixa.className = 'estado erro';
    caixa.textContent = 'Não foi possível ler o ficheiro: ' + e.message;
  }
}

function desenhar() {
  const todas = [...estado.google, ...estado.jira, ...estado.redes];
  $('vazio').hidden = todas.length > 0;
  $('resumo').hidden = todas.length === 0;
  if (!todas.length) return;
  const k = calcularIndicadores(todas);
  const M = (rotulo, valor) => `<div class="metric"><div class="k">${rotulo}</div><div class="v tnum">${valor}</div></div>`;
  $('metrics').innerHTML = [
    M('Reclamações', nf(k.reclamacoes)),
    M('Rating Google', k.ratingGoogle == null ? '–' : nf(k.ratingGoogle, 1) + ' / 5'),
    M('Respondidas', k.respondidas == null ? '–' : nf(k.respondidas) + '%'),
    M('Tempo até à 1.ª resposta', k.horasAteResposta == null ? '–' : nf(k.horasAteResposta) + ' h'),
    M('Graves sem resposta', nf(k.gravesSemResposta)),
  ].join('');
  $('temas').innerHTML = contarPorTema(todas).map(t => `<tr><td>${esc(t.tema)}</td><td class="r tnum">${t.n}</td></tr>`).join('');
}

document.querySelectorAll('input[type=file]').forEach(i => i.addEventListener('change', aoEscolher));
