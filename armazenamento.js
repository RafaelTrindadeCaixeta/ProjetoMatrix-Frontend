function Armazenamento(chave) {


    if (window.localStorage.getItem(chave) === null)
        window.localStorage.setItem(chave, "[]");

    function adicionar(item) {

        var itens = deserializar();

        itens.push(item);

        serializar(itens);
    }

    function remover(propriedade, valor) {

        var itens = deserializar();

        var indice = itens.findIndex(function (elemento) {

            return elemento[propriedade] === valor;
        });

        itens.splice(indice, 1);

        serializar(itens);
    }

    function atualizar(item, propriedade) {

        var itens = deserializar();

        var indice = itens.findIndex(function (elemento) {
            return elemento[item] === propriedade[item]
        });

        itens[indice] = propriedade;

        serializar(itens);
    }

    function obterUm(propriedade, valor) {

        var itens = deserializar();

        return itens.find(function (elemento) {
            return elemento[propriedade] === valor;
        });
    }

    function obterVarios(propriedade, valor) {

        var itens = deserializar();

        return itens.filter(function (elemento) {
            return elemento[propriedade] === valor;
        });
    }

    function obterTodosOsItens() {
        return deserializar();
    }

    function deserializar() {

        var itensSerializados = window.localStorage.getItem(chave);

        return JSON.parse(itensSerializados);
    }

    function serializar(itens) {

        var itensSerializados = JSON.stringify(itens);

        window.localStorage.setItem(chave, itensSerializados);
    }

    return {
        adicionar,
        remover,
        atualizar,
        obterUm,
        obterVarios,
        obterTodosOsItens
    };
}