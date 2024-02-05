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
    
// Gere o número do pedido uma vez fora do loop
const numeroPedidoBase = criarPedido();

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
  const numeroPedido = numeroPedidoBase + i;
  
        textoParaEnviar += `
        *PEDIDO Nº:* ${numeroPedido} 😃😃😃
        \n*PEDIDO LIDER AÇAÍ*
        \n*PRODUTO:* ${escolhaProduto} - R$ ${escolhaValor.toFixed(2)}
        \n*ACOMPANHAMENTOS*
        \n*COBERTURA:* \n ${formatarObjetoParaString(escolhaCobertura)}
        \n*FRUTAS:*  \n${formatarObjetoParaString(escolhaFrutas)}
        \n*COMPLEMENTO:* \n${formatarObjetoParaString(escolhaComplementos)}
        \n*EXTRAS:*  \n${formatarObjetoParaString(escolhaExtras)}
  
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
        textoParaEnviar += `
        ----------------------------------------
        \n*RESUMO TOTAL À PAGAR(R$)*
        *TAMANHO R$:* ${escolhaValor.toFixed(2)}
        *COBERTURA R$:* ${somaCobertura.toFixed(2)}
        *FRUTAS R$:* ${somaFrutas.toFixed(2)}
        *COMPLEMENTOS R$:* ${somaComplementos.toFixed(2)}
        *EXTRAS R$:* ${somaExtras.toFixed(2)}
        *VALOR TOTAL R$:* ${somaTotal.toFixed(2)}
  `;
  
        calcular(somaTotal)
      }
    }
  
    
  
  
    const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};
    const retiradaProduto = sessionStorage.getItem('escolhaEntrega')
  
    const formaPagamento = sessionStorage.getItem('formaPagamento');
    const valorTroco = sessionStorage.getItem('Vtroco');
  
    // Verifica se o endereço foi preenchido
    const enderecoPreenchido = (endereco.nomeRua || endereco.numeroCasa || endereco.cep || endereco.cidade || endereco.bairro || endereco.referencia);
  
    let enderecoTexto = '';
    if (enderecoPreenchido) {
      enderecoTexto = `
                 \n*ENDEREÇO PARA ENTREGA*
                 *Nome da Rua:* ${endereco.nomeRua || 'Não fornecido'}
                 *Número da Casa/AP:* ${endereco.numeroCasa || 'Não fornecido'}
                 *CEP:* ${endereco.cep || 'Não fornecido'}
                 *Cidade:* ${endereco.cidade || 'Não fornecido'}
                 *Bairro:* ${endereco.bairro || 'Não fornecido'}
                 *Ponto de Referência:* ${endereco.referencia || 'Não fornecido'}
             `;
    }
  
  textoParaEnviar += `
  \n*VALOR GERAL:*  R$ ${somaGeral.toFixed(2)}`

  
  if (formaPagamento) {
    textoParaEnviar += `
    ----------------------------------------
      \n*FORMA DE PAGAMENTO:* ${formaPagamento} 
    `;
  }

  if (valorTroco) {
    textoParaEnviar += `
    *TROCO:* ${valorTroco}
    `;
  }
  
    textoParaEnviar += ` 
    ----------------------------------------
    \n\n*RETIRADA NO LOCAL*: ${retiradaProduto}`
  
    textoParaEnviar += `${enderecoTexto}`
  
  
    const codigoPais = '55';
    const numeroTelefone = '87991614277';
  
    const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
    window.open(linkWhatsApp, '_blank');
  }


    // Função para gerar um número aleatório entre 1 e 1000
    const gerarNumeroAleatorio = () => {
      return Math.floor(Math.random() * 1000) + 1;
    };
    
    // Função para criar um pedido com um número aleatório
    const criarPedido = () => {
      return gerarNumeroAleatorio();
    };
    const numeroPedido = criarPedido();
  