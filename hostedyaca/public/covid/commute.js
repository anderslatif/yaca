function setUpCommute(transportationMode, isGoingHome) {
    // create an engine
    const engine = Engine.create();

    engine.world.gravity.y = isGoingHome ? -1 : 1;

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


    /* frame */
    const ceiling = Bodies.rectangle(wWidth/2, 0+5, wWidth, 10, { isStatic: true, label: 'ground' });
    const ground = Bodies.rectangle(wWidth/2, wHeight-5, wWidth, 10, { isStatic: true, label: 'ground' });
    const wallLeft = Bodies.rectangle(0+5, wHeight/3, 10, wHeight*1.5, { isStatic: true, label: 'ground' });
    const wallRight = Bodies.rectangle(wWidth-5, wHeight/3, 10, wHeight*1.5, { isStatic: true, label: 'ground' });

    World.add(engine.world, [ceiling, ground, wallLeft, wallRight]);

    /* public */
    const public1 = Composites.stack(wWidth-70, wHeight/3, 5, 5, 0, 0, (x, y) => {
        return Bodies.rectangle(x, y, 10, 10, { label: 'public' });
    });
    const public2 = Composites.stack(0+20, row*4, 5, 5, 0, 0, (x, y) => {
        return Bodies.rectangle(x, y, 10, 10, { label: 'public' });
    });
    const public3 = Composites.stack(0+20, row*10, 5, 5, 0, 0, (x, y) => {
        return Bodies.rectangle(x, y, 10, 10, { label: 'public' });
    });

    if (transportationMode === 'public') {
        World.add(engine.world, [public1, public2, public3]);
    }

    let car;

    if (isGoingHome) {
        /* platforms */
        const platformLength = column*7;
        const height = 10;
        const upperLeft = Bodies.rectangle(platformLength/2, wHeight/3, platformLength, height, 
            { isStatic: true, angle: Math.PI * 0.06 });
        const upperRight = Bodies.rectangle(wWidth-(platformLength/2), wHeight/2, platformLength, height, 
            { isStatic: true, angle: -Math.PI * 0.06 });
        const lowerLeft = Bodies.rectangle(platformLength/2, row*9, platformLength, height, 
            { isStatic: true, angle: Math.PI * 0.04 });

        /* car */
        const scale = 0.9;
        car = Composites.car(wWidth-150, wHeight-100, 150 * scale, 30 * scale, 30 * scale);
        car.bodies.map(carPart => {
            carPart.label = 'car';
        });

        /* home */
        const home = Bodies.rectangle(0+60, 0+60, 100, 100, { label: 'workplace', isStatic: true });

        World.add(engine.world, [upperLeft, upperRight, lowerLeft, car, home]);
    } else {
        /* platforms */
        const platformLength = column*7;
        const height = 10;
        const upperLeft = Bodies.rectangle(platformLength/2, wHeight/3, platformLength, height, 
            { isStatic: true, angle: Math.PI * 0.06 });
        const upperRight = Bodies.rectangle(wWidth-(platformLength/2), wHeight/2, platformLength, height, 
            { isStatic: true, angle: -Math.PI * 0.06 });
        const lowerLeft = Bodies.rectangle(platformLength/2, row*9, platformLength, height, 
            { isStatic: true, angle: Math.PI * 0.04 });

        /* car */
        const scale = 0.9;
        car = Composites.car(150, 100, 150 * scale, 30 * scale, 30 * scale);
        car.bodies.map(carPart => {
            carPart.label = 'car';
        });

        /* workplace */
        const workPlace = Bodies.rectangle(wWidth-70, wHeight-60, 100, 100, { label: 'workplace', isStatic: true });

        World.add(engine.world, [upperLeft, upperRight, lowerLeft, car, workPlace]);
    }


    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    let isGoingToNextLevel = false;
    Events.on(engine, 'collisionStart', (event) => {
        event.source.pairs.list.map( ({ bodyA, bodyB }) => {

            const labels = bodyA.label + bodyB.label;

            if (labels.includes('car') && labels.includes('public')) {
                if (bodyA.label === 'public') {
                    bodyA.label = 'infected';
                    // bodyA.render.fillStyle = 'green';
                }
                if (bodyB.label === 'public') {
                    bodyB.label = 'infected';
                    // bodyB.render.fillStyle = 'green';
                }
                // todo add to the infected score
                // todo should be a factor by X times each infected person
            }
            if (labels.includes('car') && labels.includes('workplace') && !isGoingToNextLevel) {
                isGoingToNextLevel = true;
                if (isGoingHome) {
                    setUpFinishLevel(createFinalScreen)
                } else {
                    setUpFinishLevel(createLevel3);
                }
            }
        });
    });


    /* handle car movement */

    let upPressed = false;
    let downPressed = false;
    let leftPressed = false;
    let rightPressed = false;

    let carX = 0;
    let carY = 0;

    window.addEventListener("keydown", (e) => {
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
    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
        else if (e.keyCode == 38) {
            upPressed = false;
        }
        else if (e.keyCode == 40) {
            downPressed = false;
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
        if (!upPressed && !downPressed) {
            velY = 0;
            velX = 0;
        }

        if (upPressed) {
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
        });

        requestAnimationFrame(updateCar);
    }
    window.requestAnimationFrame(updateCar);

    // if the game is played on an unusual screen size just allow the user to proceed
    setTimeout(() => {
        if (isGoingHome) {
            setUpFinishLevel(createFinalScreen)
        } else {
            setUpFinishLevel(createLevel3);
        }
    }, 1000 * 120);
}