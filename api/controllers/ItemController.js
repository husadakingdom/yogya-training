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

      const category = await Category.findOne(params.categoryId);
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

      return res.apiSuccess(item);
    } catch (err) {
      return res.apiError(500, err);
    }
  }
};

