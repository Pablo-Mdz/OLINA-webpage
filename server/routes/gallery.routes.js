const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { uploader, cloudinary } = require('../config/cloudinary');

router.post('/add-photo', uploader.single('gallery'), (req, res, next) => {
  const { imgUrl, publicId } = req.body;

  console.log('REQUEST BODY: ', req.body);

  Gallery.create({
    imgUrl,
    publicId,
  })
    .then((e) => {
      const { title, _id } = e;
      const event = { title, _id };
      res.status(201).json({ event });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/', (req, res) => {
  Gallery.find().then((gallery) => {
    res.status(200).json(gallery);
  });
});

router.post('/delete/:id', (req, res, next) => {
  Gallery.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      if (data.imgUrl) {
        cloudinary.uploader.destroy(data.publicId);
      }
      res.status(200).json({ message: 'Entry deleted' });
    })
    .catch((err) => {
      next(err);
    });
});

/* router.post("/upload", uploader.single("imageURL"), (req, res, next) => {
  console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});

router.post('/add-picture', (req, res) => {
  const { imageURL } = req.body;
  Gallery.create( { imgUrl: imageURL }, {new: true})
  .then(createdGalleryImage => {
     const { imgUrl, _id } = createdGalleryImage
     const image = { imgUrl, _id }
     res.status(200).json({ image })
  })
  .catch(err => {
    res.status(500).json({ message: "Internal Server Error" });
  })
})  */

/* router.post("/add-picture", uploader.single("gallery-image"), (req, res) => {
  const { imageURL, publicId } = req.body;
  console.log("REQUEST BODY: ", req.body)
  Gallery.create({ imgUrl: imageURL, publicId })
    .then((createdGalleryImage) => {
      const { imgUrl, _id } = createdGalleryImage
      const image = { imgUrl, _id }
      res.status(200).json({ image })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
}); */

module.exports = router;
