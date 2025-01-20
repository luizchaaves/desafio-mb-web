# Frontend - Cadastro de Usuários

Este módulo é responsável pela interface de usuário (frontend) da aplicação. Ele foi desenvolvido utilizando **Vue.js 3** com **Composition API** e **Vite** como bundler. O objetivo principal desta parte da aplicação é fornecer um formulário de cadastro dividido em 4 etapas que valida e envia os dados para a API backend.

## Estrutura

A estrutura do frontend é organizada da seguinte forma:

- **/src**: Contém o código principal da aplicação Vue.js, incluindo componentes, views e lógica.
- **/assets**: Imagens e recursos estáticos.
- **/components**: Componentes Vue.js reutilizáveis.
- **/styles**: Estilos personalizados em **SASS** para o projeto.

## Funcionalidades

1. **Formulário de Cadastro**: A interface de cadastro é dividida em 4 etapas.
2. **Validação de Campos**: Valida os campos em tempo real antes de enviar os dados para o servidor.
3. **Responsividade**: O formulário é responsivo, se adaptando bem a telas de dispositivos móveis.
4. **Requisições HTTP**: Utiliza o **fetch API** para enviar dados para o backend.

## Como rodar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Rodar a aplicação em modo desenvolvimento**:

   ```bash
   npm run dev
   ```

3. O frontend estará disponível em `http://localhost:3000/registration` quando o servidor backend estiver rodando.
