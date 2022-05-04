/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Liam Hubbard - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/05/2022
    Date Finished:
    Last Modified:

 -------DESCRIPTION-------

This is the booking controller which handles all the processing for sending email and SMS notifactions.

*/

//Vonage handles SMS
const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
    apiKey: "04f58499",
    apiSecret: "VYb751tKiyzIc62b"
});

//Nodemailer handles Email
const Nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "parkerUEA@gmail.com",
        pass: "Parker123//",
    },
});

const mailOptionsConfirmation = {
    from: 'NoReply from Parker <parkeruea@gmail.com>',
    to: email, //users email address
    subject: 'Parker Booking ' + bookingID,
    text: 'Hi ' + fName + ",\n\n" +
        'Thank you for using Parker \n'
};

const sendConfirmationEmail = async (req, res) =>{
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);// If an error is found it will be displayed to console
            res.status(500).send('ERR_INTERNAL_EXCEPTION')
        } else {
            console.log('Email sent: ' + info.response); //If email is successfully sent the console will show a confirmation message
            res.status(200).send('SUCCESS_EMAIL_SENT')
        }
    });
}
const sendSMS = async (req, res) =>{

}

module.exports = {
sendEmail,
sendSMS,
};
