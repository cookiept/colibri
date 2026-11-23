# Colibri · Feedback de Clientes

Vista única das reclamações dos clientes da Colibri, com dados de três fontes:

| Fonte | O que traz | Como entra |
| --- | --- | --- |
| Google Reviews | Estrelas, texto, área de serviço, resposta | Export do Google Business Profile |
| Reclamações (Jira) | Ticket, categoria, prioridade, estado, descrição | Export CSV de um filtro guardado |
| Facebook e Instagram | Comentários e mensagens, resposta da marca | Export da Meta Business Suite |

A aplicação é estática (HTML, CSS e JavaScript, sem servidor). Os ficheiros são lidos no browser de quem os carrega e **os dados nunca saem do computador**, tal como no Stater.

**Estado:** fase 1, até ao final de dezembro de 2026. Objetivo: mostrar como ficariam os dados, com ficheiros de exemplo fictícios. As ligações diretas às fontes ficam para uma fase seguinte.

## Estrutura

```
.
├── app/                    Aplicação (o que é publicado)
│   ├── index.html
│   ├── css/                tokens.css (cores e tipografia do DS), base.css
│   ├── js/
│   │   ├── importadores/   Um ficheiro por fonte: lê o export e converte para o modelo comum
│   │   ├── modelo/         Modelo comum de menção e taxonomia de temas
│   │   ├── calculos/       KPIs e agregações
│   │   └── visualizacoes/  Gráficos e tabelas do ecrã
│   └── assets/             Logótipos, ícones, imagens
├── dados/
│   └── exemplos/           Ficheiros fictícios, um por fonte, para testar e demonstrar
├── docs/                   Documentação funcional e técnica
│   ├── decisoes/           Registo de decisões (ADR)
│   └── design/             Regras visuais e checklist de qualidade
├── prototipos/             Drafts visuais para discussão (não são a app)
└── testes/                 Testes e ficheiros de teste
```

## Como correr

Abrir `app/index.html` no browser, ou servir a pasta `app/` com qualquer servidor estático:

```
npx serve app
```

## Regras do repositório

- **Este repositório é público.** Nunca fazer commit de exports reais, nomes, emails ou telefones de clientes. A pasta `dados/` só aceita ficheiros fictícios (ver [dados/README.md](dados/README.md)).
- Alterações entram por pull request para `main`, com o template em `.github/`.
- Documentação e interface em português de Portugal.
- Antes de pedir revisão de um ecrã, passar a [checklist de qualidade visual](docs/design/checklist-qualidade.md).

## Documentação

Começar por [docs/README.md](docs/README.md).

## Equipa

Equipa de CX, Brisa. Contacto: Gonçalo.
