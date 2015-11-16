var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Cat = mongoose.model('cat', { name: String,typ: Number });

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  var kitty = new Cat({ name: 'test' ,typ: parseInt(Math.random()*3) });
  kitty.save(function (err) {
	  if (err) console.log('fail');// ...
	  console.log('success');
	});
});


module.exports = router;