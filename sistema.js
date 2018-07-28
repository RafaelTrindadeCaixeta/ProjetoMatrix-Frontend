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
    var participantes = [];

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        //implemente o código necessário
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].email==email){throw "O email: " +email+ ", já está cadastrado no sistema."}
        }
            
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
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].email==email){
                participantes.splice(i,1);
                return;
            }
        
        }

    }
    function buscarParticipantesPorNome(nome){
        //implemente o código necessário
        var result=[];
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].nome==nome){
                result.push(participantes[i]);
            }
        }
        return result
    }    
    function buscarParticipantesPorSexo(sexo){
        //implemente o código necessário
        var i=0;
        var result=[]
        while(i<obterTotalDeParticipantes()){
            if(participantes[i].sexo==sexo){
            result.push(participantes[i])
            }
            i++;
        }
        return result;
        
    }
    function buscarParticipantesAprovados(){
        //implemente o código necessário
        var result=[];
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].aprovado){
                result.push(participantes[i]);
            }
        }
        return result;
    }
    function buscarParticipantesReprovados(){
        //implemente o código necessário
        var result=[];
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].aprovado==false){
                result.push(participantes[i]);
            }
        }
        return result;
    }
    function obterParticipante(email){
        //implemente o código necessário
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            if(participantes[i].email==email){
                return participantes[i];
            }
        }
    }
    function adicionarNotaAoParticipante(email, nota){
        //implemente o código necessário
        var result= obterParticipante(email);
        if(result!=undefined){
            result.nota = nota;
            verificarSeParticipanteEstaAprovado(email);
        }
        return;
    }
    function obterMediaDasNotasDosParticipantes(){
        //implemente o código necessário
        if(obterTotalDeParticipantes()==0){
            return 0;
        }

        var result=0;
        for(var i=0; i<obterTotalDeParticipantes(); i++){
            result += participantes[i].nota
        }
        return result/obterTotalDeParticipantes();
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        //implemente o código necessário
        var participante = obterParticipante(email);
        if(participante == undefined){
            return;
        }
        if(participante.nota>=70){
            participante.aprovado=true;    
        }
        else{
            participante.aprovado=false;
        }         
    return participante.aprovado;

    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
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
        obterQuantidadeDeParticipantesPorSexo    
    };
}