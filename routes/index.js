var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index', {session: req.session});
});

module.exports = router;