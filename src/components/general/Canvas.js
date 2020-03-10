import React from 'react';
import PureCanvas from '../general/PureCanvas';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {

  }

  saveContext = (ctx) => {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  };

  render() {
    return (
        <PureCanvas contextRef={this.saveContext} />
    );
  }
}
