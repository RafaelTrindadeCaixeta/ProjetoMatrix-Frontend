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

    return {
        capturarDado,
        atualizarOuInserirDado,
    }
}