/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Liam Hubbard - Group 12
    IDE Version: Jetbrains Webstorm
    Current Version: Managed by GitHub
    Date Created: 02/05/2022
    Date Finished:
    Last Modified: 11/05/2022 - Liam H

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
const SMSaccountSid = 'AC8abf3b30e34158ff4bd3e858e22d7a7f'; // Account SID
const SMSauthToken = 'ff5d34e0ef5738ebccc5d94d88791511'; // Auth Token

const twilio = require('twilio');
const SMSclient = new twilio(SMSaccountSid, SMSauthToken);

//Nodemailer handles Email
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "parkeruea@gmail.com",
        pass: "Parker123//",
    },
});

const sendBookingConfirmationEmail = async (BookingRequest) => {

    const user = await BookingRequest.getUser();

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: user.email, //users email address
        subject: 'Parker Booking Request ' + BookingRequest.bookingRequestId,
        text: 'Hi ' + user.forename + ",\n" +
            'Thank you for using Parker your booking request has been received. \n'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
    mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: 'parkeruea@gmail.com', //users email address
        subject: 'Parker Booking Request ' + BookingRequest.bookingRequestId,
        text: 'Hi, \n' +
            user.forename + ' ' + user.surname + ' has requested a booking you will find this in your admin panel'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Admin Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}


const sendBookingApprovedEmail = async (Booking) => {
    
    const user = await Booking.getUser();

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: user.email, //users email address
        subject: 'Parker Booking ' + Booking.bookingId,
        text: 'Hi ' + user.forename + ',\n' +
             'Your booking ' + Booking.bookingId + ' has been approved.\n'
            + 'Thank you for using parker'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
    mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: 'parkeruea@gmail.com', //users email address
        subject: 'Parker Booking ' + Booking.bookingId,
        text: 'Hi, \n\n' +
            user.forename + ' ' + user.surname + ' has booked Space: ' + Booking.spaceId + ' at Car park: ' + Booking.ParkingSpace.carParkId
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Admin Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}

const sendBookingDeniedEmail = async (BookingRequest) => {

    const user = await BookingRequest.getUser();

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: user.email, //users email address
        subject: 'Parker Booking Request ' + BookingRequest.bookingRequestId,
        text: 'Hi ' + user.forename + ",\n" +
            'Your booking ' + BookingRequest.bookingRequestId + ' has been denied, You will be refunded shortly.\n' +
            'Thank you for using Parker'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}

const sendNonArrivalEmail = async (Booking) => {

    const user = await Booking.getUser();

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: user.email, //users email address
        subject: 'Parker - Missed booking for booking: ' + Booking.bookingId,
        text: 'Hi ' + user.forename + ",\n" +
            'you have not shown up for your reservation at space: ' + Booking.spaceId + ' \n' +
            ' Unfortunately you will still be charged! \n'+
            'Thank you for using Parker'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('User Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
    mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: 'parkeruea@gmail.com', //users email address
        subject: 'Parker - Missed booking for booking: ' + Booking.bookingId,
        text: 'Hi, \n\n' +
            user.forename + ' ' + user.surname + ' has not shown up for their reservation at space: ' + Booking.spaceId
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Admin Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}
const sendNonArrivalSMS = async (Booking) => {

    const user = await Booking.getUser();

    SMSclient.messages
        .create({
            body: 'Hello ' + user.forename +
                'Your booking ' + Booking.bookingId + 'for ' + Booking.startDate + ' at parking space' + Booking.spaceId + ' is due to expire!',
            to: '+447923829420', // Text this number
            from: '+447923829420', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}
const sendOverstayEmail = async (Booking) => {

    const user = await Booking.getUser();

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: user.email, //users email address
        subject: 'Parker - Overstay Warning - ' + Booking.bookingId,
        text: 'Hi ' + user.forename + ",\n" +
            'Your vehicle has now past its allocated time slot for booking: ' +  Booking.bookingId + '\n'
            + ' Please move your vehicle ASAP or you will be charged.'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
    mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: 'parkeruea@gmail.com', //users email address
        subject: 'Parker - Overstay Warning - ' + Booking.bookingId,
        text: 'Hi, \n\n' +
            user.forename + ' ' + user.surname + ' has now past their allocated time slot for booking: ' + Booking.bookingId
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Admin Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}
const sendOverstaySMS = async (Booking) => {

    const user = await Booking.getUser();

    SMSclient.messages
        .create({
            body: 'Hello ' + Booking.forename +
                'Your booking ' + Booking.bookingId + 'for ' + Booking.startDate + ' at parking space' + Booking.spaceId + ' is due to expire!',
            to: user.telNum, // Text this number
            from: '+447923829420', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}

const sendUserRegistrationEmail = async (User) => {

    let mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: User.email, //users email address
        subject: 'Welcome to Parker ' + User.forename + '!',
        text: 'Hi ' + User.forename + ",\n" +
            'Your account has been successfully created!\n'
            + 'Thank you for using parker!'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}

const sendUserInWrongSpaceEmail = async (Booking) => {

    const user = await Booking.getUser();
    const parkingSpace = await Booking.getParkingSpace();

    const mailOptionsConfirmation = {
        from: 'NoReply from Parker <parkeruea@gmail.com>',
        to: 'parkeruea@gmail.com', //users email address
        subject: 'Parker - User in Wrong Space Warning: - ' + Booking.bookingId,
        text: 'Hi, \n' +
            user.forename + ' ' + user.surname + ' has not parked in the correct location for the booking: ' + Booking.bookingId + '.' +
            'They should be parked in the following location, ' + carPark.name + ', space number: ' + parkingSpace.spaceNo + '.'
    };
    await transporter.sendMail(mailOptionsConfirmation, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
        } else {
            console.log('Admin Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
        }
    });
}


module.exports = {
    sendBookingConfirmationEmail,
    sendOverstaySMS,
    sendOverstayEmail,
    sendNonArrivalSMS,
    sendNonArrivalEmail,
    sendBookingApprovedEmail,
    sendBookingDeniedEmail,
    sendUserRegistrationEmail,
    sendUserInWrongSpaceEmail
};
