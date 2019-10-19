const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const sharp = require('sharp')
const imageDataURI = require('image-data-uri')
const fs = require('fs')
const User = require('../../../../models/users')

// post로 파일을 받아서 public/img에 multer를 사용하여 저장
router.post('/', multer({ dest: 'public/img' }).single('bin') ,(req, res, next) => {
  // console.log(req.file)
  // console.log(req.file.path)
  if (!req.user._id) throw createError(401, 'xxx')
  // 받은 이미지를 sharp로 축소후 다시 이미지로 인코딩하여 프론트에 전송
    sharp(req.file.path)
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .toBuffer()
      .then(bf => {
        fs.unlinkSync(req.file.path)
        const img = imageDataURI.encode(bf, 'png')
        return User.findByIdAndUpdate(req.user._id, { $set: { img } }, { new: true }).select('-img')
      })
      .then(r => {
        res.setHeader('Content-Type', 'text/plain')
        res.send(r._id.toString())
      })
      .catch(e => next(e))
})
router.delete('/', (req, res, next) => {
  res.status(204).send()
})

module.exports = router