# Poll API  

Esta aplicação foi desenvolvida durante o evento NLW Expert da Rocketseat.

A aplicação consiste em uma API para a criação de enquetes, onde os usuários podem criar e votar em enquetes, além de acompanhar os resultados em tempo real. Este projeto foi meu primeiro contato com websockets, o que abriu um vasto campo de oportunidades de estudo para mim.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de código JavaScript no lado do servidor.
- **Fastify**: Framework web para Node.js, utilizado para criar a API.
- **Redis**: Banco de dados em memória utilizado para armazenamento de dados em cache.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript, utilizado para interagir com o banco de dados.
- **WebSocket**: Protocolo de comunicação bidirecional em tempo real utilizado para implementar a funcionalidade de acompanhamento dos resultados das enquetes em tempo real.

## Rodando localmente 

Para executar a aplicação localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js na versão 20
- Docker instalado no seu computador

### Setup da aplicação

1. Clone este repositório em sua máquina:
    ```
    git clone https://github.com/Artur906/poll-api-nlw-expert.git
    ```

2. Navegue até o diretório do projeto:
    ```
    cd poll-api-nlw-expert
    ```

3. Execute o comando a seguir para iniciar os containers do PostgreSQL e do Redis:
    ```
    docker-compose up -d
    ```

4. Crie um arquivo `.env` na raiz do projeto e adicione a URL de conexão com o banco de dados. Exemplo:
    ```env
    DATABASE_URL="postgresql://docker:docker@localhost:5432/polls?schema=public"
    ```

5. Instale as dependências do projeto executando:
    ```
    npm install
    ```

6. Execute as migrations para criar as tabelas e relações no banco de dados:
    ```
    npx prisma migrate 
    ```

7. Inicie o servidor local:
    ```
    npm run dev
    ```

Agora a aplicação está rodando localmente e você pode acessá-la em `http://localhost:3333`.

### Rotas da API

- **GET /polls/:pollId/results**: Conexão continua com o backend que atualiza em tempo real os resultados de uma enquete.
- **GET /polls/:pollId**: Retorna os detalhes de uma enquete específica.
- **POST /polls**: Cria uma nova enquete.
- **POST /polls/:pollId/vote**: Cria um novo voto em uma determinada enquete.
