function getCookie() {
    var cookie = {};//create empty obj
    var all = document.cookie;//get cookie from the current page
    if (all === '') {
        return cookie;
    }
    var list = all.split('; ');//separate the name/key pairs
    for (var i = 0; i < list.length; i++) {//traversal all the name/key pairs
        var item = list[i];
        var p = item.indexOf('=');//find the first =
        var name = item.substring(0, p);//extract the name before the =
        name = decodeURIComponent(name);//decode
        var value = item.substring(p + 1);//extract the value after the =
        value = decodeURIComponent(value);//decode
        cookie[name] = value;//assembly the name and value as a pair
    }
    return cookie;
}

function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires) {
        cookie += '; expires=' + expires.toGMTString();
    }
    if (path) {
        cookie += '; path=' + path;
    }
    if (domain) {
        cookie += '; domain=' + domain;
    }
    if (secure) {
        cookie += '; secure' + secure;
    }
    document.cookie = cookie;
}

function removeCookie(name, path, domain) {
    //通过cookie的name、path和domain属性来指定某个cookie
    document.cookie = encodeURIComponent(name) + '=' //设置指定name，并设置value为空字符
        + '; path=' + path //指定path
        + '; domain=' + domain //指定domain
        + '; max-age=0'; //设置失效时间/会话时间来删除指定cookie
}
