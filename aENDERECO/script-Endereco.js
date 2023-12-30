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

document.addEventListener('DOMContentLoaded', function () {
    let Retiradas = document.getElementsByName('entrega');
    for (var i = 0; i < Retiradas.length; i++) {
        Retiradas[i].addEventListener('click', naoRetirar);
    }

    // Chama a função diretamente para verificar o estado inicial
    naoRetirar();

    function naoRetirar() {
        let escolhaEntrega = document.querySelector('input[name="entrega"]:checked');
        if (escolhaEntrega) {
            let NaoEntregar = document.querySelector('#myForm');

            if (escolhaEntrega.value === 'NÃO') { // Modificado para 'NÃO'
                NaoEntregar.style.display = 'block';
                //sessionStorage.setItem('dadoRetirada', Retiradas);
            } else {
                NaoEntregar.style.display = 'none';
                //sessionStorage.setItem('dadoRetirada', Retiradas);
            }
        }
    }

 
    sessionStorage.setItem('dadoRetirada', Retiradas);
    window.location.href = '../../LiderAcai/aRESUMO/pagina-Resumo.html';
});
