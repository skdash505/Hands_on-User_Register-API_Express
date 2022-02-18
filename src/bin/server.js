var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');

var express = require('express');
var router = express.Router();

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// staticPages
app.use(express.static(path.join(__dirname, '../public')));


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

var apiPaths = require('../routes/apiPaths');
app.use(apiPaths.demo, require('../routes/demo'));
app.use(apiPaths._base, require('../routes/controller'));
app.use(apiPaths._base, require('../routes/swaggerUi/swagger'));


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
  

//Declaring Components
// var swaggerDocument = require('../routes/swaggerUi/swagger');
// require('../routes/swaggerUi/swagger');
