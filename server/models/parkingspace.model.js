/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the parking space model and is the foundation of a user 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('./index');

const Zone = require('./zone.model');

class ParkingSpace extends Model {}

ParkingSpace.init(
  {
    spaceId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      // comment: 'This is a column name that has a comment'
    },
    zoneId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Zone,
        key: 'zoneId',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['OCCUPIED', 'AVAILABLE', 'RESERVED'],
      }),
    },
    gpsLat: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    gpsLong: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    tableName: 'ParkingSpaces',
    indexes: [
      { unique: 'parking_space_idx', fields: ['status', 'gpsLat', 'gpsLong'] },
    ],
    // timestamps: false
  }
);

module.exports = ParkingSpace;