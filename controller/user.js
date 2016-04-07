var express = require('express');
var userPage = express.Router();
var session = require('express-session');
var randtoken = require('rand-token');
var userDB = require('../model/User');
// var Client = require('./login.js');

/* GET users listing. */
userPage.get('/', function(req, res, next) {
  var user = req.session.email;
  if(user){
  	userDB.find({'email': user}, function(err,userData){
  		var usernameBroker = userData[0].username_broker;
  		var passwordBroker = userData[0].password_broker;
      var allProjects = userData[0].projects;
      var allDevices = userData[0].devices;
      
  		res.render('user', {session: req.session, usernameBroker: usernameBroker,
                  passwordBroker: passwordBroker, allDevices: allDevices, allProjects: allProjects});
  	  console.log("/user Session : \n")
      // console.log(Client.client_user); 
      // console.log(allDevices);
    });
  }else{
  	res.redirect('/loginPage');
  }
});

userPage.post('/project', function(req,res,next){
  var user = req.session.email;
  var projectId = req.body.projectId;
  if(user){
    userDB.find({'email': user, 'devices.project_id': projectId}, function(err,userData){
      if(userData.length > 0) {
        var allDevices = userData[0].devices;
        console.log(userData[0].devices);
      }else{
        var allDevices = [];
      }
      res.render('project', {session: req.session, allDevices: allDevices, projectId: projectId});
    })
  }else{
    res.redirect('/loginPage');
  }
})

userPage.post('/addProject', function(req,res,next){
  var user = req.session.email;
  var projectId = randtoken.generate(16);
  var projectName = req.body.projectName;
  var projectDescription = req.body.projectDescription;

  userDB.find({'email': user}, function(err,userData){
    userDB.count({'email': user, projects:{ $elemMatch: {project_id: projectId}}},function(err,col){
      if(col>0){
        res.send({alert: 'This ProjectId exits.', addStatus: false});
      }else{
        userDB.update({'email': user},{$push:{projects:{project_id: projectId, project_name: projectName, 
                        project_description: projectDescription}}},
                        function(err){
                          if(err){
                            res.send({alert: 'Add project fail', addStatus: false});
                          }else{
                            res.send({alert: 'Add project success', addStatus: true, projectId:projectId, 
                                    projectName: projectName, projectDescription: projectDescription});
                          }
                        }); 
      }
    });
  });
});

userPage.post('/deleteProject', function(req,res,next){
  var user = req.session.email;
  var projectId = req.body.projectId;

  userDB.update({'email': user},{$pull:{projects:{project_id: projectId}}}, function(err){
    if(err){
      res.send({alert: 'Delete Project fail', deleteStatus: false});
    }else{
      res.send({alert: 'Delete Project success', deleteStatus: true});
    }
  });
});

userPage.post('/editProject', function(req,res,next){
  var user = req.session.email;
  var projectId = req.body.projectId;
  var editProjectName = req.body.editProjectName;
  var editProjectDescription = req.body.editProjectDescription;

  console.log(projectId);
  console.log(editProjectName);
  console.log(editProjectDescription);

  userDB.update({'email': user , 'projects.project_id': projectId},{$set:{'projects.$.project_name': editProjectName, 'projects.$.project_description': editProjectDescription}}, function(err){
    if(err){
      res.send({alert: 'Edit Project fail', editStatus: false});
    }else{
      res.send({alert: 'Edit Project success', editStatus: true , editProjectName: editProjectName , editProjectDescription: editProjectDescription});
    }
  });
})

userPage.post('/addDevice', function(req,res,next){
  var user = req.session.email;
  var projectId = req.body.projectId;
  var deviceName = req.body.deviceName;
  var deviceId = randtoken.generate(16);
  var deviceDescription = req.body.deviceDescription;

  userDB.find({'email': user}, function(err,userData){
    console.log(userData);
    userDB.count({'email': user, devices:{ $elemMatch: {device_id: deviceId}}},function(err,col){
      if(col>0){
        res.send({alert: 'This ClientId exits.', addStatus: false});
      }else{
        var total_limit = userData[0].limit_connection - 1; 
      userDB.update({'email': user},{$push:{devices:{project_id: projectId,
                      device_id: deviceId,
                      device_name: deviceName, 
                      device_description:deviceDescription,
                      status: 'disconnect'}},
                      limit_connection: total_limit}, 
                      function(err){
                        if(err){
                          res.send({alert: 'Add device fail', addStatus: false});
                        }else{
                          res.send({alert: 'Add device success', addStatus: true, deviceName: deviceName, 
                                    deviceDescription: deviceDescription, status: 'disconnect', deviceId: deviceId});
                        }
                      });
      }
    });
  });
});

userPage.post('/deleteDevice', function(req,res,next){
  var user = req.session.email;
  var deviceId = req.body.deviceId;

  userDB.find({'email': user}, function(err,userData){
    var total_limit = userData[0].limit_connection + 1;
    userDB.update({'email': user},{$pull:{devices:{device_id: deviceId}}, limit_connection: total_limit}, function(err){
      if(err){
        res.send({alert: 'Delete Device fail', deleteStatus: false});
      }else{
        res.send({alert: 'Delete Device success', deleteStatus: true});
      }
    });
  });
});

userPage.post('/editDevice', function(req,res,next){
  var user = req.session.email;
  var deviceId = req.body.deviceId;
  var editDeivceName = req.body.editDeivceName;
  var editDeivceDescription = req.body.editDeivceDescription;

  userDB.update({'email': user , 'devices.device_id': deviceId},{$set:{'devices.$.device_name': editDeivceName, 'devices.$.device_description': editDeivceDescription}}, function(err){
    if(err){
      res.send({alert: 'Edit Device fail', editStatus: false});
    }else{
      res.send({alert: 'Edit Device success', editStatus: true , editDeivceName: editDeivceName , editDeivceDescription: editDeivceDescription});
    }
  });                 
});

module.exports = userPage;
