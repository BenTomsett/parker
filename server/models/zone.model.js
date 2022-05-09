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

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class Zone extends Model {

    static associate(models) {
        Zone.belongsTo(models.CarPark, {
            foreignKey: 'carParkId'
        })
        Zone.hasMany(models.ParkingSpace, {
            foreignKey: 'zoneId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          })
      }

}

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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    spaces: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'Zones',
    modelName: 'Zone',
    // timestamps: false
  }
);

module.exports = Zone;
