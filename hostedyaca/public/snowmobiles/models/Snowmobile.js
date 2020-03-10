class Snowmobile {
    constructor(context, canvasWidth, canvasHeight, spriteSheet, person) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.halfImageWidth = 100;
        
        this.snowmobileX = canvasWidth/2 - this.halfImageWidth;
        this.snowmobileY = canvasHeight-250;
        this.direction = 0;
        this.spriteX = 400;
        this.spriteSheet = spriteSheet;

        this.snowmobileWidth = 100;
        this.snowmobileHeight = 200;

        if (person === 'joepera') {
            this.spriteY = 0;
        } else if (person === 'jofirestone') {
            this.spriteY = 300;
        }
    }

    draw() {
        this.context.drawImage(this.spriteSheet, this.spriteX, this.spriteY, 200, 300, this.snowmobileX, this.snowmobileY, this.snowmobileWidth, this.snowmobileHeight);
    }

    updatePosition() {
        // Update snowmobile position and make sure it stays in the window
        if (this.snowmobileX < 0){
            this.snowmobileX += Math.abs(this.direction);
        } else if (this.snowmobileX + this.halfImageWidth > this.canvasWidth) {
            this.snowmobileX -= Math.abs(this.direction);
        } else {
            this.snowmobileX += this.direction;
        }
    }
}
