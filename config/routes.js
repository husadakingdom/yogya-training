/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  'POST /api/v1/auth/login': 'AuthController.login',
  'POST /api/v1/auth/logout': 'AuthController.logout',

  'POST /api/v1/user': 'UserController.create',
  'GET /api/v1/users': 'UserController.index',
  'GET /api/v1/user/:id': 'UserController.view',
  'PATCH /api/v1/user/:id': 'UserController.update',
  'DELETE /api/v1/user/:id': 'UserController.delete',

  'POST /api/v1/store': 'StoreController.create',
  'GET /api/v1/stores': 'StoreController.index',
  'GET /api/v1/store/:id': 'StoreController.view',
  'PATCH /api/v1/store/:id': 'StoreController.update',
  'DELETE /api/v1/store/:id': 'StoreController.delete',

  'POST /api/v1/store/:id/items': 'StoreController.addItems',
  'DELETE /api/v1/store/:id/items': 'StoreController.removeItems',
  'PUT /api/v1/store/:id/items': 'StoreController.replaceItems',
  'POST /api/v1/store/:id/itemsStock': 'StoreController.stockItems',

  'POST /api/v1/category': 'CategoryController.create',
  'GET /api/v1/categories': 'CategoryController.index',
  'GET /api/v1/category/:id': 'CategoryController.view',
  'PATCH /api/v1/category/:id': 'CategoryController.update',
  'DELETE /api/v1/category/:id': 'CategoryController.delete',

  'POST /api/v1/item': 'ItemController.create',
  'GET /api/v1/items': 'ItemController.index',
  'GET /api/v1/item/:id': 'ItemController.view',
  'PATCH /api/v1/item/:id': 'ItemController.update',

  'POST /api/v1/transaction/begin': 'TransactionController.begin',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

  'POST /api/v1/transaction/:id/complete': 'TransactionController.complete',


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
