// Liam Hickey - C00204864

'use strict';

class GestureManager
{
  /**
   * Constructor for Gesture Manager
   * @param {bool - debug status} debugIn 
   */
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

    // Point Tracking
    this.trackPoints = false;
    this.pointCount = 0;
    this.points = [];

    // Gestures
    this.swipeStarted = false;
    this.swipeStartTime = 0;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.pinchStarted = false;
    this.pinchStartTime = 0;
    this.pinchStartPos1 = {x: 0, y: 0};
    this.pinchStartPos2 = {x: 0, y: 0};

    // User Defined Callback Thresholds
    this.longTouchThresholdMs = 2000;
    this.doubleTapThresholdMs = 1000;
    this.touchCountCallbackThreshold = 2;
    this.swipeDistanceThreshold = 150;
    this.swipeTimeThresholdMs = 500;
    this.pinchDistanceThresholdMin = 400;
    this.pinchDistanceThresholdMax = 450;
    this.pinchTimeThresholdMs = 1000;

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

  /**
   * Callback that is triggered when a new touch is detected
   * @param {event - touch start event} e 
   */
  touchStartCallback(e)
  {
    e.preventDefault();
    this.touchStartCallbackUser(e);
    var touchStartTime = new Date().getTime();
    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    this.touchDetected = true;

    // Manage Recorded Touches
    this.touches = [];
    for (var i = 0; i < e.touches.length; i++) 
    {
      this.touches.push({x: e.touches[i].clientX, y: e.touches[i].clientY})
    }

    // Manage Touch Count
    this.touchCount = e.touches.length;
    if(this.touchCount === this.touchCountCallbackThreshold) 
    {
      this.touchCountCallback();
    }

    // Swipe Code
    if(this.touchCount === 1)
    {
      if(!this.swipeStarted)
      {
        this.swipeStartX = touchX;
        this.swipeStartY = touchY;
        this.swipeStartTime = touchStartTime;
      }
      this.swipeStarted = true;
    }
    else
    {
      this.swipeStarted = false;
    }

    // Pinch Code
    if(this.touchCount === 2)
    {
      this.pinchStartPos1 = {x: e.touches[0].clientX, y: e.touches[0].clientY};
      this.pinchStartPos2 = {x: e.touches[1].clientX, y: e.touches[1].clientY};
      if(this.getDistanceBetweenTouches(this.pinchStartPos1.x, this.pinchStartPos1.y, 
        this.pinchStartPos2.x, this.pinchStartPos2.y) >= this.pinchDistanceThresholdMax)
      {
        if(!this.pinchStarted)
        {
          this.pinchStartTime = touchStartTime;
        }
        this.pinchStarted = true; 
      }
    }
    
    // Double Tap Code
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

    // Point Tracking Code
    if(this.trackPoints)
    {
      this.points.push({x: touchX, y: touchY});
      this.pointCount--;
    }

    // Debug
    if(this.debug)
    {
      console.log("DEBUG - Touch Start");
    }
  }

  /**
   * Callback that is triggered when an existing touch point is moved
   * @param {event - touch move event} e 
   */
  touchMoveCallback(e) {
    e.preventDefault();
    this.touchMoveCallbackUser();
    var touchMoveTime = new Date().getTime();

    // Manage Touches
    this.touches = [];
    for (var i = 0; i < e.touches.length; i++) 
    {
      this.touches.push({x: e.touches[i].clientX, y: e.touches[i].clientY})
    }

    // Manage Swipe Detection
    if(this.swipeStarted 
      && this.getDistanceBetweenTouches(e.touches[0].clientX, e.touches[0].clientY, this.swipeStartX, this.swipeStartY) > this.swipeDistanceThreshold
      && (this.swipeStartTime + this.swipeTimeThresholdMs) > touchMoveTime)
    {
      this.swipeCallback();
      this.swipeStarted = false;
    }

    // Manage Pinch Detection
    if(this.pinchStarted
      && this.getDistanceBetweenTouches(e.touches[0].clientX, e.touches[0].clientY, e.touches[1].clientX, e.touches[1].clientY,) < this.pinchDistanceThresholdMin
      )
    {
      this.pinchCallback();
      this.pinchStarted = false;
    }

    // Point Tracking Code
    if(this.trackPoints && this.pointCount > 0)
    {
      this.points.push({x: e.touches[0].clientX, y: e.touches[0].clientY});
      this.pointCount--;
    }
    else
    {
      this.trackPoints = false;
    }
  }

  /**
   * Callback function that is triggered when a touch point is removed
   * @param {event - touch end event} e 
   */
  touchEndCallback(e)
  {
    e.preventDefault();
    this.touchEndCallbackUser(e);

    this.pinchStarted = false;
    this.swipeStarted = false;

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

  /**
   * Simple function used to get distance between two points
   * @param {float - number representing point 1 X} x1 
   * @param {float - number representing point 1 Y} y1 
   * @param {float - number representing point 2 X} x2 
   * @param {float - number representing point 2 Y} y2 
   */
  getDistanceBetweenTouches(x1, y1, x2, y2)
  {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
  }

  /**
   * Function returns whether the screen is currently being touhed whatsoever
   */
  getTouchStatus()
  {
    return this.touchDetected;
  }

  /**
   * Function returns the number of touch points currently touching the screen
   */
  getTouchCount() {
    return this.touchCount;
  }

  /**
   * Returns the X and Y of all points
   */
  getAllTouches() 
  {
    return this.touches;
  }

  /**
   * Function used to begin tracking points
   * @param {integer - number of points to track} pointCount 
   */
  beginTrackPoints(pointCount) 
  {
    this.trackPoints = true;
    this.pointCount = pointCount;
    this.points = [];
  }

  /**
   * Function used to get all the tracked points
   */
  getTrackedPoints() 
  {
    return this.points;
  }

  /**
   * Function used to clear all the tracked points thus far
   */
  clearTrackedPoints()
  {
    this.points = [];
  }

  /**
   * Function returns whether point tracking is complete
   */
  isTrackingComplete()
  {
    return (!this.trackPoints);
  }
}
