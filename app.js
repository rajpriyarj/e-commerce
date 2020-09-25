var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const database = require('./src/lib/database/database')
let alert = require('./src/lib/alerting/sentry')

let categoryRouter = require('./routes/category');
let attributesRouter = require('./routes/attributes');
let productRouter = require('./routes/products');
let customerRouter = require('./routes/customer');
let orderRouter = require('./routes/orders');
let shoppingCartRouter = require('./routes/shoppingCart');

const startServer = () => {
  alert()
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // connect to database
  database.connect()

  app.use('/category', categoryRouter);
  app.use('/attributes', attributesRouter);
  app.use('/products', productRouter);
  app.use('/customer', customerRouter);
  app.use('/orders', orderRouter);
  app.use('/shoppingCart', shoppingCartRouter);

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
}

startServer()
module.exports = app;



module.exports = app;
