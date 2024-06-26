//CODIGO DA PAGINA ACOMPANHAMENTOS
let escolhaCobertura = [];
let escolhaFrutas = [];
let escolhaComplementos = [];
let escolhaExtras = [];
let escolhaCremes = [];

let indiceCobertura = sessionStorage.length;
let indiceFrutas = sessionStorage.length;
let indiceComplementos = sessionStorage.length;
let indiceExtras = sessionStorage.length;
let indiceCremes = sessionStorage.length;


function concluirPedido() {

    const cremes = document.getElementsByName('cremes');
    escolhaCremes = [];
    for (let i = 0; i < cremes.length; i++) {
        if (cremes[i].checked) {
            const creme = {
                texto: cremes[i].getAttribute('data-text'),
                valor: cremes[i].value
            };
            escolhaCremes.push(creme);
        }
    }

    const cobertura = document.getElementsByName('cobertura');
    escolhaCobertura = [];
    for (let i = 0; i < cobertura.length; i++) {
        if (cobertura[i].checked) {
            const escolha = {
                texto: cobertura[i].getAttribute('data-text'),
                valor: cobertura[i].value
            };
            escolhaCobertura.push(escolha);
        }
    }

    const frutas = document.getElementsByName('frutas');
    escolhaFrutas = [];
    for (let i = 0; i < frutas.length; i++) {
        if (frutas[i].checked) {
            const escolha = {
                texto: frutas[i].getAttribute('data-text'),
                valor: frutas[i].value
            };
            escolhaFrutas.push(escolha);
        }
    }

    const complementos = document.getElementsByName('complementos');
    escolhaComplementos = [];
    for (let i = 0; i < complementos.length; i++) {
        if (complementos[i].checked) {
            const escolha = {
                texto: complementos[i].getAttribute('data-text'),
                valor: complementos[i].value
            };
            escolhaComplementos.push(escolha);
        }
    }

    const extras = document.getElementsByName('extras');
    escolhaExtras = [];
    for (let i = 0; i < extras.length; i++) {
        if (extras[i].checked) {
            const escolha = {
                texto: extras[i].getAttribute('data-text'),
                valor: extras[i].value
            };
            escolhaExtras.push(escolha);
        }
    }

    let OpcaoCobertura = `escolhaCobertura_${indiceCobertura}`;
    let OpcaoFruta = `escolhaFruta_${indiceFrutas}`;
    let OpcaoComplemento = `escolhaComplemento_${indiceComplementos}`;
    let OpcaoExtras = `escolhaExtras_${indiceExtras}`;
    let OpcaoCremes = `escolhaCremes_${indiceCremes}`

    // Armazenar no sessionStorage


    sessionStorage.setItem(OpcaoCobertura, JSON.stringify(escolhaCobertura));
    sessionStorage.setItem(OpcaoFruta, JSON.stringify(escolhaFrutas));
    sessionStorage.setItem(OpcaoComplemento, JSON.stringify(escolhaComplementos));
    sessionStorage.setItem(OpcaoExtras, JSON.stringify(escolhaExtras));
    sessionStorage.setItem(OpcaoCremes, JSON.stringify(escolhaCremes))

}


const ValorDisplay1 = document.getElementById('displayInput1');
let value = parseInt(ValorDisplay1.value); // Move a declaração para fora dos eventos de clique

const somarBotao = () => {
    if (isNaN(value)) { //verifica se value não é um número.
        value = 1;
    } else {
        value++;
    }
    ValorDisplay1.value = value;
}
//BOTÃO MAIS
document.getElementById('botaoMAIS1').addEventListener('click', somarBotao);

const subtrairBotao = () => {
    if (value > 1) {
        value--;
    }
    ValorDisplay1.value = value;
}
//BOTÃO MENOS
document.getElementById('botaoMENOS1').addEventListener('click', subtrairBotao);


let indiceQuantidade = sessionStorage.length;
const Armazenar_Mais_Menos = () => {

    // Use o índice atual para criar chaves únicas no sessionStorage
    const QuantidadeProduto = `quantidadeProduto_${indiceQuantidade}`;
    // Armazene os novos itens no sessionStorage
    sessionStorage.setItem(QuantidadeProduto, parseInt(value));
}


//VALIDA SE A QUANTIDADE ESTÁ INSERIDA E DEPOIS ENVIA AO SESSIONSTORAGE
const validacoes = () => {

    if (ValorDisplay1.value === "" || ValorDisplay1.value == 0) {
        alert("Por favor, Informe a quantidade!");
    }
    else if (escolhaCobertura.length > 1) {
        alert("Por favor, escolha apenas UMA OPÇÂO de COBERTURA.");
        return false;
    }
    else if (escolhaFrutas.length > 2) {
        alert("Por favor, escolha apenas DUAS OPÇÕES de FRUTAS.");
        return false;
    }
    else if (escolhaComplementos.length > 4) {
        alert("Por favor, escolha apenas QUATRO OPÇÕES de COMPLEMENTOS.");
        return false;
    }
    //----------------------------------------------------------------------
    else if (escolhaCobertura.length === 0) {
        alert("Por favor, escolha ao menos UMA OPÇÃO DE COBERTURA.");
        return false;
    }
    else if (escolhaFrutas.length === 0) {
        alert("Por favor, escolha ao menos UMA OPÇÃO DE FRUTAS.");
        return false;
    }
    else if (escolhaComplementos.length === 0) {
        alert("Por favor, escolha ao menos UMA OPÇÃO DE COMPLEMENTO.");
        return false;
    }
    else if (escolhaExtras.length === 0) {
        alert("Por favor, se não deseja nenhum EXTRA, escolha a OPÇÃO SEM EXTRA.");
        return false;
    }
    else if (escolhaCremes.length === 0) {
        alert("Por favor, escolha ao menos UMA OPÇÃO DE CREME.");
        return false;
    }
    else {
        //location.reload();
        Armazenar_Mais_Menos();
        // Redirecionar para a próxima página
        window.location.href = '/LiderAcai/aRESUMO/pagina-Resumo.html';
        //window.location.href = '../aRESUMO/pagina-Resumo.html';
    }

}


let indiceProduto = sessionStorage.length;
let indiceValor = sessionStorage.length;

const ProdutoEscolhido = () => {
    const botaoEnviar = document.querySelector(".botaoAcomp")

    if (botaoEnviar) {

        let dataText = botaoEnviar.getAttribute('data-text'); // Obtém o valor de data-text
        let valorProduto = parseFloat(botaoEnviar.value); // Obtém o valor do produto


        const NomeProduto = `escolhaProduto_${indiceProduto}`;
        const ValorProduto = `escolhaProdutoValor_${indiceValor}`;

        sessionStorage.setItem(NomeProduto, dataText);
        sessionStorage.setItem(ValorProduto, valorProduto);
    }


}

document.querySelector(".botaoAcomp").addEventListener("click", () => {
    ProdutoEscolhido()
    concluirPedido()
    validacoes()
})