let ceiling;
let ball;
let string;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  fill(0);

  matter.init();
  matter.mouseInteraction(canvas);

  ceiling = matter.makeBarrier(width / 2, -100, width + 400, 240);

  ball = matter.makeBall(0, 0, 70, {
    frictionAir: 0
  });

  string = matter.connect(ceiling, ball, {
    stiffnes: 0.8,
    pointA: {
      x: 0,
      y: 120
    }
  });
}

function draw() {
  background(255);

  ceiling.show();
  ball.show();
  string.show();
}
