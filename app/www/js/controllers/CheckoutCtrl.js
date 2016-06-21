angular.module('starter.controllers').controller('CheckoutCtrl', ['$scope', '$http', '$location' , 'Products', function($scope, $http, $location, Products)
{
	console.log("Checkout Controller. GO HAM CASPER!");

	// var totalprice = 0;
	$scope.products = Products.all();
	$scope.totalPrice = 0;

	// Bereken de nieuwe totale prijs & de inpaktijd.
    $scope.calculateData = function() 
    {
        var totalPrice = 0;
        var totalTime = 0
        for (var i = 0; i < $scope.products.length; i++) {
            totalPrice += ($scope.products[i].aantal * $scope.products[i].prijs);
            totalTime += ($scope.products[i].aantal * $scope.products[i].inpakTijd);
        }

        $scope.totalPrice = Math.round(totalPrice * 100) / 100;
        //$scope.totalTime = secondsToTime(totalTime);

        $scope.totalPrice = $scope.totalPrice.toFixed(2).split('.')[0] + ',' + $scope.totalPrice.toFixed(2).split('.')[1]
        //document.getElementById('price').innerHTML =  $scope.totalPrice;
        //$scope.updateTotals();
    }

    // Berekenen wat de totale prijs is, de eerste keer dat de pagina geladen wordt.
    $scope.calculateData();

}]);