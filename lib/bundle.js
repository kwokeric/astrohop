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
	
	    this.astronaut;
	    this.asteroids = [];
	    this.score = 0;
	    this.row = 430;
	    this.stage = stage;
	    this.canvasEl = canvasEl;
	
	    this.run = this.run.bind(this);
	    this.addAsteroid = this.addAsteroid.bind(this);
	    this.renderAsteroids = this.renderAsteroids.bind(this);
	    this.shiftAsteroids = this.shiftAsteroids.bind(this);
	    this.cleanUpAsteroids = this.cleanUpAsteroids.bind(this);
	
	    this.setup();
	    this.run();
	    this.renderAsteroids();
	
	    window.asteroids = this.asteroids;
	  }
	
	  _createClass(Game, [{
	    key: "setup",
	    value: function setup() {
	      this.addAstronaut();
	      for (var i = 0; i < 6; i++) {
	        this.addAsteroid();
	      }
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      var _this = this;
	
	      createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	      createjs.Ticker.on("tick", function (event) {
	        return _this.stage.update();
	      });
	      // Astronaut follows mouse
	      createjs.Ticker.addEventListener("tick", function (event) {
	        var difX = _this.stage.mouseX - _this.astronaut.x - 24;
	        _this.astronaut.x += difX / 8;
	
	        _this.checkCollisions();
	        _this.fillAsteroids();
	        _this.cleanUpAsteroids();
	      });
	    }
	  }, {
	    key: "addAstronaut",
	    value: function addAstronaut() {
	      var astronaut = new Astronaut(); // Create astronaut
	      this.stage.addChild(astronaut);
	
	      this.canvasEl.addEventListener("click", click.bind(this)); // add click event listener
	      function click(event) {
	        this.initJump();
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
	      var _this2 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        _this2.stage.addChild(asteroid);
	        _this2.stage.update();
	      });
	    }
	  }, {
	    key: "checkCollisions",
	    value: function checkCollisions() {
	      var allAsteroids = this.asteroids;
	
	      for (var i = 0; i < allAsteroids.length; i++) {
	        var asteroid = allAsteroids[i];
	
	        if (Util.isCollidedWith(this.astronaut, asteroid)) {
	          this.removeAsteroid(asteroid);
	
	          this.shiftAsteroids();
	          this.jump();
	        }
	      }
	    }
	  }, {
	    key: "initJump",
	    value: function initJump() {
	      var oldY = this.astronaut.y;
	      var acc = 0.15;
	      var vel = -8;
	      var intervalMove = setInterval(move.bind(this), 10);
	      var intervalDec = setInterval(decellerate.bind(this), 10);
	
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
	  }, {
	    key: "jump",
	    value: function jump() {
	      var oldY = this.astronaut.y;
	      var acc = 0.15;
	      var vel = -4;
	      var intervalMove = setInterval(move.bind(this), 10);
	      var intervalDec = setInterval(decellerate.bind(this), 10);
	
	      function move() {
	        this.astronaut.y += vel;
	
	        if (this.astronaut.y >= oldY) {
	          clearInterval(intervalMove);
	          clearInterval(intervalDec);
	          this.astronaut.y = oldY;
	        }
	      }
	
	      function decellerate() {
	        if (this.astronaut.y < 350) {
	          vel += acc;
	        }
	      }
	    }
	  }, {
	    key: "shiftAsteroids",
	    value: function shiftAsteroids() {
	      var _this3 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        var acc = -0.15;
	        var vel = 8;
	        var intervalMove = setInterval(move.bind(_this3), 10);
	        var intervalDec = setInterval(decellerate.bind(_this3), 10);
	
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
	
	      this.row += 213 + 1 / 3;
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
	      var _this4 = this;
	
	      this.asteroids.forEach(function (asteroid) {
	        if (asteroid.y >= 600) {
	          _this4.removeAsteroid(asteroid);
	          _this4.addAsteroid();
	        }
	      });
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
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	    return centerDist < 25;
	  }
	};
	
	module.exports = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Astronaut = __webpack_require__(2);
	
	var Asteroid = function () {
	  function Asteroid(centerX, centerY) {
	    _classCallCheck(this, Asteroid);
	
	    this.color = this.randomColor();
	
	    var circle = new createjs.Shape();
	    circle.graphics.setStrokeStyle(1.5).beginStroke(this.color).drawCircle(0, 0, 8);
	    circle.x = centerX;
	    circle.y = centerY;
	    return circle;
	  }
	
	  _createClass(Asteroid, [{
	    key: "randomColor",
	    value: function randomColor() {
	      var COLORS = ["#B4FFC2", "#93E0E8", "#8AB1CC", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
	      return COLORS[Math.floor(Math.random() * 6)];
	    }
	  }]);
	
	  return Asteroid;
	}();
	
	module.exports = Asteroid;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map