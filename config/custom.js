/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  frontendUrl: process.env.FRONTEND_URL,

  token: {
    secret: 'Y0gy@',
    expires: 86400 // 1 day
  },

  errorMessage: {
    auth: {
      userNotFound: 'User not found',
      invalidPassword: 'Invalid password',
      noHeader: 'No authorization header was found',
      headerFormat: 'No authorization header was found',
      notAdmin: 'You don\'t have enough privilege for this action'
    },

    user: {
      notFound: 'User not found',
      notAllowed: 'You are not allowed to change other user data'
    },

    store: {
      notFound: 'Store not found',
    },

    category: {
      notFound: 'Category not found',
      itemExist: 'There are items on this category, delete those first'
    },

    item: {
      fileNotFound: 'You must upload 1 file',
      invalidCategory: 'The category ID is invalid',
      notFound: 'Item not found'
    }
  }

};
