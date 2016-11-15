import * as Box2D from "./box2d";
// import Reality from "./reality";
// import Stage from "./stage";
// import getRelativeCoordinates from "./mouse_coords.js";
// import SpriteSheet from "./spritesheet";

class Astronaut {
  constructor() {

  }

  draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillRect(25,25,100,100);
      ctx.clearRect(45,45,60,60);
      ctx.strokeRect(50,50,50,50);
    }
  }
}

export default Astronaut;
