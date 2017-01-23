


// require(['js/solveP1.js'], function(cube) {
//       // return cube.isSolve("R");
  
//   }); //requirejs


var app = angular.module('webApp', [
  'ngRoute','luegg.directives','ngMaterial','720kb.tooltips','ui.bootstrap','ngAudio','rzModule'
]);



app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  // var socket = io('/customNamespace');
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

app.config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
  tooltipsConfProvider.configure({
    'smart':true,
    'size':'large',
    'speed': 'slow',
    'tooltipTemplateUrlCache': true
    //etc...
  });
}])


app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode(true);

    // .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
   
}]);


app.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                console.log('value=', value);
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                // console.log('blur');
                $timeout(function(){
                      //any code in here will automatically have an apply run afterwards
                       scope.$apply(model.assign(scope, false));
                  });

               
            });
        }
    };
}]);

  // console.log(doSomething.test2("R U"));
app.controller('liveCtrl', function (ngAudio, $scope, $location, $http,$q, $window, $rootScope,$timeout,socket,$mdDialog,$sce,$mdSidenav,$mdToast,$interval) {
  // document.getElementById('firstRow').style.width = 1266;

  $scope.bodyStyle = {
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    border:'1px solid',
  }

// popover for modal help
  $scope.helpPopover = $sce.trustAsHtml("<h4 style='margin:0px;'>Here!</h4>");



  $scope.modalPage =-1;

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


   
  // document.getElementsByClassName("row")[0].style.width ="500px";

if (['player1','player2'].indexOf($rootScope.playerPerspective)>-1 ){
        $scope.modalPage = 1;
        $scope.btnP1 = false;
        $mdDialog.show({
                  contentElement: '#helpLiveDialog',
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
                  $scope.btnP1 = true;
                  $scope.modalPage = -1;
                   // $http.post('/stopModalHelp',{}). success(function(data) {}).error(function(data) {   });

                // socket.emit('stopModalHelp',{},function(){ });
                });

           
    }

  }




// popover for modal help -end




ngAudio.setUnlock( false );

$scope.fx = {
    hover: ngAudio.load("/sounds/tick.mp3"),
    move: ngAudio.load("/sounds/live/NFF-single-clap.wav"),
    count: ngAudio.load("/sounds/beep.mp3")
}
$scope.fxBackground = {
    music: ngAudio.load("/sounds/live/Game-Menu_v001.mp3"),
    onGame: ngAudio.load("/sounds/live/Quirky-Puzzle-Game-Menu.mp3")
    // onGame: ngAudio.load("/sounds/live/8-Bit-Mayhem.mp3")


}

// $scope.onGame = ngAudio.load("/sounds/live/Quirky-Puzzle-Game-Menu.mp3");

$scope.cb = {
    fx:true,
    bg:true,
}




$scope.fxBackground.onGame.loop = true;
$scope.fxBackground.music.loop = true;

$scope.fxBackground.music.play();

// $scope.music.volume = 0.01;

$scope.hoverFunc = function(){

    $scope.fx.hover.play();
}

$scope.changeVol = function(){
    for (var i in $scope.fxBackground){
          $scope.fxBackground[i].volume = $scope.bgSlider.value/10;
          // console.log($scope.fxBackground[i]);     
    }

}

$scope.fxChangeVol = function(){
   for (var i in $scope.fx){
          $scope.fx[i].volume = $scope.fxSlider.value/10;
          // console.log($scope.fxBackground[i]);     
    }
    $scope.fx.move.play();
}

$scope.fxSlider = {
   value: 5,
  options: {
      floor: 0,
      ceil: 10,
      // disabled:!$scope.cb.fx,
      // disabled:true,
      hidePointerLabels:true,
      hideLimitLabels: true,
      onChange:$scope.fxChangeVol
  }
}




$scope.bgSlider = {
      value: 5,
      options: {
          floor: 0,
          ceil: 10,
          onChange:$scope.changeVol,
          hidePointerLabels:true,
          hideLimitLabels: true

       }
}

  //init for volume slider
    $rootScope.$on('initsettings', function(){  
          console.log('initsettings');  
         $scope.$broadcast('rzSliderForceRender');
     

    });


$scope.changeCbFx = function(){
  $scope.fxSlider.options.disabled = !$scope.cb.fx;

    for (i in $scope.fx){
      $scope.fx[i].muting = !$scope.cb.fx;
    }

}
$scope.changeCbBg = function(){
  $scope.bgSlider.options.disabled = !$scope.cb.bg;

    for (i in $scope.fxBackground){
      $scope.fxBackground[i].muting = !$scope.cb.bg;
    }

}


// $scope.$on("slideEnded", function() {
  
//   // $scope.fxBackground.music.volume =  $scope.bgSlider.value/10;

//     // console.log('slider');
// });






$scope.showBlur = function(){
  console.log($scope.gameStatus);
  if ($scope.gameStatus == 'onGame' && $rootScope.playerPerspective!='observer'){
    $scope.showToast();
  }
}

$scope.hideToast = function(){
  $mdToast.cancel();
}


 $scope.showToast = function () {
    var el = angular.element(document.getElementById('userControl'));
    
    var toast = $mdToast.simple()
    // .content(message)
    .action('Click here to enable keyboard controls')
    // .highlightAction(true)
    .hideDelay(0)
    .position('top left')
    .parent(el);

    $mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        // alert('You clicked the \'UNDO\' action.');
        // $scope.ifFocus = true;
      }
    });
  };


  $scope.cubeList = ['up_b','down_b','left_b','right_b','front_b','back_b','m_b','e_b','s_b','x','y','z'];

  $scope.tileCss = {
                    'background': 'grey', 'height':'20px'
              }
   $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

     $scope.htmlPopover = $sce.trustAsHtml("<span class='glyphicon glyphicon-fire'></span> Click here to begin!");
      $scope.yearNow = new Date().getFullYear();

      //############################-dialogs-#####################################//




    $scope.showConfirmAbandon = function(ev) {
       console.log('testing');
        // Appending dialog to document.body to cover sidenav in docs app
        confirm = $mdDialog.confirm()
              .title('Are you sure you want to abandon this room?')
              .textContent("If you're ongame, then you will automatically resigned.")
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('No')
              .cancel('Yes');
   
        $mdDialog.show(confirm).then(function() {
           console.log('no');
         
        }, function() {
           console.log('yes');
               socket.emit('abandonGame', {},function (){
                $window.location.href = "/";
              });
        });
    };
    $scope.home = function(){
      $window.location.href = "/";
    }

    $scope.showAbandon = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        confirm = $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('The game is abandoned')
            .textContent('You can now leave the room.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev);

            $interval(function(){
                console.log('abandon');
                if(!(angular.element(document.body).hasClass('md-dialog-is-showing'))) { 
                   console.log('insert');
                     $mdDialog.show(confirm).then(function(){
                        // console.log('abandon');
                        $window.location.href ="/";
                    });
                 }
            },1000);

      
       
    };

    $scope.showSettings = function(){

           $mdDialog.show({
              contentElement: '#settings',
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
            });
   }


    // setTimeout(function(){
    //     $scope.showAbandon();
    // },5000);

    //############################-dialogs- end #####################################//


      
     

    // $scope.testClick = function(){
          // console.log(doSomething.test($scope.testModel));
   
                  


   

          

   $scope.cancel = function() {
      $mdDialog.cancel();
    };


 

 

  // $scope.getNumber = function(num) {
  //       return new Array(num);   
  //  }
      
  $scope.convertToDate= function(n){
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
 $scope.enableSend = true;
  $scope.btnSend = function(){
    if ($scope.enableSend){
        $scope.enableSend = false;
          if (['',undefined].indexOf($scope.inputMessage)>=0){
              $scope.enableSend = true;
              return; 
          } 
              socket.emit('sendRoomMsg', {msg:$scope.inputMessage},function (){
                $scope.inputMessage = '';
                 $scope.enableSend = true;
            });
      }
  }


  //################################################# sockets #########################################################

$scope.btnTest = function(){
      $scope.bgSlider.value = 1;
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        // confirm = $mdDialog.alert()
        //     // .parent(angular.element(document.querySelector('#popupContainer')))
        //     .clickOutsideToClose(false)
        //     // .title('Click here to enable keyboard controls')
        //     // .textContent('You can now leave the room.')
        //     .ariaLabel('Alert Dialog Demo')
        //     .ok('Click here to enable keyboard controls')
        //     .hasBackdrop(false)
        //     // .clickOutsideToClose(false);
        //     // .targetEvent(ev);

      
        // $mdDialog.show(confirm).then(function(){
        //        // focus('player1');
         
        //     // $mdDialog.cancel();
        // })


}
$scope.shouldDisplayPopover = function(){
  return true;
}
// $scope.btnTest1 = function(){

 
// }


function loseDialogShow(){
       $mdDialog.show({
      contentElement: '#loseDialog',
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
            socket.emit('reqRatingUpdate',{},function(){});
       // $scope.inviteStatus =0;
            // $rootScope.root.declineModal = 0;
            // $rootScope.root.notAvailableModal = 0;
    });

}
function wonDialogShow(){
    $mdDialog.show({
      contentElement: '#wonDialog',
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
          socket.emit('reqRatingUpdate',{},function(){});
       // $scope.inviteStatus =0;
            // $rootScope.root.declineModal = 0;
            // $rootScope.root.notAvailableModal = 0;
    });

}


// $scope.gameInit = function(){


//      $scope.inviteDisplay = 0;
//      $scope.inviteTimer = 1;
//       $rootScope.root = {
//         cubeType:'3x3x3',
//         roomType:'(Public)',
//         inviteKeyword:'',
//         declineModal:0,
//         notAvailableModal:0
//     }

//      console.log('inviteDisplay ' + $scope.inviteDisplay);
//   }

  
//   $scope.gameInit();


//   $scope.inviteStatus = 0;
//   $scope.receivedStatus = 0;
//   $scope.inviteDisplay = 0;


//   $scope.receivedDialog =function(){
//       // alert('receive');
//      $scope.receivedStatus =1;  
//     $mdDialog.show({
//       contentElement: '#receivedDialog',
//       clickOutsideToClose: false,
//       openFrom:{
//          top: -50,
//           width: 30,
//           height: 80
//       },
//       closeTo:{
//         top:-50
//       }
//     }).finally(function(){
//        $scope.receivedStatus =0;
//     });

//   }

$timeout(function(){
// $scope.receivedDialog();
},3000);


  $scope.declineGameReq = function(){
            socket.emit('declineGameReq',{gameData:$scope.reqGameData},function(){
                console.log('success cancel game req');
                  $mdDialog.hide();

            });
            $scope.gameInit();
    }


  $scope.acceptGameReq = function(){

    socket.emit('acceptGameReq',{gameData:$scope.reqGameData},function(){
        // alert('accept');
        
    });

  }

   socket.on('redirGame',function (data){

        $window.location.href = "/live?id="+data
    });

     socket.on('updateReceived',function (inc,user_data,game_data){
        $scope.inviteDisplay = 1;

        $scope.receivedData = user_data;
        $rootScope.root.cubeType = game_data.cubeType;
        $rootScope.root.roomType = game_data.roomType;        
        $rootScope.root.inviteKeyword = game_data.reqKeyword;
        $scope.reqGameData = game_data;

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



  
      socket.on('updateRating',function(data){
          // alert(data);
          $scope.pRating = data;

      });

      socket.on('multipleLogin',function(data){
              console.log('data = ' + data + " id = " + $rootScope.userInfo._id);
              if (data == $rootScope.userInfo._id)
                $window.location.href = "/invalid";
      });
    

     
      socket.on('roomScoreUpdate',function(data){
        $scope.scoreP1 = data.p1;
        $scope.scoreP2 = data.p2;
          // console.log('p1 = ' + data.p1 + " p2 = " + data.p2);
      });
      socket.on('matrixComputerUpdate',function(data,comAlgSolution,userSpeed){
         
        console.log('userSpeed = ' + userSpeed + " length = " + comAlgSolution.length);

          if (data!=''){
              execPerm1(data);
              init1('1');
            }
                //set computer speed
                userSpeed = userSpeed/1000;

              if (userSpeed<20) speed1 = 50;
              else if (userSpeed<30) speed1 = 100;
              else if (userSpeed<50) speed1 = 150;
              else if (userSpeed<60) speed1 = 200;
              else if (userSpeed<80) speed1 = 250;
              else   speed1 =300;
                 
                
               
                

                console.log(speed1);
            if ($rootScope.playerPerspective == 'player1'){
              $timeout(function(){
                
                   animateFullPerm1(comAlgSolution);
              },1500);
            }
            
              // printArrayCube1();
      });

      socket.on('updateAbandon',function(){
           $scope.showAbandon();
      });      

      socket.on('getGameStatus',function (data){
            // alert(data.gameStatus);
            $scope.gameStatus = data;
             // console.log('gs = ' + $scope.gameStatus);
            if ($scope.gameStatus == 'onGame'){
              

              $scope.btnP2=false;
              $scope.btnP1=false;

              // $scope.btnf
            }




      console.log('gameStatus = ' + $scope.gameStatus);
      if ($scope.gameStatus=='idle' || $scope.gameStatus == 'iniGame'){
        $scope.btnP1 = true;
        $scope.btnP2 = true;
      } 

       
  });

      socket.on('updateUsersInRoom',function (data){
          $scope.usersInRoom = data;
          $scope.user1 = $scope.containsObject($scope.gameData.reqFrom_id._id,$scope.usersInRoom);
          $scope.user2 = $scope.containsObject($scope.gameData.reqTo_id._id,$scope.usersInRoom);          

      
      });
        socket.on('updateRoomMsg',function (data){
          $scope.roomMsg = data;
      });

          socket.on('gameStartInit', function (scrambleP1,scrambleP2,gameStatus){

               $scope.fxBackground.music.stop();

               $scope.fxBackground.onGame.play();

                    // console.log('three');
                          allMovesP1 = scrambleP1;
                          execPerm(allMovesP1);
                           // init('0');
                          init('1');
                          
                          allMovesP2 = scrambleP2;
                          execPerm1(allMovesP2);
                            // init1('0');
                          init1('1');

                          printArrayCube();
                          printArrayCube1();

                          $scope.gameStatus = gameStatus;


                          disableCamera();
                          disableCamera1();
                          // alert($scope.gameStatus);


                          //focus keyboard control
                          $scope.ifFocus = true;

                      

                      //init algs
                         allAlgP1 = '';
                         allAlgP2 = '';
        });

      socket.on('winnerUpdate',function(winnerPerspective,gameStatus,winnerUser,singleLose,scoreDiff){

         $scope.fxBackground.music.play();

         $scope.fxBackground.onGame.stop();
        
           $scope.btnP1 = true;
           $scope.btnP2 = true;
           
            $scope.gameStatus = gameStatus;
               gameUpdate = gameStatus;
               console.log('gameUpdate = ' + gameUpdate);
            animation();
            animation1();


           $('#btnReady').tooltipster('open');

           if (singleLose == '1'){ //for single player
              $scope.centerMsg = winnerUser.username + " lose!";
              $scope.gameStatusColor = 'red';
           }else{
             $scope.centerMsg = winnerUser.username + " won the game!";
             $scope.gameStatusColor = 'blue';
            }


        
            
            // if player1 won and p1 perspective
            // if ([$rootScope.playerPerspective,winnerPerspective].indexOf('player1')>-1){
            //     wonDialogShow();
            //     $scope.wonDiff = 
            // }

            if ($rootScope.playerPerspective == 'player1'){
              if (winnerPerspective == 'player1'){
                  wonDialogShow();
                try {   $scope.wonDiff = scoreDiff.p1; } catch(e){}
              }else{
                   loseDialogShow();
                 try {  $scope.loseDiff = scoreDiff.p1; } catch(e){}
              }
            }else if ($rootScope.playerPerspective == 'player2'){
             if (winnerPerspective == 'player2'){
                  wonDialogShow();
                try {   $scope.wonDiff = scoreDiff.p2; } catch(e){}
              }else{
                  loseDialogShow();
                try {   $scope.loseDiff = scoreDiff.p2 } catch(e){}
              }
            }else{
                 socket.emit('reqRatingUpdate',{},function(){});
            }
            //vice versa

            $mdToast.cancel();
            


      });
    

      socket.on('gameUpdate', function (data,gameStatus,reqRestart,gameStatusColor){
            $scope.gameStatus = gameStatus;
           gameUpdate = gameStatus;
            $scope.centerMsg = data;

            if (reqRestart){
                    $scope.btnP1 = true;
                    $scope.btnP2 = true;
            }

            $scope.gameStatusColor = gameStatusColor;

            if ($scope.gameStatus !='reconnect'){
               $scope.fx.count.play();
            }else{
             $scope.fxBackground.music.stop();
            }

            if ($scope.gameStatus == 'iniGame'){
              $scope.fxBackground.music.stop();
            }

            if ($scope.gameStatus == 'onGame'){
              $scope.ifFocus = true;
              $scope.fxBackground.onGame.play();
              $scope.fxBackground.music.stop();
            }



            console.log('game stats = ' + $scope.gameStatus);


            
      });

      //scramble init


 $scope.convertTime = function(startVal,type){
  var x =startVal; //max time 
    
        min = Math.floor( (x/1000/60) % 60 );
        sec = Math.floor( (x/1000) % 60 );

        switch(type){
           case 'min':
            return  (min.toString().length==1  ? '0'+min:min);
           break;
           case 'sec':
            return  (sec.toString().length==1 ? '0'+sec:sec);
           break;
           case 'milli':
            return x.toString().slice(0,-1).slice(-2);
            // return  (x.toString().length >= 2 ? x.toString().slice(-2) : '0'+ x );
           break;
        }

}

  // console.log($scope.convertTime(123));
  $scope.clockMin = '00';
  $scope.clockSec = '00';
  $scope.clockMilli = '00';
      socket.on('clockUpdate',function(data){
               // clock.setTime(data);
               // $scope.clock = $scope.convertTime(data);
               $scope.clockMin = $scope.convertTime(data,'min');
               $scope.clockSec = $scope.convertTime(data,'sec');
               $scope.clockMilli = $scope.convertTime(data,'milli')
              // clock.flip();

      });




       socket.on('playerPixels1', function (data){
          // if ($rootScope.playerPerspective == 'player1' || $rootScope.playerPerspective == 'observer'){
            for (var x=0;x<dimension1;x++){
                  for (var y = 0;y<(dimension1*dimension1);y++){
                 solidC1[x][y].position.setFromMatrixPosition(data[x][y] ); //ok
               solidC1[x][y].setRotationFromMatrix(data[x][y]);
              }
            }
            renderer1.render(scene1,camera1);

          // }
        });
      socket.on('playerPixels', function (data){
         // if ($rootScope.playerPerspective == 'player2' || $rootScope.playerPerspective == 'observer'){
            for (var x=0;x<dimension;x++){
                
                  for (var y = 0;y<(dimension*dimension);y++){
                     solidC[x][y].position.setFromMatrixPosition(data[x][y] ); //ok
                   solidC[x][y].setRotationFromMatrix(data[x][y]);
                  }
            }
            renderer.render(scene,camera);
          // }

        });

      $scope.updatePixels = function(data){
         socket.emit('updatePixels',data);
      };
      $scope.updatePixels1 = function(data){
         socket.emit('updatePixels1',data);
      };
      $scope.sendAlgP1 = function(data,arrayAlg,cb){
          // console.log('player 1 send');
              
          socket.emit('sendAlgP1',{alg:data,arrayAlg:arrayAlg},function(){
             $scope.fx.move.play();
                cb();
          });
          
      };
      $scope.sendAlgP2 = function(data,arrayAlg,cb){
         // console.log('player 2 send');

            // console.log(arrayAlg);
          socket.emit('sendAlgP2',{alg:data,arrayAlg:arrayAlg},function(){
            if (!($scope.gameData.reqTo_id._id==0)){
             $scope.fx.move.play();
            }
               cb();
            
          });
          
      };


  //################################################# sockets - end #########################################################
   

   
$scope.displayYourCube  ='loading...';
   //########################### initialization ######################### 
    $rootScope.$on('initialised', function(){  

    

              $scope.loadComplete =true;
        
      (function(){
                    return new Promise(function(resolve,reject){
                        resolve();
                    });
             })().then(function() {
                   return new Promise(function(resolve, reject){
                          $http.post('/getGameInfo',{id:$location.search()['id']}).
                            success(function(data) {
                                  if (data.gameData=='null' || data.gameData.reqStatus=='abandon') {
                                      $window.location.href = "/";
                                      return;
                                  }
                               
                                  $rootScope.gameData = data.gameData;

                                  //add user and get game data 
                                  socket.emit('adduser', {id:$location.search()['id']},function (){
                                          //send user entered the room
                                           socket.emit('sendRoomMsg', {msg:"Entered the room"},function (){
                                    
                                               resolve();
                                          });

                                           //update roomScore
                                           socket.emit('reqScoreUpdate',{},function(){});

                                          // update rating
                                          socket.emit('reqRatingUpdate',{},function(){});


                                  });
                                
                                  dimension = parseInt(data.gameData.cubeType.charAt(0));
                                  // dimension = 2;
                                  dimension1 = dimension;

                                  initMatrixManip();
                                  initMatrixManip1();
                                  console.log('one');
                            });
                 
                   });
              }) .then(function() {
                   return new Promise(function(resolve, reject){
                     // console.log('3');
                         $http.post('/getUserInfo',{}).
                                success(function(data) {
                                  $rootScope.userInfo = data.userInfo;
                                 resolve();
                            });
                   });
              }).then(function() {
                 return new Promise(function(resolve, reject){

                      if ( $rootScope.userInfo._id == $rootScope.gameData.reqFrom_id._id)
                          $rootScope.playerPerspective = 'player1';
                      else if ($rootScope.userInfo._id == $rootScope.gameData.reqTo_id._id)
                          $rootScope.playerPerspective = 'player2';
                      else $rootScope.playerPerspective = 'observer';

                          $rootScope.$apply();
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
                    if ($rootScope.gameData.cubeType == '3x3x3'){
                      fov = 55;
                    }else fov = 40; //if 2x2x2

                    if ($rootScope.gameData.reqTo_id._id == -1){
                      camera = new THREE.PerspectiveCamera( fov, 3.32, 1, 1000 );
                    }else
                      camera = new THREE.PerspectiveCamera( fov, 1.66, 1, 1000 );
                  
                  
                    init('0');
                       // renderer.render(scene,camera);

                  //----------------------------------- cube 2
                    renderer1 = new THREE.WebGLRenderer();
                    renderer1.setSize( document.getElementById("player2").offsetWidth, document.getElementById("player2").offsetHeight);
                    
                    renderer1.setClearColor( 0xbdbdbd, 1);
                    

                    material1 = new THREE.MeshBasicMaterial( {  transparent:false, opacity: 0.0,wireframe:false, color:0x000000  } );
                    
                    camera1 = new THREE.PerspectiveCamera( fov, 1.66, 0.1, 1000 );


                    document.getElementById('player2').appendChild(renderer1.domElement);
                        // console.log('two');

                    
                    init1('0');
                     // renderer1.render(scene1,camera1);
                    
                  animation();
                  animation1();

                label = document.getElementById('yourCube');        // Create a <button> element
                t = document.createTextNode("Your cube");       // Create a text node
                // label.appendChild(t);              

                label.style.position = 'absolute';
                label.style.top =10;
                label.style.left = '280px';     

             if ($rootScope.gameData.reqTo_id._id != '-1'){
                if ($rootScope.playerPerspective!='observer')
                  document.getElementById($rootScope.playerPerspective).appendChild(label);  

              } 
            // }
           

            


                  // transparent
                  // renderer.setClearColor( 0x2e2e2e, 1);
                  // material.transparent =true;
                  // renderer.render(scene,camera);

                  // renderer1.setClearColor( 0x2e2e2e, 1);
                  // material1.transparent =true;
                  // renderer1.render(scene1,camera1);

                  // disableCamera();
                  // disableCamera1();

                  // ------------------- end ------------------
                    resolve();
               });
              }).then(function(){
                 return new Promise(function(resolve, reject){
                      ///////############## - Reconnect - ###########################
                    // console.log('recon = ' + $scope.gameStatus);
                      if ($scope.gameStatus=='onGame' || $scope.gameStatus == 'reconnect'){

                               

                           socket.emit('cube_recon',{},function(alg1,arrayAlg,alg2,arrayAlg1,allAlg1,allAlg2){

                              // console.log('two, alg=1 = ' + alg1);
                                 //update pixels + scramble
                                allMovesP1 = alg1;
                                execPerm(allMovesP1);
                                 init('1');
                                if (arrayAlg!=null){
                                // console.log('arrayAlg ' + arrayAlg);
                                 for (var x=0;x<dimension;x++){
                                        for (var y = 0;y<(dimension*dimension);y++){
                                           solidC[x][y].position.setFromMatrixPosition(arrayAlg[x][y] ); //ok
                                         solidC[x][y].setRotationFromMatrix(arrayAlg[x][y]);
                                        }
                                  }
                                  renderer.render(scene,camera);
                                }
                             
                                //update pixels + scramble
                                // console.log('two, alg=2 = ' + alg2);
                                allMovesP2 = alg2;
                                execPerm1(allMovesP2);
                                init1('1');
                                if (arrayAlg1!=null){
                                  // console.log('arrayAlg1 ' + arrayAlg1);
                                    for (var x=0;x<dimension1;x++){
                                          for (var y = 0;y<(dimension1*dimension1);y++){
                                         solidC1[x][y].position.setFromMatrixPosition(arrayAlg1[x][y] ); //ok
                                       solidC1[x][y].setRotationFromMatrix(arrayAlg1[x][y]);
                                      }
                                    }
                                    renderer1.render(scene1,camera1);
                                }

                               //  printArrayCube();
                               //  printArrayCube1();

                               //  $scope.gameStatus = gameStatus;


                                disableCamera();
                                disableCamera1();


                                //update temp total alg
                                allAlgP1 = allAlg1;
                                allAlgP2 = allAlg2;



                
                           });

                      }else{

                         setTimeout(function(){
                          $('#btnReady').tooltipster('open');
                          // $('#btnReady').mouseover();
                         },500);
                      }
                         ///////############## - Reconnect - end ###########################
                         resolve();
                 });

             }).then(function(){
               return new Promise(function(resolve, reject){
                  $scope.displayYourCube  ='Your cube';
                        $('#btnReady').tooltipster({
                            trigger: 'custom',
                            animation:'grow',
                            // updateAnimation:'rotate',
                            triggerOpen:{
                              mouseenter:true
                            },
                            triggerClose: {
                                click: true
                            },
                            // // interactive:true,
                            // originClick:true,
                            // contentCloning:true
                          });

                $timeout(function(){
                    $http.post('/reqLiveModalHelp',{}).success(function(data){
                      if (data.show){
                           $scope.showHelp();
                      }
                    }).error(function(data){});
                  });
                       
                     
                });
            });


   
    });
    //########################### initialization -end ######################### 







// $scope.initTest = function(){
//   console.log('initTest');
// }
      
     
  
     $scope.containsObject = function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]._id == obj) {
                return true;
            }
        }

        return false;
      }

      $scope.test = function(){
        // alert('testing');
        checkNotation('Mp');
          // execPerm('R U R');
          // init('1');
      }
   
      $scope.moveClick = function(alg){
         console.log(alg);

         if ($rootScope.playerPerspective=='player1' && $scope.gameStatus == 'onGame'  && 
          !simulateIfSolve(allMovesP1 + " " + allAlgP1)){

              if (!$scope.shift){
                if (['X','Y','Z'].indexOf(alg) > -1){
                  checkNotation(alg.toLowerCase());
                }else{
                  checkNotation(alg.toUpperCase());
            }
              }
              if ($scope.shift){
                
                if (['X','Y','Z'].indexOf(alg) > -1){
                  checkNotation(alg.toLowerCase() + 'p');
                }else{
                  checkNotation(alg + 'p');
                }
              }




          }
           if ($rootScope.playerPerspective=='player2' && $scope.gameStatus == 'onGame'  && 
          !simulateIfSolve(allMovesP2 + " " + allAlgP2)){

              if (!$scope.shift){
                if (['X','Y','Z'].indexOf(alg) > -1){
                  checkNotation1(alg.toLowerCase());
                }else{
                  checkNotation1(alg.toUpperCase());
            }
              }
              if ($scope.shift){
                
                if (['X','Y','Z'].indexOf(alg) > -1){
                  checkNotation1(alg.toLowerCase() + 'p');
                }else{
                  checkNotation1(alg + 'p');
                }
              }




          }


         console.log('shift ' + $scope.shift);
      }

    

      $scope.keydown = function(e){

        
        
        if ($rootScope.playerPerspective=='player1' && $scope.gameStatus == 'onGame' && e.key.length ==1 && 
          !simulateIfSolve(allMovesP1 + " " + allAlgP1)){

             queueAlgP1.push(e.key);
             animatePermSeries();


        }else if ($rootScope.playerPerspective=='player2' && $scope.gameStatus == 'onGame' && e.key.length ==1 && 
          !simulateIfSolve(allMovesP2 + " " + allAlgP2)){

          
              // $scope.fx.move.play();
             queueAlgP2.push(e.key);
             animatePermSeries1();

        }
         

      }
      $scope.btnReady = function(){
            //client - to server
            socket.emit('readyGame', {},function (){
                   socket.emit('sendRoomMsg', {msg:"is now ready"});
                   
            });

      }
      $scope.btnForfeit = function(){

            socket.emit('forfeitGame',{},function(){
                    socket.emit('sendRoomMsg',{msg:'forfeited the game'});
             });
      }

});


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




app.directive('initsettings',['$rootScope',function($rootScope) {
            return {
                restrict: 'A',
                link: function($scope) {
                    var to;
                    var listener = $scope.$watch(function() {
                        clearTimeout(to);
                        to = setTimeout(function () {
                           listener();
                            

                            $rootScope.$broadcast('initsettings');
                        });
                    });
                }
            };
        }]);
