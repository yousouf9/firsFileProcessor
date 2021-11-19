var createError = require('http-errors');
const compression = require('compression');
const cors = require('cors');
var express = require('express');
const winston = require('winston');
const { format } = require('winston');
  // require('winston-mongodb');
  require('express-async-errors');
var path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
const logger1 = winston.createLogger({

  format:format.combine(
      winston.format.json(),
      format.prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports:[
      new winston.transports.File({ filename: 'error.log', level: 'error', }),
      new winston.transports.File({ filename: 'uncaughtExceptions.log', handleExceptions:true, }),
  ],
  
})



process.on('unhandledRejection', (ex) => {
  throw ex;
});


//check if the app is running on developement mode and print errors on the console

if (process.env.NODE_ENV !== 'production') {
  winston.add(new winston.transports.Console({
  format: format.combine(
      format.colorize(),
      format.simple(),
      format.prettyPrint(),
      format.timestamp(),
  ),

  }));
}

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set up session
app.set('trust proxy', 1);
app.use(session({
  secret: "process.env.SECRET_KEY",
  resave: false,
  saveUninitialized: true
}));

//Flashing messages unto request object.


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Have some helpers available in the template.
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(compression())
app.use(cors());
require('./startup/db');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  winston.error(err.message, err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
