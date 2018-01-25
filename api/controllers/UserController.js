/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: async(req, res) => {
    try {
      const params = req.allParams();

      // Can add params validation here for better error message

      const password = await sails.helpers.encryptText.with({
        plainText: params.password
      }); // Can also use beforeCreate event on User model

      params.password = password;

      const user = await User.create(params).fetch();

      return res.apiSuccess({ user });
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

      const users = await User.find()
        .where({
          // for more complicated query, consider use native SQL
          name: {
            like: `%${search}%`
          }
        })
        .skip(offset)
        .limit(limit)
        .sort([sort]);

      return res.apiSuccess({ users });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  view: async(req, res) => {
    try {
      const user = await User.findOne(req.params.id);

      if (!user) {
        return res.apiError(400, sails.config.custom.errorMessage.user.notFound);
      }

      return res.apiSuccess(user);
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  update: async(req, res) => {
    try {
      if (req.user.role !== 'Admin' && req.user.id !== parseInt(req.params.id, 10)) {
        return res.apiError(403, sails.config.custom.errorMessage.user.notAllowed);
      }

      // whitelist allowed params
      const params = {
        name: req.param('name'),
        email: req.param('email')
      };

      if (req.param('password')) {
        const password = await sails.helpers.encryptText.with({
          plainText: req.param('password')
        });
        params.password = password;
      }

      const users = await User.update({ id: req.params.id }, params).fetch();
      const user = users[0];
      delete user.accessToken;

      return res.apiSuccess({ user });
    } catch (err) {
      return res.apiError(500, err);
    }
  },

  delete: async(req, res) => {
    try {
      const user = await User.findOne(req.params.id);
      if (!user) {
        return res.apiError(400, sails.config.custom.errorMessage.user.notFound);
      }

      await User.destroy(req.params.id);

      return res.apiSuccess({ message: 'User deleted' });
    } catch (err) {
      return res.apiError(500, err);
    }
  }
};

