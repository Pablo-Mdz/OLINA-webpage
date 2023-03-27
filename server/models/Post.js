import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String, 
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  body: String,
  //comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic'},
});

const Post = model("Post", PostSchema);

module.exports = Post;