var express = require('express');
var session = require('express-session');
var loginPage = express.Router();
var shortid = require('shortid');
var Col = require('../model/User');
var Client = require('../routes/connectMosca');

var sess;

loginPage.get('/', function(req, res){
  sess=req.session;
  if(sess.email){
  	res.render('user', {session: sess});
  	console.log(sess.email);
  }else{
  	res.render('login');
  }
});

loginPage.get('/logout', function(req, res){
	req.session.destroy(function (err){
		if(err){
			console.log(err);
		}else{
      if(sess.client != undefined){
        Client.close_connection(sess.client);
      }
			res.redirect('/loginPage');
			console.log(sess);
			console.log("destroy session successful");
		}
	})
});

loginPage.post('/login', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;

  Col.find({'email': email ,'password': pass}, function(err,userData){
    if(userData.length != 0){
      sess = req.session;
      sess.email = email;
      res.send(["Login successful : " + sess.email , true]);
      var usernameBroker = userData[0].username_broker;
      var passwordBroker = userData[0].password_broker;
        
      var client = Client.connectMosca(usernameBroker,passwordBroker);
      sess.client = client;
    }else{
      res.send(['Login fail', false]);
    }
  });
});


loginPage.post('/regis', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;
  var limit = req.body.package;

  Col.count({'email': email},function (err,col){
  	if(col>0){
  		res.send(['This email exits' , false]);
  	}else{
  		var username_bk = shortid.generate();
  		var password_bk = shortid.generate();
  		var register = new Col ({ email: email ,
								   password: pass ,
								   username_broker: username_bk ,
								   password_broker: password_bk ,
								   devices: [{device_id: null ,
								   			  subscribe:[],
								   			  status: null}],
								   limit_connection: limit
								});

	  	register.save(function (err){
		  	if (err) {
          console.log(['Register fail' , false]);
		  		res.send(['Register fail' , false]);
		  	}
			console.log('Reigister success');
      res.send(['Register successful.' , true]);
	  	});
  	}
  });

  console.log(email);
  console.log(pass);
  // console.log(username_bk);
  // console.log(password_bk);

  
});

module.exports = loginPage;