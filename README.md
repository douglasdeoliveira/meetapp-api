# Meetapp API

## Como executar

### Configuração do ambiente

Em primeiro lugar você deve criar uma cópia do arquivo `.env.example` na raiz do projeto e renomear para `.env`.

Feito isso, você deve preenchê-lo com as informações dos bancos de dados Postgres (ou MySQL), MongoDB e Redis. Além de preencher também um código para o `APP_SECRET` e as configurações para o envio de e-mail.

_Não é obrigatório o preenchimento do `SENTRY_DSN`_

### Scripts de execução

Instalando as dependências:

```
yarn install
```

Criando as tabelas no banco de dados:

```
yarn sequelize db:migrate
```

Inserindo dados fakes:

```
yarn sequelize db:seed:all
```

Iniciando o servidor da API:

```
yarn dev
```

Iniciando o servidor de e-mail:

```
yarn queue
```

### Informação de acesso

Caso você tenha executado o comando para inserir dados fakes, você poderá acessar o sistema com o usuário de demonstração com os seguintes dados:

**e-mail:** douglas@demo.com

**senha:** 123456

## Back-end: Parte 01

Crie uma aplicação do zero utilizando Express ou Adonis.

Nessa aplicação configure as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgresSQL ou MySQL);

Durante esse desafio você dará início a um novo projeto no Bootcamp, esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile.

Esse projeto também será utilizado para a certificação do bootcamp, então bora pro código!

## Back-end: Parte 02

Durante esse desafio vamos aprimorar a aplicação Meetapp que demos início no desafio anterior implementando funcionalidades que aprendemos durante as aulas até agora.

## Aplicação

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App).

## Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

### Autenticação

Permita que um usuário se autentique em sua aplicação utilizando e-mail e senha.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

### Cadastro e atualização de usuários

Permita que novos usuários se cadastrem em sua aplicação utilizando nome, e-mail e senha.

Para atualizar a senha, o usuário deve também enviar um campo de confirmação com a mesma senha.

- Criptografe a senha do usuário para segurança.
- Realize a validação dos dados de entrada;

### Gerenciamento de meetups

O usuário pode cadastrar meetups na plataforma com título do meetup, descrição, localização, data e hora e imagem (banner). Todos campos são obrigatórios. Adicione também um campo user_id que armazena o ID do usuário que organiza o evento.

Não deve ser possível cadastrar meetups com datas que já passaram.

O usuário também deve poder editar todos dados de meetups que ainda não aconteceram e que ele é organizador.

Crie uma rota para listar os meetups que são organizados pelo usuário logado.

O usuário deve poder cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deve deletar o meetup da base de dados.

### Inscrição no meetup

O usuário deve poder se inscrever em meetups que não organiza.

O usuário não pode se inscrever em meetups que já aconteceram.

O usuário não pode se inscrever no mesmo meetup duas vezes.

O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.

Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)

### Listagem de meetups

Crie uma rota para listar os meetups com filtro por data (não por hora), os resultados dessa listagem devem vir paginados em 10 itens por página. Abaixo tem um exemplo de chamada para a rota de listagem dos meetups:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

Nesse exemplo, listaremos a página 2 dos meetups que acontecerão no dia 01 de Julho.

Nessa listagem retorne também os dados do organizador.

### Listagem de inscrições

Crie uma rota para listar os meetups em que o usuário logado está inscrito.

Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.

## TODO

- Desenvolver e implementar testes
