/*
 *  克隆一个对象的属性和方法，但是操作不会相互影响，全部需要使用call()或apply()方法借用
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
                    obj[attr] = this[attr].clone(); //这里应该是通过递归实现深层次的属性查找
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
    var pattern = this.valueOf(); //获取完整的正则表达式，赋值并创建一个RegExp对象
    // 获取正则表达式的模式
    var flags = '';
    flags += pattern.global ? 'g' : '';
    flags += pattern.ignoreCase ? 'i' : '';
    flags += pattern.multiline ? 'm' : '';
    return new RegExp(pattern.source, flags); //获取RegExp对象的源正则表达式
};

/*
 * 复制/克隆一个Date对象
 *
 * 输入格式：
 * '2015-08-05'
 * 1438744815232
 * {y:2015,m:8,d:5}
 * [2015,8,5]
 * 返回格式：Date
 */
function toDate(param) {
    if (typeof(param) == 'string' ||
        typeof(param) == 'number') {
        return new Date(param);
    }
    if (param instanceof Array) {
        var date = new Date(0);
        date.setYear(param[0]);
        date.setMonth(param[1] - 1);
        date.setDate(param[2]);
        return date;
    }
    if (typeof(param) == 'object') {
        var date = new Date(0);
        date.setYear(param.y);
        date.setMonth(param.m - 1);
        date.setDate(param.d);
        return date;
    }
    return -1;
}


/*  记忆函数
 *  通过return返回创建的闭包，达到重复使用保存结果（memo数组）的目的
 *  用于实现优化版的阶乘递归
 */
var factorial = (function() {
    //这个匿名函数只在向factorial赋值的时候调用一次并返回一个闭包，
    //并且这个闭包本身是一个递归函数，通过这个闭包，使得每次递归的结果都能够保存在memo数组中
    var memo = [1]; //存储结果
    var count = 0; //计数器
    var fac = function(i) {
        count++;
        console.log('调用次数：' + count);  //计数提示放在if语句外面更准确
        var result = memo[i];
        if (typeof  result === 'number') { //通过memo[i]的副本，判断是memo[i]是否已赋值
            return result; //已赋值，则说明本次递归无需继续递归
        }
        result = i * fac(i - 1); //如过memo[i]未赋值则继续递归
        memo[i] = result; //将得到的值返回给memo数组
        return result; //返回得到的值，以供上一次递归使用
    }
    return fac; //携带匿名函数的内部作用域，作为闭包返回，并赋值给factorial
})();
for (var  i = 0; i <= 10; i++) {
    console.log(factorial(i));  //测试0到10的阶层使用递归的函数调用次数
}


/*
 * curry
 * 函数柯理化例子
 * add函数实际上只执行了一次，而后每次的返回值是helper闭包
 * helper每次执行又可以返回自己再次接收参数作为函数执行，
 * 但是每次执行的结果都保存在add函数的value变量中，
 * helper闭包内的有权访问这个value变量，
 * 通过helper闭包的valueOf()方法可返回helper可访问到的add作用域内的value
 *
 * 但是这个函数的缺点在于只判断了当前参数的前一个参数是否缺省，
 * 没有考虑到后一个参数next是否缺省的问题，如：add(3)()(2).valueOf();就会返回NaN
 * 因为如果命名参数没有对应的传入参数，就是默认的undefined的，而3+undefined会返回NaN
 */
// curry函数柯里化
var addCounter = 0, //add函数执行计数
    helperCounter = 0; //闭包执行计数
function add(value) {
    // console.log('add:'+(++addCounter));
    var helper = function(next) {
            value = typeof(value) === "undefined" ? next : value + next; //这里是为了在第一个参数缺省的情况下返回下一个非缺省值
            // console.log('helper:'+(++helperCounter));
            return helper;
        }
        // console.log('add:'+addCounter);
    helper.valueOf = function() {
        return value;
    }
    return helper
}

/*柯理化改良版*/
function addAdv(value) {
    var nextAdd = function(next) {
        if (typeof(value) === "undefined") {
            //如果value是undefined的，而next不是，则给value赋值为next
            if (typeof(next) !== "undefined") {
                value = next;
            }

        } else {
            //如果value和next都是非undefined的，则给value加上next
            if (typeof(next) !== "undefined") {
                value += next;
            }
        }
        return nextAdd;
    }
    nextAdd.valueOf = function(argument) {
        return value;
    }
    return nextAdd;
}


/*
 * Object.create compatible for IE
 * from segmentfault link:http://segmentfault.com/q/1010000002919613
 */
if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}
/*another solution from mdn link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create*/
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}