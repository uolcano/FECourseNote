function getChildElemOf(parentNode) {
    var childNodes = parentNode && //排除false、undefined、null、0
        ((parentNode.children instanceof Object) ? //排除非对象，由于IE早期不支持HTMLCollection，只能判断Object类型
            parentNode.children : false || parentNode.childNodes), //
        childrens = [];
    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1) {
            childrens.push(childNodes[i]);
        }
    }
    return childrens;
}

// @莫声谷 codes
var getElementChildren = function(node) {
    return node ? node.children || (function(node) {
        var children = [];
        if (node = node.firstChild) {
            do {
                if (node.nodeType === 1) children.push(node);
            } while (node = node.nextSibling)
        }
        return children;
    })(node) : [];
};


// http://stackoverflow.com/questions/10381296/best-way-to-get-child-nodes