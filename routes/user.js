var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');

var userDB = mongoose.model('user');

/* GET users listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
