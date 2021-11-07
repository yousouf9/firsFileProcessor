var createError = require('http-errors');
var express = require('express');
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set up session
app.use(session({
  secret: "process.env.SECRET_KEY",
  resave: false,
  saveUninitialized: false
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
