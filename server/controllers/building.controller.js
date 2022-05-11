/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: IntelliJ Idea
    Current Version: Managed by GitHub
    Date Created: 11/05/2022
    Date Finished:
    Last Modified: 

 -------DESCRIPTION-------

This is the controller which handles the processing of the data for the builds.
It does this through database interactions using Sequelize to implement all CRUD
functionality.

*/

const db = require('../models/index');

const { Building } = db;

// Create and Save a new building
const createBuilding = async (req, res) => {
    const { building } = req.body;

    Building.create(building)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_BUILDING_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.err(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

// Update a parking by the id in the request
const updateBuilding = async (req, res) => {
    const { buildingID } = req.params;

    Building.update(req.body, { where: { buildingID } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_Building_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.error(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

const findAllBuildings = async (req, res) => {
    Building.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

const findBuildingByID = async (req, res) => {
    const { buildingId } = req.params;

    Building.findByPk(buildingId)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

// Delete a parking space with the specified id in the request
const deleteBuilding = async (req, res) => {
    const { buildingID } = req.params;

    Building.destroy({ where: { buildingID } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

// Delete all parking spaces from the database.
const deleteAllBuildings = async (req, res) => {
    Building.destroy({
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
    createBuilding,
    updateBuilding,
    findAllBuildings,
    findBuildingByID,
    deleteBuilding,
    deleteAllBuildings,
};
