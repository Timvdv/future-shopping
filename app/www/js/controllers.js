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

.controller('ProductDetailCtrl', function($scope, $stateParams, Products, $ionicPopup) {
  $scope.product = Products.getByID($stateParams.productId);
  $scope.settings = {
    aanbieding: true,
    proximity: false
  };

  $scope.addRating = function(rating) {
    // add rating functie maken in factory.
    Products.addRating($scope.product, rating);
    $scope.averageRating();
    $scope.showPopup();
  }

  $scope.averageRating = function()
  {
    var total = 0;
    var average = 0;
    for (var i = 0; i < $scope.product.rating.length -1; i++) {
      total += $scope.product.rating[i];
    };
    average = total / $scope.product.rating.length;
    $scope.rating = average;
    $scope.ratingCount = $scope.product.rating.length;
    return Math.round(average);
  } 
  $scope.averageRating();


  $scope.showPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      title: 'Bedankt voor uw beoordeling!',
      subTitle: 'Uw mede klanten zullen uw mening zeer op prijs stellen.',
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
      { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10, 
        rating: [2,3,4,2,4,2,1,2,2,3,4,]
      },
      { id: 2, title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8, 
        rating: [1,5,3,4,4,3,2,5,4,3,2,2,5]
      }, 
      { id: 3, title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15, 
        rating: [1,5,4,4,4,4,4,3,2,4,3,3,4,5,5]
      },
      { id: 4, title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG", aantal: 1, inpakTijd: 16, 
        rating: [1,3,4,4,5,3,2,1,2,4,4,3,3,4,5,5]
      },
      { id: 5, title: 'Kip Filet', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG", aantal: 1, inpakTijd: 20, 
        rating: [1,5,3,4,4,3,5,5,4,3,3,3,4,5,5]
      },
      { id: 6, title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 2.45, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG", aantal: 1, inpakTijd: 13, 
        rating: [1,1,2,5,4,4,3,4,4,3,3,4,5,5]
      },
      { id: 7, title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.jpg", aantal: 1, inpakTijd: 11, 
        rating: [1,5,3,4,4,3,3,4,5,5]
      }
    ];

    var favorites = [
      { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10, rating: 3},
      { id: 2,title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8, rating: 4}, 
      { id: 3,title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15, rating: 5}
    ];

    var shoppingList = [
      {title: "Gouda Kaas 48+", aantal: 1, checked: false}, 
      {title: "Quaker Havermout", aantal: 2, checked: false}, 
      {title: "Calvé Pindakaas", aantal: 1, checked: false}, 
      {title: "AH Frambozenvla", aantal: 1, checked: false}
    ];

    localStorage["products"] = JSON.stringify(products);
    localStorage["favorites"] = JSON.stringify(favorites);
    localStorage["shoppingList"] = JSON.stringify(shoppingList);

    console.log(JSON.parse(localStorage["products"]));
    localStorage["dbStatus"] = "Bevat data.";
    window.location.reload(true);  
   
  };
})

.controller('ShoppingListCtrl', function($scope, $stateParams, ShoppingList, $ionicPopup, $timeout, $ionicListDelegate) {
  $scope.list = ShoppingList.all();
  $scope.remove = function(item) {
    ShoppingList.remove(item);
  };

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.settings = [
  {
    showFields: false,
    showAddButton: true
  }];

  $scope.toggleCheckMark = function(el, item)
  {
    ShoppingList.checkItem(item);
    $ionicListDelegate.closeOptionButtons();
  }

  $scope.test = function()
  {
    console.log("test");
  }
  
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

.controller('ShoppingCart', function($scope, $cordovaBarcodeScanner, $ionicListDelegate, Products, $ionicPopup)
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

  $scope.showPopup = function(title, subtitle) {
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
        }
      ]
    });
   };

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
      $scope.showPopup(product.title + " is verwijderd uit uw winkelmand.", "");
  }

  $scope.addFavorite = function(product){
      Products.addToFavorites(product);
      $ionicListDelegate.closeOptionButtons();
      $scope.showPopup(product.title + " is aan uw favorieten toegevoegd!", "Ga naar 'mijn favorieten' om het product te bekijken.");
  }

  $scope.addProduct = function(data)
  {
      alert(data);
      Products.addQR(data);
  }

  $scope.currentlyScanning = false;

  var pr_string = JSON.stringify({ id: 8, title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG", aantal: 1, inpakTijd: 12 });


  // Hoi timmie. De json van PRODUCTEN is veranderd. Er zitten nu ratings bij dus hou daar rekening mee als je nieuwe JSON probeert toe te voegen
  // VOORBEELD:
  // { id: 7, title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.jpg", aantal: 1, inpakTijd: 11, 
  //   rating: [1,5,3,4,4,3,3,4,5,5]
  // }
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

.controller('Cards', function($scope, $ionicSlideBoxDelegate, $ionicPopup) {
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

});

function secondsToTime(secs)
{
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if(hours < 10)
      hours = "0" + hours
    if(minutes < 10)
      minutes = "0" + minutes
    if(seconds < 10)
      seconds = "0" + seconds      

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
