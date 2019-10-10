const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
	title: { type: String, default: ''},
	context: { type: String, default: '내용이 없습니다'},
	cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  comments: [],
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion