
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());

var createError = require('http-errors');
var path = require('path');

// staticPages
app.use(express.static(path.join(__dirname, '../public')));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

var apiPaths = require('../libs/apiPaths');
app.use(apiPaths.demo, require('../routes/demo'));
app.use(apiPaths._base, require('../routes/controller'));
app.use(apiPaths._base, require('../libs/swaggerUI'));

// session support
app.response.message = function (msg) {
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// session support
var session = require('express-session');
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}));

// allow overriding methods in query (?_method=put)
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


// assume 500 since no middleware responded
// app.use(function(req, res, next){
//   res.status(500).render('5xx');
// });
// // assume 400 since no middleware responded
// app.use(function(req, res, next){
//   res.status(404).render('4xx', { url: req.originalUrl });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Declaring Components
// var swaggerDocument = require('../routes/swaggerUi/swagger');
// require('../routes/swaggerUi/swagger');

module.exports = app;