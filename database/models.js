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

var mongoStr = "mongodb://localhost/rubiksbattle";
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
        user_gender           : String,
        user_birthDate          : Date,
        user_country           : String,
        user_location           : String,
        user_about           : String,
        user_since           : Date,
        user_avatar          : String,
      
    });



 var msg_collections = Schema({
     
        msg_text            : String,
        msg_dateTime        :  Date,
        msg_status           :  String,
        msg_from           :  { type: Number, ref: 'user_collections' },
        msg_to           :  { type: Number, ref: 'user_collections' }
        
});
 var archive_msg_collections = Schema({
     
        user_id            : { type: Number, ref: 'user_collections' },
        msg_id             : { type: Number, ref: 'msg_collections' },
        
});





user_collections.plugin(autoIncrement.plugin,'user_collections');
msg_collections.plugin(autoIncrement.plugin,'msg_collections');
archive_msg_collections.plugin(autoIncrement.plugin,'archive_msg_collections');


var user_model = mongoose.model('user_collections',user_collections); 
var msg_model = mongoose.model('msg_collections',msg_collections); 
var archive_msg_model = mongoose.model('archive_msg_collections',archive_msg_collections);

















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
          if (err) throw err;
          console.log(data);
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
     let requests = user1.reduce((promiseChain, mainItem, index) => {
              return promiseChain.then(() => new Promise((mainResolve) => {

                         module.exports.viewMsg(mainItem,user2,function(err,data){
                               filterId = data.map(function(data) { return data._id; });


                                    let requests = filterId.reduce((promiseChain, item, index) => {
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


module.exports.viewUser = function(callback){
     user_model
        .find()
        .select({'username':1,'_id':1})
        .exec(callback);

}

module.exports.ifTakenEmail = function (email,callback){
    user_model
        .find()
        .and([
          { $or: [{'user_email': email}] }
        ])
        .exec(callback);
}

module.exports.ifTakenUsername = function (username,callback){

        // console.log('test module');
    user_model
        .find()
        .and([
          { $or: [{'username': username}] }
        ])
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
// exports.getUserId('user1','userpassword',function(err,data){
//     console.log(data);
// });

module.exports.createUser = function (user_info,callback){
     new user_model(user_info)
        .save(function(err,mainData){

           fs.readFile('public/img/user/userDefault.png', function (err, data) {
            if (err) throw err;
            fs.writeFile('public/img/upload/img_'+mainData._id+'.jpg', data, function (err) {
                if (err) throw err;
               // push avatar pathStr in user
                module.exports.insertAvatar(mainData,'/img/upload/img_' + mainData._id + '.jpg',function(err,data){
                    callback(err,mainData,mainData._id);
                });;

               
            });
          });  

        });  
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