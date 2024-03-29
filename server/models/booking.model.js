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

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Booking extends Model {

    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Booking.belongsTo(models.ParkingSpace, {
        foreignKey: 'spaceId'
      })
    }

  }

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
      bookingType: {
        allowNull: false,
        type: DataTypes.ENUM({
          values: ['USER', 'EVENT', 'RESTRICTION'],
        }),
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      checkedIn: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      checkedOut: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cost: {
        allowNull: true,
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      tableName: 'Bookings',
      modelName: 'Booking',
      indexes: [
        {
          unique: 'booking_idx',
          fields: ['userId', 'bookingType', 'startDate', 'endDate'],
        },
      ],
      // timestamps: false
    }
  );
  return Booking;
}