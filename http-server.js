

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com:1883/');

var express = require("express");
 var app = express();

 /* serves main page */
 app.get("/", function(req, res) {
    res.send("connected");
 });

  app.post("/start", function(req, res) { 
	/* some server side logic */
	res.send("OK");
	client.publish('ctrl_hyperion_9127','start');
  });
  
  app.post("/stop", function(req, res) { 
	/* some server side logic */
	res.send("OK");
	
	client.publish('ctrl_hyperion_9127','stop');
  });



 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });

client.on('connect', function () {
	console.log("MQTT connected");
  //client.subscribe('presence')
  //client.publish('presence', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
	console.log("MQTT message received:"+message);
  // message is Buffer
  //console.log(message.toString())
  //client.end()
})