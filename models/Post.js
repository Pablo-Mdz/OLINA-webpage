const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: String, 
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  body: String,
  likes: {
    type: Number,
    default: 0
  },
  imgUrl: String,
  publicId: String,
  //comments: [{ body: String, date: Date }],
  createdAt: { type: Date, default: Date.now },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic'},
});

const Post = model("Post", PostSchema);

module.exports = Post;