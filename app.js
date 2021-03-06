var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://mqttserver:qwerty@proton.it.kmitl.ac.th:27017/mqttserver');

var db = require('./routes/connectMongo');
var routes = require('./controller/index');
var demo = require('./controller/demo');
var login = require('./controller/login');
var user = require('./controller/user');
var signup = require('./controller/signup');
var newuser = require('./routes/newuser');
var pricing = require('./routes/pricing');
var doc = require('./controller/doc');
// var showData = require('./routes/showData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(session({
  secret: 'mqttitbroker',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/demo', demo);
app.use('/signup', signup);
app.use('/loginPage', login);
app.use('/user', user);
app.use('/newuser', newuser);
app.use('/pricing', pricing);
app.use('/doc', doc);
// app.use('/showData', showData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
