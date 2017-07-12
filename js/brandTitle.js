$(function () {
    getbranList();
    function getbranList() {
        $.ajax({
            url: 'http://182.254.146.100:3000/api/getbrandtitle',
            success: function (data) {
                console.log(data);
                var html = template('classifytmp', data)
                $(".classlist").html(html);
            }
        })
    }
})