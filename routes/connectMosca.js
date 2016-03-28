var mqtt    = require('mqtt');
var SECURE_CERT = __dirname + '/../secure/tls-cert.pem';

var client;

module.exports.connectMosca = function(username,password){
    var options = {
        host: 'localhost',
        port: '8883',
        username: username,
        password: password,
        keepalive: 10,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        rejectUnauthorized: false,
        certPath: SECURE_CERT
    };

    client  = mqtt.createSecureClient(options);

    client.on('error', function (err) {
        console.log(err);
        client.end();
    });

    client.on('connect', function () {
        console.log("connect successful");
    });
}

module.exports.close_connection = function(){
    client.end();
}