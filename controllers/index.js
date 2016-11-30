/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('webApp', [
  'ngRoute','ui.bootstrap','ngProgress'
]).run(function ($rootScope, ngProgressFactory) { 

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
    .when("/profile/messages", {templateUrl: "partials/messages.html", controller: "homeCtrl"})
    .when("/profile/create", {templateUrl: "partials/create.html", controller: "homeCtrl"})
    .when("/profile/edit", {templateUrl: "partials/edit.html", controller: "homeCtrl"})
            


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

app.controller('header_controller',function ($scope,$location,$http,$window){
      $scope.logout = function(){

         
      $http.post('/logout',{testVariable:$scope.inputName}).
        success(function(data) {
           
             $window.location.href = '/';

        }).error(function(data) {
            console.log("error in posting");
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

  $scope.getNumber = function(num) {
      return new Array(num);   
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