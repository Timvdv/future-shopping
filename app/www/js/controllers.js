angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Settings', function($scope)
{
    $scope.settings = {
       enableFriends: true
    };    
    
    // javascrrrrrript hierrrrrr
    console.log('settings controller');
})

.controller('ShoppingCart', function($scope, $cordovaBarcodeScanner)
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
  $scope.products = [
    { title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG"},
    { title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG"},
    { title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG"},
    { title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG" },
    { title: 'Kip Cilet', prijsFrontEnd: "3,50", prijs: 4.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG" },
    { title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG" },
    { title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.JPG" },
    { title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG" },

    // Dit hieronder is even copy pasta werk, kan later weer weg.
    { title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG" },
    { title: 'Kip Cilet', prijsFrontEnd: "3,50", prijs: 4.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG" },
    { title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG" },
    { title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.JPG" },
    { title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG" },
    { title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG" },
    { title: 'Kip Cilet', prijsFrontEnd: "3,50", prijs: 4.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG" },
    { title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG" },
    { title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.JPG" },
    { title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG" }
  ];
  
  console.log("kaas");

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