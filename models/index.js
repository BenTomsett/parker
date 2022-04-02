/*  CMP5012B - Software Engineer - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 02/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------

This is our Postgres (sequelize) initisialisation file, this allows us to connect to our Postgres database.
We use the sequelize ORM to manage the connection and function calls to the DB.
*/

const { Sequelize } = require('sequelize');

const pg = require('pg');

const sequelize = new Sequelize('CMP5012B-G12-DB', 'webClient', 'password', {
  port: 5432,
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.sync();
// sequelize.sync({ force: true, match: /_test$/ });

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
