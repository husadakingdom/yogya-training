/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  itemPerStore: async (req, res) => {
    try {
      const total = await StoreItem.count({ store: req.params.storeId });

      res.apiSuccess({ message: `Total kind of items is ${total}` });
    } catch (err) {
      res.apiError(500, err);
    }
  },

  stockPerStore: async (req, res) => {
    try {
      const total = await StoreItem.sum('stock', { store: req.params.storeId });

      res.apiSuccess({ message: `Total stock of items is ${total}` });
    } catch (err) {
      res.apiError(500, err);
    }
  }
};

