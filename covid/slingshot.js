function setUpSlingshot() {

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

    let goals = 5;
    const titleStyle = `position: absolute; color: white; 
                    left: ${wWidth/3}px; top: 20px`;
    const scoreboardStyle = `position: absolute; color: white; 
                        left: ${wWidth/3}px; top: 80px`;
    const scoreboard = `<h3 class='scoreboard level-element' style="${scoreboardStyle}">Work tasks left: ${goals}</h3>`;
    $("body").append(`<h1 class='level-title level-element' style="${titleStyle}">
                            Accomplish your work goals ${scoreboard}</h1>`);


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
    let balls = [];

    const backboard = Bodies.rectangle(wWidth/2+100+5 + wWidth/3, 100-(10*2), 10, 100, 
                        { isStatic: true, label: 'backboard', render: { fillStyle: '#1919FF'} });
    // const hoop = Bodies.rectangle(wWidth/2+(100/2)+5 + wWidth/3, 100+(10/2), 100, 5, { isStatic: true, render: { fillStyle: 'red' } });
    const hoopStyle = `position: absolute; background: red; width: 100px; height: 9px; 
                    left: ${wWidth/2 + wWidth/3 + 5}px; top: 89px`;
    $("body").append(`<p class='hoop level-element' style="${hoopStyle}"></p>`);
    const hoop = document.getElementsByClassName("hoop");
    const particleOptions = { friction: 0.00001, label: 'hoop', render: { visible: false }};
    const cloth = Composites.softBody(wWidth/2 + wWidth/3, 100, 5, 5, 8, 5, false, 8, particleOptions);

    for (let i = 0; i < 5; i++) {
        if (i === 0 || i  === 4)  {
            cloth.bodies[i].isStatic = true;
        }
    }

    let customText = { 
        sprite: {
            texture: createImage("Management")
        }
    }; 

    const ground = Bodies.rectangle(wWidth/2, wHeight-20, wWidth, 10, { isStatic: true, label: 'ground', render: customText});
    const wall = Bodies.rectangle(wWidth-5, wHeight/3, 10, wHeight*1.5, { isStatic: true, label: 'ground' });

    var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 40);
    });

    customText = { 
                        sprite: {
                            texture: createImage("HR")
                        }
                    }; 

    var ground2 = Bodies.rectangle(wWidth*1.5/2, wHeight*1.4/2, 200, 20, { isStatic: true , label: 'ground', render: customText });

    var pyramid2 = Composites.pyramid(wWidth*1.5/2-(25*2), 0, 5, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 40);
    });


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

    let coolDown = 0

    Events.on(engine, 'tick', function() {
        if (mouseConstraint.mouse.button === -1 && (ball.position.x > wWidth/2+30 || ball.position.y < 430)) {
            ball = Bodies.polygon(wWidth/12, 450, 7, 30, ballOptions);
            World.add(engine.world, ball);
            elastic.bodyB = ball;
            balls.push(ball);
        }
        coolDown += 1;

        for (var i = 0; i < balls.length; i++) {
            if (balls[i].position.x > wWidth/2 + wWidth/3 + 5 
                && balls[i].position.x < wWidth/2 + wWidth/3 + 5 + 200 
                && balls[i].position.y > 125 
                && balls[i].position.y < 135
                && coolDown > 2) {
                goals--;
                $('.scoreboard').text(`Work tasks left: ${goals}`)
                coolDown = 0;
            }
        }
    });

    Events.on(engine, 'collisionStart', (event) => {
        event.source.pairs.collisionActive.map( ({ bodyA, bodyB }) => {

            const labels = bodyA.label + bodyB.label;
            if (labels.includes('ballRectangle Body') || labels.includes('Rectangle Bodyball')) {
                bodyA.render.fillStyle = 'green';
                bodyB.render.fillStyle = 'green';
                // todo add to the infected score
            }
        });
    });

    World.add(engine.world, [ball, elastic, backboard, hoop, cloth, mouseConstraint]);
    World.add(engine.world, [ground, wall, pyramid, ground2, pyramid2]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

}
