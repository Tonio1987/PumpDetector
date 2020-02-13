// CONFIGURE ENV
require('dotenv').config();

// NOTIFIER
var Push = require( 'pushover-notifications' );

// CALL TRADING ROBOT


// CALL MODULES
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// INIT EXPRESS APP
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// CALL ROUTES
var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');
var notifyRouter = require('./routes/notify');
var settingsRouter = require('./routes/settings');


app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/notify', notifyRouter);
app.use('/settings', settingsRouter);


/*
// INIT APP
var p = new Push( {
  user: process.env['PUSHOVER_USER'],
  token: process.env['PUSHOVER_TOKEN'],
})

var msg = {
  message: 'Kraken - Serve is RUNNING !',	// required
  title: "Kraken  - Serve is RUNNING !",
  sound: 'magic',
  device: 'IphoneXSTonio',
  priority: 1
}

p.send( msg, function( err, result ) {
  if ( err ) {
    throw(err);
  }
  console.log( result );
})
*/

module.exports = app;
