//----------------------zap
export function enviarZap() {
    let somaGeral = 0
    let textoParaEnviar = '';
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
  
  
      if (escolhaProduto && escolhaCobertura && escolhaFrutas && escolhaComplementos && escolhaExtras && !isNaN(escolhaValor)) {
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
  
        textoParaEnviar += `
        \n*PRODUTO:* ${escolhaProduto} - R$ ${escolhaValor.toFixed(2)}
        \n*ACOMPANHAMENTOSCOBERTURA:* ${formatarObjetoParaString(escolhaCobertura)}
        \n*FRUTAS:* ${formatarObjetoParaString(escolhaFrutas)}
        \n*COMPLEMENTO:* ${formatarObjetoParaString(escolhaComplementos)}
        \n*EXTRAS:* ${formatarObjetoParaString(escolhaExtras)}
  
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
        \n*RESUMO TOTAL À PAGAR(R$)*
        \n*Tamanho R$:* ${escolhaValor.toFixed(2)}
        \n*Cobertura R$:* ${somaCobertura.toFixed(2)}
        \n*Frutas R$:* ${somaFrutas.toFixed(2)}
        \n*Complementos R$:* ${somaComplementos.toFixed(2)}
        \n*Extras R$:* ${somaExtras.toFixed(2)}
        \n*VALOR TOTAL R$:* ${somaTotal.toFixed(2)}
  `;
  
        container.appendChild(div);
        calcular(somaTotal)
      }
    }
  
    const calcular = (somaTotal) => {
      somaGeral += somaTotal;
    };
  
  
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
  
    textoParaEnviar += `\n*VALOR GERAL:*  R$ ${somaGeral.toFixed(2)}`
  
    textoParaEnviar += ` \n\n*RETIRADA NO LOCAL*: ${retiradaProduto}`
  
    textoParaEnviar += `${enderecoTexto}`
  
    if (formaPagamento) {
      textoParaEnviar += `
        \n*FORMA DE PAGAMENTO:* ${formaPagamento} 
      `;
    }
  
    if (valorTroco) {
      textoParaEnviar += `
      *TROCO:* ${valorTroco}
      `;
    }
  
    const codigoPais = '55';
    const numeroTelefone = '87991614277';
  
    const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
    window.open(linkWhatsApp, '_blank');
  }
  