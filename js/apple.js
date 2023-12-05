// Apple.js
class Apple {
    constructor(gameWidth, gameHeight, unitSize, context) {
        this.x = 0;
        this.y = 0;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.unitSize = unitSize;
        this.ctx = context;
    }

    create() {
        this.x = this.randomPosition(0, this.gameWidth - this.unitSize);
        this.y = this.randomPosition(0, this.gameHeight - this.unitSize);
    }

    randomPosition(min, max) {
        return Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
    }

    draw() {
        let appleImage = new Image();
        appleImage.src = "images/grayishApplePixel.png";
        this.ctx.drawImage(appleImage, this.x, this.y, this.unitSize, this.unitSize);
    }
}

// Exporter la classe Apple
export default Apple;
