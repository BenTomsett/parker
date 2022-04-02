const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  // const { forename, surname, email, password, dob, address, vehicleReg } = req.body;

  // TODO: data validation
  // - Check user is not already valid (email exists in database)
  // - Check vehicleReg is not in banned user list

  // for now, simulate delay and return appropriate API response
  setTimeout(() => {
    res.status(201).json({ status: 201, message: 'User created' });
  }, 2000);
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
