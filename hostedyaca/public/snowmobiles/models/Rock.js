class Rock {
    constructor(context, canvasWidth, canvasHeight, spriteSheet) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spriteSheet = spriteSheet;
        this.spriteY = 1700;

        this.widthHeight = 115;
    }
    
    create() {
        const typeOfRock = Math.random();
        return {
            type: 'rock',
            x: Math.round(this.canvasWidth * Math.random()) - this.widthHeight/2,
            y: 0,
            height: 290,
            width: 355,
            spriteX: typeOfRock < 0.5 ? 200 : 600
          };
    }
    
    draw(x, y, h, w, spriteX) {
        
        //this.context.drawImage(this.spriteSheet, spriteX, this.spriteY, 400, h, x, y, this.widthHeight, this.widthHeight);
        this.context.drawImage(this.spriteSheet, spriteX, this.spriteY, w, h, x, y, this.widthHeight, this.widthHeight);
    }
}
