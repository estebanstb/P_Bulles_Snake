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
const gameBoard = document.querySelector("#gameBoard"); // Définit la planche de jeu du HTML dans le JavaScript
const ctx = gameBoard.getContext("2d"); // Définit un contexte de plateau 2D
const scoreText = document.querySelector("#scoreText"); // Définit le score du jeu du HTML dans le JavaScript
const resetBtn = document.querySelector("#resetBtn"); //  Définit le bouton de reset du HTML dans le JavaScript
const gameWidth = gameBoard.width; // Définir la largeur de la planche de jeu
const gameHeight = gameBoard.height; // Définir la hauteur de la planche de jeu
const boardBackground = "#add8c1"; // Couleur du fond de la planche du jeu
const snakeColor = "#273608"; // Couleur du serpent
const snakeBorder = "#add8c1"; // Couleur de la borudre du serpent
const unitSize = 25; // La "norme" qui va définir sur quel valeur le jeu doit se baser

// Variables de jeu
let score = 0; // Score du jeu
let running = false; // Jeu en marche ou non

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

// Fonction récursive permettant de mettre à jour le jeu à des intervalles prédéfinis
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
