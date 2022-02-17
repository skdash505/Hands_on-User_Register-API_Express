var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var router = express.Router();

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// staticPages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var usersRouter = require('./routes/demo');
app.use('/demo', usersRouter);

module.exports = app;


//Declaring Components
var swaggerDocument = require('./routes/swaggerUi/swagger');
var controllers = require('./routes/controllers/controllers');

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
  