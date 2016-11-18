const Util = require('./util');

class Astronaut {
  constructor(points) {
    let guy = new createjs.Bitmap("./docs/astronaut.png");
    guy.y = 480;
    guy.points = points;
    return guy;
  }
}

module.exports = Astronaut;
