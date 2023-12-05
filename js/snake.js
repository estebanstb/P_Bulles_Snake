class Snake {
    constructor(unitSize, context, snakeColor, snakeBorder) {
        this.body = [
            { x: unitSize, y: 0 },
            { x: 0, y: 0 }
        ];
        this.ctx = context;
        this.snakeColor = snakeColor;
        this.snakeBorder = snakeBorder;
    }

    move(xVelocity, yVelocity) {
        const head = { x: this.body[0].x + xVelocity, y: this.body[0].y + yVelocity };
        this.body.unshift(head);

        if (this.body[0].x === apple.x && this.body[0].y === apple.y) {
            score += 1;
            scoreText.textContent = "SCORE : " + score;
            apple.create();
        } else {
            this.body.pop();
        }
    }

    draw() {
        this.ctx.fillStyle = this.snakeColor;
        this.ctx.strokeStyle = this.snakeBorder;
        this.body.forEach(snakePart => {
            this.ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            this.ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
        });
    }

    checkCollision() {
        if (
            this.body[0].x < 0 ||
            this.body[0].x >= gameWidth ||
            this.body[0].y < 0 ||
            this.body[0].y >= gameHeight
        ) {
            running = false;
        }

        for (let i = 1; i < this.body.length; i += 1) {
            if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
                running = false;
            }
        }
    }
}
export default Snake;