# Protótipo v3 · Produto com navegação lateral

Segunda proposta da interface, organizada como um produto de trabalho e não como uma página de relatório. Base neutra do Design System Grupo Brisa, com o rosa Colibri só para ações e marca, e as cores das fontes só nos logótipos e nas barras.

**Dados fictícios**, gerados em `js/dados-ficticios.js`. A interface está em inglês; o aviso de dados fictícios saiu do ecrã mas continua aqui e no código.

## Como abrir

Abrir `index.html` no browser (funciona com duplo clique, sem servidor). Também está publicado no GitHub Pages do repositório.

## Ecrãs

| Ecrã | Endereço | O que tem |
| --- | --- | --- |
| Visão geral | `#/overview` | Cartões com número, variação e gráfico (reclamações, menções por fonte, rating Google), última atividade; áreas de serviço, respostas por mês e temas; sinal principal (área × tema) com a média das áreas, voz do cliente e casos por tratar |
| Casos | `#/cases` | Tabela agrupada por estado, área, fonte ou tema; pesquisa e filtros; painel lateral com histórico, mudança de estado e modelo de resposta |
| Áreas de serviço | `#/areas` | Tabela comparativa das áreas e mapa de calor área × tema |
| Ficha da área | `#/areas/<nome>` | Ficha (autoestrada, responsável, serviços), casos por tratar, resumo com variação, temas face à média das áreas, evolução mensal, comentários recentes |
| Fontes | `#/sources` | De onde vêm os dados, carregamento de ficheiros e regras de classificação |

O período e a área de serviço escolhidos no topo aplicam-se a todos os ecrãs.

## Cores

- Verde para o que é bom (desce o número de reclamações, sobe o rating), vermelho para o que é mau, cinzento quando é neutro.
- Rosa Colibri só no logótipo, no ecrã de carregamento e no botão da ação principal. Navegação, gráficos e mapa de calor em neutros.
- Avisos (toasts): verde com visto quando algo correu bem, vermelho com cruz quando falhou.

## Menus dos filtros

Os filtros usam menus desenhados pelo site e não a lista do browser. Seguem o padrão *select-only combobox* do W3C ARIA Authoring Practices: setas, Enter, Espaço, Esc, Home, End, Tab e escrever as primeiras letras. O `<select>` nativo continua escondido na página como fonte do valor. Não usamos ainda `appearance: base-select` porque o Firefox não o suporta.

## Organizar a Visão geral

- Carregar em **Arrange**, ou manter o dedo/rato premido num bloco, para entrar em modo de edição (os blocos tremem).
- Arrastar um bloco para o lugar de outro.
- **Done** ou `Esc` para sair. **Reset order** volta à ordem original.
- A ordem fica guardada neste browser (`localStorage`).

## Carregamento

O ecrã com o colibri a bater as asas só aparece se o carregamento real (scripts, tipos de letra, imagens) demorar mais de 0,3 s. Não há tempo de espera artificial.

## Referências

- Organização: navegação lateral agrupada e base neutra (kits shadcn/ui), tabela agrupada com estados a cheio (monday.com), ficha de entidade com ações pendentes em destaque (aplicações de RH).
- Componentes: sinal que liga causa e efeito e citação em serif (Officevibe); cartões tingidos com número, variação em pílula escura e mini gráfico, filtros e botões em pílula (dashboards de e-commerce).
- Movimento: painel do caso desliza da direita, páginas entram com fade, barras e anel crescem a partir de zero. Respeita `prefers-reduced-motion`.
- Gráficos: ECharts 5.5 (SVG). Barras simples, barra dividida e barras de temas em HTML/CSS.
- Cores das fontes lisas: Google azul, Jira roxo, redes sociais rosa.

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
