const router = require('express').Router();
const multer = require('multer');
const fs = require('fs-extra');

const storage = multer.diskStorage({
   destination: async function (req, file, cb) {
      const uploadDir = '../uploads';
      try {
         await fs.ensureDir(uploadDir);
         cb(null, uploadDir);
      } catch (err) {
         cb(err, uploadDir);
      }
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error('Only image files (png, jpg, jpeg, gif) are allowed!'));
      }
      cb(null, true);
   }
});

const AuthRegisterUserController = require('../controllers/AuthRegisterUserController');

router.post(
   '/upload/image',
   upload.single('image'),
   AuthRegisterUserController.uploadImage
);
router.get('/', AuthRegisterUserController.init);
router.post('/auth/register/user', AuthRegisterUserController.registerUser);

module.exports = router;
