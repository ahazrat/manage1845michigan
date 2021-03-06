// set environment variables
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./passport/init');
var expressSession = require('express-session');
var mongoose = require('mongoose');

var app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));    // uncomment after placing your favicon in /public

// set database dev
if (app.get('env') === 'development') {
 // app.use(express.errorHandler());
 mongoose.connect('mongodb://localhost/Users');
}

// set authentication
app.use(expressSession({secret: 'Grumpy Cat'}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// set routes
var routes = require('./routes/index')(passport);
app.use('/', routes);
// var users = require('./routes/users');
// app.use('/users', users);
// app.get('/', function (req, res) {
//   res.render('index');
// });

// catch 404 set error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// export app
module.exports = app;
