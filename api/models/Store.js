/**
 * Store.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    address: {
      type: 'string'
    },

    transactions: {
      collection: 'Transaction',
      via: 'store'
    },

    items: {
      collection: 'Item',
      via: 'store',
      through: 'StoreItem'
    }
  },

  customToJSON: function() {
    return _.omit(this, ['createdAt','updatedAt']);
  }
};

