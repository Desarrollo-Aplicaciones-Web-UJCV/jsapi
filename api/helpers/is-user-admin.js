module.exports = {
  friendlyName: 'Is user admin',

  description: 'Check id the user has admin role.',

  inputs: {
    req: {
      type: 'ref',
      description: 'reference to the request object',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
    notAdmin: {
      description: 'The user does have Administrator privileges.',
    },
  },

  fn: async function (inputs, exits) {
    role = await Role.findOne({
      select: ['id'],
      where: { name: 'administrator' },
    });
    if (inputs.req.options.user.data.role !== role.id) {
      throw 'notAdmin';
    }
    return exits.success(true);
  },
};
