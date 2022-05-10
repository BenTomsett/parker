const { verifyToken } = require('../utils/auth');
const db = require('../models/index');

const { User } = db;

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization && !req.cookies.token) {
    return res.status(401).send('ERR_UNAUTHORIZED');
  }

  let token;
  if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else {
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
    return res.status(401).send('ERR_UNAUTHORIZED');
  }
  if (users > 1) {
    return res.status(500).send('ERR_MULTIPLE_USERS');
  }

  delete user.iat;
  delete user.exp;

  req.user = user;
  return next();
};

const verifyAdmin = async (req, res, next) => {
  const { sub } = req.user;

  const countResult = await User.count({
    where: {
      email: sub,
      isAdmin: true,
    },
  });

  if (countResult === 1) {
    return next();
  }

  return res.status(401).send('ERR_UNAUTHORIZED');
};

module.exports = {
  authenticateUser,
  verifyAdmin,
};
