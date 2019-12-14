//获取数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl', response)
        $('#postsBox').html(html)
        var page = template('pageTpl',response)
        $('#page').html(page)
    }
});

//处理时间
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//分页
function changepage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:page
        },
        success: function (response) {
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl',response)
            $('#page').html(page)
        }
    });
}

//索要分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
       var html = template('categoryTpl',{data:response})
       $('#Box').html(html)
    }
});

//筛选
$('#filterForm').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl',response)
            $('#page').html(page)
        }
    });
    return false
})