/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 12/05/2022
    Date Finished: 
    Last Modified: 
 -------DESCRIPTION-------

*/

const cron = require('node-cron');
const BookingController = require('../controllers/bookings.controller');
const ParkingSpacesController = require('../controllers/spaces.controller');


const task = cron.schedule('*/60 * * * *', () => {
  BookingController.findOverstayedBookings();
  BookingController.findNonArrivalBookings();
  ParkingSpacesController.setReservedSpaces();
});

task.start();
