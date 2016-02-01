Products = new Mongo.Collection('products');

if (Meteor.isClient) {

  Template.fridge.helpers({
      products: function(){
        return Products.find({
          place: 'fridge'
        });
      }
  });

  Template.productList.helpers({
    products: function(){
      return Products.find({
        place: 'supermarket'
      });
    }
  });

  Template.fridge.onRendered(function(){
    var templateInstance = this;

    templateInstance.$('#fridge').droppable({
      drop: function(evt, ui){

        //create query
        var query = { _id: ui.draggable.data('id')};

        //assign data to query
        var changes = { $set: {place: 'fridge'}};

        //execute query
        Products.update(query, changes);
      }
    });
  });

  Template.productListItem.onRendered(function(){
    var templateInstance = this;

    templateInstance.$('.draggable').draggable({
      cursor: 'move',
      helper: 'clone'
    });
  });

  Template.productList.onRendered(function(){
    var templateInstance = this;

    templateInstance.$('#supermarket').droppable({
      drop: function(evt,ui){
        var query = { _id: ui.draggable.data('id')};
        var changes = {$set: {place: 'supermarket' }};
        Products.update(query, changes);
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //Remove products from database
    Products.remove({});

    //Fill the database with products
    Products.insert({
      name: 'Milk',
      img: '/milk.png',
      place: 'fridge'
    });

    Products.insert({
      name: 'Bread',
      img: '/bread.png',
      place: 'supermarket'
    });


    Products.insert({
      name: 'Banana',
      img: '/banana.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Juice',
      img: '/juice.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Apple',
      img: '/apple.png',
      place: 'supermarket'
    });

  });
}
