const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const swaggerDocs = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

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

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
require('./error-handling')(app);

module.exports = app;
