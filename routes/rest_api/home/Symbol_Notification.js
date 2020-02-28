var express = require('express');
var router = express.Router();

const CTRL_SymbolNotification = require('../../../controller/frontend/home/CTRL_SymbolNotifications');

function call_CTRL_getSymbol_Notifications(req, res, next){
    CTRL_SymbolNotification.getSymbol_Notifications(renderResult, req, res, next);
}

function renderResult(err, data, req, res, next){
    if(err){
        res.set('Access-Control-Allow-Origin', '*');
        res.send('Erreur');
    }else{
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send((data));
    }
}

router.post('/', function(req, res, next) {
    call_CTRL_getSymbol_Notifications(req, res, next);
});

module.exports = router;
