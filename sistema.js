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

    const armazenamento = new Armazenamento("participantes");


    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {

        if (obterParticipante(email) === undefined) {

            var p = new Participante();
            p.nome = nome;
            p.sobrenome = sobrenome;
            p.email = email;
            p.idade = idade;
            p.sexo = sexo;

            armazenamento.adicionar(p);
        }
        else {

            throw new Error("O participante com email: " + email + ", já está cadastrado no sistema.");

        }

    }

    function removerParticipante(email) {

        return armazenamento.remover("email", email);

    }

    function atualizarParticipante(nome, sobrenome, email, idade, sexo, nota) {

        var participante = obterParticipante(email);

        participante.nome = nome;
        participante.sobrenome = sobrenome;
        participante.idade = idade;
        participante.sexo = sexo;
        adicionarNotaAoParticipante(email, nota);

        armazenamento.atualizar("email", participante);

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

    function obterParticipante(email) {

        return armazenamento.obterUm("email", email);
    }

    function obterParticipantes() {

        return armazenamento.obterTodosOsItens();

    }

    function adicionarNotaAoParticipante(email, nota) {

        var participante = armazenamento.obterUm("email", email);

        if (participante !== undefined) {
            participante.nota = nota;
            participante.aprovado = participante.nota >= 70;

        }

        return armazenamento.atualizar("email", participante);

    }

    function obterMediaDasNotasDosParticipantes() {

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

        return armazenamento.obterTodosOsItens().length;;
    }

    function verificarSeParticipanteEstaAprovado(email) {

        var participante = obterParticipante(email);
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
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,


    };
}


