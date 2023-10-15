const express = require("express");
const porta = process.env.PORTA;

require('dotenv').config();

const rotasDeTarefas = require('./rotas/usuarios');

app.use(express.json());

app.use(rotasDeTarefas());

const app = express();

app.get("/", (req, res) => {
    res.send("Sua API está em execução!");
})


app.listen(porta, (err) =>{
    if(err){
        console.log("API não iniciada")
    }else{
        console.log(`API executando na porta ${porta}`);
    }
})