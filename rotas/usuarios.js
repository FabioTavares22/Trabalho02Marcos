//colocar aqui as rotas para obter usuarios
const express = require('express');
const router = express.Router();
//trocar app por router

const rotasDeTarefas = () =>{
    router.get("/tarefas", (req, res) =>{
        const tarefas = tarefas_banco.map((tarefa) =>{
            return{
                nome: tarefa.nome,
                descricao: tarefa.descricao,
                status: tarefa.status,
                id: tarefa.id
            }
        })
    
        res.send(tarefas);
    })
    
    router.get("/tarefas/:id", (req, res) =>{
        let id = req.params.id;
    
        const tarefa_filtrada = tarefas_banco.filter(tarefa =>{
            return tarefa.id == id;
        })
    
        if(tarefa_filtrada.length == 0){
            return res.status(404).send();
        }
    
        const tarefa = tarefa_filtrada[0];
    
        res.send({
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            status: tarefa.status.toUpperCase(),
            id: tarefa.id
        })
    })
    
    router.post("/tarefas", (req,res) =>{
        let erro = [];
        const ultima_tarefa = tarefas_banco.reduce((antecessor, sucessor) =>{
            if(sucessor.id > antecessor){
                return sucessor.id;
            }else{
                return antecessor;
            }
        }, 0);
    
        const new_tarefa = req.body;
    
        new_tarefa.id = ultima_tarefa + 1;
    
        tarefas_banco.push(new_tarefa);
    
        res.send(new_tarefa);
    })
    
    router.put("/tarefas/:id", (req, res) =>{
        const {id} = req.params;
    
        const tarefas_encontradas = tarefas_banco.filter(t =>{
            return t.id == id;
        })
    
        if(tarefas_encontradas.length == 0){
            return res.status(404).send();
        }
    
        const tarefa = tarefas_encontradas[0]
        tarefa.nome = req.body.nome;
        tarefa.descricao = req.body.descricao;
        tarefa.status = req.body.status;
    
        return res.send(tarefa);
    })
    
    router.patch("/tarefas/:id", (req, res) =>{
        const {id} = req.params;
    
        const tarefas_encontradas = tarefas_banco.filter(t => {
            return t.id == id;
        })
    
        if(tarefas_encontradas.length == 0){
            return res.status(404).send();
        }
    
        const tarefa = tarefas_encontradas[0]
        tarefa.nome = req.body.nome ?? tarefa.nome;
        tarefa.descricao = req.body.descricao;
        tarefa.status = req.body.status;
    
        return res.send(tarefa);
    })
    
    router.delete("/tarefas/:id", (req, res) =>{
        const {id} = req.params;
    
        const tarefas_encontradas = tarefas_banco.filter(t => t.id == id)
    
        if(tarefas_encontradas.length == 0){
            return res.status(404).send();
        }
    
        tarefas_banco = tarefas_banco.filter(t => t.id != id);
    
        return res.status(200).send();
    })
}

//faz a exportação dos dados para o mundo externo
module.exports = rotasDeTarefas;