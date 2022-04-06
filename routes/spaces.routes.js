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

const router = express.Router();

// Create a new parking space
router.post('/', SpacesController.createParkingSpace);

// Retrieve all parking spaces
router.get('/', SpacesController.findAllParkingSpaces);

// Retrieve a single parking space 
router.get('/:parkingSpaceId', SpacesController.findParkingSpace);

// Retrieve all parking spaces for a car park
router.get('/:carParkId/spaces', SpacesController.findCarParkParkingSpaces);

// Update a parking space with the parkingSpaceId
router.put('/:carParkId/:parkingSpaceId', SpacesController.updateParkingSpace);

// Delete a car parking space with the parkingSpaceId
router.delete('/:carParkId/:parkingSpaceId', SpacesController.deleteParkingSpace);

// Delete all car parking spaces
router.delete('/', SpacesController.deleteAllParkingSpaces);

module.exports = router;
