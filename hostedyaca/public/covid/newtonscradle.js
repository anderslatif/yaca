function setUpNewtonsCradle(amountOfBalls) {
    // create an engine
    engine = Engine.create();

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


    function newtonsCradle(xx, yy, amountOfBalls, size, length, ballGap) {
        let newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

        for (let i = 0; i < amountOfBalls; i++) {
                circle = Bodies.circle(xx + i * (size * ballGap), yy + length, size, 
                            { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1}),
                constraint = Constraint.create({ pointA: { x: xx + i * (size * ballGap), y: yy }, bodyB: circle });

            Composite.addBody(newtonsCradle, circle);
            Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    }

    const firstRowAmountOfBalls = amountOfBalls > 5 ? 5 : amountOfBalls;

    let ballGap = wWidth > 1200 ? wWidth/200 : wWidth/150;
    const startColumnAdd = wWidth > 1700 ? column : column * 2; 
    const startingXPosition = ballGap * firstRowAmountOfBalls + startColumnAdd;

    const cradle = newtonsCradle(startingXPosition, wHeight/2, firstRowAmountOfBalls, column/4, 200, ballGap);
    let cradleSecondRow;
    if (amountOfBalls > 5) {
        cradleSecondRow = newtonsCradle(startingXPosition, wHeight/3, amountOfBalls-5, column/4, 200, ballGap);
        World.add(engine.world, cradleSecondRow);
    }

    // moves a body by a given vector relative to its current position, without imparting any velocity.
    Body.translate(cradle.bodies[0], { x: -180, y: -100 });


    // allow mouse interaction
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

    let isGoingToNextLevel = false;
    Events.on(engine, 'collisionStart', (event) => {
        event.source.pairs.list.map(({ bodyA, bodyB }) => {
            if (bodyA.label === 'infected' || bodyB.label === 'infected') {
                bodyA.render.fillStyle = 'green';
                bodyA.label = 'infected';
                bodyB.render.fillStyle = 'green';
                bodyB.label = 'infected';
            }
        });
        const allInfected = cradle.bodies.every(ball => ball.label === 'infected');
        if (allInfected && !isGoingToNextLevel) {
            isGoingToNextLevel = true;
            infectedStats.numbersInfectedAtHome = amountOfBalls;
            setUpFinishLevel(preLevel2);
        }
    });


    setTimeout(() => {
        const playerBall = cradle.bodies[0];
        playerBall.render.fillStyle = 'green';
        playerBall.label = 'infected';
    
        if (amountOfBalls === 1) {
            setUpFinishLevel(preLevel2);
        }
    }, 1000 * 7); 
    // 1 day represented as 500 ms
    // thus the player starts showing symptoms after 14 days

}
