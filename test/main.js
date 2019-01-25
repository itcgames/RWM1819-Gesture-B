/**
* @desc main entry point for the program
*/
function main()
{
  init();
  gestureManager = new GestureManager(false);
  gestureManager.doubleTapThresholdMs = 400; // The maximum time between two taps for it to be registered as a doubleTap
  gestureManager.doubleTapCallback = function() 
  {
    console.log("Double Tap Detected");
  };
  gestureManager.longTouchThresholdMs = 3500; // The minimum hold time for a long touch
  gestureManager.longTouchCallback = function() 
  {
    console.log("Long Touch Detected");
  };
  gestureManager.touchStartCallbackUser = function(e) {
    console.log("touchstart")
  };
  document.addEventListener("touchmove", function (e) {
    console.log("touchmove")
  }, {passive:false});
  gestureManager.touchEndCallbackUser = function(e) {
    console.log("End");
  };
  gestureManager.pinchCallback = function() {
    
  }
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
