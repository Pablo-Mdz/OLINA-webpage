const { cloudinary } = require('../config/cloudinary');

function extractImageIds(htmlBody) {
  const regex =
    /https:\/\/res\.cloudinary\.com\/be-chef\/image\/upload\/v\d+\/([a-zA-Z0-9_-]+)\.\w+/g;
  let match;
  const ids = [];

  while ((match = regex.exec(htmlBody)) !== null) {
    ids.push(match[1]);
  }

  return ids;
}

module.exports = {
  extractImageIds,
};

const deleteImages = async (data) => {
  try {
    if (data.publicId) {
      const result = await cloudinary.uploader.destroy(data.publicId);
      console.log('Deleted image from Cloudinary publicId: ', result);
    }

    if (data.body) {
      const imageIds = extractImageIds(data.body);
      const deletePromises = imageIds.map((imageId) =>
        cloudinary.uploader.destroy(imageId),
      );

      const results = await Promise.all(deletePromises);
      results.forEach((result) => {
        console.log('Deleted image from Cloudinary: ', result);
      });
    }
  } catch (error) {
    console.error('Error deleting images from Cloudinary: ', error);
  }
};

module.exports = {
  deleteImages,
};
