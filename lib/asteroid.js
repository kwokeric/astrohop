const Astronaut = require("./astronaut");

class Asteroid {
  constructor (centerX, centerY) {
    this.color = this.randomColor();

    let circle = new createjs.Shape();
    circle.graphics.setStrokeStyle(1.5).beginStroke(this.color).drawCircle(0, 0, 8);
    circle.x = centerX;
    circle.y = centerY;
    return circle;
  }


  randomColor () {
    const COLORS = ["#B4FFC2", "#93E0E8", "#8AB1CC", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
    return COLORS[Math.floor(Math.random()*6)];
  }
}

module.exports = Asteroid;
