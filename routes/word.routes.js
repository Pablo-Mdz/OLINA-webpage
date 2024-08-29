const router = require('express').Router();
const Word = require('../models/Word');
const path = 'word';

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: API for managing words
 */

/**
 * @swagger
 * /word:
 *   get:
 *     summary: Get a list of all words
 *     tags: [Words]
 *     responses:
 *       200:
 *         description: A list of all words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Word'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /word:
 *   post:
 *     summary: Create a new word
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Word'
 *     responses:
 *       200:
 *         description: The newly created word
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /word/{id}/edit:
 *   post:
 *     summary: Edit an existing word by ID
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the word to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               editWord:
 *                 $ref: '#/components/schemas/Word'
 *               user:
 *                 type: string
 *                 description: The ID of the user attempting to edit the word
 *                 example: 60d21b4671f4b54baf0cfe07
 *     responses:
 *       200:
 *         description: Confirmation of the update
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: data updated
 *       403:
 *         description: Forbidden - the user is not allowed to edit this word
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /word/{id}:
 *   post:
 *     summary: Delete a word by ID
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the word to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user attempting to delete the word
 *                 example: 60d21b4671f4b54baf0cfe07
 *     responses:
 *       200:
 *         description: The deleted word
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       403:
 *         description: Forbidden - the user is not allowed to delete this word
 *       500:
 *         description: Internal server error
 */

router.get(`/${path}`, (req, res) => {
  console.log('first');
  Word.find()
    .then((words) => res.json(words))
    .catch((err) => console.log(err));
});

router.post(`/${path}`, (req, res) => {
  console.log('new word', req.body);
  Word.create(req.body)
    .then((Words) => res.json(Words))
    .catch((err) => res.status);
});

router.post(`/${path}/:id/edit`, (req, res) => {
  const id = req.params.id;
  const updateData = req.body.editWord;
  const user = req.body.user;

  Word.findById(id)
    .then((response) => {
      if (user == response.author.id) {
        Word.findByIdAndUpdate(id, updateData, { new: true })
          .then(() => {
            res.json('data updated');
          })
          .catch((err) => console.log(err));
      } else {
        res.json("you can not modify this word, you don't have access");
      }
    })
    .catch((err) => console.log(err));
});

router.post(`/${path}/:id`, (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  Word.findById(id)
    .then((response) => {
      console.log('responseee: ', req.body);
      console.log('response!', user);
      if (user == response.author.id) {
        Word.findByIdAndRemove(id).then((deleted) => {
          res.json(deleted);
        });
      } else {
        res.json("you can not modify this word, you don't have access");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
