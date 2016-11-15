const Game = require("./game");
const Astronaut = require("./astronaut");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const stage = new createjs.Stage(canvasEl);

  createjs.Ticker.setFPS(Game.FPS); // Sets game fps

  createjs.Ticker.addEventListener("tick", cursor); // Add cursor event listener
  function cursor(event){
    let difX = stage.mouseX - astronaut.circle.x;

    astronaut.circle.x += difX/8;
    stage.update();
  }

  let astronaut = new Astronaut();  // Create astronaut
  stage.addChild(astronaut.circle);

  canvasEl.addEventListener("click", click);  // add click event listener
  function click(event){
    astronaut.circle.y = 350;
    stage.update();

    canvasEl.removeEventListener("click", click);
  }

});
