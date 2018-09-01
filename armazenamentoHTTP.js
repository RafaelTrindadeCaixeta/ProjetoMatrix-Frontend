function ArmazenamentoHTTP() {

    function recuperarTodosOsDadosParticipantes() {

        return axios.get('http://matrix.avalie.net/api/participantes/')
            .then(function (result) {
                return result.data;
            });
    }

    function adicionarDado(objeto) {
        return axios.post('http://matrix.avalie.net/api/participantes', objeto)
            .then(function (result) {
                return result.data;
            })
            .catch(function (response) {
                throw response.data.message;
            });
    }

    function excluirDado(id) {
        return axios.delete('http://matrix.avalie.net/api/participantes/' + id);
    }

    function atualizarDado(objeto) {
        return axios.put('http://matrix.avalie.net/api/participantes/' + objeto.id, objeto)
            .then(function (result) {
                return result.data;
            });
    }

    function obterUm(id) {
        return axios.get('http://matrix.avalie.net/api/participantes/' + id)
            .then(function (result) {
                return result.data;
            });
    }

    function obterVarios(qualidade, elemento) {
        return recuperarTodosOsDadosParticipantes().filter(function (objeto) {
            return objeto[qualidade] === elemento;
        });

    }
    return {
        recuperarTodosOsDadosParticipantes,
        adicionarDado,
        excluirDado,
        atualizarDado,
        obterUm,
        obterVarios
    }

} 