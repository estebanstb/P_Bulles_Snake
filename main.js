const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#b0db05";
const snakeColor = "#273608";
const snakeBorder = "#b0db05";
const foodColor = "red";
const foodBorder = "#b0db05";
const unitSize = 25;
let foodNumber = 0;
let gameNumber = 1;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    /*{x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},*/// Snake qui commence direct à 5 blocks
    {x:unitSize, y:0}, 
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = "score : " + score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75) // Vitesse de chaque tick
        
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)  
};
function createFood(){
    foodNumber+=1;
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood (0, gameWidth - unitSize);
    foodY = randomFood (0, gameWidth - unitSize);
    console.log("Partie " + gameNumber + 
    " : Fruit " + foodNumber + 
    " = X : " + foodX + " | Y : " + foodY); // Log des positions des fruits
    
};
function drawFood(){
    ctx.fillStyle = foodColor; // Attribuer la couleur de fond de la pomme
    ctx.strokeStyle = foodBorder; // Attribuer la couleur des contours de la pomme
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    ctx.strokeRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x +xVelocity, //nombre positif pour droite, negatif gauche
                  y: snake[0].y +yVelocity,}; 
    
    snake.unshift(head)
    // Si la pomme est mangée
    if(snake[0].x == foodX && snake[0].y == foodY){
        score +=1;
        scoreText.textContent = "score : " + score;
        createFood(); // Une fois qu'une pomme est mangée en faire apparaitre une autre
    }
    else{
        snake.pop(); // faire que le corps suive sans qu'il se demultiplie
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor; // Attribuer la couleur de fond du snake
    ctx.strokeStyle = snakeBorder; // Attribuer la couleur des contours du snake
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
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
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0): // Si tête du snake à dépassée la bordure de gauche
            running = false;
            break;
        case (snake[0].x >= gameWidth): // Si tête du snake à dépassée la bordure de droite
            running = false;
            break;
        case (snake[0].y < 0): // Si tête du snake à dépassée la bordure du haut
            running = false;
            break;
        case (snake[0].y >= gameHeight): // Si tête du snake à dépassée la bordure du bas
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){ 
            running = false; // Vérifier si le joueur se rentre dedans avec une des parties du serpent
        } 
    }
};
function displayGameOver(){
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("GAME", gameWidth / 2, gameHeight / 2.2);
    ctx.fillText("OVER", gameWidth / 2, gameHeight / 1.6);
    running = false; // Arrêt du jeu
};
function resetGame(){
    gameNumber +=1;
    score = 0;
    foodNumber = 0;
    xVelocity = unitSize;
    yVelocity = 0;

        snake = [
        /*{x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},*/ // Snake qui commence direct à 5 blocks
        {x:0, y:0}
    ];
    gameStart();
};