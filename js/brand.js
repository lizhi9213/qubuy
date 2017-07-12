$(function () {
    var brandtitleid = getUrlParam('brandtitleid');
    getproductList(brandtitleid);
    getproductSales(brandtitleid);
    setbranTitle(brandtitleid);
    //请求十大品牌数据
    function getproductList(brandtitleid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbrand',
            data: {
                "brandtitleid": brandtitleid
            },
            success: function (data) {
                //console.log(data);
                var html = template('brandtmp', data);
                $(".classlist").html(html);
                $(".classlist > ul").find("li").each(function (i, value) {
                    $(value).find("a > i").text(i + 1);
                })
            }
        })
    }

    //请求品牌产品销量排行数据
    function getproductSales(brandtitleid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbrandproductlist',
            data: {
                "brandtitleid": brandtitleid,
                "pagesize": 4
            },
            success: function (data) {
                //console.log(data);
                var html = template('salestmp', data);
                $(".product-sales").html(html);
                if (data.result.length == 0) {
                    $(".product-sales").html("<p>暂无销量数据</p>")
                    $(".product-discuss").html("<p>暂无评论数据</p>")
                    return;
                }
                getDiscuss(data.result[0]);
            }
        })
    }

    //请求评论数据
    function getDiscuss(product) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getproductcom',
            data: {
                "productid": product.productId
            },
            success: function (data) {
                //console.log(data);
                data = {
                    "productImg": product.productImg,
                    "productName": product.productName,
                    "result": data.result
                }
                //console.log(data);
                var html = template('discusstmp', data);
                $(".product-discuss").html(html);
            }
        })
    }

    //获取类别并动态添加到标题中
    function setbranTitle(brandtitleid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbrandtitle',
            success: function (data) {
                //console.log(data);
                //console.log(data.result[brandtitleid].brandTitle.split("十")[0]);
                var text = data.result[brandtitleid].brandTitle.split("十")[0];
                $("title").text(text + "什么牌子好, " + text + "十大品牌排行榜");
                $("#classify >h3:nth-of-type(1)").text(text + "哪个牌子好");
                $("#classify >h3:nth-of-type(2)").text(text + "产品销量排行");
                $("#classify >h3:nth-of-type(3)").text(text + "最新评论");
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