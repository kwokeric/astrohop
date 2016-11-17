import Util from './util';

class Astronaut {
  constructor(options) {
    let guy = new createjs.Bitmap("./docs/astronaut.png");
    guy.y = 480;
    return guy;
  }
}

module.exports = Astronaut;
