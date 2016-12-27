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
var mongoStr = "mongodb://127.0.0.1/rubiksbattle";


// var mongoStr = "mongodb://localhost/rubiksbattle";

// var mongoStr = 'mongodb://rubiksbattle_user:rubiksbattledbpassword@jello.modulusmongo.net:27017/eja4timI';


mongoose.connect(mongoStr);
// console mongo jello.modulusmongo.net:27017/eja4timI -u rubiksbattle_user -p rubiksbattledbpassword
console.log(mongoose.connection.readyState);


var connection = mongoose.createConnection(mongoStr);
 
autoIncrement.initialize(connection);



   // autoIncrement.initialize(connection);



var Schema = mongoose.Schema;
// var ObjectId = require('mongodb').ObjectID;


// User Schema

 var user_collections = Schema({
     
        username             : String,
        user_password        :  String,
        user_email           :  String,
        user_fname           : String,
        user_lname           : String,
        // user_gender           : String,
        // user_birthDate          : Date,
        user_country           : String,
        // user_location           : String,
        user_about           : String,
        user_since           : Date,
        user_avatar          : String,
        user_score            : Number
      
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
        endedTime        : String,
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

//reset from start
[user_model,msg_model,archive_msg_model,friends_model,game_model,archive_game_model].forEach(function(data){
  data.remove({}, function(err) { 
   console.log(data + ' removed') 
  });
});


var newUser1 = {
    _id: 1,
     username             : 'jester26',
    user_password        :  'jester',
    user_email           :  'jestercaporado@yahoo.com',
    user_fname           : 'jester',
    user_lname           : 'caporado',
    user_gender           : 'Male',
    user_birthDate          : '1996-11-17',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_1.jpg"
};
var newUser2 = {
     _id: 2,
     username             : 'winnie26',
    user_password        :  'winnie',
    user_email           :  'winnie@yahoo.com',
    user_fname           : 'winnie',
    user_lname           : 'flores',
    user_gender           : 'Female',
    user_birthDate          : '1996-11-17',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_2.jpg"
};
var newUser3 = {
      _id: 3,
     username             : 'candace12',
    user_password        :  'candace',
    user_email           :  'candace@yahoo.com',
    user_fname           : 'candace',
    user_lname           : 'Tapuro',
    user_gender           : 'Female',
    user_birthDate          : '1996-11-17',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_3.jpg"
};
 var newUser4 = {
     _id: 4,
     username             : 'fauni12',
    user_password        :  'fauni',
    user_email           :  'fauni@yahoo.com',
    user_fname           : 'Madel',
    user_lname           : 'Fauni',
    user_gender           : 'Female',
    user_birthDate          : '1996-11-17',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'rubiks battle is awesome haha',
    user_since           : '2016-11-26',
    user_avatar            : "/img/upload/img_4.jpg"
};
 var newUser5 = {
     _id: 0,
     username             : 'Computer',
    user_password        :  'computerpassword',
    user_email           :  'computer@yahoo.com',
    user_fname           : 'Computer_v1',
    user_lname           : '',
    user_gender           : 'Male',
    user_birthDate          : '1996-11-17',
    user_country           : 'Philippines',
    user_location           : 'Cavite',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/user/robotDefault.png"
};
 var newUser6 = {
     _id: -1,
     username             : 'SinglePlayer',
    user_password        :  'singleplayerpassword',
    user_email           :  'singleplayer@yahoo.com',
    user_fname           : 'single_v1',
    user_lname           : '',
    user_country           : 'Philippines',
    user_about           : 'Beat me!',
    user_since           : '2016-11-26',
    user_avatar            : "/img/user/robotDefault.png",
    user_score          : 1500

};

       
var people = [ newUser1, newUser2, newUser3, newUser4, newUser5 ,newUser6];

people.forEach(function(data){
    new user_model(data)
    .save(function(err,data){
        console.log(data);
    });
});





module.exports.abandonGame = function(game_id,callback){
     game_model.update(
    { _id: game_id }, 
    {  'reqStatus': 'abandon' },
      callback
    );
}





module.exports.createGame = function(data,callback){
        console.log('create game');
      new game_model(data)
      .save(callback);
}

module.exports.createArchiveGame = function(data,callback){
        console.log('create archive game');
      new archive_game_model(data)
      .save(callback);
}





module.exports.createMsg = function(data,callback){
        console.log('create msg');
      new msg_model(data)
      .save(callback);
}


module.exports.deleteChat = function(data,callback){
        console.log('delete chat');
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
           user_model.find({_id:user_id}).exec(callback);
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
                                          if (err) throw err; console.log('created ' + data);
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
              
                    (function() {
                         
                           return new Promise(function(resolve, reject){
                                mergeIds = [];
                                resolve(mergeIds);
                          });
                     })().then(function(mergeIds) {
                         
                       return new Promise(function(resolve, reject){
                           
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


module.exports.viewMembers = function(userFind,user_id, callback){
  console.log('viewMembers');
     user_model
        .find()
        .and([
              {$or: [{username:new RegExp(userFind, "i")}]},
              {$or: [{_id:{$nin:user_id}}]}
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
module.exports.getUserId = function (username,password,callback){
    user_model
        .find()
        .and([
          { $or: [{'user_password': password,'username':username}] }
        ])
        .exec(callback);
}
module.exports.getUserInfo = function (user_id,callback){
    user_model
        .findOne()
        .and([
          { $or: [{'_id': user_id}] }
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



module.exports.viewAllGames = function(callback){
    game_model
      .find()
      .populate('reqFrom_id reqTo_id')
      .exec(callback);
};

// exports.getUserId('user1','userpassword',function(err,data){
//     console.log(data);
// });

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