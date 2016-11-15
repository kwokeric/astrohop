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
	// import Platform from './platform';
	// import Util from './util';
	
	var Game = function () {
	  function Game(stage, canvasEl) {
	    _classCallCheck(this, Game);
	
	    this.astronaut = [];
	    this.asteroids = [];
	    this.score = 0;
	    this.stage = stage;
	    this.canvasEl = canvasEl;
	
	    createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	    createjs.Ticker.on("tick", function (event) {
	      return stage.update();
	    });
	
	    createjs.Ticker.addEventListener("tick", cursor); // Add cursor event listener
	    function cursor(event) {
	      var difX = stage.mouseX - astronaut.avatar.x;
	
	      astronaut.avatar.x += difX / 8;
	    }
	
	    var astronaut = new Astronaut(); // Create astronaut
	    stage.addChild(astronaut.avatar);
	
	    canvasEl.addEventListener("click", click); // add click event listener
	    function click(event) {
	      astronaut.avatar.y = 380;
	
	      canvasEl.removeEventListener("click", click);
	    }
	  }
	
	  _createClass(Game, [{
	    key: "add",
	    value: function add(object) {
	      if (object instanceof Astronaut) {
	        this.astronaut.push(object);
	      } else if (object instanceof Asteroid) {
	        this.asteroids.push(object);
	      } else {
	        throw "wtf?";
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove(object) {
	      if (object instanceof Astronaut) {
	        this.astronaut.splice(this.astronaut.indexOf(object), 1);
	      } else if (object instanceof Asteroid) {
	        this.asteroids.splice(this.asteroids.indexOf(object), 1);
	      } else {
	        throw "wtf?";
	      }
	    }
	  }, {
	    key: "addAstronaut",
	    value: function addAstronaut() {
	      var astronaut = new Astronaut();
	
	      this.add(astronaut);
	
	      return astronaut;
	    }
	  }, {
	    key: "addAsteroid",
	    value: function addAsteroid() {
	      for (var i = 0; i < 4; i++) {
	        this.add(new Asteroid({
	          centerX: Math.random() * Game.DIM_X,
	          centerY: Math.random() * Game.DIM_Y
	        }));
	      }
	    }
	  }, {
	    key: "allObjects",
	    value: function allObjects() {
	      return [].concat(this.astronaut, this.platforms);
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      this.allObjects().forEach(function (object) {
	        object.draw(ctx);
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import * as Box2D from "./box2d";
	// import Reality from "./reality";
	// import Stage from "./stage";
	// import getRelativeCoordinates from "./mouse_coords.js";
	// import SpriteSheet from "./spritesheet";
	
	var Astronaut = function () {
	  function Astronaut() {
	    _classCallCheck(this, Astronaut);
	
	    this.avatar = this.createAstronaut();
	  }
	
	  _createClass(Astronaut, [{
	    key: "createAstronaut",
	    value: function createAstronaut() {
	      var guy = new createjs.Bitmap("./docs/astronaut.png");
	      guy.y = 620;
	      return guy;
	    }
	  }]);
	
	  return Astronaut;
	}();
	
	module.exports = Astronaut;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Circle = function () {
	  function Circle(centerX, centerY, color) {
	    _classCallCheck(this, Circle);
	
	    this.centerX = centerX;
	    this.centerY = centerY;
	    this.color = color || this.randomColor();
	    this.radius = 8;
	  }
	
	  _createClass(Circle, [{
	    key: "randomColor",
	    value: function randomColor() {
	      var COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
	      return COLORS[Math.floor(Math.random() * 5)];
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var circle = new createjs.Shape();
	      circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
	    }
	  }]);
	
	  return Circle;
	}();
	
	Circle.randomCircle = function (maxX, maxY, numCircles) {
	  return new Circle(maxX * Math.random(), maxY * Math.random(), Circle.radius(maxX, maxY, numCircles), Circle.randomColor());
	};
	
	Circle.randomColor = function () {
	  var COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
	  return COLORS[Math.floor(Math.random() * 5)];
	};
	
	module.exports = Circle;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map