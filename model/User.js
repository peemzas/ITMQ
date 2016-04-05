var mongoose = require('mongoose');

var userDB = mongoose.model('user', { email: String ,
								   password: String ,
								   username_broker: String ,
								   password_broker: String ,
								   devices: [{device_id: String ,
								   			  device_name: String,
								   			  device_description: String,
								   			  subscribe:[String],
								   			  status: String}],
								   limit_connection: Number
								});

module.exports = userDB;