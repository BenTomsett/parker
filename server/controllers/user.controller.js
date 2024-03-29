/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: James Kerrison - Group 12
    IDE Version: IntelliJ Idea
    Current Version: Managed by GitHub
    Date Created: 09/04/2022
    Date Finished:
    Last Modified: 12:49 25/04/2022

 -------DESCRIPTION-------

This is the accounts controller which handles the processing of data for the accounts.
It does this mainly through database interactions and has all CRUD functions which are
accessed via the accounts routes.

*/

const db = require('../models/index');

const {
  sendUserRegistrationEmail,
    sendAdminEmail,
} = require('../utils/notifications');

const { User } = db;

const {
  emailRegex,
  strongPassRegex,
  getAge, generateToken,
} = require('../utils/auth');

// Create and save a new user to the database
const createUser = async (req, res) => {
  const user = req.body;

  const dobParsed = new Date(Date.parse(user.dob));

  if (!emailRegex.test(user.email)) {
    res.status(400).send('ERR_EMAIL_INVALID');
  } else if (!strongPassRegex.test(user.password)) {
    res.status(400).send('ERR_PASSWORD_WEAK');
  } else if (!dobParsed) {
    res.status(400).send('ERR_INVALID_DATE');
  } else if (getAge(dobParsed) <= 16) {
    res.status(400).send('ERR_TOO_YOUNG');
  } else {
    User.create(user)
      .then(async (obj) => {
        await obj.reload();
        const token = generateToken(obj);
        res.cookie('token', token, { httpOnly: true });
        await sendUserRegistrationEmail(obj)
        return res.status(201).json(obj);
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(409).send('ERR_USER_EXISTS');
        } else if (err.name === 'SequelizeValidationError') {
          res.status(400).send('ERR_DATA_MISSING');
        } else {
          console.error(err);
          res.status(500).send('ERR_INTERNAL_EXCEPTION');
        }
      });
  }
};

// Retrieve all users from the database
const findAllUsers = async (req, res) => {
  User.findAll({
    order: [
      ['userId', 'ASC'],
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Retrieve all admin users from the database
const findAllAdminUsers = async (req, res) => {
  User.findAll({
    where: {
      isAdmin: true,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Finds a user in the DB using their userID.
const findUser = async (req, res) => {
  const userID = req.params.userId;

  User.findByPk(userID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Update a user by the id in the request
const updateUser = async (req, res) => {
  const { userId } = req.params;

  User.update(req.body, {
    where: {
      userId,
    },
    individualHooks:true
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_USER_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Delete a user with the specified id in the request
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  User.destroy({
    where: {
      userId,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Delete all users from the database.
const deleteAllUsers = async (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

const banUser = async (req, res) => {
  const { userId } = req.params;
  User.update({isBanned:true},{ where:{userId} })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_USER_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};
const unBanUser = async (req, res) => {
  const { userId } = req.params;
  User.update({isBanned:false},{ where:{userId} })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(409).send('ERR_USER_EXISTS');
        } else if (err.name === 'SequelizeValidationError') {
          res.status(400).send('ERR_DATA_MISSING');
        } else {
          console.error(err);
          res.status(500).send('ERR_INTERNAL_EXCEPTION');
        }
      });
};
const sendAdminEmailFromUser= async (req,res) => {
  const { userId, text } = req.body;
  User.findByPk(userId)
      .then((data) => {
        sendAdminEmail(data, text);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      });
};

module.exports = {
  createUser,
  findAllUsers,
  findAllAdminUsers,
  findUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  banUser,
  unBanUser,
  sendAdminEmailFromUser,
};
