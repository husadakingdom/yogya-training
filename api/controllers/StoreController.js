/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const errMsg = sails.config.custom.errorMessage.store;

module.exports = {
  create: async(req, res) => {
    try {
      const params = req.allParams();

      const store = await Store.create(params).fetch();

      return res.apiSuccess({ store });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  index: async(req, res) => {
    try {
      const params = req.allParams();

      const limit = parseInt(params.perPage, 10) || 15;
      const offset = parseInt(params.start, 10) || 0;
      const orderBy = params.sortBy || 'name';
      const order = params.sort || 'ASC';
      const sort = { [orderBy]: order.toUpperCase() };
      const search = params.q || '';

      const stores = await Store.find()
        .where({
          name: {
            like: `%${search}%`
          }
        })
        .skip(offset)
        .limit(limit)
        .sort([sort]);

      return res.apiSuccess({ stores });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  view: async(req, res) => {
    try {
      const store = await Store.findOne(req.params.id).populate('items');

      if (!store) {
        return res.apiError(400, errMsg.notFound);
      }

      return res.apiSuccess({ store });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  update: async(req, res) => {
    try {
      const stores = await Store.update({ id: req.params.id }, {
        name: req.param('name' ),
        address: req.param('address')
      }).fetch();

      const store = stores[0];

      return res.apiSuccess({ store });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  delete: async(req, res) => {
    try {
      const store = await Store.findOne(req.params.id);
      if (!store) {
        return res.apiError(400, errMsg.notFound);
      }

      await Store.destroy(req.params.id);

      return res.apiSuccess({ message: 'Store deleted' });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  addItems: async(req, res) => {
    try {
      const store = await Store.findOne(req.params.id);

      if (!store) {
        return res.apiError(400, errMsg.notFound);
      }

      let items = req.param('items');
      if (!_.isArray(items)) {
        items = [items];
      }

      await Store.addToCollection(store.id, 'items').members(req.param('items'));

      const populatedStore = await Store.findOne(store.id).populate('items');

      return res.apiSuccess({ store: populatedStore });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  removeItems: async(req, res) => {
    try {
      const store = await Store.findOne(req.params.id);

      if (!store) {
        return res.apiError(400, errMsg.notFound);
      }

      let items = req.param('items');
      if (!_.isArray(items)) {
        items = [items];
      }

      await Store.removeFromCollection(store.id, 'items').members(req.param('items'));

      const populatedStore = await Store.findOne(store.id).populate('items');

      return res.apiSuccess({ store: populatedStore });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  replaceItems: async(req, res) => {
    try {
      const store = await Store.findOne(req.params.id);

      if (!store) {
        return res.apiError(400, errMsg.notFound);
      }

      let items = req.param('items');
      if (!_.isArray(items)) {
        items = [items];
      }

      await Store.replaceCollection(store.id, 'items').members(req.param('items'));

      const populatedStore = await Store.findOne(store.id).populate('items');

      return res.apiSuccess({ store: populatedStore });
    } catch (err) {
      return res.apiError(500, err);
    }
  }
};

