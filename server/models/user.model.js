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

const { Model } = require('sequelize');
const { hashPassword } = require('../utils/auth');
const { Stripe } = require('../config/stripe');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.BookingRequest, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

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
      isBanned: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stripeCustomerId: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "stripe",
      },
      paymentMethodId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      indexes: [{ unique: true, fields: ['email'] }],
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      // timestamps: false
    }
  );

  // Method 3 via the direct method
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.getDataValue('password'));
    const userEmail = user.getDataValue('email')
    const forename = user.getDataValue('forename')
    const surname = user.getDataValue('surname')

    const customer = await Stripe.customers.create({
        email: userEmail,
        name: `${forename} ${surname}`,
      });

    user.setDataValue('password', hashedPassword)
    user.setDataValue('stripeCustomerId', customer.id);
  });
  User.beforeUpdate(async (user, options) => {
    if (user.password) {
        const hashedPassword = await hashPassword(user.getDataValue('password'));
        user.setDataValue('password', hashedPassword)
    }
  });
  return User;
};
