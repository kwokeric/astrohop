import Util from './util';


class Astronaut {
  constructor(options) {
    // this.pos = options.pos || (0,0);
    let guy = new createjs.Bitmap("./docs/astronaut.png");
    guy.y = 480;
    return guy;
  }

  jump() {

  }
}

module.exports = Astronaut;
