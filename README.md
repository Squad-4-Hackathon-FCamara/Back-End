# Orange Portfólio - Back End

![Static Badge](https://img.shields.io/badge/release%20date-february-orange)
![Static Badge](https://img.shields.io/badge/squad%204-orange)
![Static Badge](https://img.shields.io/badge/orange%20juice-orange)
![Static Badge](https://img.shields.io/badge/fcamara-orange)


![FINAL](https://github.com/Squad-4-Hackathon-FCamara/Back-End/assets/50846424/91e76f8f-1216-4a92-a51c-67fab77dd134)


## Sobre
O projeto em questão se trata do backend do Orange Portfólio da squad 4 da 5ª edição do Programa de formação da FCamara e Orange Juice.

## Principais tecnologias utilizadas
* [NestJS](https://nestjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)

### Funcionalidades

- [x] Cadastro de usuário
- [x] Login com o Google
- [x] Cadastro de Projetos
- [x] Edição de projetos
- [x] Exclusão de projetos
- [x] Descoberta de novos projetos
- [x] Filtragem projetos por categorias

## Como executar localmente
1º passo - Depois de clonar o projeto, renomeie o arquivo chamado `.env.example` para apenas `.env`, e o preencha com as informações que se pede:
```bash
# A porta onde o backend estará onvindo as requisições.
SERVER_PORT=
# A url de conexão com o seu banco de dados.
DB_URL=

# O tempo de expiração do token usado no login dos usuários. Ex: 7d, 1h, 10s
JWT_EXPIRATION_DATE=

# A string secreta que será usada para gerar os tokens
JWT_SECRET_KEY=

# O emissor do token. Normalmente se coloca algo remete à você ou ao nome da sua aplicação.
JWT_ISSUER=

# O destinatário do token, representa a aplicação que irá usá-lo.
JWT_AUDIENCE=


# O domínio de quem irá usar o projeto. Se for um frontend, será o domínio dele. Ex: http://meudominio.com.br
Client_Domain=


# O ID da aplicação criada no site do Imgur onde ficarão armazenadas as imagens enviadas para dentro do projeto.
Client_ID_Imgur=


# O ClientId gerado no sua conta do google cloud que habilitará a funcionalidade de "login com o google" na aplicação.
Client_ID_Google=

# O ClientSecret, que é encontrado no mesmo lugar do ClientId, e usado para o mesmo propósito.
Client_Secret_Google=

# O endereço de redirecionamento que será chamado após o usuário fazer login usando o google na aplicação.
Callback_URL_Google=
```

2º passo - Com o terminal aberto na raiz do projeto, execute o comando `npm install` para que todas as dependências sejam baixadas. <br><br>
3º passo - No mesmo terminal, execute `npm run start:dev`para que o projeto seja executado em modo de desenvolvimento.


## Documentação
Para visualizar a documentação de todas as rotas do projeto usando o swagger, siga os seguintes passos:<br><br>
1º passo - Com o passo 1 do tópico anterior já feito, mude para a branch `doc/swagger`, para isso, execute o comando `git checkout doc/swagger` no terminal aberto na raiz do projeto.<br><br>
2º passo - Execute o comando `npm install` para que todas as dependências sejam baixadas, inclusive a do Swagger. <br><br>
3º passo - No mesmo terminal, execute `npm run start:dev`para que o projeto seja executado em modo de desenvolvimento.<br><br>
4º passo - No seu navegador, abra no endereço `http://localhost:3001/api`. <br>
(Levando em conta que `3001` é a porta definida lá na propriedade `SERVER_PORT` do seu arquivo `.env`. Caso seja outra, substitua por ela).


## Contribuidores

* [Gustavo Lima](https://github.com/gustas01)<br>
* [Giovani de Oliveira](https://github.com/Giovani-O)<br>
* [Paulo Ricardo](https://github.com/Paulo-Ricard0)<br>
* [Thayna Baima](https://github.com/thaynahakan)<br>
* [Carlos Richard](https://github.com/Crichard7)<br>
