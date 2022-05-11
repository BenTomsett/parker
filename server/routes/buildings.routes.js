/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 11/05/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our building routes which handle all of our http requests.

*/

const express = require('express');

const BuildingController = require('../controllers/building.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Retrieve all Buildings
router.get('/', authenticateUser, BuildingController.findAllBuildings);

// Retrieve a single Building via the ID
router.get('/:buildingId', authenticateUser, BuildingController.findBuildingByID);

// Create a new Building
router.put('/', authenticateUser, BuildingController.createBuilding);

// Delete all Building
router.delete('/', authenticateUser, BuildingController.deleteAllBuildings);

// Update a car park with the Building ID
router.put('/:buildingId', authenticateUser, BuildingController.updateBuilding);

// Delete a Building with the BuildingId
router.delete('/:buildingId', authenticateUser, BuildingController.deleteBuilding);

module.exports = router;
