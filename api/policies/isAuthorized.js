module.exports = async (req, res, next) => {
  let token = undefined;
  if(req.headers && req.headers.authorization){
    let parts = req.headers.authorization.split(' ')
    if(parts.length == 2){
      let scheme = parts[0]
      let credentials = parts[1]
      if(/^Bearer$/i.test(scheme)){
        token = credentials
      }
    }else{
      return res.json(401, {error: 'No valid token provided'})
    }
    res.json(await sails.helpers.verifyToken(token))
  }
}
