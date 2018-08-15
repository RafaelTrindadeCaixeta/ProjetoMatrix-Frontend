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

/***********************
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {

    //Onde os participantes ficarão armazenados
    
    const armazenamento = new Armazenamento();
    var participantes = armazenamento.capturarDado("participante");
    

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        //implemente o código necessário

        participantes.forEach(function (element) {
            if (element.email === email) {

                alert("O email: " + email + ", já está cadastrado no sistema.");
                throw new Error("O email: " + email + ", já está cadastrado no sistema.");
            }
            return;
        });


        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;

        participantes.push(p);
    }

    function removerParticipante(email) {
        //implemente o código necessário

        return participantes.splice(participantes.findIndex(function (element) {
            return element.email === email;
        }), 1);

    }
    function buscarParticipantesPorNome(nome) {
        //implemente o código necessário

        return participantes.filter(function (element) {
            return element.nome === nome;
        });
    }
    function buscarParticipantesPorSexo(sexo) {
        //implemente o código necessário

        return participantes.filter(function (element) {
            return element.sexo === sexo;
        });
    }
    function buscarParticipantesAprovados() {
        //implemente o código necessário

        return participantes.filter(function (element) {
            return element.aprovado;
        });
    }
    function buscarParticipantesReprovados() {
        //implemente o código necessário

        return participantes.filter(function (element) {
            return element.aprovado === false;
        });

    }
    function obterParticipante(email) {
        //implemente o código necessário

        return participantes.find(function (element) {
            return element.email === email;
        });
    }
    function adicionarNotaAoParticipante(email, nota) {
        //implemente o código necessário

        var result = obterParticipante(email);
        if (result !== undefined) {
            result.nota = nota;
            verificarSeParticipanteEstaAprovado(email);
        }
        return;


    }
    function obterMediaDasNotasDosParticipantes() {
        //implemente o código necessário

        if (obterTotalDeParticipantes() === 0) {
            return 0;
        }
        else {
            var total = participantes.reduce(function (soma, element) {
                return soma + element.nota;
            }, 0);
            return total / obterTotalDeParticipantes();
        }


    }
    function obterTotalDeParticipantes() {
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email) {
        //implemente o código necessário

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
        //implemente o código necessário

        return buscarParticipantesPorSexo(sexo).length;


    }
   

    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo,
        

    };
}


