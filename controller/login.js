var express = require('express');
var session = require('express-session');
var loginPage = express.Router();
var shortid = require('shortid');
var userDB = require('../model/User');
var Client = require('../routes/connectMosca');

// var sess;
var client;

loginPage.get('/', function(req, res){
  if(req.session.email){
    res.redirect('/user');
  	// res.render('user', {session: req.session});
  	console.log(req.session.email);
  }else{
  	res.render('login');
  }
  console.log("/loginPage Session : \n");
  console.log(req.session);
});

loginPage.get('/logout', function(req, res){
  console.log("/loginPage/logout Session : \n");
  console.log(req.session);
  console.log(client);
  if(!req.session.client_status && req.session.client_status != undefined){
    Client.close_connection(client);
    req.session.destroy();
    res.redirect('/loginPage');
  }else{
    res.redirect('/loginPage');
  }
	console.log("destroy session successful");
});

loginPage.post('/login', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;

  userDB.find({'email': email ,'password': pass}, function(err,userData){
    if(userData.length != 0){
      // sess = req.session;
      var usernameBroker = userData[0].username_broker;
      var passwordBroker = userData[0].password_broker;
      client = Client.connectMosca(usernameBroker,passwordBroker);
      module.exports.client_user = client;

      req.session.email = email;
      req.session.client_status = client.disconnecting;
      res.send(["Login successful : " + req.session.email , true]);
    
      console.log("/loginPage/login Session : \n")
      console.log(req.session);
    }else{
      res.send(['Login fail', false]);
    }
  });
});


loginPage.post('/regis', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;
  var limit = req.body.package;

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
								   limit_connection: limit
								});

	  	register.save(function (err){
		  	if (err) {
          console.log(['Register fail' , false]);
		  		res.send(['Register fail' , false]);
		  	}else{
          console.log('Reigister success');
          res.send(['Register successful.' , true]);
        }
	  	});
  	}
  });

  console.log(email);
  console.log(pass);
  // console.log(username_bk);
  // console.log(password_bk);

  
});

module.exports = loginPage;
