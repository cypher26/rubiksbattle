var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var session = require('express-session');
var  path = require('path');



router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false}));

 var multer = require('multer');

var models = require('../database/models');

	



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
router.post('/register',function(req,res,next){

	console.log('checkRegister');
		console.log(req.body.username 
			+ " " + req.body.password 
			+ " " + req.body.email 
			+ " " + req.body.firstname
			+ " " + req.body.lastname
			+ " " + req.body.gender
			+ " " + req.body.birth
			+ " " + req.body.country
			+ " " + req.body.location
			+ " " + req.body.about
			+ " " + req.body.since
				);
		// console.log(req.body);
				console.log('user.js');
				res.send();


			var newUser = {
					    username             : req.body.username,
					    user_password        : req.body.password,
					    user_email           : req.body.email,
					    user_fname           : req.body.firstname,
					    user_lname           : req.body.lastname,
					    user_gender          : req.body.gender,
					    user_birthDate       : req.body.birth,
					    user_country         : req.body.country,
					    user_location        : req.body.location,
					    user_about           : req.body.about,
					    user_since           : req.body.since,
   					
				};


				// create user
			models.createUser(newUser,function(err,mainData,id){
				if (err) throw err;
				
					console.log('user created ' + mainData + ' ' + id);
				

			});
				


				
});
router.post('/createMsg',function(req,res,next){
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
			console.log('created ' + data);
			res.send();

		});
});
router.post('/deleteInbox',function(req,res,next){
		
 		   models.deleteInbox(req.body.inbox_id,req.session.user_id,function(){
					res.send();
			});

});
router.post('/deleteChat',function(req,res,next){
		
 		    let requests = req.body.chat_id.reduce((promiseChain, item, index) => {
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

			console.log('userLogin');
				models.getUserId(req.body.username,req.body.password,function(err,data){
					if (err) console.log(err);
					if (data.length == 0){
							res.send({exist:false})
					}else{
						req.session.user_id = data[0]._id;

						console.log("id = " + data[0]._id);
						res.send({exist:true})
						
					}
				});




});
router.post('/getUserInfo',function(req,res,next){
		models.getUserInfo(req.session.user_id,function(err,data){
				res.send({userInfo:data});
		});
});
router.post('/getChatInfo',function(req,res,next){
		models.getUserInfo(req.body.user_id,function(err,data){
				res.send({userInfo:data});
		});
});
router.post('/checkUserIfTaken',function(req,res,next){

			console.log('checkUser');
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

			console.log('checkEmail');
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

			console.log('view inbox');
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
			console.log('seenMsg');
			if (err) console.log(err); else res.send();
		});

});


router.post('/viewMsg',function(req,res,next){
		console.log('view msg');
		models.viewMsg(req.body.user,req.session.user_id,function(err,data){
		   res.send({msg:data});
		});
});





		

function testAuthentication(req,res, next){
	console.log('test authentication');
	user_authenticate = true;
	has_game = false;
	// req.session.user_id = '2';
	if (!req.session.user_id){
	// if (false){
		return next(); // logout system
	}
	else if(has_game){
		res.render('live');
	}else{
		res.render('index');
		// res.redirect('/');
	}

	
	
}
// router.get('/',function(req,res,next){
// 	res.render('index');
// });




router.all('*',testAuthentication, function(req, res, next) { // Just send the index.html for other files to support HTML5Mode
     // res.sendFile('/webpages/login.html', { root: __dirname + "/.." });
     console.log(new Date().toTimeString() + " *");
  // res.redirect('/about');
     // res.render('login');
      // res.sendFile('/webpages/index.html', { root:   __dirname + "/.." });
   
      
   		// res.sendFile('')

   		next();
});



router.get('/',function(req,res){
	console.log('render login');

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
	 console.log('404 route');
	 	res.redirect('/');
	// res.redirect('/login');
	 
});






module.exports = router;