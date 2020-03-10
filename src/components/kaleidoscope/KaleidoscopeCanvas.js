import React from 'react';
import PureCanvas from '../general/PureCanvas';
import * as PIXI from 'pixi.js'




export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasRef: React.createRef(),
      timer: 0,
      velocity: 0.05,
      currentPos: {'x' : 0, 'y': 0},
      targetPos: {'x' : 0, 'y': 0},
      app: null,
      kaleidoscope: null,
      sector: null,
      imageURL: 'https://cdn.glitch.com/ddb1cee6-8972-4dd4-90cc-ddff26b78ced%2Falps.jpg?1537533034118',
      image: null,
      maskImages: [],
      radius: 4000
    };
  }

  componentDidMount() {
    //Create a Pixi Application
    let app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true
    });
    // todo
    // this.app.stage.interactive = true;
    // this.app.stage.mousemove = onMouseMove;

    const image = PIXI.Texture.from(this.state.imageURL);

    this.setState({
      app,
      image
    });

    this.createKaleidoscope();
    this.animate()
  }

  componentDidUpdate() {



  }

  onResize = (width, height) => {
/*    // resize the renderer
    app.renderer.view.style.width = width + 'px';
    app.renderer.view.style.height = height + 'px';
    app.renderer.resize(width, height);

    // reposition kaleidoscope container so it always stays in the middle
    kaleidoscope.position.set(width / 2, height / 2)*/
  };

  saveContext = (ctx) => {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  };

  createKaleidoscope = () => {
    let {
      numberOfSectors, sector, maskImages,
        width, height, radius, image, app
    } = this.state;
    // calculate the length of an arc
    let arc = 2 * Math.PI / numberOfSectors;

    let kaleidoscope = new PIXI.Container();
    kaleidoscope.position.set(width / 2, height / 2);

    for (let i = 0; i < numberOfSectors; i++ ) {

      // create the kaleidoscope "slices"
      sector = new PIXI.Graphics();
      // todo this seems to do nothing sector.beginFill(colors[i]);
      sector.moveTo(width / 2, height / 2);
      sector.arc(width / 2, height / 2, radius, -arc / 2, arc / 2);
      sector.endFill();

      let maskImage = new PIXI.TilingSprite(image, radius, radius);
      maskImages.push(maskImage);
      maskImage.mask = sector;

      let container = new PIXI.Container();
      container.addChild(maskImage);
      container.addChild(sector);
      container.pivot.x = width / 2;
      container.pivot.y = height / 2;
      container.rotation = arc * i;
      container.scale.x = i % 2 ? 1 : -1;

      kaleidoscope.addChild(container)

    }
    console.log("8888 ", kaleidoscope);

    // app.stage.addChild(kaleidoscope)
    this.setState({
      app: kaleidoscope
    });
  };

  animate = () => {
/*    app.ticker.add(() => {
      let delta = { 'x': targetPos.x - currentPos.x, 'y': targetPos.y - currentPos.y};
      targetPos = {'x': targetPos.x - (delta.x * velocity), 'y': targetPos.y - (delta.y * velocity)};
      timer += 0.3;

      for(let i = 0; i < numberOfSectors; i++) {
        maskImages[i].tilePosition.y = targetPos.y + timer;
        maskImages[i].tilePosition.x = targetPos.x + timer;
      }
    })*/
  };

  render() {
    return (
        <div>
          {this.state.app ? this.state.app.view : null}
          <PureCanvas contextRef={this.saveContext} handleResize={this.onResize}/>
        </div>
    );
  }
}
