//CODIGO DA PAGINA ACOMPANHAMENTOS
let escolhaCobertura = [];
let escolhaFrutas = [];
let escolhaComplementos = [];
let escolhaExtras = [];

function concluirPedido() {
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

    if (
        escolhaCobertura.length > 1 ||
        escolhaFrutas.length > 2 ||
        escolhaComplementos.length > 4
    ) {
        alert("Por favor, escolha apenas a quantidade de OPÇÕES permitida.");
        return false;
    }

    if (
        escolhaCobertura.length === 0 ||
        escolhaFrutas.length === 0 ||
        escolhaComplementos.length === 0
    ) {
        alert("Por favor, escolha ao menos uma seleção em cada categoria -> COBERTURA/FRUTAS/COMPLEMENTO.");
        return false;
    }

    // Armazenar no sessionStorage
    sessionStorage.setItem('escolhaCobertura', JSON.stringify(escolhaCobertura));
    sessionStorage.setItem('escolhaFrutas', JSON.stringify(escolhaFrutas));
    sessionStorage.setItem('escolhaComplementos', JSON.stringify(escolhaComplementos));
    sessionStorage.setItem('escolhaExtras', JSON.stringify(escolhaExtras));

    // Redirecionar para a próxima página
    window.location.href = '../ENDERECO/pagina-Endereco.html';
}
