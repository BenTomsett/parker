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

const Booking = require('../models/booking.model');

// Create and Save a new Booking
const createBooking = async (req, res) => {
  const booking = req.body;

  Booking.create(booking, {
    fields: [
      'carParkId',
      'spaceNumber',
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
        console.err(err);
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
      console.err(err);
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
      console.err(err);
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
      console.err(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
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
        console.err(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Delete a Booking with the specified id in the request
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  Booking.destroy({ where: { bookingId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.err(err);
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
      console.err(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

module.exports = {
  createBooking,
  findAllBookings,
  findBooking,
  findUserBookings,
  updateBooking,
  deleteBooking,
  deleteAllBookings,
};
