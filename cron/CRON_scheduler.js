var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const cron = require('node-cron');
const moment = require('moment');
let server_start_time = moment();

// CONTROLLER CALL REQUIRE
const CTRL_ExchangeInfo = require('../controller/backend/api_controller/CTRL_ExchangeInfo');

// INIT TASKS
// SERVER CHECK TASKS
let task_ServerOk = null;

// API TASKS
let task_LoadExchangeInfo = null;


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

// LOAD EXCHANGE INFO
Handler.init_task_LoadExchangeInfo = function (cron_expression){
    task_LoadExchangeInfo = cron.schedule(cron_expression, () =>  {
        logger.info('*** CRON SCHEDULER *** -> Load Exchange Info ... ');
        CTRL_ExchangeInfo.LoadExchangeInfo();
    }, {
        scheduled: false
    });
};



// SERVER CHECK TASKS
Handler.start_task_ServerOk = function(){task_ServerOk.start();};
Handler.stop_task_ServerOk = function(){task_ServerOk.stop();};

// BINANCE API TASKS
Handler.start_task_LoadExchangeInfo = function(){task_LoadExchangeInfo.start();};
Handler.stop_task_LoadExchangeInfo = function(){task_LoadExchangeInfo.stop();};


module.exports = {
   initTasksScheduler: function (callback, tasks) {
       for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].CTK_CRON_EXPR;
                let active = tasks[i].CTK_ACTIVE;
                let fctName = 'init_'+tasks[i].CTK_NAME.toString().trim();

                // INIT DU SCHEDULER
                Handler[fctName](cron_expression);

                if(active === 1){
                    fctName = 'start_'+tasks[i].CTK_NAME.toString().trim();
                    Handler[fctName](cron_expression);
                }else{
                    fctName = 'stop_'+tasks[i].CTK_NAME.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    },
    reloadTasksScheduler: function (callback, tasks) {
        for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].CTK_CRON_EXPR;
                let active = tasks[i].CTK_ACTIVE;
                let fctName = '';

                if(active === 1){
                    fctName = 'start_'+tasks[i].CTK_NAME.toString().trim();
                    Handler[fctName](cron_expression);
                }else{
                    fctName = 'stop_'+tasks[i].CTK_NAME.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    }
};

