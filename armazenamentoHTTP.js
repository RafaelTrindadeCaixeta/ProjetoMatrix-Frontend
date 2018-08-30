function ArmazenamentoHTTP() {

    function recuperarTodosOsDadosParticipantes() {
        var participantes = [];
        $.ajax({
            type: 'GET',
            url: 'http://matrix.avalie.net/api/participantes',
            datatype: 'json',
            success: function (data) {
                participantes = data;
            }
        });

        return participantes;
    }

    function adicionarDado(objeto) {
        $.ajax({
            type: 'POST',
            url: 'http://matrix.avalie.net/api/participantes',
            datatype: 'json',
            data: JSON.stringify(objeto),
            async: false

        });
    }

    function excluirDado(qualidade, elemento) {
        var participante = obterUm(qualidade, elemento);
        $.ajax({
            type: 'DELETE',
            url: 'http://matrix.avalie.net/api/participantes'+ participante.id,
            datatype: 'json',
            async: true
        })
    }

    function atualizarDado(objeto) {
        $.ajax({
            type: 'PUT',
            url: 'http://matrix.avalie.net/api/participantes' + objeto.id,
            datatype: 'json',
            data: JSON.stringify(objeto),
            async: false
        })

    }

    function obterUm(qualidade, elemento) {
        return recuperarTodosOsDadosParticipantes().find(function (objeto) {
            return objeto[qualidade] === elemento;
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