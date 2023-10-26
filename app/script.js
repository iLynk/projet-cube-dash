    const dino = document.querySelector('#dino');
    const ground = document.querySelector('#ground');
    const scoreDisplay = document.querySelector('#score');
    const enemy = document.createElement('div');
    let score = 0;


    // Fonction pour supprimer tous les enfants d'un élément, sauf ceux avec 'ennemy-element'
    function removeAllEnemies(parent) {
        Array.from(parent.getElementsByClassName('enemy-element')).forEach(enemy => {
            parent.removeChild(enemy);
        });
    }

    // Création ennemis 1 & 2
    function createEnemy() {
        var enemy = document.createElement('div');
        enemy.classList.add('enemy','enemy-element');
        game.appendChild(enemy);
    }
    
    function createEnemy2() {
        var enemy2 = document.createElement('div');
        enemy2.classList.add('enemy2','enemy-element');
        game.appendChild(enemy2);
    }
    

    // Fonction pour générer entre 1 et 2 ennemis
    function generateEnemies() {
        removeAllEnemies(game); // Supprimer les anciens ennemis

        let numberOfEnemies =   Math.random() ;

        if ( numberOfEnemies > 0.5){    
            createEnemy();
            createEnemy2();
        }
        else{
            createEnemy();
        }

        console.log(numberOfEnemies);
    }


    // Créer un ou deux ennemi toutes les 4 secondes
    setInterval(generateEnemies, 4000);


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

