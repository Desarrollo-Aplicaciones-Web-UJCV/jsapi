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
  'POST /user/create': {
    controller: 'UserController',
    action: 'create'
  },
  'POST /user/login': {
    controller:'UserController',
    action: 'login'
  },
  'GET /user/': {
    controller: 'UserController',
    action: 'getAll'
  },

  'POST /role/create': {
    controller: 'RoleController',
    action: 'create'
  },
  'GET /role/': {
    controller: 'RoleController',
    action: 'getAll'
  }
}
;
