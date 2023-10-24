const dino = document.querySelector('#dino');
const enemies = document.querySelector('#enemy');
const ground = document.querySelector('#ground');
const scoreDisplay = document.querySelector('#score')
let score = 0;

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
        if (dinoBottom >= 500) {
            clearInterval(up)
            let down = setInterval(() => {
                if (dinoBottom <= 200) {
                    clearInterval(down)
                    dinoJump = false
                }
                dinoBottom -= 20;
                dino.style.bottom = dinoBottom + 'px'

            }, 20);
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

