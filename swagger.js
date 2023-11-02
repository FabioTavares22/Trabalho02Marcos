//Importando biblioteca
const auto = require("swagger-autogen");

//Definindo arquivo de resultado na doc
const doc = './swaggerSaida.json';

//Definindo as rotas mapeadas
const rotasMape = [
    './rotas/usuarios.js',
    './rotas/token.js'
]

//Aqui personaliza a interface da doc apresentada para o usuário
const infos = {
    info:{
        title: "API de Pesquisa, Inclusão e Exclusão de Usuários",
        description: "API criada para realizar a pesquisa de usuário bem como sua exclusão e inclusão em banco local",
        version: "1.0.0"
    },
    host: '3000',
    schemes: ['HTTP', 'HTTPS']
}