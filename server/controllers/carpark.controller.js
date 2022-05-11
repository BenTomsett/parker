/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: James Kerrison - Group 12
    IDE Version: IntelliJ Idea
    Current Version: Managed by GitHub
    Date Created: 25/04/2022
    Date Finished:
    Last Modified: 13:14 25/04/2022

 -------DESCRIPTION-------

This is the controller which handles the processing of the data for the car parks.
It does this through database interactions using Sequelize to implement all CRUD
functionality.

*/

const db = require('../models/index');

const { CarPark, Zone, ParkingSpace } = db;

// Create and Save a new ParkingSpace
const createCarPark = async (req, res) => {
    const carPark = req.body;

    CarPark.create(carPark, {
        fields: [
            'carParkId',
            'name',
            'numOfSpaces',
            'zones',
        ],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_CARPARK_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.err(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

// Update a parking by the id in the request
const updateCarPark = async (req, res) => {
    const { carParkID } = req.params;

    CarPark.update(req.body, { where: { carParkID } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('ERR_CARPARK_EXISTS');
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).send('ERR_DATA_MISSING');
            } else {
                console.error(err);
                res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
        });
};

const findAllCarParks = async (req, res) => {
    CarPark.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

const findCarParkByID = async (req, res) => {
    const { carparkId } = req.params;

    CarPark.findByPk(carparkId, {
        include: {
          model: Zone,
          include: {
            model: ParkingSpace,
          }
        }
      })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

<<<<<<< HEAD
const findCarParkID = async (req, res) => {

    const {name}= req.params;

    CarPark.findAll({
        where:{
         name,
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


=======
const findNearestCarParks = async (req, res) => {
    const { lng, lat } = req.body;
  
    const location = db.sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
  
    // Haversine Formula (More accurate?)
    // var distance = sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(ST_X(location))) * cos(radians("+lng+") - radians(ST_Y(location))) + sin(radians("+lat+")) * sin(radians(ST_X(location))))");
  
    CarPark.findAll({
      attributes: {
        include: [
          [
            db.sequelize.fn(
              'ST_DistanceSphere',
              db.sequelize.literal('"gpsPoint"'),
              location
            ),
            'distance',
          ],
        ],
      },
      order: [[db.sequelize.fn('ST_DistanceSphere', db.sequelize.literal('"gpsPoint"'),location), 'ASC']]
    }).then((data) => {
      res.status(200).send(data);
    });
};

>>>>>>> main
// Delete a parking space with the specified id in the request
const deleteCarPark = async (req, res) => {
    const { carParkID } = req.params;

    CarPark.destroy({ where: { carParkID } })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
};

// Delete all parking spaces from the database.
const deleteAllCarParks = async (req, res) => {
    CarPark.destroy({
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
    createCarPark,
    updateCarPark,
    findAllCarParks,
    findCarParkByID,
<<<<<<< HEAD
    findCarParkID,
=======
    findNearestCarParks,
>>>>>>> main
    deleteCarPark,
    deleteAllCarParks,
};
