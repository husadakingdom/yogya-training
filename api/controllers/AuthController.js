/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: async (req, res) => {
    const errMsg = sails.config.custom.errorMessage.auth;

    try {
      const params = req.allParams();

      let user = await sails.helpers.auth.validateLogin(params.email, params.password);

      user = await sails.helpers.auth.generateToken(user);

      res.apiSuccess({ user });
    } catch (err) {
      if (err.exit === 'userNotFound') {
        res.apiError(401, errMsg.userNotFound);
      } else if (err.exit ==='invalidPassword') {
        res.apiError(401, errMsg.invalidPassword);      
      } else {
        res.apiError(500, err);
      }
    }
  },

  logout: async(req, res) => {
    try {
      await User.update(req.user.id).set({ accessToken: null });

      res.apiSuccess({ message: 'Logout success' });
    } catch (err) {
      res.apiError(500, err);
    }
  }
};

