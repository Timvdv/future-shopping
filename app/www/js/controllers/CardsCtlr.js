angular.module('starter.controllers').controller('Cards', ['$scope', '$http', '$location' , '$ionicSlideBoxDelegate', '$ionicPopup' , 'ShoppingList' ,
	function($scope, $http, $location, $ionicSlideBoxDelegate, $ionicPopup, ShoppingList)
{
	var cardTypes = [
        { image: '../resources/android/icon/drawable-xxxhdpi-icon.png', title: 'Tutorial', content: 'Beste klant, bedankt voor het gebruiken van de FutureShopping app. U kunt de korte tutorial doorlopen door op next te klikken. Als u de tutorial nooit meer wilt zien klik dan op "Nooit meer laten zien"'},
        { image: 'img/goudakaas.JPG', title: 'Stap 1', content: 'Shopping cart is leeg ga producten scannen. Druk op de camera.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 2', content: 'Meer info nodig over een product? Swipe naar links.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 3', content: 'Er kan ook een boodschappenlijst gevuld worden. Druk op product toevoegen etc. etc. etc.'},
        { image: 'img/goudakaas.JPG', title: 'Stap 4', content: 'Er kunnen instellingen gevuld worden voor het afrekenen, Thuisbezorgen etc. etc. etc.'},
    ];

    
 
  console.log('ahoy');

    $scope.settings = [
    {
      showFields: false,
      showAddButton: true
    }];

    $scope.toggleInput = function()
    {
      document.getElementById("productInput").value="";
      document.getElementById("aantalInput").value = 1;
      if ($scope.settings.showFields ? console.log("Input fields are hidden.") : console.log("Input fields are shown."));
      $scope.settings.showFields = !$scope.settings.showFields;
      $scope.settings.showAddButton = !$scope.settings.showAddButton;
    }

    $scope.add = function($event)
    {
      var name = document.getElementById("productInput");
      var aantal = document.getElementById("aantalInput");
      if(name.value != "" && aantal.value != "Kies aantal")
      {
        var item = {title: name.value, aantal: aantal.value, checked: false};
        console.log(item);
        ShoppingList.add(item);
        $scope.toggleInput();
        name.value = "";
        aantal.value = 1;
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
    };

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

  $scope.showPopup = function(choice) {
    $scope.data = {};
    var title;
    var subtitle;
    if(choice == 1)
    {
      title = "Gouda kaas is toevoegd aan uw favorieten!";
      subtitle = "Ga naar 'mijn favorieten' om het product te bekijken";
    }else
    {
      title = "Gouda kaas is verwijderd uit uw winkelmand";
      subtitle = "";
    }
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
        }
      ]
    });
   };
}]);