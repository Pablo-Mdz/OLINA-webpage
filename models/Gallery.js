const { Schema, model } = require('mongoose');

const gallerySchema = new Schema(
  {
    title: {
      type: String,
    },
    imgUrl: String,
    description: String,
    publicId: String,
  },
  {
    timestamps: true,
  },
);

const Gallery = model('Gallery', gallerySchema);

module.exports = Gallery;
