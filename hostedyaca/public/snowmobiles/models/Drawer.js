class Drawer {
    constructor(context, canvasWidth, canvasHeight, volumeIconPlacement, images, obstaclesToDraw) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.volumeIconPlacement = volumeIconPlacement;

        this.spriteSheet = images.spriteSheet;
        this.moveKeysImage = images.moveKeysImage;
        this.obstaclesToDraw = obstaclesToDraw;

        this.faVolumeMute = '\uf026';
        this.faVolumeUp = '\uf028';
    }
    
    drawIntroScreen() {
        const grid = this.canvasWidth / 12;
        const horizontalGrid = this.canvasHeight / 24;

        const leftSide = grid * 1;
        const rightSide = grid*7;
        const snowmobileMiddle = 200;

        // ------------ top ------------
        // wasd keys
        this.context.drawImage(this.moveKeysImage, 0, 0, 170, 220, leftSide+snowmobileMiddle, 0, 200, 200);

        // draw snowmobile left
        this.context.drawImage(this.spriteSheet, 0, 600, 480, 200, leftSide, 100, 480, 180);

        // arrow keys
        this.context.drawImage(this.moveKeysImage, 170, 0, 170, 220, rightSide+50, 0, 200, 200);

        // draw snowmobile right
        this.context.drawImage(this.spriteSheet, 500, 600, 500, 200, rightSide, 100, 480, 180);

        // ------------ middle ------------
        // game title
        this.context.font = "70px under-the-snow-regular";
        this.context.fillStyle = "black";
        const textWidth = this.context.measureText("Snowmobiles").width;
        const textBeginFromX = (this.canvasWidth/2)-(textWidth/2)-60;
        this.context.fillText("Snowmobiles", textBeginFromX, this.canvasHeight/2); 

        this.context.font = "40px under-the-snow-regular";
        this.context.fillText("Joe Pera", this.canvasWidth/2-textBeginFromX/3, horizontalGrid*10); 
        this.context.fillText("With You", this.canvasWidth/2-textBeginFromX/3, horizontalGrid*13.5); 


        // ------------ bottom ------------
        this.context.font = "bold 22px Courier";

        this.context.fillText("Snowdrifts +1 point", leftSide, horizontalGrid*11); 
        this.obstaclesToDraw.mound.draw(leftSide, horizontalGrid*12, 10, 200);

        this.context.fillText("Barns -8 points", leftSide, horizontalGrid*14); 
        this.obstaclesToDraw.barn.draw(leftSide, horizontalGrid*15, 800, 490, 0);

        this.context.fillText("Giant Meatballs +2 points", rightSide+grid, horizontalGrid*11); 
        this.obstaclesToDraw.meatball.draw(rightSide+2*grid, horizontalGrid*12, 200, 200);

        this.context.fillText("Rocks -5 points", rightSide+grid, horizontalGrid*16); 
        this.obstaclesToDraw.rock.draw(rightSide+2*grid, horizontalGrid*17, 290, 355, 200);

    }
    
    drawScorePaneWithVolume(score, isMuted) {
        // volume button
        this.context.fillStyle = "black";
        this.context.font = '24px FontAwesome';
        const volumeIcon = isMuted ? this.faVolumeMute : this.faVolumeUp;
        this.context.fillText(volumeIcon, this.volumeIconPlacement.x, this.volumeIconPlacement.y);

        // score
        this.context.font = "24px Arial";
        this.context.strokeStyle = "green";
        this.context.strokeText("Score", this.canvasWidth-100, 50); 

        this.context.font = "20px Arial";
        this.context.strokeStyle = "brown";
        this.context.strokeText(score, this.canvasWidth-100, 70); 
    }
}
