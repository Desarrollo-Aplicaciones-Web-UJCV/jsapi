/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'roles',
  attributes: {
    name: {
      unique: true,
      required: true,
      type: 'string',
    },
    users: {
      collection: 'User',
      via: 'role',
    },
  },
};
