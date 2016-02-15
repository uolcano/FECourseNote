function drawCircle(id) {
    var canvas = this.document.getElementById(id); //获取canvas DOM对戏那个
    if (canvas.getContext) { //判断浏览器支持
        var ctx = canvas.getContext('2d'); //获取canvas渲染2d上下文
        ctx.strokeStyle = '#4d4e53'; //设置描线颜色
        ctx.fillStyle = '#6a83ff'; //设置填充颜色
        ctx.lineWidth = 10; //描线宽度
        ctx.beginPath(); //开启描绘路径
        ctx.arc(150, 150, 100, 0, Math.PI * 2, false); //描绘一个圆
        ctx.stroke(); //描线填充
        ctx.fill(); //图形填充
    }
}
