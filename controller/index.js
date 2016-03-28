var express = require('express');
var indexPage = express.Router();
var session = require('express-session');

indexPage.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index', {session: req.session});
});

module.exports = indexPage;