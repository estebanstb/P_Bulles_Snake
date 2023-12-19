// Projet : P_Bulles_Snake-PCX
// Auteur : LEBET Esteban
// Classe : CID2A
// Date : 07.11.2023
// Description : Fichier qui fait apparaître des pommes aléatoirement et les dessine
// Lieu : ETML, Sébeillon

// Classe représentant la pomme du jeu
export class Apple {
    constructor(unitSize, gameWidth, gameHeight) {
        // Propriétés de la pomme
        this.unitSize = unitSize;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.foodX = 0;
        this.foodY = 0;
        this.foodNumber = 0;
    }

    // Méthode pour créer une nouvelle position de la pomme de manière aléatoire
    createFood() {
        const randomFood = (min, max) => {
            const randNum = Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;
            return randNum;
        };
        this.foodX = randomFood(0, this.gameWidth - this.unitSize);
        this.foodY = randomFood(0, this.gameWidth - this.unitSize);
        console.log("Fruit " + this.foodNumber + ": X: " + this.foodX + " | Y: " + this.foodY);
        this.foodNumber += 1;
    }

    // Méthode pour dessiner la pomme sur le gameboard
    drawFood(ctx) {
        let foodImage = new Image();
        foodImage.src = "images/grayishApplePixel.png";
        ctx.drawImage(foodImage, this.foodX, this.foodY, this.unitSize, this.unitSize);
    }
}
