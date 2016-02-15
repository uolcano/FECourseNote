/*
 * 认识原型链容易陷入的误区
 */

//实例的原型到底是F.prototype还是原型
function F(){}
var a = new F();
F.prototype.name = 'tom';
F.prototype = null;//F.prototype只是指向内存中真实存在的原型对象引用，而不是原型本身
a.name;//"tom"


/*
 * Function和Object到底谁是谁的构造函数
 */
Function instanceof Object;//true
Object instanceof Function;//true
//这得先了解instanceof的运作机制

/*
 * 在看MDN上bind的polyfill源码时，看到的黑科技
 */
//对照组
function E(){}
E.prototype = {name:'tom'};
var b = new E();
Object.getPrototypeOf(b);//Object {name: "tom"}
E.prototype;//Object {name: "tom"}
//实验组
function F(){}
F.prototype=undefined;
var a = new F();//实例的原型跟构造函数的prototype属性无关
Object.getPrototypeOf(a);//Object {}
F.prototype;//undefined
a.name;//undefined
//已经不能通过F.prototype访问实例a的原型了，但是可以用ES5原生提供的Object.getPrototypeOf()来获取实例的[[Prototype]]属性（浏览器里由__proto__这个“隐藏属性”来实现的）
Object.getPrototypeOf(a).name = 'tom';
a.name;//"tom"

/*
 * 类型识别真的那么准确么？ES6以下到底有没有类
 */
function F(){}
var a = new F();
function E(){}
F.prototype.constructor = E;
typeof a;//"object"
a instanceof F;//true
F.prototype = null;
a instanceof F;//抛错
a.constructor.toString().match(/function\s*([^(]*)/)[1];//"E"
Object.prototype.toString.call(a).slice(8, -1);//"Object"
//只有这里能看到“类”的影子，但是会不会是跟new操作符的运作机制有关系
a;//F {}
console.dir(a);//>F

/*
 * 一些基本概念
 */
// 我们常说的JavaScript也跟ECMAScript等价而言
// 但实际上，ECMAScript是JavaScript的核心，JavaScript包括BOM和DOM
// 可以看《JavaScript高级程序设计第三版》的P2
