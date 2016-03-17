$(document).ready(function(){
	$('#signupButton').on('click', function(){
		if($('#userforregis').val() == '' || $('#passforregis').val() == '' || $('#confirmpassforregis').val() == ''){
			alert("Please fill your username or password");
			//console.log($("input[name='package']:checked").val());
		}else if($('#passforregis').val() == $('#confirmpassforregis').val()){
			if(isEmail($('#userforregis').val()) == false){
				//console.log(isEmail($('#userforregis').val()));
				alert('Incorrect Email Type. (Example@example.com)');
			}else{
				$.ajax({
					type: 'POST',
					url: '/loginPage/regis',
					data:{
						email: $('#userforregis').val(),
						password: $('#passforregis').val(),
						package: $("input[name='package']:checked").val()
					},
					success: function(data){
						if(data[1]){
							alert(data[0]);
							window.location.reload();
						}else{
							alert(data[0]);
						}
					}
				});
			}
		}else{
			alert('Password not same.');
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
					if(data[1]){
						alert(data[0]);
						window.location.replace('/user');
					}else{
						alert(data[0]);
					}
				}
			});
		}
	});
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}