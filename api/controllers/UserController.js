/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let isAdmin = await sails.helpers
      .isUserAdmin(req)
      .tolerate('notAdmin', () => {
        return { error: 'User does not have necesary privileges' };
      });
    if (!isAdmin.error) {
      console.log('es admin');
      let createdUser = await User.create(req.body).fetch();

      res.send(createdUser);
    } else {
      res.json(isAdmin);
    }
  },

  login: async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.badRequest({
        error: 'Email or password cannot be empty.',
      });
    }
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.notFound({
        error: `Cannot find username ${req.body.username}`,
      });
    }
    let bcrypt = require('bcrypt');
    bcrypt.compare(
      req.body.password,
      user.encryptedPassword,
      async (error, result) => {
        if (result) {
          let token = await sails.helpers.signToken(user);
          return res.json({
            user: user,
            token: token,
          });
        } else {
          return res.forbidden({
            error: 'Email and password combination do not match.',
          });
        }
      }
    );
  },

  getAll: async (req, res) => {
    if ((await sails.helpers.isUserAdmin(req)) == true) {
      let users = await User.find({});
      res.send(users);
    }
  },
};
