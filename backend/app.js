const dotenv = require('dotenv')
dotenv.config()
// console.log(process.env.RIOT_API_KEY)
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://localhost:5432/tft_helper');

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// })()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const riotRouter = require('./routes/riotApi');
const app = express();

app.enable('trust proxy')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (req, res, next) {
//   if (process.env.NODE_ENV !== 'development' && !req.secure) {
//     return res.redirect('https://' + req.headers.host + req.url)
//   }

//   next();
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/riot', riotRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
