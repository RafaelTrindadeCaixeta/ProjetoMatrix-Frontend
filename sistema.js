//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}

function SistemaCadastro() {

    const armazenamento = new ArmazenamentoHTTP();

    function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {

        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;
        p.aprovado = p.nota >= 70;

        return armazenamento.adicionarDado(p);
    }

    function removerParticipante(id) {

        return armazenamento.excluirDado(id);

    }

    function atualizarParticipante(id, nome, sobrenome, email, idade, sexo, nota) {

        return obterParticipante(id)
            .then((objeto) => {
                objeto.nome = nome;
                objeto.sobrenome = sobrenome;
                objeto.idade = idade;
                objeto.sexo = sexo;
                objeto.nota = nota;
                objeto.aprovado = objeto.nota >= 70;
                

                return armazenamento.atualizarDado(objeto);
            });

    }

    function buscarParticipantesPorNome(nome) {

        return armazenamento.obterVarios("nome", nome)

    }

    function buscarParticipantesPorSexo(sexo) {

        return armazenamento.obterVarios("sexo", sexo);

    }

    function buscarParticipantesAprovados() {

        return armazenamento.obterVarios("aprovado", true);

    }

    function buscarParticipantesReprovados() {

        return armazenamento.obterVarios("aprovado", false);

    }

    function obterParticipante(id) {

        return armazenamento.obterUm(id);
    }

    function obterParticipantes() {

        return armazenamento.recuperarTodosOsDadosParticipantes();

    }

    /*function adicionarNotaAoParticipante(id, nota) {

        var participante = armazenamento.obterUm(id);

        if (participante !== undefined) {
            participante.nota = nota;
            participante.aprovado = participante.nota >= 70;

        }

        return armazenamento.atualizarDado(objeto);

    }*/

    function obterMediaDasNotasDosParticipantes() {

        var participantes = armazenamento.recuperarTodosOsDadosParticipantes();

        if (obterTotalDeParticipantes() === 0) {
            return 0;
        }
        else {
            var total = participantes.reduce(function (soma, elemento) {
                return soma + elemento.nota;
            }, 0);
            return total / obterTotalDeParticipantes();
        }
    }

    function obterTotalDeParticipantes() {

        return armazenamento.recuperarTodosOsDadosParticipantes().length;;
    }

    function verificarSeParticipanteEstaAprovado(id) {

        var participante = obterParticipante(id);
        if (participante == undefined) {
            return;
        }
        if (participante.nota >= 70) {
            participante.aprovado = true;
        }
        else {
            participante.aprovado = false;
        }
        return participante.aprovado;


    }

    function obterQuantidadeDeParticipantesPorSexo(sexo) {

        return buscarParticipantesPorSexo(sexo).length;

    }

    return {
        adicionarParticipante,
        removerParticipante,
        atualizarParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        obterParticipantes,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,


    };
}


