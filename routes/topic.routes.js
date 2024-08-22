const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Topic = require('../models/Topic');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.post('/', isAuthenticated, (req, res) => {
  const authorId = req.payload._id;
  const { title } = req.body;
  Topic.create({
    title: title,
    author: authorId,
  }).then((newTopic) => {
    User.findByIdAndUpdate(authorId, { $push: { topics: newTopic._id } })
      .then((updatedUser) => {
        Topic.findById(newTopic._id)
          .populate('author')
          .then((populatedTopic) => {
            res.json(populatedTopic);
            console.log('populated topic: ', populatedTopic);
          });
      })
      .catch((err) => console.log(err));
  });
});

router.get('/details/:id', (req, res) => {
  const topicId = req.params.id;
  Topic.findById(topicId)
    .populate({
      path: 'posts',
      populate: {
        path: 'author',
      },
    })
    .then((topicFromDB) => {
      // console.log("topicFromDB: ", topicFromDB)
      res.json({ topic: topicFromDB });
    })
    .catch((err) => console.log(err));
});

router.get('/list-topics', (req, res) => {
  Topic.find({})
    .then((topicsFromDB) => {
      res.json({ topics: topicsFromDB });
    })
    .catch((err) => console.log(err));
});

router.put('/details/:topicId', (req, res) => {
  const { title } = req.body;
  Topic.findByIdAndUpdate(req.params.topicId, { title }, { new: true })
    .then((updatedTopic) => {
      console.log(' updated topic', updatedTopic);
      res.status(200).json(updatedTopic);
    })
    .catch((err) => console.log(err));
});

router.delete('/details/:topicId', async (req, res) => {
  const topicID = req.params.topicId;
  try {
    const topic = await Topic.findById(topicID);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Find all posts related to the topic
    const posts = await Post.find({ _id: { $in: topic.posts } });
    
    const postIds = posts.map((post) => post._id);
    await Comment.deleteMany({ post: { $in: postIds } });

    // Extract the User IDs (authors) of those posts
    const userIds = posts.map((post) => post.author);
    // Remove the related posts
    await User.updateMany(
      { _id: { $in: userIds } },
      { $pull: { posts: { $in: topic.posts } } },
    );

    await User.findByIdAndUpdate(topic.author, {
      $pull: { topics: topicID },
    });

    await Post.deleteMany({ _id: { $in: topic.posts } });

    await Topic.findByIdAndDelete(topicID);

    res.status(200).json({ message: 'Topic and associated posts deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete topic', error: err });
  }
});

module.exports = router;
