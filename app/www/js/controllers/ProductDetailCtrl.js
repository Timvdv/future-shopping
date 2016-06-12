angular.module('starter.controllers').controller('ProductDetailCtrl', ['$scope', '$http', '$location' , 'Products', '$ionicPopup','$stateParams', 
  function($scope, $http, $location, Products, $ionicPopup, $stateParams)
{
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
}]);