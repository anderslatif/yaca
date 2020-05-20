const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let instrument;

init()
function init() {
    Soundfont.instrument(new AudioContext(), 'clavinet').then(function (instr) {
        instrument = instr;
    });
    
    draw();
};

// harp create a note when hitting the white spaces

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(rand(0, canvas.width-3), 0, 3, canvas.height);
    requestAnimationFrame(draw);
}

const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const pixel = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    if (pixel[3] !== 255 && instrument) { // black color
        // const amountOfSections = 30; // aka note range
        // const cursorInSection = Math.round(mouseX / canvas.width * amountOfSections);

        // const baseNote = 45;

        // instrument.play(baseNote + cursorInSection);


        instrument.play(scale[Math.floor(rand(0, scale.length-1))] + '4');
    }
});

function rand(min, max) {
    return Math.random() * (max-min) + min;
}

// https://github.com/mdamien/mdamien.github.io/tree/master/fun/keepmoving