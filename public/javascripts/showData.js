$(document).ready(function(){
	$("#subscribe").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				topic: $("#topic").val()
			},
            url: 'http://localhost:3000/sub',
            success: function (data) {
            	// var ret = jQuery.parseJSON(data);
            	// $('#lblResponse').html(ret.msg);
            	console.log(data);
            	$("#subscribed").append("Subscribe: " + data.topic +"<br>");
        	}
        });
	});

	$("#publish").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				topic: $("#sub").val(),
				message: $("#pub").val()
			},
            url: 'http://localhost:3000/pub',
            success: function (data) {
            	// var ret = jQuery.parseJSON(data);
            	// $('#lblResponse').html(ret.msg);
            	console.log(data);
            	// $("#data").append("Publish to topic " + data.topic + " Message: " + data.message + "<br>");
        	}
        });
	});

	$("#on").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				bswitch: $("#on").val()
			},
            url: 'http://localhost:3000/switch',
            success: function (data) {
            	// var ret = jQuery.parseJSON(data);
            	// $('#lblResponse').html(ret.msg);
            	console.log(data);
            	// $("#data").append("Publish to topic OnOffLight " + data.bswitch + "<br>");
        	}
        });
	});

	$("#off").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				bswitch: $("#off").val()
			},
            url: 'http://localhost:3000/switch',
            success: function (data) {
            	// var ret = jQuery.parseJSON(data);
            	// $('#lblResponse').html(ret.msg);
            	console.log(data);
            	// $("#data").append("Publish to topic OnOffLight " + data.bswitch + "<br>");
        	}
        });
	});

	var socket = io.connect('http://localhost:5000');

	socket.on('connect', function () {
      socket.on('mqtt', function (msg) {
        console.log(msg.topic+' '+msg.payload);
        if (msg.payload == "Off") {
        	if ($('#led').is(':checked')) {
          		$('#led').prop('checked',false).change();
          		$("#data").append("Topic: " + msg.topic + '   ' + 'Message: ' + msg.payload + "<br>");
        	}
     	}else if (msg.payload == "On") {
        		if (!$('#led').is(':checked')) {
          			$('#led').prop('checked',true).change();
          			$("#data").append("Topic: " + msg.topic + '   ' + 'Message: ' + msg.payload + "<br>");
        		}
      	}else{
      		$("#data").append("Topic: " + msg.topic + '   ' + 'Message: ' + msg.payload + "<br>");
      	}
      });
    });

    // socket.emit('subscribe',{topic:$("#topic").val()});
});



