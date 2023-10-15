const confereTaref = require('../validacoes/usuarios');

//banco de dados em memoria
let tarefas_banco = [];

let ultimoId = 1

//converter tarefa para retornar em json
function converteTaref(tarefa){
    return{
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        status: tarefa.status,
        id: tarefa.id
    };
};

function buscarTaref(id){
    
    const filtraTaref = tarefas_banco.filter(tarefa =>{
        return tarefa.id == id
    });
    if(filtraTaref.length == 0){
        throw new Error(JSON.stringify({
            status: 404
        }));
    };
    return filtraTaref[0]; 
};

const tarefa = () => {
    return {
        getById: (id) => {

            //procurando tarefa na base
            const taref = buscarTaref(id);
            return converteTaref(taref);
        },

        getAll: (params) => {

            let filtraTaref = tarefas_banco;
            filtraTaref = tarefas_banco.map((taref) => converteTaref(taref));

            const validaCampos = Object.keys(params);

            if(validaCampos.length > 0){
                filtraTaref = filtraTaref.filter(tarefs =>{
                    let valido = true;

                    filtraTaref.forEach(campos => {
                        if(!tarefs[campos].includes(params[campo])){
                            valido = false;
                        }
                    })

                    return valido;
                })
            }

            return filtraTaref;
        },

        create: (dado) =>{

            const novaTarefa = dado;

            confereTaref(novaTarefa);

            novaTarefa.id = ++ultimoId;

            tarefas_banco.push(novaTarefa);

            return novaTarefa;
        },

        update: (dado, id) =>{

            const tarefaExistente = buscarTaref(id);

            confereTaref(dado);

            tarefaExistente.nome = dado.nome
            tarefaExistente.descricao = dado.descricao
            tarefaExistente.status = dado.status

            return tarefaExistente;
        },

        destroy: (id) =>{

            const taref = buscarTaref(id);

            tarefas_banco = tarefas_banco.filter(T => T.id != id);

            return true;
        }
    };

    module.exports = {buscarTaref, tarefa}
}