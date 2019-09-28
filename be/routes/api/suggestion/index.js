var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Suggestion = require('../../../models/suggestions');

// 권한에 따른 접근 허용(2이상은 접근불가)
router.all('*', (req, res, next) => {
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.'})
  next()
})

/* Routing Methods */
router.get('/', function(req, res, next) {
  Suggestion.find()
    .then(r => {
      res.send({ success: true, suggestions: r });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.post('/', function(req, res, next) {
  const { title, context, createdAt } = req.body;
  const user = req.user.id;
  console.log(user)
  const s = new Suggestion({ title, context, user, createdAt });
  s
    .save()
    .then(r => {
      res.send({ success: true, msg: r });
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
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  Suggestion.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'suggestion: 그런 api 없어용'));
});

module.exports = router;