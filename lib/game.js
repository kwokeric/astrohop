import Astronaut from './astronaut';
// import Platform from './platform';
// import Util from './util';

class Game {
  constructor() {
    this.play = true;
    this.fps = 60;
    this.score = 0;

    document.getElementById('canvas').onclick = () => {
      this.run();
    };
    // this.addPlatforms();
  }

  run() {
    createjs.Ticker.setFPS(this.fps);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.on('tick', this.update.bind(this));
  }

  update(e) {

  }

  add(object) {
    if (object instanceof Astronaut) {
      this.asteroids.push(object);
    } else {
      throw "wtf?";
    }
  }

  allObjects() {
    return [].concat(this.astronaut, this.platforms);
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
