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

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class CarPark extends Model {

      static associate(models) {
          CarPark.hasMany(models.Zone, {
              foreignKey: 'carParkId',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            })
        }

  }

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
      numOfSpaces:{
          allowNull: false,
          type: DataTypes.INTEGER,
      },
      gpsPoint: {
          allowNull: false,
          type: DataTypes.GEOMETRY('Point')
      },
    },
    {
      sequelize,
      tableName: 'CarParks',
      modelName: 'CarPark',
      indexes: [{ unique: true, fields: ['name'] }],
      // timestamps: false
    }
  );
  return CarPark;
}
