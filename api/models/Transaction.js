/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    paymentRef: {
      type: 'string',
      allowNull: true,
      unique: true
    },
    status: {
      type: 'string',
      isIn: ['PENDING', 'FAILED', 'SUCCESS'],
      defaultsTo: 'PENDING'
    },
    store: {
      model: 'Store'
    },
    user: {
      model: 'User'
    },
    items: {
      collection: 'Item',
      via: 'transactions'
    }
  }
};

