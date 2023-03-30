const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  title: { type: String, unique: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  posts: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

const Topic = model("Topic", topicSchema);

module.exports = Topic;
