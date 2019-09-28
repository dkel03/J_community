// 부대 정보 관련 모델
const mongoose = require('mongoose');

const comSchema = new mongoose.Schema({
	name: { type: String, default: '', unique: true},
	phoneNumber: { type: String, default: ''},
});

const Company = mongoose.model('Company', comSchema);

module.exports = Company