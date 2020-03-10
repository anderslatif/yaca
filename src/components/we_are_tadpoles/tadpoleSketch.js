export default function tadpoleSketch (p) {

    p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight);
    };

    p.draw = function () {
        if (p.mouseIsPressed) {
            p.fill(255, 255, 255);
        } else {
            p.fill(255, 0, 0);
        }
        p.ellipse(p.mouseX, p.mouseY, 80, 80);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {

    };

    window.onresize = function() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        p.resizeCanvas(w,h);
        p.width = w;
        p.height = h;
    };

};
