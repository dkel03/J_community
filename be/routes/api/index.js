var express = require('express');
var createError = require('http-errors')
var router = express.Router();

/* GET home page. */
router.use('/suggestion', require('./suggestion'));

router.all('*', function(req,res,next){
	next(createError(404, 'api: 그런 api 없어용'));
})

module.exports = router;
