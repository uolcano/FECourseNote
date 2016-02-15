//对象序列化函数
function serialize(data) {
    if (!data) {
        return '';
    }
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) {
            continue;
        }
        if (typeof data[name] === 'function') {
            continue;
        }
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
//创建XHR对象兼容封装
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //skip
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}
//post方法封装
function post(url, options, callback) {
    var xhr = createXHR(); //创建XHR对象
    xhr.open('post', url, true); //开启请求
    xhr.setRequestHeader('Content-Type', 'text/plain'); //设置请求头部，要求返回普通文本
    xhr.send(serialize(options)); //发送请求
    xhr.onload = function() { //when xhr.readyState==4 && xhr.status == 200
        callback(xhr.responseText); //向callback传入返回文件
    }
}
post('/addUser', {
    name: 'jerry',
    age: 1
}, function(data) {
    // 处理返回数据
});
