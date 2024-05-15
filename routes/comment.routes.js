const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add new comment to a post
router.post('/', (req, res) => {
  const { comment, postId } = req.body;

  Comment.create({ body: comment, post: postId })
    .then((newComment) => {
      Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } })
        .populate('comments')
        .then((updatedPost) => {
          res.json(updatedPost);
        });
    })
    .catch((err) => console.log(err));
});

// Get all comments for a post
router.get('/', (req, res) => {
  Comment.find()
    .then((commentsFromDB) => {
      res.status(200).json({ commentsFromDB });
    })
    .catch((err) => console.log(err));
});

router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;
  Comment.findByIdAndDelete(commentId)
    .then(() => res.json({ message: 'Comment deleted successfully' }))
    .catch((err) =>
      res.status(500).json({ message: 'Failed to delete comment', error: err }),
    );
});

module.exports = router;
