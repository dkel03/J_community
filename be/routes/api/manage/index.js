var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', (req, res, next) => {
  if (req.user.lv) return res.send({ success: false, msg: '관리자만 이용가능합니다'})
  next()
})

router.use('/company', require('./company'))
router.use('/page', require('./page'))
router.use('/site', require('./site'))
router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

// < url = /api/manage >
// manage의 첫입구로서 req.user정보를 이용하여 하위 라우팅으로의 사전차단 기능 추가가능
