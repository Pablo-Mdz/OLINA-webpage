const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments on posts
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Adds a new comment to a post
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - postId
 *               - userId
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment.
 *                 example: This is a great post!
 *               postId:
 *                 type: string
 *                 description: The ID of the post being commented on.
 *                 example: 60d21b4671f4b54baf0cfe07
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the comment.
 *                 example: 60d21b4671f4b54baf0cfe08
 *     responses:
 *       200:
 *         description: The comment was successfully added to the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to add comment.
 */
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

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Gets all comments for a post
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: An array of all comments for a post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commentsFromDB:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       body:
 *                         type: string
 *                       author:
 *                         type: string
 *                       post:
 *                         type: string
 *       500:
 *         description: Failed to retrieve comments.
 */
router.get('/', (req, res) => {
  Comment.find()
    .then((commentsFromDB) => {
      res.status(200).json({ commentsFromDB });
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Deletes a comment and removes it from the post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete.
 *         example: 60d21b4671f4b54baf0cfe09
 *     responses:
 *       200:
 *         description: The comment was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedPost:
 *                   type: object
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Failed to delete comment.
 */
router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (deletedComment.post) {
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
