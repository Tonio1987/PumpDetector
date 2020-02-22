var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const cron = require('node-cron');
const moment = require('moment');
let server_start_time = moment();

// CONTROLLER CALL REQUIRE
// API
const CTRL_ExchangeInfo = require('../controller/backend/api_controller/CTRL_ExchangeInfo');
const CTRL_Prices = require('../controller/backend/api_controller/CTRL_Prices');
const CTRL_Candles = require('../controller/backend/api_controller/CTRL_Candles');

// PURGE
const CTRL_PurgePrices = require('../controller/backend/purge_controller/CTRL_PurgePricesr');
const CTRL_PurgeCandles = require('../controller/backend/purge_controller/CTRL_PurgeCandles');

// ALGORITHMS
const CTRL_AvgVolumeAlgo = require('../controller/backend/algorithm_controller/avg_trade_volume/CTRLAvgTradeVolume');
const CTRL_EvoLCrypto = require('../controller/backend/algorithm_controller/evol_crypto/CTRL_EvolCrypto');

// INIT TASKS
// SERVER CHECK TASKS
let task_ServerOk = null;

// API TASKS
let task_LoadExchangeInfo = null;
let task_LoadPrices = null;
let task_LoadCandles = null;

// PURGE
let task_PurgeData = null;

// ALGO
let task_AvgVolumeAlgo = null;
let task_EvoLCrypto = null;


// HANDLER DYNAMIC FUNCTION
let Handler={};

// NODE SERVER IS ALIVE
Handler.init_task_ServerOk = function (cron_expression){
    task_ServerOk = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Node server up since '+ moment(server_start_time).locale('en').fromNow());
    }, {
        scheduled: false
    });
};

// API
// LOAD EXCHANGE INFO
Handler.init_task_LoadExchangeInfo = function (cron_expression){
    task_LoadExchangeInfo = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Load Exchange Info ... ');
        CTRL_ExchangeInfo.LoadExchangeInfo();
    }, {
        scheduled: false
    });
};

// LOAD PRICES
Handler.init_task_LoadPrices = function (cron_expression){
    task_LoadPrices = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Load Prices ... ');
        CTRL_Prices.LoadPrices();
    }, {
        scheduled: false
    });
};

// LOAD Candlestick
Handler.init_task_LoadCandles = function (cron_expression){
    task_LoadCandles = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Load Candlesticks ... ');
        CTRL_Candles.LoadCandles();
    }, {
        scheduled: false
    });
};

// PURGE DATA
Handler.init_task_PurgeData = function (cron_expression){
    task_PurgeData = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Purge Data ... ');
        CTRL_PurgePrices.purgeData();
        CTRL_PurgeCandles.purgeData();
    }, {
        scheduled: false
    });
};

// ALGORITHM
Handler.init_task_AvgVolumeAlgo = function (cron_expression){
    task_AvgVolumeAlgo = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Average Volume Calculation ... ');
        CTRL_AvgVolumeAlgo.LoadAvgTradeVolume();

    }, {
        scheduled: false
    });
};

Handler.init_task_EvoLCrypto = function (cron_expression){
    task_EvoLCrypto = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Crypto Evolution Calculation ... ');
        CTRL_EvoLCrypto.LoadEvolCrypto();

    }, {
        scheduled: false
    });
};

// SERVER CHECK TASKS
Handler.start_task_ServerOk = function(){task_ServerOk.start();};
Handler.stop_task_ServerOk = function(){task_ServerOk.stop();};

// API
// BINANCE API TASKS
Handler.start_task_LoadExchangeInfo = function(){task_LoadExchangeInfo.start();};
Handler.stop_task_LoadExchangeInfo = function(){task_LoadExchangeInfo.stop();};

Handler.start_task_LoadPrices = function(){task_LoadPrices.start();};
Handler.stop_task_LoadPrices = function(){task_LoadPrices.stop();};

Handler.start_task_LoadCandles = function(){task_LoadCandles.start();};
Handler.stop_task_LoadCandles = function(){task_LoadCandles.stop();};

// PURGE
Handler.start_task_PurgeData = function(){task_PurgeData.start();};
Handler.stop_task_PurgeData = function(){task_PurgeData.stop();};

// ALGORITHM
Handler.start_task_AvgVolumeAlgo = function(){task_AvgVolumeAlgo.start();};
Handler.stop_task_AvgVolumeAlgo = function(){task_AvgVolumeAlgo.stop();};

Handler.start_task_EvoLCrypto = function(){task_EvoLCrypto.start();};
Handler.stop_task_EvoLCrypto = function(){task_EvoLCrypto.stop();};

module.exports = {
   initTasksScheduler: function (callback, tasks) {
       for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].CRT_CRON_EXPR;
                let active = tasks[i].CRT_ACTIVE;
                let fctName = 'init_'+tasks[i].CRT_NAME.toString().trim();
                // INIT DU SCHEDULER
                Handler[fctName](cron_expression);

                if(active === 1){
                    fctName = 'start_'+tasks[i].CRT_NAME.toString().trim();
                    Handler[fctName](cron_expression);
                }else{
                    fctName = 'stop_'+tasks[i].CRT_NAME.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    },
    reloadTasksScheduler: function (callback, tasks) {
        for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].CRT_CRON_EXPR;
                let active = tasks[i].CRT_ACTIVE;
                let fctName = '';

                if(active === 1){
                    fctName = 'start_'+tasks[i].CRT_NAME.toString().trim();
                    Handler[fctName](cron_expression);
                }else{
                    fctName = 'stop_'+tasks[i].CRT_NAME.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    }
};

