/**
* @desc main entry point for the program
*/
function main()
{
  init();
  gestureManager = new GestureManager(true);
}

/**
* @desc Function used to initialise the game canvas and create touch listeners
*/
function init()
{
  var canvas = document.createElement("canvas");
  canvas.id = 'canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);
}

/**
* @desc Function used to clear the screen
*/
function clearScreen()
{
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
