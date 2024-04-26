// Projet : P_Bulles_Snake-PCX
// Auteur : LEBET Esteban
// Classe : CIN1B
// Date : 19.04.2024
// Description : Réplique du jeu "Snake"
// Lieu : ETML, Sébeillon


// Constantes définissant des éléments du jeu
const gameBoard = document.querySelector("#gameBoard"); // Définit la planche de jeu du HTML dans le JavaScript
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText"); // Définit le score du jeu du HTML dans le JavaScript
const resetBtn = document.querySelector("#resetBtn"); //  Définit le bouton de reset du HTML dans le JavaScript
const gameWidth = gameBoard.width; // Définir la largeur de la planche de jeu
const gameHeight = gameBoard.height; // Définir la hauteur de la planche de jeu
const boardBackground = "#add8c1"; // Couleur du fond de la planche du jeu
const snakeColor = "#273608"; // Couleur du serpent
const snakeBorder = "#add8c1"; // Couleur de la borudre du serpent
const unitSize = 25; // La "norme" qui va définir sur quel valeur le jeu doit se baser

// Variables de jeu
let foodNumber = 0;
let gameNumber = 1;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let gameSpeed = 75;
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

// Référence les touches du claviers et le click de la souris pour le bouton RESET
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Effacer le contenu du gameboard
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)  
};

function displayMainMenu() {
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("SNAKE", gameWidth / 2, gameHeight / 3.5);
    
    ctx.font = "35px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("JOUER", gameWidth / 2, gameHeight / 1.65);
    ctx.fillText("PARAMETRES", gameWidth / 2, gameHeight / 1.4);
    ctx.fillText("QUITTER", gameWidth / 2, gameHeight / 1.2);

    running = true;
}

displayMainMenu();


// Fonction démarrant le jeu
//gameStart();

// Initialisation du jeu
function gameStart(){
    running = true;
    scoreText.textContent = "SCORE : " + score;
    createFood();
    drawFood();
    nextTick();
};

// Fonction récursive permettant de mettre à jour le jeu à des intervalles prédéfinis
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, gameSpeed) // Vitesse de chaque tick: 1000 = 1s, 100 = 0,1s
        
    }
    else{
        displayGameOver();
    }
};

// Méthode pour créer une nouvelle position de la pomme de manière aléatoire
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

// Méthode pour dessiner la pomme sur le gameboard
function drawFood(){
    let foodImage = new Image();
    foodImage.src = "images/greenApplePixel.png";

    ctx.drawImage(foodImage, foodX, foodY, unitSize, unitSize);
};

// Méthode pour déplacer le serpent
function moveSnake(){
    // Définit la tête du serpent
    const head = {x: snake[0].x +xVelocity, //nombre positif pour droite, negatif gauche
                  y: snake[0].y +yVelocity,}; 
    
    snake.unshift(head)
    // Si la pomme est mangée
    if(snake[0].x == foodX && snake[0].y == foodY){
        score +=1;
        scoreText.textContent = "SCORE : " + score;
        createFood(); // Une fois qu'une pomme est mangée en faire apparaitre une autre
    }
    else{
        snake.pop(); // faire que le corps suive sans qu'il se demultiplie
    }
};

// Méthode pour dessiner le serpent sur le gameboard
function drawSnake(){
    ctx.fillStyle = snakeColor; // Attribuer la couleur de fond du snake
    ctx.strokeStyle = snakeBorder; // Attribuer la couleur des contours du snake
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
        //let snakeImage = new Image(); snakeImage.src = "images/snakeTexture.jpg"; ctx.drawImage(snakeImage, snakePart.x, snakePart.y, unitSize, unitSize)
    })
};

// Méthode pour changer la direction du serpent en fonction de la touche du clavier
function changeDirection(event){
    const keyPressed = event.keyCode
    const LEFT = 37; // 37 ce que console.log(keyPressed) me dit quand j'appuie sur flèche de gauche
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

// Vérifier les conditions de fin de jeu
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

// Afficher l'écran de fin de jeu
function displayGameOver(){
    clearBoard();
    ctx.font = "70px 'NokiaFont', sans-serif";
    ctx.fillStyle = "#273608";
    ctx.textAlign = "center";
    ctx.fillText("GAME", gameWidth / 2, gameHeight / 2.4);
    ctx.fillText("OVER", gameWidth / 2, gameHeight / 1.6);
    running = false; // Arrêt du jeu
};

// Réinitialiser le jeu
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