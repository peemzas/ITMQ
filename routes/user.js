var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.email){
  	res.render('user', {session: req.session});
  }else{
  	res.redirect('/loginPage');
  }
  console.log(req.session);
});

module.exports = router;
