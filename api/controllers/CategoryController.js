/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: async(req, res) => {
    try {
      const params = req.allParams();

      const category = await Category.create(params).fetch();

      return res.apiSuccess({ category });
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

      const categories = await Category.find()
        .where({
          name: {
            like: `%${search}%`
          }
        })
        .skip(offset)
        .limit(limit)
        .sort([sort])
        .populate('items');

      return res.apiSuccess({ categories });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  view: async(req, res) => {
    try {
      const category = await Category.findOne(req.params.id).populate('items');

      if (!category) {
        return res.apiError(400, sails.config.custom.errorMessage.category.notFound);
      }

      return res.apiSuccess({ category });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  update: async(req, res) => {
    try {
      const categories = await Category.update({ id: req.params.id }, { name: req.param('name') }).fetch();

      const category = categories[0];

      return res.apiSuccess({ category });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  delete: async(req, res) => {
    try {
      const category = await Category.findOne(req.params.id);
      if (!category) {
        return res.apiError(400, sails.config.custom.errorMessage.category.notFound);
      }

      const items = await Item.find({ category: req.params.id });
      if (items.length > 0) {
        return res.apiError(400, sails.config.custom.errorMessage.category.itemExist);
      }

      await Category.destroy(req.params.id);

      return res.apiSuccess({ message: 'Category deleted' });
    } catch (err) {
      return res.apiError(500, err);
    }
  }
};

