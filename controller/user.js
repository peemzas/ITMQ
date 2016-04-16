var express = require('express');
var userPage = express.Router();
var session = require('express-session');
var randtoken = require('rand-token');
var userDB = require('../model/User');
var messageDB = require('../model/Message');
var io = require('socket.io-client');
var socket = io.connect('http://neutron.it.kmitl.ac.th:5000',{reconnect: true});
// var Client = require('./login.js');
var currentSubscribe = [];

socket.on('connect', function(socket) {
    console.log('Socket Connected! from nodejs /user');
});

socket.on('subtopic', function(data){
  console.log("on sub : ");
  console.log(data);
  currentSubscribe.push(data);
  console.log(currentSubscribe);
})

socket.on('unsubtopic', function(data){
  console.log("on unsub : ");
  console.log(currentSubscribe);
  console.log(data);
  var index = currentSubscribe.map(function(e) { return (e.deviceId==data.deviceId && e.topic==data.topic) ? data.topic : null; }).indexOf(data.topic);
  console.log(index);
  if(index != -1){
    currentSubscribe.splice(index,1);
    console.log(currentSubscribe);
  }
  // console.log("on unsub : ");
  // console.log(data);
})

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

userPage.get('/project',function(req,res,next){
  var user = req.session.email;
  if(user){
    res.redirect('/user');
  }else{
    res.redirect('/loginPage');
  }
})

userPage.get('/device',function(req,res,next){
  var user = req.session.email;
  if(user){
    res.redirect('/user');
  }else{
    res.redirect('/loginPage');
  }
})

userPage.post('/project', function(req,res,next){
  var user = req.session.email;
  var projectId = req.body.projectId;
  var usernameBroker;
  var passwordBroker;
  if(user){
    userDB.find({'email': user}, function(err,userData){
      usernameBroker = userData[0].username_broker;
      passwordBroker = userData[0].password_broker;
    })

    userDB.find({'email': user, 'devices.project_id': projectId}, function(err,userData){
      if(userData.length > 0) {
        var allDevices = userData[0].devices;
      }else{
        var allDevices = [];
      }

      userDB.find({'email': user, 'projects.project_id': projectId}, function(err, projectData){
        for (var i = 0; i < projectData[0].projects.length; i++) {
          if(projectData[0].projects[i].project_id == projectId){
            var projectName = projectData[0].projects[i].project_name;
            var projectDescription = projectData[0].projects[i].project_description;
          }
        }

        res.render('project', {session: req.session, usernameBroker: usernameBroker,
                  passwordBroker: passwordBroker, allDevices: allDevices, projectId: projectId, projectName: projectName, projectDescription: projectDescription});

      })

    })
  }else{
    res.redirect('/loginPage');
  }
})

userPage.post('/device', function(req,res,next){
  var user = req.session.email;
  var deviceId = req.body.deviceId;
  var subscribe;
  if(user){
    userDB.find({'email': user ,'devices.device_id': deviceId}, function(err, userData){
      for (var i = 0; i < userData[0].devices.length; i++) {
        if(userData[0].devices[i].device_id == deviceId){
          var deviceName = userData[0].devices[i].device_name;
          var deviceType = userData[0].devices[i].device_type;
          var deviceStatus = userData[0].devices[i].status;
          subscribe = userData[0].devices[i].subscribe;
        }
      }

      if(deviceType == 'publisher'){
        messageDB.find({'email': user, device_id: deviceId}, function(err,messageData){
          var allMessage = messageData;
          res.render('device', {session: req.session, deviceType:deviceType, deviceName: deviceName, deviceId: deviceId, allMessage: allMessage, subscribe: subscribe, deviceStatus: deviceStatus});
          // console.log(messageData);
        })
      }else if(deviceType == 'subscriber'){
        messageDB.find({'email': user, 'topic':{$in: subscribe}}, function(err,messageData){
          console.log('messageData : '+messageData.length);
          var allMessage = messageData;
          res.render('device', {session: req.session, deviceType:deviceType, deviceName: deviceName, deviceId: deviceId, allMessage: allMessage, subscribe: subscribe, deviceStatus: deviceStatus});
        })
      }else{
        var allMessage = {};
        messageDB.find({'email': user, device_id: deviceId}, function(err,messageData){
          allMessage['publish'] = messageData;
          // console.log(allMessage);
          // console.log(allMessage);

          messageDB.find({'email': user, 'topic':{$in: subscribe}}, function(err,messageData){
            allMessage['subscribe'] = messageData;
            res.render('device', {session: req.session, deviceType:deviceType, deviceName: deviceName, deviceId: deviceId, allMessage: allMessage, subscribe: subscribe, deviceStatus: deviceStatus});
            console.log(allMessage['subscribe'].length);
          })
        })
      }

      // console.log(subscribe);
      // if(deviceType == 'publisher'){
      //   messageDB.find({'email': user, device_id: deviceId}, function(err,messageData){
      //     var allMessage = messageData;
      //     res.render('device', {session: req.session, deviceType:deviceType, deviceName: deviceName, deviceId: deviceId, allMessage: allMessage, subscribe: subscribe, deviceStatus: deviceStatus});
      //     console.log(messageData);
      //   })
      // }else if(deviceType == 'subscriber'){
      //   messageDB.find({'email': user, device_id: deviceId}, function(err,messageData){
      //     var allMessage = messageData;
      //     res.render('device', {session: req.session, deviceType:deviceType, deviceName: deviceName, deviceId: deviceId, allMessage: allMessage, subscribe: subscribe, deviceStatus: deviceStatus});
      //     console.log(messageData)
      //   })
      // }
    })
  }else{
    res.redirect('/loginPage');
  }
})

userPage.post('/getSubscribe', function(req,res,next){
  var user = req.session.email;
  var deviceId = req.body.deviceId;
  var subscribe = [];
  for (var i = 0; i < currentSubscribe.length; i++){
    if(currentSubscribe[i].deviceId == deviceId){
      subscribe.push(currentSubscribe[i].topic);
      console.log(subscribe);
    }
  }
  res.send({subscribe: subscribe});
})

// userPage.post('/addMessage', function(req,res,next){
//   socket.on()
//   var user = req.session.email;
//   var deviceId = req.body.deviceId;
//   var topic = req.body.topic;
//   var payload = req.body.payload;

//   userDB.find({email:user , "devices.device_id": deviceId}, {"devices.device_id.$": deviceId}, function(err,deviceData){
//     if(deviceData.length > 0){
//       var newMessage = new messageDB ({ email: user ,
//                  project_id: deviceData[0].devices[0].project_id ,
//                  device_id: deviceId ,
//                  topic: topic ,
//                  payload: payload,
//                  type: 'Subscribe'
//               });

//       newMessage.save(function (err){
//         if (err) {
//           res.send('add newMessage fail');
//         }else{
//           res.send('add newMessage success');
//         }
//       });
//     }
//   })
// })

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
  var total_limit = 0;

  userDB.find({'email': user, 'devices.project_id': projectId},{'devices.project_id':1}, function(err,userData){
    if(userData.length > 0){
      for (var i = 0; i < userData[0].devices.length; i++) {
        if(userData[0].devices[i].project_id == projectId){
          total_limit++;
          console.log('total : '+total_limit);
        }
      }
      console.log(userData);

      userDB.update({'email': user},{$inc:{limit_connection: total_limit}}, function(err){
        console.log(err);
      });
    }
    
    userDB.update({'email': user},{$pull:{projects:{project_id: projectId}, devices:{project_id: projectId}}}, function(err){
      if(err){
        res.send({alert: 'Delete Project fail', deleteStatus: false});
      }else{
        res.send({alert: 'Delete Project success', deleteStatus: true});
      }
    });
  })
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
  var deviceType = req.body.deviceType;

  userDB.find({'email': user}, function(err,userData){
    // console.log(userData);
    userDB.count({'email': user, devices:{ $elemMatch: {device_id: deviceId}}},function(err,col){
      if(col>0){
        res.send({alert: 'This ClientId exits.', addStatus: false});
      }else{
        var total_limit = userData[0].limit_connection;
        console.log(total_limit);
        if(total_limit > 0){
          console.log(total_limit);
          userDB.update({'email': user},{$push:{devices:{project_id: projectId,
                      device_id: deviceId,
                      device_name: deviceName, 
                      device_description:deviceDescription,
                      device_type: deviceType,
                      status: 'disconnect'}},
                      limit_connection: total_limit-1}, 
                      function(err){
                        if(err){
                          res.send({alert: 'Add device fail', addStatus: false});
                        }else{
                          res.send({alert: 'Add device success', addStatus: true, deviceName: deviceName, 
                                    deviceDescription: deviceDescription, status: 'disconnect', deviceId: deviceId});
                        }
                      });
        }else{
          res.send({alert: 'Limit Devices', addStatus: false});
        }
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
