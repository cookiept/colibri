# 0001 · Os dados são lidos no browser e nunca saem do computador

- **Estado:** Aceite
- **Data:** 2026-11-23

## Contexto

As reclamações contêm texto livre escrito por clientes e podem incluir dados pessoais. O Stater já trabalha assim e a equipa conhece o modelo.

## Decisão

Os exports de cada fonte são carregados pelo utilizador e lidos no browser. Não há servidor, base de dados nem envio de dados para fora do computador.

## Consequências

- Não há histórico partilhado entre utilizadores: cada pessoa carrega os seus ficheiros.
- A publicação em GitHub Pages é segura porque a página não contém dados.
- Ligações automáticas às fontes (fase 2) obrigam a rever esta decisão.
