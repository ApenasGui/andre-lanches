# André Lanches — app mobile

Aplicativo Android/iOS em React Native e Expo Blank (JavaScript), com identidade tropical e neon inspirada na referência fornecida. O site estático original permanece na raiz; o aplicativo está em `andre-lanches-app/`.

![Prévia mobile](docs/images/mobile-preview.jpg)

## Executar

Requisitos: Node.js 24 LTS, npm, Git e Expo Go compatível com SDK 58 (ou build de desenvolvimento/preview).

```powershell
cd andre-lanches-app
npm ci
npm start
```

Escaneie o QR do terminal no Expo Go, com celular e computador na mesma rede. Para conferir no navegador: `npm run web`. Consulte [o guia de publicação](docs/PUBLICACAO.md) para compatibilidade do Expo Go e EAS.

## Funcionalidades

- Abas Lanches, Sobre Nós e Contato, controladas por `useState`.
- Cabeçalho com logo, banner de promoção configurável e nove produtos com imagens locais, descrição e preço em reais.
- Filtros de lanches, porções e bebidas.
- História criativa, missão e diferenciais na tela Sobre Nós.
- Formulário de Nome, E-mail e Mensagem com validação, feedback visual e `Alert.alert` nativo.
- Botão flutuante que abre `tel:+5561999998888`, número fornecido para teste, com tratamento de falha.
- SafeAreaView, ajuste de teclado, rolagem, estados acessíveis e tamanho mínimo dos botões.

O formulário é demonstrativo: não envia nem armazena mensagens em servidor. O app não processa compras ou pagamentos. A ligação só é iniciada pelo usuário no discador.

## Estrutura

```text
andre-lanches-app/
  App.jsx                    # estado de navegação e composição das telas
  src/
    components/
      Header.jsx
      BannerPromocao.jsx
      ListaProdutos.jsx
      SobreNos.jsx
      Contato.jsx
      EntregaFlutuante.jsx
    data/products.js         # conteúdo, preços e imagens locais
    theme.js                 # paleta centralizada
    formatPrice.js
  assets/images/
  __tests__/app.test.jsx
  eas.json
```

O código do app é JavaScript/JSX. `tsconfig.json` e `assets.d.ts` servem apenas à verificação estática do JavaScript e às declarações das imagens. A navegação por `useState` atende ao roteiro solicitado, em lugar do Expo Router sugerido genericamente pelo template.

## Identidade e conteúdo

Paleta da referência: `#EB9998`, `#5D549C`, `#6F70A2`, `#7E3A63` e `#A373D3`, complementada por teal e amarelo de pôr do sol. As fotos e os nove preços foram preservados, incluindo X-Burguer a R$ 1,50 e combo X-Salada + Batata a R$ 9,90. Confirme os valores antes de usar comercialmente. A história é uma proposta criativa para a atividade, sem alegações de datas, prêmios ou origem histórica.

## Verificação

```powershell
cd andre-lanches-app
npm run typecheck
npm run lint
npm test
npm run export
npx expo-doctor
```

Os testes de integração cobrem navegação, filtros, formulário inválido/válido, discagem e recuperação após falha. As APIs de telefone e alerta são simuladas nos testes. A revisão visual foi feita no preview web em 390 × 844; o teste físico em Android/iOS continua necessário.

O workflow `.github/workflows/mobile-checks.yml` repete as verificações em main, develop, releases e pull requests. Não executa publicação automática.

A auditoria npm ainda reporta vulnerabilidades transitivas no conjunto Expo/Metro/Jest e ferramentas relacionadas. Foi aplicado `npm audit fix` sem `--force`; não foram forçados downgrades incompatíveis. Reavalie com `npm audit` antes de disponibilizar comercialmente. Veja [a revisão da atividade](docs/REVISAO.md).

## Gitflow

- `main`: versão integrada para entrega.
- `develop`: integração das funcionalidades.
- `feature/*`: cada etapa foi criada antes da implementação e recebeu commit próprio.
- `release/1.0.0`: revisão de entrega, integrada em main e develop, com tag `v1.0.0`.

As branches foram mantidas para permitir a inspeção da atividade. Para a próxima alteração:

```powershell
git switch develop
git switch -c feature/nome-da-alteracao
# implementar e testar
git add caminho/dos/arquivos
git commit -m "feat: descreva a alteração"
git switch develop
git merge --no-ff feature/nome-da-alteracao
```

## Publicação

Repositório: [ApenasGui/andre-lanches](https://github.com/ApenasGui/andre-lanches).

A configuração local de EAS está preparada, mas **o preview externo Expo ainda depende de login e vinculação à conta**. Nenhum link/QR público de EAS foi gerado. O passo a passo e a lista de testes no aparelho estão em [PUBLICACAO.md](docs/PUBLICACAO.md).
