const Game = require("./game");
const Astronaut = require("./astronaut");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const stage = new createjs.Stage(canvasEl);

  let game = new Game(stage, canvasEl);
});
