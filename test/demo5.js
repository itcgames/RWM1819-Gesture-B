var gestureManager;

/**
* @desc main entry point for the program
*/
function main()
{
  gestureManager = new GestureManager(false);
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
  document.body.appendChild(canvas);
  draw();
}

/**
* @desc Function used to clear the screen
*/
function draw()
{
  if(gestureManager.isTrackingComplete())
  {
    console.log("complete")
    gestureManager.clearTrackedPoints()
    gestureManager.beginTrackPoints(50);
  }
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var trackedPoints = gestureManager.getTrackedPoints();
  console.log(trackedPoints.length);
  ctx.beginPath();
  for(var i = 0; i < trackedPoints.length - 1; i++)
  {
    ctx.moveTo(trackedPoints[i].x, trackedPoints[i].y);
    ctx.lineTo(trackedPoints[i + 1].x, trackedPoints[i + 1].y);
  }
  ctx.stroke();
  window.requestAnimationFrame(draw);
}