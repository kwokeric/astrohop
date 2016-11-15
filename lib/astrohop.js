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
    let difX = stage.mouseX - astronaut.avatar.x;

    astronaut.avatar.x += difX/8;
    stage.update();
  }

  let astronaut = new Astronaut();  // Create astronaut
  stage.addChild(astronaut.avatar);

  canvasEl.addEventListener("click", click);  // add click event listener
  function click(event){
    astronaut.avatar.y = 380;
    stage.update();

    canvasEl.removeEventListener("click", click);
  }

});
