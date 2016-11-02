'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser =require('body-parser');
// var favicon = require('serve-favicon');






const PORT = process.env.PORT || 5000;
// const INDEX = path.join(__dirname, '/views/index.html');

var router = express.Router();
router.get("/",function(req,res){
	// res.send('hello world');
  res.sendFile(__dirname + "/index.html");
  // console.log(req.param('id'));
});


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


router.post("/",function(req,res){
		console.log(req.body.testVariable);
		console.log('tset ule');

		// res.write({ statTest:'testing ule'});
		res.send({uno:'one', dos:'two'});

});

router.use('/',express.static(__dirname + '/public'));
router.use("/templates",express.static(__dirname + '/templates'))
router.use("/partials",express.static(__dirname + '/partials'))
router.use("/node_modules",express.static(__dirname + '/node_modules'))
	.all('/*', function(req, res, next) { // Just send the index.html for other files to support HTML5Mode
     res.sendFile('/index.html', { root: __dirname });
	})
	
const server = express()
	.use("/",router)
	// .use("",express.static(__dirname + '/views'))
	// .use("",express.static(__dirname + ''))
	// .use("/js",express.static(__dirname + '/js'))
	// .use("/css",express.static(__dirname + '/css'))
	// .use("/fonts",express.static(__dirname + '/fonts'))
	// .use("/img",express.static(__dirname + '/img'))

	
	// .use("/",express.static(__dirname + '/public'))
	
	
	// .use(favicon(__dirname + '/favicon.ico'))
	// .use("/node_modules/",express.static(__dirname + '/node_modules/angular/'))
	// .use("/node_modules/angular-route/",express.static(__dirname + '/node_modules/angular-route/'))
	// .use ("/node_modules/angular-ui-bootstrap/",express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist'))
	// .use ("/node_modules/font-awesome/",express.static(__dirname = "node_modules/font-awesome/"))
	// .use("*",function(req,res){
	//   res.redirect(__dirname + '/index.html');
	// })
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
