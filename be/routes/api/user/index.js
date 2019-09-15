var express = require('express');
var createError = require('http-errors')
var router = express.Router();
const Suggestion = require('../../../models/suggestions')

/* Routing Methods */
router.get('/', function(req,res,next){
	Suggestion.find()
	.then(r => {
		res.send({success: true, suggestions: r});
	})
	.catch(e => {
		res.send({success: false})
	})
	//res.send({success: true, msg: "get methods"});
});

router.post('/', function(req,res,next){
	res.send({success: true, msg: "post methods"});
});

router.put('/', function(req,res,next){
	res.send({success: true, msg: "put methods"});
});

router.delete('/', function(req,res,next){
	res.send({success: true, msg: "del methods"});
});



router.all('*', function(req,res,next){
	next(createError(404, '그런 api 없어용'));
})

module.exports = router;
