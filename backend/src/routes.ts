import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

//MVC

// Model
// Views
// Controllers

//REQ / RES

// rota -> toda vez que o usuário acessar esse endereço eu faço alguma coisa

// o users é o recurso. essa rota é pra listar usuários, então o recurso são os uruários.

// métodos HTTP -> get, post, put, delete (são os métodos http mais comum)

//   o que mais muda entre eles é o significado semântico que eles tem dentro da nossa aplicação
//   então toda vez que eu utilizar uma rota que tenha o método:

//      GET = bsucar uma informação (lista, item)
//      POST = criando uma informação nova (criar um usuário,)
//      PUT = editando uma informação 
//      DELETE = deletando uma informação 

// in fact, se você utilizasse post para todas as opções, funcionaria, porém existe semântica nos métodos http
// não é simplesmente só por funcionalidade, apesar de eles terem algumas diferenças de finalidade

// o navegador, por padrão, faz requisições do tipo GET, então sempre que digitamos um endereço, o método http enviado
// por baixo dos panos é o get. então o backend deve estar preparado para esse método. o navegador não aceita outro método

// como não vamos conseguir utilizar o navegador pra testar essas outras rotas, não vamos utilizar o navegador para testar
// nossa API! vamos utilizar um outro carinha chamado insomnia.rest

// parâmetros

// nós temos 3 tipos de parâmetros principais:
// Query -> enviados na nossa própria rotas. São utilizados no contexto mais de parâmetros opcionais
//      http://localhost:3333/users?search=diego -> procurando um usuário na lista de usuários

// Route Params -> também enviados na nossa própria rota, porém sem um nome. geralmente é usado para identificar um recurso.
// por exemplo: pra deletar e editar (delete e put), eu preciso saber qual usuário. pra cadastrar e pra listar, não é necessário.
//      http://localhost:3333/users/1 (Identificar um recurso) -> essa rota serviria pra identificarmos um usuário com ID 1

// Body -> é o corpo da requisição e serve pra gente enviar dados que não caibam nos outros parâmetros, que geralmente vem de formulários.
// então por exemplo: se eu for criar um usuário do 0, no body da nossa requisição vai vir o nome, senha, o email, etc. todos os dados necessários
// parar criar um usuário. ou seja, informações mais compostas com bastante dados dentro dela.
//      http://localhost:3333/users/1 

/*
app.get('/users', (request, response) => {
   // console.log(request.query); // query 
   // console.log(request.params); // route (nessecita do /:id no recurso)
   //console.log(request.body); // body

    return response.json({ message: 'Hello World'}); //  não trabalho mais com texto diretamente, sempre com objetos ou arrays.
});
*/
// index, showe, create, update, delete

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

// existem 3 formas de lidarmos com banco de dados dentro de uma aplicação back-end:
// driver nativo, query builder, ORM

// driver nativo: permite que executemos as querys do banco de dados pelo node, porém ele não oferece nenhum tipo de
// abstração, ou seja, a gente necessita de escrever nossa query da maneira que se escreve no bd.

// query builder(como o knex): a gente escreve nossas querys utilizando o javascript e no final ele converte como query mesmo.

// ORM: nós teremos uma classe no javascript que vai representar uma tabela no banco de dados, então pra cada tabela do banco
// de dados, vamos ter uma classe dentro da nossa aplicação. então toda vez que fazemos um select dentro do banco de dados, cada
// linha de retorno do banco de dados vai ser uma instância daquela classe que eu tenho dentro do meu código. vai ser um objeto
// derivado daquela classe que representa a tabela no banco de dados. então se eu tiver uma tabela chamada user, no meu código vai
// haver uma classe chamada user. então vou fazer um relacionamento direto pra cada registro da minha tabela. se eu fizer um select
// e retornar 3 usuários, eu vou ter 3 instâncias da minha classe user. e eu consigo manipular esses objetos diretamente eisso vai 
// refletir no banco de dados. então, é uma forma de conseguirmos relacionar objetos e classes com as tabelas lá no nosso banco.

// quando utilizamos o querybuilder ou o orm, nós conseguimos trocar de banco de dados sem precisar mudar nada na nossa aplicação

// existe uma forma melhor do que a padrão para criar tabelas no nosso bd que seria utilizar o conceito de migration
// ela permite que cada vez que eu for alterar algo na tabela, eu crie um arquivo que tem essas intruções do que precisa
// ser feito. quando alguém precisar mexer no meu código, ele só precisa executar um comando que vai olhar nas migrations
// o que precisa ser feito no banco da pessoa

export default routes;