import Game from './game';
import Astronaut from './astronaut';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const stage = new createjs.Stage(canvasEl);

  createjs.Ticker.addEventListener("tick", cursor);
  createjs.Ticker.setFPS(Game.FPS);
  //
  // let astronaut = new Astronaut.createAstronaut();
  // stage.addChild(astronaut);
  // stage.update();
  //
  // function cursor(event){
  //   let difX = stage.mouseX - circle.x;
  //
  //   circle.x += difX/8;
  //   stage.update();
  // }


  function cursor(event){
    let difX = stage.mouseX - circle.x;

    circle.x += difX/8;
    stage.update();
  }


  let circle = new createjs.Shape();
  circle.graphics.beginFill("#70DBDB").drawCircle(0, 0, 20);
  //Set position of Shape instance.
  circle.y = 460;
  //Add Shape instance to stage display list.
  stage.addChild(circle);
  //Update stage will render next frame
  stage.update();


});
