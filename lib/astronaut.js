// import * as Box2D from "./box2d";
// import Reality from "./reality";
// import Stage from "./stage";
// import getRelativeCoordinates from "./mouse_coords.js";
// import SpriteSheet from "./spritesheet";

class Astronaut {
  constructor(options) {
    let guy = new createjs.Bitmap("./docs/astronaut.png");
    guy.y = 480;
    return guy;
  }

}

module.exports = Astronaut;
