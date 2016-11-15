import Astronaut from './astronaut';
// import Platform from './platform';
// import Util from './util';

class Game {
  constructor() {
    this.astronaut = [];
    this.platform = [];

    // this.addPlatforms();
  }

  add(object) {
    if (object instanceof Astronaut) {
      this.asteroids.push(object);
    } else {
      throw "wtf?";
    }
  }

  allObjects() {
    return [].concat(this.asteroids, this.platforms);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;

module.exports = Game;
