//添加分类
$('#addCategories').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function () {
            location.reload()
        }
    });
    return false
})

//发送ajax 向服务器索要分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        //将服务器返回的数据和html模板拼接
        var html = template('cateTpl', { data: response })
        //将拼接好的数据放到页面中
        $('#categoryBox').html(html)
    }
});
// $.ajax({
//     type: "get",
//     url: "/categories",
//     success: function (response) {
//         var html =template('cateTpl',{data:response})
//         $('#categoryBox').html(html)
//     }
// });

//为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    //获取要修改的分类数据的id
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
        var html = template('modifyCategoryTpl',response)
        $('#formBox').html(html)
        }
    });
})

//当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize(); //获取用户在表单输入的内容
    var id = $(this).attr('data-id') //获取要修改分类的id
    $.ajax({
        type: "put",
        url: "/categories/"+id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
})

//点击删除的时候
$('#categoryBox').on('click','.delete',function(){
    if(confirm('你确定要删除？')){
        var id = $(this).attr("data-id") //获取id
        $.ajax({
            type: "delete",
            url: "/categories/"+id,
            success: function (response) {
                location.reload()
            }
        });
    }

})

