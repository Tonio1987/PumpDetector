// CONFIGURE ENV
require('dotenv').config();

// NOTIFIER
var Push = require( 'pushover-notifications' );

// SET ENV VARIABLES
// LOG SYSTEM
var log4js = require('log4js');
var loggerjs = log4js.getLogger();
loggerjs.level = 'debug';

// NODE MODULE CALL
const moment = require('moment');
const cron = require('node-cron');

// START
loggerjs.info('************************************************************************');
loggerjs.info('*****************            - FonZzTonio -            *****************');
loggerjs.info('********************      --------------------      ********************');
loggerjs.info('************************     PUMP DETECTOR      ************************');
loggerjs.info('********************      --------------------      ********************');
loggerjs.info('*****************               2019 (c)               *****************');
loggerjs.info('************************************************************************');
loggerjs.info('------> Starting server ...  ');

// CALL MODULES
loggerjs.info('------> Call modules ...  ');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// INIT EXPRESS APP
loggerjs.info('------> Init Express app ...  ');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

loggerjs.info('-------> Scheduler initialization ...  ');
const CTRL_CronScheduler = require('./controller/backend/cron_controller/CTRL_CronScheduler');
CTRL_CronScheduler.Init_CronScheduler();

loggerjs.info('-------> Main Scheduler initialization ...  ');
cron.schedule('*/10 * * * * *', () => {
    CTRL_CronScheduler.Reload_CronScheduler();
});

loggerjs.info('-------> Notify Users Server on ...  ');

// INIT APP
let p = new Push( {
  user: process.env['PUSHOVER_USER'],
  token: process.env['PUSHOVER_TOKEN'],
});

let msg = {
  message: 'Pump Detector - Serve is RUNNING !',	// required
  title: "Pump Detector - Serve is RUNNING !",
  sound: 'magic',
  device: '*',
  priority: 1
};

p.send( msg, function( err, result ) {
  if ( err ) {
    throw(err);
  }
});


loggerjs.info('-------> Routes initialization ...  ');

// CALL ROUTES
var indexRouter = require('./routes/index');
var notifyRouter = require('./routes/notify');
var settingsRouter = require('./routes/settings');

app.use('/', indexRouter);
app.use('/notify', notifyRouter);
app.use('/settings', settingsRouter);

loggerjs.info('-------> Server started !');

/*
TEST ZONE
 */


const CTRL_TEST = require('./controller/backend/api_controller/CTRL_Candles');
CTRL_TEST.LoadCandles();

module.exports = app;
