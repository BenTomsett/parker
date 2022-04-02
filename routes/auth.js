const express = require('express');

const User = require('../models/user.model');
const {
  emailRegex,
  strongPassRegex,
  generateAccessToken,
} = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const dobParsed = Date.parse(req.body.dob);

  if (!emailRegex.test(req.body.email)) {
    res.status(400).send('ERR_EMAIL_INVALID');
  } else if (!strongPassRegex.test(req.body.password)) {
    res.status(400).send('ERR_PASSWORD_WEAK');
  } else if (!dobParsed) {
    res.status(400).send('ERR_INVALID_DATE');
  } else {
    // TODO: Store password securely

    User.create(req.body, {
      fields: [
        'forename',
        'surname',
        'dob',
        'email',
        'password',
        'addressLine1',
        'addressLine2',
        'city',
        'postcode',
        'country',
      ],
    })
      .then(async (obj) => {
        await obj.reload();
        res.status(201).json(obj);
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(409).send('ERR_USER_EXISTS');
        } else if (err.name === 'SequelizeValidationError') {
          res.status(400).send('ERR_DATA_MISSING');
        } else {
          res.status(500).send(err);
        }
      });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // TODO: Store password securely

  const users = await User.findAll({
    where: { email },
    attributes: ['forename', 'surname', 'email', 'password'],
  });

  if (users.length < 1) {
    res.status(401).send('ERR_INVALID_CREDENTIALS');
  } else if (users.length > 1) {
    res.status(500).send('ERR_MULTIPLE_USERS');
  } else if (users[0].password !== password) {
    res.status(401).send('ERR_INVALID_CREDENTIALS');
  } else {
    const user = users[0];
    const token = generateAccessToken(user);
    res.status(200).send(token);
  }
});

module.exports = router;
