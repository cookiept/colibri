# 05 · Indicadores

Todos os indicadores se calculam sobre o período e os filtros escolhidos e comparam com o período anterior de igual duração. Código em `app/js/calculos/indicadores.js`.

| Indicador | Cálculo | Bom quando |
| --- | --- | --- |
| Reclamações | N.º de menções com sentimento negativo | desce |
| Rating Google | Média de estrelas das reviews do período | sobe |
| Respondidas | Menções negativas ou neutras com resposta ÷ menções negativas ou neutras | sobe |
| Tempo até à 1.ª resposta | Média de horas entre a menção e a primeira resposta | desce |
| Graves sem resposta | N.º de menções de gravidade alta ainda sem resposta | desce |

Por tema mostra-se também o NPS do driver correspondente no VoC, lido do Stater.
