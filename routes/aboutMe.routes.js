const router = require('express').Router();
const AboutMe = require('../models/AboutMe');
const { deleteImages } = require('../utils/deleteImagesHelper');
const { uploader } = require('../config/cloudinary');

/**
 * @swagger
 * /api/about-me:
 *   post:
 *     summary: Create a new AboutMe entry
 *     tags: [AboutMe]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               aboutMe:
 *                 type: string
 *                 description: The content of the AboutMe section
 *               imgUrl:
 *                 type: string
 *                 description: The URL of the image
 *               publicId:
 *                 type: string
 *                 description: The public ID of the image in Cloudinary
 *               gallery:
 *                 type: string
 *                 format: binary
 *                 description: Image file to be uploaded
 *     responses:
 *       200:
 *         description: The newly created AboutMe entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMe'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/about-me:
 *   get:
 *     summary: Retrieve the list of AboutMe entries
 *     tags: [AboutMe]
 *     responses:
 *       200:
 *         description: A list of AboutMe entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AboutMe'
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => {
  AboutMe.find()
    .then((aboutMeFromDB) => {
      res.json(aboutMeFromDB);
    })
    .catch((err) => console.log(err));
});

/**
 * @swagger
 * /api/about-me/delete/{id}:
 *   delete:
 *     summary: Delete an AboutMe entry by ID
 *     tags: [AboutMe]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the AboutMe entry to delete
 *     responses:
 *       200:
 *         description: The AboutMe entry was successfully deleted
 *       404:
 *         description: The entry was not found
 *       500:
 *         description: Server error
 */
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
