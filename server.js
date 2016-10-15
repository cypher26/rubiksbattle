'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');



const PORT = process.env.PORT || 5000;
// const INDEX = path.join(__dirname, '/views/index.html');

var router = express.Router();
router.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

const server = express()
	.use("/",router)
	.use("",express.static(__dirname + '/views'))
	.use("",express.static(__dirname + ''))
	.use("/js",express.static(__dirname + '/js'))
	.use("/css",express.static(__dirname + '/css'))
	.use("/templates",express.static(__dirname + '/templates'))
	.use("/partials",express.static(__dirname + '/partials'))
	
	.use("/node_modules/angular/",express.static(__dirname + '/node_modules/angular/'))
  // .use(function(req, res) {
  // 		res.sendFile(INDEX); 
  // 		// res.sendFile(INDEX); 

  // })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



const io = socketIO(server);


io.sockets.on('connection', function (socket) {
		 console.log('Client connected hehe');

		 	
});

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));

	

// });



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
