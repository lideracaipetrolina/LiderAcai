//FORMA DE PAGAMENTO


const FormaPagamento = () => {
    let formasPagamento = document.getElementsByName('pagamento');
    for (let i = 0; i < formasPagamento.length; i++) {
        formasPagamento[i].addEventListener('change', mostrarTroco);
    }

    function mostrarTroco() {
        let escolhaPagamento = document.querySelector('input[name="pagamento"]:checked').value;


        let trocoSection = document.getElementById('trocoSection');

        if (escolhaPagamento) {
            if (escolhaPagamento === 'DINHEIRO') {
                trocoSection.style.display = 'block';
                sessionStorage.setItem('formaPagamento', 'DINHEIRO');
            }
            else if (escolhaPagamento === 'CARTÃO' || escolhaPagamento === 'PIX') {
                trocoSection.style.display = 'none';
                sessionStorage.setItem('formaPagamento', escolhaPagamento);
            }
        }
    }


    const Troco = () => {
        let valorTroco = document.getElementById('valorTroco').value.trim();
        if (valorTroco) {
            sessionStorage.setItem('Vtroco', valorTroco);
        }

    }

    const VerificarDados = () => {
        // Verifica se pelo menos uma forma de pagamento foi escolhida antes de prosseguir
        
        if(sessionStorage.getItem('formaPagamento')) {
            enviarMensagemWhatsApp();
        }
       else if (!sessionStorage.getItem('formaPagamento')) {
            alert("Escolha uma forma de pagamento!");
            return true; // Impede a continuação se nenhuma forma de pagamento foi escolhida
        } 
    }

    document.querySelector("#Fpagamento").addEventListener("click", () => {
        Troco()
        VerificarDados()
        FormaPagamento()
    });
};

document.addEventListener('DOMContentLoaded', FormaPagamento);


const enviarMensagemWhatsApp=()=> {
    let somaGeral = 0
    let textoParaEnviar = '';
  
    const calcular = (somaTotal)=> {
      somaGeral += somaTotal;
    };
//contador de pedidos
    let numeroPedido = 1;

    for (let i = 0; i < sessionStorage.length; i++) {
      const chaveQuantidade = `quantidadeProduto_${i}`
      const chaveProduto = `escolhaProduto_${i}`;
      const chaveValor = `escolhaProdutoValor_${i}`;
  
      const chaveCobertura = `escolhaCobertura_${i}`;
      const chaveFruta = `escolhaFruta_${i}`;
      const chaveComplemento = `escolhaComplemento_${i}`;
      const chaveExtra = `escolhaExtras_${i}`;
      const chaveCreme = `escolhaCremes_${i}`;
  
      const escolhaQuantidade = sessionStorage.getItem(chaveQuantidade);
      const escolhaProduto = sessionStorage.getItem(chaveProduto);
      const escolhaValor = parseFloat(sessionStorage.getItem(chaveValor));
      const escolhaCobertura = JSON.parse(sessionStorage.getItem(chaveCobertura)) || [];
      const escolhaFrutas = JSON.parse(sessionStorage.getItem(chaveFruta)) || [];
      const escolhaComplementos = JSON.parse(sessionStorage.getItem(chaveComplemento)) || [];
      const escolhaExtras = JSON.parse(sessionStorage.getItem(chaveExtra)) || [];
      const escolhaCreme = JSON.parse(sessionStorage.getItem(chaveCreme)) || [];

  
      if (escolhaProduto && !isNaN(escolhaValor)) {
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
    return escolhas.map(formatarEscolha).join('\n');
  }

      // CALCULO ---------------------------------
      const somarArray = (array) => {
        return array.filter((item) => item && typeof item === 'object' && 'valor' in item).reduce((acumulador, item) => acumulador + parseFloat(item.valor), 0);
      };

      // Somar os valores de cada array
      const somaCreme = somarArray(escolhaCreme);
      const somaCobertura = somarArray(escolhaCobertura);
      const somaFrutas = somarArray(escolhaFrutas);
      const somaComplementos = somarArray(escolhaComplementos);
      const somaExtras = somarArray(escolhaExtras);

      // Calcular a soma total
      const somaTotal = parseFloat(escolhaValor) * escolhaQuantidade + (somaCobertura + somaFrutas + somaComplementos + somaExtras + somaCreme);


        textoParaEnviar += `
        \n*PEDIDO Nº:* ${numeroPedido}
        *PRODUTO:* ${escolhaProduto} - R$ ${escolhaValor.toFixed(2)}
        *QUANTIDADE:* ${escolhaQuantidade}
        \n*CREME:* \n ${formatarObjetoParaString(escolhaCreme)}
        \n*ACOMPANHAMENTOS*
        *COBERTURA:* \n ${formatarObjetoParaString(escolhaCobertura)}
        *FRUTAS:*  \n${formatarObjetoParaString(escolhaFrutas)}
        *COMPLEMENTO:* \n${formatarObjetoParaString(escolhaComplementos)}
        *EXTRAS:*  \n${formatarObjetoParaString(escolhaExtras)} 
        ____________________________________
   `;

   numeroPedido++;
        calcular(somaTotal)
      }
    }

     //TRECHO PARA GERAR ENDEREÇO 
     const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};
     const retiradaProduto = sessionStorage.getItem('escolhaEntrega')
   
     const formaPagamento = sessionStorage.getItem('formaPagamento');
     const valorTroco = sessionStorage.getItem('Vtroco');
 
    // Verifica se o endereço foi preenchido
    const enderecoPreenchido = (endereco.nomeRua || endereco.numeroCasa || endereco.cep || endereco.cidade || endereco.bairro || endereco.referencia);
  
    let enderecoTexto = '';
    if (enderecoPreenchido) {
      enderecoTexto = `
                 *ENDEREÇO PARA ENTREGA*
                 *Nome da Rua:* ${endereco.nomeRua || 'Não fornecido'}
                 *Número da Casa/AP:* ${endereco.numeroCasa || 'Não fornecido'}
                 *CEP:* ${endereco.cep || 'Não fornecido'}
                 *Cidade:* ${endereco.cidade || 'Não fornecido'}
                 *Bairro:* ${endereco.bairro || 'Não fornecido'}
                 *Ponto de Referência:* ${endereco.referencia || 'Não fornecido'}
             `;
    }
  
    textoParaEnviar += ` 
    *VALOR GERAL:* R$ ${somaGeral.toFixed(2)}
    \n*FORMA DE PAGAMENTO:* ${formaPagamento}
    ${valorTroco ? `*TROCO:* R$ ${valorTroco}` : ''}
    *RETIRADA NO LOCAL:* ${retiradaProduto}
    ${enderecoTexto}
`;
  
    const codigoPais = '55';
    const numeroTelefone = '87991793828';
  
    const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
    window.open(linkWhatsApp, '_blank');
  }

