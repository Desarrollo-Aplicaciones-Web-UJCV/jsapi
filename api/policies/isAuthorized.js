module.exports = async (req, res, proceed) => {
  let token = undefined;
  if(req.headers && req.headers.authorization){
    let parts = req.headers.authorization.split(' ')
    if(parts.length == 2){
      let scheme = parts[0]
      let credentials = parts[1]
      if(/^Bearer$/i.test(scheme)){
        token = credentials
      }
    }
    let result = await sails.helpers.verifyToken(token).tolerate('badToken', () => {
    return {'error': 'Malformed token provided'}
    })
    if(!result.error){
      req.options.user = result
      proceed()
    }else{
      return res.json(result)
    }
  }else{
    return res.json(401, {error: 'No valid token provided'})
  }

}
