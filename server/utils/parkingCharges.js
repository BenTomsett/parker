/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Liam Hubbard - Group 12
    IDE Version: Jetbrains Webstorm
    Current Version: Managed by GitHub
    Date Created: 09/05/2022
    Date Finished:
    Last Modified: 09/05/2022 - Liam H

 -------DESCRIPTION-------

This is the parking charge util which handles all functions relating to calculating booking costs

 */

function calculateParkingCharge(Booking){
    const flatRate = 3.50
    const duration = Math.abs(Booking.endDate - Booking.startDate) / 36e5 // Calculates duration in hours
    return (duration * flatRate).toFixed(2)
}

function hasUserPaid(Booking){
    return Booking.hasPaid === true;
}

module.exports = {
    calculateParkingCharge,
    hasUserPaid,
}
