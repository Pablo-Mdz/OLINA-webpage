const router = require("express").Router();
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User');

router.post("/", isAuthenticated, (req, res) => {
    const authorId = req.payload._id;
    const { title } = req.body;
    Topic.create({
        title: title,
        author: authorId
    })
        .then(newTopic => {
            User.findByIdAndUpdate(authorId, { $push: { topics: newTopic._id } })
                .then(updatedUser => {
                    Topic.findById(newTopic._id)
                        .populate("author")
                        .then(populatedTopic => {
                            res.json(populatedTopic);
                            console.log("populated topic: ", populatedTopic)
                        })
                })
                .catch(err => console.log(err));
        })
});

router.get("/details/:id", (req, res) => {
    const topicId = req.params.id;
    Topic.findById(topicId)
        .populate({
            path: "posts",
            populate: {
                path: "author",
            }
        })
        .then(topicFromDB => {
            // console.log("topicFromDB: ", topicFromDB)
            res.json({ topic: topicFromDB })
        })
        .catch(err => console.log(err))
});

router.get("/list-topics", (req, res) => {
    Topic.find({})
        .then(topicsFromDB => {
            res.json({ topics: topicsFromDB });
        })
        .catch(err => console.log(err));
})

router.put("/details/:topicId", (req, res) => {
    const { title } = req.body;
    Topic.findByIdAndUpdate(req.params.topicId, { title }, { new: true })
        .then(updatedTopic => {
            console.log(" updated topic", updatedTopic)
            res.status(200).json(updatedTopic);
        })
        .catch(err => console.log(err));
});

router.delete("/details/:topicId", (req, res) => {
    const topicID = req.params.topicId;
    console.log("topic id delete", topicID)
    Topic.findByIdAndDelete(topicID)
        .then(() => {
            res.status(200).json({ message: 'Topic deleted' });
        })
        .catch(err => console.log(err));
})



module.exports = router;
