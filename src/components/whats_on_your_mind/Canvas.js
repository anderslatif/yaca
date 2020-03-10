import React from 'react';
import PureCanvas from '../general/PureCanvas';
import socketConnect from '../general/socketConnect';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.props.socket.emit('client_message', 'Hello world! This is a test message');
/*    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);*/
  }

  componentDidUpdate() {
    // Draws a square in the middle of the canvas rotated
    // around the centre by this.props.angle
    const { angle } = this.props;
    const ctx = this.ctx;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = '#4397AC';
    ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    ctx.restore();

    // draw stars:
    // https://github.com/impaler/starfield-react/blob/develop/src/components/Starfield.tsx
    // http://react-web-animation.surge.sh/parallax-starfield
    // https://github.com/bringking/react-web-animation
    // http://slicker.me/javascript/starfield.htm
  }

  saveContext = (ctx) => {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  };

  render() {
/*
    this.props.socket.on('server_message', response => {
      console.log(response);
    });
*/

    return (
        <PureCanvas contextRef={this.saveContext} />
    );
  }
}

export default socketConnect(Canvas);
