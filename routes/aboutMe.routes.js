const router = require('express').Router();
const AboutMe = require('../models/AboutMe');
const { deleteImages } = require('../utils/deleteImagesHelper');
const { uploader } = require('../config/cloudinary');

router.post('/', uploader.single('gallery'), (req, res) => {
  const { aboutMe, imgUrl, publicId } = req.body;

  AboutMe.create({
    body: aboutMe,
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

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const data = await AboutMe.findByIdAndRemove({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // helper function to delete images from Cloudinary
    await deleteImages(data);

    res.status(200).json({ message: 'A part of AboutMe is deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
