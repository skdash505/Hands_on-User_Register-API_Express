var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Registered Successfully', content: 'Registered Successfully. ' });
    res.send({data: {
        _default : 0,
        _base: undefined
    }, message: "success"})
});

module.exports = router;
