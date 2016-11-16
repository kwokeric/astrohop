class Asteroid {
  constructor (centerX, centerY) {
    this.color = this.randomColor();


    let circle = new createjs.Shape();
    circle.graphics.setStrokeStyle(1.5).beginStroke(this.randomColor()).drawCircle(centerX, centerY, 8);
    return circle;
  }

  randomColor () {
    const COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
    return COLORS[Math.floor(Math.random()*5)];
  }
}

module.exports = Asteroid;
