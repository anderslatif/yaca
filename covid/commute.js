const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// create an engine
const engine = Engine.create();

engine.world.gravity.y = 0.005;

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: wWidth,
        height: wHeight,
        background: '#0f0f13',
        showAngleIndicator: true,
        wireframes: true,
    }
});

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

const ceiling = Bodies.rectangle(wWidth/2, 0+5, wWidth, 10, { isStatic: true, label: 'ground' });
const ground = Bodies.rectangle(wWidth/2, wHeight-5, wWidth, 10, { isStatic: true, label: 'ground' });
const wallLeft = Bodies.rectangle(0+5, wHeight/3, 10, wHeight*1.5, { isStatic: true, label: 'ground' });
const wallRight = Bodies.rectangle(wWidth-5, wHeight/3, 10, wHeight*1.5, { isStatic: true, label: 'ground' });

const scale = 0.9;
const car = Composites.car(150, 100, 150 * scale, 30 * scale, 30 * scale);


World.add(engine.world, [ceiling, ground, wallLeft, wallRight, car, mouseConstraint]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let anyKeyPressed = false;

let carX = 0;
let carY = 0;

window.addEventListener("keydown", function(e) {
    if (e.keyCode == 39) {
		rightPressed = true;
	}
	else if (e.keyCode == 37) {
		leftPressed = true;
	}
	else if (e.keyCode == 38) {
    	upPressed = true;
	}
	else if (e.keyCode == 40) {
    	downPressed = true;
	}
});
window.addEventListener("keyup", function(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
        anyKeyPressed = true;
	}
	else if (e.keyCode == 37) {
        leftPressed = false;
        anyKeyPressed = true;
	}
	else if (e.keyCode == 38) {
        upPressed = false;
        anyKeyPressed = true;
	}
	else if (e.keyCode == 40) {
        downPressed = false;
        anyKeyPressed = true;
    }
});


let carRotation = 0;

function updateCar() {

    // declare variables for velocity
    let speed = 5;
    let carRot = carRotation * 180/Math.PI;
    let velY = speed * Math.cos(carRot * Math.PI / 180);
    let velX = speed * Math.sin(carRot * Math.PI / 180)*-1; 
    let pushRot = 0;
    
    // update variables
    if (upPressed==false && downPressed==false) {
        velY = 0;
        velX = 0;
    }

    if (downPressed == true) {
        velY *= -1;
        velX *= -1;
    }
    if (leftPressed) {
        pushRot = -0.1;
    }
    if (rightPressed) {
        pushRot = 0.1;
    }
    carRotation += pushRot;


    //Set position of car
    carX += velX;
    carY += velY;

    car.bodies.map(carPart => {
        Body.applyForce(carPart, { x: 100, y: 100 }, { x: velX/10000, y: velY/10000 });
        Body.setAngle(carPart, carRotation);
    })

    requestAnimationFrame(updateCar);
}
window.requestAnimationFrame(updateCar);

setTimeout(() => {
    if (!anyKeyPressed) {
        // todo change the level description
        console.log("Use the arrow keys");
    }
}, 1000 * 1);