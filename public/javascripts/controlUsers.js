$(document).ready(function(){
	$('#saveDevice').on('click', function(){
		var projectId = $('#saveDevice').attr('data-projectId');
		var deviceType = $('.deviceType:checked').val();

		if($('#deviceName').val() == '' || $('#deviceDescription').val() == ''){
			alert('Please fill your device name or device description.')
		}else{
			$.ajax({
				type: 'POST',
				url: '/user/addDevice',
				data:{
					projectId: projectId,
					deviceName: $('#deviceName').val(),
					deviceDescription: $('#deviceDescription').val(),
					deviceType: deviceType
				},
				success: function(data){
					console.log(data);
					if(data.addStatus){
						// $('#allDevices_panel').append('<div id='+data.deviceId+' class="col-md-4">'+
				  //           								'<div class="panel panel-default">'+
				  //               							'<div class="panel-heading">'+
				  //               								'<div class="row">'+
				  //               									'<form class="col-md-8" method="post" action="/user/device">'+
				  //               										'<input type="hidden" name="deviceId" value="'+data.deviceId+'"/>'+
					 //                									'<button type="submit" class="btn-deviceName">'+
					 //                    								'<h3 class="deviceName">'+data.deviceName+'</h3>'+
					 //                    							'</button>'+
					 //                    						'</form>'+
				  //                   							'<div class="col-md-4" style="text-align: right; display: block">'+
				  //                   								'<button class="btn btn-raised btn-xs" id="editDevice" type="button" style="margin: 10px 10px 10px 10px"'+
				  //                   								' data-deviceId="'+data.deviceId+'"'+
				  //                   								' data-deviceName="'+data.deviceName+'"'+
				  //                   								' data-deviceDescription="'+data.deviceDescription+'"'+
				  //                   								' onclick="editDevice($(this))"> Edit </button>'+
				  //                   								'<button type="button" aria-hidden="true" onclick="deleteDevice($(this))" data-deviceId="'+data.deviceId+'" class="close">×</button>'+
				  //                   							'</div>'+
				  //                   						'</div>'+
				  //               							'</div>'+
				  //               							'<div class="panel-body">'+
				  //               								'<label>Status :'+
				  //                   								'<label data-device='+data.deviceId+'>'+data.status+"</label>"+
				  //                   						"</label>"+
				  //                   						'<br>'+
				  //               								'<label>ClientId : '+data.deviceId+'</label>'+
				  //               								'<br>'+
				  //               								'<label class="deviceDescription">'+data.deviceDescription+'</label>'+
				  //               							'</div>'+
				  //           								'</div>'+
				  //       									'</div>');
						$('#allDevices_panel').append('<div id='+data.deviceId+' class="col-md-4 col-dashboard">'+
														'<div class="panel panel-default panel-device panel-hover">'+
															'<div class="panel-heading panel-head-device">'+
																'<form method="post" action="/user/device">'+
																	'<div class="row">'+
																		'<button type="button" aria-hidden="true" onclick="deleteDevice($(this))" data-deviceid="'+data.deviceId+'" class="close close-icon">×</button>'+
																		'<i id="editDevice" onclick="editDevice($(this))"'+
														 				'data-deviceid="'+data.deviceId+'"'+
														 				'data-devicename="'+data.deviceName+'"'+
														 				'data-devicedescription="'+data.deviceDescription+'"'+
														 				'class="mdi mdi-settings edit-icon"></i>'+
														 				'<i id="showStatus" data-toggle="tooltip" data-placement="right" data-original-title="Disconnected"'+
														 				'class="mdi mdi-brightness-1 show-status disconnected"></i>'+
														 				'<label class="device-type">Publisher</label>'+  // << type is here!!!
														 			'</div>'+
														 			'<div class="row">'+
														 				'<div class="col-md-12">'+
														 					'<input type="hidden" name="deviceId" value="'+data.deviceId+'">'+
														 					'<button type="submit" class="btn-deviceName"><h2 class="deviceName ellipsis ">'+data.deviceName+'</h2></button>'+
														 				'</div>'+
														 			'</div>'+
														 		'</form>'+
														 	'</div>'+
														 '<div class="panel-body panel-des-project">'+
														 	'<div class="row">'+
														 		'<div class="col-md-12">'+
														 			'<label class="fontDes"> Client ID : '+data.deviceId+'</label>'+
														 		'</div>'+
														 	'</div>'+
														 	'<div class="row">'+
														 		'<div class="col-md-12">'+
														 			'<label class="ellipsis fontDes deviceDescription">Description : '+data.deviceDescription+'</label>'+
														 		'</div>'+
														 	'</div>'+
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
		}
	})

	$('#saveProject').on('click', function(){
		if($('#projectName').val() == '' || $('#projectDescription').val() == ''){
			alert('Please fill your project name or project description.')
		}else{
			$.ajax({
			type: "POST",
			url: "/user/addProject",
			data:{
				projectName: $('#projectName').val(),
				projectDescription: $('#projectDescription').val()
			},
			success: function(data){
				console.log(data);
					if(data.addStatus){
						// $('#allProjects_panel').append('<div id='+data.projectId+' class="col-md-4">'+
				  //           								'<div class="panel panel-default">'+
				  //               							'<div class="panel-heading">'+
				  //               								'<div class="row">'+
				  //               									'<form class="col-md-8" method="post" action="/user/project">'+
				  //               										'<input type="hidden" name="projectId" value="'+data.projectId+'"/>'+
					 //                									'<button type="submit" class="btn-projectName">'+
					 //                    								'<h3 class="projectName">'+data.projectName+'</h3>'+
					 //                    							'</button>'+
					 //                    						'</form>'+
				  //                   							'<div class="col-md-4" style="text-align: right; display: block">'+
				  //                   								'<button class="btn btn-raised btn-xs" id="editProject" type="button" style="margin: 10px 10px 10px 10px"'+
				  //                   								' data-projectId="'+data.projectId+'"'+
				  //                   								' data-projectName="'+data.projectName+'"'+
				  //                   								' data-projectDescription="'+data.projectDescription+'"'+
				  //                   								' onclick="editProject($(this))"> Edit </button>'+
				  //                   								'<button type="button" aria-hidden="true" onclick="deleteProject($(this))" data-projectId="'+data.projectId+'" class="close">×</button>'+
				  //                   							'</div>'+
				  //                   						'</div>'+
				  //               							'</div>'+
				  //               							'<div class="panel-body">'+
				  //               								'<label class="projectDescription">'+data.projectDescription+'</label>'+
				  //               							'</div>'+
				  //           								'</div>'+
				  //       									'</div>');
						$('#allProjects_panel').append('<div id='+data.projectId+' class="col-md-4 col-dashboard">'+
															'<div class="panel panel-default panel-project panel-hover">'+
															'<div class="panel-heading panel-head-project">'+
																'<form method="post" action="/user/project">'+
																	'<div class="row">'+
																		'<button type="button" aria-hidden="true" onclick="deleteProject($(this))" data-projectid="'+data.projectId+'" '+
																		'class="close close-icon">×</button>'+
																		'<i id="editProject" onclick="editProject($(this))" data-projectid="'+data.projectId+'" '+data.projectName+'" '+
																		'data-projectdescription="'+data.projectDescription+'" '+
																		'class="mdi mdi-settings edit-icon"></i>'+
																	'</div>'+
																	'<div class="row">'+
																		'<div class="col-md-12">'+
																			'<input type="hidden" name="projectId" value="'+data.projectId+'">'+
																			'<button type="submit" class="btn-projectName">'+
																			'<h2 class="projectName ellipsis">'+data.projectName+'</h2>'+
																		'</button>'+
																		'</div>'+
																	'</div>'+
																	'</form>'+
																'</div>'+
																'<div class="panel-body">'+
																	'<label class="projectDescription panel-des-project ellipsis">'+data.projectDescription+'</label>'+
																	'<div class="row">'+
																		'<div class="col-md-5">'+
																			'<label>Thing :</label>'+
																		'</div>'+
																		'<div class="col-md-7">'+
																			'<label>(No. of Thing)</label>'+
																		'</div>'+
																	'</div>'+
																'</div>'+
															'</div>'+
															'</div>');
						alert(data.alert)
						$('#saveProjectModal').modal('hide');
						// window.location.reload();
					}else{
						alert(data.alert)
					}
				}
			})
		}
	})

});

function deleteProject(project){
	var projectId = project.attr('data-projectId');
	console.log(projectId);
	var deleteConfirm = confirm('Are you sure to delete this project?');
	console.log(deleteConfirm);

	if(deleteConfirm){
		// console.log(deleteConfirm);
		$.ajax({
			type: 'POST',
			url: '/user/deleteProject',
			data: {
				projectId: projectId
			},
			success: function(data){
				if(data.deleteStatus){
					$('#'+projectId).remove();
					alert(data.alert)
				}else{
					alert(data.alert)
				}
			}
		});
	}
}

function editProject(project){
	var projectId = project.attr('data-projectId');
	var projectName = project.attr('data-projectName');
	var projectDescription = project.attr('data-projectDescription');
	var editProjectName = $("#"+projectId).find(".btn-projectName");
	var editProjectDescription = $("#"+projectId).find(".projectDescription");
	var editProjectButton = $("#"+projectId).find("#editProject");

	editProjectName.replaceWith('<input type="text" class="form-control editProjectName input-edit-name" value="'+projectName+'"/>');
	editProjectDescription.replaceWith('<input type="text" class="form-control editProjectDescription input-edit-des" value="'+projectDescription+'"/>');
	editProjectButton.removeClass('mdi-settings');
	editProjectButton.addClass('mdi-done-all');
	editProjectButton.attr('onclick','saveEditProject($(this))');
}

function saveEditProject(project){
	var projectId = project.attr('data-projectId');
	var editProjectName = $("#"+projectId).find(".editProjectName");
	var editProjectDescription = $("#"+projectId).find(".editProjectDescription");
	var editProjectButton = $("#"+projectId).find("#editProject");

	console.log(projectId);
	console.log(editProjectName.val());
	console.log(editProjectDescription.val());

	$.ajax({
		type: "POST",
		url: "/user/editProject",
		data: {
			projectId: projectId,
			editProjectName: editProjectName.val(),
			editProjectDescription: editProjectDescription.val()
		},
		success: function(data){
			if(data.editStatus){
				project.attr('data-projectName', data.editProjectName);
				project.attr('data-projectDescription', data.editProjectDescription);
				editProjectName.replaceWith('<button class="btn-projectName" type="submit">'+ 
																			'<h2 class="projectName ellipsis">'+data.editProjectName+'</h2>'+
																		'</button>');
				editProjectDescription.replaceWith('<label class="projectDescription panel-des-project ellipsis fontDes">Description : '+data.editProjectDescription+'</label>');
				editProjectButton.removeClass('mdi-done-all');
				editProjectButton.addClass('mdi-settings');
				editProjectButton.attr('onclick','editProject($(this))');

				alert(data.alert);
				console.log(data.editProjectName);
				console.log(data.editProjectDescription);
			}else{
				alert(data.alert);
			}
		}
	});
}

function deleteDevice(device){
	var deviceId = device.attr('data-deviceId');
	var deleteConfirm = confirm('Are you sure to delete this device?');
	if(deleteConfirm){
		$.ajax({
			type: 'POST',
			url: '/user/deleteDevice',
			data: {
				deviceId: deviceId
			},
			success: function(data){
				if(data.deleteStatus){
					$('#'+deviceId).remove();
					alert(data.alert)
				}else{
					alert(data.alert)
				}
			}
		});
		console.log(device.attr("data-deviceId"));
	}
}

function editDevice(device){
	var deviceId = device.attr('data-deviceId');
	var deviceName = device.attr('data-deviceName');
	var deviceDescription = device.attr('data-deviceDescription');
	var editDeivceName = $("#"+deviceId).find(".btn-deviceName");
	var editDeivceDescription = $("#"+deviceId).find('.deviceDescription');
	var editDeivceButton = $("#"+deviceId).find("#editDevice");
	
	editDeivceName.replaceWith('<input type="text" class="form-control editDeivceName input-edit-name" value="'+deviceName+'"/>');
	editDeivceDescription.replaceWith('<input type="text" class="form-control editDeivceDescription input-edit-des" value="'+deviceDescription+'"/>');
	editDeivceButton.removeClass('mdi-settings');
	editDeivceButton.addClass('mdi-done-all');
	editDeivceButton.attr('onclick','saveEditDevice($(this))');

	console.log(device.attr('data-deviceId'));
	console.log(device.attr('data-deviceName'));
	console.log(device.attr('data-deviceDescription'));
}

function saveEditDevice(device){
	var deviceId = device.attr('data-deviceId');
	var editDeivceName = $("#"+deviceId).find(".editDeivceName");
	var editDeivceDescription = $("#"+deviceId).find('.editDeivceDescription');
	var editDeivceButton = $("#"+deviceId).find("#editDevice");

	$.ajax({
		type: "POST",
		url: "/user/editDevice",
		data: {
			deviceId: deviceId,
			editDeivceName: editDeivceName.val(),
			editDeivceDescription: editDeivceDescription.val()
		},
		success: function(data){
			if(data.editStatus){
				device.attr('data-deviceName', data.editDeivceName);
				device.attr('data-deviceDescription', data.editDeivceDescription);
				editDeivceName.replaceWith('<button class="btn-deviceName" type="submit">'+ 
																			'<h2 class="deviceName ellipsis">'+data.editDeivceName+'</h2>'+
																		'</button>');
				editDeivceDescription.replaceWith('<label class="deviceDescription panel-des-project ellipsis fontDes">Description : '+data.editDeivceDescription+'</label>');
				editDeivceButton.removeClass('mdi-done-all');
				editDeivceButton.addClass('mdi-settings');
				editDeivceButton.attr('onclick','editDevice($(this))');

				alert(data.alert);
				console.log(data.editDeivceName);
				console.log(data.editDeivceDescription);
			}else{
				alert(data.alert);
			}
		}
	})
	console.log('Save button');
	console.log(deviceId);
	console.log(editDeivceName);
	console.log(editDeivceDescription);
}