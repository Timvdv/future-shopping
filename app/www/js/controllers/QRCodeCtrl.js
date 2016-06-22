angular.module('starter.controllers').controller('QRCodeCtrl', ['$scope', '$http', '$location' , 'Products', '$rootScope', function($scope, $http, $location, Products, $rootScope)
{
    console.log("QRCode Controller. GO HAM CASPER!");
    
    $scope.payment = $rootScope.payment;

}]);