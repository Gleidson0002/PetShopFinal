let temaEscuroAtivo = false;

function alternarTema() {
    const CSSbody = document.querySelector('body');
    const CSSparagrafo = document.querySelector('.paragrafo');
    const CSSparagrafo1 = document.querySelector('.paragrafo1');
    const botao = document.querySelector('#btema');
    console.log("ta funcionando");
    temaEscuroAtivo = !temaEscuroAtivo; 

    if (temaEscuroAtivo) {
        CSSbody.style.backgroundColor = '#333';
        CSSparagrafo.style.color = 'white';
        CSSparagrafo1.style.color = 'white';
        botao.className = 'fa-regular fa-sun'; 
    } else {
        CSSbody.style.backgroundColor = 'rgb(230, 222, 214)';
        CSSparagrafo.style.color = 'black';
        CSSparagrafo1.style.color = 'black';

        botao.className = 'fa-regular fa-moon'; 
    }
}

//document.getElementById('temaButton').addEventListener('click', alternarTema);