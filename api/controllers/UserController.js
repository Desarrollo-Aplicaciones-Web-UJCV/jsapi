/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let createdUser = await User.create(req.body).fetch()
    res.send(createdUser)
  },

  login: async (req, res) => {
    if(!req.body.username || !req.body.password){
      return res.badRequest({
        error: 'Email or password cannot be empty.'
      })
    }
    let user = await User.findOne({username: req.body.username})
    if(!user){
      return res.notFound({
        error: `Cannot find username ${req.body.username}`
      })
    }
    let bcrypt = require('bcrypt')
    bcrypt.compare(req.body.password, user.encryptedPassword, async (error, result)=>{
      if(result){
        let token = await sails.helpers.signToken(user)
        return res.json({
          user: user,
          token: token

        })
      }else{
        return res.forbidden({
          error: 'Email and password combination do not match.'
        })
      }
    })
  },

  check: (req,res) => {
    res.json({'gg':'gg'})
  },



  getAll: async (req, res) => {
    console.log('gotrequest')
    let users = await User.find({})
    res.send(users)
  }
}
