$(function () {
    var productid = getUrlParam('productid');
    console.log(productid);
    getDetails(productid);
    function getDetails(productid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getmoneyctrlproduct',
            data: {
                "productid": productid
            },
            success: function (data) {
                //console.log(data);
                var html = template('listtmp', data)
                var text1 = data.result[0].productName + data.result[0].productPrice
                $("title").text(text1);
                $("#product >.product-details").html(html)
                //console.log(typeof(data.result[0].productCity));
                if ((data.result[0].productCity) == "") {
                    $("#product .drop").css('display', 'none');
                }
            }
        })
    }

    //获取地址栏参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
})