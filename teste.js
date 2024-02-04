
let indiceProduto = sessionStorage.length;
let indiceValor = sessionStorage.length;

//CODIGO DA PAGINA INDEX PRODUTOS    
function selecionarProduto() {
    // Obtém o produto selecionado
    var produtoSelecionado = document.querySelector('input[name="produtos"]:checked');

    // Verifica se um produto foi selecionado
    if (produtoSelecionado) {
        // Obtem os valores
        let dataText = produtoSelecionado.getAttribute('data-text'); // Obtém o valor de data-text
        let valorProduto = parseFloat(produtoSelecionado.value); // Obtém o valor do produto


        const NomeProduto = `escolhaProduto_${indiceProduto}`;
        const ValorProduto = `escolhaProdutoValor_${indiceValor}`;



        // Armazena os dados no sessionStorage
        sessionStorage.setItem(NomeProduto, dataText);
        sessionStorage.setItem(ValorProduto, valorProduto);

        // Cria condições para cada ID existente
        if (produtoSelecionado.id === "copo300") {
            window.location.href = "../LiderAcai/copo300/pagina-Acompanhamento.html";
        }
        else if (produtoSelecionado.id === "copo500") {
            window.location.href = "../../LiderAcai/copo500/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote240") {
            window.location.href = "../LiderAcai/pote240/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote360") {
            window.location.href = "../../LiderAcai/pote360/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote480") {
            window.location.href = "../LiderAcai/pote480/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "marmita500") {
            window.location.href = "/copo300/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else {
            alert("ID do produto não reconhecido");
        }
    } else {
        // Caso nenhum produto tenha sido selecionado, exiba uma mensagem ou faça algo apropriado
        alert("Por favor, selecione um produto.");
    }
}


let indiceProduto = sessionStorage.length;
let indiceValor = sessionStorage.length;
const NomeValorProduto = () => {

  // Obtenha a referência do botão usando um seletor mais específico
  const botaoEnviar = document.querySelector(".concluir7");

  // Verifique se o botão foi encontrado antes de prosseguir
  if (botaoEnviar) {
    // Obtenha os atributos do botão
    const produto = botaoEnviar.getAttribute('data-text8');
    const valor = parseFloat(botaoEnviar.getAttribute('data-value8'));

    // Use o índice atual para criar chaves únicas no sessionStorage
    const TipoProduto = `escolhaProduto_${indiceProduto}`;
    const TipoProdutoValor = `escolhaProdutoValor_${indiceValor}`;

    // Armazene os novos itens no sessionStorage
    sessionStorage.setItem(TipoProduto, produto);
    sessionStorage.setItem(TipoProdutoValor, valor);
  }
};