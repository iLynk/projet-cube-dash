const dino = document.querySelector('#dino');
const gameHTML = document.querySelector('#game')
const ground = document.querySelector('#ground');
const scoreDisplay = document.querySelector('#score')
const finalScoreDisplay = document.querySelector('#final-score')
const highScore = document.querySelector('#highscore')
const startGameButton = document.querySelector('#startGame')
const obstacles = document.querySelectorAll('.obstacles')
const gameOverDisplay = document.querySelector('#gameOver')
let obstacleTimeout
let finalScore = 0
let count = 0;
let gameOverState = false;

// DINO
let dinoBottom = 180;
let dinoJump = false;

// GROUND
console.log(obstacles)
// FONCTION POUR LANCER LE JEU

const gameStart = () => {
    count = 0
    gameOverState = false;
    startGameButton.style.display = 'none'
    gameHTML.style.display = 'inline'
    gameOverDisplay.style.display = 'none'
    score();
    removeAllObstacles()
    clearTimeout(obstacleTimeout)
    createObstacle()

}

// FONCTION GAME OVER
const gameOver = () => {
    clearInterval(score);
    gameOverDisplay.style.display = 'inline'
    startGameButton.style.display = 'inline'
    gameHTML.style.display = 'none'
    gameOverDisplay.classList.remove('invisible')
    finalScoreDisplay.textContent = `YOUR SCORE : ${count}`
    removeAllObstacles()

    if (finalScore < count) {
        finalScore = count
        highScore.textContent = `YOUR HIGHSCORE: ${finalScore}`
    }

}

// FONCTION DE COLLISION
const checkCollision = () => {
    if (gameOverState) {
        return
    }
    const dinoRect = dino.getBoundingClientRect();
    const obstaclesArray = Array.from(document.querySelectorAll('.obstacle'));

    obstaclesArray.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            dinoRect.bottom > obstacleRect.top &&
            dinoRect.top < obstacleRect.bottom + 25 &&
            dinoRect.right > obstacleRect.left + 25 &&
            dinoRect.left < obstacleRect.right
        ) {
            gameOverState = true
            gameOver();
            return
        }
    });
    if (!gameOverState) {
        requestAnimationFrame(checkCollision);
    }
};

// FONCTION POUR CLEAR LES OBSTACLES
const removeAllObstacles = () => {
    obstacles.forEach((obstacle) => {
        obstacle.remove()
    })
}

// FONCTION POUR CREER LES OBSTACLES
const createObstacle = () => {
    removeAllObstacles()
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    ground.appendChild(obstacle);

    let obstacleRight = 0;

    const moveObstacle = () => {
        obstacleRight += 10;
        obstacle.style.right = obstacleRight + 'px';

        if (obstacleRight > -60) {
            requestAnimationFrame(moveObstacle);
        } else {
            obstacle.remove();
        }

        if (obstacleRight < -60) {
            obstacle.remove();
        }
    };

    moveObstacle();

    const nextObstacleDelay = Math.random() * 500 + 1500;
    obstacleTimeout = setTimeout(createObstacle, nextObstacleDelay);
};

// FONCTION POUR LE SCORE
const score = () => {
    setInterval(() => {
        scoreDisplay.textContent = `VOTRE SCORE : ${count}`
        count++
    }, 100);
}

// FONCTION POUR SAUTER 
const jump = () => {
    if (dinoJump) {
        return
    }
    let up = setInterval(() => {
        if (dinoBottom >= 400) {
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
    }, 25)
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', jump)
    startGameButton.addEventListener('click', () => {
        removeAllObstacles();
        gameStart()
        checkCollision()
    })
})

