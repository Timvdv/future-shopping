angular.module('starter.controllers').controller('ProductDetailCtrl', ['$scope', '$http', '$location' , 'AllProducts', '$ionicPopup','$stateParams', 
  function($scope, $http, $location, AllProducts, $ionicPopup, $stateParams)
{
  $scope.product = AllProducts.getByID($stateParams.productId);
  $scope.settings = {
    aanbieding: true,
    proximity: false
  };

  console.log($scope.product);
  $scope.addRating = function(rating) {
    // add rating functie maken in factory.
    AllProducts.addRating($scope.product, rating);
    $scope.averageRating();
    $scope.showPopup();
    $scope.arrangeStars();
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

    return average;

  } 


  $scope.arrangeStars = function()
  {
    // KOTS CODE!!!!!!!
    var star1 = document.getElementById("1star");
    var star2 = document.getElementById("2star");
    var star3 = document.getElementById("3star");
    var star4 = document.getElementById("4star");
    var star5 = document.getElementById("5star");

    // voor star1
    if($scope.averageRating() > 0 && $scope.averageRating() <= 0.5)
    {
      star1.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 0.51){
      star1.className = "ion-ios-star";
    } else
    {
      star1.className = "ion-ios-star-outline";
    }

        // voor star1
    if($scope.averageRating() > 0 && $scope.averageRating() <= 0.5)
    {
      star1.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 0.51){
      star1.className = "ion-ios-star";
    } else
    {
      star1.className = "ion-ios-star-outline";
    }

    // voor star2
    if($scope.averageRating() > 1 && $scope.averageRating() <= 1.5)
    {
      star2.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 1.51){
      star2.className = "ion-ios-star";
    } else
    {
      star2.className = "ion-ios-star-outline";
    }

    // voor star3
    if($scope.averageRating() > 2 && $scope.averageRating() <= 2.5)
    {
      star3.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 2.51){
      star3.className = "ion-ios-star";
    } else
    {
      star3.className = "ion-ios-star-outline";
    }

    // voor star4
    if($scope.averageRating() > 3 && $scope.averageRating() <= 3.5)
    {
      star4.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 3.51){
      star4.className = "ion-ios-star";
    } else
    {
      star4.className = "ion-ios-star-outline";
    }

    // voor star5
    if($scope.averageRating() > 4 && $scope.averageRating() <= 4.5)
    {
      star5.className = "ion-ios-star-half";
    } else if ($scope.averageRating() > 4.51){
      star5.className = "ion-ios-star";
    } else
    {
      star5.className = "ion-ios-star-outline";
    }
  }


  $scope.averageRating();
  $scope.arrangeStars();




  $scope.showPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      title: 'Bedankt voor uw beoordeling!',
      subTitle: 'Uw mede klanten zullen uw mening zeer op prijs stellen.',
      scope: $scope,
      cssClass: 'animated fadeOut animated',
      onTap: function(e) {
            myPopup.close();
          } 
    });
  };



}]);


