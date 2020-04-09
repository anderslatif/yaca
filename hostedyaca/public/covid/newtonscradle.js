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

    Events.on(engine, 'collisionStart', (event) => {
        event.source.pairs.collisionActive.map(body => {
            body.bodyA.render.fillStyle = 'green';
            body.bodyB.render.fillStyle = 'green';
            // todo change the infected rate
        });
        const allGreen = cradle.bodies.every(ball => ball.render.fillStyle === 'green');
        if (allGreen) {

        }
    });

}


