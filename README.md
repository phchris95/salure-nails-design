# Salure Nails Design

Site da Salure Nails Design, nail designer na Freguesia do Ó, São Paulo/SP.

Site estático em HTML, CSS e JavaScript, sem banco de dados e sem servidor próprio. Publicado pelo GitHub Pages a partir da branch `master`.

## O que tem no site

- Páginas separadas (Início, Sobre, Serviços, Portfólio, Monte sua unha e Contato), com animações ao rolar, sem travar a rolagem no celular.
- **Monte sua unha:** a cliente escolhe formato, comprimento, cor e acabamento e vê o resultado numa mão real. Pode enviar uma foto de referência (ou usar um trabalho do portfólio) e copiar a cor dela. No fim, o site monta uma imagem com a unha, as escolhas e a referência para mandar no WhatsApp. Tudo acontece no aparelho da cliente: nenhuma foto vai para servidor.
- Os "Parecidos com a sua escolha" usam as características de cada trabalho do portfólio (`TRAITS` em `js/app.js`).

## Estrutura

- `index.html`: as páginas do site
- `css/estilo.css`: os estilos
- `js/app.js`: páginas, animações, portfólio, simulador e envio pelo WhatsApp
- `js/nail-engine.js`: o motor do "Monte sua unha" (pinta a unha usando a luz e o volume da unha real da foto)
- `js/vendor/`: bibliotecas de animação (GSAP 3.13 e Lenis), guardadas no próprio site
- `img/`: fotos (portfólio `p01` a `p21`, a mão do simulador `hand.jpg` e o mapa de luz das unhas `nail-atlas.png`)
- `video/`: vídeos da abertura e do Instagram
- `assets/`: fotos originais

## Rodar no computador

Sirva a pasta com qualquer servidor estático e abra no navegador:

```bash
python3 -m http.server 8080
```

(Abrir o `index.html` direto do disco não funciona para o simulador: o navegador bloqueia a leitura das imagens.)

## Adicionar um trabalho ao portfólio

1. Coloque a foto em `img/` (por exemplo `p22.jpg`).
2. Em `js/app.js`, acrescente uma linha em `WORKS` (foto, descrição, estilos e formato) e outra em `TRAITS` (formatos, comprimento e cores principais).

## Voltar para o site anterior

O site institucional anterior está guardado, completo, na branch `site-institucional`. Para voltar, basta colocar o conteúdo dela de novo na `master`.
