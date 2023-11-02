//colocar aqui as rotas para obter usuarios
const express = require('express');
const router = express.Router();
//trocar app por router

const rotasDeTarefas = () =>{

    router.get('/usuarios', ValidaToken)
    router.get('/usuarios/:id', ValidaToken)
    router.put('/usuarios/:id', ValidaToken)
    router.patch('/usuarios/:id', ValidaToken)
    router.delete('/usuarios/:id', ValidaToken)

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

        // #swagger.tags = ['Tarefas']
        // #swagger.summary = 'Nesse método você pode executar a consulta de uma tarefa.'
        // #swagger.description = 'Através deste método você poderá executar a consulta de uma tarefa informando seu ID.'
        /*swagger.responses[200] = {
            description: 'Retorno com sucesso, devolve uma tarefa conforme o ID informado.',
            schema:[
                {
                    nome: 'Nome da tarefa desejada',
                    descricao: 'Descrição da tarefa desejada',
                    status: 'Status da tarefa desejada',
                    id: 'ID da tarefa desejada'
                }
            ]
        }
            #swagger.responses[400] = {
                description: 'Caso algum dado informado esteja incorreto.',
                schema: 'Verifique os dados informado e tente novamente'
            }

            #swagger.responses[404] = {
                description: 'Nenhum dado foi encontrado!'
            }
        */
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

        // #swagger.tags = ['Tarefas']
        // #swagger.summary = 'Nesse método você pode executar a criação de uma tarefa.'
        // #swagger.description = 'Através deste método você poderá executar a criação de uma tarefa informando os dados.'
        /*swagger.responses[200] = {
            description: 'Retorno com sucesso, devolve uma tarefa conforme o ID informado.',
            schema:[
                {
                    nome: 'Nome da tarefa desejada',
                    descricao: 'Descrição da tarefa desejada',
                    status: 'Status da tarefa desejada',
                    id: 'ID da tarefa desejada'
                }
            ]
        }
            #swagger.responses[400] = {
                description: 'Caso algum dado informado esteja incorreto.',
                schema: 'Verifique os dados informados e tente novamente'
            }

            #swagger.responses[404] = {
                description: 'Não foi possível realizar a criação da tarefa!'
            }
        */

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

        // #swagger.tags = ['Tarefas']
        // #swagger.summary = 'Nesse método você pode executar a atualização de uma tarefa.'
        // #swagger.description = 'Através deste método você poderá executar a atualização de uma tarefa informando seu ID.'
        /*swagger.responses[200] = {
            description: 'Retorno com sucesso, altera uma tarefa conforme o ID informado.',
            schema:[
                {
                    id: 'ID da tarefa desejada'
                }
            ]
        }
            #swagger.responses[400] = {
                description: 'Caso algum dado informado esteja incorreto.',
                schema: 'Verifique o dado informado e tente novamente'
            }

            #swagger.responses[404] = {
                description: 'Não foi possível realizar a atualização da tarefa!'
            }
        */

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

        // #swagger.tags = ['Tarefas']
        // #swagger.summary = 'Nesse método você pode executar a alteração de uma tarefa.'
        // #swagger.description = 'Através deste método você poderá executar a alteração de um dado da tarefa informando seu ID.'
        /*swagger.responses[200] = {
            description: 'Retorno com sucesso, devolve uma tarefa conforme o ID informado.',
            schema:[
                {
                    nome: 'Nome da tarefa desejada',
                    descricao: 'Descrição da tarefa desejada',
                    status: 'Status da tarefa desejada',
                    id: 'ID da tarefa desejada'
                }
            ]
        }
            #swagger.responses[400] = {
                description: 'Caso algum dado informado esteja incorreto.',
                schema: 'Verifique o dado informado e tente novamente'
            }

            #swagger.responses[404] = {
                description: 'Nenhum dado foi encontrado!'
            }
        */
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

        // #swagger.tags = ['Tarefas']
        // #swagger.summary = 'Nesse método você pode executar a exclusão de uma tarefa.'
        // #swagger.description = 'Através deste método você poderá executar a exclusão de uma tarefa informando seu ID.'
        /*swagger.responses[200] = {
            description: 'Retorno com sucesso, devolve uma tarefa conforme o ID informado.',
            schema:[
                {
                    id: 'ID da tarefa desejada'
                }
            ]
        }
            #swagger.responses[400] = {
                description: 'Caso algum dado informado esteja incorreto.',
                schema: 'Verifique o dado informado e tente novamente'
            }

            #swagger.responses[404] = {
                description: 'Não foi possível realizar a exclusão!'
            }
        */

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