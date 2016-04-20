$(document).ready(function(){
	$('#signupButton').on('click', function(){
		if($('#userforregis').val() == '' || $('#passforregis').val() == '' || $('#confirmpassforregis').val() == ''){
			alert("Please fill your username or password");
			//console.log($("input[name='package']:checked").val());
		}else if($('#passforregis').val() == $('#confirmpassforregis').val()){
			if(isEmail($('#userforregis').val()) == false){
				//console.log(isEmail($('#userforregis').val()));
				alert('Incorrect Email Type. (Example@example.com)');
			}else if(allLetter($('#passforregis').val()) && allLetter($('#confirmpassforregis').val())){
				$.ajax({
					type: 'POST',
					url: '/signup',
					data:{
						email: $('#userforregis').val(),
						password: $('#passforregis').val()
						// package: $("input[name='package']:checked").val()
					},
					success: function(data){
						if(data.status){
							alert(data.alert);
							window.location.replace('/loginPage');
						}else{
							alert(data.alert);
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
		}else if(isEmail($('#userforlogin').val()) == true && allLetter($('#passforlogin').val())){
			$.ajax({
				type: 'POST',
				url: '/loginPage/login',
				data:{
					email: $('#userforlogin').val(),
					password: $('#passforlogin').val()
				},
				success: function(data){
					if(data.status){
						alert(data.alert);
						window.location.replace('/user');
					}else{
						alert(data.alert);
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

function allLetter(inputtxt){  
	var letters = /^[A-Za-z0-9]+$/;  
	if(inputtxt.match(letters)){  
		return true;  
	}else{  
		alert('Please input alphabet characters only');  
		return false;  
	}  
}