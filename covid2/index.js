
// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#0f0f13',
        showAngleIndicator: false,
        wireframes: false
    }
});


// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight-10, window.innerWidth, 10, { isStatic: true });

const mouseConstraint = MouseConstraint.create(engine);

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, mouseConstraint]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
