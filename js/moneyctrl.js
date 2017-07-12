$(function () {
    var pageid = getUrlParam('pageid') || 0;
    getMoneyctrl(pageid);
//请求商品列表数据并渲染到页面

    function getMoneyctrl(pageid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getmoneyctrl',
            data: {
                "pageid": pageid
            },
            success: function (data) {
                console.log(data);
                var page = Math.ceil(data.totalCount / data.pagesize);
                //console.log(page);
                var downli = "";
                //console.log(pageid);
                //console.log(typeof(pageid));
                for (var i = 0; i < page; i++) {
                    var herf = "moneyctrl.html?&pageid=" + i;

                    downli += '<li><a href="' + herf + '">' + i + '/' + page + '</a></li>'
                }
                $(".product-option").find(".dropdown-toggle > span:nth-of-type(1)").html(pageid + '/' + page);
                var pagePrev, pageNext;
                if (pageid == 0) {
                    pagePrev = "moneyctrl.html?" + "&pageid=0";
                    pageNext = "moneyctrl.html?" + "&pageid=" + (parseInt(pageid) + 1);
                } else if (pageid == page) {
                    pagePrev = "moneyctrl.html?" + "&pageid=" + (pageid - 1);
                    pageNext = "moneyctrl.html?" + "&pageid=" + page;
                } else {
                    pagePrev = "moneyctrl.html?" + "&pageid=" + (pageid - 1);
                    pageNext = "moneyctrl.html?" + "&pageid=" + (parseInt(pageid) + 1);
                }

                $(".page-prev").attr("href", pagePrev);
                $(".page-next").attr("href", pageNext);
                $(".dropdown-menu").html(downli);
                var html = template('listtmp', data);
                $("#product > .product-list").html(html);
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