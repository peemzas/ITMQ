$(document).ready(function(){
	$('#saveDevice').on('click', function(){
		$.ajax({
				type: 'POST',
				url: '/user/addDevice',
				data:{
					deviceName: $('#deviceName').val(),
					clientId: $('#clientId').val(),
					deviceDescription: $('#deviceDescription').val()
				},
				success: function(data){
					if(data[1]){
						$('#allDevices_panel').append('<div class="col-md-4">'+
				            								'<div class="panel panel-default">'+
				                							'<div class="panel-heading">'+
				                    						'<h3 class="">'+data[2]+'.</h3>'+
				                							'</div>'+
				                							'<div class="panel-body">'+data[3]+'</div>'+
				            								'</div>'+
				        									'</div>');
						alert("Add device success.")
					}else{
						alert("Add device fail.")
					}
				}
		})
	})
})