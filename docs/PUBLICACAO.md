# Preview e publicação Expo

## Execução local

```powershell
cd E:\projects\andre-lanches\andre-lanches-app
npm ci
npm start
```

O Metro mostra um QR Code. Use um Expo Go compatível com o SDK 58 e mantenha celular e computador na mesma rede. Confira a versão em https://expo.dev/go. A disponibilidade da versão na loja pode variar; se o Expo Go instalado não aceitar o SDK, use um development build ou um build de preview. `npm run web` abre a versão web para conferir layout; não substitui a validação no celular.

## Publicação externa (requer login da conta Expo)

O app tem `expo-updates` e perfis EAS, mas ainda não está vinculado a um projeto remoto. Não há projectId nem URL de atualização fictícios no código.

Na pasta do app:

```powershell
npx eas-cli@latest login
npx eas-cli@latest whoami
git switch develop
git switch -c feature/expo-project-link
npx eas-cli@latest init
npx eas-cli@latest update:configure
```

Escolha a conta proprietária correta. Esses comandos acrescentam o ID real do projeto, URL e runtimeVersion. Revise o diff, faça commit na branch e integre em develop com `--no-ff` antes de publicar. Não coloque senhas ou tokens no repositório.

```powershell
npx eas-cli@latest update --branch preview --message "Primeiro preview do Andre Lanches" --environment preview
```

O resultado fornece o link do update no Expo Dashboard e as opções de abertura/QR compatíveis. Se for necessário um binário de preview, o perfil `preview` está pronto em `eas.json`; a geração de builds usa os limites da conta e, no iOS, pode exigir credenciais e dispositivos cadastrados. Não foi contratado nem iniciado um build remoto nesta entrega.

## Roteiro de teste no aparelho

1. Abrir o app e conferir área segura, fontes e rolagem até o último produto.
2. Alternar Lanches, Sobre Nós e Contato; conferir o estado visual da aba.
3. Filtrar por categoria e retornar a Todos (nove itens).
4. Enviar formulário vazio; conferir erros. Preencher os três campos e conferir Alert.alert e limpeza dos campos.
5. Abrir o teclado na mensagem e confirmar que é possível alcançar Enviar.
6. Tocar no botão de entrega e conferir o número +55 61 99999-8888 no discador, sem precisar realizar uma ligação.
7. Conferir com fonte ampliada e em Android/iOS. Os testes automatizados simulam as APIs nativas; a revisão web não comprova o comportamento do discador real.

Referências: [Expo Update](https://docs.expo.dev/eas-update/getting-started/), [Expo Go e compatibilidade](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/).
