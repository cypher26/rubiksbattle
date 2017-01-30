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

app.directive('iniMain',['$rootScope',function($rootScope) {
            return {
                restrict: 'A',
                link: function($scope) {
                    var to;
                    var listener = $scope.$watch(function() {
                        clearTimeout(to);
                        to = setTimeout(function () {
                           listener();
                            

                            $rootScope.$broadcast('initialised_main');
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



(function (window) {
    var last = +new Date();
    var delay = 100; // default delay

    // Manage event queue
    var stack = [];

    function callback() {
        var now = +new Date();
        if (now - last > delay) {
            for (var i = 0; i < stack.length; i++) {
                stack[i]();
            }
            last = now;
        }
    }

    // Public interface
    var onDomChange = function (fn, newdelay) {
        if (newdelay) delay = newdelay;
        stack.push(fn);
    };

    // Naive approach for compatibility
    function naive() {

        var last = document.getElementsByTagName('*');
        var lastlen = last.length;
        var timer = setTimeout(function check() {

            // get current state of the document
            var current = document.getElementsByTagName('*');
            var len = current.length;

            // if the length is different
            // it's fairly obvious
            if (len != lastlen) {
                // just make sure the loop finishes early
                last = [];
            }

            // go check every element in order
            for (var i = 0; i < len; i++) {
                if (current[i] !== last[i]) {
                    callback();
                    last = current;
                    lastlen = len;
                    break;
                }
            }

            // over, and over, and over again
            setTimeout(check, delay);

        }, delay);
    }

    //
    //  Check for mutation events support
    //

    var support = {};

    var el = document.documentElement;
    var remain = 3;

    // callback for the tests
    function decide() {
        if (support.DOMNodeInserted) {
            window.addEventListener("DOMContentLoaded", function () {
                if (support.DOMSubtreeModified) { // for FF 3+, Chrome
                    el.addEventListener('DOMSubtreeModified', callback, false);
                } else { // for FF 2, Safari, Opera 9.6+
                    el.addEventListener('DOMNodeInserted', callback, false);
                    el.addEventListener('DOMNodeRemoved', callback, false);
                }
            }, false);
        } else if (document.onpropertychange) { // for IE 5.5+
            document.onpropertychange = callback;
        } else { // fallback
            naive();
        }
    }

    // checks a particular event
    function test(event) {
        el.addEventListener(event, function fn() {
            support[event] = true;
            el.removeEventListener(event, fn, false);
            if (--remain === 0) decide();
        }, false);
    }

    // attach test events
    if (window.addEventListener) {
        test('DOMSubtreeModified');
        test('DOMNodeInserted');
        test('DOMNodeRemoved');
    } else {
        decide();
    }

    // do the dummy test
    var dummy = document.createElement("div");
    el.appendChild(dummy);
    el.removeChild(dummy);

    // expose
    window.onDomChange = onDomChange;
})(window);



// function setConstantWidth(){

//   // console.log('change constant');
//    rowList = document.getElementsByClassName('row'); 
//     // console.log(rowList);
//       var c=0; // check if 1296 =3
//       for (i in rowList){
//         // console.log(rowList[i].offsetWidth);
//         if (rowList[i].offsetWidth>1200){
//                c++;
//           }
//       }
//       console.log('row w = ' + c + 'iniWidth = ' + iniWidth);
//       if (c>(3)){ // if 3 , set values to constant
//             for (i in rowList){
//               if (rowList[i].offsetWidth>1200){
//                 rowList[i].style.width = "1296px";
//                 // console.log('change');
//               }
//             }
//             if (iniWidth==0) iniWidth++; 
            
//       }
//       else{
//          setTimeout(function(){
//             setConstantWidth();
//           },1000);
//       }
   



// }

onDomChange(function(){ 
    // alert("The Times They Are a-Changin'");
    rowList = document.getElementsByClassName('row'); 
    try{
    for (var i = 0;i<2;i++){
              if (rowList[i].offsetWidth>1000){
                rowList[i].style.width = "1296px";
              }
            
    }
    }catch(e){}

});

var iniWidth  = 0;
app.run(function ($rootScope, ngProgressFactory,$http,$window) { 

    // first create instance when app starts
    $rootScope.progressbar = ngProgressFactory.createInstance();

    $rootScope.progressbar.setColor("#bdbdbd");
    // $rootScope.progressbar.setHeight('3px');
    $rootScope.$on("$routeChangeStart", function () {

        //for archive cube animate to stop
         enableAnimate = false;
         enableAnimate1 = false;
       $rootScope.progressbar.start();
         // alert('start');
             $http.post('/getUserInfo',{}).
                    success(function(data) {
                          // alert(data.userInfo.username);
                          $rootScope.userInfo = data.userInfo;
                          $rootScope.computerInfo = data.computerInfo;
                          $rootScope.selfInfo = data.selfInfo;

                             // $rootScope.side = {
                             //      username : data.userInfo.username,
                             //      avatar : data.userInfo.user_avatar,
                             //      fullName : data.userInfo.user_fullName,
                             //      country : data.userInfo.user_country
                             //   } 
                        


                               // $rootScope.memberIni(function(){});
                                //###################### side template ################

                                $rootScope.edit = false;
                                $rootScope.validName = false;




                                $rootScope.fullName = $rootScope.userInfo.user_fullName;
                                $rootScope.inputFullName = $rootScope.fullName;

                                // console.log($rootScope.userInfo);
                              
                                $rootScope.inputFullNameFunc = function(e){
                                    if (e.length>0){
                                      $rootScope.validName = true;
                                    }else $rootScope.validName = false;
                                }

                                $rootScope.updateFullName = function(e){
                                    if ($rootScope.validName){
                                         $http.post('/updateFullName',{fullName:e})
                                          .success(function(data) {
                                             $rootScope.userInfo = data.user_data;
                                             alert('Success updating display name!');
                                             // $rootScope.edit = false;
                                             $window.location.reload();
                                             // console.log(data.friendsData);
                                          }).error(function(data) {
                                            
                                        });
                                    }

                                }
                                 $rootScope.memberIni(function(){});
                                //###################### side template end ################
                          
                          }).error(function(data) {
                              console.log("error in get user info");
                          });

    });

    $rootScope.$on("$routeChangeSuccess", function () {
        // $rootScope.progressbar.complete();
        // ON CHANGE CONTROLLER
        // setConstantWidth(); 
        
    });
});

    function isValidEmailAddress(emailAddress) {
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          return pattern.test(emailAddress);
      };



app.controller('globalCtrl',function (Upload,$mdToast, $sce,$scope,$location,$http,$window,$rootScope,$route,
                                        $routeParams,socket,$mdDialog,$interval,$document,$timeout){



 $scope.glued = true;
  socket.on('multipleLogin',function(){
        $window.location.href = "/invalid";
  });


// if (document.getElementsByClassName('row')[0].style.width == undefined){
//   alert('undefined');
// }else{
//   alert('main');

// }



 $rootScope.$on('initialised_main', function(){   //workaround fix for sometimes not update game req

       $timeout(function(){ //workaround fix auto size

// setConstantWidth();

        // document.getElementsByClassName("row")[0].style.width ="1296px";
        // document.getElementsByClassName("row")[1].style.width ="1296px";
   
        });
});
 vm = this;

 $scope.testFunc = function(){
    document.getElementById('inputImage').click();
    $rootScope.updateAcct();
 }


$scope.minError = false;
$scope.mismatchError = false;

$scope.newPass = '';
$scope.retypePass = '';


$scope.enablePassword = false;
$scope.updatePass = function(newPass,retypePass){


   
  if (!$scope.enablePassword){
      $scope.enablePassword = true;
            if (newPass.toString().length<4 || retypePass.toString().length<4){
                 alert('Minimum of 4 characters only');
                  $scope.enablePassword = false;
            }else{
                    if (newPass != retypePass){
                         alert('Mismatched type of password');
                         $scope.enablePassword = false;
                    }else{

                                  $http.post('/updatePassword',{password:newPass})
                                    .success(function(data) {
                                       alert('Success updating password!');
                                       // $rootScope.edit = false;
                                       $window.location.reload();
                                       // console.log(data.friendsData);
                                    }).error(function(data) {
                                      
                                  });
                          
                        ///update acct
                    }
                    
            }
      }


}

$scope.enableEmail = false;




    

$scope.updateEmail = function(email){


  if (!$scope.enableEmail){
      $scope.enableEmail = true;
          if (isValidEmailAddress(email)){
            //change email
                  $http.post('/updateEmail',{email:email})
                                  .success(function(data) {
                                    if (data.valid){
                                      alert('Success updating email!');
                                      $window.location.reload();
                                    }else{
                                      alert('Email is already taken');
                                      $scope.enableEmail = false;

                                    }
                                  }).error(function(data) {
                                    
                                });
          }else{
            alert('Please enter a valid email address');
            $scope.enableEmail = false;
          }

      }

  }
 $scope.showEdit = function(){
  $scope.inputEmail =$rootScope.userInfo.user_email;
    $mdDialog.show({
              contentElement: '#editDialog',
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
           });
}




$scope.showAvatarDialog = function(){
    $mdDialog.show({
              contentElement: '#avatarDialog',
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
          
             });
}




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
                       $rootScope.edit = true;
                    }else{
                      $rootScope.edit=false;
                    }
        }catch(e){
              //workaround for init userInfo then side userInfo
        }
                    // console.log('isEmpty = ' + ($rootScope.userInfo.user_fullName == undefined));
                    // console.log('isMember = ' + ($routeParams.member_id == undefined));
 
  if ($routeParams.member_id != undefined){
      $scope.isMember = true;
      $scope.isMember_id = $routeParams.member_id;



      // if ($scope.isMember_id == $rootScope.userInfo._id){
      if ([$rootScope.userInfo._id.toString(),'-1','0'].indexOf($scope.isMember_id)>-1){
        $location.path('/profile/');
     
      }else{
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
                  alert('internal error');
                  $window.location.href = "/";
                  // callback();
            });
        }
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

$scope.redirectWindow = function(loc){
  $window.location.href = loc;
}
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

// popover for modal help
  $scope.htmlPopover = $sce.trustAsHtml("<h4 style='margin:0px;'>Here!</h4>");



  $scope.modalPage =1;
  $scope.modalNext =function(){
      if ($scope.modalPage<6)
       $scope.modalPage++;
     else{
        $mdDialog.cancel();
     }
  }
  $scope.modalBack = function(){
    if ($scope.modalPage>1)
    $scope.modalPage--;
     }

  $scope.showHelp = function(){
    $scope.modalPage = 1;
    $mdDialog.show({
              contentElement: '#helpDialog',
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
              $scope.modalPage = 1;
               // $http.post('/stopModalHelp',{}). success(function(data) {}).error(function(data) {   });

            // socket.emit('stopModalHelp',{},function(){ });
            });
  
  }

// socket.on('modalUpdate',function(){
//   console.log('reqModalHelp');
//   $scope.showHelp();
// });

$timeout(function(){
  $http.post('/reqModalHelp',{}).success(function(data){
    console.log('reqModalHelp');
    if (data.show){
      $scope.showHelp();
    }
  }).error(function(data){});
});


// popover for modal help -end


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
          $rootScope.onlineList = data.online;
          $rootScope.busyList = data.busy;
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
          console.log('updateChat');
                 $scope.msg_convo = data.msg;
               
                 $rootScope.progressbar.complete();
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
});     

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

      // $http.post('/viewFriends',{id:$routeParams.member_id})
      //     .success(function(data) {
      //        $rootScope.friendsData = data.friendsData;
      //        // console.log(data.friendsData);
      //     }).error(function(data) {
             
      //   });

    
  
  
  


   

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
            return x.toString().slice(0,-1).slice(-2) + " sec";
           
            // return  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x + ' sec' );
           break;
        }

}

$rootScope.convertTimeComplete = function(startVal){
    var x =parseInt(startVal); //max time 
    
        min = Math.floor( (x/1000/60) % 60 );
        sec = Math.floor( (x/1000) % 60 );

        displayMin = (min.toString().length==1  ? '0'+min:min+'');
        displaySec = (sec.toString().length==1 ? '0'+sec:sec+'');
        // displayMilli =  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x );
        displayMilli =  x.toString().slice(0,-1).slice(-2);
           
      
      if (isNaN(displaySec) && isNaN(displayMin)){
        return 'loading ..';
      }
      if (displayMin == '00' && displaySec == '00'){
        return '';
      }
      return (displayMin != '00'? displayMin+':':'')+displaySec+'.'+displayMilli + (displayMin != '00'?' min':' sec');
        // return displayMin + ":"+displaySec+"."+displayMilli;
}






    $scope.yearNow = new Date().getFullYear();
    $scope.testStr = '';
 


 

     //for archive playbacks

 // console.log($rootScope.sliderValue);
    $scope.p1Next = function(){
        if ($scope.p1Play){
            enableAnimate = false;
        }else{
             if ($rootScope.p1Index<$scope.arrP1Moves.length-2){
          
               $rootScope.p1Index++;
               $scope.p1Exec();
             }
        }
    }
    $scope.p1Back = function(){
      if ($scope.p1Play){
            enableAnimate = false;
      }else{
          if ($rootScope.p1Index>=0){
            
            $rootScope.p1Index--;
             $scope.p1Exec();
           }
      }
    }
    $scope.p1FastNext = function(){
          if ($scope.p1Play){
            enableAnimate = false;
          }else{
         $rootScope.p1Index = $scope.arrP1Moves.length -2;
         $scope.p1Exec();
       }
    }
    $scope.p1FastBack = function(){
        if ($scope.p1Play){
            enableAnimate = false;
          }else{
          $rootScope.p1Index = $scope.gameData.scrambleMoves.split(' ').length;
          $scope.p1Exec();
        }
    }


   $scope.p1Exec = function(){
           execPerm(concatAlgIndex($scope.arrP1Moves,$rootScope.p1Index));
           init('1');
    }

    $scope.p1ClickAlg = function(index){
          if ($scope.p1Play){
            enableAnimate = false;
          }else{
              $rootScope.p1Index = index;

               $scope.p1Exec();
          }
    }

    $scope.p1Play = false;
    $scope.p1Timer;
    $rootScope.funcP1Play = function(){
      $scope.p1Play=!$scope.p1Play;
        if ($scope.p1Play){ 
            // speed = 50; 
             animateFullPerm(trimAlgIndex($scope.arrP1Moves,$rootScope.p1Index),function(){
                    $scope.$apply(function(){
                      $scope.p1Play=!$scope.p1Play;
                    });
               
             });
        }else{
           $scope.p1Play=!$scope.p1Play;
            enableAnimate =false;
        }
        // if ($scope.p1Play){ 

          
        //   $scope.p1Timer = $interval(function(){

        //       $rootScope.p1Index++;

        //            if ($rootScope.p1Index > $scope.arrP1Moves.length-2 ){
        //             $rootScope.funcP1Play();
        //               clearInterval($scope.p1Timer);
        //               return;
        //             }
                      
        //         $scope.p1Exec();
        //           console.log($rootScope.sliderValue);

        //   },$rootScope.sliderValue);
        // }else{
        //   $interval.cancel($scope.p1Timer);
        // }
    }
      // --end if p1

    $scope.p2Next = function(){
      if ($scope.p2Play){
            enableAnimate1 = false;
      }else{
        if ($rootScope.p2Index<$scope.arrP2Moves.length-2){
         $rootScope.p2Index++;
         $scope.p2Exec();
        }
      }
    }
    $scope.p2Back = function(){

      if ($scope.p2Play){
            enableAnimate1 = false;
      }else{
          if ($rootScope.p2Index>=0){
            $rootScope.p2Index--;
             $scope.p2Exec();
          }
      }
    }
    $scope.p2FastNext = function(){
         if ($scope.p2Play){
            enableAnimate1 = false;
        }else{
         $rootScope.p2Index = $scope.arrP2Moves.length -2;
         $scope.p2Exec();
        }
    }
    $scope.p2FastBack = function(){
      if ($scope.p2Play){
            enableAnimate1 = false;
        }else{
          $rootScope.p2Index = $scope.gameData.scrambleMoves.split(' ').length;
          $scope.p2Exec();
        }
    }

      $scope.p2Exec = function (){

           execPerm1(concatAlgIndex($scope.arrP2Moves,$rootScope.p2Index));
           init1('1');
    }

      $scope.p2ClickAlg = function(index){
          if ($scope.p2Play){
            enableAnimate1 = false;
          }else{
              $rootScope.p2Index = index;

               $scope.p2Exec();
          }
    }

     $scope.p2Play = false;
       $scope.p2Timer;
    $rootScope.funcP2Play = function(){
       $scope.p2Play=!$scope.p2Play;
        if ($scope.p2Play){ 
            // speed = 50; 
            // console.log(trimAlgIndex($scope.arrP2Moves,$rootScope.p2Index));
             animateFullPerm1(trimAlgIndex($scope.arrP2Moves,$rootScope.p2Index),function(){
                    $scope.$apply(function(){
                      $scope.p2Play=!$scope.p2Play;
                    });
               
             });
        }else{
           $scope.p2Play=!$scope.p2Play;
            enableAnimate1 =false;
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
                        // $scope.clockMin = '00';
                        // $scope.clockSec = '00';
                        // $scope.clockMilli = '00';

                        // $scope.clockMin = $scope.convertTime($scope.gameData.endedTime,'min');
                        // $scope.clockSec = $scope.convertTime($scope.gameData.endedTime,'sec');
                        // $scope.clockMilli = $scope.convertTime($scope.gameData.endedTime,'milli')

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
                        $rootScope.p1Index = $scope.gameData.scrambleMoves.split(' ').length; //for alg index
                        $scope.gameData.p1_moves = reduceString($scope.gameData.scrambleMoves + " end-scramble " + $scope.gameData.p1_moves);

                        //for player 2
                        $rootScope.p2Index = $scope.gameData.scrambleMoves.split(' ').length; //for alg index
                        $scope.gameData.p2_moves = reduceString($scope.gameData.scrambleMoves + " end-scramble " + $scope.gameData.p2_moves);


                        // console.log($scope.gameData.p1_moves);
                        function reduceString(statement){ //remove extra white spaces
                          statement = statement + "" + " ";
                                statement = statement.replace(/\s\s+/g, ' ');
                              statement = statement.replace(/\n+/g, ' ');
                              return statement;
                        }

                        $scope.arrP1Moves = $scope.gameData.p1_moves.split(' ') // to distribute from objects
                        $scope.arrP2Moves = $scope.gameData.p2_moves.split(' '); // to distribute from objects
                        
                        // $scope.arrP1Moves.pop();
                        // console.log($scope.arrP1Moves);

                                // $scope.p1Play = false;
                
                                //##init archive algs

                         //  speedBak =speed;
                         //  speed = 0;
                         // animateFullPerm(concatAlgIndex($scope.arrP1Moves,$rootScope.p1Index),function(){
                         //       speed = speedBak;
                         // });

                          // speed = speedBak;
                          // console.log($scope.arrP1Moves);
                          // console.log(concatAlgIndex($scope.arrP1Moves,$rootScope.p1Index));

                   execPerm(concatAlgIndex($scope.arrP1Moves,$rootScope.p1Index));
                   init('1');

                    execPerm1(concatAlgIndex($scope.arrP2Moves,$rootScope.p2Index));
                    init1('1');




                           //init cube moves - end 

                      //transparent
                  // renderer.setClearColor( 0x424242, 1);
                  // material.transparent =true;
                  // renderer.render(scene,camera);

                  // renderer1.setClearColor( 0x424242, 1);
                  // material1.transparent =true;
                  // renderer1.render(scene1,camera1);
                   $rootScope.progressbar.complete();

             
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
  function trimAlgIndex(algList,index){
    var alg = '';
      for (var x = index+1; x<algList.length;x++){
          alg+=algList[x]+" ";
      }
      return alg;
  }
                        


app.controller('archiveCtrl',function ($timeout,$rootScope,$scope,$location,$http,$window,$rootScope,socket,$route,$routeParams){

  // $scope.$apply();


  $scope.updateP1Index = function(){
     
        $timeout(function(){
           $rootScope.p1Index++;
        });
       
    
   
  }
    $scope.updateP2Index = function(){
     
        $timeout(function(){
           $rootScope.p2Index++;
        });
       
    
   
  }
  $scope.test1 = function(){
    // speed = 50;
    // enableAnimate=false;
    console.log($rootScope.p1Index);
    // $rootScope.p1Index = 3;
  }

  $scope.test = function(){
    // alert('testing');
    // speedBak =speed;
    // speed = 0;
    //  queueAlgP1.push("R");
    //  animatePermSeries();

     // console.log($rootScope.p1Index);
     // $rootScope.p1Index = 0;
     //  execPerm(concatAlgIndex($scope.arrP1Moves,$rootScope.p1Index));
     //     init('1');
     // speed = 50;
     // execPerm(trimAlgIndex($scope.arrP1Moves,$rootScope.p1Index));
     // init('1');
  



     // console.log(trimAlgIndex($scope.arrP1Moves,$rootScope.p1Index));

  }
      


    $rootScope.sliderValue = 400;
     $scope.options = {       
        from: 500,
        to: 50,
        step: 50,
         css: {
          background: {"background-color": "silver"},
          before: {"background-color": "purple"},
          default: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}          
        }     
        // dimension: " km",
          
      };
      speed = 400;
      speed1 = 400;
      $scope.changeSlider = function(val){
        console.log(val);
        // $rootScope.sliderValue = val;
        speed = val;
        speed1 = val;

        // $rootScope.funcP1Play();
        // $rootScope.funcP1Play();

        // $rootScope.funcP2Play();
        // $rootScope.funcP2Play();

      }
});
app.controller('msgCtrl',function ($scope,$location,$http,$window,$rootScope,socket,$route,$routeParams){
   

 $scope.inputInboxUsername = '';
 $rootScope.progressbar.complete();

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
      };
      $scope.deselectAll = function(){
            $scope.msg_text.forEach(function(data){
                data.checkBox = false;
            });
      };


});
app.controller('createCtrl',function ($timeout,$scope,$location,$http,$window,$routeParams,socket,$rootScope){
    console.log('createCtrl');
    $rootScope.progressbar.complete();
    $scope.searchText = '';

      // $rootScope.memberIni(function(){});

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

    $scope.enableCreate = true;
    $scope.btnSend = function(){
          // alert($scope.searchText + " " + $scope.inputMessage);

    if ($scope.enableCreate){
        $scope.enableCreate = false;
          if ($scope.searchText == $rootScope.userInfo.username){
                  alert('Please insert a valid username');
                   $scope.searchText = '';
                   $scope.enableCreate = true;
         }else{
                $http.post('/createMsg',{username:$scope.searchText,msg:$scope.inputMessage}).
                    success(function(data) {

                      
                           socket.emit('reqUpdateChat',data.id,function(){
                                             $location.path('/profile/messages/'+data.id);
                           });

                                       
                    }).error(function(data) {
                       alert('Please insert a valid username');
                       $scope.searchText = '';
                       $scope.enableCreate = true;
                    });

                }
       }
    }

    $scope.clearText = function(){
          $scope.inputMessage = '';
    // $scope.searchText = '';
    }

    $scope.inputMessage = '';
    $scope.searchText = '';
});
app.controller('chatCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){

 // $rootScope.memberIni(function(){


//work around fix for waiting userInfo
function waitUserInfo(callback){
  if ($rootScope.userInfo== undefined){
    console.log('nice');
      setTimeout(function(){
         waitUserInfo();
      });
    }else{
      callback;
    }
}

 (function() {
           return new Promise(function(resolve, reject){
                    waitUserInfo(function(){
                         resolve();
                    });
            });
     })().then(function() {
           return new Promise(function(resolve, reject){
               
                 if ($routeParams.id == $rootScope.userInfo._id){
                    $location.path('/');
                 }
                  resolve();

           });
    })


     
 // });

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
 

      $scope.enableSend = true; // for workaround fix double send slow transac
     
      $scope.sendFunc = function(){
    

          if ($scope.inputMessage != undefined && $scope.inputMessage != "" && $scope.enableSend){
            $scope.enableSend = false;
                $http.post('/createMsg',{msg:$scope.inputMessage,user:$routeParams.id}).
                    success(function(data) {
                        // alert('testing');
                           socket.emit('reqUpdateChat',$routeParams.id,function(){
                                  $scope.inputMessage = '';  
                                  $scope.enableSend =true;
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
   // $rootScope.memberIni(function(){});

  $rootScope.progressbar.complete();

    
});

app.controller('gamesCtrl',function ($scope,$location,$http,$window,$routeParams,socket,$rootScope){
 // $rootScope.memberIni(function(){});

     $http.post('/getUserArchiveGameInfo',{id:$routeParams.member_id}).
          success(function(data) {
                // console.log(data.archiveUserGameData);
                $scope.gameList = data.archiveUserGameData;
                $rootScope.progressbar.complete();
          }).error(function(data) {
              console.log('error in gamectrl');
        });


});
app.controller('inviteCtrl',function ($route,$timeout,$scope,$location,$http,$window,$routeParams,socket,$rootScope){
   // $rootScope.memberIni(function(){});
$rootScope.progressbar.complete();
   console.log('inviteCtrl');
 $timeout(function(){
    $rootScope.ifFriendStatus = true;
 });

  // alert('inviteCtrl');
  // alert('')
   $scope.changeFriendStatus = function(user_id,friendStatus){
      if ($rootScope.ifFriendStatus){
          $rootScope.ifFriendStatus = false;

            $http.post('/editFriendStatus',{user_id:user_id,friend_status:friendStatus}).
              success(function(data) {

                 // console.log('update first');

                 socket.emit('reqUpdateFriendReq',user_id,function(){
                 
                      if (friendStatus == '2'){ //accepted

                           $http.post('/createMsg',{msg:"accepted your friend request",user:user_id}).
                                success(function(data) {
                                    socket.emit('reqUpdateChat',user_id,function(){
                                            // $rootScope.ifFriendStatus = true;
                                              $scope.inputMessage = '';  
                                              // $route.reload();
                                              $window.location.reload();
                                              // alert('testing');
                                     });
                                 }).error(function(data) {});
                       }else if (friendStatus == '0'){
                          // $rootScope.ifFriendStatus = true;
                          
                          alert('Successfully sent friend request');
                             $window.location.reload();

                           
                       }else if (friendStatus == '1'){
                          // $rootScope.ifFriendStatus = true;
                          alert('Successfully removed from friends list');
                            $window.location.reload();
                       
                       }else if (friendStatus == '3'){
                          // $rootScope.ifFriendStatus = true;
                          alert('Successfully cancel friend request');
                          $window.location.reload();
                       }else{
                          $window.location.reload();
                       }
                       // alert(friendStatus);
                     
                          // $scope.manageInbox = 0;
                          // console.log('naguupdate naman');
                   });

               

              }).error(function(data) {
                  console.log("error in changeFriendStatus'");
            });

      }
      
   }
   $rootScope.btnEnter = function(str){
    $rootScope.searchStr = str;
    $rootScope.ifFriendStatus = true;
    if (str.toString().length <3){
      alert('Please enter atleast 3 characters');
      return;
    }
     $rootScope.progressbar.start();
            
      $http.post('/viewMembers',{findStr:str}).
          success(function(data) {
             // console.log(data.user_data);
             $scope.viewMembers = data.user_data;
            $rootScope.progressbar.complete();
            $scope.searchResult = "\""+str+"\"";
     
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
                    alert("Avatar successfully changed! ");
              $window.location.reload();
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
            if (progressPercentage ==100) {
              //     alert("Avatar successfully changed! ");
              // $window.location.reload();
                console.log('ok na');
              // $scope.progress = '';
            }
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
                
                  // $rootScope.memberIni(function(){

                      resolve();
                  // });
                   
                
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
                     $rootScope.progressbar.complete();
                     resolve();

          });

       });
     });

                
        

  
    

      






});





app.controller('homeCtrl', function ( $scope, $location, $http,$route, ngProgressFactory,$sce ,$rootScope) {
  console.log("home Controller reporting for duty.");
 // $rootScope.memberIni(function(){});


  
  $scope.radioSelected = 'Left';
  $scope.cubeType = '3x3x3';
$scope.leaderboardDisable = false;
$scope.selectCubeType = function(c){
      $scope.cubeType = c;
      $scope.changeRadio($scope.radioSelected);
}

$scope.changeRadio = function(val){
$scope.leaderboardDisable = true;
  console.log($scope.cubeType);
    switch(val){
      case 'Left':
        $http.post('/getHighscoreList',{}).
        success(function(data) {
                 $scope.leaderboardDisplay = data.highscoreList;
                $scope.leaderboardDisable = false;
                $rootScope.progressbar.complete();
        }).error(function(data) { 
            console.log("error in highscore");
        });

        break;
      case 'Right':
            
             $http.post('/getAverageList',{cubeType:$scope.cubeType}).
            success(function(data) {
                 $scope.leaderboardDisplay = data.averageList;
                 $scope.leaderboardDisable = false;
            }).error(function(data) { 
            console.log("error in average");
            });


        break;
      case 'Middle':
             $http.post('/getSingleList',{cubeType:$scope.cubeType}).
              success(function(data) {
                       $scope.leaderboardDisplay = data.singleList;
                     $scope.leaderboardDisable = false;
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
 // $rootScope.memberIni(function(){});
$rootScope.progressbar.complete();
});



