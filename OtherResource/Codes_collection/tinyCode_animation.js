var animation = function(elem, attr, from, to) {
    var distance = Math.abs(to - from),//the total offset in interger value
        stepLength = distance / 100,//separate 100 step, how long each step arrive
        sign = (to - from) / distance,//which direction each step move to
        offset = 0,//
        tmpOffset;
    var step = function() {
        tmpOffset = offset + stepLength;
        if (tmpOffset < distance) {
            elem.style[attr] = from + tmpOffset * sign + 'px';
            offset = tmpOffset;
        } else {//when the last step run over the total offset
            elem.style[attr] = to + 'px';
            clearInterval(intervalID);
        }
    }
    elem.style[attr] = from + 'px';
    var intervalID = setInterval(step, 10);//10 ms invoke step
}
