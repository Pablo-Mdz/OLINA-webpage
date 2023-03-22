const router = require("express").Router();
// const { findByIdAndUpdate } = require("../models/Recipe.model");

const Word = require("../models/Word")
// const fileUploader = require("../config/cloudinary.config.back")
// const { uploader, cloudinary } = require("../config/cloudinary")

const path = 'word'
//create post
router.post(`/${path}/word`, (req, res) => {

    const { word, description, translation } = req.body
    console.log("words hh", req.body)

    Word.create({
        word,
        description,
        translation,
        // author,
        // createdAt,
    })
        .then(Words => res.json(Words))
        .catch(err => res.status)
});

module.exports = router;