require('dotenv').config();
require('./db');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(
  cors({
    origin: ['https://olina.versanetsolutions.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// healthcheck route
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const gallery = require('./routes/gallery.routes');
app.use('/api/gallery', gallery);

const topic = require('./routes/topic.routes');
app.use('/api/topic', topic);

const post = require('./routes/post.routes');
app.use('/api/post', post);

const comment = require('./routes/comment.routes');
app.use('/api/comment', comment);

const aboutMe = require('./routes/aboutMe.routes');
app.use('/api/about-me', aboutMe);

const word = require('./routes/word.routes');
app.use('/', word);

const path = require('path');
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + '/client/build/index.html');
});
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
