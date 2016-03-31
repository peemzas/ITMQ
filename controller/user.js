var express = require('express');
var userPage = express.Router();
var session = require('express-session');
var userDB = require('../model/User');
var Client = require('./login.js');

/* GET users listing. */
userPage.get('/', function(req, res, next) {
  var user = req.session.email;
  if(user){
  	userDB.find({'email': user}, function(err,userData){
  		var usernameBroker = userData[0].username_broker;
  		var passwordBroker = userData[0].password_broker;
      
  		res.render('user', {session: req.session, usernameBroker: usernameBroker, passwordBroker: passwordBroker});
  	  console.log("/user Session : \n")
      console.log(Client.client_user); 
    });
  }else{
  	res.redirect('/loginPage');
  }
});

userPage.post('/addDevice', function(req,res,next){
  var user = req.session.email;
  var deviceName = req.body.deviceName;
  var deviceId = req.body.clientId;
  var deviceDescription = req.body.deviceDescription;

  userDB.find({'email': user}, function(err,userData){
    console.log(userData);
    var total_limit = userData[0].limit_connection - 1; 
    userDB.update({'email': user},{devices: [{device_id: deviceId}],limit_connection: total_limit},
                  {upsert: true}, 
                  function(err){
                    if(err){
                      res.send(['Add device fail', false]);
                    }else{
                      res.send(['Add device success', true]);
                    }
                  });
  });

});

module.exports = userPage;
