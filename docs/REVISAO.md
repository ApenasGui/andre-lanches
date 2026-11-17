# Revisão contra o roteiro solicitado

## Parte 1 — análise e prototipação

- Conteúdo, imagens e preços extraídos do site local e preservados.
- Fluxo vertical mobile, logo à esquerda e abas Lanches / Sobre Nós / Contato.
- Texto criativo de história, missão e diferenciais implementado.
- Telefone fornecido pelo usuário: (61) 99999-8888.
- Formulário de Nome, E-mail e Mensagem, com validação e confirmação nativa.
- Cinco cores da imagem original em `src/theme.js`, com complementos tropicais.

## Parte 2 — Expo

- Projeto gerado pelo comando oficial `create-expo-app --template blank`, usando JavaScript.
- SDK 58, React 19.3 e React Native 0.88, com versões gerenciadas pelo Expo.
- Exportação de bundles para Android, iOS e web realizada; isso não equivale a APK/IPA ou execução em aparelho.
- Sem emulador/dispositivo conectado disponível para certificar a execução nativa.

## Parte 3 — componentes

Todos os seis componentes solicitados estão em `src/components/`. O `App.jsx` usa `useState`, SafeAreaProvider/SafeAreaView e compõe as três telas. A área inferior é medida para o botão flutuante não encobrir o conteúdo. Os estilos usam `StyleSheet.create`.

`Contato.jsx` chama `Alert.alert`, valida dados e mostra confirmação também no corpo da tela. O texto informa o caráter demonstrativo: não existe serviço de envio. `EntregaFlutuante.jsx` chama `Linking.openURL` e trata falha com número visível e possibilidade de tentar novamente.

## Parte 4 — versionamento e distribuição

- Base estática registrada em main.
- Cada etapa isolada em feature branch, com commit descritivo e merge sem fast-forward em develop.
- Release de código preparada em `release/1.0.0`.
- Destino GitHub: o repositório público existente indicado pelo usuário.
- EAS: dependência `expo-updates`, perfis e guia preparados. Falta autenticar a conta, vincular o projeto e publicar. O último `eas whoami` retornou `Not logged in`.
- Não há vídeo de aparelho/emulador nem QR público de EAS nesta entrega. A imagem de revisão é do preview web.

## Verificações e limites

- Cinco testes de integração: navegação; categorias e preços; formulário inválido/válido; discador; recuperação de falha do discador.
- Checagem estática de JavaScript e lint.
- Expo Doctor e exportação multiplataforma.
- Revisão visual web a 390 × 844 e teste real de interação das abas, filtro de bebidas e formulário.
- `npm audit fix` aplicado sem forçar mudanças principais. Após a instalação de expo-updates, o npm informou 75 avisos (6 moderados e 69 altos), incluindo dependências transitivas de desenvolvimento/build. A auditoria não está limpa; as correções sugeridas por `--force` alterariam versões principais e não foram aplicadas automaticamente.
- Validação em Android/iOS real, discagem no aparelho e publicação Expo seguem pendentes. Não declarar essas etapas concluídas com base apenas na compilação e nos mocks.
