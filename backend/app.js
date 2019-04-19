var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var itemsRouter = require('./routes/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', itemsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send error
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
