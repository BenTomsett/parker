/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 06/05/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our car park routes which handle all of our http requests.

*/

const express = require('express');

const CarParkController = require('../controllers/carpark.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Retrieve all carparks
router.get('/', authenticateUser, CarParkController.findAllCarParks);

// Create a new carpark
router.put('/', authenticateUser, CarParkController.createCarPark);

// Delete all carpark
router.delete('/', authenticateUser, CarParkController.deleteAllCarParks);

// Retrieve a single carpark via the ID
router.get('/:carparkId', authenticateUser, CarParkController.findCarParkByID);

// Retrieve a single carpark via the Name
router.get('/find/:name', authenticateUser, CarParkController.findCarParkID);

// Update a car park with the carpark ID
router.put('/:carparkId', authenticateUser, CarParkController.updateCarPark);

// Delete a carpark with the carparkId
router.delete('/:carparkId', authenticateUser, CarParkController.deleteCarPark);

module.exports = router;
