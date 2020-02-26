var express = require('express');
var router = express.Router();
var path = require('path');

/* index of my site */
router.get('/', function(req, res, next) {
    var path = require('path');
    res.sendFile(path.resolve('views/pairs.html'));
});

module.exports = router;
