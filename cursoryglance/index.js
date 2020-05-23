const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const gridWidth = canvasWidth / 10;
const gridHeight = canvasHeight / 10;

let mouseX = canvasWidth / 2;
let mouseY = canvasHeight / 2;

let replays = [];
let replay = [];
let showingReplay = false;

let replayFrame = 0;

init();
function init() {
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if (!showingReplay) {
        ctx.fillRect(mouseX, mouseY, 10, 10);
        replay.push([mouseX, mouseY]);
    } 

    if (showingReplay) {


/*                 ctx.fillStyle = 'grey';
        let framesToShow = false;
        
        replays.forEach(replay => {

            framesToShow = replay[replayFrame] ? true : false;
            const pos = replay[replayFrame] ? replay[replayFrame] : replay[replay.length-1]
            ctx.fillRect(pos[0], pos[1], 10, 10);
        }); 
        replayFrame++;
        */

        if (replayFrame < replay.length) {
            ctx.save();
            const replayPos = replay[replayFrame];
            ctx.fillStyle = 'grey';
            ctx.fillRect(replayPos[0], replayPos[1], 10, 10);
            ctx.restore();
            replayFrame++;
        } else {
            // end replay
            showingReplay = false;
            ctx.fillStyle = 'black';
            replay = [];
            replayFrame = 0;
        }
        


/*         if (!framesToShow) {
            // end replay
            showingReplay = false;
            ctx.fillStyle = 'black';
            replayFrame = 0;
        } */


    }

    if (!showingReplay && mouseX > canvasWidth - 10 && mouseY > canvasHeight - 10) {
        // replays.push([replay]);
        // replay = [];
        showingReplay = true;
    }

    drawLevel1();

    requestAnimationFrame(draw);
}



document.addEventListener('mousemove', () => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;


});

/* document.addEventListener('touchstart', () => {
});

document.addEventListener('touchmove', () => {
});

document.addEventListener('touchend', () => {
}) */