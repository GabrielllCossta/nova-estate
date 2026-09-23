# NOVA ESTATE
Landing page de uma boutique imobiliária em Minas Gerais, adaptada à referência editorial enviada. HTML, CSS e JavaScript sem dependências de build.

## Abrir
Mantenha `index.html`, `styles.css`, `app.js` e a pasta `public` juntos, preservando esta estrutura. Abra `index.html` no navegador ou use Live Server no VS Code.

Não salve ou transfira apenas o `index.html`: sem `styles.css` a página aparece sem layout, com fonte padrão e links azuis. Para enviar o projeto, compacte a pasta inteira e extraia todos os arquivos antes de abrir o HTML.

## Configurar WhatsApp
Em app.js, substitua a constante WHATSAPP_NUMBER pelo número real do corretor, apenas com dígitos: código do país 55 + DDD + número. A configuração atual contém deliberadamente um placeholder; nenhum contato é inventado.

O formulário valida o telefone com DDD e abre uma conversa com mensagem preenchida. O usuário precisa enviar a mensagem no WhatsApp. Sem destino configurado, o formulário explica que o número não foi enviado nem armazenado. O telefone não é salvo em localStorage, cookies ou backend.

## Conteúdo e mídia
- Marca NOVA ESTATE preservada.
- Quatro anúncios demonstrativos com localidades em Minas Gerais e preços em reais.
- Vídeo local do hero: public/videos/hero-estate.mp4, 50% de opacidade, silencioso, automático e em loop.
- Pausa manual, pausa ao ocultar a página/abrir modal e respeito à preferência por movimento reduzido.
- O botão Conheça a NOVA abre o vídeo com controles.
- Imagens fornecidas e imagens locais anteriores reutilizadas de acordo com o tipo de imóvel.
- Hero poster e fundos em WebP. Google Fonts possui fallback local.
- Imóveis, valores e imagens são ilustrativos. Configure dados reais antes do uso comercial.

## Validação
Renderização conferida em 1440, 1024 e 390 px, sem overflow horizontal ou erros JavaScript. Cards com alturas iguais, quatro/duas/uma colunas conforme viewport.

Testados: validação de telefone, proteção contra WhatsApp não configurado, formação da mensagem, seleção de imóvel, modais, menu mobile/Escape e pausa do vídeo. A abertura externa foi interceptada nos testes; nenhuma mensagem foi enviada.

Capturas e relatórios: .qa/reference/. Cópia da versão anterior: .qa/before-reference-update/. A pasta .qa não faz parte da publicação.