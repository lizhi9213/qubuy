$(function () {
    getShop();
    getArea()
    getproductList(0, 0)
    var flag = true;
    $(".search").on('click', function () {
        if (flag == true) {
            $(".seracbox").show();
            $(".search >span").removeClass("glyphicon-search").addClass("glyphicon-remove");
            flag = false;
        } else {
            $(".seracbox").hide();
            $(".search >span").removeClass("glyphicon-remove").addClass("glyphicon-search");
            flag = true;
        }
        $(".shoplist").hide;
        $(".arealist").hide;
        $(".pricelist").hide;
    })

    $(".filter > ul > li:nth-of-type(3) > a").on('click', function (e) {
        e.preventDefault();
        $(".pricelist").toggle();
        $(".shoplist").hide;
        $(".arealist").hide;
        $(".seracbox").hide;
        $(".search >span").removeClass("glyphicon-remove").addClass("glyphicon-search");
    })
    //获取店铺数据
    function getShop() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getgsshop',
            success: function (data) {
                //console.log(data);
                var html = template('shoptmp', data);
                $("#shop > ul").html(html);
                var content = '<a href="#shop" data-shopid="' + data.result[0].shopId + '">' + data.result[0].shopName + '<i class="triangle-down"></i></a>';
                $(".filter > ul > li:nth-of-type(1)").html(content);
                $(".filter > ul > li:nth-of-type(1) > a").on('click', function (e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    $($('.filter > ul >li').eq(1).find("a").attr("href")).hide();
                    $("#price").hide();
                    $(".seracbox").hide();
                    $(".search >span").removeClass("glyphicon-remove").addClass("glyphicon-search");
                })
                $("#shop > ul > li >a").on('click', function () {
                    var shopid = $(this).data("shopid")
                    $(".filter > ul > li:nth-of-type(1) > a").data('shopid', shopid);
                    $(".filter > ul > li:nth-of-type(1) > a").html($(this).html() + '<i class="triangle-down"></i>');
                    $('#shop').hide();
                    getproductList(shopid, $(".filter > ul > li:nth-of-type(2) > a").data('areaid'))
                })
            }
        })
    }

    //获取地区数据
    function getArea() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getgsshoparea',
            success: function (data) {
                //console.log(data);
                var html = template('ereatmp', data);
                $("#area > ul").html(html);
                var content = '<a href="#area" data-areaid="' + data.result[0].areaId + '">' + data.result[0].areaName.split("（")[0] + '<i class="triangle-down"></i></a>';
                $(".filter > ul > li:nth-of-type(2)").html(content);
                $(".filter > ul > li:nth-of-type(2) > a").on('click', function (e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    $($('.filter > ul >li').eq(0).find("a").attr("href")).hide();
                    $("#price").hide();
                    $(".seracbox").hide();
                    $(".search >span").removeClass("glyphicon-remove").addClass("glyphicon-search");
                })
                $("#area > ul > li >a").on('click', function () {
                    var areaid = $(this).data("areaid")
                    $(".filter > ul > li:nth-of-type(2) > a").data('areaid', areaid);
                    $(".filter > ul > li:nth-of-type(2) > a").html($(this).html().split("（")[0] + '<i class="triangle-down"></i>');
                    $('#area').hide();
                    getproductList($(".filter > ul > li:nth-of-type(1) > a").data('shopid'), areaid)
                })
            }
        })
    }

    //获取商品列表数据

    function getproductList(shopid, areaid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getgsproduct',
            data: {
                "shopid": shopid,
                "areaid": areaid
            },
            success: function (data) {
                //console.log(data);
                var html = template('listtmp', data);
                $(".main-list").html(html);
            }
        })
    }
})