//向服务器索要文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        console.log(response);  //log不出来
        var html = template('categoryTpl',{data:response})
        $('#category').html(html)
    }
});

//当管理员选择文件的时候触发
$('#feature').on('change',function(){
    var file = this.files[0]
    var formData = new FormData()
    formData.append('cover',file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)//cover地址的意思 将第一个图片地址获取到然后赋给隐藏域
            $('#pirview').attr('src',response[0].cover).show()
        }
    });
})

// 当添加文章表单提交的时候 
$('#addForm').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    }); 
    return false
})

//