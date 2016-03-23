var mongoose = require('mongoose');

var userDB = mongoose.model('user', { email: String ,
								   password: String ,
								   username_broker: String ,
								   password_broker: String ,
								   devices: [{device_id: String ,
								   			  subscribe:[String],
								   			  status: String}],
								   limit_connection: Number
								});

module.exports = userDB;