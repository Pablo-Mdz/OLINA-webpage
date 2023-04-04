const router = require("express").Router();
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User');

router.post("/", isAuthenticated, (req, res) => {
    console.log('this is req.body of post:', req.body)
    console.log('this is req.payload._id of post:', req.payload._id);
    const authorId = req.payload._id;
    const { title, body, topicId } = req.body;
    Post.create({
        title: title,
        body,
        author: authorId
    })
      .then(newPost => {
        Topic.findByIdAndUpdate(topicId, {$push: { posts: newPost._id}})
          .then(updatedTopic => {
            User.findByIdAndUpdate( authorId, {$push: { posts: newPost._id}})
            .then(updatedUser => {
              Post.findById(newPost._id)
                .populate("author")
                .then(populatedPost => {
                  res.json(populatedPost);
                })
            })
          })
          .catch(err => console.log(err));
      })
});

router.get("/:postId", (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("author")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => console.log(err));
});


router.put("/:postId", (req, res) => {
  const { title, body } = req.body;
  Post.findByIdAndUpdate(req.params.postId, { title, body }, { new: true })
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(err => console.log(err));
});

router.delete("/:postId", (req, res) => {
  const postID = req.params.postId;
  Post.findByIdAndDelete(postID)
    .then(() => {
      res.status(200).json({message: 'Post deleted'})
    })
    .catch(err => console.log(err));
})

module.exports = router;