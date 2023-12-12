export class Apple {
    constructor(unitSize, gameWidth, gameHeight) {
        this.unitSize = unitSize;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.foodX = 0;
        this.foodY = 0;
        this.foodNumber = 0;
    }

    createFood() {
        this.foodNumber += 1;
        const randomFood = (min, max) => {
            const randNum = Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
            return randNum;
        };
        this.foodX = randomFood(0, this.gameWidth - this.unitSize);
        this.foodY = randomFood(0, this.gameWidth - this.unitSize);
        console.log("Fruit " + this.foodNumber + ": X: " + this.foodX + " | Y: " + this.foodY);
    }

    drawFood(ctx) {
        let foodImage = new Image();
        foodImage.src = "images/grayishApplePixel.png";

        ctx.drawImage(foodImage, this.foodX, this.foodY, this.unitSize, this.unitSize);
    }
}
