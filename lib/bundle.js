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

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _astronaut = __webpack_require__(2);
	
	var _astronaut2 = _interopRequireDefault(_astronaut);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = _game2.default.DIM_X;
	  canvasEl.height = _game2.default.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _astronaut = __webpack_require__(2);
	
	var _astronaut2 = _interopRequireDefault(_astronaut);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import Platform from './platform';
	// import Util from './util';
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.astronaut = [];
	    this.platform = [];
	
	    // this.addPlatforms();
	  }
	
	  _createClass(Game, [{
	    key: "add",
	    value: function add(object) {
	      if (object instanceof _astronaut2.default) {
	        this.asteroids.push(object);
	      } else {
	        throw "wtf?";
	      }
	    }
	  }, {
	    key: "allObjects",
	    value: function allObjects() {
	      return [].concat(this.asteroids, this.platforms);
	    }
	  }, {
	    key: "draw",
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _box2d = __webpack_require__(3);
	
	var Box2D = _interopRequireWildcard(_box2d);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import Reality from "./reality";
	// import Stage from "./stage";
	// import getRelativeCoordinates from "./mouse_coords.js";
	// import SpriteSheet from "./spritesheet";
	
	var Astronaut = function () {
	  function Astronaut() {
	    _classCallCheck(this, Astronaut);
	  }
	
	  _createClass(Astronaut, [{
	    key: 'draw',
	    value: function draw() {
	      var canvas = document.getElementById('canvas');
	      if (canvas.getContext) {
	        var ctx = canvas.getContext('2d');
	
	        ctx.fillRect(25, 25, 100, 100);
	        ctx.clearRect(45, 45, 60, 60);
	        ctx.strokeRect(50, 50, 50, 50);
	      }
	    }
	  }]);
	
	  return Astronaut;
	}();
	
	exports.default = Astronaut;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.b2ContactListener = exports.b2DebugDraw = exports.b2CircleShape = exports.b2PolygonShape = exports.b2World = exports.b2Fixture = exports.b2FixtureDef = exports.b2Body = exports.b2BodyDef = exports.b2Vec2 = undefined;
	
	var _box2dweb = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"box2dweb\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _box2dweb2 = _interopRequireDefault(_box2dweb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var b2Vec2 = exports.b2Vec2 = _box2dweb2.default.Common.Math.b2Vec2;
	var b2BodyDef = exports.b2BodyDef = _box2dweb2.default.Dynamics.b2BodyDef;
	var b2Body = exports.b2Body = _box2dweb2.default.Dynamics.b2Body;
	var b2FixtureDef = exports.b2FixtureDef = _box2dweb2.default.Dynamics.b2FixtureDef;
	var b2Fixture = exports.b2Fixture = _box2dweb2.default.Dynamics.b2Fixture;
	var b2World = exports.b2World = _box2dweb2.default.Dynamics.b2World;
	var b2PolygonShape = exports.b2PolygonShape = _box2dweb2.default.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = exports.b2CircleShape = _box2dweb2.default.Collision.Shapes.b2CircleShape;
	var b2DebugDraw = exports.b2DebugDraw = _box2dweb2.default.Dynamics.b2DebugDraw;
	var b2ContactListener = exports.b2ContactListener = _box2dweb2.default.Dynamics.b2ContactListener;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map