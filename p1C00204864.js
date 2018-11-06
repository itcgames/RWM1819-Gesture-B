/*! p1C00204864 v0.0.0 - MIT license */

// Liam Hickey

'use strict';

class GestureManager
{
  constructor(debugIn)
  {
    this.debug = debugIn === true;
    this.isTouchCapable = false;
    this.touchDetected = false;
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
    this.touchDetected = true;
    if(this.debug)
    {
      console.log("DEBUG - Touch Start");
    }
  }

  touchEndCallback(e)
  {
    e.preventDefault();
    this.touchDetected = false;
    if(this.debug)
    {
      console.log("DEBUG - Touch End");
    }
  }

  getTouchStatus()
  {
    return this.touchDetected;
  }
}
