/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  create: async(req, res) => {
    const errMsg = sails.config.custom.errorMessage.item;
    try {
      const params = req.allParams();

      const category = await Category.findOne(params.category);
      if (!category) {
        return res.apiError(400, errMsg.invalidCategory);
      }

      const images = await sails.helpers.uploadPromise(req, {}, 'image');

      if (!images || images.length < 1) {
        return res.apiError(400, errMsg.fileNotFound);
      }
      const generatedName = images[0].fd.split('/').slice(-1);
      params.imageUrl = `${sails.config.custom.frontendUrl}/${generatedName}`;

      const item = await Item.create(params).fetch();

      return res.apiSuccess({ item });
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

      const items = await Item.find()
        .where({
          or: [{
            name: {
              like: `%${search}%`
            }
          },
          {
            brand: {
              like: `%${search}%`
            }
          }]
        })
        .skip(offset)
        .limit(limit)
        .sort([sort])
        .populate('category');

      return res.apiSuccess({ items });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  view: async(req, res) => {
    try {
      const item = await Item.findOne(req.params.id).populate('category').populate('stores');

      if (!item) {
        return res.apiError(400, sails.config.custom.errorMessage.item.notFound);
      }

      return res.apiSuccess({ item });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  update: async(req, res) => {
    const errMsg = sails.config.custom.errorMessage.item;
    try {
      exist = await Item.findOne(req.params.id);
      if (!exist) {
        return res.apiError(400, errMsg.notFound);
      }

      const params = req.allParams();

      const category = await Category.findOne(params.categoryId);
      if (!category) {
        return res.apiError(400, errMsg.invalidCategory);
      }

      const images = await sails.helpers.uploadPromise(req, {}, 'image');

      if (images && images.length >= 1) {
        const generatedName = images[0].fd.split('/').slice(-1);
        params.imageUrl = `${sails.config.custom.frontendUrl}/${generatedName}`;
      }

      const items = await Item.update({ id: req.params.id }, params).fetch();
      const item = items[0];

      return res.apiSuccess({ item });
    } catch (err) {
      return res.apiError(500, err);
    }
  }
};

