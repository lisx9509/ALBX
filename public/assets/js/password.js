//修改密码
// $('#modifyForm').on('submit', function () {
//     var formData = $(this).serialize() //获取用户在表单中输入的内容
//     $.ajax({
//         type: "put",
//         url: "/users/password",
//         data: formData,
//         success: function () {
//             location.href = "/admin/login.html" //成功以后跳到登录页面 
//         }
//     });
//     return false
// })

$('#modifyForm').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function () {
            location.href = "/admin/login.html"
        }
    });
    return false
})