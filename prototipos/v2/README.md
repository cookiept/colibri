# Protótipo v2 · Resultados

Proposta da interface de resultados com o Design System Grupo Brisa e as cores Colibri. Componentes e ambiente inspirados na Officevibe (Workleap): cartões brancos suaves sobre fundo quente, anel de pontuação, sinais com ação, chips de métrica e feed de comentários.

**Dados fictícios**, gerados em `js/dados-ficticios.js`.

## Como abrir

Abrir `index.html` no browser (funciona com duplo clique, sem servidor).

## O que tem

**Resultados**
- Rating médio no Google em anel, com a evolução dos últimos 12 meses.
- Resumo do período, gerado por regras fixas.
- 4 indicadores: reclamações, % respondidas, tempo até à 1.ª resposta, graves sem resposta.
- Sinais: o tema/área que mais subiu, casos graves sem resposta, a fonte mais lenta a responder. Cada um abre os casos.
- Onde focar e onde está a correr bem, com o NPS VoC do mesmo driver.
- Reclamações por mês e por fonte, com as cores de cada marca (Google, Jira, degradê do Instagram).
- Mapa de calor área de serviço × tema.

**Comentários**
- Feed com filtros por estado, fonte, gravidade e tema.
- "Preparar resposta" abre um modelo de resposta por tema, para copiar e enviar na ferramenta de origem.

## Ficheiros

```
v2/
├── index.html
├── css/prototipo.css        tokens + componentes
├── js/dados-ficticios.js    gerador de dados de exemplo
├── js/prototipo.js          lógica dos dois ecrãs
└── assets/                  logótipo Colibri e logótipos das fontes (SVG)
```
