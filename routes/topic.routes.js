const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Topic = require('../models/Topic');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: API for managing topics
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
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
 *                 description: The title of the topic
 *                 example: Introduction to JavaScript
 *     responses:
 *       200:
 *         description: The newly created topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /details/{id}:
 *   get:
 *     summary: Get a specific topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the topic
 *     responses:
 *       200:
 *         description: The topic details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /details/{id}:
 *   get:
 *     summary: Get a specific topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the topic
 *     responses:
 *       200:
 *         description: The topic details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
router.get('/list-topics', (req, res) => {
  Topic.find({})
    .then((topicsFromDB) => {
      res.json({ topics: topicsFromDB });
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /details/{topicId}:
 *   put:
 *     summary: Update a topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the topic
 *                 example: Advanced JavaScript
 *     responses:
 *       200:
 *         description: The updated topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
router.put('/details/:topicId', (req, res) => {
  const { title } = req.body;
  Topic.findByIdAndUpdate(req.params.topicId, { title }, { new: true })
    .then((updatedTopic) => {
      console.log(' updated topic', updatedTopic);
      res.status(200).json(updatedTopic);
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /details/{topicId}:
 *   delete:
 *     summary: Delete a topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the topic
 *     responses:
 *       200:
 *         description: Topic and associated posts deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Topic and associated posts deleted
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
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
