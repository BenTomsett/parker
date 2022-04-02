/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is the administrator user model and is the foundation of a administrator user 'object' this is where we define all data types and needed
structures for our postgres database through sequelize.

*/

const sequelize = require('./index');
const User = require('./user.model');

class AdminUser extends User {}

AdminUser.init(
  {},
  {
    tableName: 'AdminUsers',
    // timestamps: false
  },
  { sequelize }
);

module.exports = AdminUser;
