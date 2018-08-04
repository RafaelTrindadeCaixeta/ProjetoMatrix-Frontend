function Armazenamento () {
    var storage = window.localStorage;
    
    function capturarDado(chave){
        return JSON.parse(storage.getItem(chave));
    }
    function atualizarOuInserirDado(chave, dado) {
        storage.setItem(chave, JSON.stringify(dado));
    }

    return {
        capturarDado,
        atualizarOuInserirDado,
    }
}

