
const socketIO = require('socket.io');


// const io = socketIO(server);



module.exports.listen = function(app){
    io = socketIO.listen(app)

    io.sockets.on('connection', function (socket) {
		 console.log('socket client connected');
			console.log('testing');
			 	
	})
    return io
}

// io.sockets.on('connection', function (socket) {
// 		 console.log('Client connected hehe');
// console.log('testing');
		 	
// });

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));

	

// });



// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);



// module.exports = router;
