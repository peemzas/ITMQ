$(document).ready(function(){
	$('#signupButton').on('click', function(){
		if($('#userforregis').val() == '' || $('#passforregis').val() == '' || $('#confirmpassforregis').val() == ''){
			alert("Please fill your username or password")
		}else if($('#passforregis').val() == $('#confirmpassforregis').val()){
			$.ajax({
				type: 'POST',
				url: '/loginPage/regis',
				data:{
					email: $('#userforregis').val(),
					password: $('#passforregis').val()
				},
				success: function(data){
					alert(data);
				}
			});
		}else{
			alert("password not same");
		}
	});

	$('#loginButton').on('click', function(){
		if($('#userforlogin').val() == '' || $('#passforlogin').val() == ''){
			alert("Please fill your username or password")
		}else{
			$.ajax({
				type: 'POST',
				url: '/loginPage/login',
				data:{
					email: $('#userforlogin').val(),
					password: $('#passforlogin').val()
				},
				success: function(data){
					alert(data);
					location.reload();
				}
			});
		}
	});
});