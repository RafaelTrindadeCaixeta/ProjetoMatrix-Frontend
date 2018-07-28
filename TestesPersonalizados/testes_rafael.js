// Teste Adicional
QUnit.module( "Verificar divisão por zero", function() {
    var sistema = new SistemaCadastro();
      
    QUnit.test( "testa lista vazia", function( assert ) {
      
      var resultado = sistema.obterMediaDasNotasDosParticipantes();
      assert.equal( resultado, 0, "média dos participantes");    
    });
  });
  