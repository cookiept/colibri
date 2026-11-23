# Checklist de qualidade visual

Passar antes de pedir revisão de qualquer ecrã. O objetivo é que o resultado pareça desenhado para a Colibri e não gerado por defeito.

## Conteúdo
- [ ] O ecrã responde a uma pergunta clara, e a resposta aparece primeiro.
- [ ] Cada gráfico responde a uma pergunta e mostra período e fonte.
- [ ] Os termos são os da equipa (áreas de serviço, drivers, reclamações), não jargão genérico.
- [ ] Dados fictícios estão marcados como fictícios.

## Gráficos
- [ ] O tipo de gráfico vem da pergunta: linha para evolução, barras para ranking.
- [ ] A cor tem significado (fonte, gravidade). Máximo 5 cores.
- [ ] Barras começam no zero. Eixos com unidades.
- [ ] Rótulos diretos em vez de legenda sempre que possível.
- [ ] Sem 3D, sem pies com muitas fatias, sem dois eixos sem relação.

## Visual
- [ ] Cores, tipografia e raios vêm de `tokens.css`, não de valores soltos.
- [ ] Nada de gradientes decorativos, glassmorphism ou brilhos.
- [ ] Nem tudo é um cartão: separar com espaço e filetes quando chega.
- [ ] Há hierarquia: o principal é maior, o secundário recua.
- [ ] Animações só quando mostram uma mudança de estado. Respeitam `prefers-reduced-motion`.
- [ ] Contraste mínimo WCAG AA (4,5:1 em texto).

## Texto
- [ ] Frases curtas e concretas, com números e nomes reais.
- [ ] Sem "não é só X, é Y", tríades de adjetivos, "é importante notar", "em suma".
- [ ] Sem travessões a mais, negrito em todas as linhas ou emojis como marcadores.

## Estados
- [ ] Estado vazio diz o que fazer a seguir.
- [ ] Erros dizem o que correu mal e como resolver.
- [ ] Funciona a 400 px de largura sem scroll horizontal.
