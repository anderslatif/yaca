import * as React from 'react';
import Canvas from './Canvas';

import SocketProvider from '../general/SocketProvider';
import io from 'socket.io-client';
const socket = io.connect("localhost:8080"/*process.env.SOCKET_URL*/);

export default class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { angle: 0 };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    updateAnimationState() {
        this.setState(prevState => ({ angle: prevState.angle + 1 }));
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return (
            <SocketProvider socket={socket}>
                <Canvas angle={this.state.angle} />
            </SocketProvider>
        );
    }
}
