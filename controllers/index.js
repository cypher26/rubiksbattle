/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'ngRoute','ui.bootstrap','ngProgress','ngSanitize','luegg.directives','ngFileUpload','ngMaterial','angular-progress-arc','fixed.table.header'
]);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    // .primaryPalette('pink')
    // .accentPalette('orange');
});




app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.run(function ($rootScope, ngProgressFactory) { 

    // first create instance when app starts
    $rootScope.progressbar = ngProgressFactory.createInstance();

    $rootScope.progressbar.setColor("#bdbdbd");
    // $rootScope.progressbar.setHeight('1px');
    $rootScope.$on("$routeChangeStart", function () {
       $rootScope.progressbar.start();
    });

    $rootScope.$on("$routeChangeSuccess", function () {
        $rootScope.progressbar.complete();
    });
});


// .run(function($rootScope,$location,$parse) {
//     $rootScope.$on("$locationChangeStart", function(event, next, current,$element) { 
//           console.log($location.path());
//           // $rootScope.$location.path() = 'active';
//           // $parse($location.path().replace(/\//g,"a")).($scope,"active");
//           var tString = "liRoot";
//           var model = $parse(tString);

//            // var myElements = $element.find('.testClass');




//          $parse($location.path().replace(/\//g,"li")).assign($rootScope,"active");
//          // getAllElementsWithAttribute('setActive');



              


//     });

// });


function getAllElementsWithAttribute(attribute)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

// .run(function($rootScope,$location){
//     $rootScope.testHome = $location.path();
// });

/**
 * Configure the Routes
 */
app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "homeCtrl"})
    // Pages
    .when("/play", {templateUrl: "partials/play.html", controller: "playCtrl"})

    .when("/profile", {templateUrl: "partials/profile/index.html", controller: ""})
    .when("/profile/games", {templateUrl: "partials/profile/games.html", controller: "homeCtrl"})
    .when("/profile/friends", {templateUrl: "partials/profile/friends.html", controller: "friendsCtrl"})
    .when("/invite", {templateUrl: "partials/invite.html", controller: "inviteCtrl"})
    .when("/profile/messages", {templateUrl: "partials/messages.html", controller: "msgCtrl"})
    .when("/profile/create", {templateUrl: "partials/create.html", controller: "homeCtrl"})
    .when("/profile/edit", {templateUrl: "partials/edit.html", controller: "imageCtrl"})
    .when("/profile/messages/:id", {templateUrl: "partials/chat.html", controller: "chatCtrl"})
          


    .when("/404", {templateUrl: "partials/404.html", controller: ""})
    // else 404
    .otherwise({redirectTo: '/404'});
    // .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
   
}]);



app.controller('globalCtrl',function ($scope,$location,$http,$window,$rootScope,$route,
                                        $routeParams,socket,$mdDialog,$interval,$document,$timeout){

  console.log('globalCtrl');

      //sample looop
       $rootScope.getNumber = function(num) {
            return new Array(num);   
       }

//--################################################### - init - #################################################

// $window.location.href = "/live?id=111";





$scope.gameInit = function(){


     $scope.inviteDisplay = 0;
     $scope.inviteTimer = 1;
      $rootScope.root = {
        cubeType:'3x3x3',
        roomType:'(Public)',
        inviteKeyword:'',
        declineModal:0,
        notAvailableModal:0
    }

     console.log('inviteDisplay ' + $scope.inviteDisplay);
  }
$scope.gameInit();

//--################################################### - init - end  #################################################

  $scope.friendsDialog = function(){
      $mdDialog.show({
      contentElement: '#friendsDialog',
      clickOutsideToClose: true,
      openFrom:{
         top: -50,
          width: 30,
          height: 80
      },
      closeTo:{
         top: -50,
          width: 30,
          height: 80
      }

      }).finally(function(){
       // $scope.inviteStatus =0;
            // $rootScope.root.declineModal = 0;
            // $rootScope.root.notAvailableModal = 0;
    });
  }

   $scope.cancel = function() {
      $mdDialog.cancel();
    };

//-############################################## modal invite  #######################################




  $scope.inviteStatus = 0;
  $scope.receivedStatus = 0;

  $scope.inviteDialog =function(inviteData){
    $scope.inviteData = inviteData
 
    $scope.inviteStatus =1;
    $mdDialog.show({
      contentElement: '#inviteDialog',
      clickOutsideToClose: false,
      openFrom:{
         top: -50,
          width: 30,
          height: 80
      },
      closeTo:{
        top:-50
      }

    }).finally(function(){
       $scope.inviteStatus =0;
            $rootScope.root.declineModal = 0;
            // $rootScope.root.notAvailableModal = 0;
    });

  }



 $scope.sendRequest = function(){

       var gameReq = {
              
                reqFrom_id       : $rootScope.userInfo._id ,
                reqTo_id         : $scope.inviteData._id,
                cubeType         : $rootScope.root.cubeType,
                roomType         : $rootScope.root.roomType,
                reqKeyword       : $rootScope.root.inviteKeyword,
                reqDate          : new Date(),   // date created
                // reqTime          : 60,  // req time e.g 60 secs
                reqStatus        : 'ongame'
            
            };

    // console.log(gameReq);        
   socket.emit('createReqGame',{gameReq:gameReq,userFrom:$rootScope.userInfo,userTo:$scope.inviteData},function(ifAvailable){
        // console.log('success');
          // alert(ifAvailable);
          // if (gameReq.reqTo_id == '0'){
          //     socket.emit('acceptGameReq',{gameData:$scope.gameData},function(){
          //         // alert('accept');
                  
          //     });
          // }


          if (ifAvailable == 1){
               $scope.inviteDisplay = 0;

               $rootScope.root.notAvailableModal = 1;

               // $scope.gameInit();
               console.log(ifAvailable == 1 + "  =" + $rootScope.root.notAvailableModal);
          }else{
              $scope.inviteDisplay=1;

          }
        
    });
      
  }

  




//-############################################## modal invite - end  #######################################

//-############################################## modal received  #######################################

  $scope.receivedDialog =function(){

     $scope.receivedStatus =1;  
    $mdDialog.show({
      contentElement: '#receivedDialog',
      clickOutsideToClose: false,
      openFrom:{
         top: -50,
          width: 30,
          height: 80
      },
      closeTo:{
        top:-50
      }
    }).finally(function(){
       $scope.receivedStatus =0;
    });



  }

  $scope.acceptGameReq = function(){

   socket.emit('acceptGameReq',{gameData:$scope.gameData},function(){
        // alert('accept');
        
    });
   
  }


  

//-############################################## modal received - end #######################################
       ///################### socket functions #######################################
     // socket.emit('reqUpdateOnlineUsers',{},function(data){
     //      console.log('online ' + data);
     //  });
     socket.on('updateOnlineUsers',function(data){
          // console.log('Uonline ' + data);
          $rootScope.onlineList = data;
     });
      socket.emit('reqUpdateLiveGames',{},function(){ });

    socket.on('updateLiveGames',function(onlineList){

      // var data = !{JSON.stringify(onlineList)}; // <====

        $rootScope.liveGames = JSON.parse(onlineList);
          console.log($rootScope.liveGames);
          // $rootScope.liveGames = onlineList;
          // console.log(bson.deserialize.onlineList);
     });
    $scope.ifHasLiveGames = function(){
            if (!isEmpty($rootScope.liveGames)) return false;
            return true;
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
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }




$timeout(function(){

    $scope.cancelGameReq = function(){

          if ($scope.inviteDisplay==0){
                $mdDialog.hide();
                $scope.gameInit();
          }else {
            socket.emit('deleteGameReq',{gameData:$scope.gameData},function(){
                console.log('success cancel game req');
                  $mdDialog.hide();

            });
          }
          
    }
     $scope.declineGameReq = function(){
            socket.emit('declineGameReq',{gameData:$scope.gameData},function(){
                console.log('success cancel game req');
                  $mdDialog.hide();

            });
            $scope.gameInit();
    }


    socket.on('updateInvite',function (inc,user_data,game_data){
        $scope.inviteDisplay = 1;

        $scope.inviteData = user_data;
        $rootScope.root.cubeType = game_data.cubeType;
        $rootScope.root.roomType = game_data.roomType; 
        $rootScope.root.inviteKeyword = game_data.reqKeyword;       
        $scope.gameData = game_data;
      
        $scope.inviteTimer = inc;
        if ($scope.inviteStatus==0){
          $scope.inviteDialog();
        }
        // console.log('two');
    });

    socket.on('updateReceived',function (inc,user_data,game_data){
        $scope.inviteDisplay = 1;

        $scope.receivedData = user_data;
        $rootScope.root.cubeType = game_data.cubeType;
        $rootScope.root.roomType = game_data.roomType;        
        $rootScope.root.inviteKeyword = game_data.reqKeyword;
        $scope.gameData = game_data;

        $scope.receivedTimer = inc;
        if ($scope.receivedStatus==0 ){
          $scope.receivedDialog();
        }
        // console.log('two');
    });


    socket.on('closeModal',function (){

      // console.log('three');
          $mdDialog.hide();
         
          $scope.gameInit();
    });
    socket.on('declineModal',function (){
            // $scope.gameInit();
            $scope.inviteDisplay = 0;

            $rootScope.root.declineModal = 1;
    });



    socket.on('redirGame',function (data){

        $window.location.href = "/live?id="+data
    });

});
  



     $rootScope.updateChat =function (){
        $http.post('/viewMsg',{user:$routeParams.id}).
        success(function(data) {
                 $scope.msg_convo = data.msg;
                 $scope.glued = true;
        }).error(function(data) { 
            console.log("error in view chat");
        });
    }
             socket.on('updateChat',function (){
                  // $route.reload();
                  console.log('updateChat');
                  $rootScope.updateChat();
            });

    $rootScope.updateInbox = function(){

          $http.post('/viewInbox',{}).
          success(function(data) {
              $scope.msg_text = data.inbox;
             
              // $scope.glued = true;
          }).error(function(data) {
              console.log("error in view inbox");
          });

    }
               socket.on('updateInbox',function (){
                    // $route.reload();
                    console.log('updateInbox');
                    $rootScope.updateInbox();
              });

        ///################### socket functions - end #######################################




      $scope.logout = function(){
       
                  $('#mainRow').hide();
                    $( "#imgPrimary" ).animate({ 
                           left: "+=" + (($('body').width()/2)-160),
                       top: "+=" + 20, 
                       width: '220px',
                        height: '170px'
                    
                       }, "slow", function(){
                        $http.post('/logout',{testVariable:$scope.inputName}).
                          success(function(data) {
                              $window.location.reload();
                          }).error(function(data) {
                              console.log("error in posting");
                          });
                       
                       });
                 
          
        }

    
  
      $http.post('/getUserInfo',{}).
        success(function(data) {
              // alert(data.userInfo.username);
              $rootScope.userInfo = data.userInfo;
              $rootScope.computerInfo = data.computerInfo;
              $rootScope.selfInfo = data.selfInfo;

              // console.log($rootScope.selfInfo);
              // console.log($rootScope.computerInfo);
              // console.log($rootScope.userInfo);
              
        }).error(function(data) {
            console.log("error in get user info");
        });

         $http.post('/viewFriends',{})
          .success(function(data) {
             $rootScope.friendsData = data.friendsData;
             // console.log(data.friendsData);
          }).error(function(data) {
              console.log("error in changeFriendStatus'");
        });



   

      $rootScope.convertToDate = function(n){
    
            n = new Date(n);
            var year = n.getUTCFullYear();
            var month = n.getUTCMonth();
            var day = n.getUTCDate();

            //month 2 digits
            month = ("0" + (month + 1)).slice(-2);

            //year 2 digits
            year = year.toString().substr(2,2);

            var formattedDate = month + '/' + day + "/" + year;

            return formattedDate;

      }
      $rootScope.convertToTime = function(n){
        var myDate = new Date(n);

        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();

        var suffix = hours >= 12 ? "PM":"AM"; 

        hours = ((hours + 11) % 12 + 1);
          return hours + ":" +  minutes + " " + suffix;

      }

    
    

       
    $scope.yearNow = new Date().getFullYear();
     
});

app.controller('msgCtrl',function ($scope,$location,$http,$window,$rootScope,socket,$route,$routeParams){
   

 

      console.log('msgCtrl');
    $scope.manageInbox = 0;
     $scope.btnManage = function(){
         $scope.manageInbox ^= true;
        
     }
 
      $scope.redir = function(user_id){

        $http.post('/seenMsg',{user_id:user_id}).
            success(function(data) {
                 $location.path('/profile/messages/' + user_id);
            }).error(function(data) {
                console.log("error in seenMsg");
            });
          

      }

     
      $scope.btnDelete = function(){
          // alert('msg delete');
          filterId = $scope.msg_text.filter(function(data){
                    return data.checkBox;
                })
                .map(function(data){
                    if (data.msg_from._id != $rootScope.userInfo._id) return data.msg_from._id;
                    else return data.msg_to._id
                });
                console.log(filterId);

                $http.post('/deleteInbox',{inbox_id:filterId}).
                success(function(data) {
                       socket.emit('reqUpdateChat',$routeParams.id,function(){
                                  $scope.manageInbox = 0;
                           });
                }).error(function(data) {
                    console.log("error in chat");
                });
      }
   
                                    // {{item.msg_from.username === username ? '':item.msg_from._id}}
                                    // {{item.msg_to.username === username ? '':item.msg_to._id}}

    $rootScope.updateInbox();
      $scope.selectAll = function(){
            $scope.msg_text.forEach(function(data){
                data.checkBox = true;
            });
      }
      $scope.deselectAll = function(){
            $scope.msg_text.forEach(function(data){
                data.checkBox = false;
            });
      }




});
app.controller('chatCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){


      console.log('chatCtrl');
      $scope.manageChat = 0;
     $scope.btnManage = function(){
          $scope.manageChat ^= true;
     }


   
    $http.post('/getChatInfo',{user_id:$routeParams.id}).
        success(function(data) {
              // alert(data.userInfo.username);
              $scope.chat_user = data.userInfo.username;
              $scope.chat_fullName = data.userInfo.user_fname + " " + data.userInfo.user_lname;
        }).error(function(data) {
            console.log("error in get user info");
        });

       
        $rootScope.updateChat();
 

    
     
      $scope.sendFunc = function(){
          // alert('testing');
          if ($scope.inputMessage != undefined && $scope.inputMessage != ""){
                $http.post('/createMsg',{msg:$scope.inputMessage,user:$routeParams.id}).
                    success(function(data) {
                        // alert('testing');
                           socket.emit('reqUpdateChat',$routeParams.id,function(){
                                  $scope.inputMessage = '';  
                           });
                           
                          
                    }).error(function(data) { 
                        console.log("error in view chat");
                });
                
          }
        
      }
      $scope.btnDelete = function(){
                                    
                console.log('btn chat del');
                filterId = $scope.msg_convo.filter(function(data){
                    return data.checkBox;
                }).map(function(data){
                    return data._id;
                });
             

               $http.post('/deleteChat',{chat_id:filterId}).
                success(function(data) {
                       socket.emit('reqUpdateChat',$routeParams.id,function(){
                                  $scope.manageChat = 0;
                           });
                }).error(function(data) {
                    console.log("error in chat");
                });

      }
      $scope.selectAll = function(){
            $scope.msg_convo.forEach(function(data){
                data.checkBox = true;
            });
      }
      $scope.deselectAll = function(){
            $scope.msg_convo.forEach(function(data){
                data.checkBox = false;
            });
      }
     
  
});


app.controller('friendsCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){
    console.log('friendsCtrl');
    
});


app.controller('inviteCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){
   console.log('inviteCtrl');
   $scope.changeFriendStatus = function(user_id,friendStatus){

        $http.post('/editFriendStatus',{user_id:user_id,friend_status:friendStatus}).
          success(function(data) {
             $scope.btnEnter($scope.inputUsername);
          }).error(function(data) {
              console.log("error in changeFriendStatus'");
        });


        
   }
   $scope.btnEnter = function(str){
      $http.post('/viewMembers',{findStr:str}).
          success(function(data) {
             console.log(data.user_data);
             $scope.viewMembers = data.user_data;
            
          }).error(function(data) {
              console.log("error in members");
      });

   }
  

});


app.controller('imageCtrl',['Upload','$window','$scope','$rootScope',function (Upload,$window,$scope,$rootScope){
 vm = this;
// up.file || '/img/user/userDefault.png'

 // alert(vm);

    $rootScope.updateAcct = function(){
    
        if (vm.upload_form.file.$valid && vm.file ) { //check if from is valid
           
            vm.upload(vm.file); //call upload function
        }
       
    }

    vm.upload = function (file) {
     
        Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                // console.log(vm.file);
               vm.imgThumb = vm.file;
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            if (progressPercentage ==100) $rootScope.progress = '';
        });
    };
}]);




app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('setActive',['$location', function ($location) {
    return {
      
        link: function ($scope, element, attrs) {

           $scope.$on("$routeChangeSuccess", function (event, current, previous) {
            
                  if (element[0].querySelector('a').getAttribute('href')== "/" + ($location.path().split('/')[1])){
                    element.attr('class','active');
                  }else{
                     element.attr('class','');
                  }

                 
                
            });

       
        }
    };
}]);




app.controller('homeCtrl', function ( $scope, $location, $http,$route, ngProgressFactory ) {
  console.log("home Controller reporting for duty.");
  $scope.show3 = function(){
      $scope.hahaha = ""
  }
 
 
});
app.controller('playCtrl', function ( $scope, $location, $http ,$route) {
   $scope.$route = $route;

});



