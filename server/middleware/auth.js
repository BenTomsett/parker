const { verifyToken } = require('../utils/auth');
const db = require('../models/index');

const User = db.User;

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization && !req.cookies.token) {
    return res.status(401).send('ERR_UNAUTHORIZED');
  }

  let token;
  if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
    token = req.headers.authorization.split(' ')[1];
  }else if(req.cookies.token){
    token = req.cookies.token;
  }else{
    return res.status(401).send('ERR_UNAUTHORIZED');
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).send('ERR_UNAUTHORIZED');
  }

  const users = await User.count({
    where: { email: user.sub },
  });

  if (users < 1) {
    return res.status(401).send('ERR_INVALID_CREDENTIALS');
  }
  if (users > 1) {
    return res.status(500).send('ERR_MULTIPLE_USERS');
  }

  delete user.iat;
  delete user.exp;

  req.user = user;
  return next();
};

const verifyAdmin = async (req,res,next) =>{
  const { userId } = req.params;
  const countResult = await User.count({
    where: {
      userId,
      isAdmin:{
        [Op.is]: true,
      },
    }
  })
  if(countResult === 1){
    return next();
  }else{
    res.status(401).send('ERR_UNAUTHORIZED')
  }
};

module.exports = {
  authenticateUser,
  verifyAdmin,
};
