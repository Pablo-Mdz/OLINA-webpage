const router = require('express').Router();
const AboutMe = require('../models/AboutMe');
const { uploader, cloudinary } = require('../config/cloudinary');

router.post('/', uploader.single('gallery'), (req, res) => {
  const { aboutMe, imgUrl, publicId } = req.body;

  AboutMe.create({
    textBody: aboutMe,
    imgUrl,
    publicId,
  })
    .then((newAboutMe) => {
      res.status(200).json(newAboutMe);
    })
    .catch((err) => console.log(err));
});

router.get('/', (req, res) => {
  AboutMe.find()
    .then((aboutMeFromDB) => {
      res.json(aboutMeFromDB);
    })
    .catch((err) => console.log(err));
});

router.delete('/delete/:id', (req, res, next) => {
  AboutMe.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      if (data.imgUrl) {
        cloudinary.uploader.destroy(data.publicId);
      }
      res.status(200).json({ message: 'A part of aboutMe is deleted' });
    })
    .catch((err) => next(err));
});

module.exports = router;
