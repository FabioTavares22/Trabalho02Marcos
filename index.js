require('dotenv').config();
const express = require("express");
const porta = process.env.PORTA;

//Importando swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swaggerSaida.json');

// importamos o componente middleware
const registrarLogMiddleware = require('./middlewares/registrarLogMiddleware');

const rotasDeTarefas = require('./rotas/usuarios');

// importando rotas de token
const rotas_token = require('./rotas/token');

const app = express();

app.use(express.json());

// inserimos o middleware dentro da aplicação
app.use(registrarLogMiddleware);

// ADicionar um middleware da biblioteca do swagger
app.use('/docs', swaggerUi.serve);

app.use(rotasDeTarefas());

// chamando a função injetando uma dependência
app.use(rotas_token())


app.get("/", (req, res) => {
    res.send("Sua API está em execução!");
})

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/docs', swaggerUi.setup(swaggerFile));

app.listen(porta, (err) =>{
    if(err){
        console.log("API não iniciada")
    }else{
        console.log(`API executando na porta ${porta}`);
    }
})