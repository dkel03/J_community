var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Suggestion = require('../../../../models/suggestions');


/* Routing Methods */
router.get('/one/:id', function(req, res, next) {
  const sugId = req.params.id
  Suggestion.findOneAndUpdate({ _id: sugId }, { $inc: { "cnt.view": 1 } }, {}).populate('_user', 'name')
    .then(r => {
      res.send({ success: true, d: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.get('/list', function(req, res, next) {
  const _company = req.user._company
  if(!_company) return res.send({ success: false })
  Suggestion.find({ _company }).populate('_user', 'name')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.post('/', function(req, res, next) {
  const { title, context } = req.body;
  const _user = req.user._id;
  const _company = req.user._company

  Suggestion.create({ title, context, _user, _company})
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.put('/:id', (req, res, next) => {
  const _id = req.params.id;
  Suggestion.findOne({ _id })
    .then((r) => {
      if (!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Suggestion.updateOne({ _id }, { $set: req.body })
    })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 삭제 권한이 없습니다' })
  const _id = req.params.id;
  Suggestion.findOne({ _id }).populate('_user', 'lv')
    .then((r) => {
      if(!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        if (r._user.lv <= req.user.lv) return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Suggestion.deleteOne({ _id })
    })
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