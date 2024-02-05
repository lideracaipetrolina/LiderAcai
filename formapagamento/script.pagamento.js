//FORMA DE PAGAMENTO

import { enviarMensagemWhatsApp } from '../EnviarZap/scriptEnviarZap';


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
        formasPagamento()
    });
};

document.addEventListener('DOMContentLoaded', FormaPagamento);

