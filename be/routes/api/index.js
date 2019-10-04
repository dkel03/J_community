var express = require('express');
var createError = require('http-errors');
var router = express.Router();

//Add modules
const moment = require('moment');
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');

//토큰 검사 함수
const verifyToken = t => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3, company: '비로그인' });
    if (typeof t !== 'string') reject(new Error('문자가 아닌 토큰입니다'));
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3, company: '비로그인' });
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err);
      resolve(v);
    });
  });
};

const signToken = (id, name, number, lv, company, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    };
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember; // 6일
    jwt.sign({ id, name, number, lv, company, rmb }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const getToken = async(t) => {
  let vt = await verifyToken(t) // vt = verify토큰
  if (vt.lv > 2) return { user: vt, token: null } // 만약 lv이 2이상이면 토큰 null로 만듬
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds') // 남은 로그인 시간
  console.log(diff)
  if (diff > (vt.exp - vt.iat) / cfg.jwt.expiresInDiv) return { user: vt, token: null }
  const nt = await signToken(vt.id, vt.name, vt.number, vt.lv, vt.company, vt.rmb)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}

/* 토큰 검사 필요없는 페이지 */
router.use('/sign', require('./sign'));
router.use('/register', require('./register'));
router.use('/site', require('./site'));

/* 토큰 검사 */
router.all('*', (req, res, next) => {
  const token = req.headers.authorization;
  getToken(req.headers.authorization)
    .then((v) => {
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});

/* 토큰 검사 필요한 페이지 */
router.use('/company', require('./company'));
router.use('/manage', require('./manage'));
router.use('/page', require('./page'));
router.use('/suggestion', require('./suggestion'));
router.use('/user', require('./user'));

/* 없는 페이지 처리 */
router.all('*', function(req, res, next) {
  next(createError(404, 'api: 그런 api 없어용'));
});

module.exports = router;


// < url = /api > 
// 토큰을 검사하여 req.user에 싣거나 사전차단 기능을 수행함
// front에서 axios.post를 통해 헤더와 내용이 들어올 때, 
// 헤더에서 토큰 값을 받아 verify하고 이를 req에 추가하여 넘김
