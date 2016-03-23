var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://mqttserver:qwerty@proton.it.kmitl.ac.th:27017/mqttserver');

module.exports = db;