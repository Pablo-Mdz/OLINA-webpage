const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { uploader } = require('../config/cloudinary');
const { deleteImages } = require('../utils/deleteImagesHelper');

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: API for managing the gallery
 */

/**
 * @swagger
 * /gallery/add-photo:
 *   post:
 *     summary: Adds a new photo to the gallery
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - imgUrl
 *               - publicId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the photo.
 *                 example: A beautiful sunset
 *               description:
 *                 type: string
 *                 description: A brief description of the photo.
 *                 example: This photo was taken during a trip to the mountains.
 *               imgUrl:
 *                 type: string
 *                 description: The URL of the uploaded image.
 *                 example: https://example.com/image.jpg
 *               publicId:
 *                 type: string
 *                 description: The public ID of the image in Cloudinary.
 *                 example: abcdef123456
 *     responses:
 *       201:
 *         description: The photo was successfully added to the gallery.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     _id:
 *                       type: string
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Retrieves all photos from the gallery
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: An array of all photos in the gallery.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   imgUrl:
 *                     type: string
 *                   publicId:
 *                     type: string
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', (req, res) => {
  Gallery.find().then((gallery) => {
    res.status(200).json(gallery);
  });
});

/**
 * @swagger
 * /gallery/{imageId}:
 *   put:
 *     summary: Updates a photo's title and description
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the photo to update.
 *         example: 60d21b4671f4b54baf0cfe07
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the photo.
 *                 example: Updated title
 *               description:
 *                 type: string
 *                 description: The new description of the photo.
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: The photo was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
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

/**
 * @swagger
 * /gallery/delete/{id}:
 *   post:
 *     summary: Deletes a photo from the gallery and removes it from Cloudinary
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the photo to delete.
 *         example: 60d21b4671f4b54baf0cfe08
 *     responses:
 *       200:
 *         description: The photo and associated images were successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Entry and associated images deleted
 *       404:
 *         description: Entry not found.
 *       500:
 *         description: Internal Server Error.
 */
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

module.exports = router;
