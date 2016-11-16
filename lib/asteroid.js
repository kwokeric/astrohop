class Asteroid {
  constructor (centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = this.randomColor();
    this.radius = 8;
  }

  randomColor () {
    const COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
    return COLORS[Math.floor(Math.random()*5)];
  }

  render () {
    let circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
  }
}

Asteroid.randomCircle = function (maxX, maxY, numCircles) {
  return new Asteroid(
    maxX * Math.random(),
    maxY * Math.random(),
    Asteroid.radius(maxX, maxY, numCircles),
    Asteroid.randomColor()
  );
};

Asteroid.randomColor = function () {
  const COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
  return COLORS[Math.floor(Math.random()*5)];
};

module.exports = Asteroid;
