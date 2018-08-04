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
   var armazenamento = new Armazenamento()
    var participantes = armazenamento.capturarDado("participante");
    var emailAtual;
    var modoEdicao;

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

    function cadastrar() {
        var email = document.getElementById("Email").value;
        var nome = document.getElementById("Nome").value;
        var sobrenome = document.getElementById("Sobrenome").value;
        var idade = document.getElementById("Idade").value;
        var sexo = document.querySelector('input[name=sexo]:checked').value === "masculino" ? 1 : 2;
        var nota = document.getElementById("Nota").value;

        if (modoEdicao) {
            if (email !== emailAtual) {
                if (sistema.obterParticipante(email) != undefined) {
                    alert("Não é possível editar participante. Email já cadastrado.");
                    alterarModoEdicao(false);
                    return;
                }
            }
            sistema.excluirAluno(emailAtual);
        }

        sistema.adicionarParticipante(nome, sobrenome, email, idade, sexo)
        sistema.adicionarNotaAoParticipante(email, nota)

        armazenamento.atualizarOuInserirDado("participante", participantes);

        sistema.exibirTabela();
        alterarModoEdicao(false);
    }

    function exibirTabela() {
        var alunos = armazenamento.capturarDado("participante");
        document.getElementById("corpo").innerHTML = "";
        alunos.forEach(function (elemento) {
            console.log(elemento);
            document.getElementById("corpo").innerHTML +=
                "<tr><td>" + elemento.nome + " " + elemento.sobrenome + "</td><td>" +
                elemento.idade + "</td><td>" + (elemento.sexo === 1 ? "Masculino" : "Feminino") + "</td><td>" +
                elemento.nota + "</td><td>" + (elemento.aprovado === true ? "Sim" : "Não") + "</td><td>" +
                "<a href='#corpo' onclick='sistema.editarAluno(\"" + elemento.email + "\")' >EDITAR</a> | <a href='#corpo'onclick='sistema.excluirAluno(\"" + elemento.email + "\")' >EXCLUIR</a></td></tr>"
        });

    }

    function excluirAluno(email) {
        participantes = participantes.filter(function (elemento) {
            return elemento.email !== email
        });
        armazenamento.atualizarOuInserirDado("participante", participantes)
        sistema.exibirTabela();
    }

    function editarAluno(email) {
        var participante = sistema.obterParticipante(email);
        emailAtual = email;
        
        alterarModoEdicao(true) 
        document.getElementById("Nome").value = participante.nome;
        document.getElementById("Sobrenome").value = participante.sobrenome;
        document.getElementById("Idade").value = participante.idade;
        document.getElementById("Email").value = participante.email;
        participante.sexo === 1 ? document.getElementById('radio-masculino').checked = true : document.getElementById('radio-feminino').checked = true;
        document.getElementById("Nota").value = participante.nota;
    }

    function alterarModoEdicao(modoAtivado) {
        modoEdicao = modoAtivado;
        if(modoAtivado) {
            document.getElementById("modo-edicao").style.display = "block";
        }
        else {
            emailAtual = "";
            document.getElementById("modo-edicao").style.display = "none"
        }
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
        cadastrar,
        exibirTabela,
        excluirAluno,
        editarAluno,
    };
}

var sistema = new SistemaCadastro();
sistema.exibirTabela();

