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

const { sendOverstayEmail, sendNonArrivalEmail } = require('./notifications');

const task = cron.schedule('*/15 * * * *', () => {
  const overstayBookings = BookingController.findOverstayedBookings();
  const nonArrivalBookings = BookingController.findNonArrivalBookings();

  overstayBookings.forEach((booking) => {
    sendOverstayEmail(booking);
  });

  nonArrivalBookings.forEach((booking) => {
    sendNonArrivalEmail(booking);
  });
});

task.start();
