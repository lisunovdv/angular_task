'use strict';

var app = angular.module('app',[]);

function ColorService ($scope, $http) {
  $http.get('colors.json')
     .then(function(res){
        $scope.items = res.data;                
      });
  console.log('Service is done!');
}

function MainCtrl ($scope, $http) {
  var cs = ColorService ($scope, $http);
}

app.controller('MainCtrl', MainCtrl);