const express = require('express');
const createError = require('http-errors');
const router = express.Router();

//added modules
const jwt = require('jsonwebtoken');
const cfg = require('../../../../config');
const User = require('../../../models/users');

const signToken = (id, pwd) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id, pwd }, cfg.secretKey, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

router.post('/in', function(req, res) {
  const { id, pwd } = req.body;
  if (!id) return res.send({ success: false, msg: '아이디가 없습니다.' });
  if (!pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.' });

  User.findOne({ id }) // sign.vue에서 로그인시 id와 pwd의 유효성을 검사하고 토큰을 발행하는 부분 {id}= 폼에서 입력받은 id
    .then(r => {
      if (!r) throw new Error('존재하지 않는 아이디입니다.');
      if (r.pwd !== pwd) throw new Error('비밀번호가 틀립니다.');
      return signToken(r.id, r.pwd);
    })
    .then(r => {
      res.send({ success: true, token: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.post('/out', function(req, res) {
  res.send({ success: true, msg: '아직 준비안됨' });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'sign: 그런 api 없어용'));
});

module.exports = router;