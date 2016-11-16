const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
// import Util from './util';

class Game {
  constructor(stage, canvasEl) {
    this.astronaut = this.addAstronaut(stage, canvasEl);
    this.asteroids = [];
    this.score = 0;
    this.stage = stage;
    this.canvasEl = canvasEl;

    this.run = this.run.bind(this);
    this.addAsteroid = this.addAsteroid.bind(this);

    this.run(stage);

    this.addAsteroid();
    this.render(stage);
  }

  run(stage) {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( stage.update() ));
    // Astronaut follows mouse
    createjs.Ticker.addEventListener("tick", event => {
      let difX = stage.mouseX - this.astronaut.avatar.x;
      this.astronaut.avatar.x += difX/8;
    });
  }

  add(object) {
    if (object instanceof Astronaut) {
      this.astronaut.push(object);
    } else if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else {
      throw "wtf?";
    }
  }

  remove(object) {
    if (object instanceof Astronaut) {
      this.astronaut.splice(this.astronaut.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  addAstronaut(stage, canvasEl) {
    let astronaut = new Astronaut();  // Create astronaut
    stage.addChild(astronaut.avatar);

    canvasEl.addEventListener("click", click);  // add click event listener
    function click(event){
      astronaut.avatar.y = 380;

      canvasEl.removeEventListener("click", click);
    }

    return astronaut;
  }

  addAsteroid() {
    this.asteroids.push((new Asteroid({
      centerX: (Math.random() * (Game.DIM_X-40) + 20),
      centerY: (Math.random() * Game.DIM_Y)
    })));
  }

  allObjects() {
    // return [].concat(this.astronaut, this.platforms);
    let circle = new createjs.Shape();
  }

  render(stage) {
    // this.allObjects().forEach((object) => {
    //   stage.addChild(object);
    //   stage.update();
    // });
    let circle = new createjs.Shape();
    circle.graphics.beginFill("#B4FFC2").drawCircle(200, 200, 50);
    stage.addChild(circle);
    stage.update();
  }
}

Game.BG_COLOR = "#111";
Game.DIM_X = 1000;
Game.DIM_Y = 700;
Game.FPS = 60;

module.exports = Game;
