$(document).ready(function(){
	$('#saveDevice').on('click', function(){
		$.ajax({
				type: 'POST',
				url: '/user/addDevice',
				data:{
					deviceName: $('#deviceName').val(),
					deviceDescription: $('#deviceDescription').val()
				},
				success: function(data){
					console.log(data);
					if(data.addStatus){
						$('#allDevices_panel').append('<div id='+data.deviceId+' class="col-md-4">'+
				            								'<div class="panel panel-default">'+
				                							'<div class="panel-heading">'+
				                								'<div class="row">'+
				                									'<div class="col-md-6">'+
				                    								'<h3>'+data.deviceName+'.</h3>'+
				                    							'</div>'+
				                    							'<div class="col-md-6" style="text-align: right; display: block">'+
				                    								'<label>Status :'+ "</label>"+
				                    								'<label data-device='+data.deviceId+'>'+data.status+"</label>"+
				                    								'<button type="button" aria-hidden="true" onclick="removeDevice($(this))" data-device="'+data.deviceId+'" class="close">×</button>'+
				                    							'</div>'+
				                    						'</div>'+
				                							'</div>'+
				                							'<div class="panel-body">'+
				                								'<p>ClientId : '+data.deviceId+'</p>'+
				                								'<p>'+data.deviceDescription+'</p>'+
				                							'</div>'+
				            								'</div>'+
				        									'</div>');
						alert(data.alert)
						$('#saveDeviceModal').modal('hide');
						// window.location.reload();
					}else{
						alert(data.alert)
					}
				}
		})
	})

	// $('#deleteDevice').on('click', function(){
	// 	$()
	// })
})

function removeDevice(device){
	var deviceId = device.attr('data-device')
	var deleteConfirm = confirm('Are you sure to delete this device?');
	if(deleteConfirm){
		$.ajax({
			type: 'POST',
			url: '/user/deleteDevice',
			data: {
				deviceId: deviceId
			},
			success: function(data){
				if(data.addStatus){
					$('#'+deviceId).remove();
					alert(data.alert)
				}else{
					alert(data.alert)
				}
			}
		});
		console.log(device.attr("data-device"));
	}
}