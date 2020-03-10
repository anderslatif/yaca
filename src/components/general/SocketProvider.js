import React from 'react';
import PropTypes from 'prop-types';

export default class SocketProvider extends React.Component {
    static propTypes = {
        socket: PropTypes.oneOfType([
            PropTypes.bool, PropTypes.object
        ]),
    };

    static defaultProps = {
        socket: false,
    };

    static childContextTypes = {
        socket: PropTypes.oneOfType([
            PropTypes.bool, PropTypes.object
        ]),
    };

    getChildContext() {
        return {
            socket: this.props.socket,
        };
    }

    render() {
        return this.props.children;
    }
}
