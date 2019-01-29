/* global p1C00204864, describe, it, expect, should */

describe('p1C00204864()', function () {
  'use strict';

  it('exists', function () {
    expect(GestureManager).to.be.a('function');
  });

  it('touch start exists', function() {
    var gestureManager = new GestureManager(true);
    expect(gestureManager.touchStartCallback).to.be.a('function');
  });
  
  it('touch move exists', function() {
    var gestureManager = new GestureManager(true);
    expect(gestureManager.touchMoveCallback).to.be.a('function');
  });

  it('touch end exists', function() {
    var gestureManager = new GestureManager(true);
    expect(gestureManager.touchEndCallback).to.be.a('function');
  });

  it('distance check functions correctly', function(){
    var gestureManager = new GestureManager(true);
    expect(gestureManager.getDistanceBetweenTouches).to.be.a('function');
    expect(gestureManager.getDistanceBetweenTouches(1,1,2,1)).to.equal(1);
    expect(gestureManager.getDistanceBetweenTouches(1,1,1,1)).to.equal(0);
    expect(gestureManager.getDistanceBetweenTouches(-5,1,5,1)).to.equal(10);
    expect(gestureManager.getDistanceBetweenTouches(1,5,1,-5)).to.equal(10);
  });

  it('false touch detected', function(){
    var gestureManager = new GestureManager(true);
    expect(gestureManager.getTouchStatus).to.be.a('function');
    expect(gestureManager.getTouchStatus()).to.equal(false);
  });
});