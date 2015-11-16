var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
// var Any = new Schema({ any: {} });
// var query = mongoose.model('ascoltatori',{_id: Object, value: String, topic: String, options: {qos: Number, messageId: String, clientId: String}});
var query = mongoose.model('pubsubDBs', { type: String ,topic: String ,message: String });


router.get('/', function(req, res, next) {
	query.find({},'topic',function(err, data){
		if (err) return handleError(err);
	  	console.log(data);
	  	res.send(data);
	});
});

module.exports = router;