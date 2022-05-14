/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our booking request routes which handle all of our http requests.

*/

const express = require('express');

const BookingRequestController = require('../controllers/bookingrequests.controller');
const { authenticateUser, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Retrieve all bookings request
router.get(
  '/',
  authenticateUser,
  BookingRequestController.findAllBookingRequests
);

// Retrieve a single booking request
router.get(
    '/:bookingRequestId',
    authenticateUser,
    BookingRequestController.findBookingRequest
  );

// Retrieve all booking requests for a user
router.get(
    '/user/:userId',
    authenticateUser,
    verifyAdmin,
    BookingRequestController.findUserBookingRequests
  );

// Retrieve all booking requests for a user
router.post(
    '/findNextSpace',
    authenticateUser,
    verifyAdmin,
    BookingRequestController.findNextAvailableSpace
);

router.post(
    '/findAllSpaces',
    authenticateUser,
    verifyAdmin,
    BookingRequestController.findAllAvailableSpaces
);

// Create a new booking request
router.put(
  '/',
  authenticateUser,
  BookingRequestController.createBookingRequest
);

// Delete all booking requests
router.delete(
  '/',
  authenticateUser,
  BookingRequestController.deleteAllBookingRequests
);

// Update a booking request with the bookingRequestId
router.put(
  '/:bookingRequestId',
  authenticateUser,
  BookingRequestController.updateBookingReRequest
);

// Delete a booking request with the bookingRequestId
router.delete(
  '/:bookingRequestId',
  authenticateUser,
  BookingRequestController.deleteBookingRequest
);

// Delete a booking request with the bookingId
router.delete(
    '/',
    authenticateUser,
    BookingRequestController.deleteAllBookingRequests
  );

module.exports = router;
