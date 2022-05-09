const {
  Model, Deferrable
} = require('sequelize');

const User = require('./user')

module.exports = (sequelize, DataTypes) => {
  class UserTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        UserTest.belongsTo(models.User, {
            foreignKey: 'userId'
        })
    }
  }
  UserTest.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'userId',
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    }, {
    sequelize,
    modelName: 'UserTest',
  });
  return UserTest;
};