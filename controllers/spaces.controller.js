/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the spaces controller which handles all the processing of data to do with checking spaces in car parks.
It involves all database interactions and has all the CRUD functions that are accessed from
the car parks routes.
*/

const ParkingSpace = require('../models/parkingspace.model');
const CarPark = require('../models/carpark.model');
const sequelize = require('../models/index');
// const Zone = require('../models/zone.model');

// Create and Save a new ParkingSpace
const createParkingSpace = async (req, res) => {
  const booking = req.body;

  ParkingSpace.create(booking, {
    fields: [
      'zoneId',
      'status',
      'gpsLat',
      'gpsLong',
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_BOOKING_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.err(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Retrieve all parking spaces from the database.
const findAllParkingSpaces = async (req, res) => {
  ParkingSpace.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find a single parking space with the parking space id
const findParkingSpace = async (req, res) => {
  const { parkingSpaceId } = req.params;

  ParkingSpace.findByPk(parkingSpaceId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find parking spaces for a specific car park
const findCarParkParkingSpaces = async (req, res) => {
  const { carParkId } = req.params;

  ParkingSpace.findAll({ where: { carParkId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

const findNearestCarParks = async (req, res) => {
    const { lng, lat } = req.body;
  
    const location = sequelize.literal(
      `ST_GeomFromText('POINT(${lng} ${lat})')`
    );
  
    // Haversine Formula (More accurate?)
    // var distance = sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(ST_X(location))) * cos(radians("+lng+") - radians(ST_Y(location))) + sin(radians("+lat+")) * sin(radians(ST_X(location))))");
  
    CarPark.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              'ST_Distance_Sphere',
              sequelize.literal('geolocation'),
              location
            ),
            'distance',
          ],
        ],
      },
      order: 'distance',
    }).then((data) => {
      res.status(200).send(data);
    });
  };

// Update a parking by the id in the request
const updateParkingSpace = async (req, res) => {
  const { parkingSpaceId } = req.params;

  ParkingSpace.update(req.body, { where: { parkingSpaceId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_BOOKING_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Delete a parking space with the specified id in the request
const deleteParkingSpace = async (req, res) => {
  const { parkingSpaceId } = req.params;

  ParkingSpace.destroy({ where: { parkingSpaceId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Delete all parking spaces from the database.
const deleteAllParkingSpaces = async (req, res) => {
  ParkingSpace.destroy({
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
  createParkingSpace,
  findAllParkingSpaces,
  findParkingSpace,
  findCarParkParkingSpaces,
  findNearestCarParks,
  updateParkingSpace,
  deleteParkingSpace,
  deleteAllParkingSpaces,
};
