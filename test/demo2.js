var gestureManager;

/**
* @desc main entry point for the program
*/
function main()
{
  gestureManager = new GestureManager(false);
  gestureManager.touchCountCallbackThreshold = 4;
  gestureManager.touchCountCallback = function() { alert("4 Touches Detected") };
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
  var touches = gestureManager.touches;
  
  var style = "";
  if(1 === touches.length)
  {
    style = "#FF00FF";
  }
  else if(2 === touches.length)
  {
    style = "#FFFF00";
  }
  else if(3 === touches.length)
  {
    style = "#00FFFF";
  }
  else
  {
    style = "#FF000F";
  }
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = style;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for(var i = 0; i < touches.length; i++)
  {
    ctx.beginPath();
    ctx.arc(touches[i].x, touches[i].y, 150, 0, 2 * Math.PI);
    ctx.stroke();
  }
  window.requestAnimationFrame(draw);
}
