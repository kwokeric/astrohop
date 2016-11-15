class Circle {
  constructor (centerX, centerY, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.radius = 8;
  }

  render () {
    let circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
  }
}

Circle.randomCircle = function (maxX, maxY, numCircles) {
  return new Circle(
    maxX * Math.random(),
    maxY * Math.random(),
    Circle.radius(maxX, maxY, numCircles),
    Circle.randomColor()
  );
};

Circle.randomColor = function () {
  const COLORS = ["#B4FFC2", "#93E0E8", "#9AB4FF", "#B2AEFF", "#DEB3FF"];
  return COLORS[Math.floor(Math.random()*5)];
};

module.exports = Circle;
