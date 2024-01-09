// Projet : P_Bulles_Snake-PCX
// Auteur : LEBET Esteban
// Classe : CID2A
// Date : 07.11.2023
// Description : Classe snake géreant la taille du serpent, son mouvement, ses collisions et si il mange une pomme ou non
// Lieu : ETML, Sébeillon

// Représente le serpent du jeu
export class Snake {
    constructor(unitSize, apple, snakeColor, snakeBorder, score, scoreText) {
        // Propriétés du serpent
        this.unitSize = unitSize;
        this.xVelocity = unitSize;
        this.yVelocity = 0;
        this.snake = [
            { x: unitSize, y: 0 },
            { x: 0, y: 0 }
        ];
        this.apple = apple;
        this.snakeColor = snakeColor;
        this.snakeBorder = snakeBorder;
        this.score = score; // Référence au score
        this.scoreText = scoreText;
    }

    // Méthode pour déplacer le serpent
    moveSnake() {
        // Définit la tête du serpent
        const head = {
            x: this.snake[0].x + this.xVelocity,
            y: this.snake[0].y + this.yVelocity
        };

        this.snake.unshift(head);

        if (this.snake[0].x == this.apple.foodX && this.snake[0].y == this.apple.foodY) {
            this.score += 1;
            this.scoreText.textContent = "SCORE : " + this.score;
            this.apple.createFood();
        } else {
            this.snake.pop();
        }
    }

    // Méthode pour dessiner le serpent sur le gameboard
    drawSnake(ctx) {
        ctx.fillStyle = this.snakeColor;
        ctx.strokeStyle = this.snakeBorder;
        this.snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
        });
    }

    // Méthode pour changer la direction du serpent en fonction de la touche du clavier
    changeDirection(event) {
        const keyPressed = event.keyCode;
        const LEFT = 37; // 37 = chiffre atribué à la touche flèche de gauche
        const UP = 38; // 38 = chiffre atribué à la touche flèche de haut
        const RIGHT = 39; // 39 = chiffre atribué à la touche flèche de droite
        const DOWN = 40; // 40 = chiffre atribué à la touche flèche du bas

        const goingUp = this.yVelocity == -this.unitSize;
        const goingDown = this.yVelocity == this.unitSize;
        const goingRight = this.xVelocity == this.unitSize;
        const goingLeft = this.xVelocity == -this.unitSize;

        switch (true) {
            case keyPressed == LEFT && !goingRight:
                this.xVelocity = -this.unitSize;
                this.yVelocity = 0;
                break;
            case keyPressed == UP && !goingDown:
                this.xVelocity = 0;
                this.yVelocity = -this.unitSize;
                break;
            case keyPressed == RIGHT && !goingLeft:
                this.xVelocity = this.unitSize;
                this.yVelocity = 0;
                break;
            case keyPressed == DOWN && !goingUp:
                this.xVelocity = 0;
                this.yVelocity = this.unitSize;
                break;
        }
    }

    // Méthode pour vérifier si le serpent entre en collision avec lui-même
    checkCollision() {
        for (let i = 1; i < this.snake.length; i += 1) {
            if (this.snake[i].x == this.snake[0].x && this.snake[i].y == this.snake[0].y) {
                return true;
            }
        }
        return false;
    }

    // Méthode pour réinitialiser le serpent
    resetSnake() {
        this.snake = 
        [
            { x: this.unitSize, y: 0 },
            { x: 0, y: 0 }          
        ];
        this.xVelocity = this.unitSize;
        this.yVelocity = 0;
        this.score = 0;
    }
}
