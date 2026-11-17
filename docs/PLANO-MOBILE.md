# Plano de adaptação mobile

## 1. Base analisada

O site estático permanece na raiz. O app Expo Blank JavaScript ficará em `andre-lanches-app/`. As imagens serão copiadas para os assets do app, sem dependência de URLs externas.

| Produto | Preço original |
| --- | --- |
| X-Salada | R$ 8,00 |
| Cheddar | R$ 17,00 |
| Batata Frita | R$ 7,00 |
| X-Burguer | R$ 1,50 |
| Big Tower | R$ 20,50 |
| X-Frango | R$ 12,90 |
| Nuggets (8 unidades) | R$ 6,50 |
| Refrigerante (lata) | R$ 4,50 |
| Sucos (vários sabores) | R$ 8,50 |

Combo X-Salada + Batata: R$ 9,90. Valores mantidos para fidelidade à atividade; precisam de confirmação comercial. Descrições e história são textos criativos para o protótipo, sem inventar datas, prêmios ou ingredientes específicos.

## 2. Fluxo de smartphone

Topo com logo pequena à esquerda e três abas: Lanches, Sobre Nós e Contato. A tela ativa é gerenciada por `useState`; não há necessidade de biblioteca de rotas para três telas locais.

- Lanches: abertura tropical, banner configurável e lista vertical de produtos.
- Sobre Nós: história criativa, missão e diferenciais.
- Contato: Nome, E-mail e Mensagem; validação, mensagens de erro e confirmação nativa. O envio é demonstrativo e não transmite dados a um servidor.
- Entrega: botão fixo inferior respeitando área segura, com discagem para `tel:+5561999998888`, número fornecido pelo usuário. Abrir o discador não faz a ligação automaticamente.

Paleta: #EB9998, #5D549C, #6F70A2, #7E3A63, #A373D3, complementada por teal e amarelo solar. Fundo escuro, texto claro e espaçamento confortável. SafeAreaView, rolagem e cuidado com teclado no formulário.

## 3. Gitflow

`main` guarda versões estáveis; `develop` integra o trabalho. Antes de cada etapa, criar `feature/<nome>` a partir de `develop`, implementar e verificar, fazer commit descritivo e integrar com `git merge --no-ff`. Correções posteriores também ganham sua própria branch. A entrega será preparada em `release/1.0.0` e integrada em `main` e `develop`, com tag `v1.0.0`, após validação.

Etapas: planejamento; base Expo; cabeçalho e tema; banner; produtos; sobre; formulário; discagem; integração das telas; verificações e publicação. Nenhuma credencial entra no Git.

## 4. Critérios de conclusão

- Componentes funcionais JSX e estilos com StyleSheet.create.
- Navegação por estado, imagens locais e nove preços formatados.
- Contato com validação e Alert.alert, sem simular entrega real de mensagem.
- Linking.openURL com tratamento de falha.
- Exportação Android/iOS, verificações Expo e testes de comportamento possíveis no ambiente.
- GitHub com histórico Gitflow e preview Expo publicado quando houver sessão EAS autenticada; qualquer dependência de login ou dispositivo será registrada explicitamente.
