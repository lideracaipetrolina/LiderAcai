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
            window.location.href = "../Lider-Acai/copo300/pagina-Acompanhamento.html";
        }
        else if (produtoSelecionado.id === "copo500") {
            window.location.href = "../../Lider-Acai/copo500/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote240") {
            window.location.href = "../Lider-Acai/pote240/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote360") {
            window.location.href = "../../Lider-Acai/pote360/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "pote480") {
            window.location.href = "../Lider-Acai/pote480/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else if (produtoSelecionado.id === "marmita500") {
            window.location.href = "../Lider-Acai/marmita500/pagina-Acompanhamento.html"; // Insira o caminho da página desejada
        }
        else {
            alert("ID do produto não reconhecido");
        }
    } else {
        // Caso nenhum produto tenha sido selecionado, exiba uma mensagem ou faça algo apropriado
        alert("Por favor, selecione um produto.");
    }
}
