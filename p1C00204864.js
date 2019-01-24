// Liam Hickey

'use strict';

class GestureManager
{
  constructor(debugIn)
  {
    this.debug = debugIn === true; // Handles whatever the user passes
    this.isTouchCapable = false;
    this.touchDetected = false;
    this.doubleTapDetected = false;
    this.lastTouchTime = 0;
    this.lastTouchPosX = 0;
    this.lastTouchPosY = 0;
    this.touchCount = 0;
    this.touches = [];

    // User Defined Callback Thresholds
    this.longTouchThresholdMs = 2000;
    this.doubleTapThresholdMs = 1000;
    this.touchCountCallbackThreshold = 2;

    // User Defined Callbacks
    this.doubleTapCallback = function() { /* Empty Function */ };
    this.longTouchCallback = function() { /* Empty Function */ };
    this.touchStartCallbackUser = function(e) { /*console.log(e); console.log("start");*/ };
    this.touchMoveCallbackUser = function(e) { /*console.log(e); console.log("move");*/ };
    this.touchEndCallbackUser = function(e) { /*console.log(e); console.log("end");*/ };
    this.swipeCallback = function() { /*console.log(e); console.log("end");*/ };
    this.pinchCallback = function() { /*console.log(e); console.log("end");*/ };
    this.touchCountCallback = function() { /*console.log(e); console.log("end");*/ };

    // Main Touch Callbacks
    document.addEventListener("touchstart", this.touchStartCallback.bind(this), {passive:false});
    document.addEventListener("touchmove", this.touchMoveCallback.bind(this), {passive: false});
    document.addEventListener("touchend", this.touchEndCallback.bind(this), {passive:false});
  }

  touchStartCallback(e)
  {
    e.preventDefault();
    this.touchStartCallbackUser(e);

    // Manage Recorded Touches
    this.touches = [];
    for (var i = 0; i < e.touches.length; i++) 
    {
      this.touches.push({x: e.touches[i].clientX, y: e.touches[i].clientY})
    }

    // Manage Touch Count
    this.touchCount = e.touches.length;
    if(this.touchCount > this.touchCountCallbackThreshold) {
      this.touchCountCallback();
    }

    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    this.touchDetected = true;
    var touchStartTime = new Date().getTime();
    if(touchStartTime < this.lastTouchTime + this.doubleTapThresholdMs)
    {
      this.doubleTapDetetcted = true;
      if(this.getDistanceBetweenTouches(this.lastTouchPosX, this.lastTouchPosY, touchX, touchY) < 50)
      {
        if(typeof this.doubleTapCallback === "function")
        {
          this.doubleTapCallback();
        }
        if(this.debug)
        {
          console.log("DEBUG - Double Tap")
        }
      }
    }
    this.lastTouchTime = touchStartTime;
    this.lastTouchPosX = touchX;
    this.lastTouchPosY = touchY;
    if(this.debug)
    {
      console.log("DEBUG - Touch Start");
    }
  }

  touchMoveCallback(e) {
    e.preventDefault();
    this.touchMoveCallbackUser();
    this.touches = [];
    for (var i = 0; i < e.touches.length; i++) 
    {
      this.touches.push({x: e.touches[i].clientX, y: e.touches[i].clientY})
    }
  }

  touchEndCallback(e)
  {
    e.preventDefault();
    this.touchEndCallbackUser(e);
    this.touches = [];
    for (var i = 0; i < e.touches.length; i++) 
    {
      this.touches.push({x: e.touches[i].clientX, y: e.touches[i].clientY})
    }
    var touchEndTime = new Date().getTime();
    if(touchEndTime > this.lastTouchTime + this.longTouchThresholdMs)
    {
      if(typeof this.longTouchCallback === "function")
      {
        this.longTouchCallback();
      }
      if(this.debug)
      {
        console.log("DEBUG - Long Touch")
      }
    }
    if(e.touches.length === 0) {
      this.touchDetected = false;
    }
    this.doubleTapDetected = false;
    if(this.debug)
    {
      console.log("DEBUG - Touch End");
    }
  }

  getDistanceBetweenTouches(x1, y1, x2, y2)
  {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
  }

  getTouchStatus()
  {
    return this.touchDetected;
  }

  getTouchCount() {
    return this.touchCount;
  }

  getAllTouches() {
    return this.touches;
  }
}
