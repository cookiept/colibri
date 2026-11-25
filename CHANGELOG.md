# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-PT/1.1.0/).

## [Por lançar]

### Alterado
- v3: gráficos da Visão geral revistos pelo tipo de dado. Rating Google e What changed com eixo marcado e período sombreado; colunas de reclamações com valor ao passar o rato; contagens na legenda das fontes e nas áreas; taxa de resposta no gráfico de respostas.
- v3: "What customers say" passa a "Latest comments" (os três comentários mais recentes, de qualquer sentimento). Comentários e título de What changed na letra sem serifa da interface, sem aspas decorativas.
- v3: ícone de casa de banho no tema Restrooms.
- v3: um só sistema de cor. Verde Colibri nos dados e na navegação, rosa na marca e na ação principal. Logótipo recortado e maior.
- v3: Visão geral só com análise. O sinal passa a "What changed" a toda a largura e a voz do cliente a três citações lado a lado; "To handle" passa para o topo de Cases e filtra a tabela.
- v3: variações a verde quando são boas e a vermelho quando são más; rosa Colibri só na marca e na ação principal; aviso de dados fictícios retirado do ecrã.

### Corrigido
- v3: o gráfico "Replies by month" ocupa a altura toda do bloco e acaba alinhado com Service areas e Topics.
- v3: a página ocupa toda a largura do ecrã (sem bloco branco à direita).

### Adicionado
- v3: em Sources, o que a API de cada plataforma permite tirar, o que é preciso para ligar e o que não está disponível.
- v3: pesquisa, filtros (autoestrada, serviço, casos por tratar) e ordenação em Service areas.
- v3: exportar a Visão geral para PowerPoint editável (PptxGenJS 3.12, MIT, em `prototipos/v3/js/vendor/`).
- v3: interface em inglês (textos, dados de exemplo e endereços `#/overview`, `#/cases`, `#/sources`).
- v3: menus próprios nos filtros (padrão W3C ARIA select-only combobox) em vez da lista do browser.
- v3: última atividade em cartões com botão View e filtro por fonte; avisos verdes com visto e vermelhos com cruz.
- v3: ecrã de carregamento com o colibri, só durante carregamento real.
- v3: blocos da Visão geral reorganizáveis a arrastar, com ordem guardada no browser.
- Protótipo v3 com navegação lateral, casos, fichas das áreas de serviço e fontes (`prototipos/v3/`). A página inicial do GitHub Pages abre esta versão.
- Protótipo v2 da interface de resultados e comentários (`prototipos/v2/`).
- Logótipos SVG das fontes (Google, Jira, Facebook, Instagram) em `app/assets/icones/fontes/`.
- Estrutura inicial do repositório: app, documentação, dados de exemplo, protótipos e testes.
- Draft visual v1 do ecrã de feedback (`prototipos/draft-v1/`).
