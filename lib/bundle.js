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
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var stage = new createjs.Stage(canvasEl);
	
	  createjs.Ticker.setFPS(Game.FPS); // Sets game fps
	
	  createjs.Ticker.addEventListener("tick", cursor); // Add cursor event listener
	  function cursor(event) {
	    var difX = stage.mouseX - astronaut.circle.x;
	
	    astronaut.circle.x += difX / 8;
	    stage.update();
	  }
	
	  var astronaut = new Astronaut(); // Create astronaut
	  stage.addChild(astronaut.circle);
	
	  canvasEl.addEventListener("click", click); // add click event listener
	  function click(event) {
	    astronaut.circle.y = 350;
	    stage.update();
	
	    canvasEl.removeEventListener("click", click);
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _astronaut = __webpack_require__(2);
	
	var _astronaut2 = _interopRequireDefault(_astronaut);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import Platform from './platform';
	// import Util from './util';
	
	var Game = function () {
	  function Game() {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.play = true;
	    this.fps = 60;
	    this.score = 0;
	
	    document.getElementById('canvas').onclick = function () {
	      _this.run();
	    };
	    // this.addPlatforms();
	  }
	
	  _createClass(Game, [{
	    key: 'run',
	    value: function run() {
	      createjs.Ticker.setFPS(this.fps);
	      createjs.Ticker.useRAF = true;
	      createjs.Ticker.on('tick', this.update.bind(this));
	    }
	  }, {
	    key: 'update',
	    value: function update(e) {}
	  }, {
	    key: 'add',
	    value: function add(object) {
	      if (object instanceof _astronaut2.default) {
	        this.asteroids.push(object);
	      } else {
	        throw "wtf?";
	      }
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat(this.astronaut, this.platforms);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      ctx.fillStyle = Game.BG_COLOR;
	      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	      this.allObjects().forEach(function (object) {
	        object.draw(ctx);
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.BG_COLOR = "#000000";
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
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
	
	    this.circle = this.createAstronaut();
	  }
	
	  _createClass(Astronaut, [{
	    key: "createAstronaut",
	    value: function createAstronaut() {
	      var circle = new createjs.Shape();
	      circle.graphics.beginFill("#70DBDB").drawCircle(0, 0, 15);
	      circle.y = 560;
	      return circle;
	    }
	  }]);
	
	  return Astronaut;
	}();
	
	module.exports = Astronaut;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map