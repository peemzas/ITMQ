var express = require('express');
var router = express.Router();
var mqtt    = require('mqtt');

var io = require('socket.io').listen(5000);

var mongoose = require('mongoose');
var client = require('./connectMosca');

var Col = mongoose.model('pubsubDB', { type: String ,topic: String ,message: String });

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});

/* GET demo page. */
router.get('/demo', function(req, res){
  res.render('demo');
});

// router.get('/test', function(req, res){
//   res.render('test');
// });

io.sockets.on('connection', function (socket) {
    // socket connection indicates what mqtt topic to subscribe to in data.topic
    socket.on('subscribe', function (data) {
        console.log('Subscribing to '+data.topic);
        socket.join(data.topic);
        client.subscribe(data.topic);
    });
    // when socket connection publishes a message, forward that message
    // the the mqtt broker
    socket.on('publish', function (data) {
        console.log('Publishing to '+data.topic);
        client.publish(data.topic,data.payload);
    });
});
 
// listen to messages coming from the mqtt broker
client.on('message', function (topic, payload, packet) {
    console.log(topic+'='+payload);
    io.sockets.emit('mqtt',{'topic':String(topic),
                            'payload':String(payload)});
});

router.post('/pub', function(req, res){
	var pub = req.body.message;
	var sub = req.body.topic;
	console.log(sub);
	console.log(pub);

	// var options = {
	// 	qos: 1,
	// 	retain: false
	// };

	client.publish(sub, pub, function(){
		console.log('publish successful');
		var publish = new Col ({type:'publish', topic: sub, message: pub});
		publish.save(function (err) {
	  	if (err) console.log('fail');// ...
	  		console.log('success');
		});
	});

	res.send(req.body);

	// client.on('message', function (topic, message) {
 //  		// message is Buffer
 //  		console.log('From /Pub ' + message.toString());
	// });

	// res.render('index', { title: 'Express' , pub: pub ,
	// 					  topic: 'Topic: '+sub , message: 'Message: '+pub});
});

router.post('/sub', function(req, res){
	var topic = req.body.topic;

	console.log(topic);

	// var options = {
	// 	qos: 1
	// };

	client.subscribe(topic, function(){
		console.log('subscribe successful');
		var subscribe = new Col ({type:'subscribe', topic: topic, message: null});
		subscribe.save(function (err) {
	  	if (err) console.log('fail');// ...
	  		console.log('success');
		});
	});
	res.send(req.body);
	// res.render('index', { title:'Express' , sub: topic});
});


router.post('/switch', function(req, res){
	var bswitch = req.body.bswitch;
	// res.render('index', { title:'Express'});

	console.log(bswitch);

	// var options = {
	// 	qos: 1
	// };

	client.publish('OnOffLight', bswitch, function(){
		console.log('publish successful');
		var publish = new Col ({type:'publish', topic: 'OnOffLight', message: bswitch});
		publish.save(function (err) {
	  	if (err) console.log('fail');// ...
	  		console.log('success');
		});
	});

	res.send(req.body);

	// client.on('message', function (topic, message) {
 //        // message is Buffer
 //        console.log('From /Switch ' + message.toString());
 //    });
});


module.exports = router;