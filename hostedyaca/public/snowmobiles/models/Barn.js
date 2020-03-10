class Barn {
    constructor(context, canvasWidth, canvasHeight, spriteSheet) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spriteSheet = spriteSheet;
        this.spriteY = 801;

        this.barnWidth = 150;
        this.barnHeight = 240;
    }
    // width 500
    // height 800 - 1615 = 815
    create() {
        const typeOfBarn = Math.random();
        const type = typeOfBarn < 0.5 ? 'barnRed' : 'barnGreen';
        
        return {
            type,
            x: Math.round(this.canvasWidth * Math.random()) - this.barnWidth/2,
            y: 0,
            height: 800,
            width: 490,
            spriteX: typeOfBarn < 0.5 ? 0 : 500,
          };
    }

    draw(x, y, h, w, spriteX) {
        this.context.drawImage(this.spriteSheet, spriteX, this.spriteY, w, h, x, y, this.barnWidth, this.barnHeight);
    }
}
