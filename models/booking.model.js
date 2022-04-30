/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the booking model and is the foundation of a booking 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('./index');

const User = require('./user.model');
const CarPark = require('./carpark.model');

class Booking extends Model {}

Booking.init(
  {
    bookingId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      // comment: 'This is a column name that has a comment'
    },
    carParkId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: CarPark,
        key: 'carParkId',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    spaceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bookingType: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['USER', 'EVENT', 'RESTRICTION'],
      }),
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    duration: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    checkedIn: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    checkedOut: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: 'Bookings',
    indexes: [
      {
        unique: 'booking_idx',
        fields: ['bookingType', 'startDate', 'duration'],
      },
    ],
    // timestamps: false
  }
);

module.exports = Booking;
