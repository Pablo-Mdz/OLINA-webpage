const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const saltRounds = 10;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Creates a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: StrongPassword123
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     _id:
 *                       type: string
 *       400:
 *         description: Invalid input or user already exists.
 *       500:
 *         description: Server error.
 */
router.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: 'Provide email, password and name' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: 'User already exists.' });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Verifies email and password and returns a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Successfully authenticated. Returns a JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authToken:
 *                   type: string
 *                   description: The JWT token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing email or password.
 *       401:
 *         description: Authentication failed.
 *       500:
 *         description: Server error.
 */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: 'User not found.' });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;

        const payload = { _id, email, name };
        //console.log(payload)
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '24h',
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'Unable to authenticate the user' });
      }
    })
    .catch((err) => next(err));
});

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verifies JWT token stored on the client
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The JWT is valid, and the payload is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Invalid or missing JWT token.
 *       500:
 *         description: Server error.
 */
router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
