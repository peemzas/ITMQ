var express = require('express');
var userPage = express.Router();
var session = require('express-session');
var userDB = require('../model/User');
var client = require('../routes/connectMosca');

/* GET users listing. */
userPage.get('/', function(req, res, next) {
  var user = req.session.email;
  if(user){
  	userDB.find({'email': user}, function(err,userData){
  		var usernameBroker = userData[0].username_broker;
  		var passwordBroker = userData[0].password_broker;
      
  		res.render('user', {session: req.session, usernameBroker: usernameBroker, passwordBroker: passwordBroker});
  	});
  }else{
  	res.redirect('/loginPage');
  }
  console.log(req.session);
});

module.exports = userPage;
