/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our User routes which handle all of our http requests.

*/

const express = require('express');

const UserController = require('../controllers/user.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.get('/register', authenticateUser, UserController.createUser);

// Retrieve all Users
router.get('/', authenticateUser, UserController.findAllUsers);

// Retrieve all admin Users
router.get('/admins', authenticateUser, UserController.findAllAdminUsers);

// Retrieve a single User for a user
router.get('/:userId', authenticateUser, UserController.findUser);

// Update a User with the UserId
router.put('/:userId', authenticateUser, UserController.updateUser);

// Delete a user with the UserId
router.delete('/:userId', authenticateUser, UserController.deleteUser);

// Delete all Users
router.delete('/', authenticateUser, UserController.deleteAllUsers);

module.exports = router;
