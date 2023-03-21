const express = require("express");
const router = express.Router();
const { model } = require("mongoose");
const Gallery = require("../models/Gallery");
const { uploader, cloudinary } = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  Gallery.find().then((gallery) => {
    res.status(200).json(gallery);
  });
});

module.exports = router;
