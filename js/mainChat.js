import Snake from "./snake.js";
import Apple from "./apple.js";

const gameBoard = document.querySelector("#gameBoard");
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
let foodNumber = 0;
let gameNumber = 1;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;

let apple = new Apple(gameWidth, gameHeight, unitSize, ctx);
let snake = new Snake(unitSize, ctx, snakeColor, snakeBorder);

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = "SCORE : " + score;
    apple.create();
    apple.draw();
    snake.draw();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            apple.draw();
            snake.move(xVelocity, yVelocity);
            snake.draw();
            snake.checkCollision();
            nextTick();
        }, 75); // Vitesse de chaque tick
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function changeDirection(event){
    const keyPressed = event.keyCode
    const LEFT = 37; // 37 est ce que console.log(keyPressed) me dit quand j'appuie sur flèche de gauche
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight): // Dans snake on ne peut pas aller a gauche puis a droite instantanement
            xVelocity = -unitSize
            yVelocity = 0 // Car on n'est pas entrain d'aller en haut ou en bas
            break; 
        case(keyPressed == UP && !goingDown): // Dans snake on ne peut pas aller vers le haut puis vers le bas instantanement
            xVelocity = 0 // Car on est pas entrain d'aller à gauche et à droite
            yVelocity = -unitSize
            break;
        case(keyPressed == RIGHT && !goingLeft): // Dans snake on ne peut pas aller a droite puis a gauche instantanement
            xVelocity = unitSize
            yVelocity = 0 // Car on n'est pas entrain d'aller en haut ou en bas
            break;
        case(keyPressed == DOWN && !goingUp): // Dans snake on ne peut pas aller vers le bas puis vers le haut instantanement
            xVelocity = 0 // Car on est pas entrain d'aller à gauche et à droite
            yVelocity = unitSize
            break;
    }
};

function displayGameOver(){
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("GAME", gameWidth / 2, gameHeight / 3);
    ctx.fillText("OVER", gameWidth / 2, gameHeight / 2);
    running = false; // Arrêt du jeu
};

function resetGame(){
    gameNumber +=1;
    foodNumber = 0;
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

        snake = [
        /*{x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},*/
        {x:unitSize, y:0}, // Snake qui commence direct à 5 blocks
        {x:0, y:0}
    ];
    gameStart();
};
