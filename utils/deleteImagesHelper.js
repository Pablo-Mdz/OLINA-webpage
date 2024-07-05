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

const deleteImages = (data) => {
  if (data.publicId) {
    cloudinary.uploader.destroy(data.publicId, (error, result) => {
      if (error) {
        console.error('Error deleting image from Cloudinary: ', error);
      } else {
        console.log('Deleted image from Cloudinary publicId: ', result);
      }
    });
  }

  if (data.body) {
    const imageIds = extractImageIds(data.body);
    imageIds.forEach((imageId) => {
      cloudinary.uploader.destroy(imageId, (error, result) => {
        if (error) {
          console.error('Error deleting image from Cloudinary: ', error);
        } else {
          console.log('Deleted image from Cloudinary: ', result);
        }
      });
    });
  }
};

module.exports = {
  deleteImages,
};
