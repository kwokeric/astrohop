const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
// import Platform from './platform';
// import Util from './util';

class Game {
  constructor(stage, canvasEl) {
    this.astronaut = [];
    this.asteroids = [];
    this.score = 0;
    this.stage = stage;
    this.canvasEl = canvasEl;

    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( stage.update() ));

    createjs.Ticker.addEventListener("tick", cursor); // Add cursor event listener
    function cursor(event){
      let difX = stage.mouseX - astronaut.avatar.x;

      astronaut.avatar.x += difX/8;
    }

    let astronaut = new Astronaut();  // Create astronaut
    stage.addChild(astronaut.avatar);

    canvasEl.addEventListener("click", click);  // add click event listener
    function click(event){
      astronaut.avatar.y = 380;

      canvasEl.removeEventListener("click", click);
    }
  }

  add(object) {
    if (object instanceof Astronaut) {
      this.astronaut.push(object);
    } else if (object instanceof Asteroid) {
      this.asteroids.push(object)
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

  addAstronaut() {
    const astronaut = new Astronaut();

    this.add(astronaut);

    return astronaut;
  }

  addAsteroid() {
    for (let i = 0; i < 4; i++) {
      this.add(new Asteroid({
        centerX: (Math.random() * Game.DIM_X),
        centerY: (Math.random() * Game.DIM_Y)
      }));
    }
  }

  allObjects() {
    return [].concat(this.astronaut, this.platforms);
  }

  draw(ctx) {
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.BG_COLOR = "#111";
Game.DIM_X = 1000;
Game.DIM_Y = 700;
Game.FPS = 60;

module.exports = Game;
