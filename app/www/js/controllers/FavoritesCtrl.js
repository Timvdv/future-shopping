angular.module('starter.controllers').controller('FavoritesCtrl', ['$scope', '$http', '$location' , 'Products', '$ionicListDelegate', function($scope, $http, $location, Products, $ionicListDelegate)
{
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
}]);
