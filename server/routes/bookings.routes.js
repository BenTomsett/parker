/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

These are our booking routes which handle all of our http requests.

*/

const express = require('express');

const BookingController = require('../controllers/bookings.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// Retrieve all bookings
router.get('/', authenticateUser, BookingController.findAllBookings);

// Create a new booking
router.put('/', authenticateUser, BookingController.createBooking);

// Delete all bookings
router.delete('/', authenticateUser, BookingController.deleteAllBookings);

// Retrieve a single booking
router.get(
  '/:bookingId',
  authenticateUser,
  BookingController.findBooking
);

// Update a booking with the bookingId
router.put(
  '/:bookingId',
  authenticateUser,
  BookingController.updateBooking
);

// Delete a booking with the bookingId
router.delete(
  '/:bookingId',
  authenticateUser,
  BookingController.deleteBooking
);

// Check in user to their booking
router.put(
  '/:bookingId/checkin',
  authenticateUser,
  BookingController.updateBooking
);

// Retrieve all bookings for a car park
router.get(
  '/carpark/:carparkId',
  authenticateUser,
  BookingController.findCarParkBookings
);

// Retrieve all bookings for 24h for a car park
router.get(
  '/carpark/:carparkId/status',
  authenticateUser,
  BookingController.findCarPark24HBookings
);

// Retrieve all bookings for a user
router.get(
  '/user/:userId',
  authenticateUser,
  BookingController.findUserBookings
);


module.exports = router;
