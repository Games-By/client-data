const mongoose = require('mongoose');

const uploadImageSchema = new mongoose.Schema({
   image: {
      data: Buffer,
      contentType: String,
   },
});

const  UploadImage = mongoose.model('UploadImage', uploadImageSchema, 'uploadimages');

module.exports = UploadImage;
