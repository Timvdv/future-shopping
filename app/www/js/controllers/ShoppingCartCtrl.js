angular.module('starter.controllers').controller('ShoppingCart', ['$scope', '$http', '$location' , 'Products', '$cordovaBarcodeScanner', '$ionicListDelegate', '$ionicPopup',
function($scope, $http, $location, Products, $cordovaBarcodeScanner, $ionicListDelegate, $ionicPopup)
{
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    $scope.products = Products.all();

    $scope.updateTotals = function()
    {
        //KOTS CODE -> BLUUUUGHGHHHHH
        document.getElementById('time').innerHTML =  $scope.totalTime.h + ":" + $scope.totalTime.m + ":" + $scope.totalTime.s;
    }

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
        document.getElementById('price').innerHTML =  $scope.totalPrice;
        //$scope.updateTotals();
    }

    // Berekenen wat de totale prijs is, de eerste keer dat de pagina geladen wordt.
    $scope.calculateData();

    // Voeg het aantal van een product toe.
    $scope.addQuantity = function(item)
    {
        for (var i = 0; i <   $scope.products.length; i++) {
            if(item.title == $scope.products[i].title)
            {
                $scope.products[i].aantal += 1;
            }
        }
        $scope.calculateData();
    }

    $scope.showPopup = function(title, subtitle)
    {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '',
            title: title,
            subTitle: subtitle,
            scope: $scope,
            buttons: [
            {
                text: '<b>Ok</b>',
                type: 'button-positive',
                onTap: function(e) {
                    myPopup.close();
                } 
            }]
        });
    };

    // Verminder het aantal keer dat een product in je winkelmandje zit.
    $scope.decreaseQuantity = function(item)
    {
        for (var i = 0; i <   $scope.products.length; i++) {
            if(item.title == $scope.products[i].title)
            {
                if($scope.products[i].aantal >= 2){
                    $scope.products[i].aantal -= 1;
                }           
            }
        }

        $scope.calculateData();
    }

    $scope.removeProduct = function(product)
    {
        Products.remove(product);
        $scope.calculateData();
        $scope.showPopup(product.title + " is verwijderd uit uw winkelmand.", "");
    }

    $scope.addFavorite = function(product){
        Products.addToFavorites(product);
        $ionicListDelegate.closeOptionButtons();
        $scope.showPopup(product.title + " is aan uw favorieten toegevoegd!", "Ga naar 'mijn favorieten' om het product te bekijken.");
    }

    // Hoi timmie. De json van PRODUCTEN is veranderd. Er zitten nu ratings bij dus hou daar rekening mee als je nieuwe JSON probeert toe te voegen
    // VOORBEELD:
    // { id: 7, title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.jpg", aantal: 1, inpakTijd: 11, 
    //   rating: [1,5,3,4,4,3,3,4,5,5]
    // }

    $scope.currentlyScanning = false;
    var pr_string = JSON.stringify({ id: 8, title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG", aantal: 1, inpakTijd: 12, rating: [1,5,3,4,4,3,3,4,5,5]});

    $scope.product_data = "nothing yet";

    $scope.scanBarcode = function()
    {
        if(!$scope.currentlyScanning)
        {
            $scope.currentlyScanning = true;

            $cordovaBarcodeScanner.scan().then(function(imageData)
            {
                $scope.currentlyScanning = false;                
                $scope.product_data = imageData.text;
                
            }, function(error)
            {
                console.log("An error happened -> " + error);
            });
        }
    };

    /**
     * BIJNA KLAAR .. hij triggert enzo moet alleen nog toevoegen, wss iets geks met de JSON
     */
    $scope.$watch('product_data', function(newVal, oldVal)
    {
        console.log(Products);
        console.log("Product changed.");
        
        if(newVal != "nothing yet")
        {
            console.log("new value:" + newVal);
            Products.add(JSON.parse(newVal));    
        }
    });
}]);
