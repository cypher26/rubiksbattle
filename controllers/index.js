/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'chart.js','angularAwesomeSlider','ngRoute','ui.bootstrap','ngProgress','luegg.directives','ngFileUpload','ngMaterial','angular-progress-arc','fixed.table.header','rzModule'
]);


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    // .dark();
    // .primaryPalette('pink')
    // .accentPalette('orange');
});



app.directive('initialisation',['$rootScope',function($rootScope) {
            return {
                restrict: 'A',
                link: function($scope) {
                    var to;
                    var listener = $scope.$watch(function() {
                        clearTimeout(to);
                        to = setTimeout(function () {
                           listener();
                            

                            $rootScope.$broadcast('initialised');
                        });
                    });
                }
            };
        }]);




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
    // $rootScope.progressbar.setHeight('3px');
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

    // .when("/profile", {templateUrl: "partials/profile/index.html", controller: ""})
    .when("/profile", {templateUrl: "partials/profile/index.html", controller: "aboutCtrl"})
    
    .when("/profile/games", {templateUrl: "partials/profile/games.html", controller: "gamesCtrl"})
    .when("/profile/friends", {templateUrl: "partials/profile/friends.html", controller: "friendsCtrl"})
    .when("/invite", {templateUrl: "partials/invite.html", controller: "inviteCtrl"})
    .when("/profile/messages", {templateUrl: "partials/messages.html", controller: "msgCtrl"})
    .when("/profile/create", {templateUrl: "partials/create.html", controller: "createCtrl"})

   // .when("/profile/create/:id", {templateUrl: "partials/create.html", controller: "createCtrl"})

    .when("/profile/edit", {templateUrl: "partials/edit.html", controller: "imageCtrl"})
    .when("/profile/messages/:id", {templateUrl: "partials/chat.html", controller: "chatCtrl"})
    .when("/archive/:id",{templateUrl:"partials/archive.html",controller:"archiveCtrl"})

    .when("/member/:member_id",{templateUrl:"partials/profile/index.html",controller:"aboutCtrl" })
    .when("/member/games/:member_id",{templateUrl:"partials/profile/games.html",controller:"gamesCtrl" })
    .when("/member/friends/:member_id",{templateUrl:"partials/profile/friends.html",controller:"friendsCtrl" })


    .when("/404", {templateUrl: "partials/404.html", controller: ""})
    // else 404
    .otherwise({redirectTo: '/404'});
    // .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
   
}]);



// app.controller('sliderCtrl',sliderCtrl);


// function sliderCtrl($scope,$timeout,$rootScope){
//                      vm = this; 


//                      vm.slider_toggle = {
//                       value: 30,
//                       options: {
//                         floor: 10,
//                         ceil: 50,
//                         step:10
//                       }
//                     };
                    
//                     $rootScope.sliderValue = vm.slider_toggle;

                   
//                     vm.refreshSlider = function () {
//                         $timeout(function () {
//                             $scope.$broadcast('rzSliderForceRender');
//                         });
//                     };
// }



app.controller('globalCtrl',function ($scope,$location,$http,$window,$rootScope,$route,
                                        $routeParams,socket,$mdDialog,$interval,$document,$timeout){

  console.log('globalCtrl');






      //sample looop
       $rootScope.getNumber = function(num) {
            return new Array(num);   
       }

//--################################################### - MemberCtrl - #################################################

$rootScope.changeMemberFriendStatus = function(id,status){
      $http.post('/editFriendStatus',{user_id:id,friend_status:status}).
          success(function(data) {

             $rootScope.memberIni(function(){});

              socket.emit('reqUpdateFriendReq',id,function(){
                      // $scope.manageInbox = 0;
                      // console.log('naguupdate naman');
               });

          }).error(function(data) {
              console.log("error in changeFriendStatus'");
        });

}

$rootScope.memberIni = function(callback){
  $scope.isMember = false;




      $http.post('/viewFriends',{id:$routeParams.member_id})
          .success(function(data) {
             $rootScope.friendsData = data.friendsData;
             // console.log(data.friendsData);
          }).error(function(data) {
             
        });
          
        try{
           if ($rootScope.userInfo.user_fullName == undefined && ($routeParams.member_id == undefined)){
                       $scope.edit = true;
                    }else{
                      $scope.edit=false;
                    }
        }catch(e){
              //workaround for init userInfo then side userInfo
        }
                    // console.log('isEmpty = ' + ($rootScope.userInfo.user_fullName == undefined));
                    // console.log('isMember = ' + ($routeParams.member_id == undefined));
 
  if ($routeParams.member_id != undefined){
      $scope.isMember = true;
      $scope.isMember_id = $routeParams.member_id;




      $http.post('/viewSpecificMember',{member_id:$routeParams.member_id}).
            success(function(data) {

              // console.log( data);
                     $rootScope.side = {
                        username : data.userInfo.username,
                        avatar : data.userInfo.user_avatar,
                        fullName : data.userInfo.user_fullName,
                        country : data.userInfo.user_country
                     } 

                       $scope.isMemberInfo = data.userInfo;
                       callback();
            }).error(function(data) {
                  alert('error');
                  $window.location.href = "/";
                  // callback();
            });
  }else{
        $http.post('/getUserInfo',{}).
            success(function(data) {
              // console.log( data);
                     $rootScope.side = {
                        username : data.userInfo.username,
                        avatar : data.userInfo.user_avatar,
                        fullName : data.userInfo.user_fullName,
                        country : data.userInfo.user_country
                     } 
                     callback();
            }).error(function(data) {
           
          });
  }




  // console.log('im = ' + $scope.isMember);
}


//--################################################### - MemberCtrl - end - #################################################


//--################################################### - init - #################################################

// $window.location.href = "/live?id=111";


$scope.redirect = function(loc){
  $location.path(loc);

}
$scope.redirectParam = function(loc,param){
  $location.path(loc).search({name:param});
}

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
  $scope.inviteDisplay=1;
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
          console.log('Uonline ' + data);
          $rootScope.onlineList = data;
     });
      socket.emit('reqUpdateLiveGames',{},function(){ });

    socket.on('updateLiveGames',function(onlineList){

      // var data = !{JSON.stringify(onlineList)}; // <====

        $rootScope.liveGames = JSON.parse(onlineList);
          // console.log($rootScope.liveGames);
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



    $rootScope.updateChat =function (){
        $http.post('/viewMsg',{user:$routeParams.id}).
        success(function(data) {
                 $scope.msg_convo = data.msg;
                 $scope.glued = true;
        }).error(function(data) { 
            console.log("error in view chat");
        });
    }
      $rootScope.updateInbox = function(){

          $http.post('/viewInbox',{}).
          success(function(data) {
              $scope.msg_text = data.inbox;

              $scope.numMsg =0;
             
             

            $scope.msg_text.forEach(function(item){
                 if (item.msg_status === 'unseen' && item.msg_from.username != $rootScope.userInfo.username){
                    $scope.numMsg++;
                 }
            
             });
              // $scope.glued = true;
          }).error(function(data) {
              console.log("error in view inbox");
          });

    }


    $rootScope.updateFriendReq = function(){
        $http.post('/viewFriendRequest',{findStr:''}).
          success(function(data) {
             // console.log(data.user_data);
          
                 $scope.viewMembers = data.user_data;
            
             
                console.log('auto update friend req');

              $scope.numFriends = 0;
             $scope.viewMembers.forEach(function(e){
                if (e.status ==='2') $scope.numFriends++;
                // console.log(e.status);
             });
             
            
          }).error(function(data) {
              console.log("error in members");
       });
    }

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





$timeout(function(){
   $rootScope.updateInbox();
   $rootScope.updateFriendReq();
   


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

 
             socket.on('updateChat',function (){
                  // $route.reload();
                  console.log('updateChat');
                  $rootScope.updateChat();
            });

    

   

});     



              socket.on('friendReq',function (){
                    // $route.reload();

                  $rootScope.updateFriendReq();
              });

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

      $http.post('/viewFriends',{id:$routeParams.member_id})
          .success(function(data) {
             $rootScope.friendsData = data.friendsData;
             // console.log(data.friendsData);
          }).error(function(data) {
             
        });

    
  
      $http.post('/getUserInfo',{}).
        success(function(data) {
              // alert(data.userInfo.username);
              $rootScope.userInfo = data.userInfo;
              $rootScope.computerInfo = data.computerInfo;
              $rootScope.selfInfo = data.selfInfo;

                 $rootScope.side = {
                      username : data.userInfo.username,
                      avatar : data.userInfo.user_avatar,
                      fullName : data.userInfo.user_fullName,
                      country : data.userInfo.user_country
                   } 
            


                   // $rootScope.memberIni(function(){});
                    //###################### side template ################

                    $scope.edit = false;
                    $scope.validName = false;




                    $scope.fullName = $rootScope.userInfo.user_fullName;
                    $scope.inputFullName = $scope.fullName;

                    // console.log($rootScope.userInfo);
                  
                    $scope.inputFullNameFunc = function(e){
                        if (e.length>0){
                          $scope.validName = true;
                        }else $scope.validName = false;
                    }

                    $scope.updateFullName = function(e){
                        if ($scope.validName){
                             $http.post('/updateFullName',{fullName:e})
                              .success(function(data) {
                                 $rootScope.userInfo = data.user_data;
                                 alert('Success updating fullname!');
                                 // $scope.edit = false;
                                 $window.location.reload();
                                 // console.log(data.friendsData);
                              }).error(function(data) {
                                
                            });
                        }

                    }

                    //###################### side template end ################
              
        }).error(function(data) {
            console.log("error in get user info");
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

$rootScope.convertTime = function(startVal,type){
  var x =startVal; //max time 
    
        min = Math.floor( (x/100/60) % 60 );
        sec = Math.floor( (x/100) % 60 );

        switch(type){
           case 'min':
            return  (min.toString().length==1  ? '0'+min:min);
           break;
           case 'sec':
            return  (sec.toString().length==1 ? '0'+sec:sec);
           break;
           case 'milli':
            return  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x );
           break;
        }

}

$rootScope.convertTimeComplete = function(startVal){
    var x =parseInt(startVal); //max time 
    
        min = Math.floor( (x/100/60) % 60 );
        sec = Math.floor( (x/100) % 60 );

        displayMin = (min.toString().length==1  ? '0'+min:min+'');
        displaySec = (sec.toString().length==1 ? '0'+sec:sec+'');
        displayMilli =  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x );
      
      return (displayMin != '00'? displayMin+':':'')+displaySec+'.'+displayMilli;
        // return displayMin + ":"+displaySec+"."+displayMilli;
}






    $scope.yearNow = new Date().getFullYear();
    $scope.testStr = '';
 


 

     //for archive playbacks

 // console.log($rootScope.sliderValue);
    $scope.p1Next = function(){
        if ($scope.p1Index<$scope.arrP1Moves.length-2){
         $scope.p1Index++;
         p1Exec();
        }
    }
    $scope.p1Back = function(){
      if ($scope.p1Index>=0){
        $scope.p1Index--;
         p1Exec();
      }
    }
    $scope.p1FastNext = function(){
         $scope.p1Index = $scope.arrP1Moves.length -2;
         p1Exec();
    }
    $scope.p1FastBack = function(){
          $scope.p1Index = $scope.gameData.scrambleMoves.split(' ').length;
          p1Exec();
    }


    function p1Exec(){
           execPerm(concatAlgIndex($scope.arrP1Moves,$scope.p1Index));
           init('1');
    }

    $scope.p1ClickAlg = function(index){
          $scope.p1Index = index;
          p1Exec();
    }

    
    $scope.p1Timer;
    $rootScope.funcP1Play = function(){
        // alert($scope.p1Play);
        $scope.p1Play=!$scope.p1Play;

        console.log($scope.p1Play);
        if ($scope.p1Play){

          console.log('set time');
          $scope.p1Timer = $interval(function(){

              $scope.p1Index++;

                   if ($scope.p1Index > $scope.arrP1Moves.length-2 ){
                    $rootScope.funcP1Play();
                      clearInterval($scope.p1Timer);
                      return;
                    }
                      
                p1Exec();
                  console.log($rootScope.sliderValue);

          },$rootScope.sliderValue);
        }else{
            console.log('cancel time');

          $interval.cancel($scope.p1Timer);
        }
    }
      // --end if p1

    $scope.p2Next = function(){
        if ($scope.p2Index<$scope.arrP2Moves.length-2){
         $scope.p2Index++;
         p2Exec();
        }
    }
    $scope.p2Back = function(){

      $scope.sliderSpeed = '10';
      if ($scope.p2Index>=0){
        $scope.p2Index--;
         p2Exec();
      }
    }
    $scope.p2FastNext = function(){
         $scope.p2Index = $scope.arrP2Moves.length -2;
         p2Exec();
    }
    $scope.p2FastBack = function(){
          $scope.p2Index = $scope.gameData.scrambleMoves.split(' ').length;
          p2Exec();
    }

    function p2Exec(){
           execPerm1(concatAlgIndex($scope.arrP2Moves,$scope.p2Index));
           init1('1');
    }

      $scope.p2ClickAlg = function(index){
          $scope.p2Index = index;
          p2Exec();
    }
    $scope.p2Timer;
    $rootScope.funcP2Play = function(){
        // alert($scope.p1Play);
        $scope.p2Play=!$scope.p2Play;

    
        if ($scope.p2Play){

          console.log('set time');
          $scope.p2Timer = $interval(function(){

              $scope.p2Index++;

                   if ($scope.p2Index > $scope.arrP2Moves.length-2 ){
                    $rootScope.funcP2Play();
                      clearInterval($scope.p2Timer);
                      return;
                    }
                      
                p2Exec();
                  console.log($rootScope.sliderValue);

          },$rootScope.sliderValue);
        }else{
            console.log('cancel time');

          $interval.cancel($scope.p2Timer);
        }
    }

    ////for archive playbacks - end


      //archive cube init
     $rootScope.$on('initialised', function(){  
       (function(){
                    return new Promise(function(resolve,reject){
                    //get game data
                      $http.post('/getArchiveGameInfo',{id:$routeParams.id}).
                        success(function(data) {
                            $scope.gameData = data.archiveGameData;

                            //get user rating
                              $http.post('/getUserRating',{ids:[$scope.gameData.game_id.reqFrom_id._id,
                                                                $scope.gameData.game_id.reqTo_id._id]}).
                                  success(function(data) {
                                      $scope.userRating = data.userRating;
                                       resolve();
                                  }).error(function(data) {
                                      console.log("error in getUserRating");
                                  });
                       }).error(function(data) {
                             $location.path('/');
                        });
         
                   
                    });
             })().then(function(){
                   return new Promise(function(resolve, reject){
                        //set clock
                        $scope.clockMin = '00';
                        $scope.clockSec = '00';
                        $scope.clockMilli = '00';

                        $scope.clockMin = $scope.convertTime($scope.gameData.endedTime,'min');
                        $scope.clockSec = $scope.convertTime($scope.gameData.endedTime,'sec');
                        $scope.clockMilli = $scope.convertTime($scope.gameData.endedTime,'milli')

                        //set dimension and backend matrix
                        dimension1 = dimension = parseInt($scope.gameData.game_id.cubeType.charAt(0));
                        initMatrixManip();
                        initMatrixManip1();
                        resolve();
                  });

            }).then(function(){
                   return new Promise(function(resolve, reject){
                    //----------------------------------- cube 1
                    // console.log('one');
                    renderer = new THREE.WebGLRenderer();
                    
                    renderer.setSize( document.getElementById("player1").offsetWidth, document.getElementById("player1").offsetHeight );
                    renderer.setClearColor( 0xbdbdbd, 1);
                    // renderer.setClearColor(0x000000,1);
                 
                    document.getElementById('player1').appendChild(renderer.domElement);

                    material = new THREE.MeshBasicMaterial( {  transparent:false, opacity: 0.0,wireframe:false, color:0x000000  } );


                    //Camera frustum vertical field of view.
                    fov =0;

                    // if ($rootScope.gameData.cubeType == '3x3x3'){
                    if (dimension == 3){
                      fov = 55;
                    }else fov = 40; //if 2x2x2


                 

                     if ($scope.gameData.game_id.reqTo_id._id == -1){
                      camera = new THREE.PerspectiveCamera( fov, 2.12, 1, 1000 );
                    }else
                      camera = new THREE.PerspectiveCamera( fov, 1.06, 1, 1000 );
                  


                      // camera = new THREE.PerspectiveCamera( fov, 1.06, 1, 1000 );
                  
                  
                    init('0');
                       // renderer.render(scene,camera);

                  //----------------------------------- cube 2
                    renderer1 = new THREE.WebGLRenderer();
                    renderer1.setSize( document.getElementById("player2").offsetWidth, document.getElementById("player2").offsetHeight);
                    
                    renderer1.setClearColor( 0xbdbdbd, 1);
                    

                    material1 = new THREE.MeshBasicMaterial( {  transparent:false, opacity: 0.0,wireframe:false, color:0x000000  } );
                    
                    camera1 = new THREE.PerspectiveCamera( fov, 1.06, 0.1, 1000 );

                    document.getElementById('player2').appendChild(renderer1.domElement);
                        // console.log('two');

                    init1('0');
                     // renderer1.render(scene1,camera1);
             

                  //init cube moves 

                         $scope.algColor = {
                            'background-color':'yellow',
                            'padding':'5px',

                        }
                        //for player 1
                        $scope.p1Index = $scope.gameData.scrambleMoves.split(' ').length; //for alg index
                        $scope.gameData.p1_moves = $scope.gameData.scrambleMoves + " <end-scramble> " + $scope.gameData.p1_moves;

                        //for player 2
                        $scope.p2Index = $scope.gameData.scrambleMoves.split(' ').length; //for alg index
                        $scope.gameData.p2_moves = $scope.gameData.scrambleMoves + " <end-scramble> " + $scope.gameData.p2_moves;

                        $scope.arrP1Moves = $scope.gameData.p1_moves.split(' '); // to distribute from objects
                        $scope.arrP2Moves = $scope.gameData.p2_moves.split(' '); // to distribute from objects
                                
                                // $scope.p1Play = false;
                
                   execPerm(concatAlgIndex($scope.arrP1Moves,$scope.p1Index));
                   init('1');

                    execPerm1(concatAlgIndex($scope.arrP2Moves,$scope.p2Index));
                    init1('1');




                           //init cube moves - end 

                      //transparent
                  // renderer.setClearColor( 0x424242, 1);
                  // material.transparent =true;
                  // renderer.render(scene,camera);

                  // renderer1.setClearColor( 0x424242, 1);
                  // material1.transparent =true;
                  // renderer1.render(scene1,camera1);

             
                    resolve();
               });



            
            });
    }); 

});

  //get the array and index alg, and concat
 function concatAlgIndex(algList,index){
                    var alg ='';
                        for (var x =0;x<=index;x++){
                          alg+=algList[x] + " ";
                        }
                      return alg;
    }
                        


app.controller('archiveCtrl',function ($scope,$location,$http,$window,$rootScope,socket,$route,$routeParams){
    $rootScope.sliderValue = "400";
     $scope.options = {       
        from: 1000,
        to: 100,
        step: 100,
         css: {
          background: {"background-color": "silver"},
          before: {"background-color": "purple"},
          default: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}          
        }     
        // dimension: " km",
          
      };

      $scope.changeSlider = function(val){
        console.log(val);
        $rootScope.sliderValue = val;


        $rootScope.funcP1Play();
        $rootScope.funcP1Play();

        $rootScope.funcP2Play();
        $rootScope.funcP2Play();

      }
});
app.controller('msgCtrl',function ($scope,$location,$http,$window,$rootScope,socket,$route,$routeParams){
   

 $scope.inputInboxUsername = '';

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
app.controller('createCtrl',function ($timeout,$scope,$location,$http,$window,$routeParams,socket,$rootScope){
    console.log('createCtrl');
    $scope.searchText = '';

      $rootScope.memberIni(function(){});

  $timeout(function(){

      if ($location.search().name !=undefined){
        $scope.searchText = $location.search().name;
      }
      
  });
    

    $scope.searchChange = function(s_keyword){ //search keyword
      console.log(s_keyword);
    }
    $scope.itemChange = function(v_keyword){ //value keyword
        console.log(v_keyword);
    }

    $scope.queryFriendsData = function(queryString){
      var results = $rootScope.friendsData.filter(function(e){
        if (e.username.toLowerCase().indexOf(queryString.toLowerCase())>-1) return e;
      });
      console.log(queryString);
      // return $rootScope.friendsData;
      return results;
    }

    $scope.toggleFriendsList = function(){

      $scope.searchText = '';
        document.querySelector('#toggleAuto').focus();
    }

    $scope.btnSend = function(){
          // alert($scope.searchText + " " + $scope.inputMessage);


    $http.post('/createMsg',{username:$scope.searchText,msg:$scope.inputMessage}).
        success(function(data) {
             socket.emit('reqUpdateChat',data.id,function(){
                               $location.path('/profile/messages/'+data.id);
             });
                           
        }).error(function(data) {
           alert('Please insert a valid username');
           $scope.searchText = '';
        });

    }

    $scope.clearText = function(){
          $scope.inputMessage = '';
    // $scope.searchText = '';
    }

    $scope.inputMessage = '';
    $scope.searchText = '';
});
app.controller('chatCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){



    $rootScope.updateInbox();
      console.log('chatCtrl');
      $scope.manageChat = 0;
     $scope.btnManage = function(){
          $scope.manageChat ^= true;
     }


   
    $http.post('/getChatInfo',{user_id:$routeParams.id}).
        success(function(data) {
              // alert(data.userInfo.username);
              try{
                    $scope.chat_user = data.userInfo.username;
              }catch(e){
                    $window.location.href ="/";

              }   
         
              
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
   $rootScope.memberIni(function(){});

 

    
});

app.controller('gamesCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){
 $rootScope.memberIni(function(){});

     $http.post('/getUserArchiveGameInfo',{id:$routeParams.member_id}).
          success(function(data) {
                // console.log(data.archiveUserGameData);
                $scope.gameList = data.archiveUserGameData;
          }).error(function(data) {
              console.log('error in gamectrl');
        });


});
app.controller('inviteCtrl',function ($route,$timeout,$scope,$location,$http,$window,$routeParams,socket,$rootScope){
   $rootScope.memberIni(function(){});

   console.log('inviteCtrl');
   $scope.changeFriendStatus = function(user_id,friendStatus){

        $http.post('/editFriendStatus',{user_id:user_id,friend_status:friendStatus}).
          success(function(data) {
             // $scope.btnEnter($scope.inputUsername);
             $route.reload();
             // console.log('update first');

             socket.emit('reqUpdateFriendReq',user_id,function(){
                      // $scope.manageInbox = 0;
                      // console.log('naguupdate naman');
               });

             if (friendStatus == '2'){

                console.log('accepted');
                 $http.post('/createMsg',{msg:"accepted your friend request",user:user_id}).
                      success(function(data) {
                          // alert('testing');
                             socket.emit('reqUpdateChat',user_id,function(){
                                    $scope.inputMessage = '';  
                             });
                             
                            
                      }).error(function(data) { 
                          console.log("error in view chat");
                  });
             }

          }).error(function(data) {
              console.log("error in changeFriendStatus'");
        });


        
   }
   $scope.btnEnter = function(str){
      $http.post('/viewMembers',{findStr:str}).
          success(function(data) {
             // console.log(data.user_data);
             $scope.viewMembers = data.user_data;
            
          }).error(function(data) {
              console.log("error in members");
      });

   }
   
   if ($location.search().request!=undefined){
        $rootScope.updateFriendReq();
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


app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
   //  ChartJsProvider.setOptions({
   //    chartColors: ['#8181F7', '#FF4000'],
   //    responsive: false,
   //    width:100,

   // });
   
    // // Configure all line charts
    // ChartJsProvider.setOptions('line', {
    //   showLines: false
    // });
  }])


app.controller('aboutCtrl', function ( $scope, $location, $http,$route, ngProgressFactory,$sce,$rootScope,$routeParams ) {



       $scope.radarLabels = ["Won by Time", "Won by resignation", "Won by disconnection",
                        "lost by Time","Lost by resignation","Lost by disconnection"];

      $scope.radarSeries = ['3x3x3','2x2x2'];

      $scope.radarColors = ['#8181F7', '#FF4000'];

      $scope.radarOptions =  {
      //         scales: {
      //             yAxes: [{
                 
      //                 ticks: {
      //                     stepSize: 5
      // // suggestedMin: 0,  
      //                   // scaleBeginAtZero: true

      //                 }

      //             }]
      //         },
              legend: {
                  display: true,
                  labels: {
                      fontColor: 'rgba(0, 0, 0, 1)'
                  }
              },

          };


     (function() {
           return new Promise(function(resolve, reject){
                
                  $rootScope.memberIni(function(){

                      resolve();
                  });
                   
                
           });
     })().then(function() {
           return new Promise(function(resolve, reject){
                
                  $http.post('/getAllUserStats',{id:$routeParams.member_id}).
                      success(function(data) {
                               $scope.radarData = [
                                 data.data3,
                                  data.data2
                                ];
                                    resolve();
                                
                      });
           });
      }).then(function() {
           return new Promise(function(resolve, reject){
                 $http.post('/getUserRankHighscore',{id:$routeParams.member_id}).
                    success(function(data) {
                          $scope.userRankHighscore = data.userRankHighscore;
                           resolve();
                    });

               
           });
      }).then(function() {
           return new Promise(function(resolve, reject){
                $http.post('/getUserRankSingle',{id:$routeParams.member_id,cubeType:'3x3x3'}).
        success(function(data) {
              $scope.userRankSingle3 = data.userRankSingle;
               resolve();

        });
               
           });
      }).then(function() {
         return new Promise(function(resolve, reject){
                $http.post('/getUserRankAverage',{id:$routeParams.member_id,cubeType:'3x3x3'}).
        success(function(data) {
     
              $scope.userRankAverage3 = data.userRankAverage;
                resolve();
        });

              
           });
     }).then(function() {
         return new Promise(function(resolve, reject){
                
        $http.post('/getUserRankSingle',{id:$routeParams.member_id, cubeType:'2x2x2'}).
        success(function(data) {
              $scope.userRankSingle2 = data.userRankSingle;
              resolve();

        });

     });
     }).then(function() {
         return new Promise(function(resolve, reject){
               
         $http.post('/getUserRankAverage',{id:$routeParams.member_id, cubeType:'2x2x2'}).
          success(function(data) {
        
                $scope.userRankAverage2 = data.userRankAverage;
                     resolve();

          });

       });
     }).then(function() {
         return new Promise(function(resolve, reject){
               
         $http.post('/getMemberSince',{id:$routeParams.member_id}).
          success(function(data) {
               $scope.user_since = $rootScope.convertToDate(data.user_since);
            
                     resolve();

          });

       });
     });

                
        

  
    

      






});





app.controller('homeCtrl', function ( $scope, $location, $http,$route, ngProgressFactory,$sce ,$rootScope) {
  console.log("home Controller reporting for duty.");
 $rootScope.memberIni(function(){});


  
  $scope.radioSelected = 'Left';
  $scope.cubeType = '3x3x3';

$scope.selectCubeType = function(c){
      $scope.cubeType = c;
      $scope.changeRadio($scope.radioSelected);
}

$scope.changeRadio = function(val){

  console.log($scope.cubeType);
    switch(val){
      case 'Left':
        $http.post('/getHighscoreList',{}).
        success(function(data) {
                 $scope.leaderboardDisplay = data.highscoreList;
              
        }).error(function(data) { 
            console.log("error in highscore");
        });

        break;
      case 'Right':
            
             $http.post('/getAverageList',{cubeType:$scope.cubeType}).
            success(function(data) {
                 $scope.leaderboardDisplay = data.averageList;
            }).error(function(data) { 
            console.log("error in average");
            });


        break;
      case 'Middle':
             $http.post('/getSingleList',{cubeType:$scope.cubeType}).
              success(function(data) {
                       $scope.leaderboardDisplay = data.singleList;
                     
              }).error(function(data) { 
                  console.log("error in single");
            });

        break;

  }    
}

$scope.changeRadio('Left');

    $scope.popoverContent = $sce.trustAsHtml("Best average of 5");

     

  

 
 
});
app.controller('playCtrl', function ( $scope, $location, $http ,$route,$rootScope) {
   $scope.$route = $route;
 $rootScope.memberIni(function(){});

});



