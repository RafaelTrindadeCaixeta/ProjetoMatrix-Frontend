
var sistema = new SistemaCadastro();
var modoEdicao = false;


(function () {
    exibirTabela()

})();


function salvar() {
    var form = document.querySelector("#formulario");
    var sexo = document.querySelector('input[name=sexo]:checked').value === "masculino" ? 1 : 2;

    if (modoEdicao) {
        sistema.atualizarParticipante(
            form.nome.value,
            form.sobrenome.value,
            form.email.value,
            form.idade.value,
            sexo,
            form.nota.value
        );
        window.location.reload(true);
        window.alert("Participante editado com sucesso!");
    }
    else {
        try {
            sistema.adicionarParticipante(
                form.nome.value,
                form.sobrenome.value,
                form.email.value,
                form.idade.value,
                sexo
            );
            sistema.adicionarNotaAoParticipante(
                form.email.value,
                form.nota.value
            );
            window.alert("Participante inserido com sucesso!");
            window.location.reload(true);
        }
        catch (Error) {
            window.alert(Error.message);
        }
    }
    modoEdicao = false;
}


function editarAluno(email) {
    modoEdicao = true;    
    var participante = sistema.obterParticipante(email);
    var form = document.querySelector("#formulario");

    form.nome.value = participante.nome;
    form.sobrenome.value = participante.sobrenome;
    form.idade.value = participante.idade;
    form.email.value = participante.email;
    participante.email.disabled = true;
    form.sexo.value = participante.sexo === 1 ? "masculino" : "feminino";
    form.nota.value = participante.nota;

}

function excluirAluno() {

    sistema.removerParticipante(email);
    window.location.reload(true);

}
function exibirTabela() {

    var participante = sistema.obterParticipantes();

    document.getElementById("corpo").innerHTML = "";
    participante.forEach(function (objeto) {

        document.getElementById("corpo").innerHTML +=
            "<tr><td>" + objeto.nome + " " + objeto.sobrenome + "</td><td>" +
            objeto.idade + "</td><td>" + (objeto.sexo === 1 ? "Masculino" : "Feminino") + "</td><td>" +
            objeto.nota + "</td><td>" + (objeto.aprovado === true ? "Sim" : "Não") + "</td><td>" +
            "<a href='#' onclick='editarAluno(\"" + objeto.email + "\")' >EDITAR</a> | <a href='#corpo'onclick='excluirAluno(\"" + objeto.email + "\")' >EXCLUIR</a></td></tr>"
    });

}



