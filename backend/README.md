# Backend - Cadastro de Usuários

Este módulo é responsável por fornecer a API e servir o conteúdo do frontend. O servidor é desenvolvido utilizando **Node.js** e **Express**. Ele lida com a renderização do frontend e a recepção dos dados do formulário de cadastro, realizando a validação básica e retornando um status de sucesso ou erro.

## Estrutura

A estrutura do backend é organizada da seguinte forma:

- **/controller**: Contém a lógica do controlador para tratar a requisição de cadastro.
- **/middleware**: Contém as funções de validação (como a validação de CPF, CNPJ, e-mail, etc.).
- **/utils**: Funções utilitárias, como as validações de campos.
- **server.js**: Arquivo principal onde o servidor Express é configurado e inicializado.

## Funcionalidades

1. **Servir o Frontend**: O backend serve o conteúdo estático do frontend (arquivo `index.html` e outros arquivos estáticos) após o build.
2. **Recepção de Dados**: Ao receber os dados via API (POST), o servidor valida as informações e retorna uma resposta.
3. **Validação**: O backend realiza validações dos dados (como CPF, CNPJ, e-mail, etc.) antes de simular a criação do cadastro.

## Como rodar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Rodar o servidor**:

   ```bash
   npm start
   ```

3. O servidor estará rodando em `http://localhost:3000/`. O endpoint de cadastro estará disponível em `http://localhost:3000/registration`.

4. O backend irá construir o frontend automaticamente na primeira vez que for executado. Caso queira rodar o build manualmente do frontend, entre na pasta `frontend` e execute `npm run build`.
