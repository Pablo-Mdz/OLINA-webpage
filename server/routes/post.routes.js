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



module.exports = router;