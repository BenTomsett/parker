/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the user model and is the foundation of a user 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class User extends Model {}

User.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      // comment: 'This is a column name that has a comment'
    },
    forename: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    dob: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    addressLine2: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postcode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    indexes: [{ unique: true, fields: ['email'] }],
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    // timestamps: false
  }
);

module.exports = User;
