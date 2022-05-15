/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our booking routes which handle all of our http requests.

*/

const express = require('express');

const SpacesController = require('../controllers/spaces.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Retrieve all parking spaces
router.get('/', authenticateUser, SpacesController.findAllParkingSpaces);

// Create a new parking space
router.put('/', authenticateUser, SpacesController.createParkingSpace);

// Delete all car parking spaces
router.delete('/', authenticateUser, SpacesController.deleteAllParkingSpaces);
// Retrieve a single parking space
router.get(
  '/:parkingSpaceId',
  authenticateUser,
  SpacesController.findParkingSpace
);

// Retrieve all parking spaces for a car park
router.get(
  '/carpark/:carParkId',
  authenticateUser,
  SpacesController.findCarParkParkingSpaces
);

// Retrieve all parking spaces for a car park
router.get(
    '/carpark/availableSpaces/:carParkId',
    authenticateUser,
    SpacesController.findCarParkAvailableSpaces
  );

// Update a parking space with the parkingSpaceId
router.put(
  '/carpark/:carParkId/:parkingSpaceId',
  authenticateUser,
  SpacesController.updateParkingSpace
);

// Delete a car parking space with the parkingSpaceId
router.delete(
  '/carpark/:carParkId/:parkingSpaceId',
  authenticateUser,
  SpacesController.deleteParkingSpace
);

module.exports = router;
