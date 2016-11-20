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
	    this.highScore = 0;
	
	    // this.startStars();
	    this.setup();
	    this.run();
	    this.renderAsteroids();
	  }
	
	  _createClass(Game, [{
	    key: "setup",
	    value: function setup() {
	      this.gameOver = false;
	      this.difficulty = 8;
	      this.asteroids = [];
	      this.asteroidScore = 10;
	      this.score = 0;
	      this.row = 550;
	      this.jump = 1;
	
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
	      $("#btn-start").click(function () {
	        $(".modal-start").css("display", "none");
	      });
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      var _this2 = this;
	
	      createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	      createjs.Ticker.on("tick", function (event) {
	        return _this2.stage.update();
	      });
	
	      createjs.Ticker.addEventListener("tick", function (event) {
	        var difX = _this2.stage.mouseX - _this2.astronaut.x - 24; // Astronaut follows mouse
	        _this2.astronaut.x += difX / _this2.difficulty;
	
	        _this2.checkCollisions();
	        _this2.fillAsteroids();
	        _this2.cleanUpAsteroids();
	        _this2.isGameOver();
	      });
	    }
	  }, {
	    key: "isGameOver",
	    value: function isGameOver() {
	      var _this3 = this;
	
	      if (this.astronaut.y > 550) {
	        createjs.Ticker.removeAllEventListeners();
	
	        this.astronaut.y = 550;
	        clearInterval(this.intervalMoveOne);
	        clearInterval(this.intervalDecOne);
	        clearInterval(this.intervalMoveTwo);
	        clearInterval(this.intervalDecTwo);
	
	        // function getCookie(cname) {
	        //     var name = cname + "=";
	        //     var ca = document.cookie.split(';');
	        //     for(var i = 0; i < ca.length; i++) {
	        //         var c = ca[i];
	        //         while (c.charAt(0) == ' ') {
	        //             c = c.substring(1);
	        //         }
	        //         if (c.indexOf(name) == 0) {
	        //             return c.substring(name.length, c.length);
	        //         }
	        //     }
	        //     return "";
	        // }
	        //
	        // if (document.cookie === "") {
	        //   highScore = this.score;
	        // } else {
	        //   const prevHighScore = parseInt(getCookie("highScore"));
	        //   highScore = Math.max(prevHighScore, this.score);
	        // }
	        // document.cookie = `highScore=${highScore};`;
	
	        this.highScore = Math.max(this.highScore, this.score);
	
	        $("#high-score").html(this.highScore);
	        $("#score").html(this.score);
	
	        $(".modal-over").css("display", "block");
	        $("#btn-again").click(function () {
	          _this3.restart();
	          $(".modal-over").css("display", "none");
	        });
	      }
	    }
	  }, {
	    key: "restart",
	    value: function restart() {
	      $("#canvas").off("click");
	      this.stage.removeAllChildren();
	
	      this.setup();
	      this.run();
	      this.renderAsteroids();
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
	      var _this4 = this;
	
	      var astronaut = new Astronaut(); // Create astronaut
	      this.stage.addChild(astronaut);
	
	      $("#canvas").click(function () {
	        _this4.jumpOne();
	        $("#canvas").off("click");
	      });
	
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
	      this.explode(this.astronaut.x, this.astronaut.y);
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
	  }, {
	    key: "explode",
	    value: function explode(x, y) {
	      var particles = 20,
	
	      // place explosion container on body
	      explosion = $('<div class="explosion"></div>');
	      $('body').append(explosion);
	
	      var stageX = ($(document).width() - 800) / 2;
	      var stageY = ($(document).height() - 550) / 2;
	
	      // position the container to be centered on click
	      explosion.css('left', stageX + x - explosion.width() / 2);
	      explosion.css('top', stageY + y - explosion.height() / 2);
	
	      for (var i = 0; i < particles; i++) {
	        var x = explosion.width() / 2 + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
	            y = explosion.height() / 2 + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
	            color = Util.randomExplosionColor(),
	            elm = $('<div class="particle" style="' + 'background-color: ' + color + ' ;' + 'top: ' + y + 'px; ' + 'left: ' + x + 'px"></div>');
	
	        if (i == 0) {
	          elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
	            explosion.remove(); // remove this explosion container when animation ends
	          });
	        }
	        explosion.append(elm);
	      }
	      // get random number between min and max value
	      function rand(min, max) {
	        return Math.floor(Math.random() * (max + 1)) + min;
	      }
	    }
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
	  },
	  randomExplosionColor: function randomExplosionColor() {
	    var COLORS = ["#00CEED", "#FFFFFF", "#FF4700", "#FFFFFF"];
	    return COLORS[Math.floor(Math.random() * 4)];
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