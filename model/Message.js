var mongoose = require('mongoose');

var messageDB = mongoose.model('message', { email: String,
										project_id: String,
										device_id: String,
										topic: String,
										payload: String,
										date: { type: Date, default: Date.now }
								});

module.exports = messageDB;