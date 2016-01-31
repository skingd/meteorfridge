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

    templateInstance.$('draggable').draggable({
      cursor: 'move',
      helper: 'clone'
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

  });
}
