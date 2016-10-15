var express = require('express');
var app = express();


// server = require('http').createServer(app);



// var io = require('socket.io').listen(server);





app.set('port', (process.env.PORT || 5000));

// server.listen((process.env.PORT || 5000), "127.0.0.1");

var router = express.Router();
var path = __dirname + '/views/';


router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});


// app.use("",express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

// router.get("/about",function(req,res){
//   res.sendFile(path + "about.html");
// });

// router.get("/contact",function(req,res){
//   res.sendFile(path + "contact.html");
// });

// router.get("/js/jquery",function(req,res){
//   res.sendFile(path + "/js/jquery.js");
// });


app.use("",express.static(__dirname + '/views'));
app.use("js",express.static(__dirname + '/js'));

app.use("/",router);

// app.use("*",function(req,res){
//   res.sendFile(path + "404.html");
// });

app.listen(app.get('port'), function() {
console.log('Node app is running on port', app.get('port'));

});


// io.sockets.on('connection', function (socket) {
// 	console.log('success server');
// 			socket.on('adduser', function(callback){
// 					console.log('success server');
// 					callback();
// 			});
	
// });


