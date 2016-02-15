if (!Document.prototype.hasOwnProperty('getElementsByClassName') && (typeof Document.prototype.getElementsByClassName !== 'function')) {
    Document.prototype.getElementsByClassName(elem, clazz) {
        if (elem.getElementsByClassName) {
            return elem.getElementsByClassName(clazz);
        } else {
            var list = elem.getElementsByTagName('*'),
                result = [];
            for (var i = 0, len = list.length; i < len; i++) {
                if ((' ' + list[i] + ' ').indexOf(' ' + clazz + ' ') != -1) {
                    result.push(list[i]);
                }
            };
            return result;
        }
    }
}

function getElementsByClassName(elem, clazz) {
    if (elem.getElementsByClassName) {
        return elem.getElementsByClassName(clazz);
    } else {
        var list = elem.getElementsByTagName('*'),
            result = [];
        for (var i = 0, len = list.length; i < len; i++) {
            if ((' ' + list[i] + ' ').indexOf(' ' + clazz + ' ') != -1) {
                result.push(list[i]);
            }
        };
        return result;
    }
}
