var mqtt    = require('mqtt');

var options = {
	host: 'node.it.kmitl.ac.th',
	port: '1883',
    username: 'demo',
    password: 'demo',
    keepalive: 10,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    rejectUnauthorized: false
};

var client  = mqtt.connect(options);

client.on('error', function (err) {
    console.log(err);
    client.end();
});

client.on('connect', function () {
	console.log("connect successful");
});

module.exports = client;