const { verifyToken } = require('../utils/auth');
const User = require('../models/user.model');

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('ERR_UNAUTHORIZED');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
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

module.exports = {
  authenticateUser,
};
