/**
 * Category.js
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
    items: {
      collection: 'Item',
      via: 'category'
    }
  },

  customToJSON: function() {
    return _.omit(this, ['createdAt','updatedAt']);
  }
};

