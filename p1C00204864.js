/*! p1C00204864 v0.0.0 - MIT license */

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
    this.longTouchThresholdMs = 3000;
    this.doubleTapThresholdMs = 1000;
    this.doubleTapCallback = function() { /* Empty Function */ };
    this.longTouchCallback = function() { /* Empty Function */ };
    document.addEventListener("touchstart", this.touchStartCallback.bind(this), {passive:false});
    document.addEventListener("touchend", this.touchEndCallback.bind(this), {passive:false})
    if(this.debug)
    {
      document.addEventListener("click", this.touchStartCallback.bind(this), {passive:false});
    }
    console.log("Construction Complete");
  }

  touchStartCallback(e)
  {
    e.preventDefault();
    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    this.touchDetected = true;
    var touchStartTime = new Date().getTime();
    if(touchStartTime < this.lastTouchTime + this.doubleTapThresholdMs)
    {
      this.doubleTapDetetcted = true;
      if(this.getDistance(this.lastTouchPosX, this.lastTouchPosY, touchX, touchY) < 50)
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

  touchEndCallback(e)
  {
    e.preventDefault();
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
    this.touchDetected = false;
    this.doubleTapDetected = false;
    if(this.debug)
    {
      console.log("DEBUG - Touch End");
    }
  }

  getDistance(x1, y1, x2, y2)
  {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
  }

  getTouchStatus()
  {
    return this.touchDetected;
  }
}
