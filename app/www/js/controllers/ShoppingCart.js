angular.module('shopping', ['ionic'])

.controller('ShoppingCart', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat ' },
    { title: 'Get himushroomsgh enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
});