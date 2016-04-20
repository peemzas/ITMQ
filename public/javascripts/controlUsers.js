$(document).ready(function(){
	$('#saveDevice').on('click', function(){
		var projectId = $('#saveDevice').attr('data-projectId');
		var deviceType = $('.deviceType:checked').val();
		var category = $('.Category:checked').val();

		if($('#deviceName').val() == '' || $('#deviceDescription').val() == ''){
			alert('Please fill your device name and device description.')
		}else{
			$.ajax({
				type: 'POST',
				url: '/user/addDevice',
				data:{
					projectId: projectId,
					deviceName: $('#deviceName').val(),
					deviceDescription: $('#deviceDescription').val(),
					deviceType: deviceType,
					category: category
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
						$('#allDevices_panel').append('<div id='+data.deviceId+' class="col-md-4 col-sm-6 col-dashboard">'+
														'<div class="panel panel-default panel-device panel-hover">'+
															'<div class="panel-heading panel-head-device">'+
																'<form method="post" action="/user/device">'+
																	'<div class="row">'+
																		'<button id="deleteDeviceButton" type="button" aria-hidden="true" onclick="deleteDevice($(this))" data-deviceid="'+data.deviceId+'" class="close close-icon">×</button>'+
																		'<i id="editDevice" onclick="editDevice($(this))" data-deviceid="'+data.deviceId+'" data-devicename="'+data.deviceName+'" data-devicedescription="'+data.deviceDescription+'" class="mdi mdi-settings edit-icon"></i>'+
																		'<i id="showStatus" data-toggle="tooltip" data-deviceId="'+data.deviceId+'" data-placement="right" data-original-title="Disconnected" class="mdi mdi-brightness-1 show-status disconnected"></i>'+
																		'<label class="device-type">'+data.deviceType+'</label>'+			 // << type is here!!!
																	'</div>'+
																	'<div class="row">'+
																		'<div class="col-md-12">'+
																			'<input type="hidden" name="deviceId" value="'+data.deviceId+'" data-projectName="'+data.deviceName+'" data-projectDescription="'+data.deviceDescription+'">'+
																			'<button type="submit" class="btn-deviceName"><p class="p-device-name ellipsis deviceName">'+data.deviceName+'</p></button>'+
																		'</div>'+
																	'</div>'+
																'</form>'+
															'</div>'+
															'<div class="panel-body panel-des-device">'+
																'<div class="row">'+
																	'<div class="col-md-12">'+
																		'<label>Client ID : '+data.deviceId+'</label>'+
																	'</div>'+
																'</div>'+
																'<div class="row">'+
																	'<div class="col-md-12">'+
																		'<label class="ellipsis p-device-des deviceDescription">Description : '+data.deviceDescription+'</label>'+
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
						$('#allProjects_panel').append('<div id='+data.projectId+' class="col-md-4 col-sm-6 col-dashboard">'+
															'<div class="panel panel-default panel-project panel-hover">'+
																'<div class="panel-heading panel-head-project">'+
																	'<form method="post" action="/user/project">'+
																		'<div class="row">'+
																			'<button id="deleteProjectButton" type="button" aria-hidden="true" onclick="deleteProject($(this))" data-projectid="'+data.projectId+'" class="close close-icon">×</button>'+
																			'<i id="editProject" onclick="editProject($(this))" data-projectid="'+data.projectId+'" data-projectname="'+data.projectName+'" data-projectdescription="'+data.projectDescription+'" class="mdi mdi-settings edit-icon"></i>'+
																		'</div>'+
																		'<div class="row">'+
																			'<div class="col-md-12">'+
																				'<input type="hidden" name="projectId" value="'+data.projectId+'" data-projectName="'+data.projectName+'" data-projectDescription="'+data.projectDescription+'">'+
																				'<button type="submit" class="btn-projectName">'+
																					'<p class="p-project-name ellipsis projectName">'+data.projectName+'</p>'+
																				'</button>'+
																			'</div>'+
																		'</div>'+
																	'</form>'+
																'</div>'+
																'<div class="panel-body panel-des-project">'+
																	'<div class="row">'+
																		'<div class="col-xs-5">'+
																			'<label>Thing :</label>'+
																		'</div>'+
																		'<div class="col-xs-7">'+
																			'<label>0</label>'+
																		'</div>'+
																	'</div>'+
																	'<label class="ellipsis p-project-des projectDescription">'+data.projectDescription+'</label>'+
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

// This fucntion for edit Project name and description in ProjectPage

// function editProjectDevicePage(project){
// 	var projectId = project.attr('data-projectId');
// 	var projectName = project.attr('data-projectName');
// 	var projectDescription = project.attr('data-projectDescription');
// 	var editProjectName = $("#"+projectId).find(".btn-projectName");
// 	var editProjectDescription = $("#"+projectId).find(".projectDescription");
// 	var editProjectButton = $("#"+projectId).find("#editProject");
// 	var rowProject = $("#"+projectId).find("#rowProject");

// 	rowProject.prepend('<button id="cancleProjectButton" type="button" aria-hidden="true" onclick="cancleEditProjectDevicePage($(this))" data-projectId="'+projectId+'" class="close close-icon">×</button>')
// 	editProjectName.replaceWith('<input type="text" class="form-control editProjectName input-edit-name" data-projectid="'+projectId+'" value="'+projectName+'"/>');
// 	editProjectDescription.replaceWith('<input type="text" class="form-control editProjectDescription input-edit-des" data-projectid="'+projectId+'"  value="'+projectDescription+'"/>');
// 	editProjectButton.removeClass('mdi-settings');
// 	editProjectButton.addClass('mdi-done-all');
// 	editProjectButton.attr('onclick','saveEditProject($(this))');
// }

// function cancleEditProjectDevicePage(project){
// 	var projectId = project.attr('data-projectId');
// 	var projectName = $("#"+projectId).find("input[type = hidden]").attr('data-projectName');
// 	var projectDescription = $("#"+projectId).find("input[type = hidden]").attr('data-projectDescription');

// 	var editProjectName = $("#"+projectId).find(".editProjectName");
// 	var editProjectDescription = $("#"+projectId).find(".editProjectDescription");
// 	var editProjectButton = $("#"+projectId).find("#editProject");
// 	var cancleButton = $("#"+projectId).find("#cancleProjectButton");
// 	console.log('click');

// 	editProjectName.replaceWith('<button class="btn-projectName" type="submit" style="height: auto; min-height: 90px">'+ 
// 																			'<h2 class="projectName break-word" style="height: 100%">'+projectName+'</h2>'+
// 																		'</button>');
// 	editProjectDescription.replaceWith('<label class="projectDescription panel-des-project break-word">'+projectDescription+'</label>');
// 	editProjectButton.removeClass('mdi-done-all');
// 	editProjectButton.addClass('mdi-settings');
// 	editProjectButton.attr('onclick','editProjectDevicePage($(this))');

// 	console.log(projectId)
// 	console.log(projectName)
// 	console.log(projectDescription)
// 	console.log(editProjectName)
// 	console.log(editProjectDescription)
// 	console.log(editProjectButton)
// 	console.log(cancleButton)
// 	cancleButton.remove();
// }

function editProject(project){
	var projectId = project.attr('data-projectId');
	var projectName = project.attr('data-projectName');
	var projectDescription = project.attr('data-projectDescription');
	var editProjectName = $("#"+projectId).find(".btn-projectName");
	var editProjectDescription = $("#"+projectId).find(".projectDescription");
	var editProjectButton = $("#"+projectId).find("#editProject");
	var deleteProjectButton = $("#"+projectId).find("#deleteProjectButton");

	editProjectName.replaceWith('<input type="text" class="form-control editProjectName input-edit-name" data-projectid="'+projectId+'" value="'+projectName+'"/>');
	editProjectDescription.replaceWith('<input type="text" class="form-control editProjectDescription input-edit-des" data-projectid="'+projectId+'"  value="'+projectDescription+'"/>');
	editProjectButton.removeClass('mdi-settings');
	editProjectButton.addClass('mdi-done-all');
	editProjectButton.attr('onclick','saveEditProject($(this))');
	deleteProjectButton.attr('onclick','cancleEditProject($(this))');
	

	$("#"+projectId).find(".editProjectName").focus();
}

function cancleEditProject(project){
	var projectId = project.attr('data-projectId');
	var projectName = $("#"+projectId).find("input[type = hidden]").attr('data-projectName');
	var projectDescription = $("#"+projectId).find("input[type = hidden]").attr('data-projectDescription');

	var editProjectName = $("#"+projectId).find(".editProjectName");
	var editProjectDescription = $("#"+projectId).find(".editProjectDescription");
	var editProjectButton = $("#"+projectId).find("#editProject");
	var cancleButton = $("#"+projectId).find("#deleteProjectButton");

	editProjectName.replaceWith('<button class="btn-projectName" type="submit">'+ 
																			'<h2 class="projectName ellipsis">'+projectName+'</h2>'+
																		'</button>');
	editProjectDescription.replaceWith('<label class="projectDescription panel-des-project ellipsis fontDes">Description : '+projectDescription+'</label>');
	editProjectButton.removeClass('mdi-done-all');
	editProjectButton.addClass('mdi-settings');
	editProjectButton.attr('onclick','editProject($(this))');
	cancleButton.attr('onclick','deleteProject($(this))');
}

function saveEditProject(project){
	var projectId = project.attr('data-projectId');
	var projectName = $("#"+projectId).find("input[type = hidden]");
	var projectDescription = $("#"+projectId).find("input[type = hidden]");
	var editProjectName = $("#"+projectId).find(".editProjectName");
	var editProjectDescription = $("#"+projectId).find(".editProjectDescription");
	var editProjectButton = $("#"+projectId).find("#editProject");
	var cancleButton = $("#"+projectId).find("#deleteProjectButton");

	console.log(projectId);
	console.log(editProjectName.val());
	console.log(editProjectDescription.val());
	if(editProjectName.val() == '' || editProjectDescription.val() == ''){
		alert('Please fill your project name and project description.');
	}else if(allLetter(editProjectName.val()) && allLetter(editProjectDescription.val())){
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
					projectName.attr('data-projectName', data.editProjectName);
					projectDescription.attr('data-projectDescription', data.editProjectDescription);
					editProjectName.replaceWith('<button class="btn-projectName" type="submit">'+ 
																				'<p class="p-project-name projectName ellipsis">'+data.editProjectName+'</p>'+
																			'</button>');
					editProjectDescription.replaceWith('<p class="projectDescription ellipsis p-project-des">Description : '+data.editProjectDescription+'</p>');
					editProjectButton.removeClass('mdi-done-all');
					editProjectButton.addClass('mdi-settings');
					editProjectButton.attr('onclick','editProject($(this))');
					cancleButton.attr('onclick','deleteProject($(this))');

					alert(data.alert);
					console.log(data.editProjectName);
					console.log(data.editProjectDescription);
				}else{
					alert(data.alert);
				}
			}
		});
	}
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
					alert(data.alert);
					socket.emit("closeConnect", deviceId);
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
	var deleteDeviceButton = $("#"+deviceId).find("#deleteDeviceButton");
	
	editDeivceName.replaceWith('<input type="text" class="form-control editDeivceName input-edit-name" data-deviceId="'+deviceId+'" value="'+deviceName+'"/>');
	editDeivceDescription.replaceWith('<input type="text" class="form-control editDeivceDescription input-edit-des" data-deviceId="'+deviceId+'" value="'+deviceDescription+'"/>');
	editDeivceButton.removeClass('mdi-settings');
	editDeivceButton.addClass('mdi-done-all');
	editDeivceButton.attr('onclick','saveEditDevice($(this))');
	deleteDeviceButton.attr('onclick','cancleEditDevice($(this))');

}

function cancleEditDevice(device){
	var deviceId = device.attr('data-deviceId');
	var deviceName = $("#"+deviceId).find("input[type = hidden]").attr('data-deviceName');
	var deviceDescription = $("#"+deviceId).find("input[type = hidden]").attr('data-deviceDescription');

	var editDeivceName = $("#"+deviceId).find(".editDeivceName");
	var editDeivceDescription = $("#"+deviceId).find(".editDeivceDescription");
	var editDeivceButton = $("#"+deviceId).find("#editDevice");
	var cancleButton = $("#"+deviceId).find("#deleteDeviceButton");

	editDeivceName.replaceWith('<button class="btn-deviceName" type="submit">'+ 
																				'<h2 class="deviceName ellipsis">'+deviceName+'</h2>'+
																			'</button>');
	editDeivceDescription.replaceWith('<label class="deviceDescription panel-des-project ellipsis fontDes">Description : '+deviceDescription+'</label>');
	editDeivceButton.removeClass('mdi-done-all');
	editDeivceButton.addClass('mdi-settings');
	editDeivceButton.attr('onclick','editDevice($(this))');
	cancleButton.attr('onclick','deleteDevice($(this))');

}

function saveEditDevice(device){
	var deviceId = device.attr('data-deviceId');
	var deviceName = $("#"+deviceId).find("input[type = hidden]");
	var deviceDescription = $("#"+deviceId).find("input[type = hidden]");

	var editDeivceName = $("#"+deviceId).find(".editDeivceName");
	var editDeivceDescription = $("#"+deviceId).find('.editDeivceDescription');
	var editDeivceButton = $("#"+deviceId).find("#editDevice");
	var cancleButton = $("#"+deviceId).find("#deleteDeviceButton");

	if(editDeivceName.val() == '' || editDeivceDescription.val() == ''){
		alert('Please fill your device name and device description.')
	}else if(allLetter(editDeivceName.val()) && allLetter(editDeivceDescription.val())){
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
					deviceName.attr('data-deviceName', data.editDeivceName);
					deviceDescription.attr('data-deviceDescription', data.editDeivceDescription);

					editDeivceName.replaceWith('<button class="btn-deviceName" type="submit">'+ 
																				'<h2 class="deviceName ellipsis">'+data.editDeivceName+'</h2>'+
																			'</button>');
					editDeivceDescription.replaceWith('<label class="deviceDescription panel-des-project ellipsis fontDes">Description : '+data.editDeivceDescription+'</label>');
					editDeivceButton.removeClass('mdi-done-all');
					editDeivceButton.addClass('mdi-settings');
					editDeivceButton.attr('onclick','editDevice($(this))');
					cancleButton.attr('onclick','deleteDevice($(this))');

					alert(data.alert);
					console.log(data.editDeivceName);
					console.log(data.editDeivceDescription);
				}else{
					alert(data.alert);
				}
			}
		});
	}

	console.log('Save button');
	console.log(deviceId);
	console.log(editDeivceName);
	console.log(editDeivceDescription);
}

function allLetter(inputtxt){  
	var letters = /^[A-Za-z0-9\s]+$/;  
	if(inputtxt.match(letters)){  
		return true;  
	}else{  
		alert('Please input alphabet characters only');  
		return false;  
	}  
}