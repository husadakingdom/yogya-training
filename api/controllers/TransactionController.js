/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  begin: async (req, res) => {
    try {
      const params = req.allParams();
      params.status = 'PENDING'; // security measure
      delete params.paymentRef; // should have no payment yet at beginning

      // TODO: verify store, user, and each items exist

      let transaction = await Transaction.create(params).fetch();
      transaction = await Transaction.findOne(transaction).populate('items');

      res.apiSuccess({ transaction });
    } catch (err) {
      res.apiError(500, err);
    }
  },

  /**
   * Webhook API to be called when user finish payment
   */
  complete: async (req, res) => {
    try {
      let transaction = await Transaction.findOne(req.params.id).populate('items');

      if (!transaction || transaction.status !== 'PENDING') {
        return res.apiError(400, sails.config.custom.errorMessage.transaction.invalidTransaction);
      }

      if (!_.isString(req.param('paymentRef'))) {
        return res.apiError(400, sails.config.custom.errorMessage.transaction.paymentRefRequired);
      }

      if (req.user.id !== transaction.user) {
        return res.apiError(400, sails.config.custom.errorMessage.transaction.wrongUser);
      }

      // Usually, first we wil re-call the payment provider to confirm payment status
      // but we will skip it now

      await sails.getDatastore().transaction(async (db, proceed) => {
        await Transaction.update({ id: transaction.id }).set({
          status: 'SUCCESS',
          paymentRef: req.param('paymentRef')
        }).usingConnection(db);

        const updateStock = async (item) => {
          const storeItems = await StoreItem.find({ store: transaction.store, item: item.id })
              .limit(1).usingConnection(db);

          const storeItem = storeItems[0];

          if (storeItem.stock < 1) {
            return proceed(new Error('Insufficient stock'));
          }

          await StoreItem.update({ id: storeItem.id })
              .set({ stock: storeItem.stock - 1 }).usingConnection(db);
        };

        await Promise.all(transaction.items.map(input => updateStock(input)));

        return proceed();
      });

      transaction = await Transaction.findOne(req.params.id).populate('items');

      return res.apiSuccess({ transaction });
    } catch (err) {
      if (err.message === 'Insufficient stock') {
        // Refund customer
      }

      return res.apiError(500, err);
    }
  }
};
