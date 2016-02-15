/*
 *不能对dataset下的属性进行修改
 */

if (typeof(HTMLElement) !== 'undefined' && !HTMLElement.prototype.hasOwnProperty('dataset')) { //检测是否支持HTMLElement类型，以及这个类型的原型是否有‘dataset’属性
    Object.defineProperty(Element.prototype, 'dataset', { //给Element原型添加dataset属性
        get: function() { //创建dataset属性的访问器特性getter
            var result = {}, //创建返回对象
                attr = null, //元素节点的特性节点暂存
                attrName = ''; //特性节点名暂存
            for (var i = 0; i < this.attributes.length; i++) { //遍历元素节点的所有特性节点
                attr = this.attributes[i]; //获取特性节点
                if ((attrName = attr.name).match(/^data-.*/)) { //赋值特性节点名，并匹配判断
                    attrName = attrName.slice(5).replace(/-./g, function(firstAlpha) { //替换替换前缀-，并且首字母大写
                        return firstAlpha.slice(1).toUpperCase();
                    });
                    result[attrName] = attr.value; //返回对象添加特性名节点值对，因为result的属性attrName未设置getter和setter所以dataset为只读
                }
            }
            return result;
        }
    });
}


/*
 * https://github.com/inexorabletash/polyfill/blob/master/html.js
 */
// HTMLElement.dataset
// Needed for: IE10-
if (!('dataset' in document.createElement('span')) &&
    'Element' in global && Element.prototype && Object.defineProperty) {
    Object.defineProperty(Element.prototype, 'dataset', {
        get: function() {
            var result = Object.create(null);
            for (var i = 0; i < this.attributes.length; ++i) {
                var attr = this.attributes[i];
                if (attr.specified && attr.name.substring(0, 5) === 'data-') {
                    (function(element, name) {
                        var prop = name.replace(/-([a-z])/g, function(m, p) {
                            return p.toUpperCase();
                        });
                        result[prop] = element.getAttribute('data-' + name); // Read-only, for IE8-
                        Object.defineProperty(result, prop, {
                            get: function() {
                                return element.getAttribute('data-' + name);
                            },
                            set: function(value) {
                                element.setAttribute('data-' + name, value);
                            }
                        });
                    }(this, attr.name.substring(5)));
                }
            }
            return result;
        }
    });
}


/*
 * from @莫声谷
 */


// htlm：
// <div id="box" data-title-name="title">
// javascript:
// var box = document.querySelector("#box");

/**
 * 扩展函数可传入json数据做参数
 */
Function.prototype.setter = function() {
    var self = this;
    return function(key, value) {
        if (typeof key === "object" && !value) {
            for (var prop in key) {
                if (key.hasOwnProperty(prop)) self.call(this, prop, key[prop]);
            }
        } else {
            self.call(this, key, value);
        }
    }
};

/**
 * 获取dataset
 */
Node.prototype.getDataset = function() {
    return this.dataset || (function(node) {
        var dataset = {},
            attrName;
        for (var i = 0, attr; attr = node.attributes[i++];) {
            if (/^data-.*/i.test(attr.name)) {
                attrName = attr.name.replace(/^data-/i, "").replace(/-(.)/g, function($, $1) {
                    return $1.toUpperCase();
                });
                dataset[attrName] = attr.value;
            }
        }
        return dataset;
    })(this)
};

/**
 * 设置dataset
 * setDataset({"myName":1,"myGender": 0}) || setDatset("myName","hzq")
 */
Node.prototype.setDataset = function(key, value) {
    var dataset = this.dataset || this.getDataset(), //这里每次赋值都重新获取，效率低下，可以通过闭包保存结果，这里就不写了
        hasDataset = {}.toString.call(dataset) === "[object DOMStringMap]",
        attrName;
    if (hasDataset) {
        dataset[key] = value;
    } else {
        attrName = "data-" + key.replace(/[A-Z]/g, function($) {
            return "-" + $.toLowerCase();
        });
        this.setAttribute(attrName, value);
    }
}.setter();

/**
 * 删除dataset中的某个属性
 * @param key 属性名称,首字母小写驼峰命名法
 */
Node.prototype.removeDataset = function(key) {
    if (this.dataset) {
        delete this.dataset[key];
    } else {
        var attrName = "data-" + key.replace(/[A-Z]/g, function($) {
            return "-" + $.toLowerCase();
        });
        this.removeAttribute(attrName);
    }
};
测试：
// 获取 dataset 对象
box.getDataset(); //=> {titleName: "title"}

// 通过键值对的方式给 dataset 赋值
box.setDataset("myAge", 24);
box.getDataset(); //=> {titleName: "title", myAge: 24}

//通过json对象的方式给 dataset 赋值
box.setDataset({
    "myName": "莫声谷",
    "myGender": 0,
    "myEmailCode": "simlesos囧gmail.com"
});
box.getDataset(); //=> {titleName: "title", myAge: "24", myName: "莫声谷", myGender: "0", myEmailCode: "simlesos囧gmail.com"}

// 自动处理成 data-*+ 类型的attr
box.attributes; //=> NamedNodeMap {0: id, 1: data-title-name, 2: data-my-age, 3: data-my-name, 4: data-my-gender, 5: data-my-email-code}

// 删除 data-title-name 属性
box.removeDataset("titleName");
box.getDataset(); //=> {myAge: "24", myName: "莫声谷", myGender: "0", myEmailCode: "simlesos囧gmail.com"}

//最后输出
box.attributes; //=> {0: id, 1: data-my-age, 2: data-my-name, 3: data-my-gender, 4: data-my-email-code}
