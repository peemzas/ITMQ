var mongoose = require('mongoose');

var userDB = mongoose.model('user', { email: String ,
								   password: String ,
								   username_broker: String ,
								   password_broker: String ,
								   projects: [{project_id: String,
								   			   project_name: String,
								   			   project_description: String}],
								   devices: [{device_id: String ,
								   			  device_name: String,
								   			  device_description: String,
								   			  device_type: String,
								   			  category: String,
								   			  subscribe:[String],
								   			  status: String,
								   			  project_id: String}],
								   limit_connection: Number
								});

module.exports = userDB;