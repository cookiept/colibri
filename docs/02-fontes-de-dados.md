# 02 · Fontes de dados

Cada fonte entra como ficheiro (Excel ou CSV) carregado no browser. O importador de cada fonte (`app/js/importadores/`) reconhece as colunas e converte cada linha para o [modelo comum](03-modelo-de-dados.md).

| Fonte | Origem do export | Ritmo | Colunas mínimas | Notas |
| --- | --- | --- | --- | --- |
| Google Reviews | Google Business Profile, por local | Mensal | data, local, estrelas, texto, resposta, data da resposta | O export nativo é limitado; confirmar formato com quem gere o perfil |
| Reclamações (Jira) | Filtro guardado → Export CSV (todos os campos) | Semanal ou mensal | chave, criado, categoria, prioridade, estado, descrição, 1.ª resposta | Pedir um filtro fixo para as colunas não mudarem |
| Facebook e Instagram | Meta Business Suite (Inbox) | Mensal | data, rede, tipo, texto, respondido, data da resposta | Só interessam reclamações; filtrar elogios e spam |

## Dados pessoais

Os exports devem vir sem nome, email ou telefone do cliente. Os dados reais nunca entram neste repositório (ver [dados/README.md](../dados/README.md)).

## Ficheiros de exemplo

Em `dados/exemplos/` há um ficheiro fictício por fonte, com as colunas esperadas. Quando chegarem os primeiros exports reais, atualizar este documento e os exemplos para as colunas verdadeiras.
