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

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class ParkingSpace extends Model {

    static associate(models) {
        ParkingSpace.belongsTo(models.Zone, {
            foreignKey: 'zoneId'
        })
      }

}

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
    status: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['OCCUPIED', 'AVAILABLE', 'RESERVED'],
      }),
    },
    gpsPolygon: {
        allowNull: false,
        type: DataTypes.GEOMETRY('Polygon')
    },
  },
  {
    sequelize,
    tableName: 'ParkingSpaces',
    modelName: 'ParkingSpace',
    indexes: [
      { unique: 'parking_space_idx', fields: ['status', 'gpsPolygon'] },
    ],
    // timestamps: false
  }
);

module.exports = ParkingSpace;
