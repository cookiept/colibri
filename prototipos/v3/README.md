# Protótipo v3 · Produto com navegação lateral

Segunda proposta da interface, organizada como um produto de trabalho e não como uma página de relatório. Base neutra do Design System Grupo Brisa, com o rosa Colibri só para ações e marca, e as cores das fontes só nos logótipos e nas barras.

**Dados fictícios**, gerados em `js/dados-ficticios.js`. A interface está em inglês; o aviso de dados fictícios saiu do ecrã mas continua aqui e no código.

## Como abrir

Abrir `index.html` no browser (funciona com duplo clique, sem servidor). Também está publicado no GitHub Pages do repositório.

## Ecrãs

| Ecrã | Endereço | O que tem |
| --- | --- | --- |
| Visão geral | `#/overview` | Cartões com número, variação e gráfico (reclamações, menções por fonte, rating Google) e última atividade; áreas de serviço, respostas por mês e temas; "What changed" a toda a largura (gráfico da área × tema contra a média, e outras mudanças ao lado); "Latest comments" com os três comentários mais recentes (reclamação, neutro ou elogio). Botão **Export to PowerPoint** |
| Casos | `#/cases` | Faixa "To handle" (New, In review, High severity) que filtra a tabela ao clicar; tabela agrupada por estado, área, fonte ou tema; pesquisa e filtros; painel lateral com histórico, mudança de estado e modelo de resposta |
| Áreas de serviço | `#/areas` | Pesquisa por área ou responsável; filtros por autoestrada, serviço e casos por tratar; ordenação (reclamações, rating Google, por tratar, nome). A tabela e o mapa de calor área × tema mostram só as áreas que passam nos filtros |
| Ficha da área | `#/areas/<nome>` | Ficha (autoestrada, responsável, serviços), casos por tratar, resumo com variação, temas face à média das áreas, evolução mensal, comentários recentes |
| Fontes | `#/sources` | De onde vêm os dados; o que a API de cada plataforma permite tirar (Jira, avaliações Google, Facebook, Instagram), o que é preciso e o que não dá, verificado na documentação oficial a 25 nov 2026; carregamento de ficheiros e regras de classificação |

O período e a área de serviço escolhidos no topo aplicam-se a todos os ecrãs.

## Cores

- Verde para o que é bom (desce o número de reclamações, sobe o rating), vermelho para o que é mau, cinzento quando é neutro.
- Verde Colibri (#005555, do Design System Grupo Brisa) para os dados, a navegação e as ações secundárias: gráficos, barras, mapa de calor, ícones, item ativo do menu.
- Rosa Colibri (#B62454) só no logótipo, no ecrã de carregamento e no botão da ação principal.
- Cinzento só para texto, fundos e linhas de comparação (por exemplo a média das áreas).
- Avisos (toasts): verde com visto quando algo correu bem, vermelho com cruz quando falhou.

## Tipo de gráfico por cartão

Cada cartão da Visão geral foi revisto pelo tipo de dado que mostra:

| Cartão | Dado | Forma | Porquê |
| --- | --- | --- | --- |
| Complaints | Contagem por mês | Colunas | Contagens de períodos fechados comparam-se melhor em colunas do que numa linha, que sugere continuidade entre meses. Valor de cada mês ao passar o rato |
| Mentions by source | Um todo em 3 partes | Barra segmentada | Uma divisão vista de relance, com as contagens na legenda |
| Google rating | Média por mês | Linha | Valor contínuo ao longo do tempo. Eixo com escala marcada (passos de 0,5) para não exagerar variações pequenas; período escolhido sombreado |
| Latest activity | Eventos recentes | Lista | Não é um gráfico |
| Service areas | Ranking de 5 áreas | Barras horizontais ordenadas | Comparar partes entre si; percentagem e número |
| Replies by month | Respondido / sem resposta por mês | Colunas empilhadas | Divisão a mudar ao longo do tempo; taxa de resposta no tooltip |
| Topics | Várias medidas por tema | Tabela | Mais do que uma medida por linha |
| What changed | Uma série contra a média | Linha em destaque e média a cinzento | A série que importa a cor, o contexto a cinzento; eixo marcado e período sombreado |
| Topics by area | Grelha área × tema | Mapa de calor numa só cor | Magnitude numa grelha |

## Exportar para PowerPoint

**Export to PowerPoint** na Visão geral cria um `.pptx` com 7 diapositivos (capa, números principais, fontes e áreas, respostas, temas, What changed, comentários recentes) para o período e a área escolhidos. Os gráficos são gráficos nativos do PowerPoint (dados editáveis em Excel), as tabelas são tabelas e os textos são caixas de texto. Usa a biblioteca PptxGenJS 3.12 (licença MIT), guardada em `js/vendor/` para funcionar sem internet; só é carregada quando se carrega no botão.

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
- Componentes: sinal que liga causa e efeito (Officevibe); comentários na mesma letra sem serifa da interface, sem aspas decorativas; cartões tingidos com número, variação em pílula escura e mini gráfico, filtros e botões em pílula (dashboards de e-commerce).
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
│   ├── app.js
│   └── vendor/      PptxGenJS 3.12 (MIT) e a sua licença
└── assets/
    ├── colibri-logo.png
    └── logos/           Simple Icons (CC0)
```
