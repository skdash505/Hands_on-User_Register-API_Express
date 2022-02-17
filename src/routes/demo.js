var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Demo', content: 'respond with a resource as Demo' });
});

module.exports = router;
