/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the BookingReRequest controller which handles all the processing of data to do with BookingReRequests.
It involves all database interactions and has all the CRUD functions that are accessed from
the BookingReRequests routes.

*/
const db = require('../models/index');


const { BookingRequest } = db;

// Create and Save a new BookingReRequest
const createBookingRequest = async (req, res) => {
  console.log(req.body);
  BookingRequest.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_BookingReRequest_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        console.log(err.message);
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Retrieve all BookingReRequests from the database.
const findAllBookingRequests = async (req, res) => {

  BookingRequest.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find a single BookingReRequest with the BookingReRequest id
const findBookingRequest = async (req, res) => {
  const BookingReRequestID = req.params.BookingReRequestId;

  BookingRequest.findByPk(BookingReRequestID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Find BookingRequests for a specific user
const findUserBookingRequests = async (req, res) => {
  const { userId } = req.params;

  BookingRequest.findAll({ where: { userId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Update a BookingRequest by the id in the request
const updateBookingReRequest = async (req, res) => {
  const { bookingReRequestId } = req.params;

  BookingRequest.update(req.body, { where: { bookingReRequestId } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('ERR_BookingReRequest_EXISTS');
      } else if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
};

// Delete a BookingReRequest with the specified id in the request
const deleteBookingRequest = async (req, res) => {
  const { bookingRequestId } = req.params;

  BookingRequest.destroy({ where: { bookingRequestId } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
};

// Delete all BookingReRequests from the database.
const deleteAllBookingRequests = async (req, res) => {
  BookingRequest.destroy({
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
  createBookingRequest,
  findAllBookingRequests,
  findBookingRequest,
  findUserBookingRequests,
  updateBookingReRequest,
  deleteBookingRequest,
  deleteAllBookingRequests,
};
