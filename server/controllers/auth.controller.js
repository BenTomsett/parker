const bcrypt = require('bcrypt');
const db = require('../models/index');
const { generateToken } = require('../utils/auth');

const { User } = db;

const login = async (req, res) => {
  const { email, password } = req.body;

  const users = await User.findAll({
    where: { email },
    attributes: ['forename', 'surname', 'email', 'password', 'isBanned'],
  });

  if (users.length < 1) {
    res.status(401).send('ERR_INVALID_CREDENTIALS');
  } else if (users.length > 1) {
    res.status(500).send('ERR_MULTIPLE_USERS');
  } else {
    const user = users[0];
    if (user.isBanned) {
      res.status(403).send('ERR_USER_BANNED');
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = generateToken(user);
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ token });
        } else if (err) {
          res.status(500).send('ERR_INTERNAL_EXCEPTION');
        } else {
          res.status(401).send('ERR_INVALID_CREDENTIALS');
        }
      });
    }
  }
};

const verify = async (req, res) => {
  const { sub } = req.user;
  const user = await User.findOne({
    where: { email: sub },
  });
  if (user.isBanned) {
    return res.status(403).send('ERR_USER_BANNED');
  }
  if (user.paymentMethodId) {
    return res.status(200).json({
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  return res.status(402).send('NEED_BILLING_SETUP');

};

module.exports = {
  login,
  verify,
};
