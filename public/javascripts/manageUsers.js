$(document).ready(function(){
	$('#signupButton').on('click', function(){
		$.ajax({
			type: 'POST',
			url: '/login/regis',
			data:{
				email: $('#userforregis').val(),
				password: $('#passforregis').val()
			},
			success: function(data){
				alert(data);
			}
		});
	});

	$('#loginButton').on('click', function(){
		$.ajax({
			type: 'POST',
			url: '/login/login',
			data:{
				email: $('#userforlogin').val(),
				password: $('#passforlogin').val()
			},
			success: function(data){
				alert(data);
				location.reload();
			}
		});
	});
});