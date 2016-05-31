angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.tinderCards'])
.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})
.controller('FavoritesCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.favorites = Products.getFavorites();
  $scope.remove = function(fav) {
    Products.removeFavorite(fav);
  };
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.getByID($stateParams.productId);
  console.log("hoi");
  $scope.settings = {
    aanbieding: true,
    proximity: false
  };
})

.controller('ShoppingListCtrl', function($scope, $stateParams, ShoppingList, $ionicPopup, $timeout) {
  $scope.list = ShoppingList.all();
  $scope.remove = function(item) {
    ShoppingList.remove(item);
  };

  $scope.add = function($event)
  {
    var name = document.getElementById("productInput");
    var aantal = document.getElementById("aantalInput");
    if(name.value != "" && aantal.value != "Kies aantal")
    {
      var item = {title: name.value, aantal: aantal.value, checked: false};
      console.log(item);
      ShoppingList.add(item);
    } else {
      $scope.showPopup();
      $event.preventDefault();
    }
  };

  $scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '',
    title: 'Vul a.u.b alle velden in',
    subTitle: 'Controleer goed of je alle velden hebt ingevuld',
    scope: $scope,
    buttons: [
      {
        text: '<b>Ok</b>',
        type: 'button-positive',
        onTap: function(e) {
          myPopup.close();
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
 };

 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };

 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

  
})


.controller('Settings', function($scope)
{
    $scope.settings = {
      // Thuisbezorgen toggle
       enableFriends: false
    };    
    
    // javascrrrrrript hierrrrrr
    console.log('settings controller');
})

.controller('ShoppingCart', function($scope, $cordovaBarcodeScanner, $ionicListDelegate, Products)
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

  $scope.updateTotals = function()
  {
    //KOTS CODE -> BLUUUUGHGHHHHH
    document.getElementById('price').innerHTML =  $scope.totalPrice;
    document.getElementById('time').innerHTML =  $scope.totalTime;
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
    $scope.totalTime = Math.round(totalTime / 60 * 100) / 100;

    //Klopt niet helemaal, maar good enought okdoei
    $scope.totalPrice = $scope.totalPrice.toString().split(".")[0] + "," + ('0' + $scope.totalPrice.toString().split(".")[1]).slice(-2)
    
    $scope.updateTotals();
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

  $scope.removeProduct = function(product)
  {
      Products.remove(product);
      $scope.calculateData();
  }

  $scope.addFavorite = function(product){
      Products.addToFavorites(product);
      $ionicListDelegate.closeOptionButtons();
  }

  $scope.currentlyScanning = false;

  $scope.scanBarcode = function()
  {
    if(!$scope.currentlyScanning)
    {
        $cordovaBarcodeScanner.scan().then(function(imageData)
        {
            $scope.currentlyScanning = false;
            
            alert(imageData.text);
            
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error)
        {
            console.log("An error happened -> " + error);
        });
    }
  };
})

.controller('Cards', function($scope) {
    var cardTypes = [
        { image: 'img/goudakaas.JPG', title: 'So much grass #hippster'},
        { image: 'img/goudakaas.JPG', title: 'Way too much Sand, right?'},
        { image: 'img/goudakaas.JPG', title: 'Beautiful sky from wherever'},
    ];
 
  console.log('ahoy');

    $scope.cards = [];
 
    $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
 
    for(var i = 0; i < 3; i++) $scope.addCard();
 
    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }
 
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }
 
    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
});