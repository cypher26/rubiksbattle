var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
// var AutoIncrement = require('mongoose-sequence');
var autoIncrement = require('mongoose-auto-increment');

var db = require('mongodb');
var async = require("async");

mongoose.Promise = global.Promise;

// var mongoStr = "mongodb://localhost/rubiksbattle";
var mongoStr = 'mongodb://rubiksbattle_user:rubiksbattledbpassword@jello.modulusmongo.net:27017/eja4timI';


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
        
        // colors              :    {
        //     colorName       :    String,
        //     colorId         :    String,
        //     surcharge       :    Number
        // }
    });


var user_course_collections = Schema({

    user_id :  { type: Number, ref: 'user_collections' },
    course_id : { type: Number, ref: 'course_collections' }
    // user_id:[user_collections],
    // course_id:[course_collections]
});






// var user_model = mongoose.model('',user_collection,'user_collection'); 
// var course_model = mongoose.model('',course_collection,'course_collection');

user_collections.plugin(autoIncrement.plugin,'user_collections');
// user_course_collections.plugin(AutoIncrement);

var user_model = mongoose.model('user_collections',user_collections); 

// var user_course_model = mongoose.model('user_course_collections',user_course_collections);









//testing add for user
// var newUser1 = {
//     _id: 1,
//      username             : 'jester',
//     user_password        :  'password',
//     user_email           :  'jestercaporado@yahoo.com',
//     user_fname           : 'jester',
//     user_lname           : 'caporado',
//     user_gender           : 'Male',
//     user_birthDate          : '1996-11-17',
//     user_country           : 'Philippines',
//     user_location           : 'Cavite',
//     user_about           : 'rubiks battle is awesome haha',
//     user_since           : '2016-11-26',
//     // user_avatar          : String
// };
// var newUser2 = {
//     _id: 2,
//     username: 'beta',
//     user_password: 'betapassword',
//     user_email:"beta@yahoo.com"
// };
// var newUser3 = {
//     _id: 3,
//     username: 'alpha',
//     user_password: 'password',
//     user_email:"alpha@yahoo.com"
// };
//  var newUser4 = {
//    _id: 4,
//     username: 'gamma',
//     user_password: 'password',
//     user_email:"gamma@yahoo.com"
// };

       
// var people = [ newUser1, newUser2, newUser3, newUser4 ];
// var people = [newUser1]
// people.forEach(function(data){
//     new user_model(data)
//     .save(function(err,data){
//         console.log(data);
//     });
// });


// //testing add course

// var newCourse1 = {
//     // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c6'),
//     courseName:"BSAC",
//     courseLevel:"4th Year"
// };
// var newCourse2 = {
//     // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c7'),
//     courseName:"BSCS",
//     courseLevel:"4th Year"
// };
// var newCourse3 = {
//     // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c8'),
//     courseName:"BSIT",
//     courseLevel:"4th Year"
// };
// var courses = [newCourse1, newCourse2, newCourse3]

// courses.forEach(function(data){
//      new course_model(data)
//     .save(function(err,data){
//         console.log(data);
//     });
// });
     
// // //testing add user course
// var newUserCourse1 = {
//     // user_id :"582ede8c9d8cb40f28133f03",
//     user_id: new mongoose.mongo.ObjectId('58327d2627ba1e08900d0809'),
//     course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c7")
// };
// var newUserCourse2 = {
//     // user_id :"582ede8c9d8cb40f28133f03",
//     user_id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c4'),
//     course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c7")
// };
// var newUserCourse3 = {
//     // user_id :"582ede8c9d8cb40f28133f03",
//     user_id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c5'),
//     course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c6")
// };


// var newUserCourse = [newUserCourse1, newUserCourse2, newUserCourse3];

// newUserCourse.forEach(function(data){
//       new user_course_model(data)
//     .save(function(err,data){
//         console.log(data);
//     });
// });
    

    // new user_course_model(newUserCourse3)
    //     .save(function(err,data){
    //         console.log(data);  
    //     });


// user_course_collections.plugin(deepPopulate, {
//   whitelist: [
//     'user_id',
//     'course_id'
//   ],
//   populate:{
//     'user_id':{
//         // select:'username user_password'
//         match:{'username':}
//     },
//     'course_id':{
//         // match:{'courseName':'BSCS'}
//     }
//   }
// });

// user_course_collections.plugin(deepPopulate, {
//   populate: {
//     'user_id': {
//       select: 'username',
//       options: {
//         limit: 2
//       }
//     }
//     // ,
//     // 'approved.user': {
//     //   select: 'name'
//     // }
//   }
// });


// user_model.find()
//             .select('user_birthDate')
// .exec(function(err,data){

//     data.forEach(function(data){
//             console.log(data.user_birthDate);
//     });
//         // console.log(data);
// });





//  user_model.find().exec(function(err,data){
//                 userList = data.map(function(data) { return data._id; } );

//                     user_course_model.find({ user_id : { $in : userList }  } )
//                         .populate('user_id')
//                         .populate('course_id')
//                         .exec(function(err,data){
//                                 data.forEach(function(data){
//                                     console.log(data.user_id.username + " " + data.course_id.courseName);
//                                 });
//                         });
// });
 // course_model.find({courseName:'BSCS'}).exec(function(err,data){
 //            courseList = data.map(function(data) { return data._id });

 //            user_course_model.find({course_id: {$in : courseList}})
 //                            .populate('user_id course_id').exec(function(err,data){
 //                                data.forEach(function(data){
 //                                    console.log(data.course_id.courseName + " " + data.user_id.username);
 //                                });
 //                            });

 // });

// db.user_collections.find().exec(function(err,data){
//     console.log('testing');
// });


//   course_model.find({}}).exec(function(err,data){
//                 var userList = data.map(function(data) { return data._id; } );

//                     user_course_model.find({ user_id : { $in : userList },  } )
//                         .populate('course_id')
//                         .exec(function(err,data){
//                                 console.log(data);

//                     // var courseList = data.map(function(data) { return data._id; } );

//                     // course_model.find({})
                
//                 });
// });

    // course = course_model.find({_id : { $in : user._id }}).toArray();

    // console.log(course);
// story_model
//         // .findOne({date:'1996'})
//         .find()
//         .populate('_creator')
//         .exec(function(err,data){
//              if (err) return handleError(err);            
//             console.log(data[0]);
//         });


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
        .findOne()
        .and([
          { $or: [{'user_password': password,'username':username}] }
        ])
        .exec(callback);
}

module.exports.createUser = function (user_info,callback){
     new user_model(user_info)
        .save(function(err,data){
            callback(err,data,data._id);
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