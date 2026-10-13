# Finanças da Casa (aplicativo instalável, funciona offline)

App de finanças pessoais: lançamentos, contas e cartões, categorias, totalizadores, importação de extratos e faturas (CSV, OFX e PDF) e relatórios em PDF. Roda inteiro no seu celular: **não usa internet, nuvem, CDN nem fontes externas** depois do primeiro carregamento.

## Arquivos (todos ficam na mesma pasta, sem subpastas)

| Arquivo | Para que serve |
|---|---|
| `index.html` | O aplicativo (telas, regras e armazenamento) |
| `manifest.webmanifest` | Nome, cores, ícones e modo "janela própria" para instalar |
| `service-worker.js` | Guarda os arquivos no aparelho para abrir sem internet |
| `icon-192.png`, `icon-512.png` | Ícones do app |
| `icon-maskable-192.png`, `icon-maskable-512.png` | Ícones que se adaptam ao formato do Android (redondo, quadrado etc.) |
| `apple-touch-icon.png`, `favicon.png` | Ícones auxiliares |
| `pdfjs-lib.js`, `pdfjs-worker.js` | Leitor de PDF (PDF.js 5.6.205, versão "legacy") |
| `pdf-lib.min.js` | Gerador de relatórios em PDF (pdf-lib 1.17.1) |
| `licencas-terceiros.txt` | Licenças das bibliotecas incluídas |
| `README.md` | Este guia |

Todos os caminhos são relativos, então o app funciona em qualquer subdiretório (por exemplo `https://seunome.github.io/financas-casa/`).

---

## Passo 0: leve seus dados do app antigo (faça antes de tudo)

O app novo guarda os dados **dentro do próprio aparelho**, em um endereço diferente do app antigo. Os dados não passam sozinhos: é preciso exportar e restaurar.

1. Abra o app antigo (o link do Claude).
2. Vá em **Mais → Backup e restauração → Baixar backup**. Um arquivo `financas-backup-AAAA-MM-DD.json` vai para a pasta Downloads.
3. Guarde esse arquivo. Você vai restaurá-lo no app novo no passo 4.

Não apague o app antigo até conferir que tudo apareceu no novo.

## Passo 1: preparar os arquivos no celular

1. Baixe o ZIP `financas-casa-pwa.zip` no celular.
2. Abra o app **Arquivos** (Files by Google), vá em **Downloads**, toque no ZIP e escolha **Extrair**. Vai surgir uma pasta com 14 arquivos.

## Passo 2: publicar no GitHub Pages (pelo navegador do celular)

Os nomes dos botões podem variar um pouco conforme a versão do GitHub. Se algum menu não aparecer, abra o menu ⋮ do Chrome e marque **Site para computador**.

1. Entre em **github.com** e crie uma conta gratuita (ou faça login).
2. Toque no **+** e em **New repository**. Nome sugerido: `financas-casa`. Marque **Public**. Marque **Add a README file**. Toque em **Create repository**.
   - O repositório precisa ser público para o GitHub Pages gratuito. Isso expõe só o código do app. Seus dados ficam no celular e **não** vão para o GitHub.
3. Dentro do repositório, toque em **Add file → Upload files**.
4. Toque em **choose your files**, abra a pasta extraída e **selecione todos os 14 arquivos** (toque longo em um e depois "selecionar tudo"). O `README.md` da pasta apenas substitui o que o GitHub criou no passo 2.
5. Aguarde o envio terminar e toque em **Commit changes**.
6. Confira na tela do repositório se aparecem todos os arquivos da tabela acima (nomes idênticos, sem pasta no meio).
7. Vá em **Settings → Pages**. Em **Build and deployment**, escolha **Source: Deploy from a branch**. Em **Branch**, escolha `main` e a pasta `/ (root)`. Toque em **Save**.
8. Espere de 1 a 3 minutos e recarregue a página de Pages. Vai aparecer o endereço do app, no formato `https://SEUUSUARIO.github.io/financas-casa/`.

## Passo 3: instalar no Android

1. No **Chrome**, abra o endereço do app **com internet**.
2. Espere carregar. Vá em **Mais** (última aba) e confira se aparece **"Uso offline: pronto"**. Se aparecer "ainda não está pronto", mantenha o app aberto com internet por alguns segundos e reabra a aba Mais.
3. Menu ⋮ do Chrome → **Instalar app** (ou **Adicionar à tela inicial** → **Instalar**).
4. O ícone "Finanças" aparece na tela inicial. Abra por ele: o app abre em janela própria, sem a barra do navegador.

## Passo 4: restaurar seus dados

No app novo: **Mais → Backup e restauração → Escolher arquivo de backup**, selecione o `.json` do passo 0 e confirme **Restaurar**. Confira Resumo, Lançamentos e Contas.

## Usando offline

Depois do passo 3, ative o modo avião e abra o app: tudo funciona (lançar, editar, excluir, categorias, contas, cartões, importar CSV/OFX/PDF, gerar relatório PDF, baixar backup). Ao fechar e reabrir, os dados continuam lá.

**Atualizar o app:** se você trocar arquivos no GitHub, abra o app **duas vezes** com internet. Na primeira ele busca a versão nova, na segunda passa a usá-la. Os dados não são tocados.

## Importar PDF

Em **Importar**, escolha a conta ou o cartão e o arquivo PDF. O app lê o texto do PDF, monta uma prévia, aplica as categorias das suas regras e marca o que já foi importado. Você revisa antes de confirmar. Toque no valor de um lançamento para inverter o sinal, ou use a opção de sinal no topo da prévia.

- PDF com senha: o app pede a senha (muitos bancos usam os primeiros dígitos do CPF). A senha não é guardada.
- Cada banco usa um layout. A leitura é uma aproximação e **sempre exige conferência**. Se nenhum lançamento for reconhecido, o app mostra o texto lido, que você pode mandar ao Claude para ajustar o leitor ao seu banco.
- **OCR não está incluído.** PDF que é só imagem (digitalizado ou foto) não tem texto para ler, e o app avisa isso. Para ler imagem offline seria preciso incluir, na mesma pasta do app, uma biblioteca de OCR (por exemplo o Tesseract.js: o script principal, o worker, o núcleo WebAssembly e o arquivo de idioma `por.traineddata`, somando algumas dezenas de MB) e acrescentar o código que transforma cada página em imagem e roda o reconhecimento. Eu não tinha internet para baixar esses arquivos, então não incluí. Prefira baixar o **CSV ou OFX** no banco, que são mais precisos.

## Segurança dos dados

- Os dados ficam no armazenamento do navegador, dentro do app instalado. Eles sobrevivem a fechar o app e a reiniciar o celular.
- **Eles são apagados** se você limpar os dados do site/do Chrome, desinstalar o app ou mudar o endereço (por exemplo, renomear o repositório). Por isso, **baixe um backup de vez em quando** (Mais → Backup e restauração).
- O app pede ao Chrome proteção contra limpeza automática. Em **Mais** aparece se está ativa. Instalar o app na tela inicial ajuda.
- Não há sincronização entre aparelhos. Use backup e restauração para levar os dados de um para outro.
- Não envie arquivos de backup ou extratos para o repositório do GitHub, que é público.

## Testes realizados

**Executados de verdade**, no Chromium (Playwright) emulando um Pixel 7, servindo os arquivos por `localhost` dentro de subdiretórios (`/sub/financas/` e `/usuario/financas-casa/`). A bateria completa rodou duas vezes: na pasta do projeto e no conteúdo do ZIP já extraído.

- Sintaxe do JavaScript do `index.html` e do `service-worker.js` (`node --check`).
- Manifesto é um JSON válido; o Chrome leu o manifesto e `getInstallabilityErrors` não retornou nenhum erro; os 4 ícones existem e têm os tamanhos declarados.
- Service worker instala, fica ativo com o escopo do subdiretório e guarda os 12 arquivos essenciais; todos os arquivos referenciados no HTML estão na lista do cache.
- Nenhum caminho absoluto na raiz e nenhuma URL externa em `index.html`, `service-worker.js` e `manifest.webmanifest`. Durante todos os testes, nenhuma requisição saiu para host externo e não houve erro no console.
- Sem internet: recarregar o app; cadastrar conta e cartão; cadastrar, editar e excluir lançamentos; criar categoria.
- Importação sem internet: CSV de extrato; reimportar o mesmo arquivo (os 3 lançamentos foram marcados como já importados, nada duplicou); CSV de fatura de cartão (sinal e mês da fatura); OFX; PDF de fatura (6 lançamentos, incluindo compra de dezembro com o ano certo); PDF com senha (senha errada recusada, certa aceita); PDF de extrato com marcação C/D e linha de saldo ignorada; PDF só de imagem (aviso claro).
- Relatório em PDF gerado sem internet; conferi o texto com `pypdf` e o visual da primeira página.
- Backup JSON e CSV baixados sem internet; dados apagados do navegador e restaurados pelo backup (10 lançamentos de volta, totais iguais).
- Fechar e reabrir o navegador sem internet: o app abre e os lançamentos e contas continuam lá.

**Apenas revisados no código, não executados:**

- A instalação em um Android e Chrome reais (menu "Instalar app", ícone na tela inicial, janela sem barra), e como os ícones adaptáveis ficam no seu launcher.
- Os passos do GitHub Pages: não tenho acesso ao GitHub, então escrevi o passo a passo de memória; nomes de botões podem diferir.
- A troca de versão do service worker quando você publicar arquivos novos.
- PDFs reais de bancos: usei PDFs que eu mesmo gerei. PDFs com codificações incomuns podem não ser lidos (não incluí as tabelas de caracteres CMap do PDF.js).
- O tema escuro depois da conversão, e o desempenho em celulares simples com PDFs grandes.
- Limite de tamanho do armazenamento do navegador. O app usa `localStorage`, o armazenamento do navegador (era o modo local que o app antigo já tinha; dentro do Claude ele usava o armazenamento da sua conta). Esse armazenamento costuma ter limite de poucos MB. Para uso doméstico, dezenas de milhares de lançamentos cabem, mas não medi isso aqui.

## Limitações conhecidas

- **Fontes:** o app antigo usava fontes do Google. Como não consegui baixá-las, o app usa a fonte do sistema (Roboto no Android). Layout e cores seguem iguais, mas as letras ficam um pouco diferentes.
- O primeiro acesso exige internet (baixa cerca de 2,4 MB). Instalar também exige endereço `https`, que o GitHub Pages já oferece.
- O leitor de PDF é aproximado e depende do layout de cada banco. Sempre confira a prévia.
- Não há OCR, nem sincronização na nuvem, nem integração com IA. Nada disso é necessário para o funcionamento local.
- Se algo não carregar, abra o app com internet uma vez, feche e abra de novo. Se o problema continuar, me diga a mensagem que aparece na tela.

## Bibliotecas incluídas

- PDF.js 5.6.205 (Mozilla, Apache 2.0): leitura de PDF.
- pdf-lib 1.17.1 (MIT): geração de relatórios em PDF.

Textos das licenças em `licencas-terceiros.txt`.
