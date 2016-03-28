var express = require('express');
var demoPage = express.Router();
var mqtt    = require('mqtt');
var session = require('express-session');
var userDB = require('../model/User');

// var io = require('socket.io').listen(5000);
// var Col = mongoose.model('pubsubDB', { type: String ,topic: String ,message: String });
// var userDB = mongoose.model('user');

/* GET demoPage page. */
demoPage.get('/', function(req, res){
		if(req.session.email){
			userDB.find({'email': req.session.email}, function(err,userData){
				var usernameBroker = userData[0].username_broker;
				var passwordBroker = userData[0].password_broker;

				res.render('demo', {session: req.session, usernameBroker: usernameBroker, passwordBroker: passwordBroker});
				console.log(req.session.email);
			});
		}else{
			res.render('demo', {session: req.session});
			console.log(req.session.email);
		}
});

//Don't know what is it ????
// io.sockets.on('connection', function (socket) {
//     // socket connection indicates what mqtt topic to subscribe to in data.topic
//     socket.on('subscribe', function (data) {
//         console.log('Subscribing to '+data.topic);
//         socket.join(data.topic);
//         client.subscribe(data.topic);
//     });
//     // when socket connection publishes a message, forward that message
//     // the the mqtt broker
//     socket.on('publish', function (data) {
//         console.log('Publishing to '+data.topic);
//         client.publish(data.topic,data.payload);
//     });
// });
 
// // listen to messages coming from the mqtt broker
// client.on('message', function (topic, payload, packet) {
//     console.log(topic+'='+payload);
//     io.sockets.emit('mqtt',{'topic':String(topic),
//                             'payload':String(payload)});
// });

// demoPage.post('/pub', function(req, res){
//    var pub = req.body.message;
//    var sub = req.body.topic;
//    console.log(sub);
//    console.log(pub);

//    // var options = {
//    //    qos: 1,
//    //    retain: false
//    // };

//    client.publish(sub, pub, function(){
//       console.log('publish successful');
//       var publish = new Col ({type:'publish', topic: sub, message: pub});
//       publish.save(function (err) {
//       if (err) console.log('fail');// ...
//          console.log('success');
//       });
//    });

//    res.send(req.body);

//    // client.on('message', function (topic, message) {
//  //      // message is Buffer
//  //      console.log('From /Pub ' + message.toString());
//    // });

//    // res.render('index', { title: 'Express' , pub: pub ,
//    //                  topic: 'Topic: '+sub , message: 'Message: '+pub});
// });

// demoPage.post('/sub', function(req, res){
//    var topic = req.body.topic;

//    console.log(topic);

//    // var options = {
//    //    qos: 1
//    // };

//    client.subscribe(topic, function(){
//       console.log('subscribe successful');
//       var subscribe = new Col ({type:'subscribe', topic: topic, message: null});
//       subscribe.save(function (err) {
//       if (err) console.log('fail');// ...
//          console.log('success');
//       });
//    });
//    res.send(req.body);
//    // res.render('index', { title:'Express' , sub: topic});
// });


// demoPage.post('/switch', function(req, res){
//    var bswitch = req.body.bswitch;
//    // res.render('index', { title:'Express'});

//    console.log(bswitch);

//    // var options = {
//    //    qos: 1
//    // };

//    client.publish('OnOffLight', bswitch, function(){
//       console.log('publish successful');
//       var publish = new Col ({type:'publish', topic: 'OnOffLight', message: bswitch});
//       publish.save(function (err) {
//       if (err) console.log('fail');// ...
//          console.log('success');
//       });
//    });

//    res.send(req.body);

//    // client.on('message', function (topic, message) {
//  //        // message is Buffer
//  //        console.log('From /Switch ' + message.toString());
//  //    });
// });


module.exports = demoPage;