/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
  * @api {post} /api/v1/auth/login User sign in
  * @apiName Login
  * @apiGroup Authentication
  * @apiDescription API to be accessed when user sign in
  * It will return JWT that can be used for subsequent API call.
  *
  * @apiParam {String} email User email.
  * @apiParam {String} password User password.
  *
  * @apiSuccess {Object} user The user logging in.
  * @apiSuccess {Number} user.id User ID.
  * @apiSuccess {String} user.email User email.
  * @apiSuccess {String} user.name User name.
  * @apiSuccess {String} user.role User role (Admin or Customer).
  * @apiSuccess {String} user.accessToken JSON Web Token for subsequent API call.
  */
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

  /**
  * @api {post} /api/v1/auth/logout Logout user
  * @apiName Logout
  * @apiGroup Authentication
  * @apiPermission  authorizedUser
  * @apiDescription API to logout user.
  *
  * @apiSuccess {String} message A message with text `Logout success` if log out is OK.
  */
  logout: async(req, res) => {
    try {
      await User.update(req.user.id).set({ accessToken: null });

      res.apiSuccess({ message: 'Logout success' });
    } catch (err) {
      res.apiError(500, err);
    }
  }
};

