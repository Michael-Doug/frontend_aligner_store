# frontend_aligner_store

Front em Angular de uma loja de alinhadores, feito como estudo a partir do site
da sousmile. Consome a API em
[backend_aligner_store](https://github.com/Michael-Doug/backend_aligner_store),
que precisa estar rodando.

## Como rodar

Precisa de Node 20.19+ e da API em `http://localhost:3000`.

```bash
npm install
npm start
```

A aplicação sobe em `http://localhost:4200`.

### Ambientes

A URL da API fica em `src/environments/`. Em desenvolvimento aponta para
`http://localhost:3000`; no build de produção usa `/api`, esperando um proxy
reverso na frente. Para mudar, edite `src/environments/environment.ts`.

```bash
npm run build        # produção, em dist/aligner-store-front
```

## O que dá para fazer

- **Pré-avaliação / cadastro** — cria o cliente e já abre a conta de acesso,
  que o backend amarra pelo e-mail, e deixa a pessoa logada.
- **Login** — guarda o token e o repõe ao recarregar a página.
- **Catálogo** — produtos vindos de `GET /products`, com preço da API.
- **Carrinho** — soma quantidade do mesmo produto e calcula o subtotal.
- **Fechar pedido** — cria o pedido e os itens; o valor total é o que o
  backend calcula, nunca o que o front manda.

A rota `/Carrinho` exige login: quem não estiver logado vai para `/Login` e
volta para o carrinho depois de entrar.

## Estrutura

```
src/app/core/        serviços de sessão, catálogo, carrinho e pedido
src/app/componentes/ telas que já existiam (home, cadastro, login, produto...)
src/app/cart/        carrinho e checkout
src/environments/    URL da API por ambiente
```

Componentes são standalone e as rotas usam lazy loading. O estado do carrinho e
da sessão é mantido com signals.

> Os nomes em português das telas antigas foram mantidos de propósito, para não
> misturar renomeação com as mudanças de comportamento. Código novo está em
> inglês.

## Testes

```bash
npm test             # modo interativo
npm run test:ci      # headless, para CI
```
