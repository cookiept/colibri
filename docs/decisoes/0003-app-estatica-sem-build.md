# 0003 · App estática em HTML, CSS e JavaScript, sem passo de build

- **Estado:** Proposta
- **Data:** 2026-11-23

## Contexto

A equipa mantém o Stater com HTML, CSS e JavaScript simples e publica no GitHub Pages. Um passo de build (npm, bundler) exige ferramentas instaladas em todos os computadores.

## Decisão

Ficheiros servidos tal como estão, com módulos ES nativos. Bibliotecas externas (Apache ECharts, SheetJS) carregadas de CDN com versão fixa.

## Consequências

- Qualquer pessoa da equipa abre e edita sem instalar nada.
- Sem minificação nem verificação de tipos; compensar com testes simples em `testes/`.
