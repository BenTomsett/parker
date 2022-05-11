/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 11/05/2022
    Date Finished: 
    Last Modified: 
 -------DESCRIPTION-------
This is the booking request model and is the foundation of a booking request'object' this is where we define all data types and needed
structures for our postgres database through sequelize.
*/

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class BookingRequest extends Model {

    static associate(models) {
      BookingRequest.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      BookingRequest.belongsTo(models.Building, {
        foreignKey: 'buildingId'
      })
    }

  }

  BookingRequest.init(
    {
      bookingRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
        // comment: 'This is a column name that has a comment'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'BookingRequest',
      modelName: 'BookingRequest',
      indexes: [
        {
          unique: 'bookingrequest_idx',
          fields: ['userId', 'buildingId', 'startDate', 'endDate'],
        },
      ],
      // timestamps: false
    }
  );
  return BookingRequest;
}