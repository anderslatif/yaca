import React from 'react';
import Matter from 'matter-js';

export default class NewtonsCradle extends React.Component {
    componentDidMount() {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Composites = Matter.Composites,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World;

        // create engine
        const engine = Engine.create(),
            world = engine.world;

        // create renderer
        const render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                showVelocity: true
            }
        });

        Render.run(render);

        // create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        let cradle = Composites.newtonsCradle(280, 100, 5, 30, 200);
        World.add(world, cradle);
        Body.translate(cradle.bodies[0], { x: -180, y: -100 });

        cradle = Composites.newtonsCradle(280, 380, 7, 20, 140);
        World.add(world, cradle);
        Body.translate(cradle.bodies[0], { x: -140, y: -100 });

        // add mouse control
        const mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 50 },
            max: { x: 800, y: 600 }
        });
    }

    render() {
        return (
            <div ref="scene" />
        )
    }
}
