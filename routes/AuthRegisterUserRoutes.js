const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error('Only image files (png, jpg) are allowed!'));
      }
      cb(null, true);
   }
});

const AuthRegisterUserController = require('../controllers/AuthRegisterUserController');

router.get('/', AuthRegisterUserController.init);
router.post('/auth/register/user', AuthRegisterUserController.registerUser);
router.post(
   '/upload/image',
   upload.single('image'),
   AuthRegisterUserController.uploadImage
);

module.exports = router;
