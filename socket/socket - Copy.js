
const socketIO = require('socket.io');
var roomdata = require('roomdata');
var models = require('../database/models');
var Hotel = require('socket.io-hotel');


//for request
var varGameReqs = [];
var varGameTimers = [];
var varTimerInc = [];




// var roomVar=[{
// 				 	'userList':[]
// 				 	}];

// var roomVar = [{
// 	userList:[]
// }];
var roomVar=[];


module.exports.listen = function(app){
    io = socketIO.listen(app)
 
	hotel = new Hotel(io.sockets.adapter)

    io.sockets.on('connection', function (socket) {

    		console.log('enter socket game');

			//####################################### - Game - #########################################################

				socket.on('adduser',function(data,callback){
							//initialize room variables
						socket.room = "room"+data.id;
						socket.join(socket.room);
						
						if (roomVar[socket.room] == undefined){
							
							roomVar[socket.room]={
								userList:[]
							}

						}

						
						socket.userInfo = socket.request.session.userInfo;

						roomVar[socket.room]['userList'].push(socket.userInfo._id);

						console.log(roomVar[socket.room]['userList']);
				});

				socket.on('disconnect', function() {
			     	
			   		// roomVar = roomVar.filter(function( obj ) {
								// 	    return obj[socket.room]['userList'] !== socket.userInfo._id;
								// 	});
				console.log('disconnect' + socket.room);
			
			   		console.log(roomVar[socket.room]['userList']);
			   	});

			//####################################### - Game - end #########################################################

			
			

	});



    return io;
}

