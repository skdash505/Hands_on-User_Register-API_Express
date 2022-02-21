var config = require('config');

var express = require('express');
var router = express.Router();

/* GET users listing at Controller */
/**
 * @openapi
 * /:
 *   get:
 *     description: User Controller
 *     responses:
 *       200:
 *         description: respond with a resource as Controller.
 */
router.get(config.apiPaths.controllers._base, function(req, res, next) {
    console.log("controller initiated");
    res.render('index', { title: 'Controller', content: 'respond with a resource as Controller' });
    res.set({message: "hi"});
    next()
});
/**
 * @openapi
 * /:
 *   post:
 *     description: User Controller
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post(config.apiPaths.controllers._base, function(req, res, next) {
    res.send({message: "submitted successfully"});
});

/**
 * @openapi
 * /:
 *   get:
 *     description: controller with id initiated
 *     responses:
 *       200:
 *         description: respond with a resource as Controller as Id .
 */
router.get(config.apiPaths.controllers._withId, function(req, res, next) {
    console.log("controller with id initiated");
    res.render('index', { title: 'Controller '+ req.params.id, content: 'respond with a resource as Controller as Id :'+ req.params.id });
    res.set({message: "hi"+ req.params.id});
    next();
});

/* GET users listing for other services */
router.use(config.apiPaths.register, require('./register.controller'));


module.exports = router;