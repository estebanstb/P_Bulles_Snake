// Projet : P_Bulles_Snake-PCX
// Auteur : LEBET Esteban
// Classe : CID2A
// Date : 07.11.2023

import { Apple } from "./apple.js";
import { Snake } from "./snake.js";

const gameBoard = document.querySelector("#gameBoard");
// const boxShadow = document.querySelector("#gameBoard").style["boxShadow"] = "0 0 200px #99999";
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#add8c1";
const snakeColor = "#273608";
const snakeBorder = "#add8c1";
const unitSize = 25;
let score = 0;
let running = false;

// Instance de Apple
const apple = new Apple(unitSize, gameWidth, gameHeight);

// Instance de Snake avec la référence à Apple, la couleur du serpent, la bordure du serpent, et scoreText
const snake = new Snake(unitSize, apple, snakeColor, snakeBorder, score, scoreText);

window.addEventListener("keydown", snake.changeDirection.bind(snake));
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = "SCORE : " + score;
    apple.createFood();
    apple.drawFood(ctx);
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            apple.drawFood(ctx);
            snake.moveSnake();
            snake.drawSnake(ctx);
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function checkGameOver() {
    switch (true) {
        case snake.snake[0].x < 0:
        case snake.snake[0].x >= gameWidth:
        case snake.snake[0].y < 0:
        case snake.snake[0].y >= gameHeight:
        case snake.checkCollision():
            running = false;
            break;
    }
}

function displayGameOver() {
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("GAME", gameWidth / 2, gameHeight / 3);
    ctx.fillText("OVER", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    score = 0;
    snake.resetSnake();
    gameStart();
}
