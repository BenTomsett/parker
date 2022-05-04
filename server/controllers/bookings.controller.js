/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the booking controller which handles all the processing of data to do with bookings.
It involves all database interactions and has all the CRUD functions that are accessed from
the bookings routes.

*/
const { Op } = require('sequelize');

const Booking = require('../models/booking.model');
const ParkingSpace = require('../models/parkingspace.model');
const { checkParkedLocation } = require('../utils/checkLocation');

// Create and Save a new Booking
const createBooking = async (req, res) => {
  const booking = req.body;

  Booking.create(booking, {
    fields: [
      'carParkId',
      'spaceId',
      'bookingType',
      'userId',
      'startDate',
      'duration',
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
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Retrieve all bookings from the database.
const findAllBookings = async (req, res) => {
  Booking.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find a single booking with the booking id
const findBooking = async (req, res) => {
  const bookingID = req.params.bookingId;

  Booking.findByPk(bookingID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find bookings for a specific user
const findUserBookings = async (req, res) => {
  const { userId } = req.params;

  Booking.findAll({ where: { userId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find bookings for a specific car park
const findCarParkBookings = async (req, res) => {
  const { carParkId } = req.params;

  Booking.findAll({ where: { carParkId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find bookings for a specific car park
const findCarPark24HBookings = async (req, res) => {
  const { carParkId } = req.params;

  Booking.findAll({
    where: {
      carParkId,
      startDate: {
        [Op.lt]: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    }
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }),
  });
};

// Update a booking by the id in the request
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;

  Booking.update(req.body, { where: { bookingId } })
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
const checkInBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { userGpsLong, userGpsLat } = req.body;

  let booking = null;
  let parkingSpace = null;
  const location = { userGpsLong, userGpsLat };

  await Booking.findByPk(bookingId)
    .then((data) => {
      booking = data;
      ParkingSpace.findByPk(booking.spaceId)
        .then((parkingData) => {
          parkingSpace = parkingData;
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('ERR_INTERNAL_EXCEPTION');
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });

  const correctLocation = checkParkedLocation(location, parkingSpace);

  if (correctLocation) {
    Booking.update({ checkedIn: true }, { where: { bookingId } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).send('ERR_DATA_MISSING');
        } else {
          console.error(err);
          res.status(500).send('ERR_INTERNAL_EXCEPTION');
        }
      });
  } else {
    res.status(401).send('ERR_INCORRECT_LOCATION');
  }
};

// Delete a Booking with the specified id in the request
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  Booking.destroy({ where: { bookingId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Delete all Bookings from the database.
const deleteAllBookings = async (req, res) => {
  Booking.destroy({
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
  createBooking,
  findAllBookings,
  findBooking,
  findUserBookings,
  findCarParkBookings,
  findCarPark24HBookings,
  updateBooking,
  checkInBooking,
  deleteBooking,
  deleteAllBookings,
};
