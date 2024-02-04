
const carrinhoCompras = () => {
 let somaGeral = 0
  const container = document.querySelector('.conteudo');

  const Apagar = (div, chaveProduto, chaveValor,somaTotal) => {
    let excluir = document.createElement('button');
    excluir.setAttribute("class", "excluirItem");
    excluir.innerHTML = "REMOVER";
    div.appendChild(excluir);
    

    excluir.addEventListener('click', ()=> {
      container.removeChild(div); // Remove a div que contém o botão
      removerSessionStorage(chaveProduto, chaveValor);
//Subtrai o valor junto com a exclusão
      somaGeral -= somaTotal;
      document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)}`;
    });
  };

  const removerSessionStorage = (chaveProduto, chaveValor) => {
    sessionStorage.removeItem(chaveProduto);
    sessionStorage.removeItem(chaveValor);
  };

  const CriaDiv = () => {
    for (let i = 0; i < sessionStorage.length; i++) {
      const chaveProduto = `escolhaProduto_${i}`;
      const chaveValor = `escolhaProdutoValor_${i}`;

      const chaveCobertura = `escolhaCobertura_${i}`;
      const chaveFruta = `escolhaFruta_${i}`;
      const chaveComplemento = `escolhaComplemento_${i}`;
      const chaveExtra = `escolhaExtras_${i}`;

      const escolhaProduto = sessionStorage.getItem(chaveProduto);
      const escolhaValor = parseFloat(sessionStorage.getItem(chaveValor));
      const escolhaCobertura = JSON.parse(sessionStorage.getItem(chaveCobertura)) || [];
      const escolhaFrutas = JSON.parse(sessionStorage.getItem(chaveFruta)) || [];
      const escolhaComplementos = JSON.parse(sessionStorage.getItem(chaveComplemento)) || [];
      const escolhaExtras = JSON.parse(sessionStorage.getItem(chaveExtra)) || [];
      
    
     

if (escolhaProduto && escolhaCobertura && escolhaFrutas && escolhaComplementos &&  escolhaExtras && !isNaN(escolhaValor)) {
        let div = document.createElement('div');
        div.setAttribute("class", "mercadoria");
        
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
 div.innerHTML += `
 <p>
 <br> <br><span style="font-weight: bold;">PRODUTO:</span> <br>${escolhaProduto} - R$ ${escolhaValor.toFixed(2)}
 <br>
   <br><span style="font-weight: bold;">ACOMPANHAMENTOS</span>
   <br><br><span style="font-weight: bold;">COBERTURA:</span> <br>${formatarObjetoParaString(escolhaCobertura)}
   <br><br><span style="font-weight: bold;">FRUTAS:</span> <br>${formatarObjetoParaString(escolhaFrutas)}
   <br><br><span style="font-weight: bold;">COMPLEMENTO:</span> <br>${formatarObjetoParaString(escolhaComplementos)}
   <br><br><span style="font-weight: bold;">EXTRAS:</span> <br>${formatarObjetoParaString(escolhaExtras)} <br></p>
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
  const somaTotal = parseFloat(escolhaValor) + somaCobertura + somaFrutas + somaComplementos + somaExtras;

  // Construir o texto com os resultados
  div.innerHTML += `
<p><br><span style="font-weight: bold;">RESUMO TOTAL À PAGAR(R$)</span><br>
<span style="font-weight: bold;">Tamanho R$:</span> ${escolhaValor.toFixed(2)} <br>
<span style="font-weight: bold;">Cobertura R$:</span> ${somaCobertura.toFixed(2)} <br>
<span style="font-weight: bold;">Frutas R$:</span> ${somaFrutas.toFixed(2)} <br>
<span style="font-weight: bold;">Complementos R$:</span> ${somaComplementos.toFixed(2)} <br>
<span style="font-weight: bold;">Extras R$:</span> ${somaExtras.toFixed(2)} <br><br>
<span style="font-weight: bold;">VALOR TOTAL R$:</span> ${somaTotal.toFixed(2)}</p>
`;


container.appendChild(div);
Apagar(div, chaveProduto, chaveValor,somaTotal);

calcular(somaTotal)
     }
    }
  }
  const calcular = (somaTotal) => {
    somaGeral += somaTotal;
      };

 CriaDiv()
 document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)}`;
}
document.addEventListener('DOMContentLoaded', carrinhoCompras);



// //----------------------zap
// export function enviarZap() {
//   let somaTotal = 0;
//   let textoParaEnviar = '';

//   const calcular = (escolhaValor, escolhaQuantidade) => {
//     somaTotal += escolhaValor * escolhaQuantidade;
//       };

//   for (let i = 0; i < sessionStorage.length; i++) {
//     const chaveProduto = `escolhaProduto_${i}`;
//     const chaveValor = `escolhaProdutoValor_${i}`;
//     const chaveCores = `cores_${i}`;
//     const chaveTamanho = `tamanhos_${i}`;
//     const chaveQuantidade = `opcoes_${i}`;

//     const escolhaProduto = sessionStorage.getItem(chaveProduto);
//     const escolhaValor = parseFloat(sessionStorage.getItem(chaveValor));
//     const escolhaCores = sessionStorage.getItem(chaveCores);
//     const escolhaTamanho = sessionStorage.getItem(chaveTamanho);
//     const escolhaQuantidade = parseFloat(sessionStorage.getItem(chaveQuantidade));


//     if (escolhaProduto && escolhaQuantidade && escolhaCores && escolhaTamanho && !isNaN(escolhaValor)) {

//       const soma = escolhaValor * escolhaQuantidade;
//       calcular(escolhaValor, escolhaQuantidade);
    

//       textoParaEnviar += `
//           \n*SANDÁLIA:* ${escolhaProduto}
//           *VALOR:* R$ ${escolhaValor.toFixed(2)}
//           *COR:* ${escolhaCores}
//           *TAMANHO:* ${escolhaTamanho}
//           *QUANTIDADE (PAR):* ${escolhaQuantidade}
//           *VALOR TOTAL:* R$ ${soma.toFixed(2)}
//         `;
//      }
//   }

//   const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};
//   const retiradaProduto = sessionStorage.getItem('escolhaEntrega')

//   const formaPagamento = sessionStorage.getItem('formaPagamento');
//   const valorTroco = sessionStorage.getItem('Vtroco');

//   // Verifica se o endereço foi preenchido
//   const enderecoPreenchido = (endereco.nomeRua || endereco.numeroCasa || endereco.cep || endereco.cidade || endereco.bairro || endereco.referencia);

//   let enderecoTexto = '';
//   if (enderecoPreenchido) {
//     enderecoTexto = `
//                \n*ENDEREÇO PARA ENTREGA*
//                *Nome da Rua:* ${endereco.nomeRua || 'Não fornecido'}
//                *Número da Casa/AP:* ${endereco.numeroCasa || 'Não fornecido'}
//                *CEP:* ${endereco.cep || 'Não fornecido'}
//                *Cidade:* ${endereco.cidade || 'Não fornecido'}
//                *Bairro:* ${endereco.bairro || 'Não fornecido'}
//                *Ponto de Referência:* ${endereco.referencia || 'Não fornecido'}
//            `;
//   }

//   textoParaEnviar += `\n*VALOR GERAL:*  R$ ${somaTotal.toFixed(2)}`

//   textoParaEnviar += ` \n\n*RETIRADA NO LOCAL*: ${retiradaProduto}`

//   textoParaEnviar += `${enderecoTexto}`

//   if (formaPagamento) {
//     textoParaEnviar += `
//       \n*FORMA DE PAGAMENTO:* ${formaPagamento} 
//     `;
//   } 
  
//   if (valorTroco) {
//     textoParaEnviar += `
//     *TROCO:* ${valorTroco}
//     `;
//   }
  



//   const codigoPais = '55';
//   const numeroTelefone = '87991614277';

//   const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
//   window.open(linkWhatsApp, '_blank');
// }
