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

**Atualizar o app:** depois de trocar os arquivos no GitHub, abra o app com internet. Quando a versão nova for baixada, aparece no topo o aviso **Nova versão do app instalada, Recarregar**: toque nele. Para saber qual versão está rodando, olhe a linha **Versão do app** no fim da aba **Mais** (esta é a **v5**). Se o aviso não aparecer, vá em **Mais → Atualizar o app agora (precisa de internet)**: ele apaga só os arquivos guardados do app (o cache) e baixa tudo de novo, **sem tocar nos seus dados**. Se mesmo assim a versão não mudar, os arquivos novos ainda não foram publicados no GitHub: confira se o upload terminou e se o Pages já está publicado (o GitHub pode levar alguns minutos).

## Como os totais funcionam

- **Resumo (visão mensal):** mostra **só os movimentos do mês** que está na tela: **Entradas**, **Saídas** e **Resultado do mês** (entradas menos saídas). Nada acumulado.
- **Contas (visão acumulada):** mostra o **saldo acumulado de cada conta**. Toque numa conta para ver o saldo atual, um gráfico, o **saldo no fim de cada mês** (com a variação) e o **saldo por dia**. Em **Mais** também há **Saldo acumulado das contas**.
- **Saldo diário do extrato:** extratos em PDF ou CSV trazem uma coluna **Saldo**. O app guarda esses saldos **à parte**: eles **não viram lançamentos** e **não entram nos totais do mês**. O saldo da conta usa o último saldo do extrato mais os lançamentos feitos depois dessa data. Se a conta nunca recebeu um extrato com saldo, o app mostra o saldo calculado (saldo inicial mais todos os lançamentos).
- **Cartão de crédito:** em **Contas**, o cartão mostra o total da fatura do mês na tela. Em **Resumo**, as compras do cartão entram nas **Saídas** do mês a que pertencem (regra abaixo). Marque os pagamentos de fatura que saem da conta corrente como **Pagamento de fatura** (o app já reconhece alguns) para eles não contarem duas vezes.
- **Relatório em PDF:** traz **Resultado do período** e, no fim, o **Saldo acumulado das contas** na data final do período.

### Virada do cartão

Cada cartão tem o **dia da virada (fechamento)**. A partir do dia da virada, o gasto conta no **mês seguinte**. Exemplo com virada no dia 10: uma compra de 9/set conta em setembro, e uma compra de 10/set ou de 5/out conta em outubro. Em **Contas**, dá para trocar para "Pela data da compra". A regra vale para os lançamentos novos e as importações. Lançamentos antigos mantêm o mês em que já estavam, e dá para ajustar o campo **Mês da fatura** de cada um.

## Importar PDF, CSV e OFX

Em **Importar**, escolha a conta ou o cartão e o arquivo. O app monta uma prévia, aplica as categorias das suas regras e marca o que já foi importado. Você revisa antes de confirmar. Toque no valor de um lançamento para inverter o sinal, ou use a opção de sinal no topo da prévia.

**Leitura de PDF por colunas.** Para extratos em tabela (Data, Histórico, Crédito, Débito, Saldo, ou uma coluna Valor), o app acha o cabeçalho e usa a posição de cada texto para separar descrição, crédito, débito e saldo. Ele junta o título e o detalhe da descrição (por exemplo, `PIX RECEBIDO - NOME`), repete a data nas linhas sem data, ignora linhas de saldo e de total e **confere o resultado com a coluna Saldo do extrato**: a prévia mostra "todos os N lançamentos fecham" ou avisa quantos não fecham. PDFs sem essa tabela (como faturas de cartão em lista) caem na leitura por texto, que é mais aproximada.

**Saldo do extrato.** A coluna Saldo do PDF ou do CSV é lida e guardada à parte (veja "Como os totais funcionam"). A prévia avisa quantos dias de saldo serão guardados. Se todos os lançamentos já existirem, ao confirmar o app ainda atualiza os saldos.

**Importação errada com uma versão antiga?** Antes de cada importação o app guarda uma cópia. Em **Mais → Cópias no app, CSV e backup em Downloads**, escolha a cópia **Antes de importar ...** e toque em **Restaurar**. Depois importe de novo já na versão nova.

**Sem duplicar entre formatos.** Se você importou o CSV de um período e depois importa o PDF do mesmo período (ou o contrário), os lançamentos que têm a mesma data e o mesmo valor, com descrições que começam igual, aparecem como "já importado" e ficam desmarcados.

**Categorias automáticas.** O app já vem com regras para descrições comuns de bancos brasileiros (rendimento de investimento, pagamento de fatura do cartão, conta de água e luz, estacionamento, transferência de salário etc.). Quem já usa o app recebe essas regras novas sem perder as suas. PIX e boletos ficam sem categoria, porque dependem de quem recebeu: ao escolher a categoria de um, o app sugere uma palavra-chave (sem termos genéricos como "PIX" e "PAGTO") para categorizar os parecidos. Em **Mais → Regras de categorização automática** há o botão **Aplicar às sem categoria**, que passa as regras pelos lançamentos antigos.

- PDF com senha: o app pede a senha (muitos bancos usam os primeiros dígitos do CPF). A senha não é guardada.
- Cada banco usa um layout. **Sempre confira a prévia.** Se nenhum lançamento for reconhecido, o app mostra o texto lido, que você pode mandar ao Claude para ajustar o leitor ao seu banco.
- **OCR não está incluído.** PDF que é só imagem (digitalizado ou foto) não tem texto para ler, e o app avisa isso. Para ler imagem offline seria preciso incluir, na mesma pasta do app, uma biblioteca de OCR (por exemplo o Tesseract.js: o script principal, o worker, o núcleo WebAssembly e o arquivo de idioma `por.traineddata`, somando algumas dezenas de MB) e acrescentar o código que transforma cada página em imagem e roda o reconhecimento. Eu não tinha internet para baixar esses arquivos, então não incluí. Prefira baixar o **CSV ou OFX** no banco, que são mais precisos.

## Backup automático (pasta fora de Downloads)

**Configurar uma vez:** em **Mais**, toque em **Escolher pasta de backup** e escolha uma pasta (por exemplo, **Documentos**; o Android não deixa escolher a pasta Downloads nem a raiz do armazenamento). O app cria dentro dela a subpasta `FinancasDaCasa` com o arquivo `financas-backup.json`.

**O que acontece depois:** a cada importação (CSV, OFX ou PDF) e a cada categorização de compra, o app **sobrescreve** o `financas-backup.json` com os dados atuais. Ele não cria arquivos novos a cada vez. Por segurança, antes de sobrescrever copia o conteúdo antigo para `financas-backup-anterior.json` (só uma geração). Se o app estiver sem nenhum lançamento e a pasta já tiver um backup com dados (por exemplo, depois de limpar o Chrome), o app **não sobrescreve**: avisa e oferece restaurar.

**Autorização:** o Chrome do Android ainda não guarda a permissão de pasta entre sessões (segundo o rastreador de bugs do Chromium, em fevereiro de 2026). Depois de reabrir o Chrome pode aparecer, no Resumo, o alerta "Backup na pasta: autorização necessária". Toque em **Autorizar**, ou simplesmente importe ou categorize e aceite o pedido do Chrome. Enquanto não autorizar, nada é gravado na pasta, mas as cópias dentro do app continuam.

**Trocar de celular ou depois de limpar o Chrome:**
1. Leve a pasta `FinancasDaCasa` para o outro celular (Drive, cabo, cartão de memória...). Se for o mesmo aparelho, ela continua onde estava.
2. Instale o app, vá em **Mais → Escolher pasta de backup** e escolha a pasta que contém `FinancasDaCasa`.
3. O app encontra o backup e pergunta se você quer restaurar. Outra opção: **Importar backup** e escolher o arquivo `financas-backup.json`.

**Exportar e importar na mão** (em **Mais**, no topo): **Exportar backup** abre o seletor de arquivos para você escolher onde salvar (se o celular não tiver esse seletor, baixa para Downloads). **Importar backup** restaura a partir de um arquivo. Quando o celular permite, há também **Compartilhar backup**, para mandar o arquivo ao Drive, WhatsApp etc.

**Se o celular não permitir escolher pasta:** o app avisa em Mais e volta a baixar um arquivo `financas-backup-auto-AAAAMMDD-HHMM.json` em Downloads depois de cada importação (e, no máximo a cada 10 minutos, depois de categorizar). Nesse caso não há como sobrescrever: o Android cria um arquivo novo a cada vez. Você ajusta isso em **Mais → Cópias no app, CSV e backup em Downloads → Arquivo na pasta Downloads**.

**Cópias dentro do app:** a cada importação e categorização o app também guarda, dentro dele, uma cópia (as 20 mais recentes) e uma cópia **antes** de cada importação ou restauração. Ficam em **Mais → Cópias no app, CSV e backup em Downloads**, onde você pode **Baixar** ou **Restaurar** cada uma. Servem para desfazer erros. Ficam no mesmo armazenamento dos seus dados: se limpar os dados do Chrome ou desinstalar o app, elas somem junto. Quem protege nesses casos é o arquivo na pasta.

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
- Backup automático: importar baixa um arquivo com os lançamentos importados; categorizar logo depois não baixa (limite de 10 minutos) e depois de 10 minutos baixa um arquivo com a categoria nova; categorizações seguidas viram uma cópia só; os três modos do seletor; a preferência continua escolhida depois de recarregar; restaurar a cópia "Antes de importar" desfaz a importação e restaurar a cópia "Antes de restaurar" traz tudo de volta; só as 20 cópias mais recentes são mantidas (testado com 26 operações); as cópias são compactadas (gzip) e continuam listadas sem internet.
- Importação calibrada com um extrato **real** do Bradesco em PDF e o CSV do mesmo período (arquivos que você enviou; não estão neste ZIP): o PDF lê os 36 lançamentos, com entradas de R$ 34.614,42 e saídas de R$ 36.593,58, iguais aos totais do extrato; a conferência com a coluna Saldo fecha nos 36; as descrições juntam título e detalhe, sem número de documento; saldo não é lido como valor; o CSV e o PDF dão as mesmas datas e valores, linha a linha; reimportar um depois do outro marca os 36 como já importados (nos dois sentidos); 19 dos 36 lançamentos saem categorizados pelas regras novas; migração das regras para quem já tinha dados; botão "Aplicar às sem categoria"; os PDFs de teste antigos (fatura em lista, extrato C/D) continuam sendo lidos.
- Totais e saldo, com os mesmos arquivos reais: o saldo diário do PDF (16 dias) e o do CSV são guardados à parte e os 36 lançamentos continuam 36; o Resumo de agosto, setembro e outubro mostra entradas e saídas iguais às somas do CSV do banco (por exemplo, outubro: entradas R$ 5.405,75 e saídas R$ 1.241,98); o resultado de outubro (R$ 4.163,77) é igual à variação do saldo (73.964,34 menos 69.800,57); o Resumo não mostra saldo acumulado; Contas mostra R$ 73.964,34 com a data do extrato; a tela Saldo acumulado mostra o fim de agosto (81.044,91), setembro (69.800,57) e outubro (73.964,34) com as variações e o gráfico; o relatório em PDF traz Resultado do período e o saldo das contas ao fim do período; o backup leva o saldo e a restauração o devolve.
- Virada do cartão (virada no dia 10): compra de 9/set conta em setembro, de 10/set conta em outubro, de 11/out conta em novembro; com "pela data da compra" o mês é o da data.
- Atualização do app: ao publicar uma versão nova de teste apareceu o aviso "Nova versão do app instalada" e **Recarregar** o fez sumir; **Atualizar o app agora** apagou o cache, recarregou e manteve os 72 lançamentos.
- Pasta de backup (seletor de pasta **simulado** sobre o armazenamento privado do Chromium, porque o seletor de pastas do Android não dá para automatizar): escolher a pasta cria `FinancasDaCasa/financas-backup.json`; importar CSV grava os 3 lançamentos nesse mesmo arquivo, sem baixar nada em Downloads; categorizar sobrescreve o arquivo na hora e a pasta continua com só 2 arquivos (o backup e o anterior); depois de "limpar os dados do site" (localStorage e IndexedDB) o app zera, e escolher a pasta de novo encontra o backup e restaura tudo; app vazio **não** sobrescreve um backup com dados (a proteção funcionou) e dá para restaurar da pasta; pedido de autorização de pasta (alerta no Resumo e botão Autorizar); Exportar backup usando o seletor de arquivo; Importar backup restaurando e atualizando a pasta; Compartilhar backup enviando um `.json`; "Parar de usar" para de gravar. Também testei um navegador sem seletor de pasta: o app explica, Exportar baixa o arquivo e a importação volta a baixar o backup automático em Downloads.

**Apenas revisados no código, não executados:**

- A instalação em um Android e Chrome reais (menu "Instalar app", ícone na tela inicial, janela sem barra), e como os ícones adaptáveis ficam no seu launcher.
- Os passos do GitHub Pages: não tenho acesso ao GitHub, então escrevi o passo a passo de memória; nomes de botões podem diferir.
- O aviso de nova versão e o botão Atualizar o app agora em um Android de verdade (testei os dois no Chromium, com versões de teste).
- A virada do cartão com faturas reais de cartão (testei só com lançamentos digitados).
- O seletor de pasta e a autorização de pasta no Chrome do Android de verdade: segundo a documentação, o Chrome Android 132 (jan/2025) ou mais novo oferece o seletor, mas não guarda a permissão entre sessões; eu não vi isso rodando num aparelho. O app foi escrito para pedir autorização de novo quando precisar.
- No Chrome do Android: se ele bloqueia ou pede permissão para os downloads automáticos (principalmente o que sai alguns segundos depois de categorizar, que não vem direto de um toque). No Chromium de teste todos os downloads foram aceitos. Se o Chrome bloquear, as cópias dentro do app continuam sendo feitas e o botão **Baixar backup** continua funcionando.
- PDFs de outros bancos além do Bradesco: só testei o extrato real do Bradesco e PDFs que eu mesmo gerei. Faturas de cartão em PDF reais também não foram testadas. PDFs com codificações incomuns podem não ser lidos (não incluí as tabelas de caracteres CMap do PDF.js).
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
