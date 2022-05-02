const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.routes');
const bookingRouter = require('./routes/bookings.routes');
const paymentsRouter = require('./routes/payments.routes');
const usersRouter = require('./routes/users.routes');
const spacesRouter = require('./routes/spaces.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// sends correct response for CORS preflight
app.options('/*', (_, res) => {
  res.sendStatus(200);
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/bookings', bookingRouter);
app.use('/payments', paymentsRouter);
app.use('/spaces', spacesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;