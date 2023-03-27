import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: String, 
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  body: String,
  //comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic'},
});

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;