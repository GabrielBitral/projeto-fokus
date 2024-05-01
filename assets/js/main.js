const htmlElement = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const buttons = document.querySelectorAll('.app__card-button');
const iniciarPausarButton = document.getElementById('start-pause');
const iniciarOuPausarButtonText = document.querySelector('#start-pause span');
const iniciarOuPausarButtonImg = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.getElementById('timer');
const imageFigure = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaFocoInput = document.getElementById('alternar-musica');

const musica = new Audio('assets/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('assets/sons/play.wav');
const somPausar = new Audio('assets/sons/pause.mp3');
const somFinalizou = new Audio('assets/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

const alterarElementos = (selecao) => {
    mostrarTempo();
    buttons.forEach((button) => button.classList.remove('active'));
    htmlElement.setAttribute('data-contexto', selecao);
    imageFigure.setAttribute('src', `assets/img/${selecao}.png`);
    switch (selecao) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `;
            break;
    }
};

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        somFinalizou.play();
        alert('Tempo finalizou!');
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();

};

const iniciarOuPausar = () => {
    if (intervaloId) {
        zerar();
        somPausar.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarButtonText.textContent = 'Pausar';
    iniciarOuPausarButtonImg.setAttribute('src', 'assets/img/pause.png');
    somPlay.play();
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarButtonText.textContent = 'Começar';
    iniciarOuPausarButtonImg.setAttribute('src', 'assets/img/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `
        ${tempoFormatado}
    `
}

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

iniciarPausarButton.addEventListener('click', iniciarOuPausar);

focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarElementos('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarElementos('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarElementos('descanso-longo');
    longoButton.classList.add('active');
})


mostrarTempo();
