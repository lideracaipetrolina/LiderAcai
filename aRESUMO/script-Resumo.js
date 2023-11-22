document.addEventListener('DOMContentLoaded', function () {
  const dataText = sessionStorage.getItem('dataText');
  const valorProduto = sessionStorage.getItem('valorProduto');
  const escolhaCobertura = JSON.parse(sessionStorage.getItem('escolhaCobertura')) || [];
  const escolhaFrutas = JSON.parse(sessionStorage.getItem('escolhaFrutas')) || [];
  const escolhaComplementos = JSON.parse(sessionStorage.getItem('escolhaComplementos')) || [];
  const escolhaExtras = JSON.parse(sessionStorage.getItem('escolhaExtras')) || [];
  const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};

  // Exibir PRODUTO--------------------------------------------------
  document.getElementById('produtoInfo').innerHTML = `
    <br><span style="font-weight: bold;">TAMANHO</span>
    <br><span style="font-weight: bold;">PRODUTO:</span> ${dataText}${valorProduto}`;

  // Exibir ACOMPANHAMENTOS---------------------------------------------------
  function formatarObjetoParaString(objeto) {
    return Array.isArray(objeto) ? formatarEscolhas(objeto) : JSON.stringify(objeto, null, 2);
  }

  function formatarEscolha(escolha) {
    return `${escolha.texto}: ${parseFloat(escolha.valor).toFixed(2)}`;
  }

  function formatarEscolhas(escolhas) {
    return escolhas.map(formatarEscolha).join('<br>');
  }

  // Exiba os valores formatados no HTML
  document.getElementById('escolhasInfo').innerHTML = `
  <br>--------------------------------------------------------
    <br><span style="font-weight: bold;">ACOMPANHAMENTO</span>
    <br><span style="font-weight: bold;">COBERTURA:</span> <br>${formatarObjetoParaString(escolhaCobertura)}
    <br><br><span style="font-weight: bold;">FRUTAS:</span> <br>${formatarObjetoParaString(escolhaFrutas)}
    <br><br><span style="font-weight: bold;">COMPLEMENTO:</span> <br>${formatarObjetoParaString(escolhaComplementos)}
    <br><br><span style="font-weight: bold;">EXTRAS:</span> <br>${formatarObjetoParaString(escolhaExtras)} <br>
    --------------------------------------------------------
    `;

  // CALCULO ---------------------------------
  const somarArray = (array) => {
    return array.filter((item) => item && typeof item === 'object' && 'valor' in item).reduce((acumulador, item) => acumulador + parseFloat(item.valor), 0);
  };

  // Somar os valores de cada array
  const somaCobertura = somarArray(escolhaCobertura);
  const somaFrutas = somarArray(escolhaFrutas);
  const somaComplementos = somarArray(escolhaComplementos);
  const somaExtras = somarArray(escolhaExtras);

  // Calcular a soma total
  const somaTotal = parseFloat(valorProduto) + somaCobertura + somaFrutas + somaComplementos + somaExtras;

  // Construir o texto com os resultados
  document.getElementById('gastoGeral').innerHTML = `
<br><span style="font-weight: bold;">RESUMO TOTAL À PAGAR(R$)</span><br>
<span style="font-weight: bold;">Tamanho R$:</span> ${valorProduto} <br>
<span style="font-weight: bold;">Cobertura R$:</span> ${somaCobertura.toFixed(2)} <br>
<span style="font-weight: bold;">Frutas R$:</span> ${somaFrutas.toFixed(2)} <br>
<span style="font-weight: bold;">Complementos R$:</span> ${somaComplementos.toFixed(2)} <br>
<span style="font-weight: bold;">Extras R$:</span> ${somaExtras.toFixed(2)} <br>
<span style="font-weight: bold;">VALOR TOTAL R$:</span> ${somaTotal.toFixed(2)}
`;


  // Exibir ENDEREÇO----------------------------------------------------
  document.getElementById('produtoEndereco').innerHTML = `
  --------------------------------------------------------
  <br><span style="font-weight: bold;">ENDEREÇO</span>
  <br><span style="font-weight: bold;">Nome da Rua:</span> ${endereco.nomeRua}
  <br><span style="font-weight: bold;">Número da Casa/AP:</span> ${endereco.numeroCasa}
  <br><span style="font-weight: bold;">CEP:</span> ${endereco.cep}
  <br><span style="font-weight: bold;">Cidade:</span> ${endereco.cidade}
  <br><span style="font-weight: bold;">Bairro:</span> ${endereco.bairro}
  <br><span style="font-weight: bold;">Ponto de Referência:</span> ${endereco.referencia}
  
  `;

});





//DIVISÃO DAS DUAS FUNÇÕES--------------------------------------------------


//FORMA DE PAGAMENTO
document.addEventListener('DOMContentLoaded', function () {
  var formasPagamento = document.getElementsByName('pagamento');
  for (var i = 0; i < formasPagamento.length; i++) {
    formasPagamento[i].addEventListener('change', mostrarTroco);
  }

  function mostrarTroco() {
    var escolhaPagamento = document.querySelector('input[name="pagamento"]:checked').value;
    var trocoSection = document.getElementById('trocoSection');

    if (escolhaPagamento === 'DINHEIRO') {
      trocoSection.style.display = 'block';
    } else {
      trocoSection.style.display = 'none';
    }
  }
});



//ENVIAR ZAP----------------------------------------------
function enviarMensagemWhatsApp() {
  // // Obtenha os dados necessários
  const dataText = sessionStorage.getItem('dataText');
  const valorProduto = sessionStorage.getItem('valorProduto');
  const escolhaCobertura = JSON.parse(sessionStorage.getItem('escolhaCobertura')) || [];
  const escolhaFrutas = JSON.parse(sessionStorage.getItem('escolhaFrutas')) || [];
  const escolhaComplementos = JSON.parse(sessionStorage.getItem('escolhaComplementos')) || [];
  const escolhaExtras = JSON.parse(sessionStorage.getItem('escolhaExtras')) || [];
  const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};

  //ACOMPANHAMENTO----------------------------------------------------------------------------------
  function formatarObjetoParaString(objeto) {
    return Array.isArray(objeto) ? formatarEscolhas(objeto) : JSON.stringify(objeto, null, 2);
  }

  function formatarEscolha(escolha) {
    return `${escolha.texto}: ${parseFloat(escolha.valor).toFixed(2)}`;
  }

  function formatarEscolhas(escolhas) {
    return escolhas.map(formatarEscolha).join('\n');
  }

  // CALCULO ---------------------------------
  const somarArray = (array) => {
    return array.filter((item) => item && typeof item === 'object' && 'valor' in item).reduce((acumulador, item) => acumulador + parseFloat(item.valor), 0);
  };

  // Somar os valores de cada array
  const somaCobertura = somarArray(escolhaCobertura);
  const somaFrutas = somarArray(escolhaFrutas);
  const somaComplementos = somarArray(escolhaComplementos);
  const somaExtras = somarArray(escolhaExtras);

  // Calcular a soma total
  const somaTotal = parseFloat(valorProduto) + somaCobertura + somaFrutas + somaComplementos + somaExtras;

  // Construir o texto com os resultados
  document.getElementById('gastoGeral').innerHTML = `
  <br><span style="font-weight: bold;">RESUMO TOTAL À PAGAR(R$)</span><br>
  <span style="font-weight: bold;">Tamanho R$:</span> ${valorProduto} <br>
  <span style="font-weight: bold;">Cobertura R$:</span> ${somaCobertura.toFixed(2)} <br>
  <span style="font-weight: bold;">Frutas R$:</span> ${somaFrutas.toFixed(2)} <br>
  <span style="font-weight: bold;">Complementos R$:</span> ${somaComplementos.toFixed(2)} <br>
  <span style="font-weight: bold;">Extras R$:</span> ${somaExtras.toFixed(2)} <br>
  <span style="font-weight: bold;">VALOR TOTAL R$:</span> ${somaTotal.toFixed(2)}`;


  // Constrói o texto a ser enviado
  const textoParaEnviar = `
*TAMANHO*
*Produto:* ${dataText} - Valor: ${valorProduto}

\n*ACOMPANHAMENTO*
\n*COBERTURA:* \n${formatarObjetoParaString(escolhaCobertura)}
\n*FRUTAS:* \n${formatarObjetoParaString(escolhaFrutas)}
\n*COMPLEMENTO:* \n${formatarObjetoParaString(escolhaComplementos)}
\n*EXTRAS:* \n${formatarObjetoParaString(escolhaExtras)}

\n*TOTAL À PAGAR (R$)*
*Tamanho R$:* ${valorProduto}
*Cobertura R$:* ${somaCobertura.toFixed(2)}
*Frutas R$:* ${somaFrutas.toFixed(2)}
*Complementos R$: ${somaComplementos.toFixed(2)}
*Extras R$:* ${somaExtras.toFixed(2)}
*VALOR TOTAL R$:* ${somaTotal.toFixed(2)}

\n*FORMA DE PAGAMENTO*
${document.querySelector('input[name="pagamento"]:checked').value}
${document.querySelector('input[name="pagamento"]:checked').value === 'DINHEIRO' && document.getElementById('valorTroco').value.trim() !== '' ? '\n*VALOR DE TROCO (R$)*\n' + document.getElementById('valorTroco').value : ''}

\n*ENDEREÇO PARA ENTREGA*
*Nome da Rua:* ${endereco.nomeRua}
*Número da Casa/AP:* ${endereco.numeroCasa}
*CEP:* ${endereco.cep}
*Cidade:* ${endereco.cidade}
*Bairro:* ${endereco.bairro}
Ponto de Referência:${endereco.referencia}
`;

  const codigoPais = '55';
  const numeroTelefone = '87991614277';
  const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
  window.open(linkWhatsApp, '_blank');
}
