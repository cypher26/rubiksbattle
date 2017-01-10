var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var session = require('express-session');
var  path = require('path');

var requestIp = require('request-ip'); //local ip

var externalip = require('externalip'); //external ip

var where = require('node-where');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false}));

 var multer = require('multer');

var models = require('../database/models');

	const net = require('net');




 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/img/upload/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
             cb(null, 'img_'+req.session.user_id + '.jpg');
       		 // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

router.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });





// app.set('views', path.join(__dirname, 'views'));
router.post("/logout",function(req,res){
		  req.session.destroy(function(err) {
				  if(err) {
				    console.log(err);
				  } else {
				  	   res.send(); 
				  }
				});
});


// router.get('/services',function(req,res	){
// 	res.sendFile(__dirname + "/index.html");
// 	res.redirect('/about');
// });

// console.log('hahahaha');

// router.set('/', path.join(__dirname, 'webpages'));


// router.use("*",function(req,res){
// 	  // res.redirect(__dirname + '/index.html');
// 	  console.log('up');
// 	  res.sendFile('/webpages/index.html', { root: __dirname });
// 	})


router.post('/login',function(req,res,next){
		console.log('username = ' + req.body.username + " password = " + req.body.password);

		// if (req.body.username == 'jester' && req.body.password == 'password'){

		// }
		// console.log('edited');

		if (req.body.username == 'jester'){
				req.session.username = req.body.username;
				res.send({'login_status':true});
		}else{
				res.send({'login_status':false});
		}
		
		// res.redirect(307,'register');
		// next();		
});
function timeNow(){
	     var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth()+1; //January is 0!
                        var yyyy = today.getFullYear();

                        if(dd<10) {
                            dd='0'+dd
                        } 

                        if(mm<10) {
                            mm='0'+mm
                        } 

                        today = yyyy+'-'+mm+'-'+dd;
                        // alert(today);
                        var dt = new Date();
                        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        return today;
}
router.post('/register',function(req,res,next){

	console.log('checkRegister');
			
	country = '';
     (function() {
           return new Promise(function(resolve, reject){
               	externalip(function (err, ip) {
				  console.log('ip 123= ' +ip); // => 8.8.8.8

				  	if (ip !=undefined){
						where.is(ip, function(err, result) {
				  				// console.log('country = ' + result.get('country'));
				  				country = result.get(('country'));
				  				resolve();
						});
				  	}else{
				  		country = 'Philippines';
			  		    resolve();
				  	}
				});
              
           });
     })().then(function() {
         return new Promise(function(resolve, reject){



         		// console.log('c = ' + country);
         		// console.log('t = ' + Date.now());

                var newUser = {
					    username             : req.body.username,
					    user_password        : req.body.password,
					    user_email           : req.body.email,
					    user_country         : country,
					    user_since           : timeNow(),
					    user_score			 : 1500 //initial score for players
   				};

console.log('hahahaha');
					// create user
					models.createUser(newUser,function(err,mainData){
						// console.log('hihi');
						if (err) throw err;
							// console.log (typeof id);
							// console.log('user created ' + mainData + ' id=' + mainData._id);
							req.session.user_id = mainData['_id'];
							req.session.userInfo =mainData;
							console.log('mainData._id = ' + mainData['_id']);
							console.log('session = ' + req.session.user_id + " " + req.session.userInfo);
							res.send();
							 resolve();
							//500 error
							//200 success 


					});
				
               
           });
     });



		 // var clientIp = requestIp.getClientIp(req);

		 //  console.log('client ip = ' + clientIp);

			


				
});
router.post('/createMsg',function(req,res,next){
	if (req.body.username != undefined){
			// models.getUserInfo()
			models.getUserInfoByUsername(req.body.username,function(err,data){
			    // console.log(data);
			    if (data == null) res.status(500).send(); 
			    else{
			    	var newMsg = {
								   msg_text :req.body.msg,
								   msg_dateTime: new Date(),
								   msg_status: "unseen",
								   msg_from:req.session.user_id,
								   msg_to:data._id
							};

						// create user
						models.createMsg(newMsg,function(err,create_data){
							if (err) throw err;
							// console.log('created ' + data);
							res.send({id:data._id});

						});
			    }
			});

	}else{

		var newMsg = {
				   msg_text :req.body.msg,
				   msg_dateTime: new Date(),
				   msg_status: "unseen",
				   msg_from:req.session.user_id,
				   msg_to:req.body.user
			};

		// create user
		models.createMsg(newMsg,function(err,data){
			if (err) throw err;
			// console.log('created ' + data);
			res.send();

		});
	}
});
router.post('/deleteInbox',function(req,res,next){
		
 		   models.deleteInbox(req.body.inbox_id,req.session.user_id,function(){
					res.send();
			});

});
router.post('/deleteChat',function(req,res,next){
		
 		    var requests = req.body.chat_id.reduce((promiseChain, item, index) => {
              return promiseChain.then(() => new Promise((resolve) => {
            		 		delChat = {
								    user_id:req.session.user_id,
								    msg_id:item
							};
							models.deleteChat(delChat,function(err,data){
								if (err) throw err; console.log('created ' + data);
								  resolve();
							});
                       
              }));
          }, Promise.resolve()).then(function(){
            	 res.send();
          });

});
router.post('/checkPassIfTaken',function(req,res,next){

			console.log('checkPass');
				models.ifTakenPassword(req.body.password,function(err,data){
					if (err) console.log(err);
					if (data.length == 0){
						res.send({exist:false})
					}else{
						res.send({exist:true})
					}
				});

});
router.post('/userLogin',function(req,res,next){

			// console.log('userLogin');
				models.getUserId(req.body.username,req.body.password,function(err,data){
					if (err) console.log(err);
					if (data.length == 0){
							res.send({exist:false})
					}else{
						// console.log(typeof data[0]._id);	
						req.session.user_id = data[0]._id;

						console.log(req.session.user_id);
						req.session.userInfo = data[0];

						console.log("id = " + data[0]._id);
						res.send({exist:true})
						
					}
				});




});
router.post('/getUserInfo',function(req,res,next){
	if (req.body.id != undefined){
		models.getUserInfo(Number(req.body.id),function(err,user_data){
				//get computer info for computer opponent
				models.getUserInfo('0',function(err,computer_data){
					//get self info for single player
						models.getUserInfo('-1',function(err,self_data){
							res.send({userInfo:user_data,computerInfo:computer_data,selfInfo:self_data});
						});
						
				});
		});

	}else{
		models.getUserInfo(req.session.user_id,function(err,user_data){
				//get computer info for computer opponent
				models.getUserInfo('0',function(err,computer_data){
					//get self info for single player
						models.getUserInfo('-1',function(err,self_data){
							res.send({userInfo:user_data,computerInfo:computer_data,selfInfo:self_data});
						});
						
				});
		});


	}
		
});
router.post('/getChatInfo',function(req,res,next){
		models.getUserInfo(req.body.user_id,function(err,data){
				res.send({userInfo:data});
		});
});
router.post('/checkUserIfTaken',function(req,res,next){

			// console.log('checkUser');
				models.ifTakenUsername(req.body.username,function(err,data){
					if (err) console.log(err);
					if (data.length == 0){
						res.send({exist:false})
					}else{
						res.send({exist:true})
					}
				});

});
router.post('/checkEmailIfTaken',function(req,res,next){

			// console.log('checkEmail');
		models.ifTakenEmail(req.body.email,function(err,data){
					if (err) console.log(err);
					if (data.length == 0){
						res.send({exist:false})
					}else{
						res.send({exist:true})
					}
				});
});
router.post('/viewInbox',function(req,res,next){



			// console.log('view inbox');
		models.viewInbox(req.session.user_id,function(data){
			 // data.sort(function(a, b) { 
		  //     return a._id - b._id  ||  a.name.localeCompare(b.name);
		  //   });
		
			data.sort(function(a,b) {
			  if (a._id < b._id)
			    return 1;
			  if (a._id > b._id)
			    return -1;
			  return 0;
			});
			// console.log(data);
			// console.log(data);
			res.send({inbox:data});
		});


});
router.post('/seenMsg',function(req,res,next){

		models.seenMsg(req.body.user_id,req.session.user_id,function(err,data){
			// console.log('seenMsg');
			if (err) console.log(err); else res.send();
		});

});


router.post('/viewMsg',function(req,res,next){
		// console.log('view msg');
		models.viewMsg(req.body.user,req.session.user_id,function(err,data){
		   res.send({msg:data});
		});
});

router.post('/viewSpecificMember',function(req,res,next){
		models.viewSpecificMember(req.body.member_id,req.session.user_id,function(data){
			// console.log(data);
			if (data == undefined) {
				res.status(500).send();
				console.log('error specific member');
			}
			else res.send({userInfo:data[0]});
		});

});

router.post('/viewMembers',function(req,res,next){
		// console.log('view invite');
		models.viewMembers(req.body.findStr,req.session.user_id,function(data){

		   res.send({user_data:data});
		});
});

router.post('/viewFriendRequest',function(req,res,next){
	models.viewMembers('',req.session.user_id,function(data){
		//if friend request
	    var filterFriendReq = data.filter(function(e){
	        if (e.status === '2') return e;
		});
		
	   res.send({user_data:filterFriendReq});
	});
});


router.post('/viewFriends',function(req,res,next){
	if (req.body.id != undefined){ //if member is selected
		models.viewFriends(Number(req.body.id),function(err,data){
        	res.send({friendsData:data});
		});
	}else{
		models.viewFriends(req.session.user_id,function(err,data){
        	res.send({friendsData:data});
		});

	}
		
});

router.post('/editFriendStatus',function(req,res,next){
		// console.log('editFriendStatus');
		models.editFriendStatus(req.session.user_id,req.body.user_id,req.body.friend_status,function(data){
			console.log('success edit');
		   res.send();
		});
});

router.post('/getGameInfo',function(req,res,next){
		models.getGameInfo(req.body.id,function(err,data){
			// console.log('success get data');
				
		   res.send({gameData:data});
		});
	
});

router.post('/getArchiveGameInfo',function(req,res,next){


		models.getArchiveGameInfo(req.body.id,function(err,data){
				console.log(data);
			if (data == null) res.status(500).send();
			else res.send({archiveGameData:data});
		});

});

router.post('/getUserArchiveGameInfo',function(req,res,next){
		if (req.body.id != undefined){ //if member is selected
			models.getUserArchiveGameInfo(Number(req.body.id),function(err,data){
				res.send({archiveUserGameData:data});
			});
		}else{
			models.getUserArchiveGameInfo(req.session.user_id,function(err,data){
				res.send({archiveUserGameData:data});
			});

		}

		
});




router.post('/getHighscoreList',function(req,res,next){

		models.getHighscoreList(function(err,data){
				// console.log(data);
	
			 res.send({highscoreList:data});
		});

});

router.post('/getSingleList',function(req,res,next){

		models.getSingleList(req.body.cubeType,function(data){
				// console.log(data);
				res.send({singleList:data});
		});

});

router.post('/getAverageList',function(req,res,next){

		models.getAverageList(req.body.cubeType,function(data){
				// console.log(data);
				res.send({averageList:data});
		});

});


router.post('/getUserRankHighscore',function(req,res,next){
		if (req.body.id != undefined){ //if member is selected
			models.getUserRankHighscore(Number(req.body.id),function(user_score,rank){
    			res.send({userRankHighscore: {user_score:user_score,rank:rank} });
			});
		}else{
			models.getUserRankHighscore(req.session.user_id,function(user_score,rank){
    			res.send({userRankHighscore: {user_score:user_score,rank:rank} });
			});
		}
});

router.post('/getUserRankSingle',function(req,res,next){
	if (req.body.id != undefined){ //if member is selected
		models.getUserRankSingle(Number(req.body.id),req.body.cubeType,function(endedTime,rank){
		     res.send({userRankSingle: {endedTime:endedTime,rank:rank} });
		});
	}else{
		
		models.getUserRankSingle(req.session.user_id,req.body.cubeType,function(endedTime,rank){
		    res.send({userRankSingle: {endedTime:endedTime,rank:rank} });
		});
	}
		
});

router.post('/getUserRankAverage',function(req,res,next){
	if (req.body.id != undefined){ //if member is selected
		models.getUserRankAverage(Number(req.body.id),req.body.cubeType,function(endedTime,rank){
		    res.send({userRankAverage: {endedTime:endedTime,rank:rank} });
		});
	}else{
		models.getUserRankAverage(req.session.user_id,req.body.cubeType,function(endedTime,rank){
		    res.send({userRankAverage: {endedTime:endedTime,rank:rank} });
		});
	}
		
});


router.post('/getMemberSince',function(req,res,next){
	if (req.body.id != undefined){ //if member is selected
		models.getMemberSince(Number(req.body.id),function(err,data){
   	 		res.send({user_since:data[0].user_since});
		});
	}else{
		models.getMemberSince(req.session.user_id,function(err,data){
	   	 	res.send({user_since:data[0].user_since});
		});
	}
});




router.post('/updateFullName',function(req,res,next){
		models.updateFullName(req.session.user_id,req.body.fullName,function(err,data){
   				res.send({user_data:data});
			});	
});


router.post('/getAllUserStats',function(req,res,next){

	if (req.body.id != undefined){ //if member is selected
		models.getAllUserStats(Number(req.body.id),function(data2,data3){
		    res.send({data2:data2.won_lost_by, data3:data3.won_lost_by});
		});
	} 
	else{
		models.getAllUserStats(req.session.user_id,function(data2,data3){
		    res.send({data2:data2.won_lost_by, data3:data3.won_lost_by});
		});
	}
});





router.post('/getUserRating',function(req,res,next){
		var tempP1,tempP2; //temp user rating container
		models.getRating(req.body.ids,function(err,data){

				// console.log(data);
					data.forEach(function(item){
					if (item._id == req.body.ids[0]) tempP1 = item.user_score;
					if (item._id == req.body.ids[1]) tempP2 = item.user_score;
					});
					// console.log('1 = ' + tempP1 + " 2 = " + tempP2 );
					res.send({userRating:[tempP1,tempP2]})
		});
});



router.post("/liveAuthen",function(req,res,next){
	console.log('live authen');
		models.getGameInfo(req.body.id,function(err,data){
			
			//put session after guessing keyword
			if (data.reqKeyword ==req.body.keyword){
				req.session.livePrivate = 'private'+req.body.id;
			}
			res.send();
   				// 
   				
		});
});

router.get('/invalid',function(req,res,next){
	res.render('invalid');
});

router.get('/live',function(req,res,next){
	
	// for no back of page
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');


	models.getGameInfo(req.query.id,function(err,data){
			if (data==null || !req.session.user_id || data.reqStatus=='abandon') res.redirect('/');
			else if (data.roomType == '(Private)'){

				 //if have a session of access private or user is a player or room
				if (req.session.livePrivate == 'private'+req.query.id ||
					[data.reqFrom_id._id,data.reqTo_id._id].indexOf(req.session.user_id)>-1) { 
					
					//destroy session after open
					req.session.livePrivate = undefined;
					res.render('live');

				}
				else res.render('live_private');
   		 	}else{
   		 		res.render('live');
   		 	}

    });
		 
});



function has_game(req,res,next){
		models.has_game(req.session.user_id,function(err,data){
		    if (data!=null){
		    	return data._id;
		    }else{
		    	return false;
		    }
		});
	
}





function testAuthentication(req,res, next){
	
	// has_game = false;
	// req.session.user_id = '1';
	if (req.session.user_id==undefined){
	// if (false){
		return next(); // logout system
	}else{
		//redirect if has game
		models.has_game(req.session.user_id,function(err,data){
		    if (data!=null){
		    	res.redirect("live?id="+data._id+"");
		    }else{
	    		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
				res.render('index'); //enter the site if no games
		    }
		});

	}

	
	
}


router.all('*',testAuthentication, function(req, res, next) { // Just send the index.html for other files to support HTML5Mode
     // res.sendFile('/webpages/login.html', { root: __dirname + "/.." });
     // console.log(new Date().toTimeString() + " *");
  // res.redirect('/about');
     // res.render('login');
      // res.sendFile('/webpages/index.html', { root:   __dirname + "/.." });
   
      
   		// res.sendFile('')

   		next();
});



router.get('/',function(req,res){
	// console.log('render login');

	res.render('login');
	// res.redirect('/login');
	// next();
});


// router.get('/login',function(req,res){
// 	res.render('login');
// });
// console.log('testing');

router.get('*', function(req, res, next){
	 // res.sendFile('/views/login.html', { root:  __dirname  +"/.." });
	 // console.log('404 route');
	 	res.redirect('/');
	// res.redirect('/login');
	 
});






module.exports = router;