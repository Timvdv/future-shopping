angular.module('starter.controllers').controller('UserSettings', ['$scope', '$http', '$location' , function($scope, $http, $location)
{
	$scope.settings = {
      // Thuisbezorgen toggle
       enableFriends: false
    }; 
}]);