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
    logger.error('*** CONTROLLER *** ->  Push Notifications ... [ FAILED ]');
  }
});


loggerjs.info('-------> Routes initialization ...  ');

// CALL ROUTES
var homeRouter = require('./routes/home');
var lastNotificationsRouter = require('./routes/last_notifications');
var pairsRouter = require('./routes/pairs');
var settingsRouter = require('./routes/settings');

app.use('/', homeRouter);
app.use('/last_notifications', lastNotificationsRouter);
app.use('/pairs', pairsRouter);
app.use('/settings', settingsRouter);

// CALL REST API ROUTES
var REST_LastNotificationsRouter = require('./routes/rest_api/last_notif/LastNotification');
var REST_settings = require('./routes/rest_api/settings/list_Settings');
var REST_editSettings = require('./routes/rest_api/settings/edit_Settings');
var REST_pairs = require('./routes/rest_api/pairs/list_Pairs');
var REST_editPair = require('./routes/rest_api/pairs/edit_Pair');

app.use('/POST_last_notifications', REST_LastNotificationsRouter);
app.use('/GET_settings', REST_settings);
app.use('/POST_settings', REST_editSettings);
app.use('/GET_pair_listPairs', REST_pairs);
app.use('/POST_pair_changePairStatus', REST_editPair);

loggerjs.info('-------> Server started !');

/*
TEST ZONE
 */

/*
const CTRL_TEST = require('./controller/backend/notifier_controller/CTRL_Notifier');
CTRL_TEST.NotifyUsers();
*/


module.exports = app;


