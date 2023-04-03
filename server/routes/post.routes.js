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
              res.json({ newPost: newPost });
            })
          })
          .catch(err => console.log(err));
      })
});

router.get("/id", (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => console.log(err));
})


router.put("/id", (req, res) => {
  console.log(req.params);
  const { post } = req.body;
  Post.findByIdAndUpdate(req.params.postId, { post }, { new: true })
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(err => console.log(err));
})

module.exports = router;