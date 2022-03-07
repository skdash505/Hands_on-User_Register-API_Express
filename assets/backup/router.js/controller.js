var apiPaths = require('config').apiPaths;

var express = require('express');
var router = express.Router();

/* GET users listing at Controller */

router.get(apiPaths.controllers, function (req, res, next) {
    console.log("controller initiated");
    res.render('index', { title: 'Controller', content: 'respond with a resource as Controller' }).json({ message: "hi User" });
    next()
});

router.post(apiPaths.controllers, function (req, res, next) {
    res.send({ message: "submitted successfully" });
});

router.get(apiPaths.controllers_id, function (req, res, next) {
    console.log("controller with id initiated");
    res.render('index', { title: 'Controller ' + req.params.id, content: 'respond with a resource as Controller as Id :' + req.params.id }).json({ message: "hi User: " + req.params.id, data: req.params.id});
    next();
});


module.exports = router;