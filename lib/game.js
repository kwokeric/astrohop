const Astronaut = require("./astronaut");
const Asteroid = require("./asteroid");
const Util = require("./util");

class Game {
  constructor(stage, canvasEl) {
    this.stage = stage;
    this.canvasEl = canvasEl;

    this.difficulty = 8;
    this.asteroids = [];
    this.asteroidScore = 10;
    this.score = 0;
    // this.highScore= 0;
    this.row = 550;
    this.jump = 1;

    this.setup();
    this.run();
    this.renderAsteroids();
  }

  setup() {
    this.setupModal();
    this.updateScore();
    this.addAstronaut();
    for (let i = 0; i < 6; i++) {
      this.addAsteroid();
    }
    this.setDifficulty();
  }

  setDifficulty() {
    const easyMode = $(".easy-mode")[0];

    easyMode.onclick = () => {
      if (easyMode.checked) {
        this.difficulty = 1;
      } else {
        this.difficulty = 8;
      }
    };
  }

  setupModal() {
    $("#btn-start").click(() => {
      $(".modal-start").css("display","none");
    });
  }

  run() {
    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
    createjs.Ticker.on("tick", event => ( this.stage.update()));

    createjs.Ticker.addEventListener("tick", event => {
      let difX = this.stage.mouseX - this.astronaut.x - 24; // Astronaut follows mouse
      this.astronaut.x += difX/this.difficulty;

      this.checkCollisions();
      this.fillAsteroids();
      this.cleanUpAsteroids();
      this.isGameOver();
    });
  }

  isGameOver() {
    if (this.astronaut.y >= 550) {
      clearInterval(this.intervalMoveOne);
      clearInterval(this.intervalDecOne);
      clearInterval(this.intervalMoveTwo);
      clearInterval(this.intervalDecTwo);

      let highScore = 0;

      if (document.cookie === "") {
        highScore = this.score;
      } else {
        const prevHighScore = parseInt(document.cookie);
        highScore = Math.max(prevHighScore, this.score);
      }
      document.cookie = `${highScore}`;

      $("#high-score").html(highScore);
      $("#score").html(this.score);

      $(".modal-over").css("display", "block");
      $("#btn-again").click(() => {
        $(".modal-over").css("display","none");
        this.restart();
      });
    }
  }

  restart() {
    window.location.reload();
    this.modalStart.style.display = "none";
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
      this.canvasEl.removeEventListener("click", click);
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

  stars() {
    var MAX_PARTICLES = 500,
    MIN_ALPHA = 0.01,
    FPS = 30,

    canvas, context, stageWidth, stageHeight,

    mouseX = 0,
    mouseY = 0,
    lastX = 0,
    lastY = 0,
    active = false,
    particles = [];

    $(document).ready(init);
    init();

    function init() {
      canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      resize();

      mouseX = stageWidth * 0.5;
      mouseY = stageHeight * 0.5;
      idleBurst();

      $(window).resize(resize);
      $(window).mousemove(function(event) {
        if(!active) {
          $('.start').fadeOut(600);
        }
        active = true;
        lastX = mouseX;
        lastY = mouseY;
    		mouseX = event.pageX;
    		mouseY = event.pageY;
    		if(particles.length < MAX_PARTICLES) createParticle();
    	});
    	$(window).mousedown(function(event) {
    		createBurst();
    	});

    	setInterval(onEnterFrame, 1000 / FPS);
    }

    function idleBurst() {
    	if(!active) {
    		createBurst();
    		setTimeout(idleBurst, 1200);
    	}
    }

    function resize() {
    	stageWidth = $(window).width();
    	stageHeight = $(window).height();
    	canvas.width = stageWidth;
    	canvas.height = stageHeight;
    }

    function createParticle(burst) {
    	var particle = {
    		size: 3 + (Math.random() * 8),
    		bounce: Math.random(),
    		color: "#"+((1<<24)*Math.random()|0).toString(16),
    		alpha: 1,
    		fade: 0.93 + (Math.random() * 0.05),
    		x: 0,
    		y: 0,
    		vx: 0,
    		vy: 0,
    		rotate: Math.random() * 360,
    		rotateDir: (Math.random > 0.5) ? 7 : -7
    	};
    	particle.x = mouseX;
    	particle.y = mouseY;
    	particle.vx = (burst) ? (0.5 - Math.random()) * 20 : lastX - mouseX;
    	particle.vy = (burst) ? (0.5 - Math.random()) * 20 : lastY - mouseY;
    	particles.push(particle);
    }

    function createBurst() {
    	var i = 40;
    	while(--i > -1 && particles.length < MAX_PARTICLES) {
    		createParticle(true);
    	}
    }

    function onEnterFrame() {
    	context.clearRect(0, 0, stageWidth, stageHeight);
    	/*context.fillStyle = '#000000';
    	context.globalAlpha = 0.1;
    	context.fillRect(0, 0, stageWidth, stageHeight);*/

    	var points = 5;
    	var step, halfStep, start, n, dx, dy, outerRadius, innerRadius, angle;
    	var particle;
    	var i = particles.length;
    	while(--i > -1) {
    		particle = particles[i];
    		particle.x += particle.vx;
    		particle.y += particle.vy;

    		if(particle.x - particle.size < 0) {
    			particle.x = particle.size;
    			particle.vx = -particle.vx * particle.bounce;
    		}
    		else if(particle.x + particle.size > stageWidth) {
    			particle.x = stageWidth - particle.size;
    			particle.vx = -particle.vx * particle.bounce;
    		}

    		if(particle.y - particle.size < 0) {
    			particle.y = particle.size;
    			particle.vy = -particle.vy * particle.bounce;
    		}
    		else if(particle.y + particle.size > stageHeight) {
    			particle.y = stageHeight - particle.size;
    			particle.vy = -particle.vy * particle.bounce;
    		}

    		context.fillStyle = particle.color;
    		context.globalAlpha = particle.alpha;
    		context.beginPath();

    		outerRadius = particle.size;
    		innerRadius = particle.size * 0.3;
    		step = (Math.PI * 2) / points;
    		halfStep = step / 2;
    		start = (particle.rotate / 180) * Math.PI;
    		context.moveTo( particle.x + (Math.cos( start ) * outerRadius),
    						particle.y - (Math.sin( start ) * outerRadius) );

    		for(n = 1; n <= points; ++n) {
    			dx = particle.x + Math.cos(start + (step * n) - halfStep) * innerRadius;
    			dy = particle.y - Math.sin(start + (step * n) - halfStep) * innerRadius;
    			context.lineTo( dx, dy );
    			dx = particle.x + Math.cos(start + (step * n)) * outerRadius;
    			dy = particle.y - Math.sin(start + (step * n)) * outerRadius;
    			context.lineTo(dx, dy);
    		}
    		context.closePath();
    		context.fill();

    		particle.alpha *= particle.fade;
    		particle.rotate += particle.rotateDir;

    		if(particle.alpha <= MIN_ALPHA) {
    			particles = particles.slice(0,i).concat(particles.slice(i+1));
    		}
    	}
    }
  }
}

Game.BG_COLOR = "#111";
Game.DIM_X = 800;
Game.DIM_Y = 550;
Game.FPS = 60;

module.exports = Game;
