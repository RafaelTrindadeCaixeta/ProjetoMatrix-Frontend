function cadastrar() {
    var sistema = new SistemaCadastro();
    var emailAtual;
    var modoEdicao;
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
    
    location.reload()


    function alterarModoEdicao(modoAtivado) {
        modoEdicao = modoAtivado;
        if (modoAtivado) {
            document.getElementById("modo-edicao").style.display = "block";
        }
        else {
            emailAtual = "";
            document.getElementById("modo-edicao").style.display = "none"
        }
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


    function exibirTabela() {
        var alunos = capturarDado("participante");

        document.getElementById("corpo").innerHTML = "";
        alunos.forEach(function (elemento) {
            console.log(elemento);
            document.getElementById("corpo").innerHTML +=
                "<tr><td>" + elemento.nome + " " + elemento.sobrenome + "</td><td>" +
                elemento.idade + "</td><td>" + (elemento.sexo === 1 ? "Masculino" : "Feminino") + "</td><td>" +
                elemento.nota + "</td><td>" + (elemento.aprovado === true ? "Sim" : "Não") + "</td><td>" +
                "<a href='#' onclick='sistema.editarAluno(\"" + elemento.email + "\")' >EDITAR</a> | <a href='#corpo'onclick='sistema.excluirAluno(\"" + elemento.email + "\")' >EXCLUIR</a></td></tr>"
        });

    }

    return {
        cadastrar,
        alterarModoEdicao,
        editarAluno,
        exibirTabela,

    };

}

