$(function () {
    var productid = getUrlParam('productid') || 0;
    getProduct(productid);
    var categoryid = getUrlParam('categoryId') || 0;
    titleTwo(categoryid)

    //获取商品详情请求
    function getProduct(productid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getproduct',
            data: {
                "productid": productid
            },
            success: function (data) {
                //console.log(data);
                var arr = data.result[0].productName.split(" ");
                //console.log(arr);
                var text3 = arr[0]+arr[1];
                $("#product > .product-title > .breadcrumb > li:nth-of-type(3)").html(text3);
                $("head > title").text(text3+"，多少钱")
                var html = template('infoTmp', data);
                $("#product > .product-info").html(html);
                getAppraise(productid);
            }
        })
    }

    //获取网友评论数据
    function getAppraise(productid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getproductcom',
            data: {
                "productid": productid
            },
            success: function (data) {
                //console.log(data);
                var html = template('appraiseTmp', data);
                $("#product > .product-info > .product-com-list").html(html);
            }
        })
    }

    //获取路径分类第二个数据
    function titleTwo(categoryId) {
        //console.log(categoryId);
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcategorybyid',
            data: {categoryid: categoryId},
            success: function (data) {
                //console.log(data);
                //<a href="category.html">电视</a>
                var textd = data.result[0].category;
                var html = '<a href="productlist.html?categoryId=' + categoryId + '">' + textd + '</a>'
                $("#product > .product-title > .breadcrumb > li:nth-of-type(2)").html(html);
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