var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('doc', {session: req.session});
});

module.exports = router;