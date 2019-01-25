var gestureManager;
var magenta = false;

/**
* @desc main entry point for the program
*/
function main()
{
  gestureManager = new GestureManager(false);
  gestureManager.swipeDistanceThreshold = 150;
  gestureManager.swipeTimeThresholdMs = 500;
  gestureManager.pinchDistanceThresholdMin = 400;
  gestureManager.pinchDistanceThresholdMax = 450;
  gestureManager.pinchTimeThresholdMs = 1000;
  gestureManager.swipeCallback = function() { magenta = true; };
  gestureManager.pinchCallback = function() { magenta = false; };
  init();
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
  draw();
}

/**
* @desc Function used to clear the screen
*/
function draw()
{
  var touchDetected = gestureManager.touchDetected;
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = magenta ? "#FF00FF" : "#00FFFF";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  window.requestAnimationFrame(draw);
}
