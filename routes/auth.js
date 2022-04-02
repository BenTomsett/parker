const express = require('express');

const User = require('../models/user.model');
const { emailRegex, strongPassRegex } = require('../utils/auth');

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

router.post('/login', (req, res) => {
  // const { email, password } = req.body;

  // TODO: data validation
  // - Check user exists (email is in database)
  // - Check password is valid

  // for now, simulate delay and return appropriate API response
  setTimeout(() => {
    res.status(200).json({ status: 200, token: 'jwtgoeshere' });
  }, 2000);
});

module.exports = router;
