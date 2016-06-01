angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [], 
         favorites = []

   if(localStorage["products"])
   {
        products = JSON.parse(localStorage["products"]);
   }

   if(localStorage["favorites"])
   {
        products = JSON.parse(localStorage["favorites"]);  
   }

  return {
    all: function() {
      return products;
    },
    add: function(li) {
      console.log(li);

      if(products.indexOf(li))
      {
        products.push(li); 
        localStorage["products"] = JSON.stringify(products);
      }
      else {
        products[products.indexOf(li)].aantal += 1;
      }
    },
    remove: function(product) {
      products.splice(products.indexOf(product), 1);
      localStorage["products"] = JSON.stringify(products);
    },
    get: function(product) {
      for (var i = 0; i < chats.length-1; i++) {
        if(products.indexOf(product))
        {
          console.log(products[products.indexOf(product)]);
          return products[products.indexOf(product)];
        }
      }
      return null;
    },
    addToFavorites: function(product){
      if(favorites.indexOf(product)) {
        favorites.push(product); 
        localStorage["favorites"] = JSON.stringify(favorites);
      }      
    },
    getFavorites: function() {
      return favorites;
    },
    removeFavorite: function(product) {
      favorites.splice(favorites.indexOf(product), 1);
      localStorage["favorites"] = JSON.stringify(favorites);
      console.log("verwijder.");
    },
    getByID: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id == parseInt(productId)) {
          return products[i];
        }
      }
    }
  };
})

.factory('ShoppingList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shoppingList = JSON.parse(localStorage["shoppingList"]);
  
  return {
    all: function() {
      return shoppingList;
    },
    remove: function(li) {
      shoppingList.splice(shoppingList.indexOf(li), 1);
      localStorage["shoppingList"] = JSON.stringify(shoppingList);
    },
    get: function(li) {
      for (var i = 0; i < shoppingList.length; i++) {
        if(shoppingList.indexOf(li))
        {
          return shoppingList[shoppingList.indexOf(li)];
        }
      }
      return null;
    },
    add: function(li) {
      if(shoppingList.indexOf(li))  {
        shoppingList.push(li); 
        localStorage["shoppingList"] = JSON.stringify(favorites);
      }
      else{
        shoppingList[shoppingList.indexOf(li)].aantal += 1;
      }
    }
  };
});