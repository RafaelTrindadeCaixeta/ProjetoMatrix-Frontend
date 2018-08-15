function Armazenamento () {
    var storage = window.localStorage;
   
        
    function capturarDado(chave){
        var result = JSON.parse(storage.getItem(chave));
        if (result == null){
            result = [];
        }
        return result;
    }
    function atualizarOuInserirDado(chave, dado) {
        storage.setItem(chave, JSON.stringify(dado));
    }

    
    function excluirAluno(email) {
        participantes = participantes.filter(function (elemento) {
            return elemento.email !== email
        });
        atualizarOuInserirDado("participante", participantes)
        exibirTabela();
    }

    return {
        
        capturarDado,
        atualizarOuInserirDado,
        excluirAluno,
        
    }
}

