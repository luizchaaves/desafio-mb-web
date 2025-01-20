# Desafio MB Web - Cadastro de Usuários

Este repositório contém uma aplicação full-stack de cadastro de usuários, com um frontend desenvolvido em **Vue.js 3** e um backend em **Node.js** com **Express**. A aplicação é dividida em dois módulos principais:

1. **Frontend (Vue.js 3)**: Um formulário de cadastro dividido em 4 etapas, com validação e envio dos dados para a API do backend.
2. **Backend (Node.js + Express)**: Um servidor que serve o frontend e recebe os dados do formulário, realizando uma validação simples e retornando uma resposta.

## Tecnologias Utilizadas

### Frontend

- **Vue.js 3** (Composition API e `<script setup>`)
- **Vite**
- **CSS3** e **SASS / SCSS**
- **Fetch API**

### Backend

- **Node.js**
- **Express**
- **CORS**
- **Execução de comandos shell** (build do frontend)

## Pré-Requisitos

Antes de rodar o projeto, é necessário ter as seguintes ferramentas instaladas:

- **Node.js** (versão 22)

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar as Dependências

Instale as dependências tanto do frontend quanto do backend:

- Para o backend, acesse o diretório backend e instale as dependências:

```bash
cd backend
npm install
```

- Para o frontend, acesse o diretório frontend e instale as dependências:

```bash
cd frontend
npm install
```

### 3. Build do Frontend

O backend irá construir o frontend automaticamente antes de iniciar o servidor. Porém, se você preferir fazer isso manualmente, pode rodar o seguinte comando dentro da pasta do frontend:

```bash
cd frontend
npm run build
```

### 4. Rodando o Backend

Após instalar as dependências e realizar o build do frontend (se necessário), inicie o backend executando o seguinte comando:

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:3000/` e você pode acessar o formulário de cadastro na URL: `http://localhost:3000/registration`.

### 5. Acessando o Frontend

Com o backend rodando, acesse o formulário de cadastro no seu navegador através da URL:

```bash
http://localhost:3000/registration
```

### Links:

- **[Frontend - Documentação](frontend/README.md)**: Este link leva diretamente à documentação do **frontend**, localizada na pasta `frontend/`.
- **[Backend - Documentação](backend/README.md)**: Este link leva diretamente à documentação do **backend**, localizada na pasta `backend/`.
