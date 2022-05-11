const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.routes');
const bookingRouter = require('./routes/bookings.routes');
const paymentsRouter = require('./routes/payments.routes');
const usersRouter = require('./routes/users.routes');
const spacesRouter = require('./routes/spaces.routes');
const zonesRouter = require('./routes/zones.routes');
const carparkRouter = require('./routes/carparks.routes');
const buildingRouter = require('./routes/buildings.routes');
const bookingRequestRouter = require('./routes/bookingrequests.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: true,
}));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/users', usersRouter);
app.use('/api/zones', zonesRouter);
app.use('/api/carparks', carparkRouter);
app.use('/api/buildings', buildingRouter);
app.use('/api/bookingRequests', bookingRequestRouter);

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
