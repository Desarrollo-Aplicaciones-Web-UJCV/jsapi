/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let createdRole = await Role.create(req.body).fetch();
    res.send(createdRole);
  },
  getAll: async (req, res) => {
    let roles = await Role.find({});
    res.send(roles);
  },
};
