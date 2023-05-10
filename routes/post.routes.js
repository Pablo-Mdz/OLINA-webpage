const router = require("express").Router();
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User');
const { findById } = require("../models/Post");
const { uploader, cloudinary } = require('../config/cloudinary');
const { restart } = require("nodemon");

router.post("/", isAuthenticated, (req, res) => {
    console.log('this is req.body of post:', req.body)
    console.log('this is req.payload._id of post:', req.payload._id);
    const authorId = req.payload._id;
    const { title, body, topicId, imgUrl, publicId } = req.body;
    console.log('topic ID', topicId)
    Post.create({
        title: title,
        body,
        imgUrl,
        publicId,
        author: authorId
    })

        .then(newPost => {
            Topic.findByIdAndUpdate(topicId, { $push: { posts: newPost._id } })
                .then(updatedTopic => {
                    User.findByIdAndUpdate(authorId, { $push: { posts: newPost._id } })
                        .then(updatedUser => {
                            Post.findById(newPost._id)
                                .populate("author")
                                .then(populatedPost => {
                                    res.json(populatedPost);
                                })
                        })
                })
                .catch(err => console.log(err));
        })
});

router.get("/", (req, res) => {
    Post.find()
        .populate("author")
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(err => console.log(err));
});



router.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .populate("author")
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => console.log(err));
});


router.put("/:postId", (req, res) => {
    const { title, body } = req.body;
    Post.findByIdAndUpdate(req.params.postId, { title, body }, { new: true })
        .then(updatedPost => {
            res.status(200).json(updatedPost);
        })
        .catch(err => console.log(err));
});

router.post("/:postId", (req, res) => {
    const postID = req.params.postId;
    console.log('post Id to delete',postID)
    Post.findByIdAndDelete(postID)
        .then((data) => {
            if (data.imgUrl) {
                cloudinary.uploader.destroy(data.publicId);
            }
            res.status(200).json({ message: 'Post deleted' })
        })
        .catch(err => console.log(err));
});

router.get("/:id/likes", async (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
      .then(post => {
        res.status(200).json({ likes: post.likes });
      })
      .catch(err => console.log(err));
  });

router.put("/likes/:id", (req, res) => {
    const postId = req.params.id;
    const { likes } = req.body;
    Post.findByIdAndUpdate(postId, { likes }, { new: true })
      .then(updatedPost => {
        res.status(200).json(updatedPost)
      })
      .catch(err => console.log(err));
});

// Add new comment to a post
router.post('/comments', async (req, res) => {
    const { body, postId } = req.body;
  
    Post.findByIdAndUpdate(postId, { $push: { comments: body }})
        .then(updatedPost => {
            res.json(updatedPost);
            console.log("updated Post: ", updatedPost);
        })
        .catch(err => console.log(err));
  });

// Get all comments for a post
router.get('/comments/:postId', async (req, res) => {
    const { postId } = req.params.postId;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });  
  
module.exports = router;