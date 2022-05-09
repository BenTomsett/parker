/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Liam Hubbard - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/05/2022
    Date Finished:
    Last Modified:

 -------DESCRIPTION-------

This is the booking util which handles all the processing for sending email and SMS notifications.

*/

// //Vonage handles SMS
// const Vonage = require('@vonage/server-sdk');
// const vonage = new Vonage({
//     apiKey: "04f58499",
//     apiSecret: "VYb751tKiyzIc62b"
// });

//Twilio SMS
const SMSaccountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Account SID
const SMSauthToken = 'your_auth_token'; // Auth Token

const twilio = require('twilio');
const SMSclient = new twilio(SMSaccountSid,SMSauthToken);

//Nodemailer handles Email
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "parkerUEA@gmail.com",
        pass: "Parker123//",
    },
});



const sendBookingConfirmationEmail = async (bookingID,firstName,email) => {
    const mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: email, //users email address
        subject: 'Parker Booking ' + bookingID,
        text: 'Hi ' + firstName + ",\n\n" +
            'Thank you for using Parker \n'
    };
    await transporter.sendBookingConfirmationEmail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}
const sendNonArrivalEmail = async (bookingID,firstName,email,bookingDate,arrivalTime,parkingSpace,vehicleReg) => {
    const mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: email, //users email address
        subject: 'Parker - Missed booking for vehicle: ' + vehicleReg,
        text: 'Hi ' + firstName + ",\n\n" +
            'you have not shown up for your reservation at: ' + parkingSpace +' \n' +
           ' Unfortunately you will still be charged!'
    };
    await transporter.sendNonArrivalEmail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}
const sendOverstayEmail = async (bookingID,firstName,email,checkOutTime,parkingSpace,vehicleReg) => {
    const mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: email, //users email address
        subject: 'Parking Overstay Warning - ' + vehicleReg,
        text: 'Hi ' + firstName + ",\n\n" +
            'your vehicle has now past its allocated time slot for booking:  \n' +
            bookingID + ' Please move your vehicle asap or you will be charged'
    };
    await transporter.sendOverstayEmail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}
const sendOverstaySMS = async (bookingID,firstName,telNum,bookingDate,parkingSpace) =>{
    SMSclient.messages
        .create({
            body: 'Hello ' + firstName +
            'Your booking ' + bookingID + 'for ' + bookingDate + ' at parking space' + parkingSpace + ' is due to expire!' ,
            to: telNum, // Text this number
            from: '12345679810', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}

function checkOverstay(checkOutTime){
    let curDate = new Date();
    return checkOutTime < curDate.getTime();
}
function checkCurrentSpace(bookedSpace,currentSpace){
    return currentSpace !== bookedSpace
}

module.exports = {
sendBookingConfirmationEmail,
sendOverstaySMS,
sendOverstayEmail,
checkOverstay,
sendNonArrivalEmail,
checkCurrentSpace
};
