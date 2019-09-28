var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Company = require('../../../models/companys');

/* Routing Methods */
router.get('/', function(req, res, next) {
  Company.findOne({ name: req.user.company.name })
    .then(r => {
      console.log(r)
      res.send({ success: true, company: r, user: req.user });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'company: 그런 api 없어용'));
});

module.exports = router;