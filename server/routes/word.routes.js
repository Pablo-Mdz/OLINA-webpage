const router = require("express").Router();
// const { findByIdAndUpdate } = require("../models/Word.model");

const Word = require("../models/Word")
// const fileUploader = require("../config/cloudinary.config.back")
// const { uploader, cloudinary } = require("../config/cloudinary")

const path = 'word'

//get read words 

router.get(`/${path}`, (req, res) => {
    console.log('first')
    Word.find()
        .then(Word => res.json(Word))
        // , user: req.session.user
        .catch(err => console.log(err))
    // , { user: req.session.user }
});


//create new word
router.post(`/${path}`, (req, res) => {

    const { word, description, translation } = req.body
    console.log("words", req.body)

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

// router.put(`${path}/:id/edit`, (req,res,next) => {
//     const 
// })

//delete word form list
router.post(`/${path}/:id/delete`, (req, res) => {
    const id = req.params.id
    Word.findByIdAndRemove(id)
        .then(deletedWord => {
            res.json(deletedWord)
        })
        .catch(err => console.log(err))
});


module.exports = router;