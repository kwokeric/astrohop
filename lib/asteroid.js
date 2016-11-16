class Asteroid {
  constructor (centerX, centerY) {
    this.color = this.randomColor();


    let circle = new createjs.Shape();
    // let circle = new createjs.Graphics();g.setStrokeStyle(1);g.beginStroke("#000000");g.drawCircle(100,100,30);
    circle.graphics.beginFill(this.randomColor()).drawCircle(centerX, centerY, 10);
    return circle;
  }

  randomColor () {
    const COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
    return COLORS[Math.floor(Math.random()*5)];
  }
}

module.exports = Asteroid;
