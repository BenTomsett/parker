/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 03/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the booking controller which handles all the processing of data to do with bookings.
It involves all database interactions and has all the CRUD functions that are accessed from
the bookings routes.

*/
const { Op } = require('sequelize');
const db = require('../models/index');
const { checkParkedLocation } = require('../utils/checkLocation');

const {
  sendBookingApprovedEmail,
  sendOverstayEmail,
  sendNonArrivalEmail,
  sendBookingConfirmationEmail,
} = require('../utils/notifications');
const { Stripe } = require('../config/stripe');
const { calculateParkingCharge } = require('../utils/parkingCharges');

const { Booking, ParkingSpace, CarPark } = db;

// Create and Save a new Booking
const createBooking = async (req, res) => {
  const booking = req.body;

  Booking.create(booking, {
    fields: [
      'carParkId',
      'spaceId',
      'bookingType',
      'userId',
      'startDate',
      'endDate',
      'cost',
    ],
  }).then(async (data) => {
    const amount = calculateParkingCharge(data) * 100;

    const user = await data.getUser();
    console.log(user);

    try {
      await Stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
        customer: user.stripeCustomerId,
        payment_method: user.paymentMethodId,
        off_session: true,
        confirm: true,
        receipt_email: user.email,
      });
      await sendBookingApprovedEmail(data);
      res.status(200).send(data);
      await sendBookingConfirmationEmail(data);
    } catch (err) {
      await data.destroy();
      res.status(402).send('ERR_PAYMENT_FAILED');
    }
  }).catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('ERR_BOOKING_EXISTS');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).send('ERR_DATA_MISSING');
    } else {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    }
  });
};

//Create restricted bookings
const createRestrictedBooking = async (req, res) => {
  const booking = req.body;

  Booking.create(booking, {

  }).then((data) => {
    try {
      res.status(200).send(data);
    } catch (err) {
    }
  }).catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('ERR_BOOKING_EXISTS');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).send('ERR_DATA_MISSING');
    } else {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    }
  });
}

// Retrieve all bookings from the database.
const findAllBookings = async (req, res) => {
  const { isAdmin } = req.user;
  Booking.findAll({
    ...(!isAdmin && {
      where: {
        userId: isAdmin ? '' : req.user.userId,
      },
    }),
    include: [
      { model: ParkingSpace, include: [CarPark] },
    ],
    order: [
      ['bookingId', 'ASC'],
    ],
  }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

// Find a single booking with the booking id
const findBooking = async (req, res) => {
  const bookingID = req.params.bookingId;

  Booking.findByPk(bookingID).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

// Find bookings for a specific user
const findUserBookings = async (req, res) => {
  const { userId } = req.params;
  Booking.findAll({ where: { userId } }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};


// Find restricted space bookings
const findRestrictedBookings = async (req, res) => {
   Booking.findAll({ where: {bookingType:"RESTRICTION"},include: [
       { model: ParkingSpace, include: [CarPark] },
     ],}).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};


// Find bookings for a specific car park
const findCarParkBookings = async (req, res) => {
  const { carParkId } = req.params;

  Booking.findAll({ where: { carParkId } }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

// Find bookings for a specific car park
const findCarPark24HBookings = async (req, res) => {
  const { carParkId } = req.params;

  Booking.findAll({
    where: {
      carParkId,
      startDate: {
        [Op.lt]: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    },
  }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

// Find bookings for a specific car park
const findOverstayedBookings = async () => {
  Booking.findAll({
    where: {
      endDate: {
        [Op.gte]: new Date(Date.now() + 1 * 60 * 60 * 1000 - 15 * 60 * 1000),
        [Op.lte]: new Date(Date.now() + 1 * 60 * 60 * 1000),
      },
      checkedIn: {
        [Op.eq]: true,
      },
      checkedOut: {
        [Op.eq]: false,
      },
    },
  }).then((bookings) => {
    bookings.forEach((booking) => {
      sendOverstayEmail(booking);
    });
  }).catch((err) => {
    console.error(err);
  });
};

// Find bookings past their arrival dates
const findNonArrivalBookings = async () => {
  Booking.findAll({
    where: {
      startDate: {
        [Op.gte]: new Date(Date.now() + 1 * 60 * 60 * 1000 - 15 * 60 * 1000),
        [Op.lte]: new Date(Date.now() + 1 * 60 * 60 * 1000),
      },
      checkedIn: {
        [Op.eq]: false,
      },
      checkedOut: {
        [Op.eq]: false,
      },
    },
  }).then((bookings) => {
    bookings.forEach((booking) => {
      sendNonArrivalEmail(booking);
    });
  }).catch((err) => {
    console.error(err);
  });
};

// Update a booking by the id in the request
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;

  Booking.update(req.body, { where: { bookingId } }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('ERR_BOOKING_EXISTS');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).send('ERR_DATA_MISSING');
    } else {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    }
  });
};

// Checkin a booking by the id in the request
const checkInBooking = async (req, res) => {
  const { bookingId, userGpsLong, userGpsLat } = req.body;
  console.log(req.body);

  let booking = null;
  let parkingSpace = null;
  const location = { userGpsLong, userGpsLat };

  await Booking.findByPk(bookingId).then((bookingData) => {
    booking = bookingData;
    ParkingSpace.findByPk(booking.spaceId).then((parkingData) => {
      parkingSpace = parkingData;
      const correctLocation = checkParkedLocation(location, parkingSpace);

      if (correctLocation) {
        Booking.update({ checkedIn: true },
          {
            where: { bookingId },
            include: [
              { model: ParkingSpace, include: [CarPark] },
            ],
            returning: true,
            plain: true,
          }).
          then((data) => {
            res.status(200).send(data);
          }).
          catch((err) => {
            if (err.name === 'SequelizeValidationError') {
              res.status(400).send('ERR_DATA_MISSING');
            } else {
              console.error(err);
              res.status(500).send('ERR_INTERNAL_EXCEPTION');
            }
          });
      } else {
        res.status(401).send('ERR_INCORRECT_LOCATION');
      }
    }).catch((err) => {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    });
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

const checkOutBooking = (req, res) => {
  const { bookingId } = req.body;

  Booking.update({ checkedOut: true },
    {
      where: { bookingId },
      include: [
        { model: ParkingSpace, include: [CarPark] },
      ],
      returning: true,
      plain: true,
    }).
    then((data) => {
      res.status(200).send(data);
    }).
    catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).send('ERR_DATA_MISSING');
      } else {
        console.error(err);
        res.status(500).send('ERR_INTERNAL_EXCEPTION');
      }
    });
}

// Delete a Booking with the specified id in the request
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  Booking.destroy({ where: { bookingId } }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

// Delete all Bookings from the database.
const deleteAllBookings = async (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false,
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('ERR_INTERNAL_EXCEPTION');
  });
};

module.exports = {
  createBooking,
  findAllBookings,
  findBooking,
  findUserBookings,
  findCarParkBookings,
  findCarPark24HBookings,
  findOverstayedBookings,
  findNonArrivalBookings,
  updateBooking,
  checkInBooking,
  checkOutBooking,
  deleteBooking,
  deleteAllBookings,
  findRestrictedBookings,
  createRestrictedBooking,
};
