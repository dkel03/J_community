var express = require('express');
var createError = require('http-errors');
var router = express.Router();

//Add modules
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');
const verifyToken = t => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err);
      resolve(v);
    });
  });
};
/* GET home page. */
router.use('/suggestion', require('./suggestion'));
router.use('/sign', require('./sign'));
// router.all('*', (req, res, next) => {
//   const token = req.headers.authorization;
//   verifyToken(token)
//     .then(v => {
//       console.log(v);
//       next();
//     })
//     .catch(e => res.send({ success: false, msg: e.message }));
// });

router.all('*', function(req, res, next) {
  next(createError(404, 'api: 그런 api 없어용'));
});

module.exports = router;