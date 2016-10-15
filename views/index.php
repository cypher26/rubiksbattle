<html>
  <body>
    <p id='server-time'></p>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/node_modules/angular/angular.js"></script>
    <script>
      var socket = io();
      var el = document.getElementById('server-time');

      socket.on('time', function(timeString) {
        el.innerHTML = 'Server time: ' + timeString;
      });

    </script>
<div ng-app="myApp" ng-controller="myCtrl">

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
Full Name: {{firstName + " " + lastName}}

</div>


    <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.firstName= "John";
        $scope.lastName= "Doe";
    });
    </script>

    updated last
    <?php
      echo "testing";
    ?>
    asdf



  
  </body>
</html>
