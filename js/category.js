$(function () {
    getCaegory();
    function getCaegory() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getcategorytitle',
            success: function (data) {
                //console.log(data);
                var html = template('categorytmp', data)
                $("#classify > .panel-group").html(html);
                var cattegory = $("#classify > .panel-group > .panel-default > .panel-heading > h4 > a");
                cattegory.on('click', function (e) {
                    var titleid = $(this).data("titleid");
                    //console.log(titleid);
                    $.ajax({
                        url: 'http://182.254.146.100:3000/api/getcategory',
                        data: {titleid: titleid},
                        success: function (data) {
                            console.log(data);
                            var html = template('classifytmp', data);
                            var parent = $(e.target).parent().parent().parent().find(".panel-collapse").find(".panel-body");
                            parent.html(html);
                            var boylist = parent.find(".row > div");
                            var cont = boylist.length % 3 || 3;
                            //console.log(cont);
                            parent.find(".row > div:nth-last-child(-n+" + cont + ")").css("border-bottom", "0");
                        }
                    })
                })
            }
        })
    }
})