const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
const Util = require("./util");

class Game {
  constructor(stage, canvasEl) {
    this.modal = document.getElementById('start-modal');
    this.start = document.getElementById("start");
    this.start.onclick = () => {
      this.modal.style.display = "none";
    };

    this.stage = stage;
    this.canvasEl = canvasEl;

    this.asteroids = [];
    this.asteroidScore = 10;
    this.score = 0;
    this.row = 550;
    this.jump = 1;

    this.setup();
    this.run();
    this.renderAsteroids();

    // this.run = this.run.bind(this);
  }

  setup() {
    this.updateScore();
    this.addAstronaut();
    for (let i = 0; i < 6; i++) {
      this.addAsteroid();
    }
  }

  run() {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( this.stage.update()));

    createjs.Ticker.addEventListener("tick", event => {
      let difX = this.stage.mouseX - this.astronaut.x - 24; // Astronaut follows mouse
      this.astronaut.x += difX/8;

      this.checkCollisions();
      this.fillAsteroids();
      this.cleanUpAsteroids();
      this.isGameOver();
    });
  }

  isGameOver() {
    if (this.astronaut.y >= 520) {
      clearInterval(this.intervalMoveOne);
      clearInterval(this.intervalDecOne);
      clearInterval(this.intervalMoveTwo);
      clearInterval(this.intervalDecTwo);

      debugger
    }
  }

  restart() {
    window.location.reload();
  }

  updateScore() {
    this.stage.removeChild(this.displayScore);
    this.displayScore = new createjs.Text(`Score: ${this.score}`, "16px Audiowide", Util.randomColor());
    this.displayScore.x = 20;
    this.displayScore.y = 15;
    this.stage.addChild(this.displayScore);
  }

  addAstronaut() {
    let astronaut = new Astronaut();  // Create astronaut
    this.stage.addChild(astronaut);

    this.canvasEl.addEventListener("click", click.bind(this));  // add click event listener
    function click(event){
      this.jumpOne();
      // this.canvasEl.removeEventListener("click", click);
    }

    this.astronaut = astronaut;
  }

  addAsteroid() {
    this.row -= Math.floor(80 + 10 * this.deviation());
    let asteroid = new Asteroid(
      (Math.floor(Math.random() * (Game.DIM_X - 80) + 40)),
      this.row
    );

    this.stage.addChild(asteroid);
    this.asteroids.push(asteroid);
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

  renderAsteroids() {
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
        this.handleCollision(asteroid);
      }
    }
  }

  handleCollision(asteroid) {
    this.newCollision = true;
    this.score += this.asteroidScore;
    this.asteroidScore += 10;

    this.updateScore(Util.randomColor());
    this.removeAsteroid(asteroid);
    this.shiftAsteroids();

    if (this.jump === 1) {
      this.jump = 2;
      this.jumpTwo();
    } else {
      this.jump = 1;
      this.jumpOne();
    }
  }

  jumpOne() {
    clearInterval(this.intervalMoveTwo);
    clearInterval(this.intervalDecTwo);

    const oldYOne = this.astronaut.y;
    const acc = 0.15;
    let vel = -4;
    // let vel = 2*(100-oldYOne)/(16/0.15); // From: s = (1/2)(v+u)t AND v = u + at

    this.intervalMoveOne = setInterval(moveOne.bind(this), 10);
    this.intervalDecOne = setInterval(decellerateOne.bind(this), 10);

    function moveOne() {
      this.astronaut.y += vel;
    }

    function decellerateOne() {
      if (this.astronaut.y < 350) {
        vel += acc;
      }
    }
  }

  jumpTwo() {
    clearInterval(this.intervalMoveOne);
    clearInterval(this.intervalDecOne);

    const oldYTwo = this.astronaut.y;
    const acc = 0.15;
    let vel = -4;

    this.intervalMoveTwo = setInterval(moveTwo.bind(this), 10);
    this.intervalDecTwo = setInterval(decellerateTwo.bind(this), 10);

    function moveTwo() {
      this.astronaut.y += vel;
    }

    function decellerateTwo() {
      if (this.astronaut.y < 350) {
        vel += acc;
      }
    }
  }

  shiftAsteroids() {
    this.asteroids.forEach(asteroid => {
      const acc = -0.15;
      let vel = 6;
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

    this.row += 120; // a = (u-v)/t AND s = (u)(t) + (1/2)(a)(t)^2
  }

  fillAsteroids() {
    if (this.asteroids.length < 12) {
      this.addAsteroid();
    }
  }

  cleanUpAsteroids() {
    this.asteroids.forEach(asteroid => {
      if (asteroid.y >= 600) {
        this.removeAsteroid(asteroid);
        this.addAsteroid();
      }
    });
  }

}

Game.BG_COLOR = "#111";
Game.DIM_X = 800;
Game.DIM_Y = 550;
Game.FPS = 60;

module.exports = Game;
