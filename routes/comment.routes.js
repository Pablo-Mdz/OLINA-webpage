const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Add new comment to a post
router.post('/', (req, res) => {
  const { comment, postId, userId } = req.body;

  Comment.create({ body: comment, post: postId, author: userId })
    .then((newComment) => {
      const userUpdatePromise = User.findByIdAndUpdate(userId, {
        $push: { comments: newComment._id },
      });

      const postUpdatePromise = Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } },
        { new: true },
      ).populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' },
      });

      // Wait for both updates to finish
      return Promise.all([userUpdatePromise, postUpdatePromise]);
    })
    .then(([updatedUser, updatedPost]) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Failed to add comment', error: err });
    });
});

// Get all comments for a post
router.get('/', (req, res) => {
  Comment.find()
    .then((commentsFromDB) => {
      res.status(200).json({ commentsFromDB });
    })
    .catch((err) => console.log(err));
});

// Delete a comment and remove it from the post
router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (deletedComment.post) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@:', deletedComment.post);
        return Post.findByIdAndUpdate(
          deletedComment.post,
          { $pull: { comments: commentId } },
          { new: true },
        );
      } else {
        return null;
      }
    })
    .then((updatedPost) => {
      if (updatedPost) {
        res.json({ message: 'Comment deleted successfully', updatedPost });
      } else {
        res.json({
          message:
            'Comment deleted successfully, but post not found or not updated',
        });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: 'Failed to delete comment', error: err }),
    );
});

module.exports = router;
