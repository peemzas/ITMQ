var express = require('express');
var signupPage = express.Router();
var session = require('express-session');
var shortid = require('shortid');
var userDB = require('../model/User');

/* GET users listing. */
signupPage.get('/', function(req, res, next) {
  res.render('signup', {session: req.session});
});

signupPage.post('/', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;
  // var limit = req.body.package;

  userDB.count({'email': email},function (err,col){
  	if(col>0){
  		res.send(['This email exits' , false]);
  	}else{
  		var username_bk = shortid.generate();
  		var password_bk = shortid.generate();
  		var register = new userDB ({ email: email ,
								   password: pass ,
								   username_broker: username_bk ,
								   password_broker: password_bk ,
								   limit_connection: 10
								});

	  	register.save(function (err){
		  	if (err) {
          console.log('Register fail');
		  		res.send({alert: 'Register fail.' , status: false});
		  	}else{
          console.log('Reigister success');
          res.send({alert: 'Register successful.' , status: true});
        }
	  	});
  	}
  });

  console.log(email);
  console.log(pass);
  // console.log(username_bk);
  // console.log(password_bk);

  
});

module.exports = signupPage;
