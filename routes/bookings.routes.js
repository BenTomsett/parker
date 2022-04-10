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

// Create a new booking
router.post('/', authenticateUser, BookingController.createBooking);

// Retrieve all bookings
router.get('/', authenticateUser, BookingController.findAllBookings);

// Retrieve a single booking for a user
router.get('/:userId/:bookingId', authenticateUser, BookingController.findBooking);

// Retrieve all bookings for a user
router.get('/:userId/bookings', authenticateUser,  BookingController.findUserBookings);

// Retrieve all bookings for a car park
router.get('/:carparkId/bookings', authenticateUser, BookingController.findCarParkBookings);

// Retrieve all bookings for 24h for a car park
router.get('/:carparkId/status', authenticateUser, BookingController.findCarPark24HBookings);

// Update a booking with the bookingId
router.put('/:userId/:bookingId', authenticateUser, BookingController.updateBooking);

// Delete a product with the bookingId
router.delete('/:userId/:bookingId', authenticateUser, BookingController.deleteBooking);

// Delete all bookings
router.delete('/', authenticateUser, BookingController.deleteAllBookings);

module.exports = router;
