import { test } from 'node:test';
import assert from 'node:assert/strict';
import { importar } from '../app/js/importadores/index.js';
import { calcularIndicadores } from '../app/js/calculos/indicadores.js';

test('Google Reviews: 1 estrela é negativa e grave', () => {
  const r = importar([{ id: 'GR-1', data: '2026-11-02', local: 'Aveiras', estrelas: '1', texto: 'Casas de banho sem papel.', resposta: '', data_resposta: '' }]);
  assert.equal(r.fonte, 'google');
  assert.equal(r.erros.length, 0);
  const m = r.mencoes[0];
  assert.equal(m.sentimento, 'negativo');
  assert.equal(m.gravidade, 'alta');
  assert.equal(m.tema, 'Instalações sanitárias');
  assert.equal(m.respondido, false);
});

test('Jira: categoria mapeada, tempo de resposta em horas', () => {
  const r = importar([{ 'Chave': 'COL-1', 'Criado': '2026-11-01 09:00', 'Categoria': 'Pagamentos', 'Prioridade': 'Média', 'Estado': 'Resolvido', 'Área de serviço': 'Mealhada', 'Descrição': 'Cobraram duas vezes.', 'Primeira resposta': '2026-11-01 15:00' }]);
  assert.equal(r.fonte, 'jira');
  assert.equal(r.mencoes[0].tema, 'Caixa e pagamento');
  assert.equal(r.mencoes[0].horasAteResposta, 6);
});

test('Redes sociais: elogio é positivo e não conta como reclamação', () => {
  const r = importar([{ id: 'RS-1', data: '2026-11-07 16:48', rede: 'Instagram', tipo: 'Comentário', texto: 'Adoro os pastéis de nata!', respondido: 'não', data_resposta: '' }]);
  assert.equal(r.fonte, 'redes');
  assert.equal(r.mencoes[0].sentimento, 'positivo');
  assert.equal(calcularIndicadores(r.mencoes).reclamacoes, 0);
});

test('Colunas desconhecidas dão erro legível', () => {
  const r = importar([{ a: 1, b: 2 }]);
  assert.equal(r.fonte, null);
  assert.match(r.erros[0].motivo, /Colunas não reconhecidas/);
});

test('Linha com data inválida é reportada, as outras entram', () => {
  const base = { local: 'Pombal', estrelas: '5', texto: 'Bom.', resposta: '', data_resposta: '' };
  const r = importar([{ id: 'A', data: '2026-11-01', ...base }, { id: 'B', data: 'ontem', ...base }]);
  assert.equal(r.mencoes.length, 1);
  assert.equal(r.erros[0].linha, 3);
});
