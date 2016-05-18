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
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat ' },
    { title: 'Get himushroomsgh enough to grab the flag' },
    { title: 'Find the Princess' }
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