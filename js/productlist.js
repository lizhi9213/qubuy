$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    var categoryId = getUrlParam('categoryId');
    if (categoryId == undefined) {
        categoryId = 0;
    }
    var pageid = getUrlParam('pageid');
    if (pageid == null) {
        pageid = 1;
    }
    getproductTitle(categoryId);
    getproductList(categoryId, pageid);
    //根据分类页面传过来的参数动态获取所点击的分类并填充内容到路径上

    function getproductTitle(categoryId) {
        //console.log(categoryId);
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcategorybyid',
            data: {categoryid: categoryId},
            success: function (data) {
                //console.log(data);
                var textd = data.result[0].category;
                //console.log(textd);
                $("#product > .product-title > .breadcrumb > li:nth-of-type(3)").text(textd);
                $("head > title").text(textd + "比价选购，" + textd + "推荐哪个好 -- 趣买手机版")
            }
        })
    }

    //根据路径获取的参数来动态获取商品列表并渲染到页面
    function getproductList(categoryId, pageid) {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getproductlist',
            data: {
                "categoryid": categoryId,
                "pageid": pageid
            },
            success: function (data) {
                console.log(data);
                var page = Math.ceil(data.totalCount / data.pagesize);
                //console.log(page);
                var downli = "";

                for (var i = 0; i < page; i++) {
                    var herf = "productlist.html?categoryId=" + categoryId + "&pageid=" + (i + 1);

                    downli += '<li><a href="' + herf + '">' + (i + 1) + '/' + page + '</a></li>'
                }
                $(".product-option").find(".dropdown-toggle > span:nth-of-type(1)").html(pageid + '/' + page);
                var pagePrev, pageNext;
                if (pageid == 1) {
                    pagePrev = "productlist.html?categoryId=" + categoryId + "&pageid=1";
                    pageNext = "productlist.html?categoryId=" + categoryId + "&pageid=" + (parseInt(pageid) + 1);
                } else if (pageid == page) {
                    pagePrev = "productlist.html?categoryId=" + categoryId + "&pageid=" + (pageid - 1);
                    pageNext = "productlist.html?categoryId=" + categoryId + "&pageid=" + page;
                } else {
                    pagePrev = "productlist.html?categoryId=" + categoryId + "&pageid=" + (pageid - 1);
                    pageNext = "productlist.html?categoryId=" + categoryId + "&pageid=" + (parseInt(pageid) + 1);
                }

                $(".page-prev").attr("href", pagePrev);
                $(".page-next").attr("href", pageNext);
                $(".dropdown-menu").html(downli);
                var html = template('listtmp', data);
                $("#product > .product-list").html(html);
            }
        })
    }
})