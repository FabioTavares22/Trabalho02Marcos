const validando = (tarefa) =>{
    const erros = [];

    if(new_tarefa.status != "FEITO" && new_tarefa.status != "A FAZER" && new_tarefa.status != "FAZENDO"){
        erros.push("O status da tarefa não pode ser diferente de FEITO, A FAZER ou FAZENDO");
    };

    if(tarefa.nome == ""){
        erros.push("O campo nome deve ser preenchido!");
    }

    if(tarefa.descricao == ""){
        erros.push("Por favor preencha a descrição da tarefa!");
    }

    if(tarefa.status == ""){
        erros.push("Por favor, informe o status da tarefa!");
    }

    if(erros.length > 0){
        throw new Error(JSON.stringify({
            status: 400,
            erros
        }))
    }else{
        return true;
    }
}

module.exports = validando;