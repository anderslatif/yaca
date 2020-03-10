class Mound {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    create() {
        const moundWidth = Math.floor(Math.random() * (20 - 10 + 1)) + 100;
        return {
            type: 'mound',
            x: Math.round(this.canvasWidth * Math.random()) - moundWidth/2,
            y: 0,
            height: moundWidth/4,
            width: moundWidth,
          };
    }
    draw(x, y, h, w) {
        this.context.strokeStyle= 'black';
        this.context.lineWidth = 2;
        const mound = new Path2D();
        mound.moveTo(x, y);
        mound.quadraticCurveTo(x+w/2, y-h, x+w, y);
        this.context.stroke(mound);
    }
}
