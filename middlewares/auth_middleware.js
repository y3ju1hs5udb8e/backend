const jwt = require('jsonwebtoken');



module.exports.authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decode = jwt.decode(token, 'webtoken');
    if (!decode) return res.status(401).json('you are not authorised');
    req.userInfo = decode;
    next();
  } else {
    return res.status(401).json('you are not authorised');
  }


}


module.exports.adminCheck = (req, res, next) => {

  if (req?.userInfo.isAdmin) {
    next();
  } else {
    return res.status(401).json('you are not authorised');
  }

}