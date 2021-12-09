module.exports = {
  friendlyName: 'Verify token',

  description: 'Verify JWToken provided.',

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },

    badToken: {
      description: 'Bad token provided.',
    },
  },

  fn: async function (inputs, exits) {
    let jwt = require('jsonwebtoken');
    jwt.verify(inputs.token, sails.config.secret, (error, decoded) => {
      if (error) throw 'badToken';
      return exits.success(decoded);
    });
  },
};
