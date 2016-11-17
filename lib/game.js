const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
const Util = require("./util");

class Game {
  constructor(stage, canvasEl) {
    this.astronaut;
    this.asteroids = [];
    this.score = 0;
    this.row = 350;
    this.stage = stage;
    this.canvasEl = canvasEl;
    this.inMotion = false;

    this.run = this.run.bind(this);
    this.addAsteroid = this.addAsteroid.bind(this);
    this.render = this.render.bind(this);
    this.shift = this.shift.bind(this);

    this.run();
    this.setup();
    this.render();
  }

  run() {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( this.stage.update() ));
    // Astronaut follows mouse
    createjs.Ticker.addEventListener("tick", event => {
      let difX = this.stage.mouseX - this.astronaut.x - 24;
      this.astronaut.x += difX/8;

      this.checkCollisions();
      this.shift();
    });
  }

  setup() {
    this.addAstronaut();
    for (let i = 0; i < 5; i++) {
      this.addAsteroid();
    }
  }

  addAstronaut() {
    let astronaut = new Astronaut();  // Create astronaut
    this.stage.addChild(astronaut);

    this.canvasEl.addEventListener("click", click.bind(this));  // add click event listener
    function click(event){
      this.initJump();
      this.canvasEl.removeEventListener("click", click);
    }

    this.astronaut = astronaut;
  }

  addAsteroid() {
    let asteroid = new Asteroid(
      (Math.floor(Math.random() * (Game.DIM_X - 80) + 40)),
      this.row
    );

    this.stage.addChild(asteroid);
    this.asteroids.push(asteroid);

    this.row = asteroid.y - Math.floor(80 + 10 * this.deviation());
  }

  deviation() {
    let pseudoRandom = Math.random();
    if (pseudoRandom > 0.5) {
      pseudoRandom -= 0.5;
    }
    return pseudoRandom;
  }

  removeAsteroid(asteroid) {
    this.stage.removeChild(asteroid);
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  render() {
    this.asteroids.forEach((asteroid) => {
      this.stage.addChild(asteroid);
      this.stage.update();
    });
  }

  checkCollisions() {
    const allAsteroids = this.asteroids;

    for (let i = 0; i < allAsteroids.length; i++) {
      const asteroid = allAsteroids[i];

      if (Util.isCollidedWith(this.astronaut,asteroid)) {
        this.removeAsteroid(asteroid);
        for (let i = 0; i < 3; i++) {
          this.addAsteroid();
        }

        this.inMotion = true;

        this.jump();
      }
    }
  }

  initJump() {
    const oldY = this.astronaut.y;
    const acc = 0.15;
    let vel = -8;
    const intervalMove = setInterval(move.bind(this), 10);
    const intervalDec = setInterval(decellerate.bind(this), 10);

    function move() {
      this.astronaut.y += vel;

      if (this.astronaut.y >= oldY) {
        clearInterval(intervalMove);
        clearInterval(intervalDec);
        this.astronaut.y = oldY;
      }
    }

    function decellerate() {
      vel += acc;
    }
  }

  jump() {
    const oldY = this.astronaut.y;
    const acc = 0.15;
    let vel = -8;
    const intervalMove = setInterval(move.bind(this), 10);
    const intervalDec = setInterval(decellerate.bind(this), 10);

    function move() {
      this.astronaut.y += vel;

      if (this.astronaut.y >= oldY) {
        clearInterval(intervalMove);
        clearInterval(intervalDec);
        this.astronaut.y = oldY;
      }
    }

    function decellerate() {
      vel += acc;
    }
  }

  shift() {
    if (this.inMotion === true) {
      this.inMotion = false;
      this.row += (213 + 1/3);

      this.asteroids.forEach((asteroid) => {
        const acc = -0.15;
        let vel = 8;
        const intervalMove = setInterval(move.bind(this), 10);
        const intervalDec = setInterval(decellerate.bind(this), 10);

        function move() {
          asteroid.y += vel;

          if (vel <= 0) {
            clearInterval(intervalMove);
            clearInterval(intervalDec);
          }
        }

        function decellerate() {
          vel += acc;
        }
      });
    }
  }

}

Game.BG_COLOR = "#111";
Game.DIM_X = 800;
Game.DIM_Y = 550;
Game.FPS = 60;

module.exports = Game;
