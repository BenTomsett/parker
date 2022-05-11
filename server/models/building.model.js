/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 11/05/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the building model and is the foundation of a building 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
  }

  Building.init(
    {
      buildingId: {
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
      gpsPoint: {
        allowNull: false,
        type: DataTypes.GEOMETRY('Point'),
      },
    },
    {
      sequelize,
      tableName: 'Buildings',
      modelName: 'Building',
      indexes: [{ unique: true, fields: ['name'] }],
      // timestamps: false
    }
  );
  return Building
};
