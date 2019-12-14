// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function (err) {
			var res = JSON.parse(err.responseText)
			alert(res.message)
		}
	})
	// 阻止表单的默认提交行为
	return false;
});

//图片上传功能
$('#modifyBox').on('change', '#avatar', function () { //当用户选择文件的时候
	var formData = new FormData(); //创建一个formData对象
	formData.append('avatar', this.files[0]) //在空对象后面追加属性 第一个属性是上传图片的地址 第二个是用户上传文件的第一个
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		//告诉ajax不要解析请求参数 因为上传的是二进制图片类型
		processData: false,
		//告诉ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			$('#preview').attr('src', response[0].avatar) //img的属性为结果成功后的第一个地址 avatar地址
			$('#hiddenAvatar').val(response[0].avatar)//隐藏域的值为第一个结果的地址
		}
	});
})

//用户列表展示 向服务器发送请求 索要用户数据
$.ajax({
	type: "get",
	url: "/users",
	success: function (response) {
		var html = template('userTpl', { data: response })//使用模板引擎将模板数据和字符串拼接
		$('#userBox').html(html)//将拼接好的加载在tbody中
	}
});

//用户信息修改
$('#userBox').on('click', '.edit', function () { //通过事件冒泡的方式为下面所有的编辑按钮添加点击事件
	var id = $(this).attr('data-id') //获取被点击用户的id值
	//根据id获取详细用户信息
	$.ajax({
		type: "get",
		url: "/users/" + id,
		success: function (response) {
			var html = template('modifyTpl', response);//将模板和结果拼接
			$('#modifyBox').html(html)
		}
	});
})

//为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () { //submit提交事件
	var formData = $(this).serialize();//这个方法会将用户输入的信息格式化为字符串 用一个变量接收它
	console.log(formData);

	var id = $(this).attr('data-id')
	console.log(id);

	$.ajax({
		type: "put",
		url: "/users/" + id,
		data: formData,
		success: function (response) {
			location.reload()
		}
	});
	console.log(formData);
	return false
})

//删除单个
// $('#userBox').on('click', '.delete', function () { //给大盒子里的删除按钮绑定点击事件  事件委托
// 	if (confirm('确定删除？')) {
// 		var id = $(this).attr('data-id') //获取要删除按钮的id 
// 		$.ajax({
// 			type: "delete",
// 			url: "/users/" + id,
// 			success: function (response) {
// 				location.reload() //重新加载页面
// 			}
// 		});
// 	}
// })
$('#userBox').on('click', '.delete', function () {
	if (confirm('你确定删除吗?')) {
		var id = $(this).attr('data-id')
		$.ajax({
			type: "delete",
			url: "/users/" + id,
			success: function (response) {
				location.reload()
			}
		});
	}
})

//获取全选按钮
var selectAll = $('#selectAll');
//获取批量删除按钮
var deleteMany = $('#deleteMany')

selectAll.on('change', function () { //当全选按钮改变的时候
	var status = $(this).prop('checked') //用一个变量接收当前改变的值
	if (status) {
		deleteMany.show()
	} else {
		deleteMany.hide()
	}
	$('#userBox').find('input').prop('checked', status)//获取到所有的用户查到到小框并将它们的状态和大框改变成一致的
})

//当用户前面的复选框发生改变时
$('#userBox').on('change', '.userStatus', function () {
	var inputs = $('#userBox').find('input') //获取所有小框
	if (inputs.length == inputs.filter(':checked').length) { //如果所有小框的数量和选中小框的数量一致 filter过滤的意思	
		selectAll.prop('checked', true) //全选按钮的状态就改变为true
	} else {
		selectAll.prop('checked', false)
	}
	if (inputs.filter(':checked').length > 0) {//如果选中的小框数量大于0 
		deleteMany.show() //显示批量删除按钮
	} else {
		deleteMany.hide()
	}
})

//为批量删除添加点击事件
deleteMany.on('click', function () {
	var ids = []
	if (confirm('你真的要批量删除吗')) {
		var checkedUser = $('#userBox').find('input').filter(':checked')//获取选中的用户
		checkedUser.each(function (index, element) { //循环复选框得到data-id属性的值
			ids.push($(element).attr('data-id'))
		})
		$.ajax({
			type: "delete",
			url: "/users/" + ids.join('-'), //join方法可以把数组当中的元素用符号链接 链接以后就成了字符串
			success: function () {
				location.reload()
			}
		});
	}
})

// deleteMany.on('click',function(){
// 	var ids = []
// 	if(confirm('你确定要删除吗')){
// 		var checkedUser = $('#userBox').find.filter(':checked')
// 		checkedUser.each(function(index,element){
// 			ids.push($(element).attr('data-id'))
// 		})
// 		$.ajax({
// 			type: "delete",
// 			url: "/users/"+ids.join('-'),
// 			success: function (response) {
// 				location.reload()
// 			}
// 		});
// 	}

// })



