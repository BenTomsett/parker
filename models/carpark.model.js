/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the car park model and is the foundation of a car park 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class CarPark extends Model {}

CarPark.init(
  {
    carParkId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      // comment: 'This is a column name that has a comment'
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    zones: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  {
    sequelize,
    tableName: 'Users',
    indexes: [{ unique: true, fields: ['email'] }],
    // timestamps: false
  }
);

module.exports = CarPark;
