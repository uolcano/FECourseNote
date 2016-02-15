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
//get方法封装
function get(url, options, callback) {
    var xhr = new XMLHttpRequest(); //创建XHR对象
    url += '?' + serialize(options); //拼接资源路径与查询序列
    xhr.open('get', url, true); //开启请求
    xhr.send(null); //发送请求
    xhr.onload = function() { //when xhr.readyState==4 && xhr.status == 200
        callback(xhr.responseText); //向callback传入返回文件
    };
}
//调用get函数
get('/information', {
    name: 'netease',
    age: 18
}, function(data) {
    console.log(data);
});
