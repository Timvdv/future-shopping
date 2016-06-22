angular.module('starter.controllers').controller('CheckoutCtrl', ['$scope', '$http', '$location' , 'Products', '$rootScope', function($scope, $http, $location, Products, $rootScope)
{
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
        $scope.totalTime = secondsToTime(totalTime);
        
        $scope.totalPrice = $scope.totalPrice.toFixed(2).split('.')[0] + ',' + $scope.totalPrice.toFixed(2).split('.')[1]
    }

    // Berekenen wat de totale prijs en tijd is, de eerste keer dat de pagina geladen wordt.
    $scope.calculateData();

    $scope.bankieren = {
        "Banken" : [
            {
                BankNaam: 'ING',
                Img: '../img/ing.png'
            },
            {
                BankNaam: 'RABO',
                Img: '../img/rabo.png'
            },
            {
                BankNaam: 'ABO-AMRO',
                Img: '../img/abn.png'
            },
            {
                BankNaam: 'Bunq',
                Img: '../img/bunq.png'
            }
        ]

    };
    $scope.pinnen = {
        QRCode: '../img/QR-code.jpg'
    };
    $scope.automatisch = {
        Betaald: 'Er is een automatisch incasso gedaan, Bedankt voor het shoppen!'
    };

    $scope.pay = function(payment)
    {
        $rootScope.payment = payment;
        console.log(payment);
    }

}]);