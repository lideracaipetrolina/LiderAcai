//ENDEREÇO PARA ENTREGA
const FormEnd = () => {
    let nomeRua = document.getElementById('nomeRua').value;
    let numeroCasa = document.getElementById('numeroCasa').value;
    let cep = document.getElementById('cep').value;
    let cidade = document.getElementById('cidade').value;
    let bairro = document.getElementById('bairro').value;
    let referencia = document.getElementById('referencia').value;

    if (nomeRua && numeroCasa && cep && cidade && bairro && referencia) {
        let endereco = {
            nomeRua: nomeRua,
            numeroCasa: numeroCasa,
            cep: cep,
            cidade: cidade,
            bairro: bairro,
            referencia: referencia,
        };

        sessionStorage.setItem('endereco', JSON.stringify(endereco));

        window.location.href = '../../LiderAcai/aRESUMO/pagina-Resumo.html';
    } else {
        alert('Por favor, preencha todos os campos do Endereço para Entrega.');
        return false; // Impede o envio do formulário se a validação falhar
    }
}


//----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    let Retiradas = document.getElementsByName('entrega');

    for (var i = 0; i < Retiradas.length; i++) {
        Retiradas[i].addEventListener('click', naoRetirar);
    }

    function limparFormulario() {
        document.getElementById('nomeRua').value = '';
        document.getElementById('numeroCasa').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('referencia').value = '';
    }

    function naoRetirar() {
        let escolhaEntrega = document.querySelector('input[name="entrega"]:checked');
        if (escolhaEntrega) {
            let NaoEntregar = document.querySelector('#myForm');
            let botao = document.querySelector(".botano")

            if (escolhaEntrega.value === 'NÃO') {
                NaoEntregar.style.display = 'block';
                botao.style.display = 'none';
                localStorage.setItem('escolhaEntrega', escolhaEntrega.value);
            } else {
                NaoEntregar.style.display = 'none';
                botao.style.display = 'block';
                localStorage.setItem('escolhaEntrega', escolhaEntrega.value);
                limparFormulario();
            }
        }
    }

    let botaoRetirada = document.querySelector("#botaoRetirada")
    botaoRetirada.addEventListener("click", naoRetirar = () => {
        window.location.href = '../../LiderAcai/aRESUMO/pagina-Resumo.html';
    })
});
