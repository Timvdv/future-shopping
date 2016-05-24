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
  var products = [
    { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10},
    { id: 2, title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8}, 
    { id: 3, title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15},
    { id: 4, title: 'Coca Cola', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/cocacola.JPG", aantal: 1, inpakTijd: 16 },
    { id: 5, title: 'Kip Filet', prijsFrontEnd: "3,50", prijs: 4.50, inhoud: "1 kilo", thumbnail:"img/kipfilet.JPG", aantal: 1, inpakTijd: 20 },
    { id: 6, title: 'La Chouffe', prijsFrontEnd: "2,45", prijs: 4.50, inhoud: "2 liter", thumbnail:"img/lachouffe.JPG", aantal: 1, inpakTijd: 13 },
    { id: 7, title: 'Big Americans pizza', prijsFrontEnd: "2.95", prijs: 2.95, inhoud: "435 g", thumbnail:"img/pizza.JPG", aantal: 1, inpakTijd: 11 },
    { id: 8, title: 'AH Frambozenvla', prijsFrontEnd: "1,05", prijs: 1.05, inhoud: "1 liter", thumbnail:"img/frambozenvla.JPG", aantal: 1, inpakTijd: 12 }
  ];

  var favorites = [
    { id: 1, title: 'Gouda Kaas 48+', prijsFrontEnd: "4,50", prijs: 4.50, inhoud: "2kg", thumbnail:"img/goudakaas.JPG", aantal: 1, inpakTijd: 10},
    { id: 2,title: 'Calvé Pindakaas', prijsFrontEnd: "2,30", prijs: 2.30, inhoud: "350 g", thumbnail:"img/pindakaas.JPG", aantal: 1 , inpakTijd: 8}, 
    { id: 3,title: 'Quaker Havermout', prijsFrontEnd: "3,50", prijs: 3.50, inhoud: "550 g", thumbnail:"img/havermout.JPG", aantal: 1, inpakTijd: 15}
  ];

  return {
    all: function() {
      return products;
    },
    remove: function(product) {
      products.splice(products.indexOf(product), 1);
    },
    get: function(product) {
      for (var i = 0; i < chats.length; i++) {
        if(products.indexOf(product))
        {
          return products[products.indexOf(product)];
        }
      }
      return null;
    },
    addToFavorites: function(product){
      if(favorites.indexOf(product)) {
        favorites.push(product); 
      }      
    },
    getFavorites: function() {
      return favorites;
    },
    removeFavorite: function(product) {
      favorites.splice(favorites.indexOf(product), 1);
      console.log("verwijder.");
    },
    getByID: function(productId) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === parseInt(productId)) {
          return favorites[i];
        }
      }
    }
  };
})

.factory('ShoppingList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shoppingList = [
    {title: "Gouda Kaas 48+", aantal: 1}, 
    {title: "Quaker Havermout", aantal: 2}, 
    { title: "Calvé Pindakaas", aantal: 1}, 
    { title: "AH Frambozenvla", aantal: 1}
  ];

  return {
    all: function() {
      return shoppingList;
    },
    remove: function(li) {
      shoppingList.splice(shoppingList.indexOf(li), 1);
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
      if(shoppingList.indexOf(product)) {
        shoppingList.push(li); 
      } 
    }
  };
});