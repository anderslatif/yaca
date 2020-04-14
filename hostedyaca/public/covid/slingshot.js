function setUpSlingshot(workTasks, isSecondPartOfDay) {

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

    const scoreboardStyle = `position: absolute; color: white; top: 80px;`;
    const scoreboard = `<h3 class='scoreboard level-element' style="${scoreboardStyle} margin-left: 3vw; font-size: 0.9em;">
                        Work tasks left: ${workTasks}</h3>`;
    $("body").append(`<h3 class='level-title level-element' style="${titleStyle} margin-left: 3vw;">
                            Accomplish your work goals ${scoreboard}</h3>`);



    function createImage(text) {

        let drawing = document.createElement("canvas");

        drawing.width = '150'
        drawing.height = '150'

        let ctx = drawing.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.font = "10pt sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, 75, 85);
        // ctx.strokeText("Canvas Rocks!", 5, 130);

        return drawing.toDataURL("image/png");
    };

    /* Ball */
    const ballOptions = { 
        density: 0.30,
        // Coefficient of restitution = bounciness
        restitution: 0.3, 
        label: 'ball',
        render: {
            fillStyle: 'green',
            sprite: {
                texture: './lib/corona.png',
                xScale: 0.05,
                yScale: 0.05
            }
        }   
    };
    let ball = Bodies.polygon(wWidth/12, 450, 8, 30, ballOptions );
    const anchor = { x: wWidth/12, y: 450 };
    const elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: ball, 
        stiffness: 0.05
    });
    // Every time a ball is released it gets added to the array
    // I use the array to check if the released balls went through the hoop
    let balls = [ball];


    /* hoop elements  */
    // more about collision filtering: https://github.com/liabru/matter-js/blob/master/examples/collisionFiltering.js
    const rimCollisionCategory = 0x0002;
    const rim = Bodies.rectangle(wWidth/2+(100/2)+5 + wWidth/3, 100+(10/2), 100, 6, 
                    { label: 'hoop', isStatic: true, 
                    collisionFilter: {
                        category: rimCollisionCategory,
                        mask: rimCollisionCategory
                    },
                    render: { fillStyle: 'red' } });
    const backboard = Bodies.rectangle(wWidth/2+100+5 + wWidth/3, 100-(10*2), 10, 100, 
    { isStatic: true, label: 'backboard', render: { fillStyle: '#1919FF'} });
    const particleOptions = { friction: 0.00001, label: 'hoop', render: { visible: false }};
    const net = Composites.softBody(wWidth/2 + wWidth/3, 100, 5, 5, 8, 5, false, 8, particleOptions);

    for (let i = 0; i < 5; i++) {
        if (i === 0 || i  === 4)  {
            net.bodies[i].isStatic = true;
        }
    }

    World.add(engine.world, [elastic, rim, ball, backboard, net]);

    /* departments and coworkers */
    const customText = (name) => {
                        return { 
                            sprite: {
                                texture: createImage(name)
                            }
                        }
                    }; 

    const ground = Bodies.rectangle(wWidth/2, wHeight-20, wWidth, 10, 
                                    { isStatic: true, label: 'ground', render: customText("Management")});
    const wall = Bodies.rectangle(wWidth-(5/2), wHeight/3, 5, wHeight*1.5, { isStatic: true, label: 'ground' });

    const pyramid = Composites.pyramid(wWidth/3, 300, 9, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, wWidth/50, wHeight/15);
    });


    const ground2 = Bodies.rectangle(wWidth*1.5/2, wHeight*1.4/2, 200, 20, 
                                    { isStatic: true , label: 'ground', render: customText("HR") });

    const pyramid2 = Composites.pyramid(wWidth*1.5/2-(25*2), 0, 5, 10, 0, 0, (x, y) =>{
        return Bodies.rectangle(x, y, 25, 40);
    });

    World.add(engine.world, [ground, wall, pyramid, ground2, pyramid2]);


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

    let goals = workTasks;
    let coolDown = 0
    let isGoingToNextLevel = false;

    World.add(engine.world, mouseConstraint);
    
    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);


    Events.on(engine, 'tick', function() {
        if (mouseConstraint.mouse.button === -1 && (ball.position.x > wWidth/2+30 || ball.position.y < 430)) {
            ball = Bodies.polygon(wWidth/12, 450, 7, 30, ballOptions);
            World.add(engine.world, ball);
            elastic.bodyB = ball;
            balls.push(ball);
        }
        coolDown += 1;

        balls.map(ball => {
            if (ball.position.x > wWidth/2 + wWidth/3 + 5 
                && ball.position.x < wWidth/2 + wWidth/3 + 5 + 200 
                && ball.position.y > 125 
                && ball.position.y < 135
                && coolDown > 2) {
                if (goals > 0 && !isGoingToNextLevel) {
                    goals--;
                    $('.scoreboard').text(`Work tasks left: ${goals}`);
                    if (goals === 0 && !isGoingToNextLevel) {
                        isGoingToNextLevel = true;
                        if (isSecondPartOfDay) {
                            setUpFinishLevel(createLevel6);
                        } else {
                            // todo change back to level 4 to unskip lunch
                            setUpFinishLevel(createLevel6)
                        }                        
                    }
                } else {
                    goals++;
                    $('.scoreboard').text(`Overtime tasks completed: ${goals}`);
                }
                coolDown = 0;
            }
            
        });

    });

    Events.on(engine, 'collisionStart', (event) => {
        event.source.pairs.list.map( ({ bodyA, bodyB }) => {

            const labels = bodyA.label + bodyB.label;
            if (labels.includes('ballRectangle Body') || labels.includes('Rectangle Bodyball')) {
                if (bodyA.render.fillStyle !== 'green') {
                    bodyA.render.fillStyle = 'green';
                    infectedStats.numbersInfectedAtWork++;
                }
                if (bodyB.render.fillStyle !== 'green') {
                    bodyB.render.fillStyle = 'green';
                    infectedStats.numbersInfectedAtWork++;
                }
            }
        });
    });

}
