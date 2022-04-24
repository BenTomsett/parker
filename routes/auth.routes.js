const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const { generateToken } = require('../utils/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const users = await User.findAll({
    where: { email },
    attributes: ['forename', 'surname', 'email', 'password'],
  });

  if (users.length < 1) {
    res.status(401).send('ERR_INVALID_CREDENTIALS');
  } else if (users.length > 1) {
    res.status(500).send('ERR_MULTIPLE_USERS');
  } else {
    const user = users[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      } else if (result) {
        const token = generateToken(user);
        res.status(200).send(token);
      } else {
        res.status(401).send('ERR_INVALID_CREDENTIALS');
      }
    });
  }
});

module.exports = router;
