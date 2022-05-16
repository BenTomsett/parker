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
const { Op } = require('sequelize');

const db = require('../models/index');

const { ParkingSpace, CarPark, Zone, Booking } = db;

// Create and Save a new ParkingSpace
const createParkingSpace = async (req, res) => {
  const parkingSpace = req.body;

  ParkingSpace.create(parkingSpace)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_SPACE_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Retrieve all parking spaces from the database.
const findAllParkingSpaces = async (req, res) => {
  ParkingSpace.findAll({ include: [{ model: CarPark }, { model: Zone }] })
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
  const { spaceId } = req.params;

  ParkingSpace.findByPk(spaceId)
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
      res.send(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find parking spaces for a specific car park
const findCarParkAvailableSpaces = async (req, res) => {
  const { carParkId } = req.params;

  ParkingSpace.count({
    where: {
      carParkId,
      status: 'AVAILABLE',
    },
  })
    .then((data) => {
      res.status(200).json({
        availableSpaces: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find parking spaces for a specific car park
const findCarParkOccupiedSpaces = async (req, res) => {
  const { carParkId } = req.params;

  ParkingSpace.count({
    where: {
      carParkId,
      status: 'OCCUPIED',
    },
  })
    .then((data) => {
      res.status(200).json({
        occupiedSpaces: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find parking spaces for a specific car park
const findCarParkReservedSpaces = async (req, res) => {
  const { carParkId } = req.params;

  ParkingSpace.count({
    where: {
      carParkId,
      status: 'RESERVED',
    },
  })
    .then((data) => {
      res.status(200).json({
        reservedSpaces: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Update a parking by the id in the request
const updateParkingSpace = async (req, res) => {
  const { spaceId } = req.params;

  ParkingSpace.update(req.body, { where: { spaceId } })
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

// Checkin a booking by the id in the request
const setReservedSpaces = async (req, res) => {
  const spaceIds = [];

  await Booking.findAll({
    attributes: ['spaceId'],
    where: {
      startDate: {
        [Op.gte]: new Date(Date.now() + 1 * 60 * 60 * 1000),
        [Op.lte]: new Date(Date.now() + 1 * 60 * 60 * 1000 + 70 * 60 * 1000),
      },
      bookingType: 'USER',
      checkedIn: {
        [Op.eq]: false,
      },
      checkedOut: {
        [Op.eq]: false,
      },
    },
  })
    .then((bookings) => {
      bookings.forEach((booking) => {
        spaceIds.push(booking.spaceId);
      });

      ParkingSpace.update(
        { status: 'RESERVED' },
        {
          where: {
            spaceId: {
              [Op.in]: spaceIds,
            },
          },
        }
      )
        .then((data) => {
        })
        .catch((err) => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            console.error(err);
          } else if (err.name === 'SequelizeValidationError') {
            console.error(err);
          } else {
            console.error(err);
          }
        });
    })
    .catch((err) => {
      console.error(err);

    });
};

// Delete a parking space with the specified id in the request
const deleteParkingSpace = async (req, res) => {
  const { spaceId } = req.params;

  ParkingSpace.destroy({ where: { spaceId } })
    .then(() => {
      res.sendStatus(200);
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
    .then(() => {
      res.sendStatus(200);
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
  findCarParkAvailableSpaces,
  findCarParkOccupiedSpaces,
  findCarParkReservedSpaces,
  setReservedSpaces,
  updateParkingSpace,
  deleteParkingSpace,
  deleteAllParkingSpaces,
};
