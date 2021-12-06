module.exports = {


  friendlyName: 'Verify token',


  description: 'Verify JWToken provided.',


  inputs: {
    token:{
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

    error: {
      description: 'An error has occured'
    }

  },


  fn: async function (inputs, exits) {
    let jwt = require('jsonwebtoken')
    jwt.verify(inputs.token, sails.config.secret, (error, decoded) => {
      if(error) return exits.error({error})
      return exits.success(decoded)
    })
  }
}
