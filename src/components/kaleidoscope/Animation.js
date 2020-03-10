import * as React from 'react';
// import Canvas from './Canvas';
import KaleidoscopeCanvas from './KaleidoscopeCanvas';

export default class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    updateAnimationState() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return (
            <KaleidoscopeCanvas />
        );
    }
}
