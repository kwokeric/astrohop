const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
// import Util from './util';

class Game {
  constructor(stage, canvasEl) {
    this.astronaut = this.addAstronaut(stage, canvasEl);
    this.asteroids = [];
    this.score = 0;
    this.row = 500;
    this.stage = stage;
    this.canvasEl = canvasEl;

    this.run = this.run.bind(this);
    this.addAsteroid = this.addAsteroid.bind(this);
    this.render = this.render.bind(this);

    this.run(stage);
    this.addAsteroid();
    this.addAsteroid();
    this.addAsteroid();
    this.addAsteroid();
    this.addAsteroid();
    this.render(stage);
  }

  run(stage) {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( stage.update() ));
    // Astronaut follows mouse
    createjs.Ticker.addEventListener("tick", event => {
      let difX = stage.mouseX - this.astronaut.x;
      this.astronaut.x += difX/8;
    });
  }

  addAstronaut(stage, canvasEl) {
    let astronaut = new Astronaut();  // Create astronaut
    stage.addChild(astronaut);

    canvasEl.addEventListener("click", click);  // add click event listener
    function click(event){
      astronaut.y = 330;
      canvasEl.removeEventListener("click", click);
    }

    return astronaut;
  }

  addAsteroid() {
    this.asteroids.push((new Asteroid(
      (Math.floor(Math.random() * (Game.DIM_X - 40) + 20)),
      (Math.floor(Math.random() * Game.DIM_Y))
    )));

    this.row -= 100;
  }

  removeAsteroid(object) {
    if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  // allAsteroids() {
  //   return [].concat(this.astronaut, this.platforms);
  // }

  render(stage) {
    this.asteroids.forEach((asteroid) => {
      stage.addChild(asteroid);
      stage.update();
    });
  }
}

Game.BG_COLOR = "#111";
Game.DIM_X = 800;
Game.DIM_Y = 550;
Game.FPS = 60;

module.exports = Game;
