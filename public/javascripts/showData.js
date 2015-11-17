$(document).ready(function(){
	$("#addSubButton").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				topic: $("#subscribeTopic").val()
			},
            url: 'http://localhost:3000/sub',
            success: function (data) {
            	// var ret = jQuery.parseJSON(data);
            	// $('#lblResponse').html(ret.msg);
            	console.log(data);
            	$("#subscribed").append("Subscribe: " + data.topic +"<br>");
                
                $("#subTopicEdit").prepend('<div class="panel">'+
                                    '<div class="panel-body">'+
                                        '<label class="disc">'+
                                            'Subscribe to ' + '<br>'+ 
                                            'Topic : ' + data.topic + '<br>'+ 
                                        '</label>'+
                                    '</div>'+
                                '</div>');
        	}
        });
	});

	$("#publishButton").on("click",function(){
    	$.ajax({
			type: 'POST',
			data: {
				topic: $("#publishTopic").val(),
				message: $("#publishPayload").val()
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
          		$("#messEdit").prepend('<div class="panel">'+
                                    '<div class="panel-body">'+
                                        '<label class="disc">'+
                                            'from topic : ' + msg.topic + '<br>'+
                                            'Message : ' + msg.payload + '<br>'+
                                        '</label>'+
                                    '</div>'+
                                '</div>');
        	}
     	}else if (msg.payload == "On") {
        		if (!$('#led').is(':checked')) {
          			$('#led').prop('checked',true).change();
          			$("#messEdit").prepend('<div class="panel">'+
                                    '<div class="panel-body">'+
                                        '<label class="disc">'+
                                            'from topic : ' + msg.topic + '<br>'+
                                            'Message : ' + msg.payload + '<br>'+
                                        '</label>'+
                                    '</div>'+
                                '</div>');
        		}
      	}else{
      		$("#messEdit").prepend('<div class="panel">'+
                                    '<div class="panel-body">'+
                                        '<label class="disc">'+
                                            'from topic : ' + msg.topic + '<br>'+ 
                                            'Message : ' + msg.payload + '<br>'+
                                        '</label>'+
                                    '</div>'+
                                '</div>');
      	}
      });
    });

    // socket.emit('subscribe',{topic:$("#topic").val()});
});



