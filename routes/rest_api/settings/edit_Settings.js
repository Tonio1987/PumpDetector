var express = require('express');
var router = express.Router();

const CTRL_Settings = require('../../../controller/frontend/settings/CTRL_Settings');

function call_CTRL_editSettings(req, res, next){
    CTRL_Settings.editSettings(renderResult, req, res, next);
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
    call_CTRL_editSettings(req, res, next);
});

module.exports = router;
