var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose');
var shortid = require('shortid');

var sess;

var Col = mongoose.model('user', { email: String ,
								   password: String ,
								   username_broker: String ,
								   password_broker: String ,
								   devices: [{device_id: String ,
								   			  subscribe:[String],
								   			  status: String}],
								   limit_connection: Number
								});

router.get('/', function(req, res){
  sess=req.session;
  if(sess.email){
  	res.render('user');
  	console.log(sess.email);
  }else{
  	res.render('login');
  }
});

router.get('/logout', function(req, res){
	req.session.destroy(function (err){
		if(err){
			console.log(err);
		}else{
			res.render('index');
		}
	})
});

router.post('/login', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;

  Col.count({'email': email ,'password': pass}, function (err,col){
  	if(col==1){
  		sess = req.session;
  		sess.email = email;
  		res.send("Loin successful : " + sess.email);
  	}else{
  		res.send('Login fail');
  	}
  });

});


router.post('/regis', function(req, res){
  var email = req.body.email;
  var pass = req.body.password;

  Col.count({'email': email},function (err,col){
  	if(col>0){
  		res.send('This email exits');
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
								   limit_connection: 10
								});

	  	register.save(function (err){
		  	if (err) {
		  		console.log('register fail');
		  	}
			console.log('reigister success');
	  	});
  	}
  });

  console.log(email);
  console.log(pass);
  // console.log(username_bk);
  // console.log(password_bk);

  
});

module.exports = router;