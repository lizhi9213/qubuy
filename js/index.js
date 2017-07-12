$(function () {
    //为轮播图添加滑动事件
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        autoplayDisableOnInteraction: false,
        loop: true,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'
    })

    //折扣区域数据请求
    getRecommen();
    function getRecommen() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getmoneyctrl',
            data: {
                "pageid": 10
            },
            success: function (data) {
                console.log(data);
                var html = template('recommentmp', data);
                $("#recommen > .recommen-list").html(html);
            }
        })
    }
})