class Meatball {
    constructor(context, canvasWidth, canvasHeight, spriteSheet) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spriteX = 0;
        this.spriteY = 1700;
        this.spriteSheet = spriteSheet;
    }
    createMeatball() {
        return {
            type: 'meatball',
            x: Math.round(this.canvasWidth * Math.random()) - 100/2,
            y: 0,
            height: 200,
            width: 200,
          };
    }
    draw(x, y, h, w, time) {
        this.context.drawImage(this.spriteSheet, this.spriteX, this.spriteY, w, h, x, y, 100, 100);
    }
}
