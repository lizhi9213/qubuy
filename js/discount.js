$(function () {
    var productid = getUrlParam('productid') || 0;
    getDiscount(productid);
    //获取数据并渲染到页面
    function getDiscount(productid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getdiscountproduct',
            data: {
                "productid": productid
            },
            success: function (data) {
                //console.log(data);
                var arr = data.result[0].productName.split(" ");
                //console.log(arr);
                $(".breadcrumb > li:nth-of-type(3)").html(arr[0]);
                $("title").html(arr[0]);
                var text1 = data.result[0].productName + data.result[0].productPrice
                $("title").text(text1);
                var html = template('listtmp', data);
                $("#product > .product-details").html(html);
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