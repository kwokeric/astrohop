const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
const Util = require("./util");

class Game {
  constructor(stage, canvasEl) {
    this.astronaut = this.addAstronaut(stage, canvasEl);
    this.asteroids = [];
    this.score = 0;
    this.row = 350;
    this.stage = stage;
    this.canvasEl = canvasEl;

    this.run = this.run.bind(this);
    this.addAsteroid = this.addAsteroid.bind(this);
    this.render = this.render.bind(this);

    this.run(stage);
    this.addAsteroid(stage);
    this.addAsteroid(stage);
    this.addAsteroid(stage);
    this.addAsteroid(stage);
    this.addAsteroid(stage);
    this.render();

    window.astronaut = this.astronaut;
    window.asteroids = this.asteroids;
  }

  run() {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( this.stage.update() ));
    // Astronaut follows mouse
    createjs.Ticker.addEventListener("tick", event => {
      let difX = this.stage.mouseX - this.astronaut.x - 24;
      this.astronaut.x += difX/8;

      this.checkCollisions();
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

  addAsteroid(stage) {
    let asteroid = new Asteroid(
      (Math.floor(Math.random() * (Game.DIM_X - 80) + 40)),
      this.row
    );

    this.asteroids.push(asteroid);

    this.row -= Math.floor(70 + 10 * this.deviation());
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
        debugger
      }
    }
  }

}

Game.BG_COLOR = "#111";
Game.DIM_X = 800;
Game.DIM_Y = 550;
Game.FPS = 60;

module.exports = Game;
