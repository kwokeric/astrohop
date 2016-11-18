const Astronaut = require("./astronaut");
const Util = require('./util');

class Asteroid {
  constructor (centerX, centerY) {
    this.color = Util.randomColor();

    let circle = new createjs.Shape();
    circle.graphics.setStrokeStyle(1.5).beginStroke(this.color).drawCircle(0, 0, 10);
    circle.x = centerX;
    circle.y = centerY;
    return circle;
  }
}

module.exports = Asteroid;
