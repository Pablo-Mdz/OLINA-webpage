const router = require("express").Router();
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User');

router.post("/", isAuthenticated, (req, res) => {
    console.log('this is req.body of topic:', req.body)
    console.log('this is req.payload._id of topic:', req.payload._id);
    const authorId = req.payload._id;
    const { title } = req.body;
    Topic.create({
        title: title,
        author: authorId
    })
      .then(newTopic => {
        console.log("newTopic: ", newTopic)
        User.findByIdAndUpdate( authorId, {$push: { topics: newTopic._id}})
          .then(updatedUser => {
            console.log("updatedUser: ", updatedUser)
            res.json({ newTopic: newTopic });
          })
          .catch(err => console.log(err));
      })
});

router.get("/details/:id", (req, res) => {
  const topicId = req.params.id;
  console.log("req.params.id: ", req.params.id)
  Topic.findById(topicId.trim())
    .then(topicFromDB => {
      res.json({ topic: topicFromDB });
    })
    .catch(err => console.log(err));
})

module.exports = router;
