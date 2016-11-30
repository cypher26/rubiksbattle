var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var session = require('express-session');
var  path = require('path');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false}));


var models = require('../database/models');

	









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
router.post('/getUser',function(req,res,next){


		console.log('hi view');
});


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

 											  // username:$('#inputUsername').val(),
              //                                 password:escape($('#inputPassword').val()),
              //                                 repassword:escape($('#repassword').val()),
              //                                 email:$('#inputEmail').val(),
              //                                 firstname:escape($('#inputFName').val()),
              //                                 lastname:escape($('#inputLName').val()),
              //                                 gender:$("input[name='gender']:checked").val(),
              //                                 birth:$('#selectYear').val() + "-" + $('#selectMonth').val() + "-" + $('#selectDay').val(),
              //                                 country:escape($('#selectCountry').val()),
              //                                 location:escape($('#inputLocation').val()),
              //                                 about:escape($('#inputAbout').val()),
              //                                 since:today

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
   						 // user_avatar          : String
				};


				// create user
			models.createUser(newUser,function(err,data,id){
				if (err) throw err;
				console.log('created ' + data + " " + id);

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
						req.session.user_id = data._id;
						console.log("id = " + data._id);
						res.send({exist:true})
						
					}
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




		

function testAuthentication(req,res, next){
	console.log('test authentication');
	user_authenticate = true;
	has_game = false;
	if (!req.session.user_id){
	// if (false){
		return next();
	}
	else if(has_game){
		res.render('live');
	}else{
		res.render('index');
	}

	
	
}





router.all('*',testAuthentication, function(req, res, next) { // Just send the index.html for other files to support HTML5Mode
     // res.sendFile('/webpages/login.html', { root: __dirname + "/.." });
     console.log(new Date().toTimeString() + " *");
  // res.redirect('/about');
     // res.render('login');
      // res.sendFile('/webpages/index.html', { root:   __dirname + "/.." });
   
      // res.redirect('login');
   		// res.sendFile('')
   		next();
});



// router.get('/login',function(req,res){
// 	console.log('render login');
// 	res.render('login');
// 	// next();
// });







router.get('/*', function(req, res, next){
	 // res.sendFile('/partials/register.html', { root: __dirname });
	 console.log('all route');

	 // res.render('login');
	 // res.redirect('login');
	 // console.log('test pa ba');
	  // req.url = 'logintest';
	  res.render('login');
});




module.exports = router;