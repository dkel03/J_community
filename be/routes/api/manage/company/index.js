var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Company = require('../../../../models/companys');

/* Routing Methods */
router.get('/', function(req, res, next) {
  // Company.create({ name: '교육사령부', phoneNumber: '042-111-2222' })
  // .then(r => {
  //   res.send({success:true, company: r})
  // })
  // .catch((e) => {
  //   res.send({success:false, msg: e.message})
  // })
  Company.find()
    .then(r => {
      console.log(r)
      res.send({ success: true, company: r });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, phoneNumber } = req.body;
  Company.updateOne({ _id: id }, { $set: { name, phoneNumber } })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  Company.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'company: 그런 api 없어용'));
});

module.exports = router;