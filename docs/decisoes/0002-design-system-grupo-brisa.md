# 0002 · O ecrã segue o Design System Grupo Brisa com as cores Colibri

- **Estado:** Aceite
- **Data:** 2026-11-23

## Contexto

O Design System Grupo Brisa (Figma) tem fundações e componentes para várias marcas, mas não tem um brand kit Colibri. As cores Colibri aparecem como cores de serviço: rosa escuro `#B62454`, rosa claro `#F7BDBE` e verde-petróleo `#005555`.

## Decisão

Usar as fundações e componentes do DS Grupo Brisa (tipografia Noto Sans, neutros Gray, raios 8/12/16 px) com as três cores Colibri como acento. Os tokens estão em `app/css/tokens.css`.

## Consequências

- Se a Colibri tiver um kit próprio, os tokens mudam num só ficheiro.
- A terceira cor das fontes (ocre `#A86A12`, redes sociais) não vem do DS e deve ser validada.
