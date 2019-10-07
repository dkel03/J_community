var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Suggestion = require('../../../../models/suggestions');


/* Routing Methods */
router.get('/', function(req, res, next) {
  Suggestion.find()
    .then(r => {
      res.send({ success: true, suggestions: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.post('/', function(req, res, next) {
  const { title, context, createdAt } = req.body;
  const user = req.user.id;
  // const s = new Suggestion({ title, context, user, createdAt });
  // s
  Suggestion.create({ title, context, user, createdAt })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, context } = req.body;
  Suggestion.updateOne({ _id: id }, { $set: { title, context } })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  Suggestion.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;