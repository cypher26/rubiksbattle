
const socketIO = require('socket.io');

const util = require('util');

var roomdata = require('roomdata');
var models = require('../database/models');
var Hotel = require('socket.io-hotel');


var scrambler = require('../smart/scrambler.js');
var pochmann = require('../smart/computerAlg.js');

// if solve 
var checkSolver = require('../smart/solveP1.js');


//### glicko rating system


var glicko2 = require('glicko2');






//### glicko rating system -dn 


//1163
//1210

// win +14 / draw -2 / lose -19
// win +13 / draw +1 / lose -12
// 1257/1272

// win +13 / draw 0 / lose -12
// 1270/1284

// win +13 / draw +1 / lose -11
// 1283/1325

//for request
var varGameReqs = [];
var varGameTimers = [];
var varTimerInc = [];

var varUserInclude = [];


var roomVar={};

	var timers = [];

// timers['room'+1].test = 'hahaha';

// console.log(timers);
tempP1 = '1500';
tempP2 = '1500';
	setRatedPoints(tempP1,tempP2,'1',function(p1Points,p2Points){
										scoreDiff = {
											p1: Math.abs(tempP1 - p1Points),
											p2: Math.abs(tempP2 - p2Points)
										}
										// io.in(socket.room).emit('winnerUpdate',perspective,
										// 	roomVar[socket.room].gameStatus,winnerUser,'0',scoreDiff);

										// console.log(scoreDiff);
										//update database rating


								});




function inverseAlg(alg){
		var inverseStr= '';
			alg = alg.split(' ');

			for (var x =alg.length-1;x>=0;x--){
				inverseStr+=alg[x] + " ";
			}
		 inverseStr = inverseStr.replace(/\' /g,'p');
		 inverseStr = inverseStr.replace(/ /g,'\' ');
		 inverseStr = inverseStr.replace(/p/g,' ');

	return inverseStr;
}




// var start = new Date().getTime()


function convertTimeComplete(startVal){
    var x =parseInt(startVal); //max time 
    
        min = Math.floor( (x/1000/60) % 60 );
        sec = Math.floor( (x/1000) % 60 );

        displayMin = (min.toString().length==1  ? '0'+min:min+'');
        displaySec = (sec.toString().length==1 ? '0'+sec:sec+'');
        displayMilli =  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x );
      
      if (isNaN(displaySec) && isNaN(displayMin)){
        return 'loading ..';
      }
      if (displayMin == '00' && displaySec == '00'){
        return '';
      }
      return (displayMin != '00'? displayMin+':':'')+displaySec+'.'+displayMilli + (displayMin != '00'?' min':' sec');
        // return displayMin + ":"+displaySec+"."+displayMilli;
}
// setInterval(function()
// {
//     var time = new Date().getTime() - start;
//     console.log(convertTimeComplete(time));

//     // elapsed = Math.floor(time / 100) / 10;
//     // if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

//     // document.title = elapsed;
//     // console.log(elapsed);

// }, 10);



// setTest('1500','1500',1,function(p1Rating,p2Rating){
// 	console.log('p1Rating = ' + p1Rating);
// 	console.log('p2Rating = ' + p2Rating);
// });
// function setTest(p1Rating,p2Rating,whoWon,callback){


// 					settings = {
// 					  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should 
// 					  //       be tested to decide which value results in greatest predictive accuracy." 
// 					  tau : 0.2,
// 					  // rating : default rating 
// 					  rating : 1500,
// 					  //rd : Default rating deviation 
// 					  //     small number = good confidence on the rating accuracy 
// 					  rd : 50,
// 					  //vol : Default volatility (expected fluctation on the player rating) 
// 					  vol : 0.50
// 					};

// 				    ranking = new glicko2.Glicko2(settings);

// 					p1Rated = ranking.makePlayer(p1Rating,50,0.50);
// 					p2Rated = ranking.makePlayer(p2Rating,50,0.50);

// 					matches = []

// 					matches.push([p1Rated,p2Rated,parseInt(whoWon) === 1 ? 1:0]);

// 					ranking.updateRatings(matches);
					
// 					callback(Math.round(p1Rated.getRating()),Math.round(p2Rated.getRating()));
// 	}



function setRatedPoints(p1Rating,p2Rating,whoWon,callback){


					settings = {
					  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should 
					  //       be tested to decide which value results in greatest predictive accuracy." 
					  tau : 0.5,
					  // rating : default rating 
					  rating : 1500,
					  //rd : Default rating deviation 
					  //     small number = good confidence on the rating accuracy 
					  rd : 50,
					  //vol : Default volatility (expected fluctation on the player rating) 
					  vol : 0.50
					};

				    ranking = new glicko2.Glicko2(settings);

					p1Rated = ranking.makePlayer(p1Rating,50,0.50);
					p2Rated = ranking.makePlayer(p2Rating,50,0.50);

					matches = []

					matches.push([p1Rated,p2Rated,parseInt(whoWon) === 1 ? 1:0]);

					ranking.updateRatings(matches);

					callback(Math.round(p1Rated.getRating()),Math.round(p2Rated.getRating()));
	}

module.exports.listen = function(app){
    io = socketIO.listen(app)
// io.set('transports', [ 'websocket', 'flashsocket', 'polling' ] );

// io.set('heartbeat timeout', 6); // default 6 
// io.set('heartbeat interval', 5); // default 5

	hotel = new Hotel(io.sockets.adapter)



	//function update online users
      function funcUpdateOnline(){
      	var busy = [];
      	for (var key in roomVar) {
			  if (roomVar.hasOwnProperty(key)) {
			    // console.log(key + " -> " + roomVar[key]);
			    // console.log(roomVar[key].userList)
			    busy = busy.concat(roomVar[key].userList);
			  }
			}

			//convert busy to integer
			// for(var i=0; i<busy.length; i++) { busy[i] = parseInt(busy[i],10); } 


			//convert busy to string
			busy = busy.toString();

		var online =  Object.keys(io.sockets.adapter.rooms).filter(function(data){
    					if (!isNaN(data)) return data;
					});

		var returnObj = {
				'online':online,
				'busy':busy
      		};
      		//if number or not eg. 1 2 3 not hash then filter
		
		return 	returnObj;
			

	 }

	 //function update live games
	 function funcUpdateLiveGames(){

	 	
	 		// var data = bson.serialize(roomVar);
			// console.log('data:', data)
			// io.emit('updateLiveGames',[{'123':'hahaha'}]);
			// console.log(roomVar);

			
			// delete roomVar['room234'];

			data = Object.keys(roomVar);
			tempVar =  clone(roomVar);
			for (x=0;x<data.length;x++){
					if (tempVar[data[x]].gameStatus == 'abandon') delete tempVar[data[x]];
		    try {	delete tempVar[data[x]].iniTimer; }   catch(err){}
			try {   delete tempVar[data[x]].clockTimer; } catch(err){}
			try {	delete tempVar[data[x]].aiTimer; } catch(err){}
			try {	delete tempVar[data[x]].dcTimer; } catch(err){}
					// delete tempVar[data[x]]		
			}

			io.emit('updateLiveGames',JSON.stringify(tempVar));
			// console.log(roomVar);
				// console.log('###########');

	 }
	 function clone(obj) {
		    if (null == obj || "object" != typeof obj) return obj;
		    var copy = obj.constructor();
		    for (var attr in obj) {
		        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		    }
		    return copy;
		}
	/// initialize variables for database ----------------------------------
	function iniVarGames(cb){
		models.viewAllGames(function(err,data){
			data.forEach(function(data){
					if (data.reqStatus =='ongame' && roomVar['room'+data._id] == undefined){ // if ongame without data variables
						timers['room'+data._id]={

						};
						roomVar['room'+data._id]={
											userList:[],
											roomMsg:[],
											readyQueue:[],
											playerQueue:[],
											gameData:data,
											//scramble
											//iniTimer 3 2 1 go 
											//iniCtr
											//iniStr
											gameStatus:'idle',
											//cubePixels animate pixels update
											//cubePixels1
											//clockCtr flipclock
											clockTimer:null,
											//aiTimer
											//aiCtr
											//aiAlg
											//arrayAlg for pixels update
											//arrayAlg1
											'algP1':'',	//for user algs
											'algP2':'',
											player1Dc:3, //num of disconnected
											player2Dc:3,
											//dcInc
											//dcTimer
											//dcStr
											roomScore:{
												p1:0,
												p2:0
											}
											//comSpeed
											//algSolution
										}

										//########game status [ 'onGame, reconnect, idle, iniGame']
								if (data.reqTo_id._id == '0'){
										roomVar['room'+data._id].userList.push('0');
										roomVar['room'+data._id].playerQueue.push('0');
								}else if(data.reqTo_id._id == '-1'){
								   		// roomVar['room'+data._id].userList.push('-1');
								   		roomVar['room'+data._id].playerQueue.push('-1');
							    }
					}
			});
				cb();
		});
	}
		/// initialize variables for database - end ----------------------------------
	
	iniVarGames(function(){
		// console.log('iniVarGames');
			funcUpdateLiveGames();

	});	
	

    io.sockets.on('connection', function (socket) {





			//####################################### - Game - #########################################################

				// socket.on('testDisconnect',function(){
				// 	socket.emit('disconnect',function(){
				// 			console.log('disconnect is finish');
				// 	});
				// })

				// socket.on('testUpdate',function(data,callback){
				// 	// console.log(util.inspect(roomVar[socket.room]));
				// 	console.log('testupdate');
				// 	// testVar = socket.room;
				// });
				
				socket.on('reqRatingUpdate',function(data,callback){
					funcRatingUpdate(data);
				});

				function funcRatingUpdate(data){
					var tempP1,tempP2;
						models.getRating([roomVar[socket.room].gameData.reqFrom_id._id,
										 roomVar[socket.room].gameData.reqTo_id._id],function(err,data){
								data.forEach(function(item){
									if (item._id == roomVar[socket.room].gameData.reqFrom_id._id) tempP1 = item.user_score;
									if (item._id == roomVar[socket.room].gameData.reqTo_id._id) tempP2 = item.user_score;
								});

								//update rating to room
									pRating = {
									p1Rating:tempP1, //player1
									p2Rating:tempP2 //player2
								}
								socket.emit('updateRating',pRating);
					 });

				}

				socket.on('reqScoreUpdate',function(data,callback){
						socket.emit('roomScoreUpdate',roomVar[socket.room].roomScore);
						callback();
				});
				socket.on('abandonGame',function(data,callback){

					if (timers[socket.room] == undefined) return callback();
					  //fix stack size exceeded
						clearInterval(timers[socket.room].dcTimer);
						clearInterval(timers[socket.room].clockTimer);
						clearInterval(timers[socket.room].iniTimer);
						clearInterval(timers[socket.room].aiTimer);

						// console.log('abandon game');


						if (roomVar[socket.room].gameStatus == 'onGame'){
							if (socket.userPerspective == 'player1'){
								socketWinnerUpdate('player2','resignation',roomVar[socket.room].gameData.reqTo_id);
							}else if (socket.userPerspective == 'player2'){
								socketWinnerUpdate('player1','resignation',roomVar[socket.room].gameData.reqFrom_id);
							}
						}

						io.in(socket.room).emit('updateAbandon');


						abandonGame(function(){ callback(); });


				});
				
				function abandonGame(callback){
					models.abandonGame(roomVar[socket.room].gameData._id,function(err,data){
						  if (err) throw err;
						  // console.log(data);
						  	roomVar[socket.room].gameStatus = 'abandon';
						  	funcUpdateLiveGames();

						  callback();
						  // console.log('success abandon');
						});
				}
				socket.on('adduser',function(data,callback){


						// console.log('add_user');				



						//socket.userPerspective
						socket.room = "room"+data.id;
						socket.userInfo = socket.request.session.userInfo;


						if (socket.userInfo==undefined) return;
						
						// if exist, trigger multiple user login detected
						if (roomVar[socket.room]['userList'].indexOf(socket.userInfo._id)>-1){
							io.sockets.in(socket.room).emit('multipleLogin',socket.userInfo._id);	
						}


						socket.join(socket.room);


						//initialize room variables
						
						if (roomVar[socket.room].gameStatus =='abandon') return;


						// console.log('r = ' + roomVar[socket.room] + " d = " + data.id);

						
						//room all users
						roomVar[socket.room]['userList'].push(socket.userInfo._id);

						//update online
						io.emit('updateOnlineUsers',funcUpdateOnline());
					   


						// console.log('userList + ' + roomVar[socket.room]['userList']);

						// update users given id
						models.getUsersById(roomVar[socket.room]['userList'],function(err,data){
						    io.sockets.in(socket.room).emit('updateUsersInRoom',data); //broadcast also itself
						    socket.emit('getGameStatus', roomVar[socket.room].gameStatus);
						});


						//check server user perspective
						if (socket.userInfo._id == roomVar[socket.room].gameData.reqFrom_id._id)
							socket.userPerspective = 'player1';
						else if (socket.userInfo._id == roomVar[socket.room].gameData.reqTo_id._id)
							socket.userPerspective = 'player2';
						else
							socket.userPerspective = 'observer';

					
						//player Queue

						//add queue of player
						if ([roomVar[socket.room].gameData.reqTo_id._id,
							 roomVar[socket.room].gameData.reqFrom_id._id].indexOf(socket.userInfo._id)>-1)
							 //  &&
							 // roomVar[socket.room].playerQueue.indexOf(socket.userInfo._id)<0)
							 {
								 roomVar[socket.room].playerQueue.push(socket.userInfo._id);
							 }
						
						
						if (roomVar[socket.room].gameStatus == 'reconnect' && roomVar[socket.room].playerQueue.length==2){
							reconnection();
						}

						// console.log("PQueue add " + roomVar[socket.room].playerQueue);

						checkIfReady();

						// roomVar[socket.room].readyQueue.push('1');

						callback();


				});
				socket.on('forfeitGame',function(data,cb){
					if (socket.userPerspective == 'player1'){
						socketWinnerUpdate('player2','resignation',roomVar[socket.room].gameData.reqTo_id);
					}else if (socket.userPerspective == 'player2'){
						socketWinnerUpdate('player1','resignation',roomVar[socket.room].gameData.reqFrom_id);
					}

					cb();
					
				});
				// function watch(event, obj) {
				//     PubSub.on(event, function(model) {
				//         // I want to update the entire object
				//         // I understand that currently, this is just reassigning
				//         // I know I can do obj.prop = model, but that's not what I want to do
				//         obj = model;
				//     });
				// }
			

				function reduceString(statement){ //remove extra white spaces
					statement = statement + "" + " ";
						    statement = statement.replace(/\s\s+/g, ' ');
							statement = statement.replace(/\n+/g, ' ');
							return statement;
				}
				function checkIfReady(){
					if (roomVar[socket.room].playerQueue.length!=2){
						io.in(socket.room).emit('gameUpdate', 'Waiting for players ..', roomVar[socket.room].gameStatus,false,'red');
					}else{
						io.in(socket.room).emit('gameUpdate', '', roomVar[socket.room].gameStatus,false,'blue');
					}
				}

				function socketWinnerUpdate(perspective,winnerBy,winnerUser){
						//remove all timer because all timer events are involve
						// console.log('clockTimer = ' +timers[socket.room].clockTimer);
						// console.log('s1 = ' + util.inspect(roomVar[socket.room],false,null));

						// console.log('c1 = ' +util.inspect(roomVar[socket.room],false,null));


						clearInterval(timers[socket.room].dcTimer);
							// timers[socket.room].dcTimer = null;
						clearInterval(timers[socket.room].clockTimer);
							// timers[socket.room].clockTimer = null;
						clearInterval(timers[socket.room].iniTimer);
							// timers[socket.room].iniTimer = null;
						clearInterval(timers[socket.room].aiTimer);
							// timers[socket.room].aiTimer = null;

						// console.log('c2 = ' +util.inspect(roomVar[socket.room],false,null));


						// console.log('winner update '+ timers[socket.room].clockTimer);

						// console.log('w update' +util.inspect(roomVar,false,null));

						//insert database
							if (perspective=='player1') gameWinner = roomVar[socket.room].gameData.reqFrom_id._id;
							else if (perspective =='player2') gameWinner = roomVar[socket.room].gameData.reqTo_id._id;

							var game_set = {
							        game_id          : roomVar[socket.room].gameData._id,
							        p1_moves         : roomVar[socket.room].algP1,
							        p2_moves         : roomVar[socket.room]['algP2'],
							        scrambleMoves    : roomVar[socket.room].scramble,
							        endedTime        : roomVar[socket.room].clockCtr,
							        gameWinner       : gameWinner,  
							        winnerBy         : winnerBy,  
							};

							models.createArchiveGame(game_set,function(err,data){
								if (err) console.log(err);

								//clear algs after game

									

									// console.log(roomVar[socket.room]['algP2']);
								// console.log(data);
							});

									roomVar[socket.room].scramble = '';
									roomVar[socket.room]['algP1']='';
									roomVar[socket.room]['algP2']='';
									roomVar[socket.room].arrayAlg = null;
									roomVar[socket.room].arrayAlg1 = null;
									roomVar[socket.room].player1Dc=3;
									roomVar[socket.room].player2Dc=3;
						
						// console.log('algP2 = ' + roomVar[socket.room].algP2);
								// watch("anEvent", roomVar[socket.room]['algP2']);
						//insert database -end

					

						// console.log('pumasok ulit '  + roomVar[socket.room]['algP2'])

					
						if (winnerBy == 'resignation' || winnerBy == 'time'){
							roomVar[socket.room].gameStatus ='idle';
						}else{ // if won by disconnection

								io.in(socket.room).emit('updateAbandon');
								abandonGame(function(){  });

							roomVar[socket.room].gameStatus = 'abandon';
						}

						
						//update roomscore
						if (perspective == 'player1'){
							roomVar[socket.room].roomScore.p1++;
						}else if (perspective == 'player2'){
							roomVar[socket.room].roomScore.p2++;
						}
						io.in(socket.room).emit('roomScoreUpdate',roomVar[socket.room].roomScore);
						funcUpdateLiveGames();
						
						//if single player
						if (roomVar[socket.room].gameData.reqTo_id._id == '-1' && perspective == 'player2'){	
							winnerUser = roomVar[socket.room].gameData.reqFrom_id;
							io.in(socket.room).emit('winnerUpdate',perspective,roomVar[socket.room].gameStatus,winnerUser,'1');
							return;
						}else if (roomVar[socket.room].gameData.reqTo_id._id == '-1' && perspective == 'player1'){
							io.in(socket.room).emit('winnerUpdate',perspective,roomVar[socket.room].gameStatus,winnerUser,'0');
							return;
						}
						
					


						//update rating
					var tempP1,tempP2;
					
					models.getRating([roomVar[socket.room].gameData.reqFrom_id._id,
							 roomVar[socket.room].gameData.reqTo_id._id],function(err,data){
								data.forEach(function(item){
									if (item._id == roomVar[socket.room].gameData.reqFrom_id._id) tempP1 = item.user_score;
									if (item._id == roomVar[socket.room].gameData.reqTo_id._id) tempP2 = item.user_score;
								});

								//set rating
								setRatedPoints(tempP1,tempP2,(perspective == 'player1'?'1':'2'),function(p1Points,p2Points){
										scoreDiff = {
											p1: Math.abs(tempP1 - p1Points),
											p2: Math.abs(tempP2 - p2Points)
										}
										io.in(socket.room).emit('winnerUpdate',perspective,
											roomVar[socket.room].gameStatus,winnerUser,'0',scoreDiff);

										//update database rating

										models.setRating(roomVar[socket.room].gameData.reqFrom_id._id,p1Points,function(){
											models.setRating(roomVar[socket.room].gameData.reqTo_id._id,p2Points,function(){
												// funcRatingUpdate();
											});
										});


								});

								
								// io.in(socket.room).emit('updateRating',pRating);
					 });




				}
			

			

				function reconnection(){
					clearInterval(timers[socket.room].dcTimer);
					timers[socket.room].dcTimer = null;
					roomVar[socket.room].dcInc = 0;
					roomVar[socket.room].iniCtr = 3;
					timers[socket.room].iniTimer = setInterval(function(){

					roomVar[socket.room].iniStr = 'The game starts in ' +roomVar[socket.room].iniCtr;


						if (roomVar[socket.room].iniCtr==0){
							roomVar[socket.room].iniStr = 'Go!';

							 roomVar[socket.room].gameStatus = 'onGame'; //resume clock time

							 roomVar[socket.room].clockStartTime = new Date().getTime()- roomVar[socket.room].clockCtr; //reserve time

							 timers[socket.room].clockTimer = setInterval(function(){
							 	//continue from reserve time
							 	roomVar[socket.room].clockCtr = new Date().getTime() - roomVar[socket.room].clockStartTime;
								 io.in(socket.room).emit('clockUpdate',roomVar[socket.room].clockCtr); 
						 		roomVar[socket.room].clockCtr++;
							 },10);

							
							 //resume computer time
							 if (roomVar[socket.room].gameData.reqTo_id._id == '0'){
							 	computerTimerInit();
							 }

						}

						// 3 2 1 go
						 io.in(socket.room).emit('gameUpdate', 
						 		roomVar[socket.room].iniStr, roomVar[socket.room].gameStatus,false,'blue');

						 if (roomVar[socket.room].iniCtr<=0){
						 	clearInterval(timers[socket.room].iniTimer);
						 	timers[socket.room].iniTimer = null;
						 }
						 roomVar[socket.room].iniCtr--;
					},1000);

				}

				socket.on('readyGame',function(data,cb){

					// console.log('algp2 = ' + roomVar[socket.room]['algP2']);

								//add queue of ready
							if ([roomVar[socket.room].gameData.reqTo_id._id,
								 roomVar[socket.room].gameData.reqFrom_id._id].indexOf(socket.userInfo._id)>-1 &&
								 roomVar[socket.room].readyQueue.indexOf(socket.userInfo._id)<0)
								 {
									 roomVar[socket.room].readyQueue.push(socket.userInfo._id);
								 }
							// console.log(roomVar[socket.room].readyQueue);

							//if computer opponent
							if (roomVar[socket.room].gameData.reqTo_id._id =='0'){
								roomVar[socket.room].readyQueue.push('0');
							}else if (roomVar[socket.room].gameData.reqTo_id._id == '-1'){
								roomVar[socket.room].readyQueue.push('-1');
							}


							//start if  ready
							if (roomVar[socket.room].readyQueue.length==2){
								roomVar[socket.room].readyQueue = [];
								roomVar[socket.room].gameStatus = 'iniGame';
								roomVar[socket.room].iniCtr = 3;
				 		 	// console.log('iniTimer ' +util.inspect(timers[socket.room].iniTimer,false,null));

								timers[socket.room].iniTimer = setInterval(function(){
											roomVar[socket.room].iniStr = 'The game starts in ' +roomVar[socket.room].iniCtr;
									if (roomVar[socket.room].iniCtr==0){
											roomVar[socket.room].iniStr = 'Go!';
											//create game database


											//update scramble
											if (roomVar[socket.room].gameData.cubeType == '3x3x3'){
												roomVar[socket.room].scramble = scrambler.cube3();
												// roomVar[socket.room].scramble = "R U R'";
								// roomVar[socket.room].scramble = "F' D R' F2' D' F2' U B L' B' R' U' F R F2' R2' U' B R2' B' U";
								 // roomVar[socket.room].scramble = "D F2' D F' D' B' R2' B' L2' U' B' L2' U' R B2' U2' L D B R2' F2'";
								 // roomVar[socket.room].scramble = "F2 R2 B' D' L' U2 B2 R' U L2 B U L2 B R2 B D F D' F2 D'";
											}else if (roomVar[socket.room].gameData.cubeType == '2x2x2'){
												roomVar[socket.room].scramble = scrambler.cube2();
											}

											//send solution
											roomVar[socket.room].algSolution = inverseAlg(roomVar[socket.room].scramble);
											// roomVar[socket.room]['roomMsg'].push({
											// 			'username':'Computer',
											// 			'avatar':'img/user/robotDefault.png',
											// 			'msg':'Solution: ' + roomVar[socket.room].algSolution
											// 		});

											// io.sockets.in(socket.room).emit('updateRoomMsg',roomVar[socket.room]['roomMsg']);

											io.sockets.in(socket.room).emit('updateAlgSolution',roomVar[socket.room]['algSolution']);

				
											//computer algorithm
											if (roomVar[socket.room].gameData.reqTo_id._id == '0'){

												roomVar[socket.room].aiAlg = reduceString(pochmann.solve(roomVar[socket.room].scramble)).split(' ');
												console.log(roomVar[socket.room].aiAlg.length);
												roomVar[socket.room].aiCtr=0;
												computerTimerInit();
											}
											//computer algorithm -end

											
											//update room scramble
											 roomVar[socket.room].gameStatus = 'onGame';
											 io.in(socket.room).emit('gameStartInit',roomVar[socket.room].scramble, 
										 			roomVar[socket.room].scramble,roomVar[socket.room].gameStatus); 

												 // roomVar[socket.room].algP1=roomVar[socket.room].scramble + " ";
												 // roomVar[socket.room]['algP2']=roomVar[socket.room].scramble + " ";
												 	 
											 
											 //start time
											 roomVar[socket.room].clockCtr = 0;
											 roomVar[socket.room].clockStartTime = new Date().getTime();

											 timers[socket.room].clockTimer = setInterval(function(){

										roomVar[socket.room].clockCtr = new Date().getTime() - roomVar[socket.room].clockStartTime;
										roomVar[socket.room].clockReserve = new Date().getTime();

										 		 io.in(socket.room).emit('clockUpdate',roomVar[socket.room].clockCtr); 
										 		// roomVar[socket.room].clockCtr+=10;


										 		// console.log('clockUpdate = ' + roomVar[socket.room].clockCtr);
										 		// console.log(timers[socket.room].clockTimer);
											 },10);
											 // console.log('c = ' + util.inspect(roomVar[socket.room],false,null));
											// console.log('c = ' +util.inspect(timers[socket.room].clockTimer,false,null));

									}
									// 3 2 1 go
									 io.in(socket.room).emit('gameUpdate', 
								 		roomVar[socket.room].iniStr, roomVar[socket.room].gameStatus,false,'blue');
									 console.log('inictr = ' + roomVar[socket.room].iniCtr);
									 if (roomVar[socket.room].iniCtr<=0){
									 	// console.log('remove iniTimer');
									 	// console.log('r iniTimer ' + timers[socket.room].iniTimer);
									 	// console.log('r  = ' + socket.room);
									 		 	// console.log('iniTimer ' +util.inspect(timers[socket.room].iniTimer,false,null));

									 	clearInterval(timers[socket.room].iniTimer);
									 	// timers[socket.room].iniTimer = null;
									 }
									 roomVar[socket.room].iniCtr--;
								},1000);
							}
							cb();
					
				});  
				function computerTimerInit(){
						//get user speed
						models.getUserRankAverage(roomVar[socket.room].gameData.reqFrom_id._id.toString(),
												 roomVar[socket.room].gameData.cubeType.toString(),function(time,rank){
							//set computer speed
							if (time == 0) time = 120000;
							
							// console.log('time = ' + time);
							// //increase to 15% time for computer
							// time+=time *.25;

							// console.log('time = ' + time);



							// roomVar[socket.room].comSpeed = (time/100)*6;
							
								// timers[socket.room].aiTimer = setInterval(function(){

										// roomVar[socket.room]['algP2']+=roomVar[socket.room].aiAlg[roomVar[socket.room].aiCtr] + " ";
										// checkWinner();

										//time  = userspeed
						// console.log('aiAlg = ' + roomVar[socket.room].aiAlg);
						// console.log('algp2 = ' +roomVar[socket.room]['algP2']);
						// console.log('aiAlg = ' + roomVar[socket.room].aiAlg);

						if (roomVar[socket.room]['algP2'] == ''){
							io.in(socket.room).emit('matrixComputerUpdate',roomVar[socket.room].scramble,roomVar[socket.room].aiAlg,time); 
								// console.log('l = ' + roomVar[socket.room].aiAlg.length + ' initMatrix');
						
						}else{
						    roomVar[socket.room].tempAiAlg = roomVar[socket.room].aiAlg.slice(0);
							roomVar[socket.room].tempAiAlg.splice(0,roomVar[socket.room]['algP2'].split(' ').length-1);

							io.in(socket.room).emit('matrixComputerUpdate','',roomVar[socket.room].tempAiAlg,time);
							// console.log(roomVar[socket.room]['algP2']);
							// console.log('algP2 = ' + roomVar[socket.room].algP2);
							// console.log('l = ' + roomVar[socket.room].aiAlg.length)
						}
								// console.log(roomVar[socket.room].aiAlg);
										// roomVar[socket.room].aiCtr++;
										// console.log('computerTimerInit ' + socket.room + " "  + roomVar[socket.room].aiCtr);
										// console.log(roomVar[socket.room]['algP2']);
										if (roomVar[socket.room].aiCtr>=roomVar[socket.room].aiAlg.length){
											clearInterval(timers[socket.room].aiTimer);
											timers[socket.room].aiTimer = null;
										}
								// },roomVar[socket.room].comSpeed);
								// console.log('time = ' + time);
						  // console.log('id = ' + roomVar[socket.room].gameData.reqFrom_id._id +' speed = ' + roomVar[socket.room].comSpeed);
						});
				}
				socket.on('sendAlgP1',function(data,cb){  //send players solve algorithm 

					if (roomVar[socket.room].gameStatus != 'onGame') return cb();; //workaround fix for not reset all values
					roomVar[socket.room].algP1=data.alg;	//letter algs
					roomVar[socket.room].arrayAlg = data.arrayAlg; //pixels
					checkWinner();
					cb();
					// console.log('P1 moves = ' + roomVar[socket.room].algP1);
				});
				socket.on('sendAlgP2',function(data,cb){

					if (roomVar[socket.room].gameStatus != 'onGame') return cb();; 
					roomVar[socket.room]['algP2']=data.alg;
					roomVar[socket.room].arrayAlg1 = data.arrayAlg;
					checkWinner();
					cb();
				});
				function checkWinner (){
					

			// console.log('p1 = ' +checkSolver.isSolve(roomVar[socket.room].scramble + " "+ roomVar[socket.room].algP1) + "  " +
			// 						roomVar[socket.room].scramble + " " + roomVar[socket.room].algP1  );

			// console.log('p2 = ' +checkSolver.isSolve(roomVar[socket.room].scramble + " "+ roomVar[socket.room]['algP2']) + " " +
			// 						roomVar[socket.room].scramble + " " + roomVar[socket.room]['algP2']  );
				// console.log(roomVar[socket.room].gameData.cubeType.charAt(0) + " hihi");
					if (checkSolver.isSolve(roomVar[socket.room].scramble + " "+ roomVar[socket.room].algP1,
						roomVar[socket.room].gameData.cubeType.charAt(0))) {
						// roomVar[socket.room].gameData.cubeType.charAt(0))){
						 	socketWinnerUpdate('player1','time',roomVar[socket.room].gameData.reqFrom_id);
					
					}
					else if (checkSolver.isSolve(roomVar[socket.room].scramble + " "+ roomVar[socket.room]['algP2'],
						roomVar[socket.room].gameData.cubeType.charAt(0))){
						 	socketWinnerUpdate('player2','time',roomVar[socket.room].gameData.reqTo_id);
					
					}


					// console.log(roomVar[socket.room]['algP2']);
		
						
				}
				socket.on('cube_recon',function(data,cb){
					cb(roomVar[socket.room].scramble,roomVar[socket.room].arrayAlg,
					   roomVar[socket.room].scramble,roomVar[socket.room].arrayAlg1,
					   roomVar[socket.room].algP1,roomVar[socket.room]['algP2']);
				});

				socket.on('sendRoomMsg',function(data,cb){
						if (roomVar[socket.room] == undefined) return cb();

						roomVar[socket.room]['roomMsg'].push({
									'username':socket.userInfo.username,
									'avatar':socket.userInfo.user_avatar,
									'msg':data.msg
								});


						io.sockets.in(socket.room).emit('updateRoomMsg',roomVar[socket.room]['roomMsg']);
						cb();
				});

				socket.on('disconnect', function() {


					//for online users
						io.emit('updateOnlineUsers',funcUpdateOnline());
					    

			     	if (String(socket.room).indexOf("room") < 0) return; //if disconnect in game or not
			     														//remove id from game
			     	if (socket.userInfo == undefined) return;



					// console.log('disconnect in game dev');
			     	//remove from userList
			  //  		roomVar[socket.room]['userList'] = roomVar[socket.room]['userList'].filter(function( obj ) {
			  //  			 return obj !== socket.userInfo._id;
					// });
						if (roomVar[socket.room].userList.indexOf(socket.userInfo._id)!=-1){
							roomVar[socket.room].userList.splice(roomVar[socket.room].userList.indexOf(socket.userInfo._id),1);
						}

					
			   		//update users given id
					models.getUsersById(roomVar[socket.room]['userList'],function(err,data){
					    io.sockets.in(socket.room).emit('updateUsersInRoom',data); //broadcast also itself
					});

					//user say left the room
					roomVar[socket.room]['roomMsg'].push({
									'username':socket.userInfo.username,
									'avatar':socket.userInfo.user_avatar,
									'msg':"Left the room"
								});
					io.sockets.in(socket.room).emit('updateRoomMsg',roomVar[socket.room]['roomMsg']);

					//delete queue
					roomVar[socket.room]['readyQueue'] = roomVar[socket.room]['readyQueue'].filter(function( obj ) {
			   			 return obj !== socket.userInfo._id;
					});
					// console.log(roomVar[socket.room]['readyQueue']);


					// console.log('userList ' + roomVar[socket.room]['userList']);
					// console.log('dc sr = ' + socket.room);
					//if ini default ini
					// console.log('gm = ' +roomVar[socket.room].gameStatus);
					if (roomVar[socket.room].gameStatus == 'iniGame' && socket.userPerspective !='observer'){
						clearInterval(timers[socket.room].iniTimer);
						timers[socket.room].iniTimer = null;
						 roomVar[socket.room].readyQueue = [];
						 io.in(socket.room).emit('gameUpdate', '', roomVar[socket.room].gameStatus,true,'blue');
					}
					if (roomVar[socket.room].gameStatus == 'reconnect'){
						clearInterval(timers[socket.room].iniTimer);
						timers[socket.room].iniTimer = null;
					}
					

					//if on game and player disconnect and from 2 players game
					if ((roomVar[socket.room].gameStatus == 'onGame' || 
						roomVar[socket.room].gameStatus == 'reconnect') && socket.userPerspective != 'observer' &&
						roomVar[socket.room].playerQueue.length==2)
					{

							//for 1 second delay dc timer glitch
							clearInterval(timers[socket.room].dcTimer);
							timers[socket.room].dcTimer = null;

							//for computer timer stop
							if (roomVar[socket.room].gameData.reqTo_id._id == '0')
							clearInterval(timers[socket.room].aiTimer);
							timers[socket.room].aiTimer = null;

							//if times of dc limit is reached

							console.log('p1 dc = ' + roomVar[socket.room].player1Dc);
							console.log('p2 dc = ' + roomVar[socket.room].player2Dc);
							
							if (roomVar[socket.room]['player1Dc'] <=0 && socket.userPerspective == 'player1'){
								console.log('pumasok 1');
								socketWinnerUpdate('player2','disconnection',roomVar[socket.room].gameData.reqTo_id);
								return;
							}else if (roomVar[socket.room]['player2Dc'] <=0 && socket.userPerspective =='player2'){
									console.log('pumasok 2');
								socketWinnerUpdate('player1','disconnection',roomVar[socket.room].gameData.reqFrom_id);
								return;
							}

							//decrement number of disconnection
							roomVar[socket.room][socket.userPerspective + 'Dc']--;
							clearInterval(timers[socket.room].clockTimer);
							timers[socket.room].clockTimer = null;

							//60 seconds disconnection
							roomVar[socket.room].dcInc = 60;
							timers[socket.room].dcTimer = setInterval(function(){ //pause flipclock

								roomVar[socket.room].gameStatus = 'reconnect';

								roomVar[socket.room].dcStr = "Waiting for reconnection .. " + roomVar[socket.room].dcInc;


		// console.log('pq = ' +roomVar[socket.room].playerQueue + " reqto = " +roomVar[socket.room].gameData.reqTo_id + " " );
			// console.log('TEST = ' + (roomVar[socket.room].playerQueue.indexOf(roomVar[socket.room].gameData.reqTo_id._id.toString())>-1));

									 io.in(socket.room).emit('gameUpdate', roomVar[socket.room].dcStr, roomVar[socket.room].gameStatus,false,'red');

									console.log('dcInc ' + roomVar[socket.room].dcInc);
							
								// if dc clock expires
								if (roomVar[socket.room].dcInc<=0){

									// console.log('clear timer');
									// console.log('pq = ' +roomVar[socket.room].playerQueue + " reqto = " +roomVar[socket.room].gameData.reqTo_id + " " +
									// 	roomVar[socket.room].playerQueue.indexOf(roomVar[socket.room].gameData.reqTo_id._id)>-1 );

									clearInterval(timers[socket.room].dcTimer);
									timers[socket.room].dcTimer =null;
									// console.log("PQueue " + roomVar[socket.room].playerQueue);
									// console.log('s = ' + socket.userInfo._id);
									// console.log('d = ' + roomVar[socket.room].playerQueue.indexOf(socket.userInfo._id)>-1 )

									if (roomVar[socket.room].playerQueue.toString().indexOf(roomVar[socket.room].gameData.reqFrom_id._id.toString())>-1 ){
										console.log(' dc p1');
									   socketWinnerUpdate('player1','disconnection',roomVar[socket.room].gameData.reqFrom_id);
									}else if (roomVar[socket.room].playerQueue.toString().indexOf(roomVar[socket.room].gameData.reqTo_id._id.toString())>-1 ){
											console.log(' dc p2');
									   socketWinnerUpdate('player2','disconnection',roomVar[socket.room].gameData.reqTo_id);
									}else{
										//abandon game
									}
								}

								if (roomVar[socket.room].gameStatus == 'reconnect' && roomVar[socket.room].playerQueue.length==2){
									reconnection();
								}

								roomVar[socket.room].dcInc--;


							},1000);
						
					}

					//remove from playerQueue
					// roomVar[socket.room].playerQueue = roomVar[socket.room].playerQueue.filter(function(obj){
					// 	return obj !== socket.userInfo._id;
					// });
						if (roomVar[socket.room].playerQueue.indexOf(socket.userInfo._id)!=-1){
							roomVar[socket.room].playerQueue.splice(roomVar[socket.room].playerQueue.indexOf(socket.userInfo._id),1);
						}
					

					// console.log("PQueue dc" + roomVar[socket.room].playerQueue);

					checkIfReady();


			   	});

			


			   		socket.on('updatePixels', function (data){
			   			socket.broadcast.to(socket.room).emit('playerPixels',data);
					});
					socket.on('updatePixels1', function (data){
						socket.broadcast.to(socket.room).emit('playerPixels1',data);
					});

			//####################################### - Game - end #########################################################

				socket.join(socket.request.session.user_id);
				socket.room=socket.request.session.user_id;

				socket.broadcast.to(socket.room).emit('multipleLogin');
				// console.log('new user ' + socket.room);


		//######################## -- online users and live games -- ################################

				
	    		socket.on('reqUpdateOnlineUsers',function(data,callback){
					callback(funcUpdateOnline());
	    		});

	    		socket.on('reqUpdateLiveGames',function(data,callback){
					funcUpdateLiveGames();
					callback();
	    		});

	    		io.emit('updateOnlineUsers',funcUpdateOnline());

	    		
				if (socket.request.session.modalHelp!=undefined){
					socket.request.session.modalHelp = null;
					socket.emit('modalUpdate');
					socket.request.session.modalHelp = null;
					// socket.request.session.modalHelp.destroy();
					console.log('session modalHelp = ' + socket.request.session.modalHelp);
				}

				
				// socket.on('stopModalHelp',function(data,callback){
				// 	socket.request.session.modalHelp = undefined;
				// 	console.log('socket stop help ' + socket.request.session.modalHelp);
				// });

    		//#################-- online users and live games -end ###########################





				// rooms for chat and inbox

			socket.on('reqUpdateChat', function (user,callback){
				io.sockets.in(user).emit('updateChat'); //broadcast also itself
				io.sockets.in(socket.request.session.user_id).emit('updateChat'); //broadcast also itself

				io.sockets.in(user).emit('updateInbox'); //broadcast also itself
				io.sockets.in(socket.request.session.user_id).emit('updateInbox');

				callback();
			});
			socket.on('reqUpdateFriendReq', function (user,callback){
				console.log('reqUpdateFriendReq');
				io.sockets.in(user).emit('friendReq'); //broadcast also itself
				io.sockets.in(socket.request.session.user_id).emit('friendReq'); //broadcast also itself
				callback();
			});

							// gameReq:gameReq,userFrom:$rootScope.userInfo,userTo:$scope.inviteData}
			socket.on('createReqGame',function (data,callback){
						//data from _id is the primary key of temporary request variable

						//#######-computer opponent-############## or single player
						data.gameReq.reqDate = new Date();
						
						if (data.gameReq.reqTo_id == '0' || data.gameReq.reqTo_id == '-1'){
							//assign room variables of newly created game
							models.createGame(data.gameReq,function(err,c_data){
								io.sockets.in(data.gameReq.reqFrom_id).emit('redirGame',c_data._id);
								io.sockets.in(data.gameReq.reqTo_id).emit('redirGame',c_data._id);

								//initialize variable
								iniVarGames(function(){
										funcUpdateLiveGames();
									
								});
									
							});
							return;
						}
						//#######-computer opponent- end ##############
						
						
					if (varUserInclude.indexOf(data.gameReq.reqTo_id)>-1){
						callback(1);
					}else{


							varGameReqs[data.gameReq.reqFrom_id] = data.gameReq;

							varTimerInc[data.gameReq.reqFrom_id] = 1;

							// console.log(varGameReqs);
							
							

							//include users in request
							varUserInclude.push(data.gameReq.reqFrom_id);
							varUserInclude.push(data.gameReq.reqTo_id);


							varGameTimers[data.gameReq.reqFrom_id] = setInterval(function(){

										io.sockets.in(data.gameReq.reqFrom_id).emit('updateInvite',varTimerInc[data.gameReq.reqFrom_id],
													data.userTo,data.gameReq);

									
										io.sockets.in(data.gameReq.reqTo_id).emit('updateReceived',varTimerInc[data.gameReq.reqFrom_id],
													data.userFrom,data.gameReq);
									
										

										if (varTimerInc[data.gameReq.reqFrom_id]<0){
												
										//remove id when finish
										// console.log(varGameReqs);

										clearInterval(varGameTimers[data.gameReq.reqFrom_id]);
										varGameTimers[data.gameReq.reqFrom_id] = null;
											varGameReqs = varGameReqs.filter(function( obj ) {
											    return obj.reqFrom_id !== data.gameReq.reqFrom_id;
											});

											//delete user1 and use to to list
											varUserInclude = varUserInclude.filter(function(obj){
												return obj !== data.gameReq.reqFrom_id;
											});
											varUserInclude = varUserInclude.filter(function(obj){
												return obj !== data.gameReq.reqTo_id;
											});

											io.sockets.in(data.gameReq.reqFrom_id).emit('closeModal');
											io.sockets.in(data.gameReq.reqTo_id).emit('closeModal');


										}

									
										varTimerInc[data.gameReq.reqFrom_id]-=.050;
							},1000);


							
							 callback(0);
					}
				// create req game
						
			});
				socket.on('deleteGameReq',function (data,callback){
						//if empty object
						if (Object.keys(data).length === 0 && data.constructor === Object) callback();
						else{
								clearInterval(varGameTimers[data.gameData.reqFrom_id]);
								varGameTimers[data.gameData.reqFrom_id] = null;
								varGameReqs = varGameReqs.filter(function( obj ) {
								    return obj.reqFrom_id !== data.gameData.reqFrom_id;
								});

								//delete user1 and use to to list
								varUserInclude = varUserInclude.filter(function(obj){
									return obj !== data.gameData.reqFrom_id;
								});
								varUserInclude = varUserInclude.filter(function(obj){
									return obj !== data.gameData.reqTo_id;
								});



								io.sockets.in(data.gameData.reqFrom_id).emit('closeModal');
								io.sockets.in(data.gameData.reqTo_id).emit('closeModal');

								
						}

				});
				socket.on('declineGameReq',function (data,callback){
						//if empty object
						if (Object.keys(data).length === 0 && data.constructor === Object) callback();
						else{

								clearInterval(varGameTimers[data.gameData.reqFrom_id]);
								varGameTimers[data.gameData.reqFrom_id] = null;
								//delete id
								varGameReqs = varGameReqs.filter(function( obj ) {
								    return obj.reqFrom_id !== data.gameData.reqFrom_id;
								});

								//delete user1 and use to to list
								varUserInclude = varUserInclude.filter(function(obj){
									return obj !== data.gameData.reqFrom_id;
								});
								varUserInclude = varUserInclude.filter(function(obj){
									return obj !== data.gameData.reqTo_id;
								});


								// console.log('userInclude = ' + varUserInclude);

								io.sockets.in(data.gameData.reqFrom_id).emit('declineModal');
								io.sockets.in(data.gameData.reqTo_id).emit('closeModal');

								
						}

				});

					socket.on('acceptGameReq',function(data,callback){
						clearInterval(varGameTimers[data.gameData.reqFrom_id]);
						varGameTimers[data.gameData.reqFrom_id] = null;
						varGameReqs = varGameReqs.filter(function( obj ) {
								    return obj.reqFrom_id !== data.gameData.reqFrom_id;
						});

						//delete user1 and use to to list
						varUserInclude = varUserInclude.filter(function(obj){
							return obj !== data.gameData.reqFrom_id;
						});
						varUserInclude = varUserInclude.filter(function(obj){
							return obj !== data.gameData.reqTo_id;
						});


						//assign room variables of newly created game
						models.createGame(data.gameData,function(err,c_data){
							io.sockets.in(data.gameData.reqFrom_id).emit('redirGame',c_data._id);
							io.sockets.in(data.gameData.reqTo_id).emit('redirGame',c_data._id);

							//initialize variable
							iniVarGames(function(){
								funcUpdateLiveGames();
							});

								
						});
						
						callback();



				});

				
	
			

	});



    return io;
}

