var compatUtil = {
    getComputedStyle: function(elem) {
        return window.getComputedStyle ? window.getComputedStyle(elem) : elem.currentStyle;
    }
};
compatUtil.getComputedStyle(div);

var getStyle = function (element, cssPropName) {
	 var style = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
	 return style[cssPropName];
};
