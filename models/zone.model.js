/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the zone model and is the foundation of a zone 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('./index');

const CarPark = require('./carpark.model');

class Zone extends Model {}

Zone.init(
  {
    zoneId: {
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
    name: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    spaces: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'Zones'
    // timestamps: false
  }
);

module.exports = Zone;
