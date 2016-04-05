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
      var allDevices = userData[0].devices;
      
  		res.render('user', {session: req.session, usernameBroker: usernameBroker,
                  passwordBroker: passwordBroker, allDevices: allDevices});
  	  console.log("/user Session : \n")
      // console.log(Client.client_user); 
      console.log(allDevices);
    });
  }else{
  	res.redirect('/loginPage');
  }
});

userPage.post('/addDevice', function(req,res,next){
  var user = req.session.email;
  var deviceName = req.body.deviceName;
  var deviceId = randtoken.generate(16);
  var deviceDescription = req.body.deviceDescription;

  userDB.find({'email': user}, function(err,userData){
    console.log(userData);
    userDB.count({'email': user, devices:{ $elemMatch: {device_id: deviceId}}},function (err,col){
      if(col>0){
        res.send({alert: 'This ClientId exits.', addStatus: false});
      }else{
        var total_limit = userData[0].limit_connection - 1; 
      userDB.update({'email': user},{$push:{devices:{device_id: deviceId,
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
        res.send({alert: 'Delete Device fail', addStatus: false});
      }else{
        res.send({alert: 'Delete Device Success', addStatus: true});
      }
    });
  });
});

module.exports = userPage;
