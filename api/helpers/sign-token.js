module.exports = {
  friendlyName: 'JWToken generation',

  description: 'Generates a jwt token for the specified payload',

  inputs: {
    payload: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Token generated',
    },
  },

  fn: async (inputs, exits) => {
    let jwt = require('jsonwebtoken');
    let token = jwt.sign(
      {
        data: inputs.payload,
      },
      sails.config.secret,
      { expiresIn: 3600 * 24 }
    );
    return exits.success(token);
  },
};
