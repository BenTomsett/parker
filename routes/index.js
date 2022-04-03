const express = require('express');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

/* GET home page. */
router.get('/', authenticateUser, (req, res) => {
  res.status(200).send('Parker server up and running');
});

module.exports = router;
