const request = require('supertest');
const sequelize = require('../models/index');
const app = require('../app');
const User = require('../models/user.model');

// Test login data
const email = 'jane@example.com';
const incorrectEmail = 'john@example.com';
const password = 'HelloImJane!46';
const incorrectPassword = 'HelloImJohn!46';

describe('Parker User Login', () => {
  it('logs in account successfully', () =>
    request(app)
      .post('/auth/login')
      .send({ email, password })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));

  it('rejects incorrect email', () =>
    request(app)
      .post('/auth/login')
      .send({ email: incorrectEmail, password })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      }));

  it('rejects incorrect password', () =>
    request(app)
      .post('/auth/login')
      .send({ email, password: incorrectPassword })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      }));

  it('rejects incorrect email and password', () =>
    request(app)
      .post('/auth/login')
      .send({ email: incorrectEmail, password: incorrectPassword })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      })
      .catch((err) => {
        console.log(err);
      }));
});

// Test registration data
const testUser = {
  forename: 'John',
  surname: 'Doe',
  dob: '2002-04-29',
  email: 'jdoe@example.com',
  password: 'ThisIsATest!64',
  addressLine1: '1 Test Street',
  addressLine2: 'Exampletown',
  city: 'Demoton',
  postcode: 'DT1 2AB',
  country: 'United Kingdom',
};

describe('Parker User Registration', () => {
  it('registers account successfully', () =>
    request(app)
      .post('/auth/register')
      .send(testUser)
      .then((response) => {
        expect(response.statusCode).toBe(201);

        // verify user was created
        User.findAll({
          where: {
            email: 'jdoe@example.com',
          },
        }).then((users) => {
          expect(users.length).toBe(1);
        });
      }));

  it('rejects weak passwords', () =>
    request(app)
      .post('/auth/register')
      .send({ ...testUser, password: 'tooweak' })
      .then((response) => {
        expect(response.statusCode).toBe(400);

        // verify user was created
        User.findAll({
          where: {
            email: 'jdoe@example.com',
          },
        }).then((users) => {
          expect(users.length).toBe(0);
        });
      }));

  it('rejects users under 16', () =>
    request(app)
      .post('/auth/register')
      .send({ ...testUser, dob: '2007/01/01' })
      .then((response) => {
        expect(response.statusCode).toBe(400);

        // verify user was created
        User.findAll({
          where: {
            email: 'jdoe@example.com',
          },
        }).then((users) => {
          expect(users.length).toBe(0);
        });
      }));

  afterEach(() => {
    User.destroy({
      where: {
        email: 'jdoe@example.com',
      },
    });
  });
});

afterAll(() => sequelize.close());
