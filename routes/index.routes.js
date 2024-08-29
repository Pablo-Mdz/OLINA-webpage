/**
 * @swagger
 * /:
 *   get:
 *     summary: Checks if the API is working.
 *     description: Returns a simple message indicating that the API is up and running.
 *     responses:
 *       200:
 *         description: A successful response indicating the API is working.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "All good in here"
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

module.exports = router;
