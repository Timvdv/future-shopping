angular.module('starter.controllers').controller('AddDataCtlr', ['$scope', '$http', '$location' , '$stateParams', '$state',function($scope, $http, $location, Products, $stateParams, $state)
{

	$stateParams, $location, $state
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
	var products = [{
	   "id": 1,
	   "title": "Gouda Kaas 48+",
	   "prijsFrontEnd": "4,50",
	   "prijs": 4.50,
	   "inhoud": "2kg",
	   "thumbnail": "img/goudakaas.JPG",
	   "aantal": 1,
	   "inpakTijd": 10,
	   "rating": [2, 1, 2, 2, 3, 4]
	  }, {
	   "id": 2,
	   "title": "Calvé Pindakaas",
	   "prijsFrontEnd": "2,30",
	   "prijs": 2.30,
	   "inhoud": "350 g",
	   "thumbnail": "img/pindakaas.JPG",
	   "aantal": 1,
	   "inpakTijd": 8,
	   "rating": [1, 5, 4, 2, 5]
	  }, {
	   "id": 3,
	   "title": "Quaker Havermout",
	   "prijsFrontEnd": "3,50",
	   "prijs": 3.50,
	   "inhoud": "550 g",
	   "thumbnail": "img/havermout.JPG",
	   "aantal": 1,
	   "inpakTijd": 15,
	   "rating": [1, 5, 4, 4, 4, 4, 5, 5]
	  }, {
	   "id": 4,
	   "title": "Coca Cola",
	   "prijsFrontEnd": "4,50",
	   "prijs": 4.50,
	   "inhoud": "2 liter",
	   "thumbnail": "img/cocacola.JPG",
	   "aantal": 1,
	   "inpakTijd": 16,
	   "rating": [1, 3, 3, 3, 4, 5, 5]
	  }, {
	   "id": 5,
	   "title": "Kip Filet",
	   "prijsFrontEnd": "3,50",
	   "prijs": 3.50,
	   "inhoud": "1 kilo",
	   "thumbnail": "img/kipfilet.JPG",
	   "aantal": 1,
	   "inpakTijd": 20,
	   "rating": [1, 5, 3, 4, 5, 5]
	  }, {
	   "id": 6,
	   "title": "La Chouffe",
	   "prijsFrontEnd": "2,45",
	   "prijs": 2.45,
	   "inhoud": "2 liter",
	   "thumbnail": "img/lachouffe.JPG",
	   "aantal": 1,
	   "inpakTijd": 13,
	   "rating": [1, 1, 2, 4, 3, 4, 5, 5]
	  }, {
	   "id": 7,
	   "title": "Big Americans pizza",
	   "prijsFrontEnd": "2.95",
	   "prijs": 2.95,
	   "inhoud": "435 g",
	   "thumbnail": "img/pizza.JPG",
	   "aantal": 1,
	   "inpakTijd": 11,
	   "rating": [1, 5, 3, 5, 5]
	}];

	var allProducts = [{
	   "id": 1,
	   "title": "Gouda Kaas 48+",
	   "prijsFrontEnd": "4,50",
	   "prijs": 4.50,
	   "inhoud": "2kg",
	   "thumbnail": "img/goudakaas.JPG",
	   "aantal": 1,
	   "inpakTijd": 10,
	   "rating": [2, 1, 2, 2, 3, 4]
	  }, {
	   "id": 2,
	   "title": "Calvé Pindakaas",
	   "prijsFrontEnd": "2,30",
	   "prijs": 2.30,
	   "inhoud": "350 g",
	   "thumbnail": "img/pindakaas.JPG",
	   "aantal": 1,
	   "inpakTijd": 8,
	   "rating": [1, 5, 4, 2, 5]
	  }, {
	   "id": 3,
	   "title": "Quaker Havermout",
	   "prijsFrontEnd": "3,50",
	   "prijs": 3.50,
	   "inhoud": "550 g",
	   "thumbnail": "img/havermout.JPG",
	   "aantal": 1,
	   "inpakTijd": 15,
	   "rating": [1, 5, 4, 4, 4, 4, 5, 5]
	  }, {
	   "id": 4,
	   "title": "Coca Cola",
	   "prijsFrontEnd": "4,50",
	   "prijs": 4.50,
	   "inhoud": "2 liter",
	   "thumbnail": "img/cocacola.JPG",
	   "aantal": 1,
	   "inpakTijd": 16,
	   "rating": [1, 3, 3, 3, 4, 5, 5]
	  }, {
	   "id": 5,
	   "title": "Kip Filet",
	   "prijsFrontEnd": "3,50",
	   "prijs": 3.50,
	   "inhoud": "1 kilo",
	   "thumbnail": "img/kipfilet.JPG",
	   "aantal": 1,
	   "inpakTijd": 20,
	   "rating": [1, 5, 3, 4, 5, 5]
	  }, {
	   "id": 6,
	   "title": "La Chouffe",
	   "prijsFrontEnd": "2,45",
	   "prijs": 2.45,
	   "inhoud": "2 liter",
	   "thumbnail": "img/lachouffe.JPG",
	   "aantal": 1,
	   "inpakTijd": 13,
	   "rating": [1, 1, 2, 4, 3, 4, 5, 5]
	  }, {
	   "id": 7,
	   "title": "Big Americans pizza",
	   "prijsFrontEnd": "2.95",
	   "prijs": 2.95,
	   "inhoud": "435 g",
	   "thumbnail": "img/pizza.JPG",
	   "aantal": 1,
	   "inpakTijd": 11,
	   "rating": [1, 5, 3, 5, 5]
	}];

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
	localStorage["AllProducts"] = JSON.stringify(allProducts);

	console.log(JSON.parse(localStorage["products"]));
	localStorage["dbStatus"] = "Bevat data.";
	window.location.reload(true);  

	};
}]);