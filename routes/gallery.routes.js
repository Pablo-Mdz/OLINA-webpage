const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { uploader } = require('../config/cloudinary');
const { deleteImages } = require('../utils/deleteImagesHelper');

router.post('/add-photo', uploader.single('gallery'), (req, res, next) => {
  const { title, description, imgUrl, publicId } = req.body;
  Gallery.create({
    title,
    description,
    imgUrl,
    publicId,
  })
    .then((e) => {
      const { title, description, _id } = e;
      const event = { title, description, _id };
      res.status(201).json({ event });
      console.log('title', e);
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

router.put('/:imageId', (req, res) => {
  const { title, description } = req.body;
  Gallery.findByIdAndUpdate(
    req.params?.imageId,
    { title, description },
    { new: true },
  )
    .then((updatedImage) => {
      console.log(' updated title', updatedImage);
      res.status(200).json(updatedImage);
    })
    .catch((err) => console.log(err));
});

router.post('/delete/:id', async (req, res, next) => {
  try {
    const data = await Gallery.findByIdAndDelete({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await deleteImages(data);

    res.status(200).json({ message: 'Entry and associated images deleted' });
  } catch (err) {
    next(err);
  }
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
