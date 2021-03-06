/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    brand: {
      type: 'string'
    },
    category: {
      model: 'Category',
      required: true
    },
    price: {
      type: 'number',
      defaultsTo: 0
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    imageUrl: {
      type: 'string',
      required: true
    },
    transactions: {
      collection: 'Transaction',
      via: 'items'
    },
    stores: {
      collection: 'Store',
      via: 'item',
      through: 'StoreItem'
    }
  }
};
