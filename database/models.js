var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
// var AutoIncrement = require('mongoose-sequence');
var autoIncrement = require('mongoose-auto-increment');

var db = require('mongodb');
var async = require("async");

var fs = require('fs'); //file edit
// mongoose.Promise = require('bluebird');

// mongoose.Promise = require('q').promise;

mongoose.Promise = global.Promise;


//without internet
// var mongoStr = "mongodb://127.0.0.1/rubiksbattle";

// var mongoStr = "mongodb://localhost/rubiksbattle";

// var mongoStr = 'mongodb://rubiksbattle_user:rubiksbattledbpassword@jello.modulusmongo.net:27017/eja4timI';
var mongoStr = 'mongodb://userdb:rubiksbattle@ds113841.mlab.com:13841/rubiksbattle';


mongoose.connect(mongoStr);
// console mongo jello.modulusmongo.net:27017/eja4timI -u rubiksbattle_user -p rubiksbattledbpassword
console.log(mongoose.connection.readyState);


var connection = mongoose.createConnection(mongoStr);
 
autoIncrement.initialize(connection);



var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("MYPASSWORD", salt);
var nodemailer = require('nodemailer');

var crypto = require('crypto');


// crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         console.log(token);
//       });

var Schema = mongoose.Schema;
// var ObjectId = require('mongodb').ObjectID;


// User Schema

 var user_collections = Schema({
     
        username             : String,
        user_password        :  String,
        user_email           :  String,
       user_fullName          : String,
        // user_gender           : String,
        // user_birthDate          : Date,
        user_country           : String,
        // user_location           : String,
        user_about           : String,
        user_since           : Date,
        user_avatar          : String,
        user_score            : Number,
        resetPasswordToken   : String,
        resetPasswordExpires  : Date
      
    });



 var msg_collections = Schema({
     
        msg_text            : String,
        msg_dateTime        :  Date,
        msg_status          :  String,
        msg_from            :  { type: Number, ref: 'user_collections' },
        msg_to              :  { type: Number, ref: 'user_collections' }
        
});
 var archive_msg_collections = Schema({
     
        user_id            : { type: Number, ref: 'user_collections' },
        msg_id             : { type: Number, ref: 'msg_collections' },
        
});

var friends_collections = Schema({
     
        user1_id            : { type: Number, ref: 'user_collections' },
        user2_id            : { type: Number, ref: 'user_collections' },
        friend_status       :  String,
        friend_action       : { type: Number, ref: 'user_collections' }
        
});


var game_collections = Schema({
     
        reqFrom_id       : { type: Number, ref: 'user_collections' },
        reqTo_id         : { type: Number, ref: 'user_collections' },
        cubeType         : String,
        roomType         : String,
        reqKeyword       : String,
        reqDate          : Date,   // date created
        // reqTime          : Number,  // req time e.g 60 secs
        reqStatus        : String
             
});


var archive_game_collections = Schema({
     
        game_id          : { type: Number, ref: 'game_collections' },
        p1_moves         : String,
        p2_moves         : String,
        scrambleMoves    : String,
        endedTime        : Number,
        gameWinner       : { type: Number, ref: 'user_collections' },  
        winnerBy         : String,  
             
});




user_collections.plugin(autoIncrement.plugin,'user_collections');
msg_collections.plugin(autoIncrement.plugin,'msg_collections');
archive_msg_collections.plugin(autoIncrement.plugin,'archive_msg_collections');
friends_collections.plugin(autoIncrement.plugin,'friends_collections');
game_collections.plugin(autoIncrement.plugin,'game_collections');
archive_game_collections.plugin(autoIncrement.plugin,'archive_game_collections');

var user_model = mongoose.model('user_collections',user_collections); 
var msg_model = mongoose.model('msg_collections',msg_collections); 
var archive_msg_model = mongoose.model('archive_msg_collections',archive_msg_collections);
var friends_model = mongoose.model('friends_collections',friends_collections);
var game_model = mongoose.model('game_collections',game_collections);
var archive_game_model = mongoose.model('archive_game_collections',archive_game_collections);





//  ////#####default users
var newUser1 = {
    _id: 1,
     username             : 'jester26',
    user_password        :  bcrypt.hashSync("jester", salt),
    user_email           :  'jestercaporado@yahoo.com',
    user_fullName          : 'jester caporado',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_1.jpg",
     user_score              :1500
};
var newUser2 = {
     _id: 2,
     username             : 'winnie26',
    user_password        :  bcrypt.hashSync("winnie", salt),
    user_email           :  'winnie@yahoo.com',
     user_fullName          : 'winnie flores',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_2.jpg",
     user_score            :1500
};
var newUser3 = {
      _id: 3,
     username             : 'candace12',
    user_password        : bcrypt.hashSync("candace", salt),
    user_email           :  'candace@yahoo.com',
    user_fullName          : 'candace tapuro',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_3.jpg",
     user_score            :1500
};
 var newUser4 = {
     _id: 4,
     username             : 'fauni12',
    user_password        :  bcrypt.hashSync("fauni", salt),
    user_email           :  'fauni@yahoo.com',
     user_fullName          : 'Madel Fauni',
    user_country           : 'Philippines',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_4.jpg",
     user_score            :1500
};
 var newUser5 = {
     _id: 0,
    username             : 'Computer',
    user_password        :  bcrypt.hashSync("computerpassword", salt),
    user_email           :  'computer@yahoo.com',
      user_fullName          : 'computer_v1',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/user/robotDefault.png",
    user_score            :1500
};
 var newUser6 = {
     _id: -1,
     username             : 'SinglePlayer',
    user_password        :  bcrypt.hashSync("singlepassword", salt),
    user_email           :  'singleplayer@yahoo.com',
    user_fullName          : 'single_v1',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/user/robotDefault.png",
    user_score          : 1500

};
 var newUser7 = {
     _id: 5,
     username             : 'user1',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user1@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_5.jpg",
    user_score          : 1500

};
 var newUser8 = {
     _id: 6,
     username             : 'user2',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user2@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_6.jpg",
    user_score          : 1500

};

 var newUser9 = {
     _id: 7,
     username             : 'user3',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user3@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_7.jpg",
    user_score          : 1500

};

 var newUser10 = {
     _id: 8,
     username             : 'user4',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user4@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_8.jpg",
    user_score          : 1500

};

 var newUser11 = {
     _id: 9,
     username             : 'user5',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user5@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_9.jpg",
    user_score          : 1500

};
 var newUser12 = {
     _id: 10,
     username             : 'user6',
    user_password        :  bcrypt.hashSync("userpassword", salt),
    user_email           :  'user6@yahoo.com',
    user_fullName          : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_10.jpg",
    user_score          : 1500

};


var people = [ newUser1, newUser2, newUser3, newUser4, newUser5 ,newUser6,newUser7,newUser8,newUser9,newUser10,newUser11,newUser12 ];

      


var friend1 = {
    _id:0,
    user1_id:'1',
    user2_id:'2',
    friend_status:'1'
};
var friend2 = {
    _id:1,
    user1_id:'1',
    user2_id:'3',
    friend_status:'1'
};
var friend3 = {
    _id:2,
     user1_id:'1',
    user2_id:'4',
    friend_status:'1'
};
// var msgArchive = [msgArchive1, msgArchive2, msgArchive3];
var friends = [friend1,friend2,friend3];




  //  (function() {
  //          return new Promise(function(resolve, reject){

  //           // //reset from start
  //       [msg_model,archive_msg_model,game_model,archive_game_model].forEach(function(data){
  //         data.remove({}, function(err) { 
  //              resolve();
  //         });
  //       });
               
  //          });
  //    })().then(function(){
  //    	return new Promise(function(resolve,reject){
  //    		 user_model.update(
		// 	    {}, 
		// 	    { 'user_score': 1500 },
		// 	    { multi:true },function(err,data){ resolve()}

		// 	    );
		// });
  //    });
//######################################
      (function() {
           return new Promise(function(resolve, reject){

            // //reset from start
        [user_model,friends_model,msg_model,archive_msg_model,game_model,archive_game_model].forEach(function(data){
          data.remove({}, function(err) { 
               resolve();
          });
        });
               
           });
     })()
    .then(function(){
      return new Promise(function(resolve,reject){
        var ctr = 0;
         people.forEach(function(data,index,array){
            new user_model(data)
            .save(function(err,data){
                console.log(data);
                 ctr++;
                 if(ctr === array.length) {
              resolve();
              }
            });
           
            
        });

        });
     }).then(function() {
           return new Promise(function(resolve, reject){
            var ctr = 0;
                friends.forEach(function(data,index,array){
             new friends_model(data)
            .save(function(err,data){
                console.log(data);
                 ctr++;
                 if(ctr === array.length) {
              resolve();
               }
            });
        });
          

           });
      });




// user_model.find({}, function(err, doc){
//   //use promises for forEach
//  var requests = doc.reduce((promiseChain, item, index, tempItem) => { 
//               return promiseChain.then(() => new Promise((resolve) => {
                       
//                        setTimeout(function(){
//                          console.log(item);
//                              resolve();
//                          },1000);
                        
//               }));
//           }, Promise.resolve()).then(function(){
//               // last execution
//               console.log('finish all');
//           });
 
// });


module.exports.cleanUser = function(callback){
  user_model.find().exec(callback);
}

// module.exports.cleanUser(function(err,data){
//       console.log(data);
// });





module.exports.getRating = function(id,callback){
  user_model.find({ _id:{$in:id} }).exec(callback);
}

module.exports.setRating = function(id,value,callback){
 user_model.update(
    { _id: id }, 
    {  'user_score': value },
      callback
    );
}

module.exports.getUserArchiveGameInfo = function(id,callback){
    // archive_game_model.find({''})
    game_model.find ({$and: [
                        { $or : [{'reqFrom_id':id},{'reqTo_id':id}]},
                        // { $or : [{'friend_status':'1'}]}
                   ]},"reqFrom_id reqTo_id",{sort: {'_id': 'ascending'}}).exec(function(err,data){
                          // console.log(data);
                          archive_game_id = data.map(function(item){
                              return item._id;
                          });

                          archive_game_model.find({ game_id:{$in:archive_game_id} }).populate({
                                  path:'game_id',
                                  populate:{
                                      path:'reqFrom_id reqTo_id'
                                  }
                              }).lean().exec(callback);
                      
                   });
} 



module.exports.abandonGame = function(game_id,callback){
     game_model.update(
    { _id: game_id }, 
    {  'reqStatus': 'abandon' },
      callback
    );

}





module.exports.createGame = function(data,callback){
        // console.log('create game');
      new game_model(data)
      .save(callback);
}

module.exports.createArchiveGame = function(data,callback){
        // console.log('create archive game');
      new archive_game_model(data)
      .save(callback);
}






module.exports.createMsg = function(data,callback){
        // console.log('create msg');
      new msg_model(data)
      .save(callback);
}


module.exports.deleteChat = function(data,callback){
        // console.log('delete chat');
      new archive_msg_model(data)
      .save(callback);
}


//user2 is viewer

//user2 is viewer
module.exports.viewMsg = function(user_id,user2_id,callback){
    archive_msg_model.find({user_id:user2_id}).exec(function(err,data){
        
         filter_id = data.map(function(data) { return data.msg_id; } );

         msg_model.find({ msg_from:{$in: [user_id,user2_id]}, msg_to:{$in:[user_id,user2_id]}, _id:{$nin: filter_id}
                }).sort({_id:1})
                .populate('msg_to')
                .populate('msg_from')
                .exec(callback);

    });
}



module.exports.insertAvatar = function(user_id,pathStr,callback){
  user_model.update(
    { _id: user_id }, 
    {  'user_avatar': pathStr },
       function(err,data){
           user_model.findOne({_id:user_id}).exec(callback);
       }
    );
}

module.exports.seenMsg = function(user_id,user2_id,callback){

    module.exports.viewMsg(user_id,user2_id,function(err,data){
        // console.log(data);
          filter_id = data.filter(function(data){
              if (data.msg_from._id == user_id) {
                  // console.log(data.msg_text + " " + data.msg_from._id);
                return true;
              }
              return false;
              // console.log(data._id);
          }).map(function(data){
              return data._id;
          });

          filter_id.forEach(function(data){
              console.log(data);
          });

           msg_model.update( {_id : {$in:filter_id}}, {msg_status:'seen'} , {multi: true} , callback);

    });
}



module.exports.deleteInbox = function(user1,user2,callback){
     var requests = user1.reduce((promiseChain, mainItem, index) => {
              return promiseChain.then(() => new Promise((mainResolve) => {

                         module.exports.viewMsg(mainItem,user2,function(err,data){
                               filterId = data.map(function(data) { return data._id; });


                                    var requests = filterId.reduce((promiseChain, item, index) => {
                                        return promiseChain.then(() => new Promise((resolve) => {
                                              delChat = {
                                              user_id:user2,
                                              msg_id:item
                                        };
                                        module.exports.deleteChat(delChat,function(err,data){
                                          if (err) throw err; 
                                          // console.log('created ' + data);
                                            resolve();
                                        });
                                                 
                                        }));
                                    }, Promise.resolve()).then(function(){
                                         mainResolve();
                                    });
                                  
                                  
                          });
                       
                       

              }));
          }, Promise.resolve()).then(function(){
              callback();
          });

    
}   
  





module.exports.viewInbox = function(user_id,mainCallback){

        msg_model.find({
            $or:[
                {msg_from:user_id},
                {msg_to:user_id}
            ]
        })
        .select('msg_to msg_from msg_text').populate('msg_to').populate('msg_from')
        .exec(function(err,data){
                if (data.length == 0) return mainCallback([]);
                
                    (function() {
                         
                           return new Promise(function(resolve, reject){
                                mergeIds = [];
                                resolve(mergeIds);
                          });
                     })().then(function(mergeIds) {
                         
                       return new Promise(function(resolve, reject){
                            // if no inbox


                            // if (data == null) console.log('no laman'); 
                          
                            // console.log(' d = ' + data)

                                 data.forEach(function(i_data,index,array){
                                       if ((i_data.msg_from._id != user_id) && (!(mergeIds.indexOf(i_data.msg_from._id) > -1))){
                                            mergeIds.push(i_data.msg_from._id);
                                        }
                                        if ((i_data.msg_to._id !=user_id) && (!(mergeIds.indexOf(i_data.msg_to._id) > -1))){
                                            mergeIds.push(i_data.msg_to._id);
                                        }
                                    if(index==(array.length-1)){
                                            resolve(mergeIds);
                                    } 
                                });
                                
                                
                          });
                      }).then(function(mergeIds) {
                       return new Promise(function(resolveMain, reject){
                                var last_merge_id = [];
                                var requests = mergeIds.reduce((promiseChain, item,index) => {
                                     return promiseChain.then(() => new Promise((resolve) => {
                                          //filter inbox
                                          archive_msg_model.find({user_id:user_id}).exec(function(err,a_data){
                                                    filter_id = a_data.map(function(f_data) { return f_data.msg_id; } );
                                                  msg_model.find({ msg_from:{$in: [user_id,item]}, msg_to:{$in:[user_id,item]},
                                                                       _id:{$nin: filter_id} })
                                                        .sort({_id:-1}).limit(1)
                                                        .populate('msg_to')
                                                        .populate('msg_from')
                                                        .exec(function(err,last_data){
                                                            last_data.forEach(function(f_last_data){
                                                                 last_merge_id.push(f_last_data);
                                                            });
                                                            resolve(); 
                                                            
                                                         });
                                             
                                            
                                            });
                                    }));
                                }, Promise.resolve()).then(function(){
                                     mainCallback(last_merge_id);
                                });
                         });
                     });
                   
        });

};



function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

module.exports.friend_status = function(user1,user2,callback){
//user1 is viewer
    friends_model.findOne().and([
                          { $or : [{'user1_id':user1},{'user2_id':user1}]},
                          { $or : [{'user1_id':user2},{'user2_id':user2}]}
                      ]).exec(callback);
}

module.exports.editFriendStatus = function(user1,user2,friend_stat,callback){
    switch (friend_stat){
        case '0': //insert request
              insertStat();
          break;
        case '1': //remove friend
        case '3': //cancel request
              deleteStat();
          break;
       case '2':  //already friends
                friends_model.update({
                   $and: [
                        { $or : [{'user1_id':user1},{'user2_id':user1}]},
                        { $or : [{'user1_id':user2},{'user2_id':user2}]}
                   ]},{  'friend_status': '1' }, callback
                );
          break;
     
    }
    function insertStat (){
          new friends_model({
              user1_id:user1,
              user2_id:user2,
              friend_status:'2'
          }).save(callback);
    }
    function deleteStat (){
          friends_model.remove({
                   $and: [
                        { $or : [{'user1_id':user1},{'user2_id':user1}]},
                        { $or : [{'user1_id':user2},{'user2_id':user2}]}
                   ]},callback
                );
    }
   
}


module.exports.viewFriends = function (user_id,callback){
      friends_model.find
                    ({$and: [
                        { $or : [{'user1_id':user_id},{'user2_id':user_id}]},
                        { $or : [{'friend_status':'1'}]}
                   ]})
                  .exec(function(err,data){
                      
                        filterId = data.map(function(data){
                              if (data.user1_id == user_id) return data.user2_id;
                              if (data.user2_id == user_id) return data.user1_id;
                        });
                        user_model.find({ _id: { $in:filterId}}).exec(callback);
                  });
}


module.exports.viewSpecificMember = function(member_id,user_id,callback){
      user_model
        .find({_id:Number(member_id)})
       
        // .select({'username':1,'_id':1})
        .exec(function(err,s_data){
          if (s_data == undefined) callback();
          else
          // else console.log('s = ' + s_data);
            var requests = s_data.reduce((promiseChain, item, index, tempItem) => {
                return promiseChain.then(() => new Promise((resolve) => {
                            tempItem[index] = item.toObject();
                            module.exports.friend_status(user_id,item._id,function(err,data){

                                   if (data==null) tempItem[index].status = '0';
                                  //if user request becomes cancel request
                                  else if (data.user1_id==user_id && data.friend_status=='2')
                                       tempItem[index].status='3';
                                  else tempItem[index].status=data.friend_status;

                                  resolve(s_data);
                            });
                 }));

            }, Promise.resolve()).then(function(data){
              // console.log(data);

                callback(data);
            });
          
        });
}


module.exports.viewMembers = function(userFind,user_id, callback){
  console.log('viewMembers');
     user_model
        .find()
        .and([
              {$or: [{username:new RegExp(userFind, "i")}]},
              {$or: [{_id:{$nin:[user_id,'0','-1']}}]}
          ])
        // .select({'username':1,'_id':1})

        .exec(function(err,s_data){
            var requests = s_data.reduce((promiseChain, item, index, tempItem) => {
                return promiseChain.then(() => new Promise((resolve) => {
                            tempItem[index] = item.toObject();
                            module.exports.friend_status(user_id,item._id,function(err,data){

                                   if (data==null) tempItem[index].status = '0';
                                  //if user request becomes cancel request
                                  else if (data.user1_id==user_id && data.friend_status=='2')
                                       tempItem[index].status='3';
                                  else tempItem[index].status=data.friend_status;

                                  resolve(s_data);
                            });
                 }));

            }, Promise.resolve()).then(function(data){
              // console.log(data);
                callback(data);
            });
          
        });
      // user_model.find()
      //               .and([
      //                     { $or: [{'user1_id':user_id}] }
      //                 ])
      //               .exec(function(err,data){
      //                   console.log(data);
      //               });

}






// module.exports.viewMembers('','2',function(err,data){

// });


module.exports.resetPassword  = function(userData,hostname,callback){


   (function() {
           return new Promise(function(resolve, reject){
               crypto.randomBytes(20, function(err, buf) {
                  var token = buf.toString('hex');
                  resolve(token);
               });;
                
           });
     })().then(function(token) {
           return new Promise(function(resolve, reject){
               var transporter = nodemailer.createTransport('smtps://rubiksbattle.master%40gmail.com:rubiksbattlepassword@smtp.gmail.com');
             
                // setup e-mail data with unicode symbols 
                var mailOptions = {
                    from: '<rubiksbattle.master@gmail.com>', // sender address 
                    to: userData.user_email, // list of receivers 
                    subject: "Password reset - Rubik's Battle", // Subject line 
                    // text: 'Hello world 🐴', // plaintext body 
                    html: "Hello "+userData.username+", the <b>password reset link</b> is <a href='http://"+hostname+"/reset/?token="+token+"' target='_blank'>http://"+hostname+"/reset/?token="+token+"</a>" // html body 
                };
                 
               // //  console.log("Hello "+userData.username+", <b>password reset link</b> is <a>"+token+"</a>");
                // //send mail with defined transport object 
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                         console.log(error);
                          
                    }
                     resolve(token);               
                     console.log('Message sent: ' + info.response);
                });
                // resolve(token);
              
           });
      }).then(function(token) {
         return new Promise(function(resolve, reject){

             user_model.update(
                  { _id: userData._id }, 
                  {  'resetPasswordToken': token,
                     'resetPasswordExpires': Date.now()+ 300000 ,
                  },
                  
                     function(err,data){
                        console.log(data);
                        callback();
                     }
                  );
               

           });
     });



}

module.exports.resetAuthen = function(token,callback){
    user_model
      .find()
      .and([
          // { $or: [{'user_email': email}] }
          { $or: [{"resetPasswordToken":token,"resetPasswordExpires":{$gt:Date.now()} }] , 
            
          }
        ]).exec(callback);
}

// module.exports.resetPassword('',function(){

// });

module.exports.ifTakenEmail = function (email,callback){
    user_model
        .find()
        .and([
          // { $or: [{'user_email': email}] }
          { $or: [{"user_email":{ $regex: new RegExp('^'+ email + '$', "i") } }] 

        }])
        .exec(callback);
}



module.exports.ifTakenUsername = function (username,callback){

        // console.log('test module');
    user_model
        .find()
        .and([
          // { $or: [{'username': username}] }
          { $or: [{"username":{ $regex: new RegExp('^'+ username + '$', "i") } }] 
          }])
        .exec(callback);
}

module.exports.ifTakenPassword = function (password,callback){
    user_model
        .find()
        .and([
          { $or: [{'user_password': password}] }
        ])
        .exec(callback);
}
module.exports.userLogin = function (username,password,callback){
    user_model
        .find()
        .and([
          // { $or: [{'user_password': password,'username':username}] }
           { $or: [{username:new RegExp('^'+ username + '$', "i")}] }
        ])
        .exec(function(err,data){
          if (data.length==0){
            callback(false);
          } 
          else{
            // console.log(data[0].userpassword);
             callback(bcrypt.compareSync(password, data[0].user_password),data);
          }
            // callback()
            // bcrypt.compareSync("MYPASSWORD", hash)
          // var hash = bcrypt.hashSync("MYPASSWORD", salt);

        });
}

module.exports.getUserInfo = function (user_id,callback){
    user_model
        .findOne()
        .and([
          { $or: [{'_id': user_id}] }
        ])
        .exec(callback);
}

module.exports.getUserInfoByUsername = function (username,callback){
    user_model
        .findOne()
        .and([
          { $or: [{username:new RegExp('^'+ username + '$', "i")}] } // for exact match case insensitive
        ])
        .exec(callback);
}





module.exports.getGameInfo = function (user_id,callback){
    game_model
        .findOne()
        .populate('reqFrom_id reqTo_id')
        .and([
                  { $or: [{'_id': user_id}] }
                ])
        .exec(callback);
}




module.exports.getArchiveGameInfo = function(id,callback){
   //lean edit the return data 
  archive_game_model.findOne({'_id':id}).populate({
        path:'game_id',
        populate: {
              path:'reqFrom_id reqTo_id'
          }
    }).lean().exec(callback);

}



module.exports.getUserStats = function(id,cubeType,callback){



  (function() { //########### WON BY 
           return new Promise(function(resolve, reject){
                  game_model.find({$and: [
                        { $or : [{'reqFrom_id':id},{'reqTo_id':id}] },
                        { $or : [{'cubeType':cubeType}] },
                        { $or : [{'reqTo_id':{$nin:-1} }] }, //exclude single player when won stats
                        
                      ]},'reqFrom_id reqTo_id cubeType').exec(function(err,data){

                          var ids = data.map(function(e){
                              return e._id;
                          }); 

                           archive_game_model.aggregate(
                              [
                                { $match: {gameWinner:Number(id), game_id:{$in:ids} } },
                                { $project: {'winnerBy':1,'gameWinner':1}},
                                { $group: {
                                     // user_id:{$first:'$gameWinner'}, 
                                     _id:"$winnerBy", count: { $sum: 1 }
                                }}
                              ],function(err,data){
                                if (err) console.log(err);
                                       // console.log(data);
                                      var won_disconnection = data.filter(function(e){
                                          if (e._id == 'disconnection') return e;
                                      });
                                       var won_time = data.filter(function(e){
                                          if (e._id == 'time') return e;
                                      });
                                        var won_resignation = data.filter(function(e){
                                          if (e._id == 'resignation') return e;
                                      });

                                      var w_dc = ((!isEmpty(won_disconnection) ? won_disconnection[0].count:0));
                                      var w_tm = ((!isEmpty(won_time) ? won_time[0].count:0));
                                      var w_rc = ((!isEmpty(won_resignation) ? won_resignation[0].count:0));
                                   resolve([w_tm, w_rc, w_dc]);
                              }
                          );
                      });

               
           });
     })().then(function(won_by) { //########### lOST BY 
           return new Promise(function(resolve, reject){
                 game_model.find({$and: [
                        { $or : [{'reqFrom_id':id},{'reqTo_id':id}]},
                        { $or : [{'cubeType':cubeType}] }
                      ]},'reqFrom_id reqTo_id cubeType').exec(function(err,data){
                      // console.log(data);
                          var ids = data.map(function(e){
                              return e._id;
                          }); 


                         archive_game_model.aggregate(
                            [ 
                            //exclude single player when getting stats
                              { $match: {'game_id':{$in:ids},gameWinner:{$nin:[Number(id),-1]} }}, 
                              { $project: {'winnerBy':1,'gameWinner':1}},
                              { $group: {
                                   // user_id:{$first:'$gameWinner'}, 
                                   _id:"$winnerBy", count: { $sum: 1 }
                              }}
                            ],function(err,data){

                                  // console.log(data);
                                      var lost_disconnection = data.filter(function(e){
                                          if (e._id == 'disconnection') return e;
                                      });
                                       var lost_time = data.filter(function(e){
                                          if (e._id == 'time') return e;
                                      });
                                        var lost_resignation = data.filter(function(e){
                                          if (e._id == 'resignation') return e;
                                      });

                                        // console.log(isEmpty(lost_time) + " " + isEmpty(lost_disconnection));
                                      var l_dc = ((!isEmpty(lost_disconnection) ? lost_disconnection[0].count:0));
                                      var l_tm = ((!isEmpty(lost_time) ? lost_time[0].count:0));
                                      var l_rc = ((!isEmpty(lost_resignation) ? lost_resignation[0].count:0));
                                      // console.log([l_tm, l_rc, l_dc]);

                                      // console.log(won_by);

                                        resolve({'won_lost_by':won_by.concat([l_tm, l_rc, l_dc])});

                            }
                        );
                 });
              

           });
      }).then(function(e_data) {
         return new Promise(function(resolve, reject){
                // console.log('won_lost_by = ' + e_data.won_lost_by);
                 callback(e_data);
                // resolve();

           });
     });

     

     


      
}




module.exports.getAllUserStats = function(id,callback){
      module.exports.getUserStats(id,'3x3x3',function(data3){
           module.exports.getUserStats(id,'2x2x2',function(data2){
                callback(data2,data3);
           });
      });
}



function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

module.exports.getHighscoreList =function(callback){
  user_model.find({'_id':{$nin:['-1','0']}},'username user_score user_avatar',{sort:{'user_score':'descending'}})
  .lean()
  .exec(callback);
}


module.exports.getUserRankHighscore = function(id,callback){
    module.exports.getHighscoreList(function(err,data){
        
        data.forEach(function(e,index){
          if (e._id == id.toString())  callback(e.user_score, (index+1));

        });
       // console.log(data);
    });

}





module.exports.getSingleList =function(cubeType,callback){

(function() {
   return new Promise(function(resolve, reject){
		game_model.find({ 'cubeType':cubeType},'cubeType','').exec(function(err,data){ resolve(data); });
   	});
 })().then(function(single_id) {
    return new Promise(function(mainResolve, reject){
			  archive_game_model.find({ 'game_id':{$in:single_id},'gameWinner':{$nin:['-1','0']},'winnerBy':'time' },'endedTime gameWinner winnerBy',{sort:{'endedTime':'ascending'}})
			  // archive_game_model.find({ 'game_id':{$in:single_id},'winnerBy':'time' },'endedTime gameWinner winnerBy',{sort:{'endedTime':'ascending'}})
        .lean()
			  .exec(function(err,data){
          // console.log(data);
			    var tempC =[]; // container to filter id of single time
			    filterSingle = data.filter(function(item){
			        if (tempC.indexOf(item.gameWinner)<0){
			        tempC.push(item.gameWinner);
			        return item;
			        }
			    });
						var requests = filterSingle.reduce((promiseChain, item, index, tempItem) => {
						                return promiseChain.then(() => new Promise((resolve) => {
											//get user info per single list
						                            module.exports.getUserInfo(item.gameWinner.toString(),function(err,data){
						                            	tempItem[index].userInfo=data;	
						                            	resolve();
						                            });
						                 }));
									}, Promise.resolve()).then(function(){
						            		 callback(filterSingle);
						            		 mainResolve();
						             });
				});

	 });
 });


}

// module.exports.getSingleList('3x3x3',function(data){
//     console.log(data);
// });

module.exports.getUserRankSingle = function(id,cubeType,callback){

  // console.log(id + " " + cubeType);
  module.exports.getSingleList(cubeType,function(data){
    // console.log(data);
    // console.log(data.length);

    var BreakException = {};
    // console.log(data);

    if (data.length ==0) callback(0,0,0);

      try{
        data.forEach(function(e,index){
            // console.log(index);
            if (e.gameWinner.toString() == id) {
               callback(e.endedTime, (index+1),e._id);
               throw BreakException;
            }

            if (e.gameWinner.toString() != id && (index == (data.length-1))) callback(0,0,0);
        });
      } catch(e){
        if (e !== BreakException) throw e;
      }
  });
}


module.exports.getMemberSince = function(id,callback){
    user_model.find({_id:id.toString()},'username user_since').exec(callback);
}


module.exports.updateFullName =function(id,name,callback){
      user_model.update(
    { _id: id }, 
    {  'user_fullName': name },
       function(err,data){
           user_model.findOne({_id:id}).exec(callback);
       }
    );
}

module.exports.updatePassword =function(id,password,callback){
      user_model.update(
    { _id: id }, 
    {  'user_password': password },
       function(err,data){
           user_model.findOne({_id:id}).exec(callback);
       }
    );
}

module.exports.updateEmail =function(id,email,callback){
      user_model.update(
    { _id: id }, 
    {  'user_email': email },
       function(err,data){
           user_model.findOne({_id:id}).exec(callback);
       }
    );
}


module.exports.removeToken =function(id,callback){
      user_model.update(
    { _id: id }, 
    {  'resetPasswordToken': '','resetPasswordExpires':'' },
       callback
    );
}


// module.exports.getUserRankSingle('1','3x3x3',function(endedTime,rank){
//         console.log('e = ' + endedTime + " r = " + rank );

//         // res.send({userRankSingle: {endedTime:endedTime,rank:rank} });
// });



module.exports.getAverageList = function(cubeType,callback){
(function() {
   return new Promise(function(resolve, reject){
		game_model.find({ 'cubeType':cubeType},'cubeType','').exec(function(err,data){ resolve(data); });
   	});
 })().then(function(single_id) {
    return new Promise(function(mainResolve, reject){
			   archive_game_model.find({ 'game_id':{$in:single_id}, 'gameWinner':{$nin:['-1','0']},'winnerBy':'time', },'endedTime gameWinner winnerBy',{'sort':{'_id':'ascending'}})
			  .lean()
			  .exec(function(err,averageList){
     
			        module.exports.getSingleList(cubeType,function(singleList){

                  for (i in singleList){
                        singleList[i].endedTime =  0;
                    }
			                singleList.forEach(function(item,i){
                        // console.log('---------');
			                    averageList.forEach(function(item1){
                            // console.log(item1);
			                        if (singleList[i].gameWinner==item1.gameWinner)
			                        {
                                if (Number(singleList[i].endedTime)==0){
                                 singleList[i].endedTime = (Number(item1.endedTime));
                                 }else{
                                  // console.log('first = ' +singleList[i].endedTime);
                                 singleList[i].endedTime = (Number(singleList[i].endedTime) + Number(item1.endedTime))/2;
                                  // console.log(singleList[i].endedTime);
                                }
			                        }
			                    });
			                });
			            	var requests = singleList.reduce((promiseChain, item, index, tempItem) => {
						                return promiseChain.then(() => new Promise((resolve) => {
											//get user info per single list
						                            module.exports.getUserInfo(item.gameWinner.toString(),function(err,data){
						                            	tempItem[index].userInfo=data;	
						                            	resolve();
						                            });
						 	            }));
									}, Promise.resolve()).then(function(){
						                  callback(singleList);
						                  mainResolve();
						             });

			        });
			  });


	 });
 });


 }



// module.exports.getAverageList('3x3x3',function(data){     
//  // console.log(data);
// });

module.exports.getUserRankAverage =function(id,cubeType,callback){
  module.exports.getAverageList(cubeType,function(data){
      // console.log(data);
        var sortedData = sortByKey(data,'endedTime');
        // console.log(sortedData);
         var BreakException = {};
            if (data.length ==0) callback(0,0);

      try{
          sortedData.forEach(function(e,index){
            if (e.gameWinner.toString() == id) 
            {
              callback(e.endedTime, (index+1));
               throw BreakException;
            
              }
            if (e.gameWinner.toString() != id && (index == (data.length-1))) callback(0,0);
          });
          } catch(e){
        if (e !== BreakException) throw e;
      }

  });
}




// module.exports.getUserRankAverage('1','3x3x3',function(time,rank){
//   console.log('time = ' + time +' rank = ' + rank);
// });






 // module.exports.getHighscoreList(function(err,data){
 // 	console.log(data);
 // });


// module.exports.getAverageList('2x2x2',function(data){
// 	console.log(data);
// });







module.exports.viewAllGames = function(callback){
    game_model
      .find()
      .populate('reqFrom_id reqTo_id')
      .exec(callback);
};


module.exports.createUser = function (user_info,callback){
     new user_model(user_info)
        .save(function(err,mainData){
          if (err) console.log('error in createuser ');
         
           fs.readFile('public/img/user/userDefault.png', function (err, data) {
            if (err) throw console.log('err in readFile');
            console.log('readFile');
            fs.writeFile('public/img/upload/img_'+mainData._id+'.jpg', data, function (err) {
                if (err) throw console.log('err in writeFile');
               // push avatar pathStr in user
                module.exports.insertAvatar(mainData,'/img/upload/img_' + mainData._id + '.jpg',function(err,userData){
                  if (err) console.log('err in insertAvatar');
                  console.log(userData);
                    callback(err,userData);
                });;

               
            });
          });  

        });  
}

module.exports.getUsersById = function (ids,callback){
    user_model
        .find({
          _id:{$in:ids}
        })
        .exec(callback);
}

module.exports.has_game = function(id,callback){
    game_model
        .findOne({$and: [
                        { $or : [{'reqFrom_id':id},{'reqTo_id':id}]},
                        { $or : [{'reqStatus':'ongame'}]}
                ]})
        .exec(callback);
}




// var data = {
//     _creator:  "582ef5dcde4e3111a0fec532",
//     title: "the great of HAHA",
//     date: "1996"
// };

//   new story_model(data)
// .save(function(err,data){
//     console.log(data);
// });












    



// module.exports = function() {
   
//     // declare seat covers here too
//     var models = {
//       user_model : mongoose.model('user_collections', user_collection)
//       // SeatCovers : mongoose.model('SeatCovers', SeatCover)
//     };


//     return models;
// }