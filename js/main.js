// Projet : P_Bulles_Snake-PCX
// Auteur : LEBET Esteban
// Classe : CID2A
// Date : 07.11.2023
// Description : Fichier principal qui gére affiche et gère le snake
// Lieu : ETML, Sébeillon

// Importation des classes nécessaires depuis les fichiers externes
import { Apple } from "./apple.js";
import { Snake } from "./snake.js";

// Constantes définissant des éléments du jeu
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#add8c1";
const snakeColor = "#273608";
const snakeBorder = "#add8c1";
const unitSize = 25;

// Variables de jeu
let score = 0;
let running = false;

// Instance de Apple
const apple = new Apple(unitSize, gameWidth, gameHeight);

// Instance de Snake avec la référence à Apple, la couleur du serpent, la bordure du serpent, et scoreText
const snake = new Snake(unitSize, apple, snakeColor, snakeBorder, score, scoreText);

// Référence le les touches du claviers et le click de la souris pour le bouton RESET
window.addEventListener("keydown", snake.changeDirection.bind(snake));
resetBtn.addEventListener("click", resetGame);

// Fonction principale pour démarrer le jeu
gameStart();

// Initialisation du jeu
function gameStart() {
    running = true;
    scoreText.textContent = "SCORE : " + score;
    apple.createFood();
    apple.drawFood(ctx);
    nextTick();
}

// Fonction récursive permettant de mettre à jour le jeu à  des intervalles prédéfinis
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            apple.drawFood(ctx);
            snake.moveSnake();
            snake.drawSnake(ctx);
            checkGameOver();
            nextTick();
        }, 75); // Vitesse du jeu, 1000 = 1s ; 100 = 0.1s
    } else {
        displayGameOver();
    }
}

// Effacer le contenu du gameboard
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

// Vérifier les conditions de fin de jeu
function checkGameOver() {
    if (
        snake.snake[0].x < 0 || // Si la tête du serpent dépasse le bord gauche du gameboard
        snake.snake[0].x >= gameWidth || // Si la tête du serpent dépasse le bord droit du gameboard
        snake.snake[0].y < 0 || // Si la tête du serpent dépasse le bord supérieur du gameboard
        snake.snake[0].y >= gameHeight || // Si la tête du serpent dépasse le bord inférieur du gameboard
        snake.checkCollision() // Si le serpent entre en collision avec lui-même

    ) {
        // Si l'une des conditions ci-dessus est vraie, le jeu est arrêté
        running = false;
    }
}

// Afficher l'écran de fin de jeu
function displayGameOver() {
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("GAME", gameWidth / 2, gameHeight / 2.4);
    ctx.fillText("OVER", gameWidth / 2, gameHeight / 1.6);
    running = false;
}

// Réinitialiser le jeu
function resetGame() {
    score = 0;
    snake.resetSnake();
    gameStart();
}
