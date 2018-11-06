/* global p1C00204864, describe, it, expect, should */

describe('p1C00204864()', function () {
  'use strict';

  it('exists', function () {
    expect(GestureManager).to.be.a('function');
  });

  it('Can check for touch start event', function () {
    var gestureManager = new GestureManager(true);
    expect(gestureManager.debug).to.equal(true); // Check that debug mode is actually set
    expect(gestureManager.getTouchStatus()).to.equal(false); // Check that a touch isn't being registered
    document.getElementById("test-div").click();
    expect(gestureManager.getTouchStatus()).to.equal(true); // Check that we captured the event
  });
});