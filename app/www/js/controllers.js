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

.controller('AddDataCtlr', function($scope, $stateParams, $location, $state)
{
  
  if(localStorage["products"] || localStorage["favorites"])
  {
    localStorage["dbStatus"] = "Bevat data.";
    $scope.dbStatus = localStorage["dbStatus"];
  }else
  {
    localStorage["dbStatus"] = "Bevat geen data.";
    $scope.dbStatus = localStorage["dbStatus"];
  }

  $scope.clearDB = function() {
    console.log("Database has been wiped.")
    localStorage.clear();
    localStorage["dbStatus"] = "Bevat geen data.";
    window.location.reload(true);
  };
  $scope.fillDB = function() {
    console.log("Database has been filled.")
    localStorage.clear();
    var products = [
      { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10},
      { id: 2, title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8}, 
      { id: 3, title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15},
      { id: 4, title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG", aantal: 1, inpakTijd: 16 },
      { id: 5, title: 'Kip Filet', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG", aantal: 1, inpakTijd: 20 },
      { id: 6, title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 2.45, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG", aantal: 1, inpakTijd: 13 },
      { id: 7, title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.JPG", aantal: 1, inpakTijd: 11 }
    ];

    var favorites = [
      { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10},
      { id: 2,title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8}, 
      { id: 3,title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15}
    ];

    var shoppingList = [
      {title: "Gouda Kaas 48+", aantal: 1, checked: false}, 
      {title: "Quaker Havermout", aantal: 2, checked: false}, 
      {title: "Calvé Pindakaas", aantal: 1, checked: true}, 
      {title: "AH Frambozenvla", aantal: 1, checked: false}
    ];

    localStorage["products"] = JSON.stringify(products);
    localStorage["favorites"] = JSON.stringify(favorites);
    localStorage["shoppingList"] = JSON.stringify(shoppingList);

    console.log(JSON.parse(localStorage["products"]));
    localStorage["dbStatus"] = "Bevat data.";
    window.location.reload(true);  
    //$location.path('#/tab/dash');
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

.controller('settings', function($scope, $stateParams, Products) 
{
  console.log("settings controller.")
})

.controller('UserSettings', function($scope)
{
    $scope.settings = {
      // Thuisbezorgen toggle
       enableFriends: false
    };    
})

.controller('ShoppingCart', function($scope, $cordovaBarcodeScanner, $ionicListDelegate, Products)
{
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
    $scope.totalPrice = $scope.totalPrice.toFixed(2).split('.')[0] + ',' + $scope.totalPrice.toFixed(2).split('.')[1]
    
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

  $scope.addProduct = function(data)
  {
      alert(data);
      Products.addQR(data);
  }

  $scope.currentlyScanning = false;

  var pr_string = JSON.stringify({ id: 8, title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG", aantal: 1, inpakTijd: 12 });

  $scope.scanBarcode = function()
  {
    //debug add product
    //Products.addQR(pr_string);

    if(!$scope.currentlyScanning)
    {
        $scope.currentlyScanning = true;

        $cordovaBarcodeScanner.scan().then(function(imageData)
        {
            $scope.currentlyScanning = false;

            setTimeout(function()
            {
                $scope.addProduct(imageData.text);
            }, 1);
            
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error)
        {
            console.log("An error happened -> " + error);
        });
    }
  };
})

.controller('Cards', function($scope, $ionicSlideBoxDelegate) {
    var cardTypes = [
        { image: '../resources/android/icon/drawable-xxxhdpi-icon.png', title: 'Tutorial', content: 'Beste klant, bedankt voor het gebruiken van de FutureShopping app. U kunt de korte tutorial doorlopen door op next te klikken. Als u de tutorial nooit meer wilt zien klik dan op "Nooit meer laten zien"'},
        { image: 'img/goudakaas.JPG', title: 'Stap 1', content: 'Shopping cart is leeg ga producten scannen. Druk op de camera.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 2', content: 'Meer info nodig over een product? Swipe naar links.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 3', content: 'Er kan ook een boodschappenlijst gevuld worden. Druk op product toevoegen etc. etc. etc.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 4', content: 'Er kunnen instellingen gevuld worden voor het afrekenen, Thuisbezorgen etc. etc. etc.'},
    ];
 
  console.log('ahoy');

    $scope.cards = [];
 
    $scope.addCard = function(i) {
        var newCard = cardTypes[i];
        newCard.id = i;
        $scope.cards.push(angular.extend({}, newCard));
    }

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.disableSwipe = function() {
       $ionicSlideBoxDelegate.enableSlide(false);
    };
 
    for(var i = 0; i < 5; i++) $scope.addCard(i);
 
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

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

});
  
// function secondsToTime(secs)
// {
//     secs = Math.round(secs);
//     var hours = Math.floor(secs / (60 * 60));
// ​
//     var divisor_for_minutes = secs % (60 * 60);
//     var minutes = Math.floor(divisor_for_minutes / 60);
// ​
//     var divisor_for_seconds = divisor_for_minutes % 60;
//     var seconds = Math.ceil(divisor_for_seconds);
// ​
//     var obj = {
//         "h": hours,
//         "m": minutes,
//         "s": seconds
//     };
//     return obj;
// }