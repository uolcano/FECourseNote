var addEvent = document.addEventListener ?
    function(elem, type, listener, useCapture) {
        elem.addEventListener(type, listener, useCapture);
    } :
    function(elem, type, listener, useCapture) {
        elem.attachEvent('on' + type, listener);
    };

var delEvent = document.removeEventListener ?
    function(elem, type, listener, useCapture) {
        elem.removeEventListener(type, listener, useCapture);
    } :
    function(elem, type, listener, useCapture) {
        elem.detachEvent('on' + type, listener);
    };
var getEvent = function(event) {
    return event || window.event;
};
var getTarget = function(event) {
    return event.target || event.srcElement;
}
