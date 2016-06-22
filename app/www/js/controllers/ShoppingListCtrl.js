angular.module('starter.controllers').controller('ShoppingListCtrl', ['$scope', '$http', '$location' , '$stateParams', 'ShoppingList', '$ionicPopup', '$timeout', '$ionicListDelegate', 
	function($scope, $http, $location, $stateParams, ShoppingList, $ionicPopup, $timeout, $ionicListDelegate)
{
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

	$scope.emptyList = function() {
		$scope.data = {};

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
		  template: '',
		  title: 'Weet je zeker dat je de boodschappenlijst wilt legen?',
		  scope: $scope,
		  buttons: [
		    {
		      text: '<b>Annuleer</b>',
		      type: 'button-assertive',
		      onTap: function(e) {
		        myPopup.close();
		      } 
		    },
		    {
		      text: '<b>Ok</b>',
		      type: 'button-balanced',
		      onTap: function(e)
		      {
			myPopup.close();
			ShoppingList.clearList();
			$scope.list = [];
			location.reload();
		      } 
		    }
		  ]
		});
	};
}]);