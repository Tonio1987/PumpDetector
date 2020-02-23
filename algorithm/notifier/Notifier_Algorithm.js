const moment = require('moment');
moment.locale('fr');

// NOTIFIER
var Push = require( 'pushover-notifications' );

function notifyUsers(message){
    let p = new Push( {
        user: process.env['PUSHOVER_USER'],
        token: process.env['PUSHOVER_TOKEN'],
    });

    let msg = {
        message: message,	// required
        title: "Pump Detection !",
        sound: 'magic',
        device: '*',
        priority: 1
    };

    p.send( msg, function( err, result ) {
        if ( err ) {
            throw(err);
        }
    });

}

module.exports = {
    prepare_Notification: function(callback, EvolCrypto) {
        new Promise(function (resolve, reject) {
            if(EvolCrypto.length > 0){
                let notification = "-------------------------------\n";
                notification = notification+ "---- >>> PUMP DETECTED <<< ----\n";
                notification = notification+ "-------------------------------\n";
                for(let i=0; i<EvolCrypto.length; i++){
                    notification = notification+"### Symbol : "+EvolCrypto[i].EVC_SYMBOL+" ### \n";
                    if(EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD_STATUS === 'R-A-S'){
                        notification = notification+"------- R-A-S ON VOLUME -------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD_STATUS === 'WARNING'){
                        notification = notification+"------ WARNING ON VOLUME ------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD_STATUS === 'ALERT'){
                        notification = notification+"------- ALERT ON VOLUME -------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_VOLUME_ON_PERIOD.toFixed(2)+" %\n";
                    }

                    if(EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD_STATUS === 'R-A-S'){
                        notification = notification+"------- R-A-S ON PRICES -------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                        notification = notification+"EVOLUTION SINCE WARNING: "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD_STATUS === 'WARNING'){
                        notification = notification+"------ WARNING ON PRICES ------\n"
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                        notification = notification+"EVOLUTION SINCE WARNING: "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD_STATUS === 'ALERT'){
                        notification = notification+"------- ALERT ON PRICES -------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                        notification = notification+"EVOLUTION SINCE WARNING: "+EvolCrypto[i].EVC_EVOL_PRICE_ON_PERIOD.toFixed(2)+" %\n";
                    }

                    if(EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS === 'R-A-S'){
                        notification = notification+"------- R-A-S ON TRADES -------\n";
                        notification = notification+"NB_TRADES EVOLUTION : "+EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS === 'WARNING'){
                        notification = notification+"------ WARNING ON TRADES ------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    if(EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD_STATUS === 'ALERT'){
                        notification = notification+"------- ALERT ON TRADES -------\n";
                        notification = notification+"EVOLUTION : "+EvolCrypto[i].EVC_EVOL_NB_TRADES_ON_PERIOD.toFixed(2)+" %\n";
                    }
                    notification = notification+"-------------------------------\n\n"
                }
                notifyUsers(notification);
                resolve(notification);
            }else{
                resolve(null);
            }


        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
