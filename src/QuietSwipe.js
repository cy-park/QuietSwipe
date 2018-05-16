;(function(){

'use strict';

/**
 * Constructor QuietSwipe(callback, [options])
 *
 * Add swipe event to DOM element.
 *
 * @param {object} options
 * @param {HTMLElement} options.target
 *        Target DOM element to attach this swipe event.
 *        default: document
 * @param {integer} options.timeThreshold
 *        Maximum threshold time in milliseconds until the current tap holding is canceled.
 *        If a user tap the device and does not release the tap,
 *        the swipe will be canceled after the threshold time.
 *        default: 2000
 * @param {integer} options.moveThreshold
 *        Minimum pixels to swipe to evoke the swipe event.
 *        default: 50
 * @param {string} options.direction (vertical | horizontal | both)
 *        Swipe directions to monitor.
 *        default: `vertical`
 * @param {string} options.enableMouseGesture
 *        Enable mouse swipe gesture.
 *        defalut: false
 *
 * @return void
 */
var QuietSwipe = function(callback, options){

    options = options || {};

    var _el  = options.target || document
    ,   _tt  = options.timeThreshold || 2000
    ,   _mv  = options.moveThreshold || 50
    ,   _dir = options.direction || 'vertical'
    ,   _mouse = options.enableMouseGesture;

    var _eStart;

    var onTouchStart = function(e){
        _eStart = e;
    };

    var onTouchEnd = function(e){
        var qse = new QSEventUnit(_eStart, e);
        callback.call(_el, qse);
    }

    _el.addEventListener('touchstart', onTouchStart);
    _el.addEventListener('touchend', onTouchEnd);

    if (_mouse) {
        _el.addEventListener('mousedown', onTouchStart);
        _el.addEventListener('mouseup', onTouchEnd);
    }
};

function QSEventUnit(eStart, eEnd){

    var self = this;

    self.originalTouchStartEvent = eStart;
    self.originalTouchEndEvent = eEnd;

    self.delta = {
        x: eEnd.pageX - eStart.pageX,
        y: eEnd.pageY - eStart.pageY
    };

    self.direction = {
        horizontal: self.delta.x < 0 ? 'left' : 'right',
        vertical: self.delta.y < 0 ? 'up' : 'down'
    };
}

if (typeof module === 'object' && module.exports) module.exports = QuietSwipe;
else if (typeof define === 'function' && define.amd) define(QuietSwipe);
else this.QuietSwipe = QuietSwipe;
}).call(this);
