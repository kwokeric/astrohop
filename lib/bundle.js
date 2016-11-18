/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(1);
	var Astronaut = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("canvas");
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	  var stage = new createjs.Stage(canvasEl);
	
	  var game = new Game(stage, canvasEl);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Astronaut = __webpack_require__(2);
	var Asteroid = __webpack_require__(4);
	var Util = __webpack_require__(3);
	
	var Game = function () {
	  function Game(stage, canvasEl) {
	    _classCallCheck(this, Game);
	
	    this.stage = stage;
	    this.canvasEl = canvasEl;
	
	    this.difficulty = 8;
	    this.asteroids = [];
	    this.asteroidScore = 10;
	    this.score = 0;
	    this.highScore = 0;
	    this.row = 550;
	    this.jump = 1;
	
	    this.setup();
	    this.run();
	    this.renderAsteroids();
	  }
	
	  _createClass(Game, [{
	    key: "setup",
	    value: function setup() {
	      this.setupModal();
	      this.updateScore();
	      this.addAstronaut();
	      for (var i = 0; i < 6; i++) {
	        this.addAsteroid();
	      }
	      this.setDifficulty();
	    }
	  }, {
	    key: "setDifficulty",
	    value: function setDifficulty() {
	      var _this = this;
	
	      var easyMode = $(".easy-mode")[0];
	
	      easyMode.onclick = function () {
	        if (easyMode.checked) {
	          _this.difficulty = 1;
	        } else {
	          _this.difficulty = 8;
	        }
	      };
	    }
	  }, {
	    key: "setupModal",
	    value: function setupModal() {
	      var _this2 = this;
	
	      this.modalStart = document.getElementById("modal-start");
	      this.buttonStart = document.getElementById("btn-start");
	      this.buttonStart.onclick = function () {
	        _this2.modalStart.style.display = "none";
	      };
	      // $(".btn-start").onclick = () => {
	      //   $(".modal-start").style.display = "none";
	      // };
	
	      this.modalOver = document.getElementById("modal-over");
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      var _this3 = this;
	
	      createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	      createjs.Ticker.on("tick", function (event) {
	        return _this3.stage.update();
	      });
	
	      createjs.Ticker.addEventListener("tick", function (event) {
	        var difX = _this3.stage.mouseX - _this3.astronaut.x - 24; // Astronaut follows mouse
	        _this3.astronaut.x += difX / _this3.difficulty;
	
	        _this3.checkCollisions();
	        _this3.fillAsteroids();
	        _this3.cleanUpAsteroids();
	        _this3.isGameOver();
	      });
	    }
	  }, {
	    key: "isGameOver",
	    value: function isGameOver() {
	      var _this4 = this;
	
	      if (this.astronaut.y >= 550) {
	        clearInterval(this.intervalMoveOne);
	        clearInterval(this.intervalDecOne);
	        clearInterval(this.intervalMoveTwo);
	        clearInterval(this.intervalDecTwo);
	
	        this.highScore = Math.max(this.score, this.highScore);
	
	        $("#high-score").html(this.highScore);
	        $("#score").html(this.score);
	
	        this.modalOver.style.display = "block";
	        this.buttonAgain = document.getElementById("btn-again");
	        this.buttonAgain.onclick = function () {
	          _this4.modalOver.style.display = "none";
	          _this4.restart();
	        };
	      }
	    }
	  }, {
	    key: "restart",
	    value: function restart() {
	      window.location.reload();
	      this.modalStart.style.display = "none";
	    }
	  }, {
	    key: "updateScore",
	    value: function updateScore() {
	      this.stage.removeChild(this.displayScore);
	      this.displayScore = new createjs.Text("Score: " + this.score, "16px Audiowide", Util.randomColor());
	      this.displayScore.x = 20;
	      this.displayScore.y = 15;
	      this.stage.addChild(this.displayScore);
	    }
	  }, {
	    key: "addAstronaut",
	    value: function addAstronaut() {
	      var astronaut = new Astronaut(); // Create astronaut
	      this.stage.addChild(astronaut);
	
	      this.canvasEl.addEventListener("click", click.bind(this)); // add click event listener
	      function click(event) {
	        this.jumpOne();
	        this.canvasEl.removeEventListener("click", click);
	      }
	
	      this.astronaut = astronaut;
	    }
	  }, {
	    key: "addAsteroid",
	    value: function addAsteroid() {
	      this.row -= Math.floor(80 + 10 * this.deviation());
	      var asteroid = new Asteroid(Math.floor(Math.random() * (Game.DIM_X - 80) + 40), this.row);
	
	      this.stage.addChild(asteroid);
	      this.asteroids.push(asteroid);
	    }
	  }, {
	    key: "deviation",
	    value: function deviation() {
	      var pseudoRandom = Math.random();
	      if (pseudoRandom > 0.5) {
	        pseudoRandom -= 0.5;
	      }
	      return pseudoRandom;
	    }
	  }, {
	    key: "removeAsteroid",
	    value: function removeAsteroid(asteroid) {
	      this.stage.removeChild(asteroid);
	      this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
	    }
	  }, {
	    key: "renderAsteroids",
	    value: function renderAsteroids() {
	      var _this5 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        _this5.stage.addChild(asteroid);
	        _this5.stage.update();
	      });
	    }
	  }, {
	    key: "checkCollisions",
	    value: function checkCollisions() {
	      var allAsteroids = this.asteroids;
	
	      for (var i = 0; i < allAsteroids.length; i++) {
	        var asteroid = allAsteroids[i];
	
	        if (Util.isCollidedWith(this.astronaut, asteroid)) {
	          this.handleCollision(asteroid);
	        }
	      }
	    }
	  }, {
	    key: "handleCollision",
	    value: function handleCollision(asteroid) {
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
	  }, {
	    key: "jumpOne",
	    value: function jumpOne() {
	      clearInterval(this.intervalMoveTwo);
	      clearInterval(this.intervalDecTwo);
	
	      var oldYOne = this.astronaut.y;
	      var acc = 0.15;
	      var vel = -4;
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
	  }, {
	    key: "jumpTwo",
	    value: function jumpTwo() {
	      clearInterval(this.intervalMoveOne);
	      clearInterval(this.intervalDecOne);
	
	      var oldYTwo = this.astronaut.y;
	      var acc = 0.15;
	      var vel = -4;
	
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
	  }, {
	    key: "shiftAsteroids",
	    value: function shiftAsteroids() {
	      var _this6 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        var acc = -0.15;
	        var vel = 6;
	        var intervalMove = setInterval(move.bind(_this6), 10);
	        var intervalDec = setInterval(decellerate.bind(_this6), 10);
	
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
	  }, {
	    key: "fillAsteroids",
	    value: function fillAsteroids() {
	      if (this.asteroids.length < 12) {
	        this.addAsteroid();
	      }
	    }
	  }, {
	    key: "cleanUpAsteroids",
	    value: function cleanUpAsteroids() {
	      var _this7 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        if (asteroid.y >= 600) {
	          _this7.removeAsteroid(asteroid);
	          _this7.addAsteroid();
	        }
	      });
	    }
	
	    // stars() {
	    //   var MAX_PARTICLES = 500,
	    //   MIN_ALPHA = 0.01,
	    //   FPS = 30,
	    //
	    //   canvas, context, stageWidth, stageHeight,
	    //
	    //   mouseX = 0,
	    //   mouseY = 0,
	    //   lastX = 0,
	    //   lastY = 0,
	    //   active = false,
	    //   particles = [];
	    //
	    //   $(document).ready(init);
	    //   init();
	    //
	    //   function init() {
	    //     canvas = document.getElementById('canvas'),
	    //     context = canvas.getContext('2d'),
	    //     resize();
	    //
	    //     mouseX = stageWidth * 0.5;
	    //     mouseY = stageHeight * 0.5;
	    //     idleBurst();
	    //
	    //     $(window).resize(resize);
	    //     $(window).mousemove(function(event) {
	    //       if(!active) {
	    //         $('.start').fadeOut(600);
	    //       }
	    //       active = true;
	    //       lastX = mouseX;
	    //       lastY = mouseY;
	    //   		mouseX = event.pageX;
	    //   		mouseY = event.pageY;
	    //   		if(particles.length < MAX_PARTICLES) createParticle();
	    //   	});
	    //   	$(window).mousedown(function(event) {
	    //   		createBurst();
	    //   	});
	    //
	    //   	setInterval(onEnterFrame, 1000 / FPS);
	    //   }
	    //
	    //   function idleBurst() {
	    //   	if(!active) {
	    //   		createBurst();
	    //   		setTimeout(idleBurst, 1200);
	    //   	}
	    //   }
	    //
	    //   function resize() {
	    //   	stageWidth = $(window).width();
	    //   	stageHeight = $(window).height();
	    //   	canvas.width = stageWidth;
	    //   	canvas.height = stageHeight;
	    //   }
	    //
	    //   function createParticle(burst) {
	    //   	var particle = {
	    //   		size: 3 + (Math.random() * 8),
	    //   		bounce: Math.random(),
	    //   		color: "#"+((1<<24)*Math.random()|0).toString(16),
	    //   		alpha: 1,
	    //   		fade: 0.93 + (Math.random() * 0.05),
	    //   		x: 0,
	    //   		y: 0,
	    //   		vx: 0,
	    //   		vy: 0,
	    //   		rotate: Math.random() * 360,
	    //   		rotateDir: (Math.random > 0.5) ? 7 : -7
	    //   	};
	    //   	particle.x = mouseX;
	    //   	particle.y = mouseY;
	    //   	particle.vx = (burst) ? (0.5 - Math.random()) * 20 : lastX - mouseX;
	    //   	particle.vy = (burst) ? (0.5 - Math.random()) * 20 : lastY - mouseY;
	    //   	particles.push(particle);
	    //   }
	    //
	    //   function createBurst() {
	    //   	var i = 40;
	    //   	while(--i > -1 && particles.length < MAX_PARTICLES) {
	    //   		createParticle(true);
	    //   	}
	    //   }
	    //
	    //   function onEnterFrame() {
	    //   	context.clearRect(0, 0, stageWidth, stageHeight);
	    //   	/*context.fillStyle = '#000000';
	    //   	context.globalAlpha = 0.1;
	    //   	context.fillRect(0, 0, stageWidth, stageHeight);*/
	    //
	    //   	var points = 5;
	    //   	var step, halfStep, start, n, dx, dy, outerRadius, innerRadius, angle;
	    //   	var particle;
	    //   	var i = particles.length;
	    //   	while(--i > -1) {
	    //   		particle = particles[i];
	    //   		particle.x += particle.vx;
	    //   		particle.y += particle.vy;
	    //
	    //   		if(particle.x - particle.size < 0) {
	    //   			particle.x = particle.size;
	    //   			particle.vx = -particle.vx * particle.bounce;
	    //   		}
	    //   		else if(particle.x + particle.size > stageWidth) {
	    //   			particle.x = stageWidth - particle.size;
	    //   			particle.vx = -particle.vx * particle.bounce;
	    //   		}
	    //
	    //   		if(particle.y - particle.size < 0) {
	    //   			particle.y = particle.size;
	    //   			particle.vy = -particle.vy * particle.bounce;
	    //   		}
	    //   		else if(particle.y + particle.size > stageHeight) {
	    //   			particle.y = stageHeight - particle.size;
	    //   			particle.vy = -particle.vy * particle.bounce;
	    //   		}
	    //
	    //   		context.fillStyle = particle.color;
	    //   		context.globalAlpha = particle.alpha;
	    //   		context.beginPath();
	    //
	    //   		outerRadius = particle.size;
	    //   		innerRadius = particle.size * 0.3;
	    //   		step = (Math.PI * 2) / points;
	    //   		halfStep = step / 2;
	    //   		start = (particle.rotate / 180) * Math.PI;
	    //   		context.moveTo( particle.x + (Math.cos( start ) * outerRadius),
	    //   						particle.y - (Math.sin( start ) * outerRadius) );
	    //
	    //   		for(n = 1; n <= points; ++n) {
	    //   			dx = particle.x + Math.cos(start + (step * n) - halfStep) * innerRadius;
	    //   			dy = particle.y - Math.sin(start + (step * n) - halfStep) * innerRadius;
	    //   			context.lineTo( dx, dy );
	    //   			dx = particle.x + Math.cos(start + (step * n)) * outerRadius;
	    //   			dy = particle.y - Math.sin(start + (step * n)) * outerRadius;
	    //   			context.lineTo(dx, dy);
	    //   		}
	    //   		context.closePath();
	    //   		context.fill();
	    //
	    //   		particle.alpha *= particle.fade;
	    //   		particle.rotate += particle.rotateDir;
	    //
	    //   		if(particle.alpha <= MIN_ALPHA) {
	    //   			particles = particles.slice(0,i).concat(particles.slice(i+1));
	    //   		}
	    //   	}
	    //   }
	    // }
	
	  }]);
	
	  return Game;
	}();
	
	Game.BG_COLOR = "#111";
	Game.DIM_X = 800;
	Game.DIM_Y = 550;
	Game.FPS = 60;
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(3);
	
	var Astronaut = function Astronaut(points) {
	  _classCallCheck(this, Astronaut);
	
	  var guy = new createjs.Bitmap("./docs/astronaut.png");
	  guy.y = 480;
	  guy.points = points;
	  return guy;
	};
	
	module.exports = Astronaut;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var Util = {
	  // Find distance between two points.
	  dist: function dist(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  },
	
	  // Initial velocity
	  initVel: function initVel() {
	    return 6;
	  },
	
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir: function dir(vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	
	  // Find the length of the vector.
	  norm: function norm(vec) {
	    return Util.dist([0, 0], vec);
	  },
	
	  // Scale the length of a vector by the given amount.
	  scale: function scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  isCollidedWith: function isCollidedWith(astronaut, asteroid) {
	    var astronautPercievedX = astronaut.x + 23;
	    var astronautPercievedY = astronaut.y + 30;
	    var centerDist = this.dist([astronautPercievedX, astronautPercievedY], [asteroid.x, asteroid.y]);
	    return centerDist < 30;
	  },
	  randomColor: function randomColor() {
	    var COLORS = ["#B4FFC2", "#93E0E8", "#8AB1CC", "#9AB4FF", "#B2AEFF", "#DEB3FF", "#D8A6FF", "#A6E7FF", "#FF9786", "#FFB886", "#FFDC86", "#DEFF86"];
	    return COLORS[Math.floor(Math.random() * 12)];
	  }
	};
	
	module.exports = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Astronaut = __webpack_require__(2);
	var Util = __webpack_require__(3);
	
	var Asteroid = function Asteroid(centerX, centerY) {
	  _classCallCheck(this, Asteroid);
	
	  this.color = Util.randomColor();
	
	  var circle = new createjs.Shape();
	  circle.graphics.setStrokeStyle(1.5).beginStroke(this.color).drawCircle(0, 0, 10);
	  circle.x = centerX;
	  circle.y = centerY;
	  return circle;
	};
	
	module.exports = Asteroid;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map