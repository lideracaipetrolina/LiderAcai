//CODIGO DA PAGINA INDEX PRODUTOS
function selecionarProduto() {
    // Obtém o produto selecionado
    var produtoSelecionado = document.querySelector('input[name="produtos"]:checked');

    // Verifica se um produto foi selecionado
    if (produtoSelecionado) {
        // Obtem os valores
        let dataText = produtoSelecionado.getAttribute('data-text'); // Obtém o valor de data-text
        let valorProduto = parseFloat(produtoSelecionado.value); // Obtém o valor do produto

        // Armazena os dados no sessionStorage
        sessionStorage.setItem('dataText', dataText);
        sessionStorage.setItem('valorProduto', valorProduto);

        // Cria condições para cada ID existente
        if (produtoSelecionado.id === "copo300") {
            window.location.href = "/LiderAcai/copo300/ACOMPANHAMENTO/pagina-Acompanhamento.html";
        }
        else if (produtoSelecionado.id === "copo500") {
            window.location.href = "/LiderAcai/copo500/ACOMPANHAMENTO/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote240") {
            window.location.href = "/ckopo300/ACOMPANHAMENTO/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote360") {
            window.location.href = "/LiderAcai/pote360/ACOMPANHAMENTO/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote480") {
            window.location.href = "/LiderAcai/pote480/ACOMPANHAMENTO/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "marmita500") {
            window.location.href = "/LiderAcai/marmita500/ACOMPANHAMENTO/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else {
            alert("ID do produto não reconhecido");
        }
    } else {
        // Caso nenhum produto tenha sido selecionado, exiba uma mensagem ou faça algo apropriado
        alert("Por favor, selecione um produto.");
    }
}