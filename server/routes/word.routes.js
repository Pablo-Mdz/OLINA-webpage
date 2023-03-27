const router = require('express').Router();
// const { findByIdAndUpdate } = require("../models/Word.model");

const Word = require('../models/Word');
// const fileUploader = require("../config/cloudinary.config.back")
// const { uploader, cloudinary } = require("../config/cloudinary")

const path = 'word';

//get read words

router.get(`/${path}`, (req, res) => {
  console.log('first');
  Word.find()
    .then((words) => res.json(words))
    .catch((err) => console.log(err));
});

//create new word
router.post(`/${path}`, (req, res) => {
  console.log('new word', req.body);
  Word.create(req.body)
    .then((Words) => res.json(Words))
    .catch((err) => res.status);
});

// edit post Word working
router.post(`/${path}/:id/edit`, (req, res) => {
  const id = req.params.id;
  const updateData = req.body.editWord;
  const user = req.body.user;
  console.log('this is id:', id);
  console.log('this is all the data:', updateData);

  Word.findById(id)
    .then((response) => {
      if (user == response.author.id) {
        Word.findByIdAndUpdate(id, updateData, { new: true })
          .then(() => {
            res.json('data updated');
          })
          .catch((err) => console.log(err));
      } else {
        res.json("you can not modify this word, you don't have access");
      }
    })
    .catch((err) => console.log(err));
});

//delete word form list
router.post(`/${path}/:id`, (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  Word.findById(id)
    .then((response) => {
      console.log('responseee: ', req.body);
      console.log('response!', user);
      if (user == response.author.id) {
        Word.findByIdAndRemove(id).then((deleted) => {
          res.json(deleted);
        });
      } else {
        res.json("you can not modify this word, you don't have access");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
