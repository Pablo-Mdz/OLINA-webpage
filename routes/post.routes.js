const router = require('express').Router();
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { deleteImages } = require('../utils/deleteImagesHelper');

router.post('/', isAuthenticated, (req, res) => {
  const authorId = req.payload._id;
  const { title, body, topicId, imgUrl, publicId } = req.body;
  Post.create({
    title,
    body,
    topicId,
    imgUrl,
    publicId,
    author: authorId,
  }).then((newPost) => {
    Topic.findByIdAndUpdate(topicId, { $push: { posts: newPost._id } })
      .then((updatedTopic) => {
        User.findByIdAndUpdate(authorId, {
          $push: { posts: newPost._id },
        }).then((updatedUser) => {
          Post.findById(newPost._id)
            .populate('author')
            .then((populatedPost) => {
              res.json(populatedPost);
            });
        });
      })
      .catch((err) => console.log(err));
  });
});

router.get('/', (req, res) => {
  Post.find()
    .populate('author')
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
});

router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate('author')
    .populate('comments')
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => console.log(err));
});

router.put('/:postId', (req, res) => {
  const { title, body } = req.body;
  Post.findByIdAndUpdate(req.params.postId, { title, body }, { new: true })
    .then((updatedPost) => {
      res.status(200).json(updatedPost);
    })
    .catch((err) => console.log(err));
});

router.delete('/:postId', async (req, res) => {
  const postID = req.params.postId;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Comment.deleteMany({ post: postID });

    await deleteImages(post);

    await Post.findByIdAndDelete(postID);
    res.status(200).json({ message: 'Post and associated comments deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post', error: err });
  }
});

router.get('/:id/likes', async (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      res.status(200).json({ likes: post.likes });
    })
    .catch((err) => console.log(err));
});

router.put('/likes/:id', (req, res) => {
  const postId = req.params.id;
  const { likes } = req.body;
  Post.findByIdAndUpdate(postId, { likes }, { new: true })
    .then((updatedPost) => {
      res.status(200).json(updatedPost);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
