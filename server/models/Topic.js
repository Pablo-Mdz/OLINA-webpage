import mongoose from 'mongoose';
const { Schema } = mongoose;

const topicSchema = new Schema({
  title: { type: String, unique: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Topic = model("Topic", topicSchema);

module.exports = Topic;
