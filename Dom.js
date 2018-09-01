var sistema = new SistemaCadastro();
var idObjeto = 0;
var modoEdicao = false;


(function () {
    exibirTabela()

})();

function salvar() {

    var form = document.querySelector("#formulario");
    var sexo = document.querySelector('input[name=sexo]:checked').value === "masculino" ? 1 : 2;

    if (modoEdicao) {

        sistema.atualizarParticipante(
            idObjeto,
            form.nome.value,
            form.sobrenome.value,
            form.email.value,
            form.idade.value,
            sexo,
            form.nota.value
        )

            .then(() => {
                window.alert("Participante editado com sucesso!");
                window.location.reload(true);
            });
    }
    else {

        sistema.adicionarParticipante(
            form.nome.value,
            form.sobrenome.value,
            form.email.value,
            form.idade.value,
            sexo,
            form.nota.value
        )
            .then(() => {
                window.alert("Participante inserido com sucesso!");
                window.location.reload(true);
            })
            .catch((result) => {
                window.alert(result);
                window.location.reload(true)
            });

    }
    modoEdicao = false;
    form.email.disabled = false;
    idObjeto = 0;
}

function editarAluno(id) {
    idObjeto = id;
    modoEdicao = true;
    var form = document.querySelector("#formulario");
    sistema.obterParticipante(id)
        .then((participante) => {

            form.nome.value = participante.nome;
            form.sobrenome.value = participante.sobrenome;
            form.idade.value = participante.idade;
            form.email.value = participante.email;
            participante.email.disabled = true;
            form.sexo.value = participante.sexo === 1 ? "masculino" : "feminino";
            form.nota.value = participante.nota;
        });
}

function excluirAluno(id) {

    sistema.removerParticipante(id)
        .then(() => {
            window.alert("Participante excluído com sucesso!");
            window.location.reload(true);

        });

}
function exibirTabela() {

    sistema.obterParticipantes()
        .then((participante) => {
            participante.forEach(function (objeto) {

                document.getElementById("corpo").innerHTML +=
                    "<tr><td>" + objeto.id + "</td><td>" + objeto.nome + " " + objeto.sobrenome + "</td><td>" +
                    objeto.idade + "</td><td>" + (objeto.sexo === 1 ? "Masculino" : "Feminino") + "</td><td>" +
                    objeto.nota + "</td><td>" + (objeto.aprovado === true ? "Sim" : "Não") + "</td><td>" +
                    "<a href='#' onclick='editarAluno(\"" + objeto.id + "\")' >EDITAR</a> | <a href='#corpo'onclick='excluirAluno(\"" + objeto.id + "\")' >EXCLUIR</a></td></tr>"
            });
        })

}



