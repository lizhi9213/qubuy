$(function () {
    getMall();
    function getMall() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getsitenav',
            success: function (data) {
                //console.log(data);
                var html = template('malltmp', data);
                $(".classlist").html(html);
            }
        })
    }
})