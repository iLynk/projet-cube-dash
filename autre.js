const dino = document.querySelector('#dino');
const ground = document.querySelector('#ground');
const scoreDisplay = document.querySelector('#score');
const enemy = document.createElement('div');
let score = 0;

//math.random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// Fonction pour créer un ennemi
function createEnemy() {
    enemy.classList.add('enemy');
    game.appendChild(enemy);
    enemy.style.left = '100%';
}

// Fonction pour générer entre 1 et 2 ennemis
function generateEnemies() {
    const numberOfEnemies =  getRandomNumber(1,2);
    for (let i = 0; i < numberOfEnemies ; i++) {
        if (numberOfEnemies == 2) {
            setTimeout(() => {
                createEnemy();
              }, 150);
            }   
        createEnemy();
        console.log(numberOfEnemies);
    }
}

generateEnemies();


// DINO
let dinoBottom = 180;
let dinoJump = false;

// GROUND

console.log(window.outerHeight)

// FONCTION POUR LANCER LE JEU


// FONCTION GAME OVER


// FONCTION POUR CREER LES OBSTACLES (TOUTES LES 5s ??)


// FONCTION POUR LE SCORE
const Score = () => {
    setInterval(() => {
        scoreDisplay.textContent = score
        score++
    }, 100);
}

// FONCTION POUR SAUTER 
const jump = () => {
    if (dinoJump) {
        return
    }
    let up = setInterval(() => {
        if (dinoBottom >= 450) {
            clearInterval(up)
            let down = setInterval(() => {
                if (dinoBottom <= 200) {
                    clearInterval(down)
                    dinoJump = false
                }
                dinoBottom -= 20;
                dino.style.bottom = dinoBottom + 'px'

            }, 25);
        }
        dinoBottom += 20
        dino.style.bottom = dinoBottom + 'px'
        dinoJump = true
    }, 20)
}

document.addEventListener('DOMContentLoaded', () => {
    Score()
    document.addEventListener('click', jump)
})






setTimeout(() => {
    createEnemy();
  }, 500);