const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

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
            const replayPos = replay[replayFrame];
            ctx.fillStyle = 'grey';
            ctx.fillRect(replayPos[0], replayPos[1], 10, 10);
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

    if (!showingReplay && mouseX > 490 && mouseY > 490) {
        // replays.push([replay]);
        // replay = [];
        showingReplay = true;
    }

    requestAnimationFrame(draw);
}



document.addEventListener('mousemove', () => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;


});

document.addEventListener('touchstart', () => {
});

document.addEventListener('touchmove', () => {
});

document.addEventListener('touchend', () => {
})