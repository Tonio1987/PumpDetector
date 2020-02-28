var express = require('express');
var router = express.Router();

const CTRL_SymbolCandles = require('../../../controller/frontend/candles/CTRL_SymbolCandles');

function call_CTRL_getSymbol_Candles(req, res, next){
    CTRL_SymbolCandles.getSymbolCandles(renderResult, req, res, next);
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
    call_CTRL_getSymbol_Candles(req, res, next);
});

module.exports = router;
