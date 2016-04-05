var mqtt    = require('mqtt');
// var SECURE_CERT = __dirname + '/../secure/tls-cert.pem';

module.exports.connectMosca = function(username,password,clientId){
    var options = {
        clientId: clientId,
        host: 'localhost',
        port: '8883',
        username: username,
        password: password,
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

    client.on('connect', function (connack) {
        console.log("connect successful");
        console.log(connack);
    });

    return client;
}

module.exports.close_connection = function(client){
    client.end();
}