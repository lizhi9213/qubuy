$(function () {
    getCoupon();
    function getCoupon() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcoupon',
            success: function (data) {
                console.log(data);
                var html = template('listtmp', data);
                //console.log(html);
                $(".bd").html(html);
                $("title").text(data.result[0].couponTitle + "等优惠券 -- 趣买")
            }
        })
    }
})