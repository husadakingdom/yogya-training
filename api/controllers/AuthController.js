/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: async (req, res) => {
    try {
      const params = req.allParams();
      const errMsg = sails.config.custom.errorMessage.auth;

      let user = await sails.helpers.auth.validateLogin(params.email, params.password)
      .intercept('userNotFound', () => new Error(errMsg.userNotFound))
      .intercept('invalidPassword', () => new Error(errMsg.invalidPassword));

      user = await sails.helpers.auth.generateToken(user);

      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  logout: async(req, res) => {
    try {
      await User.update(req.user.id).set({ accessToken: null });

      res.json({ message: 'Logout success' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

