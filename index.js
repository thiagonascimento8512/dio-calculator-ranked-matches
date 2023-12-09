const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let qtdeVictory;
let qtdeDefeat;
let idioma;

const escolhaIdiomaTexto = 'Escolha um idioma\nChoose a language\n(pt/en): ';
const idiomaInvalidoTexto = '\nIdioma inválido. Tente novamente: pt ou en.\nInvalid language. Please try again: pt or en.\n\n';


const textos = {
  pt: {
    bemVindo: '\n\nBem-vindo a Calculadora de Partidas Ranqueadas!',
    qtdeVitoria: 'Qual a quantidade de vitórias? ',
    qtdeDerrota: 'Qual a quantidade de derrotas? ',
    insiraNumero: 'Por favor, insira um número.',
    nivelHeroi: 'O Herói tem um saldo de %s vitória(s) e está no nível %s.',
    niveis: ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Diamante', 'Lendário', 'Imortal']
  },
  en: {
    bemVindo: '\n\nWelcome to the Ranked Matches Calculator!',
    qtdeVitoria: 'What is the number of victories? ',
    qtdeDerrota: 'What is the number of defeats? ',
    insiraNumero: 'Please enter a number.',
    nivelHeroi: 'The hero has a balance of %s victory(ies) and is at level %s.',
    niveis: ['Iron', 'Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary', 'Immortal']
  }
};

function escolherIdioma() {
  rl.question(escolhaIdiomaTexto, (resposta) => {
    if (textos[resposta]) {
      idioma = resposta;
      console.log(textos[idioma].bemVindo);
      perguntarVitorias();
    } else {
      console.log(idiomaInvalidoTexto);
      escolherIdioma();
    }
  });
}

function perguntarVitorias() {
  rl.question(textos[idioma].qtdeVitoria, (resposta) => {
    if (isNaN(resposta)) {
      console.log(textos[idioma].insiraNumero);
      perguntarVitorias();
    } else {    
      qtdeVictory = resposta;
      perguntarDerrota();
    }
  });
}

function perguntarDerrota() {
  rl.question(textos[idioma].qtdeDerrota, (resposta) => {
    qtdeDefeat = parseInt(resposta, 10);
    if (isNaN(qtdeDefeat)) {
      console.log(textos[idioma].insiraNumero);
      perguntarDerrota();
    } else {
      console.log(textos[idioma].nivelHeroi, qtdeVictory - qtdeDefeat, heroLevel(qtdeVictory, qtdeDefeat));
      rl.close();
    }
  });
}

function heroLevel(victories, defeats) {
  let nivelIndex;
  const heroPower = victories - defeats;

  if (heroPower <= 10) {
    nivelIndex = 0;
  } else if (heroPower < 20) {
    nivelIndex = 1;
  } else if (heroPower < 50) {
    nivelIndex = 2;
  } else if (heroPower < 80) {
    nivelIndex = 3;
  } else if (heroPower < 90) {
    nivelIndex = 4;
  } else if (heroPower < 100) {
    nivelIndex = 5;
  } else {
    nivelIndex = 6;
  }
  return textos[idioma].niveis[nivelIndex];
}

escolherIdioma();
