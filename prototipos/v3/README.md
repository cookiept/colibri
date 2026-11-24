# Protótipo v3 · Produto com navegação lateral

Segunda proposta da interface, organizada como um produto de trabalho e não como uma página de relatório. Base neutra do Design System Grupo Brisa, com o rosa Colibri só para ações e marca, e as cores das fontes só nos logótipos e nas barras.

**Dados fictícios**, gerados em `js/dados-ficticios.js`.

## Como abrir

Abrir `index.html` no browser (funciona com duplo clique, sem servidor). Também está publicado no GitHub Pages do repositório.

## Ecrãs

| Ecrã | Endereço | O que tem |
| --- | --- | --- |
| Visão geral | `#/visao-geral` | Rating Google em anel e evolução; temas "Onde focar" e "A correr bem"; sinal principal (área × tema) com a média das áreas; voz do cliente; áreas com mais reclamações; reclamações por fonte |
| Casos | `#/casos` | Tabela agrupada por estado, área, fonte ou tema; pesquisa e filtros; painel lateral com histórico, mudança de estado e modelo de resposta |
| Áreas de serviço | `#/areas` | Tabela comparativa das áreas e mapa de calor área × tema |
| Ficha da área | `#/areas/<nome>` | Ficha (autoestrada, responsável, serviços), casos por tratar, resumo com variação, temas face à média das áreas, evolução mensal, comentários recentes |
| Fontes | `#/fontes` | De onde vêm os dados, carregamento de ficheiros e regras de classificação |

O período e a área de serviço escolhidos no topo aplicam-se a todos os ecrãs.

## Referências

- Organização: navegação lateral agrupada e base neutra (kits shadcn/ui), tabela agrupada com estados a cheio (monday.com), ficha de entidade com ações pendentes em destaque (aplicações de RH).
- Componentes: sinal que liga causa e efeito, filas de temas com chips e citação em serif (Officevibe).

## Ficheiros

```
v3/
├── index.html
├── css/app.css
├── js/
│   ├── dados-ficticios.js
│   └── app.js
└── assets/
    ├── colibri-logo.png
    └── logos/           Simple Icons (CC0)
```
