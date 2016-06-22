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

.factory('Products', function()
{
  // Some fake testing data
  var products = [], 
      favorites = [];

   if(localStorage["products"])
   {
        products = JSON.parse(localStorage["products"]);
   }

   if(localStorage["favorites"])
   {
        favorites = JSON.parse(localStorage["favorites"]);  
   }

  return {
    all: function() {
      return products;
    },
    add: function(li)
    {
      var result;

      if(products) {
        result = products.filter(function(v) {
            return v.id === li.id;
        })[0];
      }
            
      if(result) {
        products[getIndexOf(products, result.id, "id")].aantal += 1;        
      } else {
        products.push(li); 
      }

      localStorage["products"] = JSON.stringify(products);
    },
    remove: function(product) {
      products.splice(products.indexOf(product), 1);
      localStorage["products"] = JSON.stringify(products);
    },
    get: function(product) {
      for (var i = 0; i < chats.length-1; i++) {
        if(products.indexOf(product))
        {
          return products[products.indexOf(product)];
        }
      }
      return null;
    },
    addRating: function (product, number)
    {
      //console.log(product, number);
      if(products.indexOf(product))
      {
        products[products.indexOf(product)].rating.push(number);
        localStorage["products"] = JSON.stringify(products);
      }else
      {
        products[products.indexOf(product)].rating.push(number);
        localStorage["products"] = JSON.stringify(products);
      }
    },
    addToFavorites: function(product){
      var result;

      if(favorites) {
        result = favorites.filter(function(v) {
            return v.id === product.id;
        })[0];
      }
            
      if(!result) {
        favorites.push(product); 
        localStorage["favorites"] = JSON.stringify(favorites);
        console.log("In de favorieten gestopt.");
      } else{
        console.log("Het zit al in de de favorieten.");
      }  
    },
    getFavorites: function() {
      if(localStorage["favorites"])
      {
        favorites = JSON.parse(localStorage["favorites"]);  
      }
      console.log(favorites);
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
    },
    addQuantity: function(li)
    {
      var result;

      if(products) {
        result = products.filter(function(v) {
            return v.id === li.id;
        })[0];
      }
            
      if(result) {
        products[getIndexOf(products, result.id, "id")].aantal += 1;        
      } else {
        products.push(li); 
      }

      localStorage["products"] = JSON.stringify(products);
    }
  };
})

.factory('ShoppingList', function() {
  // Might use a resource here that returns a JSON array

  var shoppingList = [];
  var tutorialList = [
    {"title": "Gouda Kaas 48+", "aantal": 1, "checked": false}, 
    {"title": "Quaker Havermout", "aantal": 2, "checked": false}, 
    {"title": "Calvé Pindakaas", "aantal": 1, "checked": false}, 
    {"title": "AH Frambozenvla", "aantal": 1, "checked": false}
  ];

  if(localStorage["shoppingList"]){
    shoppingList = JSON.parse(localStorage["shoppingList"]);
  }
  
  return {
    all: function() {
      return shoppingList;
    },
    tutorialAll: function() {
      return tutorialList;
    },
    tutorialRemove: function(li) {
      tutorialList.splice(tutorialList.indexOf(li), 1);
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
        localStorage["shoppingList"] = JSON.stringify(shoppingList);
      }
      else{      
        shoppingList.indexOf(li).aantal += 1;  
        
      }
    },
    checkItem: function(li)
    {
      // If statements voor gekke bug. Als indexOf() 0 terug geeft, werkt de boel niet,
      // maar als ik het zo gewoon 2x typ werkt alles dus.. is gucci.
      if(shoppingList.indexOf(li))
      {
        var i = shoppingList.indexOf(li);
        shoppingList[i].checked = !shoppingList[i].checked; 
        localStorage["shoppingList"] = JSON.stringify(shoppingList);
        console.log(shoppingList[i]);
      }else
      {
        var i = shoppingList.indexOf(li);
        shoppingList[i].checked = !shoppingList[i].checked;
        localStorage["shoppingList"] = JSON.stringify(shoppingList);
        console.log(shoppingList[i]);
      }      
    },
    checkTutorialItem: function(li)
    {

      var i = tutorialList.indexOf(li);
      tutorialList[i].checked = !tutorialList[i].checked; 
      console.log(tutorialList[i]);
    },
    clearList: function()
    {
      shoppingList = [];
      localStorage["shoppingList"] = JSON.stringify(shoppingList);
    }
  };
})


.factory('AllProducts', function()
{
  var allProducts = [];
  if(localStorage["AllProducts"])
  {
    allProducts = JSON.parse(localStorage["AllProducts"]);
  }

  return {
    all: function(){
      return AllProducts;
    },
    getByID: function(productId) {
      console.log("In AllProducts: getByID");
      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id == parseInt(productId)) {
          return allProducts[i];
        }
      }
    },
    addRating: function (product, number)
    {
      console.log(product, number);
      allProducts[allProducts.indexOf(product)].rating.push(number);
      localStorage["AllProducts"] = JSON.stringify(allProducts);
    }
  }
});

function getIndexOf(arr, val, prop) {
      var l = arr.length,
        k = 0;
      for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
          return k;
        }
      }
      return false;
    }