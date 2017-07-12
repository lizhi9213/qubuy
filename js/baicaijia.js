$(function () {
    var titleid = getUrlParam('titleid') || 0;
    getTitle(titleid)
    var flag = true;
    $(".main-searchbtn").on('click', function () {
        //console.log("点击成功");
        if (flag == true) {
            $(".main-searchbox").show();
            $(this).find("span").removeClass("glyphicon-search").addClass("glyphicon-remove");
            flag = false;
        } else {
            $(".main-searchbox").hide();
            $(this).find("span").removeClass("glyphicon-remove").addClass("glyphicon-search");
            flag = true;
        }
    })
    //请求导航栏数据
    function getTitle(titleid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbaicaijiatitle',
            success: function (data) {
                //console.log(data);

                //判断是否是初始化页面，把下面内容加入其中
                console.log(titleid);
                if (titleid == 0) {
                    $('<div class="titlequan" style="text-align: center; margin-top: 10px; margin-bottom: 10px; width: 100%;">' +
                        '<img style="width: 100%;" src="http://misc.manmanbuy.com/images/quanpic/quan_banner_wap.png" alt="白菜价频道">' +
                        '</div>').insertAfter(".main-head");
                }else{
                    $(".titlequan").hide();
                }
                var html = template('wrappertmp', data);
                $(".wrapper > ul").html(html);

                //设置滑动列表ul的宽度
                var lis = $(".wrapper >ul").find("li");
                var tolalWiath = 0;
                lis.each(function (index, value) {
                    //console.log($(value).outerWidth(true));
                    tolalWiath += $(value).outerWidth(true)
                });
                $(".wrapper >ul").width(tolalWiath);
                //console.log(tolalWiath);
                setScroll()
                getList(0);
            }
        })
    }

    //请求产品列表数据
    function getList(titleid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbaicaijiaproduct',
            data: {
                "titleid": titleid
            },
            success: function (data) {
                //console.log(data);
                $(".wrapper > ul").find("li").eq(titleid).addClass("active");
                var html = template('listtmp', data);
                $(".main-list > ul").html(html);
            }
        })
    }

    function setScroll() {
        //设置导航栏单击事件，要完成active类添加，请求本次单击所属商品列表数据
        $(".main-taps").find(".wrapper >ul > li > a").on('click', function () {
            //console.log("单击成功");
            $("#header > h2").text($(this).text() + "--超值购");
            $(".main-taps").find(".wrapper >ul > li").removeClass("active");
            $(this).parent().addClass("active");
            var titleid = $(this).data("titleid");
            //console.log(titleid);
            //设置当前单击位置
            var swiperLeft = 0
            for (var i = 0; i < titleid; i++) {
                swiperLeft -= $(".wrapper >ul > li:eq(" + i + ")").outerWidth(true)
            }
            //console.log(swiperLeft);
            if (swiperLeft > minLeft) {
                $(".wrapper >ul").css("transform", "translateX(" + swiperLeft + "px)");
                $(".wrapper >ul").css("transition", "all 0.3s");
            } else {
                swiperLeft = minLeft
                $(".wrapper >ul").css("transform", "translateX(" + swiperLeft + "px)");
                $(".wrapper >ul").css("transition", "all 0.3s");
            }
            currentX = swiperLeft
            getList(titleid)
        })
        //获取容器的宽度
        var ulWidth = $(".wrapper >ul").width();
        var boxWidth = $(".wrapper").width()
        //console.log(boxWidth);
        //console.log(ulWidth);

        /*设置静止状态下的最大left值*/
        var maxLeft = 0;
        /*设置静止状态下的最小的top值*/
        var minLeft = boxWidth - ulWidth;
        //console.log(minLeft);
        /*设置滑动状态下的最大的top值*/
        var maxBounceLeft = maxLeft + 50;
        /*设置滑动状态下的最小top值*/
        var minBounceLeft = minLeft - 50;

        var startX, endX, moveX;
        //当前的滑动位置
        var currentX = 0;
        //当前的滑动距离
        var distanceX = 0;

        $(".main-taps").on('touchstart', function (e) {
            //console.log("触摸开始");
            startX = e.originalEvent.touches[0].clientX;

        })
        $(".main-taps").on('touchmove', function (e) {
            //console.log("触摸移动");
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            //判断当前手指拖动的距离是否超出了能拖动的最大或最小距离
            if (distanceX + currentX > maxBounceLeft || distanceX + currentX < minBounceLeft) {
                //console.log("超出范围了！");
                return;
            }
            $(".wrapper >ul").css("transition", "none");
            $(".wrapper >ul").css("transform", "translateX(" + (distanceX + currentX) + "px)");
        })
        $(".main-taps").on('touchend', function (e) {
            //console.log("触摸离开");
            endX = e.originalEvent.changedTouches[0].clientX;
            //判断手指离开后滑动的距离是否在静止状态下的最大和最小Left值中间，如果不在就手动回到静止位置，回弹效果
            if (currentX + distanceX > maxLeft) {
                //回到maxLeft位置
                currentX = maxLeft;
                $(".wrapper >ul").css("transition", "all 0.3s");
                $(".wrapper >ul").css("transform", "translateX(" + maxLeft + "px)");
            } else if (currentX + distanceX < minLeft) {
                //回到minLeft位置
                currentX = minLeft;
                $(".wrapper >ul").css("transition", "all 0.3s");
                $(".wrapper >ul").css("transform", "translateX(" + minLeft + "px)");
            } else {
                currentX += distanceX
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