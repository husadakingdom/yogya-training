module.exports = {
  attributes: {
    store: {
      model: 'Store'
    },
    item: {
      model: 'Item'
    },
    stock: {
      type: 'number',
      defaultsTo: 0
    }
  },

  customToJSON: function() {
    return _.omit(this, ['createdAt','updatedAt']);
  }
};
