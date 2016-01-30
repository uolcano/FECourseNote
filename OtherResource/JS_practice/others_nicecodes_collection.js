/*
 *  克隆一个对象的属性和方法，但是操作不会相互影响
 */
Object.prototype.clone = function() {
    var Constructor = this.constructor;
    var obj = new Constructor();

    for (var attr in this) {
        if (this.hasOwnProperty(attr)) {
            if (typeof(this[attr]) !== "function") {
                if (this[attr] === null) {
                    obj[attr] = null;
                } else {
                    obj[attr] = this[attr].clone();//这里应该是通过递归实现深层次的属性查找
                }
            }
        }
    }
    return obj;
};

/* Method of Array */
// 这个方法可简化为[].concat(arr)
// Array.prototype.clone = function() {
//     var thisArr = this.valueOf();
//     var newArr = [];
//     for (var i = 0; i < thisArr.length; i++) {
//         newArr.push(thisArr[i].clone());
//     }
//     return newArr;
// };

/* Method of Boolean, Number, String*/
// 这几个方法不行
// Boolean.prototype.clone = function() {
//     return this.valueOf();
// };

// Number.prototype.clone = function() {
//     return this.valueOf();
// };

// String.prototype.clone = function() {
//     return this.valueOf();
// };

/* Method of Date*/
Date.prototype.clone = function() {
    return new Date(this.valueOf());
};

/* Method of RegExp*/
RegExp.prototype.clone = function() {
    var pattern = this.valueOf();
    var flags = '';
    flags += pattern.global ? 'g' : '';
    flags += pattern.ignoreCase ? 'i' : '';
    flags += pattern.multiline ? 'm' : '';
    return new RegExp(pattern.source, flags);
};
