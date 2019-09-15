const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
	title: { type: String, default: ''},
	context: { type: String, default: '내용이 없습니다'},
	user: {type: String, default: 'Jay_Kim'},
	createdAt: {type: String, default: '1999-99-99'},
	likes: { type: Number, default: 1}
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion