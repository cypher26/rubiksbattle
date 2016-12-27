





// accept remove cancel add
//0 - not friend
//1 - friends
//2 - request
//3 - accept
//4 - block
 var friend1 = {
    _id:0,
    user1_id:'1',
    user2_id:'2',
    friend_status:'2'
};
var friend2 = {
    _id:1,
    user1_id:'3',
    user2_id:'2',
    friend_status:'2'
};
var friend3 = {
    _id:2,
     user1_id:'4',
    user2_id:'2',
    friend_status:'2'
};
// var msgArchive = [msgArchive1, msgArchive2, msgArchive3];
var friends = [friend1,friend2,friend3];

friends.forEach(function(data){
     new friends_model(data)
    .save(function(err,data){
        console.log(data);
    });
});











//delete
msg_model.find({ _id:22 }).remove().exec(function(err,data){
    if (err) throw err;
    console.log(data);
});




var newMsg1 = {
    _id: 0,
   msg_text :"hi testing",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'1',
   msg_to:'2'
};
var newMsg2 = {
   _id: 1,
   msg_text :"hello",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'1'
};
var newMsg3 = {
   _id: 2,
   msg_text :"musta ka?",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'1',
   msg_to:'2'
};
var newMsg4 = {
   _id: 3,
   msg_text :"ayos lang",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'1'
};
// new convo
var newMsg5 = {
   _id: 4,
   msg_text :"hi winnie candace here",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'3',
   msg_to:'2'
};

var newMsg6 = {
   _id: 5,
   msg_text :"hi candace",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'3'
};

var newMsg7 = {
   _id: 6,
   msg_text :"miss you na",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'3'
};

var newMsg8 = {
   _id: 7,
   msg_text :"ako din hihi",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'3',
   msg_to:'2'
};
//new convo
var newMsg9 = {
   _id: 8,
   msg_text :"talaga? haha",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'1',
   msg_to:'2'
};
var newMsg10 = {
   _id: 9,
   msg_text :"hi fauni winnie here",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'4'
};
var newMsg11 = {
   _id: 10,
   msg_text :"reply naman",
   msg_dateTime: new Date(),
   msg_status: "unseen",
   msg_from:'2',
   msg_to:'4'
};
var msg = [newMsg1, newMsg2, newMsg3, newMsg4, newMsg5, newMsg6, newMsg7, newMsg8, newMsg9, newMsg10, newMsg11];
// var msg = [newMsg1];
msg.forEach(function(data){
     new msg_model(data)
    .save(function(err,data){
        console.log(data);
    });
});



// // view

msg_model.find({
        msg_from:{$in: ['2','3']},
        msg_to:{$in:['2','3']}
})
.sort({_id:-1}).limit(1)
.populate('msg_to','username')
.populate('msg_from','username')
.exec(function(err,data){

    data.forEach(function(data){
            console.log(data);
    });
        // console.log(data);
});

/// merge inbox

msg_model.find({
    $or:[
        {msg_from:'2'},
        {msg_to:'2'}
    ]
})
.select('msg_to msg_from msg_text')
.populate('msg_to','username')
.populate('msg_from','username')
.exec(function(err,data){
      var mergeIds = [];

    data.forEach(function(data){
          //merge ids with inbox
            if (data.msg_from._id != '2' && !(mergeIds.indexOf(data.msg_from._id) > -1)){
                mergeIds.push(data.msg_from._id);
            }
            if (data.msg_to._id !='2' && !(mergeIds.indexOf(data.msg_to._id) > -1) ){
                mergeIds.push(data.msg_to._id);
            }
       
    });
    mergeIds.forEach(function(data){
            console.log(data);
    });
       
});

// Drop the 'foo' collection from the current database
mongoose.connection.db.dropCollection('foo', function(err, result) {...});

// Drop the current database
mongoose.connection.db.dropDatabase(function(err, result) {...});

//new archive msg



 var msgArchive1 = {
    _id:0,
    user_id:'2',
    msg_id:'8'
};
var msgArchive2 = {
    _id:1,
    user_id:'1',
    msg_id:'3'
};
var msgArchive3 = {
    _id:2,
    user_id:'2',
    msg_id:'8'
};
// var msgArchive = [msgArchive1, msgArchive2, msgArchive3];
var msgArchive = [msgArchive1,msgArchive2];

msgArchive.forEach(function(data){
     new archive_msg_model(data)
    .save(function(err,data){
        console.log(data);
    });
});





//testing add course

var newCourse1 = {
    // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c6'),
    courseName:"BSAC",
    courseLevel:"4th Year"
};
var newCourse2 = {
    // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c7'),
    courseName:"BSCS",
    courseLevel:"4th Year"
};
var newCourse3 = {
    // _id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c8'),
    courseName:"BSIT",
    courseLevel:"4th Year"
};
var courses = [newCourse1, newCourse2, newCourse3]

courses.forEach(function(data){
     new course_model(data)
    .save(function(err,data){
        console.log(data);
    });
});
     
// //testing add user course
var newUserCourse1 = {
    // user_id :"582ede8c9d8cb40f28133f03",
    user_id: new mongoose.mongo.ObjectId('58327d2627ba1e08900d0809'),
    course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c7")
};
var newUserCourse2 = {
    // user_id :"582ede8c9d8cb40f28133f03",
    user_id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c4'),
    course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c7")
};
var newUserCourse3 = {
    // user_id :"582ede8c9d8cb40f28133f03",
    user_id: new mongoose.mongo.ObjectId('5832a685cc41e105e89b10c5'),
    course_id: new mongoose.mongo.ObjectId("5832a685cc41e105e89b10c6")
};


var newUserCourse = [newUserCourse1, newUserCourse2, newUserCourse3];

newUserCourse.forEach(function(data){
      new user_course_model(data)
    .save(function(err,data){
        console.log(data);
    });
});
    

    new user_course_model(newUserCourse3)
        .save(function(err,data){
            console.log(data);  
        });


user_course_collections.plugin(deepPopulate, {
  whitelist: [
    'user_id',
    'course_id'
  ],
  populate:{
    'user_id':{
        // select:'username user_password'
        match:{'username':}
    },
    'course_id':{
        // match:{'courseName':'BSCS'}
    }
  }
});

user_course_collections.plugin(deepPopulate, {
  populate: {
    'user_id': {
      select: 'username',
      options: {
        limit: 2
      }
    }
    // ,
    // 'approved.user': {
    //   select: 'name'
    // }
  }
});






 user_model.find().exec(function(err,data){
                userList = data.map(function(data) { return data._id; } );

                    user_course_model.find({ user_id : { $in : userList }  } )
                        .populate('user_id')
                        .populate('course_id')
                        .exec(function(err,data){
                                data.forEach(function(data){
                                    console.log(data.user_id.username + " " + data.course_id.courseName);
                                });
                        });
});
 course_model.find({courseName:'BSCS'}).exec(function(err,data){
            courseList = data.map(function(data) { return data._id });

            user_course_model.find({course_id: {$in : courseList}})
                            .populate('user_id course_id').exec(function(err,data){
                                data.forEach(function(data){
                                    console.log(data.course_id.courseName + " " + data.user_id.username);
                                });
                            });

 });

db.user_collections.find().exec(function(err,data){
    console.log('testing');
});


  course_model.find({}}).exec(function(err,data){
                var userList = data.map(function(data) { return data._id; } );

                    user_course_model.find({ user_id : { $in : userList },  } )
                        .populate('course_id')
                        .exec(function(err,data){
                                console.log(data);

                    // var courseList = data.map(function(data) { return data._id; } );

                    // course_model.find({})
                
                });
});

    course = course_model.find({_id : { $in : user._id }}).toArray();

    console.log(course);
story_model
        // .findOne({date:'1996'})
        .find()
        .populate('_creator')
        .exec(function(err,data){
             if (err) return handleError(err);            
            console.log(data[0]);
        });


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
// exports.getUserId('user1','userpassword',function(err,data){
//     console.log(data);
// });

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