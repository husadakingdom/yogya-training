/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': false,
  'auth/login': 'requestLog',
  'auth/logout': ['requestLog', 'isAuthorized'],

  'user/*': ['requestLog', 'isAuthorized'],
  'user/create': ['requestLog', 'isAuthorized', 'isAdmin'],
  'user/delete': ['requestLog', 'isAuthorized', 'isAdmin'],

  'store/*': ['requestLog', 'isAuthorized', 'isAdmin'],

  'category/*': ['requestLog', 'isAuthorized', 'isAdmin'],
  'category/index': 'requestLog',

  'item/*': ['requestLog', 'isAuthorized', 'isAdmin'],
  'item/index': 'requestLog',
  'item/view': 'requestLog'
};
