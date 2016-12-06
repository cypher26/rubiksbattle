'use strict';
// var favicon = require('serve-favicon');
const express = require('express');
// const socketIO = require('socket.io');
const path = require('path');
var session = require('express-session');



// var mongoose = require('mongoose');

var sessionMiddleware = session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
});



const PORT = process.env.PORT || 5000;
// const INDEX = path.join(__dirname, '/views/index.html');
var router = express.Router();
var users = require('./routes/users')


// router.get("/",function(req,res){
// 	// res.send('hello world');
//   res.sendFile(__dirname + "/index.html");
//   // console.log('testing get');
//   // res.redirect("/");
//   // console.log(req.param('id'));
// });


var server = express()

.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
.use(sessionMiddleware)
.use('/',express.static(__dirname + '/public'))
.use('/js',express.static(__dirname + '/controllers'))
.use("/templates",express.static(__dirname + '/templates'))
.use("/partials",express.static(__dirname + '/partials'))
.use("/node_modules",express.static(__dirname + '/node_modules'))
// .use(function(req, res, next) { //allow cross origin requests
//         res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//         res.header("Access-Control-Allow-Origin", "/");
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     })

.use("/",users)
	// .set('view engine','html');
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




var io = require('./socket/socket').listen(server)

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});