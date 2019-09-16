var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require("mongoose");

var app = express();
var apiRouter = require('./routes/api');

const Suggestion = require('./models/suggestions')
//mongoose connection
mongoose.connect('mongodb://localhost:27017/J_community', (err) => {
	if(err) return console.error(err);
	console.log("mongoose connected!!");
})

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../fe', 'dist')));

app.use(cors()); // 8080과 3000이 같이 구동되기 위해 필요
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({msg: err.message});
});

module.exports = app;
