var apiPaths = require('./apiPaths');

var express = require('express');
var router = express.Router();

/* GET users listing at Controller */
router.get(apiPaths.controllers._base, function(req, res, next) {
    console.log("controller initiated");
    res.render('index', { title: 'Controller', content: 'respond with a resource as Controller' });
    res.set({message: "hi"});
    next()
});
router.put(apiPaths.controllers._base, function(req, res, next) {

});

router
.get(apiPaths.controllers._withId, function(req, res, next) {
    console.log("controller with id initiated");
    res.render('index', { title: 'Controller '+ req.params.id, content: 'respond with a resource as Controller as Id :'+ req.params.id });
    res.set({message: "hi"+ req.params.id});
    next();
});

/* GET users listing for other services */
router.use(apiPaths.controllers.register, require('./controllers/register'));



module.exports = router;