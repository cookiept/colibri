# 03 · Modelo de dados

Todas as fontes são convertidas para o mesmo registo, a **menção**: uma review, um ticket ou um comentário. É o que permite somar, comparar e filtrar as três fontes no mesmo ecrã. A definição em código está em `app/js/modelo/mencao.js`.

| Campo | Tipo | Exemplo | Google Reviews | Jira | Redes sociais |
| --- | --- | --- | --- | --- | --- |
| `id` | texto | `JIRA-4821` | id da review | chave do ticket | id do comentário |
| `fonte` | `google` · `jira` · `redes` | `jira` | fixo | fixo | fixo |
| `canal` | texto | `Instagram` | `Google` | `Jira` | coluna da rede |
| `data` | data | `2026-10-14` | data da review | criado | data da publicação |
| `area` | texto ou vazio | `Aveiras` | ficha do local | campo de área, se existir | quase sempre vazio |
| `texto` | texto | "Casas de banho sem papel…" | comentário | descrição | comentário ou mensagem |
| `estrelas` | 1–5 ou vazio | `2` | estrelas | vazio | vazio |
| `sentimento` | `negativo` · `neutro` · `positivo` | `negativo` | 1–2 neg., 3 neutro, 4–5 pos. | sempre negativo | regras de palavras-chave |
| `tema` | ver [taxonomia](04-taxonomia.md) | `Instalações sanitárias` | regras | categoria mapeada | regras |
| `gravidade` | `alta` · `media` · `baixa` | `alta` | 1★ = alta | prioridade | palavras de risco |
| `respondido` | sim/não | `true` | tem resposta | estado ≠ aberto | tem resposta da marca |
| `horasAteResposta` | número ou vazio | `18` | resposta − review | 1.ª resposta − criado | resposta − publicação |
