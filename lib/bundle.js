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
	// import Util from './util';
	
	var Game = function () {
	  function Game(stage, canvasEl) {
	    _classCallCheck(this, Game);
	
	    this.astronaut = this.addAstronaut(stage, canvasEl);
	    this.asteroids = [];
	    this.score = 0;
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
	
	  _createClass(Game, [{
	    key: "run",
	    value: function run(stage) {
	      var _this = this;
	
	      createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	      createjs.Ticker.on("tick", function (event) {
	        return stage.update();
	      });
	      // Astronaut follows mouse
	      createjs.Ticker.addEventListener("tick", function (event) {
	        var difX = stage.mouseX - _this.astronaut.x;
	        _this.astronaut.x += difX / 8;
	      });
	    }
	  }, {
	    key: "addAstronaut",
	    value: function addAstronaut(stage, canvasEl) {
	      var astronaut = new Astronaut(); // Create astronaut
	      stage.addChild(astronaut);
	
	      canvasEl.addEventListener("click", click); // add click event listener
	      function click(event) {
	        astronaut.y = 380;
	        canvasEl.removeEventListener("click", click);
	      }
	
	      return astronaut;
	    }
	  }, {
	    key: "addAsteroid",
	    value: function addAsteroid() {
	      this.asteroids.push(new Asteroid(Math.floor(Math.random() * (Game.DIM_X - 40) + 20), Math.floor(Math.random() * Game.DIM_Y)));
	    }
	  }, {
	    key: "removeAsteroid",
	    value: function removeAsteroid(object) {
	      if (object instanceof Asteroid) {
	        this.asteroids.splice(this.asteroids.indexOf(object), 1);
	      } else {
	        throw "wtf?";
	      }
	    }
	
	    // allAsteroids() {
	    //   return [].concat(this.astronaut, this.platforms);
	    // }
	
	  }, {
	    key: "render",
	    value: function render(stage) {
	      this.asteroids.forEach(function (asteroid) {
	        stage.addChild(asteroid);
	        stage.update();
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.BG_COLOR = "#111";
	Game.DIM_X = 1000;
	Game.DIM_Y = 700;
	Game.FPS = 60;
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import * as Box2D from "./box2d";
	// import Reality from "./reality";
	// import Stage from "./stage";
	// import getRelativeCoordinates from "./mouse_coords.js";
	// import SpriteSheet from "./spritesheet";
	
	var Astronaut = function Astronaut() {
	  _classCallCheck(this, Astronaut);
	
	  var guy = new createjs.Bitmap("./docs/astronaut.png");
	  guy.y = 620;
	  return guy;
	};
	
	module.exports = Astronaut;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Asteroid = function () {
	  function Asteroid(centerX, centerY) {
	    _classCallCheck(this, Asteroid);
	
	    this.color = this.randomColor();
	
	    var circle = new createjs.Shape();
	    // let circle = new createjs.Graphics();g.setStrokeStyle(1);g.beginStroke("#000000");g.drawCircle(100,100,30);
	    circle.graphics.beginFill(this.randomColor()).drawCircle(centerX, centerY, 10);
	    return circle;
	  }
	
	  _createClass(Asteroid, [{
	    key: "randomColor",
	    value: function randomColor() {
	      var COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
	      return COLORS[Math.floor(Math.random() * 5)];
	    }
	  }]);
	
	  return Asteroid;
	}();
	
	module.exports = Asteroid;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map