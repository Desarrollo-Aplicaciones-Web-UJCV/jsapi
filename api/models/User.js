/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let bcrypt = require('bcrypt')

module.exports = {
  schema: false,
  tableName: 'users',
  attributes: {
    name: {
      columnName: 'name',
      required:true,
      type:'string'
    },
    username: {
      columnName: 'username',
      required: true,
      unique: true,
      type: 'string'
    },
    encryptedPassword: {
      columnName: 'encryptedPassword',
      type: 'string'
    },
    role: {
      model: 'Role'
    },
    active: {
      columnName: 'isActive',
      type: 'boolean',
      defaultsTo: true
    }
  },

  customToJSON: function(){
    return _.omit(this, ['encryptedPassword'])
  },

  beforeCreate: function(values, cb){
    if(!values.password || !values.confirmation || values.password != values.confirmation){
      return cb({err: ['Password does not match confirmation.']})
    }
    bcrypt.hash(values.password, 10, function(err, hash){
      if(err) return cb(err)
      values.encryptedPassword = hash

      delete values.password
      delete values.confirmation

      cb()
    })
  }
}
