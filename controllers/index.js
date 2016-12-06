/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'ngRoute','ui.bootstrap','ngProgress','ngSanitize','luegg.directives','ngFileUpload'
]);


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

    $rootScope.progressbar.setColor("#0000FF");

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
    .when("/", {templateUrl: "partials/home.html", controller: "homeCtrl", activetab: 'home'})
    // Pages
    .when("/play", {templateUrl: "partials/play.html", controller: "playCtrl", activetab: 'play'})

    .when("/profile", {templateUrl: "partials/profile/index.html", controller: "PageCtrl"})
    .when("/profile/games", {templateUrl: "partials/profile/games.html", controller: "homeCtrl"})
    .when("/profile/friends", {templateUrl: "partials/profile/friends.html", controller: "homeCtrl"})
    .when("/invite", {templateUrl: "partials/invite.html", controller: "homeCtrl"})
    .when("/profile/messages", {templateUrl: "partials/messages.html", controller: "msgCtrl"})
    .when("/profile/create", {templateUrl: "partials/create.html", controller: "homeCtrl"})
    .when("/profile/edit", {templateUrl: "partials/edit.html", controller: "imageCtrl"})
    .when("/profile/messages/:id", {templateUrl: "partials/chat.html", controller: "chatCtrl"})
          


    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: ""})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: ""})
    .when("/404", {templateUrl: "partials/404.html", controller: ""})
    // else 404
    .otherwise({redirectTo: '/404'});
    // .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
   
}]);



app.controller('globalCtrl',function ($scope,$location,$http,$window,$rootScope,$route,$routeParams,socket){

  console.log('globalCtrl');
        

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
                             // $window.location.href = '/';
                              $window.location.reload();
                              // location.reload(true);
                              // alert('finish');
                          }).error(function(data) {
                              console.log("error in posting");
                          });
                       
                       });
                 
          
        }

    

       $scope.getNumber = function(num) {
            return new Array(num);   
       }

      $http.post('/getUserInfo',{}).
        success(function(data) {
              // alert(data.userInfo.username);
              $rootScope.userInfo = data.userInfo;
            
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

         ///################### socket functions #######################################
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

        ///################### socket functions #######################################
    
     
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

app.controller('imageCtrl',function(Upload,$window,$location,$scope,$rootScope){

   $scope.vm = this;
// up.file || '/img/user/userDefault.png'

  
 // alert(vm);

    $scope.updateAcct = function(){
         
        
        if ($scope.vm.upload_form.file.$valid && $scope.vm.file ) { //check if from is valid
           
            $scope.vm.upload($scope.vm.file); //call upload function
        }
       
    }

    $scope.vm.upload = function (file) {
     
        Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                // console.log($scope.vm.file);
                $scope.imgThumb = $scope.vm.file;
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            if (progressPercentage ==100) $scope.progress = '';
        });
    };
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



// app.directive('popupbutton', [function() {
//   return {
//     restrict: "E",
//     scope: { isOpen: "=" },
//     template: '<a ng-click="isOpen = !isOpen">Toggle</a><div>Open? {{isOpen}}',
//     link:
//        function($scope, element,attrs){
//         alert('testing');
//     }
//   };
// }]);


app.controller('homeCtrl', function ( $scope, $location, $http,$route, ngProgressFactory ) {

   // $scope.progressbar = ngProgressFactory.createInstance();
   //            $scope.progressbar.start();

   // alert($scope.activetab);
  console.log("home Controller reporting for duty.");
  $scope.show3 = function(){
      $scope.hahaha = ""
  }

 
});
app.controller('playCtrl', function ( $scope, $location, $http ,$route) {
   $scope.$route = $route;

});




// app.directive('fixedTableHeaders', ['$timeout', function($timeout) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs) {
//       // $timeout(function () {
        
//           container = element.parentsUntil(attrs.fixedTableHeaders);
//           element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 0 });

//       // }, 0);
//     }
//   }
// }]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http, $window) {
  console.log("Page Controller reporting for duty.");



  // Activates the Carousel
 
});