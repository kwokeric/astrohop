// import * as Box2D from "./box2d";
// import Reality from "./reality";
// import Stage from "./stage";
// import getRelativeCoordinates from "./mouse_coords.js";
// import SpriteSheet from "./spritesheet";

class Astronaut {
  constructor() {
    this.circle = this.createAstronaut();
  }

  createAstronaut() {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("#70DBDB").drawCircle(0, 0, 15);
    circle.y = 560;
    return circle;
  }
}

module.exports = Astronaut;
