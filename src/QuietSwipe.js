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

    var _eStart;

    _el.addEventListener('touchstart', function(e){
        _eStart = e;
    });

    _el.addEventListener('touchend', function(e){
        var qse = new QSEventUnit(_eStart, e);
        callback.call(_el, qse);
    })
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

if (typeof module === 'object' && module.exports) module.exports = QuietWheel;
else if (typeof define === 'function' && define.amd) define(QuietWheel);
else this.QuietWheel = QuietWheel;
}).call(this);
