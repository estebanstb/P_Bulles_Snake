export class Snake {
        constructor(unitSize, apple, snakeColor, snakeBorder, score, scoreText) {
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
        this.score = score; // Ajout de la référence à score
        this.scoreText = scoreText;
    }

    moveSnake() {
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

    drawSnake(ctx) {
        ctx.fillStyle = this.snakeColor;
        ctx.strokeStyle = this.snakeBorder;
        this.snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
        });
    }

    changeDirection(event) {
        const keyPressed = event.keyCode;
        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

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

    checkCollision() {
        for (let i = 1; i < this.snake.length; i += 1) {
            if (this.snake[i].x == this.snake[0].x && this.snake[i].y == this.snake[0].y) {
                return true;
            }
        }
        return false;
    }

    resetSnake() {
        this.snake = [
            { x: this.unitSize, y: 0 },
            { x: 0, y: 0 }
        ];
        this.xVelocity = this.unitSize;
        this.yVelocity = 0;
    }
}
