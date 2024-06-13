const router = require('express').Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const AuthRegisterUserController = require('../controllers/AuthRegisterUserController');

router.get('/', AuthRegisterUserController.init);
router.post('/auth/register/user', AuthRegisterUserController.registerUser);
router.post(
   '/upload/image',
   upload.single('image'),
   AuthRegisterUserController.uploadImage
);

module.exports = router;
