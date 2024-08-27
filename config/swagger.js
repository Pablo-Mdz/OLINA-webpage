const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Oliina API',
      version: '1.0.0',
      description: 'API documentation for Oliina',
    },
    components: {
      schemas: {
        AboutMe: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier',
              example: '60d21b4671f4b54baf0cfe07',
            },
            body: {
              type: 'string',
              description: 'The content of the AboutMe section',
              example: 'This is a brief description about me.',
            },
            imgUrl: {
              type: 'string',
              description: 'The URL of the image',
              example: 'https://example.com/image.jpg',
            },
            publicId: {
              type: 'string',
              description: 'The public ID of the image in Cloudinary',
              example: 'abc123xyz',
            },
          },
          required: ['body', 'imgUrl', 'publicId'],
        },
        Gallery: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the gallery image',
              example: 'Sunset Over Mountains',
            },
            description: {
              type: 'string',
              description: 'A brief description of the gallery image',
              example: 'A beautiful sunset over the mountains.',
            },
            imgUrl: {
              type: 'string',
              description: 'The URL of the image',
              example: 'https://example.com/sunset.jpg',
            },
            publicId: {
              type: 'string',
              description: 'The public ID of the image in Cloudinary',
              example: 'sunset123',
            },
            _id: {
              type: 'string',
              description: 'Unique identifier for the gallery item',
              example: '60d21b4671f4b54baf0cfe08',
            },
          },
          required: ['title', 'imgUrl', 'publicId'],
        },
        Comment: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the comment',
              example: '60d21b4671f4b54baf0cfe09',
            },
            body: {
              type: 'string',
              description: 'Content of the comment',
              example: 'This is a comment.',
            },
            post: {
              type: 'string',
              description: 'ID of the post the comment is related to',
              example: '60d21b4671f4b54baf0cfe08',
            },
            author: {
              type: 'string',
              description: 'ID of the user who authored the comment',
              example: '60d21b4671f4b54baf0cfe07',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the comment was created',
              example: '2023-08-25T12:34:56Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the comment was last updated',
              example: '2023-08-25T12:34:56Z',
            },
          },
          required: ['body', 'post', 'author'],
        },
        Auth: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'User email address',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'Password123!',
            },
            name: {
              type: 'string',
              description: 'User’s full name',
              example: 'John Doe',
            },
            _id: {
              type: 'string',
              description: 'Unique identifier for the user',
              example: '60d21b4671f4b54baf0cfe07',
            },
            authToken: {
              type: 'string',
              description: 'JWT token for user authentication',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
          required: ['email', 'password', 'name'],
        },
        Post: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the post',
              example: '60d21b4671f4b54baf0cfe10',
            },
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'Understanding JavaScript Closures',
            },
            body: {
              type: 'string',
              description: 'Content of the post',
              example: 'In this post, we will explore JavaScript closures...',
            },
            topicId: {
              type: 'string',
              description: 'ID of the topic the post belongs to',
              example: '60d21b4671f4b54baf0cfe11',
            },
            imgUrl: {
              type: 'string',
              description: 'URL of the image associated with the post',
              example: 'https://example.com/javascript.jpg',
            },
            publicId: {
              type: 'string',
              description: 'Public ID of the image in Cloudinary',
              example: 'javascript123',
            },
            author: {
              type: 'string',
              description: 'ID of the user who authored the post',
              example: '60d21b4671f4b54baf0cfe07',
            },
            likes: {
              type: 'number',
              description: 'Number of likes the post has received',
              example: 120,
            },
            comments: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID of a comment on the post',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the post was created',
              example: '2023-08-25T12:34:56Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the post was last updated',
              example: '2023-08-25T12:34:56Z',
            },
          },
          required: ['title', 'body', 'topicId', 'author'],
        },
        Topic: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the topic',
              example: '60d21b4671f4b54baf0cfe12',
            },
            title: {
              type: 'string',
              description: 'Title of the topic',
              example: 'Introduction to JavaScript',
            },
            author: {
              type: 'string',
              description: 'ID of the user who created the topic',
              example: '60d21b4671f4b54baf0cfe07',
            },
            posts: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID of a post related to the topic',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the topic was created',
              example: '2023-08-25T12:34:56Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the topic was last updated',
              example: '2023-08-25T12:34:56Z',
            },
          },
          required: ['title', 'author'],
        },
        Word: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the word',
              example: '60d21b4671f4b54baf0cfe10',
            },
            word: {
              type: 'string',
              description: 'The word itself',
              example: 'Example',
            },
            definition: {
              type: 'string',
              description: 'The definition of the word',
              example: 'A representative form or pattern.',
            },
            author: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID of the user who added the word',
                  example: '60d21b4671f4b54baf0cfe07',
                },
                name: {
                  type: 'string',
                  description: 'Name of the user',
                  example: 'John Doe',
                },
              },
              required: ['id', 'name'],
            },
          },
          required: ['word', 'definition', 'author'],
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://api.oliina.com',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
