/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'ngRoute'
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

/**
 * Controls the Blog
 */
app.controller('registerCtrl', function ( $scope, $location, $http,$q, $window, $rootScope) {
    $scope.aLogin = function(){
        $('#mainRow').hide();
          
          $( "#imgPrimary" ).animate({ 
        
              left: "+=" + (($('body').width()/2)-160),
             top: "+=" + 20, //-30
       
              width: '220px',
              height: '170px'
          
             }, "slow", function(){
              $rootScope.$apply(function(){
                $location.path('/');
             });
              
             });
    }
    $scope.registerScopeFunc = function(){
       
                      var  errorResult = "";
                      var   errorBool = false;

                        $('#errorHeader').hide();
                        // alert($("input[name='gender']:checked").val());
                        // alert(outputInfo);
                        $('#inputUsername').tooltip('hide');
                        $('#inputPassword').tooltip('hide');
                        $('#inputRePassword').tooltip('hide');
                        $('#inputEmail').tooltip('hide');
                        $('#inputFName').tooltip('hide');
                        $('#selectYear').tooltip('hide');

                  
                      $('#inputUsername').css({'background-color':'#ffffff'});
                        $('#inputPassword').css({'background-color':'#ffffff'});
                        $('#inputRePassword').css({'background-color':'#ffffff'});
                        $('#inputEmail').css({'background-color':'#ffffff'});
                        $('#inputFName').css({'background-color':'#ffffff'});
                        // $('#selectYear').css({'background-color':'#ffffff'});
                        


                        if ($('#inputUsername').val().length<4){
                            errorResult+="* The username must be at least 4 characters long.<br>";
                            $('#inputUsername').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if (! /^[a-zA-Z0-9_]+$/.test($('#inputUsername').val())) {
                          errorResult+="* The username contains only letters, numbers and underscore.<br>";
                            $('#inputUsername').css({'background-color':'#F6CECE'});
                            errorBool=true;
                      }

                        if ($('#inputPassword').val().length<4){
                            errorResult+="* Your password must be at least 4 characters long.<br>";
                            $('#inputPassword').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if ($('#inputRePassword').val() != $('#inputPassword').val()){
                            errorResult+="* Password  does not match your confirmation.<br>";
                            $('#inputRePassword').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }

                      

                        if (!isValidEmailAddress($('#inputEmail').val())){
                            errorResult+="* Plese enter a valid email address.<br>";
                            $('#inputEmail').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                          //if no string

                        
                        if (!$('#inputUsername').val()){
                            $('#inputUsername').tooltip('toggle');
                            $('#inputUsername').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if (!$('#inputPassword').val()){
                            $('#inputPassword').tooltip('toggle');
                            $('#inputPassword').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if (!$('#inputRePassword').val()){
                            $('#inputRePassword').tooltip('toggle');
                            $('#inputRePassword').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if (!$('#inputEmail').val()){
                            $('#inputEmail').tooltip('toggle');
                            $('#inputEmail').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if (!$('#inputFName').val()){
                            $('#inputFName').tooltip('toggle');
                            $('#inputFName').css({'background-color':'#F6CECE'});
                            errorBool=true;
                        }
                        if ($('#selectDay').val() == 0 || $('#selectYear').val() == 0 || 
                           $('#selectMonth').val() == 0){
                            $('#selectYear').tooltip('toggle');
                            errorResult+="* Invalid birthdate.<br>";
                            // $('#selectYear').css({'background-color':'#F6CECE'});

                            errorBool=true;
                         }
                      
                        
                          //get time since register
                          var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth()+1; //January is 0!
                        var yyyy = today.getFullYear();

                        if(dd<10) {
                            dd='0'+dd
                        } 

                        if(mm<10) {
                            mm='0'+mm
                        } 

                        today = yyyy+'-'+mm+'-'+dd;
                        // alert(today);
                        var dt = new Date();
                        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

                 
                              (function() {
                                 var promise = new Promise(function(resolve, reject){
                                    $http.post('/checkUserIfTaken',{username:$('#inputUsername').val()}).
                                            success(function(data) {
                                              console.log('checkUser');
                                              if (data.exist == true){
                                                errorResult+="* The username is already taken.<br>";
                                                $('#inputUsername').css({'background-color':'#F6CECE'});
                                                  errorBool=true;
                                               }
                                               resolve();
                                                 
                                             }).error(function(data) {
                                                console.log("error in username");
                                            });
                                 });
                                 return promise;
                              })().then(function() {
                                 var promise = new Promise(function(resolve, reject){
                                     $http.post('/checkEmailIfTaken',{email:$('#inputEmail').val()}).
                                            success(function(data) {
                                              console.log('checkEmail');
                                              if (data.exist == true){
                                                   errorResult+="* The email address is already in use.<br>";
                                                    $('#inputEmail').css({'background-color':'#F6CECE'});
                                                    errorBool=true;
                                                }
                                                 resolve();
                                             }).error(function(data) {
                                                console.log("error in email");
                                           });
                                   
                                 });
                                 return promise;
                              }).then(function() {
                                 var promise = new Promise(function(resolve, reject){
                                    if (errorBool){
                                          $('#errorHeader').show();
                                          $('#errorHeader').html("<span class='glyphicon glyphicon-remove-circle'></span>  \
                                      <b>Registration Failed</b> \
                                      <div class='row'> \
                                          <div class='col-xs-1'></div> \
                                          <div class='col-xs-11' id='errorMsg'> \
                                        </div> \
                                      </div>");
                                          console.log('checkError');
                                          $('#errorMsg').html(errorResult);
                                          $('body').scrollTop(0);
                                      }else{
                                         $http.post('/register',{funcName:'register',
                                              username:$('#inputUsername').val(),
                                              password:escape($('#inputPassword').val()),
                                              repassword:escape($('#repassword').val()),
                                              email:$('#inputEmail').val(),
                                              firstname:escape($('#inputFName').val()),
                                              lastname:escape($('#inputLName').val()),
                                              gender:$("input[name='gender']:checked").val(),
                                              birth:$('#selectYear').val() + "-" + $('#selectMonth').val() + "-" + $('#selectDay').val(),
                                              country:escape($('#selectCountry').val()),
                                              location:escape($('#inputLocation').val()),
                                              about:escape($('#inputAbout').val()),
                                              since:today
                                              }).
                                          success(function (data) {
                                            alert('Your account is successfully created!')
                                              // window.location.href='login.php';
                                              console.log('success register');

                                          }).error(function(data){
                                              console.log("error in register");
                                          });

                                       }
                                 
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
    
        left: "-=" + parseInt($('#imgPrimary').offset().left - 50),
        top: "-=" + parseInt($('#imgPrimary').offset().top - 00), //-30
        width: '130px',
        height: '100px'
      
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
        top: "+=" + parseInt($('#imgPrimary').height()), //-30
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
                      
                                                  left: "-=" + parseInt($('#imgPrimary').offset().left - 50),
                                                  top: "-=" + parseInt($('#imgPrimary').offset().top - 00), //-30
                                                  width: '130px',
                                                  height: '100px'
                                                
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