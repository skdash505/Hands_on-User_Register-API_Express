var apiPaths = require('config').apiPaths;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(apiPaths.register, function(req, res, next) {
    // res.render('index', { title: 'Registered Successfully', content: 'Registered Successfully. ' });
    if (!req.body.userRegisterData){
        res.status(404);
        res.json({
            data: null,
            message: "required Request body not found"
        })
    } else {
        res.send({data: {
            _default : 0,
            _base: undefined
        }, message: "success"})
    }
});

module.exports = router;
