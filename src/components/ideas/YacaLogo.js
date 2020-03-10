import React from 'react';

function angleBetweenPointsInDegrees(x1, y1, x2, y2) {
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;

    angle = 180 + angle;

    return angle;
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;

    return Math.sqrt((a * a) + (b * b));
}


const styleProperties = {
    family : "serif",
    size : 100,
    fill : "#313131"
};

const Blotter = window.Blotter;

const text = new Blotter.Text("YACA", styleProperties);

const material = new Blotter.ChannelSplitMaterial();

const blotter = new Blotter(material, {
    texts : text
});

const scope = blotter.forText(text);

scope.on("mousemove", (mousePosition) => {
    const angle = angleBetweenPointsInDegrees(0.5, 0.5, mousePosition.x, mousePosition.y);
    const blur = Math.min(0.3, distanceBetweenPoints(0.5, 0.5, mousePosition.x, mousePosition.y));

    scope.material.uniforms.uRotation.value = angle;
    scope.material.uniforms.uOffset.value = blur;
});

function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    const intervalID = window.setInterval( () => {
        callback();

        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}

scope.on("mouseleave", () => {
    scope.material.uniforms.uOffset.value = 0.2;
    setIntervalX(() => {
        scope.material.uniforms.uOffset.value -= 0.01;
    }, 600, 8)
});


export default class YacaLogo extends React.Component {
    componentDidMount() {
        scope.appendTo(this.container)
    }

    render() {
        return (
            <div ref={container => this.container = container} />
        )
    }
}
