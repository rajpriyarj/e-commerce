var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
require('dotenv').config()

const database = require('./src/lib/database/connection')
var alert = require('./src/lib/alerting/sentry')

var categoryRouter = require('./routes/category');
var attributesRouter = require('./routes/attributes');
var productRouter = require('./routes/products')
var customerRouter = require('./routes/customer')
var orderRouter = require('./routes/orders')
var shoppingCartRouter = require('./routes/shoppingCart')

const startServer = () => {

    //alerting
    alert()

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //connect to database
    database.connect()


    app.use('/category', categoryRouter);
    app.use('/attributes', attributesRouter);
    app.use('/products', productRouter);
    app.use('/customer', customerRouter);
    app.use('/orders', orderRouter);
    app.use('/shoppingCart', shoppingCartRouter);

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

}

startServer()

module.exports = app;
