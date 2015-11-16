var express = require('express');
var router = express.Router();
var mqtt    = require('mqtt');
var client = require('./connectMosca');

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.post('/sub', function(req, res){
	var topic = req.body.topic;
	res.render('index', { title:'Express', sub: topic });

	console.log(topic);

	client.subscribe(topic);

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log('From Sub ' + message.toString());
    });
});

module.exports = router;