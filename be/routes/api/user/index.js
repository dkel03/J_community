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
	const { title, context, createdAt } = req.body
	const s = new Suggestion({ title, context, createdAt });
	s.save()
	.then(r => {
		res.send({success: true, msg: r});
	})
	.catch(e => {
		res.send({ success: 'failed', msg: e.message});
	})	
	//res.send({success: true, msg: "post methods"});
});

router.put('/:id', (req, res, next) => {
	const id = req.params.id
	const { title, context } = req.body
	Suggestion.updateOne({_id: id}, {$set: {title, context}})
	.then(r => {
		res.send({success: true, msg: r});
	})
	.catch(e => {
		res.send({ success: 'failed', msg: e.message});
	})
	
	// res.send({ success: true, msg: 'put ok' })
});

router.delete('/:id', function(req,res,next){
	const id = req.params.id
	Suggestion.deleteOne({_id: id})
	.then(r => {
		res.send({success: true, msg: r});
	})
	.catch(e => {
		res.send({ success: 'failed', msg: e.message});
	})
	//res.send({success: true, msg: "del methods"});
});



router.all('*', function(req,res,next){
	next(createError(404, '그런 api 없어용'));
})

module.exports = router;
