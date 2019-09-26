var express = require('express');
var createError = require('http-errors');
var router = express.Router();

//Add modules
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');

//토큰 검사 함수
const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰입니다'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

/* 토큰 검사 필요없는 페이지 */
router.use('/sign', require('./sign'));

/* 토큰 검사 */
router.all('*', (req, res, next) => {
  const token = req.headers.authorization
  verifyToken(token)
    .then(v => {
      req.user = v
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});

/* 토큰 검사 필요한 페이지 */
router.use('/manage', require('./manage'))
router.use('/suggestion', require('./suggestion'));
router.use('/user', require('./user'));
router.use('/page', require('./page'));


/* 없는 페이지 처리 */
router.all('*', function(req, res, next) {
  next(createError(404, 'api: 그런 api 없어용'));
});


module.exports = router;