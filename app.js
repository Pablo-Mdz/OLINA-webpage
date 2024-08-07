// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

const cors = require('cors');
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

app.use(
  cors({
    origin: ['https://oliina.com', 'http://localhost:3000'],
  }),
);
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

require('./error-handling')(app);

module.exports = app;
