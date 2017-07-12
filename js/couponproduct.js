$(function () {
    var couponid = getUrlParam('couponid') || 0;
    getList(couponid);
    getTitle(couponid);
    //获取优惠券列表数据
    function getList(couponid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcouponproduct',
            data: {
                "couponid": couponid
            },
            success: function (data) {
                console.log(data);
                var html = template('listtmp', data)
                $("#main > .main-list").html(html);
                $(".media-left > a").on('click', function () {
                    $(".modal-content").html($(this).html());
                })
            }
        })
    }

//获取标题数据动态添加
    function getTitle(couponid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcoupon',
            success: function (data) {
                //console.log(data);
                var title = data.result[couponid].couponTitle
                $("title").text(title + "优惠券 -- 趣买");
                $("#header > h2").text(title + "优惠券");
                $("#main").find(".breadcrumb >li:nth-of-type(3)").html(title);
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