const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const {
  emailRegex,
  strongPassRegex,
  generateAccessToken,
  getAge,
} = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = req.body;

  const dobParsed = new Date(Date.parse(user.dob));

  if (!emailRegex.test(user.email)) {
    res.status(400).send('ERR_EMAIL_INVALID');
  } else if (!strongPassRegex.test(user.password)) {
    res.status(400).send('ERR_PASSWORD_WEAK');
  } else if (!dobParsed) {
    res.status(400).send('ERR_INVALID_DATE');
  } else if (getAge(dobParsed) < 16) {
    res.status(400).send('ERR_TOO_YOUNG');
  } else {
    bcrypt.hash(user.password, 10, (hashErr, hash) => {
      if (hashErr) {
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      } else {
        user.password = hash;
        User.create(user, {
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
              console.err(err);
              res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
          });
      }
    });
  }
});

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
        const token = generateAccessToken(user);
        res.status(200).send(token);
      } else {
        res.status(401).send('ERR_INVALID_CREDENTIALS');
      }
    });
  }
});

module.exports = router;
