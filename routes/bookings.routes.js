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

const router = express.Router();

// Create a new booking
router.post('/', BookingController.createBooking);

// Retrieve all bookings
router.get('/', BookingController.findAllBookings);

// Retrieve a single booking for a user
router.get('/:userId/:bookingId', BookingController.findBooking);

// Retrieve all bookings for a user
router.get('/:userId/bookings', BookingController.findUserBookings);

// Update a booking with the bookingId
router.put('/:userId/:bookingId', BookingController.updateBooking);

// Delete a product with the bookingId
router.delete('/:userId/:bookingId', BookingController.deleteBooking);

// Delete all bookings
router.delete('/', BookingController.deleteAllBookings);

module.exports = router;
