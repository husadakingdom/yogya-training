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
  }
};

