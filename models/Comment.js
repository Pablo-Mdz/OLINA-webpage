const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  body: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
