angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  console.log("Favorite Controller.");
  $scope.favorites = Products.getFavorites();
  console.log($scope.favorites);
  $scope.remove = function(fav) {
    Products.removeFavorite(fav);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Products) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Settings', function($scope)
{
    $scope.settings = {
      // You have no friends.
       enableFriends: true
    };    
    
    // javascrrrrrript hierrrrrr
    console.log('settings controller');
})

.controller('ShoppingCart', function($scope, $cordovaBarcodeScanner, Products)
{
  /**
   * Hier moet de JSON van de producten in,
   * deze moet vervolgens verwerkt worden in de HTML
   * SVEN ? Vind ik wel een leuk klusje voor jou. BEstand staat
   * al gekoppeld.
   *
   * Als je heel veel zin hebt om te TRYHARDEN kijk eens hoe je die producten
   * kan verwerken in een facory (net zoals bij chats gedaan is) dit is namelijk wel een
   * mooie usecase voor een factory (services.js en tab-chats + check de routes file)
   */


  // Heb de prijs even 2 keer toegevoegd, omdat integers bij de front end worden afgerond en hoef op
  // deze manier later geen eventuele regexes toe te passen. :)

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.products = Products.all();
  $scope.removeProduct = function(product)
  {
    Products.remove(product);
  }
  $scope.addFavorite = function(product){
    Products.addToFavorites(product);
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

    $scope.totalPrice = totalPrice;
    $scope.totalTime = totalTime / 60;
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

  // Verminder het aantal keer dat een product in je winkelmandje zit.
  $scope.decreaseQuantity = function(item)
  {
    // Er wordt 
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

  // Verwijder product uit de winkelmand.
  // $scope.removeProduct = function (item)
  // {
  //     for (var i = 0; i <   $scope.products.length; i++) {
  //         if(item.title == $scope.products[i].title)
  //         {
  //           $scope.products.splice(i,1);
  //           $scope.$apply;          
  //         }
  //     }
  //     $scope.calculateData();
  // }
  
  $scope.scanBarcode = function()
  {
    console.log('clicked');
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          alert(imageData.text);
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
          console.log("An error happened -> " + error);
      });
  };
})