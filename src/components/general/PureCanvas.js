import * as React from 'react';

export default class PureCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return nextState;
        }
        return false;
    }

    handleResize = event => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.setState({
            width,
            height
        });
        if (this.props.handleResize === 'function') {
            this.handleResize(width, height);
        }
    };


    render() {
        const { width, height } = this.state;

        window.addEventListener("resize", this.handleResize);

        return (
            <canvas
                width={width}
                height={height}
                ref={node =>
                    node ? this.props.contextRef(node.getContext('2d')) : null
                }
            />
        );
    }
}
