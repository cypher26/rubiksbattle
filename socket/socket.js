
const socketIO = require('socket.io');
var models = require('../database/models');



// const io = socketIO(server);



module.exports.listen = function(app){
    io = socketIO.listen(app)

    io.sockets.on('connection', function (socket) {


		 console.log('socket client connected ' + socket.request.session.user_id);
				socket.join(socket.request.session.user_id);

			socket.on('reqUpdateChat', function (user,callback){
				io.sockets.in(user).emit('updateChat'); //broadcast also itself
				io.sockets.in(socket.request.session.user_id).emit('updateChat'); //broadcast also itself

				io.sockets.in(user).emit('updateInbox'); //broadcast also itself
				io.sockets.in(socket.request.session.user_id).emit('updateInbox');

				callback();
			});
			// socket.on('reqUpdateInbox',function(user,callback){
			// 	io.sockets.in(user).emit('updateInbox'); //broadcast also itself
			// 	io.sockets.in(socket.request.session.user_id).emit('updateInbox'); //broadcast also itself
				
			// }

    	 // sending to all clients except sender
			// socket.broadcast.emit('message', socket.request.session.user_id);

	 	 // sending to all clients in 'game' room(channel), include sender
 				// io.in('5').emit('message', 'cool game');

	});

	// setInterval(() => io.emit('time', new Date().toTimeString()), 5000);
	



    return io;
}

// io.sockets.on('connection', function (socket) {
// 		 console.log('Client connected hehe');
// console.log('testing');
		 	
// });

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));

	

// });






// module.exports = router;
