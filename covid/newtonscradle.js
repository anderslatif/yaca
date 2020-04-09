const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: wWidth,
        height: wHeight,
        background: '#0f0f13',
        showAngleIndicator: false,
        wireframes: false,
    }
});


const amountOfBalls = 5;

function newtonsCradle(xx, yy, amountOfBalls, size, length) {
    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

    for (var i = 0; i < amountOfBalls; i++) {
        var separation = 3,
            circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                        { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1}),
            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
    }

    return newtonsCradle;
}

const cradle = newtonsCradle(wWidth/2-200, wHeight/2, amountOfBalls, 30, 200)

// moves a body by a given vector relative to its current position, without imparting any velocity.
Body.translate(cradle.bodies[0], { x: -180, y: -100 });


// allow mouse interaciton
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 1,
        render: {
            visible: false
        }
    }
});

World.add(engine.world, [cradle, mouseConstraint]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

Events.on(engine, 'collisionStart', (event) => {
    event.source.pairs.collisionActive.map(body => {
        body.bodyA.render.fillStyle = 'green';
        body.bodyB.render.fillStyle = 'green';
        return body.bodyA.render.fillStyle;
    });
    const allGreen = cradle.bodies.every(ball => ball.render.fillStyle === 'green');
    if (allGreen) {

    }
});
