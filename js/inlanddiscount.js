$(function () {
    var i = 0;
    var data1 = {};
    var resultLength = 0;
    var height = $("#product > .cu-friend").height() - $(document.body).height();
    //console.log("window =>" + height);
    var srllTop = $(window).scrollTop();

    //请求数据，渲染到页面

    $("#product > .spinner").show();
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getinlanddiscount',
        success: function (data) {
            console.log(data);
            resultLength = data.result.length;
            //console.log(resultLength);
            data1 = data;
            var newdata = {
                "result": []
            }
            for (i; i < 6; i++) {
                newdata.result.push(data.result[i])
            }
            var html = template('listtmp', newdata);
            $("#product > .cu-friend").html(html);
            height = $("#product > .cu-friend").height() - $(document.body).height();
            //console.log("ajax =>" + height);
            $("#product > .spinner").hide();
        }
    })

    //以下是懒加载部分代码


    //console.log("页面头部卷曲初始长度：" + srllTop);
    $(window).on('scroll', function () {
        //console.log("滚动条滚动了");
        srllTop = $(window).scrollTop();
        if (srllTop >= height && srllTop != 0) {
            //console.log("判断进入");
            height = 99999;
            $("#product > .spinner").show();
            $.ajax({
                url: 'http://182.254.146.100:3000/api/getinlanddiscount',
                success: function (data) {
                    if (i >= resultLength) {
                        $("#product > .spinner").hide();
                        return;
                    }
                    var newdata = {
                        "result": []
                    }
                    for (var j = i; j < i + 2; j++) {
                        newdata.result.push(data.result[j])
                    }
                    var html = template('listtmp', newdata);
                    $("#product > .cu-friend").append(html);
                    height = $("#product > .cu-friend").height() - $(document.body).height();
                    i = j;
                    $("#product > .spinner").hide();
                }
            })
        }
    })
})