/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'ngRoute','ngMaterial','ngMessages'
]);

/**
 * Configure the Routes
//  */
app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    // Home
    .when("/", { templateUrl:"partials/notLogin/login.html", controller: "loginCtrl"})
    .when("/register", { templateUrl:"partials/notLogin/register.html", controller:"registerCtrl"})
    // Pages
    // .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    // .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    // .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    // .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    // .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // // Blog
    // .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    // .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // .when("/404", {templateUrl: "partials/404.html", controller: "BlogCtrl"})
    // // else 404
    .otherwise({redirectTo: '/'});
    // .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
   
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});


/**
 * Controls the Blog
 */
app.controller('registerCtrl', function ( $scope, $location, $http,$q, $window, $rootScope,$timeout,$interval) {

      $scope.yearNow = new Date().getFullYear();
      // $scope.project.username = '123';
      // $scope.project.password = '123';

      $scope.changeVisible = function(){
        if ($scope.visible) $scope.visible = false; else $scope.visible = true;
      }

      //work around for auto complete bug
     $scope.visible = true;

        $scope.project = {
          username:' ',
          password:' '
         }
         $scope.project.email = ' ';
      $timeout(function(){
        $scope.project.username = '';
        $scope.project.password = '';
        $scope.project.email = '';
        $scope.visible = false;
      },1000);  

    $scope.aLogin = function(){
        $('#mainRow').hide();
          
         $( "#imgPrimary" ).animate({ 
    
        left: "-=" + parseInt($('#imgPrimary').offset().left - 575),
        top: "-=" + parseInt($('#imgPrimary').offset().top - 20), //-30
        width: '220px',
        height: '170px'
      
         }, "slow", function(){
          // location.href='register';
          $rootScope.$apply(function(){
              $location.path('/');
           });
           // $window.location.href ='/register'; 
         });    }

      // $scope.project.username = 'jester';
      // $scope.project.password = 'jester'
      // $scope.project.email = 'jester@yahoo.com';

       $scope.removeErrDuplicate = function(){
        try{
            delete $rootScope.registerForm.nameUsername.$error.exists;
            $rootScope.registerForm.nameUsername.$validate();

            delete $rootScope.registerForm.clientEmail.$error.exists;
            $rootScope.registerForm.clientEmail.$validate();

         }catch(err){
            // console.log("form err handling");
         }

     }

      $scope.removeErrDuplicate();
     
    
    $scope.registerScopeFunc = function(form){

      $rootScope.registerForm = form;
      
                        // alert('testing');
                          // form.nameUsername.$setValidity('exists',true);
                         
                        // });
// form.nameUsername.$error.exists =false;
                         
                                               // alert(form.nameUsername.$error.pattern);
                        
                          //get time since register
                     

                 
                              (function() {
                                 var promise = new Promise(function(resolve, reject){
                                    $http.post('/checkUserIfTaken',{username:$scope.project.username}).
                                            success(function(data) {
                                              console.log('checkUser');
                                              if (data.exist == true){
                                                 form.nameUsername.$error.exists =true;
                                                 form.nameUsername.$validate();
                                              }else{
                                                resolve();
                                                
                                              }
                                                 
                                             }).error(function(data) {
                                                console.log("error in username");
                                            });
                                 });
                                 return promise;
                              })().then(function() {
                                 var promise = new Promise(function(resolve, reject){
                                     $http.post('/checkEmailIfTaken',{email:$scope.project.email}).
                                            success(function(data) {
                                              console.log('checkEmail');
                                              if (data.exist == true){
                                                // alert('check email');
                                                     form.clientEmail.$error.exists =true;
                                                     form.clientEmail.$validate();
                                                    // errorBool=true;
                                                   
                                                }else resolve();
                                             }).error(function(data) {
                                                console.log("error in email");
                                           });
                                   
                                 });
                                 return promise;
                              }).then(function() {
                                 var promise = new Promise(function(resolve, reject){
                                    // if (true){
                                    //       alert('login na');
                                    //   }else{
                                         $http.post('/register',{funcName:'register',
                                              username:$scope.project.username,
                                              password:$scope.project.password,
                                              email:$scope.project.email,
                                              }).
                                          success(function () {
                                            alert('Your account is successfully created!')
                                              window.location.href='/';
                                              // console.log('success register');


                                          }).error(function(data){
                                             alert("error in register");
                                          });

                                    //    }
                                    
                                 
                                 });
                                 return promise;
                              });
                               
                    
    }



});
  


/**
 * Controls all other Pages
 */
app.controller('loginCtrl', function ($scope, $location, $http, $window, $rootScope, $route) {

// $('#imgPrimary').css({left: (($('body').width()/2)-($('#imgPrimary').width()/2)) + "px", top:'20px' , width:'220px', height:'170px', position:'absolute'})

console.log('login ctrl');

  $scope.testFunc = function(){
     $http.post('/getUser',{}).
        success(function(data) {
            // console.log("posted successfully " + data.uno + " " + data.dos);
        }).error(function(data) {
            console.log("error in getUser");
        });
        
  }
  $scope.register = function(){
        $('#mainRow').hide();
      $( "#imgPrimary" ).animate({ 
    
        left: "-=" + parseInt($('#imgPrimary').offset().left - 450),
        top: "-=" + parseInt($('#imgPrimary').offset().top - 70), //-30
        width: '95px',
        height: '55px'
      
         }, "slow", function(){
          // location.href='register';
          $rootScope.$apply(function(){
              $location.path('register');
           });
           // $window.location.href ='/register'; 
         });
  }
  $scope.loginScopeFunc = function(){
      
     // $http.post('/checkUserIfTaken',{username:$scope.inputUsername}).
     //                      success(function(data) {
     //                        if (data.login_status == true){
     //                          $window.location.href = '/';
     //                        }else{
     //                          alert('incorrect data');
     //                        }
     //                        console.log(data.login_status);
     //                      }).error(function(data) {
     //                          console.log("error in posting");
     //                      });


         console.log('hehehe ayos');


         $('#mainRow').hide();  
         $('#errorPass').hide();
         $('#errorUser').hide();      

      $( "#imgPrimary" ).animate({ 
        // top: "+=" + parseInt($('#imgPrimary').height()), //-30 [comment]
       }, "slow", function(){
               
                         (function() {
                            var promise = new Promise(function(resolve, reject){
                                $http.post('/checkUserIfTaken',{username:$scope.inputUsername}).
                                            success(function(data) {
                                              console.log('test 1');
                                              if (data.exist == true){
                                                  // alert('meron');
                                                   resolve();
                                              }else{
                                                $( "#imgPrimary" ).delay(1500).animate({ 
                                                    top: "-=" + parseInt($('#imgPrimary').height()), //-30
                                                 
                                                 },function(){
                                                    $('#mainRow').show();
                                                    $('#errorUser').show(); 
                                                 });
                                                console.log('test 2');
                                              }

                                            }).error(function(data) {
                                               reject();
                                            });

                            });
                             return promise;
                       })().then(function() {
                            var promise = new Promise(function(resolve, reject){
                                 $http.post('/userLogin',{username:$scope.inputUsername,password:$scope.inputPassword}).
                                            success(function(data) {
                                                //$digest or $apply
                                              console.log('testing');
                                              if (data.exist == true){
                                                $( "#imgPrimary" ).delay(1500).animate({ 
                      
                                                  // left: "-=" + parseInt($('#imgPrimary').offset().left - 50),
                                                  // top: "-=" + parseInt($('#imgPrimary').offset().top - 00), //-30
                                                  // width: '130px',
                                                  // height: '100px' //[comment]
                                                
                                                   }, "slow", function(){
                                                    $window.location.reload();
                                                 });
                                                 
                                              }else{
                                                  $( "#imgPrimary" ).delay(1500).animate({ 
                                                    top: "-=" + parseInt($('#imgPrimary').height()), //-30
                                                       },function(){
                                                        $('#mainRow').show();
                                                      $('#errorPass').show();
                                                          
                                                   });
                                              }
                                            }).error(function(data) {
                                               alert('Internal server error')
                                            });
                           });
                         return promise;
                       });
        });


         
    }
    
 
              



});