//ENDEREÇO PARA ENTREGA
const FormEnd = () => {
    let nomeRua = document.getElementById('nomeRua').value;
    let numeroCasa = document.getElementById('numeroCasa').value;
    let cep = document.getElementById('cep').value;
    let cidade = document.getElementById('cidade').value;
    let bairro = document.getElementById('bairro').value;
    let referencia  = document.getElementById('referencia').value;

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

        window.location.href = '../../Lider-Acai/aRESUMO/pagina-Resumo.html';
    } else {
        alert('Por favor, preencha todos os campos do Endereço para Entrega.');
        return false; // Impede o envio do formulário se a validação falhar
    }
}

