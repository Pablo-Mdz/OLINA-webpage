const router = require('express').Router();
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { deleteImages } = require('../utils/deleteImagesHelper');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Post Title"
 *               body:
 *                 type: string
 *                 example: "This is the content of the new post."
 *               topicId:
 *                 type: string
 *                 example: "60d21b4671f4b54baf0cfe07"
 *               imgUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               publicId:
 *                 type: string
 *                 example: "abc123xyz"
 *     responses:
 *       200:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => {
  Post.find()
    .populate('author')
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Retrieve a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: The requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name',
      },
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Post Title"
 *               body:
 *                 type: string
 *                 example: "This is the updated content of the post."
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put('/:postId', (req, res) => {
  const { title, body } = req.body;
  Post.findByIdAndUpdate(req.params.postId, { title, body }, { new: true })
    .then((updatedPost) => {
      res.status(200).json(updatedPost);
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post and associated comments deleted
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to delete post
 */
router.delete('/:postId', async (req, res) => {
  const postID = req.params.postId;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Comment.deleteMany({ post: postID });

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: postID },
    });

    await deleteImages(post);

    await Post.findByIdAndDelete(postID);
    res.status(200).json({ message: 'Post and associated comments deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post', error: err });
  }
});

/**
 * @swagger
 * /posts/{id}/likes:
 *   get:
 *     summary: Get the number of likes for a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Number of likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: number
 *                   example: 123
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/likes', async (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      res.status(200).json({ likes: post.likes });
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /posts/likes/{id}:
 *   put:
 *     summary: Update the number of likes for a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               likes:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: The updated post with new likes count
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
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
