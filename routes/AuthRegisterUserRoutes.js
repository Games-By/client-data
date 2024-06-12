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
   },
});

const AuthRegisterUserController = require('../controllers/AuthRegisterUserController');

router.get('/', AuthRegisterUserController.init);
router.post('/auth/register/user', (req, res) => {
   console.log('Requisição para registrar usuário:', req.body);
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
   );
   res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
   );
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.json({ message: 'User registered successfully' });
});

router.post('/upload/image', upload.single('image'), (req, res) => {
   console.log('Requisição para upload de imagem:', req.file);
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
   );
   res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
   );
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.json({ message: 'Image registered successfully' });
});

module.exports = router;
