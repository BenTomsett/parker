/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 06/05/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our zone routes which handle all of our http requests.

*/

const express = require('express');

const ZoneController = require('../controllers/zone.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Retrieve all zones
router.get('/', authenticateUser, ZoneController.findAllZones);

// Create a new zone
router.put('/', authenticateUser, ZoneController.createZone);

// Delete all zones
router.delete('/', authenticateUser, ZoneController.deleteAllZones);

// Retrieve a single zone via the ID
router.get('/:zoneId', authenticateUser, ZoneController.findZoneById);

// Retrieve a car parks zones
router.get('/:carparkId/carpark', authenticateUser, ZoneController.findAllCarParkZones);

// Update a zone with the zone ID
router.put('/:zoneId', authenticateUser, ZoneController.updateZone);

// Delete a zone with the zoneId
router.delete('/:zoneId', authenticateUser, ZoneController.deleteZone);

module.exports = router;
