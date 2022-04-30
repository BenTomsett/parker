/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: James Kerrison - Group 12
    IDE Version: IntelliJ Idea
    Current Version: Managed by GitHub
    Date Created: 25/04/2022
    Date Finished:
    Last Modified: 13:11 25/04/2022

 -------DESCRIPTION-------

This is the controller which handles the processing of the data for the zones.
It does this through database interactions using Sequelize to implement all CRUD
functionality.

*/

const Zone = require('../models/zone.model');
const sequelize = require('../models/index');

// Create and Save a new ParkingSpace
const createZone = async (req, res) => {
    const zone = req.body;

    zone.create(zone, {
        fields: [
            'zoneId',
            'carParkId',
            'name',
            'spaces',
        ],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_ZONE_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.err(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

// Update a parking by the id in the request
const updateZone = async (req, res) => {
    const { zoneId } = req.params;

    Zone.update(req.body, { where: { zoneId } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_ZONE_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.error(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

const findAllZones = async (req, res) => {
    Zone.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

const findZoneById = async (req, res) => {
    const zoneId = req.params.zoneId;

    Zone.findByPk(zoneId)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

// Delete a parking space with the specified id in the request
const deleteZone = async (req, res) => {
    const { zoneId } = req.params;

    Zone.destroy({ where: { zoneId } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

// Delete all parking spaces from the database.
const deleteAllZones = async (req, res) => {
    Zone.destroy({
        where: {},
        truncate: false,
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

module.exports = {
    createZone,
    updateZone,
    findAllZones,
    findZoneById,
    deleteZone,
    deleteAllZones,
};
